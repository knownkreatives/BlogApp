export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;           // In a real application, passwords should be hashed and not stored in plain text
    image: string;              // URL to the user's profile picture
}

export const dummyUsers: User[] = [    // Dummy users for testing purposes
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        image: "https://example.com/john-doe.jpg"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "password456",
        image: "https://example.com/jane-smith.jpg"
    }
];

export function getAllDummyUsers(): User[] {
    return dummyUsers;
}

export function getDummyUserByEmail(email: string): User | undefined {
    return dummyUsers.find(user => user.email === email);
}

export function authenticateUser(email: string, password: string): User | null {
    const user = getDummyUserByEmail(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
}

export async function fetchUsersFromAPI(): Promise<User[]> {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const data = await response.json();
    return data.users.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password, // In a real application, this should be handled securely
        image: user.image,
    }));
}

export var usersCache: User[] = [];

export async function getCachedUsers(): Promise<User[]> {
    if (usersCache.length > 0) {
        return usersCache;
    }
    const users = await fetchUsersFromAPI();
    usersCache.push(...users);
    return usersCache;
}

export async function fetchUserByEmail(email: string): Promise<User | undefined> {
    if (usersCache.length > 0) {
        return usersCache.find(user => user.email === email);
    }
    const users = await getCachedUsers();
    return users.find(user => user.email === email);
}