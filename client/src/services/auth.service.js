import api from "./api";

const register = (userData) => api.post("/auth/register", userData);
const login = (credentials) => api.post("/auth/login", credentials);
const verify = () => api.get("/auth/verify");

export { register, login, verify };