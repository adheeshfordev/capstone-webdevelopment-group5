import "./App.css";

import { Admin, Resource } from "react-admin";
import { UserCreate } from "./components/UserCreate";
import { UserIcon, UserList } from "./components/UserList";
import {
	ProductCreate,
	ProductEdit,
	ProductIcon,
	ProductList,
} from "./components/products";
import wrappedRestProvider from "./wrapped-ra-data-simple-rest";

function App() {
	return (
		<>
			<Admin dataProvider={wrappedRestProvider}>
				<Resource
					name="products"
					list={ProductList}
					edit={ProductEdit}
					create={ProductCreate}
					icon={ProductIcon}
				/>
				<Resource
					name="users"
					list={UserList}
					create={UserCreate}
					icon={UserIcon}
				/>
			</Admin>
			,
		</>
	);
}

export default App;
