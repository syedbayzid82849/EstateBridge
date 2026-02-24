"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "user"

export type AuthUser = {
    id: string
    name: string
    email: string
    avatar?: string
    role: UserRole
}

type AuthContextType = {
    user: AuthUser | null
    isAdmin: boolean
    isUser: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

// ─── Dummy Users ──────────────────────────────────────────────────────────────

const DUMMY_USERS: Record<string, AuthUser> = {
    "admin@estatebridge.com": {
        id: "admin_001",
        name: "Admin Rahman",
        email: "admin@estatebridge.com",
        avatar: "",
        role: "admin",
    },
    "user@estatebridge.com": {
        id: "user_001",
        name: "Rahim Hossain",
        email: "user@estatebridge.com",
        avatar: "",
        role: "user",
    },
}

const DUMMY_PASSWORDS: Record<string, string> = {
    "admin@estatebridge.com": "admin123",
    "user@estatebridge.com": "user123",
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAdmin: false,
    isUser: false,
    isLoading: true,
    login: async () => { },
    logout: () => { },
})

export const useAuth = () => useContext(AuthContext)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const saved = localStorage.getItem("eb_user")
            if (saved) setUser(JSON.parse(saved))
        } catch (_) { }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true)

        // TODO: Replace with real API →
        // const { data } = await api.post("/auth/login", { email, password })
        // setUser(data.user)
        // localStorage.setItem("eb_user", JSON.stringify(data.user))

        await new Promise((r) => setTimeout(r, 800)) // fake delay

        const foundUser = DUMMY_USERS[email]
        const correctPassword = DUMMY_PASSWORDS[email]

        if (!foundUser || correctPassword !== password) {
            setIsLoading(false)
            throw new Error("Invalid email or password")
        }

        setUser(foundUser)
        localStorage.setItem("eb_user", JSON.stringify(foundUser))
        setIsLoading(false)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("eb_user")
        window.location.href = "/login"
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAdmin: user?.role === "admin",
                isUser: user?.role === "user",
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}