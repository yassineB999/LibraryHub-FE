export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    isDeleted: boolean;
    roles: string[];
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
    enabled?: boolean;
    roles?: string[];
}

export interface RecoverUserDTO {
    idUser: string;
}

export interface DeleteUserDTO {
    idUser: string;
}
