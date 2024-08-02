import "./App.css";

import { Admin, Resource } from "react-admin";
import authProvider from "./auth-provider";
import {
	ProductCreate,
	ProductEdit,
	ProductIcon,
	ProductList,
} from "./components/products";
import ProductImageUpload from "./components/ProductImageUpload";
import { UserCreate, UserEdit, UserIcon, UserList } from "./components/users";
import { OrderList } from "./components/orders";
import wrappedRestProvider from "./wrapped-ra-data-simple-rest";

import ShoppingCart from "@mui/icons-material/ShoppingCart";
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
				<Resource
					name="orders"
					list={OrderList}
					icon={ShoppingCart}
				/>
				<Resource name="upload" list={ProductImageUpload} options={{ label: 'Upload Product Image' }} />
			</Admin>
		</>
	);
}

export default App;
