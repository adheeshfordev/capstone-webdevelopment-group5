import "./App.css";

import { Admin, Resource } from "react-admin";
import { ProductIcon, ProductList } from "./components/ProductList";
import wrappedRestProvider from "./wrapped-ra-data-simple-rest";

function App() {
	return (
		<>
			<Admin dataProvider={wrappedRestProvider}>
				<Resource name="products" list={ProductList} icon={ProductIcon} />
			</Admin>
			,
		</>
	);
}

export default App;
