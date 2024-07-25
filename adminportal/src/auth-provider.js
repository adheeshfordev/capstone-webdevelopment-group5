const apiUrl = "http://localhost:3000"; // Your API base URL

const authProvider = {
	login: ({ username, password }) => {
		return fetch(`${apiUrl}/admin/login`, {
			method: "POST",
			body: JSON.stringify({ email: username, password }),
			headers: new Headers({ "Content-Type": "application/json" }),
		})
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json(); // Parse the response body as JSON
			})
			.then(({ token }) => {
				console.log(token);
				if (token) {
					localStorage.setItem("token", token); // Store the token in local storage
					console.log(localStorage.getItem("token"));
				} else {
					throw new Error("Token not found in response");
				}
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
