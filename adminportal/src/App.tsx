import "./App.css";

import restProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";
import { ProductIcon, ProductList } from "./components/ProductList";

function App() {
	return (
		<>
			<Admin dataProvider={restProvider("http://localhost:3000")}>
				<Resource name="products" list={ProductList} icon={ProductIcon} />
			</Admin>
			,
		</>
	);
}

export default App;
