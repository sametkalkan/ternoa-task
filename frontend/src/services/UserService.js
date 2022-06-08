import {axiosClient} from "../config/axios";

const USER_URL = "/users"

async function login(data, signature) {
	try {
		return axiosClient.post(USER_URL + "/login", {data: data, signature: signature}, {});
	} catch (error) {
		return error;
	}
}

async function getUserInfo() {
	const token = localStorage.getItem('x-auth-token');
	const header = {'x-auth-token': token}
	try {
		return axiosClient.get(USER_URL + "/info", {headers: header});
	} catch (error) {
		return error;
	}
}

export const UserServices = {
	login,
	getUserInfo
};

