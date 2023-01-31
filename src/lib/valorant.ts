import axios from 'axios';

export const apiValorant = axios.create({
  baseURL: 'https://valorant-api.com/v1',
});
