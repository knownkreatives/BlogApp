import { createSignal } from "solid-js";
import { User } from "~/types/User";
import { ArticleComment } from "~/types/Comment";

export const [currentUser, setCurrentUser] = createSignal<User | null>(null);

export async function signInUser(email: string, password: string): Promise<User | null> {
    const user = await authenticateUser(email, password);
    setCurrentUser(user);
    return user;
}

export function signOutUser(): void {
    setCurrentUser(null);
}

export function getCurrentUser(): User | null {
    return currentUser();
}

export const dummyUsers: User[] = [    // Dummy users for testing purposes
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
    },
    {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "password456",
    }
];

export function getAllDummyUsers(): User[] {
    return dummyUsers;
}
export function getAPIUsers(): Promise<User[]> {
    return fetchUsersFromAPI();
}

export function getDummyUserByEmail(email: string): User | undefined {
    return dummyUsers.find(user => user.email === email);
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
    const user1 = getDummyUserByEmail(email);
    if (user1 && user1.password === password) {
        return user1;
    }
    const user2 = await getAPIUsers().then(users => users.find(u => u.email === email && u.password === password) || null);
    if (user2) {
        return user2;
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

// The following functions are for handling user comments
export async function fetchCommentsForUser(userId: string): Promise<ArticleComment[]> {
    const response = await fetch(`/api/comments?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch comments for user ${userId}: ${response.statusText}`);
    }
    return response.json();
}

export async function postCommentForUser(userId: string, newsId: string, content: string): Promise<ArticleComment> {
    const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            newsId,
            content,
        }),
    });
    if (!response.ok) {
        throw new Error(`Failed to post comment for user ${userId}: ${response.statusText}`);
    }
    return response.json();
}

export async function editComment(commentId: string, content: string): Promise<ArticleComment> {
    const response = await fetch(`/api/comments/${encodeURIComponent(commentId)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
        }),
    });
    if (!response.ok) {
        throw new Error(`Failed to edit comment ${commentId}: ${response.statusText}`);
    }
    return response.json();
}