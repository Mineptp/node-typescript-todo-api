import axios from 'axios';
const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Thay bằng URL thật của backend
    headers: {
        'Content-Type': 'application/json',
    },
});
axiosClient.interceptors.request.use(async (config) => {
    return config;
});
axiosClient.interceptors.response.use((response) => {
    return response.data; // Chỉ lấy data, bỏ qua các thông tin header rườm rà
}, (error) => {
    throw error;
});
export default axiosClient;