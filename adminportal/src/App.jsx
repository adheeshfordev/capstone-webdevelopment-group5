import "./App.css";

import { Admin, Resource } from "react-admin";
import {
	ProductCreate,
	ProductEdit,
	ProductIcon,
	ProductList,
} from "./components/products";
import { UserCreate, UserEdit, UserIcon, UserList } from "./components/users";
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
					edit={UserEdit}
					create={UserCreate}
					icon={UserIcon}
				/>
			</Admin>
			,
		</>
	);
}

export default App;
