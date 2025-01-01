import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../../../service/api/books.service';
import { DataBookDTO, CreateBookDTO, UpdateBookDTO, DataThemeDTO } from '../../../models/book.model';

@Component({
  selector: 'app-bookmanagement',
  templateUrl: './bookmanagement.component.html',
  styleUrls: ['./bookmanagement.component.css']
})
export class BookmanagementComponent implements OnInit {
  books: DataBookDTO[] = [];
  searchQuery: string = '';
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

  constructor(private booksService: BooksService) {
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
      const updateDto: UpdateBookDTO = {
        idBook: this.selectedBook.idBook,
        title: this.selectedBook.title,
        author: this.getAuthorDisplay(this.selectedBook.author),
        isbn: this.selectedBook.isbn,
        publicationYear: this.selectedBook.publicationYear
      };

      this.booksService.updateBook(updateDto).subscribe(
        () => {
          this.updateDialogVisible = false;
          this.loadBooks();
        },
        (error) => console.error('Error updating book:', error)
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
    this.currentPage = 0; // Reset to first page when searching
    this.loadBooks();
  }
}
