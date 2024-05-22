import React from "react";
import { Table } from "@radix-ui/themes";

const ProfileInstancesList = () => {
  return (
    <Table.Root m="4">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>name value</Table.Cell>
          <Table.Cell>date value</Table.Cell>
          <Table.Cell>location value really long one tho</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>name value</Table.Cell>
          <Table.Cell>date value</Table.Cell>
          <Table.Cell>location value really long one tho</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>name value</Table.Cell>
          <Table.Cell>date value</Table.Cell>
          <Table.Cell>location value really long one tho</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default ProfileInstancesList;
