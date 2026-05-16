export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;           // In a real application, passwords should be hashed and not stored in plain text
    image?: string;             // URL to the user's profile picture
}