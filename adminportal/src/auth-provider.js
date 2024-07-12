import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:3000"; // Your API base URL

const httpClient = (url, options = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: "application/json" });
	}
	const token = localStorage.getItem("token");
	options.headers.set("Authorization", `Bearer ${token}`);
	return fetchUtils.fetchJson(url, options);
};

const authProvider = {
	login: ({ username, password }) => {
		return fetch(`${apiUrl}/login`, {
			method: "POST",
			body: JSON.stringify({ email: username, password }),
			headers: new Headers({ "Content-Type": "application/json" }),
		})
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(({ token }) => {
				localStorage.setItem("token", token);
			});
	},
	logout: () => {
		localStorage.removeItem("token");
		return Promise.resolve();
	},
	checkError: (error) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem("token");
			return Promise.reject();
		}
		return Promise.resolve();
	},
	checkAuth: () => {
		return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
	},
	getPermissions: () => Promise.resolve(),
};

export default authProvider;
