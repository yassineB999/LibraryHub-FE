import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

interface Theme {
  id: number;
  name: string;
}

interface Book {
  idBook: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  isAvailable: boolean;
  themes: Theme[];
  imageUrl?: string;
  status?: 'available' | 'borrowed' | 'reserved';
  dueDate?: Date;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  username: string = '';
  searchQuery: string = '';
  selectedCategory: string = 'all';
  viewMode: 'all' | 'borrowed' = 'all';
  categories: { label: string; value: string }[] = [];
  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private keycloak: KeycloakService) {}

  async ngOnInit() {
    try {
      // Load user profile
      const userProfile = await this.keycloak.loadUserProfile();
      this.username = userProfile.firstName || userProfile.username || '';

      // Load sample data (replace with API call)
      this.loadSampleData();
      
      // Initialize categories
      this.initializeCategories();
      
      // Initial filtering
      this.updateFilteredBooks();
    } catch (error) {
      console.error('Error initializing books component:', error);
    }
  }

  private loadSampleData() {
    this.books = [
      {
        idBook: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0743273565',
        publicationYear: 1925,
        isAvailable: true,
        themes: [{ id: 1, name: 'Fiction' }, { id: 2, name: 'Classic' }],
        imageUrl: 'https://covers.openlibrary.org/b/id/11983442-M.jpg',
        status: 'available'
      },
      {
        idBook: 2,
        title: '1984',
        author: 'George Orwell',
        isbn: '978-0451524935',
        publicationYear: 1949,
        isAvailable: false,
        themes: [{ id: 3, name: 'Science Fiction' }, { id: 4, name: 'Dystopian' }],
        imageUrl: 'https://covers.openlibrary.org/b/id/9269962-M.jpg',
        status: 'borrowed',
        dueDate: new Date('2024-01-10')
      },
      {
        idBook: 3,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0446310789',
        publicationYear: 1960,
        isAvailable: false,
        themes: [{ id: 1, name: 'Fiction' }, { id: 5, name: 'Literary' }],
        imageUrl: 'https://covers.openlibrary.org/b/id/679461-M.jpg',
        status: 'reserved'
      }
    ];
  }

  private initializeCategories() {
    const uniqueThemes = new Set<string>();
    this.books.forEach(book => {
      book.themes.forEach(theme => uniqueThemes.add(theme.name));
    });
    
    this.categories = [
      { label: 'All Categories', value: 'all' },
      ...Array.from(uniqueThemes).map(theme => ({
        label: theme,
        value: theme.toLowerCase()
      }))
    ];
  }

  updateFilteredBooks() {
    this.filteredBooks = this.books.filter(book => {
      const matchesSearch = !this.searchQuery || 
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.isbn.includes(this.searchQuery);
      
      const matchesCategory = this.selectedCategory === 'all' || 
        book.themes.some(theme => theme.name.toLowerCase() === this.selectedCategory);
      
      const matchesView = this.viewMode === 'all' || 
        (this.viewMode === 'borrowed' && book.status === 'borrowed');
      
      return matchesSearch && matchesCategory && matchesView;
    });
  }

  onSearchChange() {
    this.updateFilteredBooks();
  }

  onCategoryChange() {
    this.updateFilteredBooks();
  }

  onViewModeChange() {
    this.updateFilteredBooks();
  }

  borrowBook(book: Book) {
    if (!book.isAvailable) {
      return;
    }
    // TODO: Implement API call to borrow book
    console.log('Borrowing book:', book.title);
  }

  reserveBook(book: Book) {
    if (book.isAvailable) {
      return;
    }
    // TODO: Implement API call to reserve book
    console.log('Reserving book:', book.title);
  }

  returnBook(book: Book) {
    // TODO: Implement API call to return book
    console.log('Returning book:', book.title);
  }

  cancelReservation(book: Book) {
    // TODO: Implement API call to cancel reservation
    console.log('Canceling reservation for:', book.title);
  }

  getBookStatus(book: Book): 'available' | 'borrowed' | 'reserved' {
    return book.status || (book.isAvailable ? 'available' : 'borrowed');
  }
}
