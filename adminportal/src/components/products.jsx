import React from "react";
import {
	Create,
	Datagrid,
	DateField,
	DateInput,
	Edit,
	EditButton,
	List,
	NumberField,
	NumberInput,
	SimpleForm,
	TextField,
	TextInput,
} from "react-admin";

import EggIcon from "@mui/icons-material/Egg";
export const ProductIcon = EggIcon;

export const ProductList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source="name" />
				<TextField source="description" />
				<NumberField source="price" />
				<TextField source="category" />
				<TextField source="platform" />
				<TextField source="imageUrl" />
				<TextField source="developer" />
				<TextField source="publisher" />
				<DateField source="releaseDate" />
				<DateField source="createdAt" />
				<DateField source="updatedAt" />
				<EditButton />
			</Datagrid>
		</List>
	);
};

export const ProductEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="description" />
			<NumberInput source="price" />
			<TextInput source="category" />
			<TextInput source="platform" />
			<TextInput source="imageUrl" />
			<TextInput source="developer" />
			<TextInput source="publisher" />
			<DateInput source="releaseDate" />
		</SimpleForm>
	</Edit>
);

export const ProductCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="description" />
			<TextInput source="price" />
			<TextInput source="category" />
			<TextInput source="platform" />
			<TextInput source="imageUrl" />
			<TextInput source="developer" />
			<TextInput source="publisher" />
			<DateInput source="releaseDate" />
		</SimpleForm>
	</Create>
);
