import React from "react";
import {
	Create,
	Datagrid,
	DateField,
	Edit,
	EditButton,
	List,
	PasswordInput,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	required
} from "react-admin";

import AccountBox from "@mui/icons-material/Egg";
export const UserIcon = AccountBox;

const userTypeChoices = [
	{ id: "user", name: "User" },
	{ id: "admin", name: "Admin" },
];

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
			<TextInput source="email" validate={required()}/>
			<TextInput source="firstName" validate={required()}/>
			<TextInput source="lastName" validate={required()}/>
			<PasswordInput source="password" />
			<SelectInput source="userType" validate={required()} choices={userTypeChoices} />
		</SimpleForm>
	</Edit>
);

export const UserCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="email" validate={required()}/>
			<TextInput source="firstName" validate={required()}/>
			<TextInput source="lastName" validate={required()}/>
			<PasswordInput source="password" validate={required()} />
			<SelectInput source="userType" validate={required()} choices={userTypeChoices} />
		</SimpleForm>
	</Create>
);
