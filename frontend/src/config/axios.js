import axios from 'axios';

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL_LOCAL;

axiosClient.defaults.headers = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	// 'Access-Control-Allow-Origin': '*',
	// "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
};

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

// axiosClient.defaults.withCredentials = true;
