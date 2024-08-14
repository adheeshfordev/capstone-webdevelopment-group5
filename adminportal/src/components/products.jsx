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
	required
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
			<TextInput source="name" validate={required()} />
			<TextInput source="description" validate={required()} />
			<NumberInput source="price" validate={required()} />
			<TextInput source="category" validate={required()} />
			<TextInput source="platform" validate={required()} />
			<TextInput source="imageUrl" />
			<TextInput source="developer" validate={required()} />
			<TextInput source="publisher" validate={required()} />
			<DateInput source="releaseDate" />
		</SimpleForm>
	</Edit>
);

export const ProductCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" validate={required()} />
			<TextInput source="description" validate={required()} />
			<NumberInput source="price" validate={required()} />
			<TextInput source="category" validate={required()} />
			<TextInput source="platform" validate={required()} />
			<TextInput source="imageUrl" />
			<TextInput source="developer" validate={required()} />
			<TextInput source="publisher" validate={required()} />
			<DateInput source="releaseDate" />
		</SimpleForm>
	</Create>
);
