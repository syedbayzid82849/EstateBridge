import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
    headers: { "Content-Type": "application/json" },
})

// Request — JWT token auto attach
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    console.log("ajhsfjkaskjfkjsa", token);
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Response — 401 to logout
api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
        console.log("401");
        return Promise.reject(error)
    }
)

export default api