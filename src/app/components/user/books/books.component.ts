import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../service/api/books.service';
import { BorrowsService } from '../../../service/api/borrows.service';
import { DataBookDTO } from '../../../models/book.model';
import { ThemesService } from '../../../service/api/themes.service';
import { DataThemeDTO } from '../../../models/theme.model';
import { UserService } from '../../../service/user/user.service';
import { CreateBorrowDTO } from '../../../models/borrow.model';

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
  books: DataBookDTO[] = [];
  loading = false;
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  viewMode: 'all' | 'borrowed' = 'all';
  searchQuery = '';
  selectedCategory = 'all';
  categories: { label: string; value: string; }[] = [
    { label: 'All Categories', value: 'all' }
  ];

  displayBorrowDialog = false;
  selectedBook: DataBookDTO | null = null;
  returnDate: Date = new Date();
  minReturnDate: Date = new Date();

  constructor(
    private booksService: BooksService,
    private borrowsService: BorrowsService,
    private themesService: ThemesService,
    private userService: UserService
  ) {
    // Set minimum return date to tomorrow
    this.minReturnDate.setDate(this.minReturnDate.getDate() + 1);
    // Set default return date to 2 weeks from now
    this.returnDate.setDate(this.returnDate.getDate() + 14);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    
    if (this.viewMode === 'borrowed') {
      this.loadBorrowedBooks();
      return;
    }

    this.booksService.getBooksByPagination(
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (response: any) => {
        this.books = response.books;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading books:', error);
        this.loading = false;
      }
    });
  }

  loadBorrowedBooks(): void {
    this.loading = true;
    this.userService.getMyBorrows().subscribe({
      next: (borrows: any[]) => {
        // Get the books for each borrow
        const bookPromises = borrows.map(borrow => 
          this.booksService.getBookById(borrow.idBook).toPromise()
        );
        
        Promise.all(bookPromises).then(books => {
          this.books = books.filter(book => book !== null) as DataBookDTO[];
          this.totalElements = this.books.length;
          this.loading = false;
        });
      },
      error: (error: any) => {
        console.error('Error loading borrowed books:', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.themesService.getThemes().subscribe({
      next: (themes: DataThemeDTO[]) => {
        this.categories = [
          { label: 'All Categories', value: 'all' },
          ...themes.map(theme => ({
            label: theme.name,
            value: theme.name
          }))
        ];
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.loadBooks();
  }

  showBorrowDialog(book: DataBookDTO): void {
    this.selectedBook = book;
    this.displayBorrowDialog = true;
  }

  confirmBorrow(): void {
    if (!this.selectedBook || !this.returnDate) return;

    const borrowDTO: CreateBorrowDTO = {
      idBook: this.selectedBook.idBook,
      returnDate: this.returnDate.toISOString(),
      idUser: "0"  // Using "0" as the default user ID
    };

    this.userService.borrowBook(borrowDTO).subscribe({
      next: (response) => {
        if (this.selectedBook) {
          this.selectedBook.isAvailable = false;
        }
        this.displayBorrowDialog = false;
        // Show success message
      },
      error: (error: any) => {
        console.error('Error borrowing book:', error);
        // Show error message
      }
    });
}
  borrowBook(book: DataBookDTO): void {
    if (!book.isAvailable) return;
    this.showBorrowDialog(book);
  }

  reserveBook(book: DataBookDTO): void {
    if (book.isAvailable) return;
    
    /*this.borrowsService.reserveBook(book.idBook).subscribe({
      next: () => {
        // Show success message
      },
      error: (error: any) => {
        console.error('Error reserving book:', error);
        // Show error message
      }
    });*/
  }

  getBookStatus(book: DataBookDTO): string {
    return book.isAvailable ? 'available' : 'not-available';
  }

  filterBooks(): void {
    this.currentPage = 0;
    this.loadBooks();
  }

  onSearch(): void {
    if(this.searchQuery == '') {
      this.loadBooks();
      return;
    }
    this.booksService.getSearchedBooks(
      this.searchQuery
    ).subscribe({
      next: (response: any) => {
        this.books = response;
      },
      error: (error: any) => {
        console.error('Error loading books:', error);
        this.loading = false;
      }
    });
  }

  onViewModeChange(): void {
    this.filterBooks();
  }

  formatAuthors(author: string | string[]): string {
    try {
      // If it's a JSON string, parse it
      if (typeof author === 'string' && (author.startsWith('{') || author.startsWith('['))) {
        // Convert the string to a proper JSON array format
        const cleanJson = author
          .replace(/^\{/, '[')  // Replace opening curly brace with square bracket
          .replace(/\}$/, ']'); // Replace closing curly brace with square bracket
        
        const parsedAuthors = JSON.parse(cleanJson) as string[];
        return parsedAuthors
          .map((a: string) => {
            // Extract just the author's name before any comma
            const name = a.split(',')[0].trim();
            return name;
          })
          .filter((name: string) => name) // Remove any empty names
          .join(' and ');
      }
      
      // If it's already an array
      if (Array.isArray(author)) {
        return author
          .map((a: string) => a.split(',')[0].trim())
          .filter((name: string) => name)
          .join(' and ');
      }
      
      // If it's a regular string, just get the name before the comma
      const name = author.split(',')[0].trim();
      return name || author;
    } catch (e) {
      console.error('Error formatting authors:', e);
      return String(author);
    }
  }
}
