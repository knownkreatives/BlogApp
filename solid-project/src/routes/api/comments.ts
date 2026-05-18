import { addComment, editComment, deleteComment, getCommentsByArticleId } from "~/db/comments";

const jsonHeaders = { "Content-Type": "application/json" };

export async function GET(event: { request: Request }) {
    try {
        const url = new URL(event.request.url);
        const newsId = url.searchParams.get("newsId");

        if (!newsId) {
            return new Response(JSON.stringify({ error: "Missing newsId" }), {
                status: 400,
                headers: jsonHeaders,
            });
        }

        const comments = getCommentsByArticleId(newsId);
        return new Response(JSON.stringify(comments), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("GET /api/comments error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch comments" }), {
            status: 500,
            headers: jsonHeaders,
        });
    }
}

export async function POST(event: { request: Request }) {
    try {
        const body = await event.request.json();
        const newsId = body.newsId;
        const userId = body.userId;
        const content = body.content?.toString().trim();

        if (!newsId || !userId || !content) {
            return new Response(JSON.stringify({ error: "newsId, userId, and content are required" }), {
                status: 400,
                headers: jsonHeaders,
            });
        }

        const comment = addComment(newsId, userId, content);
        return new Response(JSON.stringify(comment), {
            status: 201,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("POST /api/comments error:", error);
        return new Response(JSON.stringify({ error: "Failed to post comment", details: String(error) }), {
            status: 500,
            headers: jsonHeaders,
        });
    }
}

export async function PUT(event: { request: Request }) {
    try {
        const url = new URL(event.request.url);
        const commentId = url.pathname.split("/").pop();
        const body = await event.request.json();
        const content = body.content?.toString().trim();
        const mode = body.mode;
        const newsId = body.newsId;

        if (!commentId || !content) {
            return new Response(JSON.stringify({ error: "commentId and content are required" }), {
                status: 400,
                headers: jsonHeaders,
            });
        }

        const comment = editComment(commentId, content, newsId);
        return new Response(JSON.stringify(comment), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("PUT /api/comments error:", error);
        return new Response(JSON.stringify({ error: "Failed to edit comment", details: String(error) }), {
            status: 500,
            headers: jsonHeaders,
        });
    }
}

export async function DELETE(event: { request: Request }) {
    try {
        const url = new URL(event.request.url);
        const commentId = url.pathname.split("/").pop();
        const body = await event.request.json();
        const newsId = body.newsId;
        if (!commentId) {
            return new Response(JSON.stringify({ error: "commentId is required" }), {
                status: 400,
                headers: jsonHeaders,
            });
        }
        const comment = deleteComment(commentId, newsId);
        return new Response(JSON.stringify(comment), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("DELETE /api/comments error:", error);
        return new Response(JSON.stringify({ error: "Failed to delete comment", details: String(error) }), {
            status: 500,
            headers: jsonHeaders,
        });
    }
}
