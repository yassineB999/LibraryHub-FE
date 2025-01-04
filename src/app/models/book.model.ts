// Theme DTO
export interface DataThemeDTO {
    idTheme: number;
    name: string;
}

// Book DTO
export interface DataBookDTO {
    idBook: number;
    title: string;
    author: string | string[];
    isbn: string;
    imageUrl: string;
    publicationYear: number;
    isAvailable: boolean;
    themes: DataThemeDTO[];
}

// DTOs for Book Operations
export interface CreateBookDTO {
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    themes: number[];
}

export interface CreateThemeDTO {
    idTheme: number;
}

export interface UpdateBookDTO {
    idBook: number;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    themes: CreateThemeDTO[];
}

export interface UpdateBookAvailabilityDTO {
    idBook: number;
    isAvailable: boolean;
}

export interface AddThemeToBookDTO {
    idBook: number;
    idTheme: number;
}

export interface RecoverBookDTO {
    idBook: number;
}

export interface DeleteBookDTO {
    idBook: number;
}

export interface DeleteThemeFromBookDTO {
    idBook: number;
    idTheme: number;
}