import { createSignal } from "solid-js";
import { User } from "~/types/User";
import { Comment } from "~/types/Comment";

export const [currentUser, setCurrentUser] = createSignal<User | null>(null);

export function getCurrentUser(): User | null {
    return currentUser();
}

export function getUsers(): Promise<User[]> {
    return fetchUsersFromAPI();
}

export async function signInUser(email: string, password: string): Promise<User | null> {
    const user = await authenticateUser(email, password);
    setCurrentUser(user);
    return user;
}

export function signOutUser(): void {
    setCurrentUser(null);
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await getUsers().then(users => users.find(u => u.email === email && u.password === password) || null);
    if (user) {
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

export async function fetchUserByEmail(email: string): Promise<User | undefined> {
    const users = await fetchUsersFromAPI();
    return users.find(user => user.email === email);
}

// The following functions are for handling user comments
export async function fetchCommentsForUser(userId: string): Promise<Comment[]> {
    const response = await fetch(`/api/comments?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch comments for user ${userId}: ${response.statusText}`);
    }
    return response.json();
}

export async function postCommentForUser(userId: string, newsId: string, content: string): Promise<Comment> {
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

export async function editComment(commentId: string, content: string): Promise<Comment> {
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

export async function deleteComment(userId: string, commentId: string, content: string): Promise<Comment> {
    const response = await fetch(`/api/comments/${encodeURIComponent(commentId)}`, {
        method: "DELETE",
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