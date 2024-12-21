export interface Reservation {
    id: number;
    idUser: string;
    idBook: number;
    reservationDate: string;
    expirationDate: string;
    isActive: boolean;
}

export interface GetMyReservationsDTO {
    idUser: string;
}

export interface GetMyActiveReservationsDTO {
    idUser: string;
}

export interface GetReservationDTO {
    idReservation: number;
}

export interface GetMyReservationUserDTO {
    idUser: string;
    idReservation: number;
}

export interface GetActiveReservationDTO {
    idReservation: number;
}

export interface GetMyActiveReservationDTO {
    idUser: string;
    idReservation: number;
}

export interface CreateReservationDTO {
    idBook: number;
    idUser?: string; // This will be set by the service using the authenticated user
}

export interface DeleteReservationDTO {
    idReservation: number;
}
