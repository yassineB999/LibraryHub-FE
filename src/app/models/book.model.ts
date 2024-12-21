export interface Book {
    id?: number;
    title: string;
    author: string;
    description: string;
    isAvailable: boolean;
    isDeleted: boolean;
    themes?: string[];
}

export interface CreateBookDTO {
    title: string;
    author: string;
    description: string;
}

export interface UpdateBookDTO {
    idBook: number;
    title?: string;
    author?: string;
    description?: string;
}

export interface UpdateBookAvailabilityDTO {
    idBook: number;
    isAvailable: boolean;
}

export interface AddThemeToBookDTO {
    idBook: number;
    themeName: string;
}

export interface RecoverBookDTO {
    idBook: number;
}

export interface DeleteBookDTO {
    idBook: number;
}

export interface DeleteThemeFromBookDTO {
    idBook: number;
    themeName: string;
}
