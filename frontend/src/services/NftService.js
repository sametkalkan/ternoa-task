import {axiosClient} from "../config/axios";

const NFT_URL = "/nfts"

async function getNfts(userId, offset, limit) {
	try {
		const searchParams = new URLSearchParams();
		if (userId) {
			searchParams.append("userId", userId);
		}
		searchParams.append("offset", offset);
		searchParams.append("limit", limit);
		searchParams.toString();
		return axiosClient.get(NFT_URL + "/paged?" + searchParams);
	} catch (error) {
		return error;
	}
}

async function getNft(id) {
	try {
		const searchParams = new URLSearchParams();
		searchParams.append("id", id);
		searchParams.toString();
		return axiosClient.get(NFT_URL + "?" + searchParams);
	} catch (error) {
		return error;
	}
}

async function createNft(nft) {
	try {
		const token = localStorage.getItem('x-auth-token');
		const header = {'x-auth-token': token}
		return axiosClient.post(NFT_URL, nft, {headers: header});
	} catch (error) {
		return error;
	}
}

async function updateNft(nft) {
	try {
		const token = localStorage.getItem('x-auth-token');
		const header = {'x-auth-token': token}
		return axiosClient.put(NFT_URL, nft, {headers: header});
	} catch (error) {
		return error;
	}
}

async function deleteNft(id) {
	try {
		const token = localStorage.getItem('x-auth-token');
		const header = {'x-auth-token': token}
		const searchParams = new URLSearchParams();
		searchParams.append("id", id);
		searchParams.toString();
		return axiosClient.delete(NFT_URL + "?" + searchParams, {headers: header});
	} catch (error) {
		return error;
	}
}

export const NftServices = {
	getNft,
	getNfts,
	deleteNft,
	updateNft,
	createNft
};

