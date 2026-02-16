// app/hooks/useAuth.ts
"use client";
import { getToken, removeToken } from "@/lib/token";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check token and decode user info on mount
    useEffect(() => {
        const token = getToken();

        if (token) {
            try {
                // JWT token  decode to get user info and check expiration
                // JWT format: header.payload.signature
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                );

                const payload = JSON.parse(jsonPayload);

                // Check if token is expired
                const currentTime = Date.now() / 1000;
                if (payload.exp && payload.exp < currentTime) {
                    console.log("Token expired");
                    removeToken();
                    setIsAuthenticated(false);
                    setUser(null);
                } else {
                    // Token valid, set user data
                    setIsAuthenticated(true);
                    setUser({
                        id: payload.id,
                        username: payload.username || payload.email.split('@')[0],
                        email: payload.email,
                        role: payload.role || 'user'
                    });
                }
            } catch (error) {
                console.error('Failed to decode token:', error);
                removeToken();
                setIsAuthenticated(false);
                setUser(null);
            }
        }

        setLoading(false);
    }, []);

    const logout = useCallback(() => {
        removeToken();
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
        router.refresh();
    }, [router]);

    return {
        isAuthenticated,
        user,
        loading,
        logout,
    };
}