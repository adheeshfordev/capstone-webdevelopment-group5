import "./App.css";

import { Admin, Resource } from "react-admin";
import authProvider from "./auth-provider";
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
			<Admin dataProvider={wrappedRestProvider} authProvider={authProvider}>
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
		</>
	);
}

export default App;
