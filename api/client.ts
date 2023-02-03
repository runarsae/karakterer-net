import axios from 'axios';

export const fetcher = (url: string, params?: any) =>
    axios.get(url, { params: params }).then((res) => res.data);

const apiClient = axios.create();

export default apiClient;
