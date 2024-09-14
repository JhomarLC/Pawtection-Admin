import { UserModel } from "../../app/modules/auth";

export const backendProfiles = (pathname: string) =>
    import.meta.env.VITE_APP_BACKEND_PROFILES + pathname;

export const getUserImage = (user: UserModel | undefined): string => {
    return user?.user.image ? user.user.image : 'default-image.png'; // Fallback to a default image if none is provided
};