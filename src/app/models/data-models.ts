// User Type Enum
export enum UserTypeEnum {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    ADMIN = 'ADMIN'
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
