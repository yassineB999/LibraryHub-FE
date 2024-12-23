// Theme DTOs
export interface DataThemeDTO {
    idTheme: number;
    name: string;
}

export interface CreateThemeDTO {
    name: string;
}

export interface UpdateThemeDTO {
    idTheme: number;
    name: string;
}

export interface DeleteThemeDTO {
    idTheme: number;
}
