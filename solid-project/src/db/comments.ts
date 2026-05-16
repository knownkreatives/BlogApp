import Database from "better-sqlite3";
import { randomUUID } from "crypto";
import type { ArticleComment } from "~/types/Comment";
import { resolve } from "path";
import { cwd } from "process";

const dbPath = resolve(cwd(), "comments.sqlite");
console.log("[DB] Initializing database at:", dbPath);

let db: Database.Database;
try {
    db = new Database(dbPath);
    console.log("[DB] Database initialized successfully");
} catch (err) {
    console.error("[DB] Failed to initialize database at", dbPath, err);
    throw err;
}

db.prepare(
    `CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        newsId TEXT NOT NULL,
        userId TEXT NOT NULL,
        content TEXT NOT NULL,
        postedAt TEXT NOT NULL,
        edited INTEGER NOT NULL DEFAULT 0,
        editedAt TEXT,
        likes INTEGER NOT NULL DEFAULT 0,
        shares INTEGER NOT NULL DEFAULT 0
    )`
).run();

export function getCommentsByArticleId(newsId: string): ArticleComment[] {
    const rows = db.prepare(`SELECT * FROM comments WHERE newsId = ? ORDER BY postedAt DESC`).all(newsId) as any[];
    return rows.map((row) => ({
        id: row.id,
        newsId: row.newsId,
        userId: row.userId,
        content: row.content,
        postedAt: row.postedAt,
        edited: Boolean(row.edited),
        editedAt: row.editedAt ?? undefined,
        likes: row.likes,
        shares: row.shares,
    }));
}

export function addComment(newsId: string, userId: string, content: string): ArticleComment {
    const comment: ArticleComment = {
        id: randomUUID(),
        newsId,
        userId,
        content,
        postedAt: new Date().toISOString(),
        edited: false,
        likes: 0,
        shares: 0,
    };

    db.prepare(
        `INSERT INTO comments (id, newsId, userId, content, postedAt, edited, likes, shares)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(comment.id, comment.newsId, comment.userId, comment.content, comment.postedAt, 0, comment.likes, comment.shares);

    return comment;
}

export function likeComment(id: string, newsId: string): ArticleComment | undefined {
    const rows: ArticleComment[] = db.prepare(`SELECT * FROM comments WHERE newsId = ? ORDER BY postedAt DESC`).all(newsId) as any[];
    const row = rows.find((row) => row.id == id);
    if (row){
        row.likes += 1;
        db.prepare(
            `UPDATE comments SET likes = ? WHERE id = ?`
        ).run(row.likes, id);
    }
    return row;
}

export function shareComment(id: string, newsId: string): ArticleComment | undefined {
    const rows: ArticleComment[] = db.prepare(`SELECT * FROM comments WHERE newsId = ? ORDER BY postedAt DESC`).all(newsId) as any[];
    const row = rows.find((row) => row.id == id);
    if (row){
        row.shares += 1;
        db.prepare(
            `UPDATE comments SET shares = ? WHERE id = ?`
        ).run(row.shares, id);
    }
    return row;
}

export function editComment(id: string, newsId: string, newContent: string): ArticleComment | undefined {
    const rows: ArticleComment[] = db.prepare(`SELECT * FROM comments WHERE newsId = ? ORDER BY postedAt DESC`).all(newsId) as any[];
    const row = rows.find((row) => row.id == id);
    if (row){
        row.content = newContent;
        row.edited = true;
        row.editedAt = new Date().toISOString();
        db.prepare(
            `UPDATE comments SET content = ?, edited = ?, editedAt = ? WHERE id = ?`
        ).run(row.content, 1, row.editedAt, id);
    }
    return row;
}