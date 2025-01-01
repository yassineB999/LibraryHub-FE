export interface User {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    isDeleted: boolean;
}

export interface CreateUserDTO {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: string[];
}

export interface UpdateUserDTO {
    idUser: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    userType?: string;
    enabled?: boolean;
    roles?: string[];
}

export interface RecoverUserDTO {
    idUser: string;
}

export interface DeleteUserDTO {
    idUser: string;
}
