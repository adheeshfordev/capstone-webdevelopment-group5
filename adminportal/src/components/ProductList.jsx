import React from "react";
import { Datagrid, DateField, EditButton, List, TextField } from "react-admin";

import EggIcon from "@mui/icons-material/Egg";
export const ProductIcon = EggIcon;

export const ProductList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source="name" />
				<TextField source="description" />
				<TextField source="platform" />
				<TextField source="imageUrl" />
				<TextField source="developer" />
				<TextField source="publisher" />
				<TextField source="releaseDate" />
				<DateField source="createdAt" />
				<DateField source="updatedAt" />
				<EditButton />
			</Datagrid>
		</List>
	);
};
