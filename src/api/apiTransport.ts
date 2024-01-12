import axios from 'axios';
import { BASE_AUTH_URL, BASE_URL, DEFAULT_HEADERS } from '~/config/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

export const axiosAuthInstance = axios.create({
  baseURL: BASE_AUTH_URL,
  headers: { ...DEFAULT_HEADERS },
});
