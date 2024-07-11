// src/App.tsx
import "./App.css";
import { Admin, Resource } from "react-admin";
import dataProvider from "./authProvider";
import { ProductIcon, ProductList } from "./components/ProductList";
import { UserIcon, UserList } from "./components/UserList";

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="products" list={ProductList} icon={ProductIcon} />
      <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
  );
}

export default App;
