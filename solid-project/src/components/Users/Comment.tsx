import { createEffect, createSignal, For, Show } from "solid-js";
import { User } from "~/types/User";
import { getCachedUsers } from "~/utils/UserManager";
import { ArticleComment } from "~/types/Comment";
import { ProfilePicture } from "./Profile";

interface CommentProps {
    comment: ArticleComment;
}

export default function Comment(props: CommentProps) {
    const [user, setUser] = createSignal<User| undefined>();
    const [users, setUsers] = createSignal<User[]| undefined>();

    createEffect(async () => {
        var response = await getCachedUsers();
        setUsers(response);
        if (response) setUser(response.find((u) => props.comment.userId == u.id));
        else setUser(undefined);
    });
    

    const getAuthorName = (userId: string) => {
        return user() ? `${user()?.firstName} ${user()?.lastName}` : `User ${userId}`;
    };

    return (
        <div>
            <Show
                when={user}
                fallback={
                    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span class="font-semibold text-gray-800">Unknown User</span>
                            <span>{new Date(props.comment.postedAt).toLocaleString()}</span>
                        </div>
                        <p class="mt-3 text-gray-700">{props.comment.content}</p>
                    </div>
                }
            >
                <ProfilePicture image={user()?.image} alt={`${user()?.firstName} ${user()?.lastName}`}/>
                <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span class="font-semibold text-gray-800">{getAuthorName(props.comment.userId)}</span>
                        <span>{new Date(props.comment.postedAt).toLocaleString()}</span>
                    </div>
                    <p class="mt-3 text-gray-700">{props.comment.content}</p>
                </div>
                <div class="mt-2 flex space-x-2">
                    <button class="text-sm text-blue-500 hover:text-blue-700">Edit</button>
                    <button class="text-sm text-red-500 hover:text-red-700">Delete</button>
                </div>
            </Show>
        </div>
    );
}

interface CommentsListProps {
    articleId: string;
}

export function CommentsList(props: CommentsListProps) {
    const [loading, setLoading] = createSignal(true);
    const [comments, setComments] = createSignal<ArticleComment[] | null>(null);

    createEffect(async () => {
    });

    return(
        <Show when={!loading()} fallback={<p class="text-gray-600">Loading comments...</p>}>
            <Show when={comments()?.length ?? 0 > 0} fallback={<p class="text-gray-600">No comments yet. Be the first to comment.</p>}>
                <div class="space-y-4">
                    <For each={comments()}>
                        {(comment) => (
                            <Comment comment={comment}/> 
                        )}
                    </For>
                </div>
            </Show>
        </Show>
    );
}