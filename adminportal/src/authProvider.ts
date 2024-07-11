// src/authProvider.js
import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRoZWVzaGxwQGdtYWlsLmNvbSIsImlhdCI6MTcyMDcxOTMyOSwiZXhwIjoxNzIwODA1NzI5fQ.TrwOlOuOT-cUycCyVaukF6emCaOjK1vZhMskBb2etBM";
  options.headers.set("Authorization", token);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider("http://localhost:3000", httpClient);

export default dataProvider;
