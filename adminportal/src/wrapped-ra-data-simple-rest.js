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

const restProvider = simpleRestProvider(apiUrl, httpClient);

const wrappedRestProvider = {
	...restProvider,
	getList: (resource, params) =>
		restProvider.getList(resource, params).then((response) => ({
			...response,
			data: response.data.map((resource) => ({
				...resource,
				id: resource._id,
			})),
		})),
	getOne: (resource, params) =>
		restProvider.getOne(resource, params).then((response) => ({
			...response,
			data: { ...response.data, id: response.data._id },
		})),
	getMany: (resource, params) =>
		restProvider.getMany(resource, params).then((response) => ({
			...response,
			data: response.data.map((resource) => ({
				...resource,
				id: resource._id,
			})),
		})),
	getManyReference: (resource, params) =>
		restProvider.getManyReference(resource, params).then((response) => ({
			...response,
			data: response.data.map((resource) => ({
				...resource,
				id: resource._id,
			})),
		})),
	update: (resource, params) =>
		restProvider.update(resource, params).then((response) => ({
			...response,
			data: { ...response.data, id: response.data._id },
		})),
	create: (resource, params) =>
		restProvider.create(resource, params).then((response) => ({
			...response,
			data: { ...params.data, id: response.data._id },
		})),
	delete: (resource, params) =>
		restProvider.delete(resource, params).then((response) => ({
			...response,
			data: { ...response.data, id: response.data._id },
		})),
};

export default wrappedRestProvider;
