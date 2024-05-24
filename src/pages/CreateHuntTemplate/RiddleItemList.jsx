import React from 'react'
import { Flex, Table, Button } from '@radix-ui/themes';

const RiddleItemList = ({savedItems, deleteItemPair}) => {
  return (
    <Flex
    direction="column"
    wrap="nowrap"
    justify="center"
    maxHeight="200px"
    style={{ overflow: "scroll" }}
  >
    <Table.Root>
      {savedItems.length === 0 ? (
        <Table.Header>
          <Table.Row>
            <Table.Cell colSpan={4}>added items appear here</Table.Cell>
          </Table.Row>
        </Table.Header>
      ) : (
        <>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Riddle</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Total : {savedItems.length}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {savedItems.map((item, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell
                    style={{
                      maxWidth: "30vw",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.item}
                  </Table.Cell>
                  <Table.Cell
                    style={{
                      maxWidth: "40vw",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.riddle}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="soft"
                      onClick={(e) => deleteItemPair(idx)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </>
      )}
    </Table.Root>
  </Flex>
  )
}

export default RiddleItemList