import axios from 'axios';

// base url for requests
export const baseURL = axios.create({
	baseURL: 'https://homologacao3.azapfy.com.br/api/ps/',
})