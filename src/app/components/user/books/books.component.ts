import { Component, OnInit, HostListener } from '@angular/core';
import { ArchiveBooksService } from '../../../services/archive-books.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Category {
  label: string;
  value: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  currentPage = 1;
  loading = false;
  totalBooks = 0;
  viewMode: 'all' | 'borrowed' = 'all';
  searchQuery: string = '';
  selectedCategory: string = 'all';
  private searchSubject = new Subject<string>();
  
  categories: Category[] = [
    { label: 'All Categories', value: 'all' },
    { label: 'Fiction', value: 'fiction' },
    { label: 'Non-Fiction', value: 'non-fiction' },
    { label: 'Science', value: 'science' },
    { label: 'History', value: 'history' },
    { label: 'Technology', value: 'technology' }
  ];

  constructor(private archiveBooksService: ArchiveBooksService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.resetAndSearch();
    });
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadTotalBooks();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.loading || !this.hasMoreBooks()) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 100) {
      this.loadMore();
    }
  }

  onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onCategoryChange(): void {
    this.resetAndSearch();
  }

  private resetAndSearch(): void {
    this.currentPage = 1;
    this.books = [];
    this.loadBooks();
    this.loadTotalBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.archiveBooksService.getBooks(
      this.currentPage,
      this.searchQuery,
      this.selectedCategory
    ).subscribe({
      next: (books) => {
        this.books = books.map(book => ({
          ...book,
          isAvailable: true,
          status: 'available',
          themes: this.extractThemes(book.subject)
        }));
        this.filterBooks();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.loading = false;
      }
    });
  }

  private loadTotalBooks(): void {
    this.archiveBooksService.getTotalBooks(
      this.searchQuery,
      this.selectedCategory
    ).subscribe({
      next: (total) => {
        this.totalBooks = total;
      },
      error: (error) => {
        console.error('Error loading total books count:', error);
      }
    });
  }

  private extractThemes(subjects: string): { name: string }[] {
    if (!subjects) return [];
    return subjects.split(', ')
      .slice(0, 3)
      .map(subject => ({ name: subject }));
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter(book => {
      if (!book) return false;
      
      const matchesView = this.viewMode === 'all' || 
        (this.viewMode === 'borrowed' && book.status === 'borrowed');
      
      return matchesView;
    });
  }

  getBookStatus(book: any): string {
    return book.status || 'available';
  }

  borrowBook(book: any): void {
    book.status = 'borrowed';
    book.isAvailable = false;
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days from now
    this.filterBooks();
  }

  returnBook(book: any): void {
    book.status = 'available';
    book.isAvailable = true;
    book.dueDate = null;
    this.filterBooks();
  }

  reserveBook(book: any): void {
    book.status = 'reserved';
    this.filterBooks();
  }

  cancelReservation(book: any): void {
    book.status = 'available';
    book.isAvailable = true;
    this.filterBooks();
  }

  loadMore(): void {
    if (this.loading) return;
    
    this.currentPage++;
    this.loading = true;
    this.archiveBooksService.getBooks(
      this.currentPage,
      this.searchQuery,
      this.selectedCategory
    ).subscribe({
      next: (newBooks) => {
        const mappedBooks = newBooks.map(book => ({
          ...book,
          isAvailable: true,
          status: 'available',
          themes: this.extractThemes(book.subject)
        }));
        this.books = [...this.books, ...mappedBooks];
        this.filterBooks();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading more books:', error);
        this.loading = false;
        this.currentPage--; // Revert page increment on error
      }
    });
  }

  hasMoreBooks(): boolean {
    return this.books.length < this.totalBooks;
  }
}
