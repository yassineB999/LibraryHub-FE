export interface Borrow {
    id: number;
    idUser: string;
    idBook: number;
    borrowDate: string;
    returnDate: string;
    isReturned: boolean;
}

export interface GetMyBorrowsDTO {
    idUser: string;
}

export interface GetMyBorrowByIdDTO {
    idBorrow: number;
    idUser: string;
}

export interface GetLatestBorrowByIdBookDTO {
    idBook: number;
}

export interface GetBorrowByIdDTO {
    idBorrow: number;
}

export interface CreateBorrowDTO {
    idBook: number;
    idUser?: string; // This will be set by the service using the authenticated user
}

export interface UpdateBorrowDTO {
    idBorrow: number;
    returnDate?: string;
    isReturned?: boolean;
    idUser?: string; // This will be set by the service using the authenticated user
}

export interface DeleteBorrowDTO {
    idBorrow: number;
}
