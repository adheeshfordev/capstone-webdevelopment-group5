import "./App.css";

import restProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";

function App() {
	return (
		<>
			<Admin dataProvider={restProvider("http://localhost:3000")}>
				// <Resource name="products" />
			</Admin>
			,
		</>
	);
}

export default App;
