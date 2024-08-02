import React from "react";
import {
    Datagrid,
    DateField,
    List,
    NumberField,
    TextField,
} from "react-admin";

export const OrderList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="customer.email" label="Customer Email" />
                <TextField source="customer.firstName" label="Customer First Name" />
                <TextField source="customer.lastName" label="Customer Last Name" />
                <NumberField source="total" label="Total Amount" />
                <TextField source="status" />
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
            </Datagrid>
        </List>
    );
};
