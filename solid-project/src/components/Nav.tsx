import { useLocation, useNavigate, A } from "@solidjs/router";
import { Show } from "solid-js";
import { currentUser, signOutUser } from "~/utils/UserManager";

export default function Nav() {
	const location = useLocation();
	const navigate = useNavigate();
	const active = (path: string) =>
		path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

	const user = currentUser();

	return (
		<nav class="bg-sky-800 sticky top-0">
			<div class="container flex flex-wrap items-center justify-between p-3 text-gray-200">
				<ul class="flex flex-wrap items-center gap-4">
					<li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
						<A href="/">Home</A>
					</li>
					<li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
						<A href="/about">About</A>
					</li>
					<li class={`border-b-2 ${active("/blog")} mx-1.5 sm:mx-6`}>
						<A href="/blog">Blog</A>
					</li>
				</ul>

				<div class="flex items-center gap-4">
					<Show
						when={user}
						fallback={
							<A href="/login" class="border-b-2 border-transparent hover:border-sky-600">
								Login
							</A>
						}
					>
						<span class="hidden sm:inline">Signed in as {user?.firstName}</span>
						<A href="/profile" class="border-b-2 border-transparent hover:border-sky-600">
							Profile
						</A>
						<button
							type="button"
							class="text-left border-b-2 border-transparent hover:border-sky-600"
							onClick={() => {
								signOutUser();
								navigate("/");
							}}
						>
							Logout
						</button>
					</Show>
				</div>
			</div>
		</nav>
	);
}
