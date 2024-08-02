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
	useNotify,
	useRedirect,
	useRefresh,
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

export const UserEdit = (props) => {
	const notify = useNotify();
	const refresh = useRefresh();
	const redirect = useRedirect();

	const onSuccess = (data) => {
		notify("User updated successfully", { type: "success" });
		redirect("/users");
		refresh();
	};

	const onError = (error) => {
		console.log(error);
		console.log("something was caught");
		if (error && error.body && error.body.errors) {
			error.body.errors.forEach((err) => notify(err, { type: "error" }));
		} else {
			notify(`Error: ${error.message || "Could not update user"}`, {
				type: "error",
			});
		}
	};
	const onFailure = (error) => {
		console.log("Failure caught in onFailure:", error);
		notify(`Failure: ${error.message || "Could not update user"}`, {
			type: "error",
		});
	};

	return (
		<Edit
			{...props}
			mutationOptions={{
				onSuccess,
				onError,
				onFailure,
				mutationMode: "pessimistic",
			}}
		>
			<SimpleForm>
				<TextInput disabled source="id" />
				<TextInput source="email" />
				<TextInput source="firstName" />
				<TextInput source="lastName" />
				<PasswordInput source="password" />
				<SelectInput
					source="userType"
					choices={[
						{ id: "user", name: "User" },
						{ id: "admin", name: "Admin" },
					]}
				/>
			</SimpleForm>
		</Edit>
	);
};

export const UserCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="email" />
			<TextInput source="firstName" />
			<TextInput source="lastName" />
			<PasswordInput source="password" />
			<SelectInput source="userType" choices={userTypeChoices} />
		</SimpleForm>
	</Create>
);
