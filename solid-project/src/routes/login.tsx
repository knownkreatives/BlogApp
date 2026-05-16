import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { signInUser } from "~/utils/UserManager";

export default function Login() {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [error, setError] = createSignal("");
    const navigate = useNavigate();

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        setError("");

        const user = await signInUser(email(), password());
        if (user) {
            navigate("/profile");
            return;
        }

        setError("Invalid email or password. Try john.doe@example.com / password123.");
    };

    return (
        <main class="mx-auto text-gray-700 p-4 max-w-md">
            <section>
                <h1 class="text-4xl font-bold text-gray-800 mb-4">Sign In</h1>
                <p class="text-gray-600 mb-6">Use a dummy account to sign in and access profile features.</p>
                <form class="space-y-4" onSubmit={handleSubmit}>
                    <label class="block">
                        <span class="text-sm font-medium text-gray-700">Email</span>
                        <input
                            type="email"
                            value={email()}
                            onInput={(e) => setEmail(e.currentTarget.value)}
                            class="mt-1 block w-full rounded border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                            placeholder="john.doe@example.com"
                            required
                        />
                    </label>

                    <label class="block">
                        <span class="text-sm font-medium text-gray-700">Password</span>
                        <input
                            type="password"
                            value={password()}
                            onInput={(e) => setPassword(e.currentTarget.value)}
                            class="mt-1 block w-full rounded border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                            placeholder="password123"
                            required
                        />
                    </label>

                    {error() && <p class="text-sm text-red-600">{error()}</p>}

                    <button
                        type="submit"
                        class="w-full rounded bg-sky-700 px-4 py-2 text-white hover:bg-sky-600"
                    >
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}
