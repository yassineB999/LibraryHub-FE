// User Type Enum
export enum UserTypeEnum {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    ADMIN = 'ADMIN'
}

// Theme DTO
export interface DataThemeDTO {
    idTheme: number;
    name: string;
}

// Book DTO
export interface DataBookDTO {
    idBook: number;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    isAvailable: boolean;
    themes: Set<DataThemeDTO>;
}

// Borrow DTO
export interface DataBorrowDTO {
    idBorrow: number;
    borrowDate: Date;
    returnDate: Date;
    actualReturnDate: Date;
    idUser: string;
    idBook: number;
}

// Reservation DTO
export interface DataReservationDTO {
    idReservation: number;
    reservationDate: Date;
    pickUpDate: Date;
    queuePosition: number;
    isActive: boolean;
    idUser: string;
    idBook: number;
}

// User DTO
export interface DataUserDTO {
    idUser: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    userType: UserTypeEnum;
}
