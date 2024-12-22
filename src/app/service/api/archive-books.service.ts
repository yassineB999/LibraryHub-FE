import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, of, forkJoin } from 'rxjs';

interface ArchiveResponse {
  response: {
    docs: Array<{
      identifier: string;
      title?: string;
      creator?: string;
      date?: string;
    }>;
    numFound: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ArchiveBooksService {
  private readonly baseImageUrl = 'https://archive.org/services/img';
  private readonly baseMetadataUrl = 'https://archive.org/metadata';
  private readonly searchUrl = 'https://archive.org/advancedsearch.php';
  private readonly itemsPerPage = 10;

  constructor() {}

  getBooks(page: number = 1, searchQuery: string = '', category: string = 'all'): Observable<any[]> {
    let query = 'collection:books';
    
    if (searchQuery) {
      // Add title and creator to search
      query += ` AND (title:(${searchQuery}) OR creator:(${searchQuery}))`;
    }
    
    if (category && category !== 'all') {
      query += ` AND subject:(${category})`;
    }

    const searchParams = new URLSearchParams({
      q: query,
      fl: ['identifier', 'title', 'creator', 'date'].join(','),
      output: 'json',
      rows: this.itemsPerPage.toString(),
      page: page.toString()
    });

    return new Observable(subscriber => {
      fetch(`${this.searchUrl}?${searchParams}`)
        .then(response => response.json())
        .then((data: ArchiveResponse) => {
          if (!data.response || !data.response.docs) {
            subscriber.error('Invalid response format');
            return;
          }

          const identifiers = data.response.docs.map(doc => doc.identifier);
          if (identifiers.length === 0) {
            subscriber.next([]);
            subscriber.complete();
            return;
          }

          const metadataRequests = identifiers.map(id => this.fetchBookMetadata(id));
          
          forkJoin(metadataRequests).subscribe({
            next: (books) => {
              subscriber.next(books.filter(book => book !== null));
              subscriber.complete();
            },
            error: (error) => subscriber.error(error)
          });
        })
        .catch(error => subscriber.error(error));
    });
  }

  private fetchBookMetadata(identifier: string): Observable<any> {
    return new Observable(subscriber => {
      fetch(`${this.baseMetadataUrl}/${identifier}`)
        .then(response => response.json())
        .then(data => {
          if (!data.metadata) {
            subscriber.next(null);
            subscriber.complete();
            return;
          }

          const metadata = data.metadata;
          subscriber.next({
            identifier: identifier,
            title: metadata.title || 'Unknown Title',
            creator: metadata.creator || 'Unknown Author',
            description: metadata.description,
            year: metadata.date,
            publisher: metadata.publisher || 'Unknown Publisher',
            language: metadata.language || 'Unknown',
            subject: metadata.subject?.join(', ') || '',
            imageUrl: `${this.baseImageUrl}/${identifier}`
          });
          subscriber.complete();
        })
        .catch(error => {
          console.error(`Error fetching metadata for ${identifier}:`, error);
          subscriber.next(null);
          subscriber.complete();
        });
    });
  }

  getTotalBooks(searchQuery: string = '', category: string = 'all'): Observable<number> {
    let query = 'collection:books';
    
    if (searchQuery) {
      query += ` AND (title:(${searchQuery}) OR creator:(${searchQuery}))`;
    }
    
    if (category && category !== 'all') {
      query += ` AND subject:(${category})`;
    }

    const searchParams = new URLSearchParams({
      q: query,
      fl: 'identifier',
      output: 'json',
      rows: '0'
    });

    return new Observable(subscriber => {
      fetch(`${this.searchUrl}?${searchParams}`)
        .then(response => response.json())
        .then((data: ArchiveResponse) => {
          if (!data.response) {
            subscriber.error('Invalid response format');
            return;
          }
          subscriber.next(data.response.numFound);
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }
}
