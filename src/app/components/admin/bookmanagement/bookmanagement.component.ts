import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../../../service/api/books.service';
import { DataBookDTO, CreateBookDTO, UpdateBookDTO, DataThemeDTO } from '../../../models/book.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bookmanagement',
  templateUrl: './bookmanagement.component.html',
  styleUrls: ['./bookmanagement.component.css'],
  providers: [MessageService]
})
export class BookmanagementComponent implements OnInit {
  books: DataBookDTO[] = [];
  searchQuery: string = '';
  searchTimeout: any;
  filteredBooks: DataBookDTO[] = [];
  updateDialogVisible: boolean = false;
  createDialogVisible: boolean = false;
  selectedBook: DataBookDTO | null = null;
  
  // Pagination variables
  currentPage: number = 0;
  pageSize: number = 10;
  totalRecords: number = 0;
  loading: boolean = false;

  newBook: CreateBookDTO = {
    title: '',
    author: '',
    isbn: '',
    publicationYear: new Date().getFullYear(),
    themes: []
  };

  constructor(private booksService: BooksService, private messageService: MessageService) {
    this.currentPage = 0;  // Initialize to first page
    this.pageSize = 10;    // Initialize page size
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  getAuthorDisplay(author: string | string[]): string {
    return Array.isArray(author) ? author.join(', ') : author;
  }

  onPageChange(event: any): void {
    this.currentPage = Math.floor(event.first / event.rows) + 1;
    this.pageSize = event.rows;
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.booksService.getBooksByPagination(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe(
        (response) => {
          this.books = response.books;
          this.filteredBooks = this.books;
          this.totalRecords = response.totalElements;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching books:', error);
          this.loading = false;
        }
      );
  }

  openCreateDialog(): void {
    this.createDialogVisible = true;
    this.newBook = {
      title: '',
      author: '',
      isbn: '',
      publicationYear: new Date().getFullYear(),
      themes: []
    };
  }

  openUpdateDialog(book: DataBookDTO): void {
    this.selectedBook = { ...book };
    // Convert author array to string if it's an array
    if (Array.isArray(this.selectedBook.author)) {
      this.selectedBook.author = this.selectedBook.author.join(', ');
    }
    this.updateDialogVisible = true;
  }

  createBook(form: NgForm): void {
    if (form.valid) {
      this.booksService.createBook(this.newBook).subscribe(
        () => {
          this.createDialogVisible = false;
          this.loadBooks();
        },
        (error) => console.error('Error creating book:', error)
      );
    }
  }

  updateBook(form: NgForm): void {
    if (form.valid && this.selectedBook) {
      // Ensure all required fields are present
      if (!this.selectedBook.title?.trim() || 
          !this.selectedBook.author || 
          !this.selectedBook.isbn?.trim() || 
          !this.selectedBook.publicationYear) {
        this.messageService.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: 'Please fill in all required fields'
        });
        return;
      }

      // Convert author string to proper format
      let authorValue: string;
      if (typeof this.selectedBook.author === 'string') {
        // Split by comma and clean up each author
        authorValue = this.selectedBook.author
          .split(',')
          .map(author => author.trim())
          .filter(author => author.length > 0)
          .join(', ');
      } else {
        authorValue = this.selectedBook.author.join(', ');
      }

      // Convert themes to proper DTO format
      const themeDTOs = this.selectedBook.themes.map(theme => ({
        idTheme: theme.idTheme
      }));

      const updateDto: UpdateBookDTO = {
        idBook: this.selectedBook.idBook,
        title: this.selectedBook.title.trim(),
        author: authorValue,
        isbn: this.selectedBook.isbn.trim(),
        publicationYear: this.selectedBook.publicationYear,
        themes: themeDTOs
      };

      console.log('Sending update DTO:', updateDto); // For debugging

      this.booksService.updateBook(updateDto).subscribe(
        (response) => {
          if (typeof response === 'string') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response
            });
          } else {
            this.updateDialogVisible = false;
            this.loadBooks();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Book updated successfully'
            });
          }
        },
        (error) => {
          console.error('Error updating book:', error);
          const errorMessage = error.error?.message || 'Failed to update book. Please ensure all fields are filled correctly.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage
          });
        }
      );
    }
  }

  deleteBook(book: DataBookDTO): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.booksService.deleteBook({ idBook: book.idBook }).subscribe(
        () => {
          this.loadBooks();
        },
        (error) => console.error('Error deleting book:', error)
      );
    }
  }

  recoverBook(book: DataBookDTO): void {
    this.booksService.recoverBook({ idBook: book.idBook }).subscribe(
      () => {
        this.loadBooks();
      },
      (error) => console.error('Error recovering book:', error)
    );
  }

  toggleBookAvailability(book: DataBookDTO): void {
    this.booksService.updateBookAvailability({
      idBook: book.idBook,
      isAvailable: !book.isAvailable
    }).subscribe(
      () => {
        this.loadBooks();
      },
      (error) => console.error('Error updating book availability:', error)
    );
  }

  searchBooks(): void {
    // Clear any existing timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Set a new timeout to debounce the search
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 0; // Reset to first page when searching
      this.loading = true;

      // If search query is empty, load all books
      if (!this.searchQuery.trim()) {
        this.loadBooks();
        return;
      }

      this.booksService.getSearchedBooks(this.searchQuery.trim()).subscribe(
        (books) => {
          this.books = books;
          this.filteredBooks = books;
          this.totalRecords = books.length;
          this.loading = false;
        },
        (error) => {
          console.error('Error searching books:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to search books'
          });
          this.loading = false;
        }
      );
    }, 300); // Wait 300ms after user stops typing before searching
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.loadBooks();
  }
}
