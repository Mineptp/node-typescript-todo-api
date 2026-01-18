import axiosClient from './instance';

const todoApi = {
/*************  ✨ Windsurf Command ⭐  *************/
/*******  e0ad47a6-c680-4ac8-8107-67424bb2eff9  *******/
    getAll(params)  {
        const url = '/todos';
        return axiosClient.get(url, { params }); // (url, config)
        // params dùng để lọc, phân trang.
    }, 
    get(id) {
        const url = `/todos/${id}`;
        return axiosClient.get(url); // (url, config)
    },
    add(data)  {
        const url = `/todos`;
        return axiosClient.post(url, data); // (url, data, config)
    },
    update(data) {
        const url = `/todos/${id}`;
        return axiosClient.patch(url, data); // (url, data, config)
    },
    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url); // (url, data, config)
    }
}
export default todoApi;
