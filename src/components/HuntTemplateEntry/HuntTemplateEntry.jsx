import React from "react";
import { Box, Text, Table, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import HuntInstanceEntry from "../HuntInstanceEntry/HuntInstanceEntry";

const HuntTemplateEntry = (props) => {
  const { hunts } = props;
  const [expandedRows, setExpandedRows] = useState([]);
  const [results, setResults] = useState({});

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      const revisedRows = expandedRows.filter((item) => {
        return item !== index;
      });
      setExpandedRows(revisedRows);
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  return (
    <div
      style={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        height: "65vh",
        marginTop: "20px",
      }}
    >
      <Flex width="100%" mt="20px">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="table-header-hunts">
                Hunt
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="table-header-date">
                Location
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {hunts.length > 0 ? (
              hunts.map((hunt, index) => (
                <React.Fragment key={index}>
                  <Table.Row>
                    <Table.RowHeaderCell style={{ textAlign: "center" }}>
                      <Button
                        variant="surface"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "150px",
                        }}
                        onClick={() => toggleRow(index)}
                      >
                        {hunt.name}
                      </Button>
                    </Table.RowHeaderCell>
                    <Table.Cell style={{ textAlign: "center" }}>
                      {hunt.location}
                    </Table.Cell>
                  </Table.Row>
                  {expandedRows.includes(index) && (
                    <HuntInstanceEntry
                      results={results}
                      setResults={setResults}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="2" style={{ textAlign: "center" }}>
                  <Text size="4" color="gray">
                    No scavenger hunts created.
                  </Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Flex>
    </div>
  );
};

export default HuntTemplateEntry;
