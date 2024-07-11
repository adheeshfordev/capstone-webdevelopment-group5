// src/components/UserList.tsx
import React from "react";
import { List, Datagrid, TextField, EmailField, ListProps } from "react-admin";
import PersonIcon from "@mui/icons-material/Person";

export const UserIcon = PersonIcon;

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="userType" />
    </Datagrid>
  </List>
);
 