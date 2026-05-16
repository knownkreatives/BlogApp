import type { User } from "~/types/User";

interface UserProps {
    user: User;
}

export default function UserProfile(props: UserProps) {
    return (
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
                <ProfilePicture
                    image={props.user.image}
                    alt={`${props.user.firstName} ${props.user.lastName}`}
                />
                <div>
                    <h2 class="text-2xl font-semibold text-gray-900">{props.user.firstName} {props.user.lastName}</h2>
                    <p class="text-sm text-gray-500">{props.user.email}</p>
                </div>
            </div>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <div class="rounded-lg bg-slate-50 p-4">
                    <p class="text-sm text-gray-500">User ID</p>
                    <p class="mt-1 text-lg font-medium text-gray-900">{props.user.id}</p>
                </div>
                <div class="rounded-lg bg-slate-50 p-4">
                    <p class="text-sm text-gray-500">Email</p>
                    <p class="mt-1 text-lg font-medium text-gray-900">{props.user.email}</p>
                </div>
            </div>
        </div>
    );
}

interface ProfilePictureProps {
    image: string | undefined;
    alt?: string;
}

export function ProfilePicture(props: ProfilePictureProps) {
    return (
        <img
            src={props.image ?? "/20171206_01.jpg"}
            alt={props.alt}
            class="h-12 w-12 rounded-full object-cover"
        />
    );
}
