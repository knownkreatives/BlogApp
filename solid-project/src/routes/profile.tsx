import { A } from "@solidjs/router";
import { currentUser } from "~/utils/UserManager";
import UserProfile from "~/components/Users/Profile";

export default function Profile() {
    const user = currentUser();

    return (
        <main class="mx-auto text-gray-700 p-4 max-w-3xl">
            <section>
                <h1 class="text-4xl font-bold text-gray-800 mb-4">Your Profile</h1>
                {user ? (
                    <UserProfile user={user} />
                ) : (
                    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p class="text-gray-700 mb-4">You are not signed in.</p>
                        <A href="/login" class="rounded bg-sky-700 px-4 py-2 text-white hover:bg-sky-600">
                            Go to login
                        </A>
                    </div>
                )}
            </section>
        </main>
    );
}
