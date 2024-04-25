import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;

}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED'
    }

    return token

}

export function getRole() {
    const role = localStorage.getItem('role')

    if (!role) {
        return null
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return null
    }

    return role
}

export function tokenLoader() {
    const token = getAuthToken();
    const role = getRole();

    return { token, role };
}