import React from "react";
import {
	Create,
	Datagrid,
	DateField,
	Edit,
	EditButton,
	List,
	SimpleForm,
	TextField,
	TextInput,
} from "react-admin";

import AccountBox from "@mui/icons-material/Egg";
export const UserIcon = AccountBox;

export const UserList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source="email" />
				<TextField source="firstName" />
				<TextField source="lastName" />
				<TextField source="userType" />
				<DateField source="createdAt" />
				<DateField source="updatedAt" />
				<EditButton />
			</Datagrid>
		</List>
	);
};

export const UserEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="email" />
			<TextInput source="firstName" />
			<TextInput source="lastName" />
			<TextInput source="userType" />
		</SimpleForm>
	</Edit>
);

export const UserCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="email" />
			<TextInput source="firstName" />
			<TextInput source="lastName" />
			<TextInput source="userType" />
		</SimpleForm>
	</Create>
);
