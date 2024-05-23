import { Box, Text, Table, Button } from '@radix-ui/themes'

const HuntTemplateEntry = (props) => {
  const { hunts } = props

  return (
    <Box width="100%" mt="20px">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="table-header-hunts">Hunt</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="table-header-date">Location</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {hunts.length > 0 ? (
            hunts.map((hunt, index) => (
              <Table.Row key={index}>
                <Table.RowHeaderCell style={{textAlign: 'center'}}>
                    <Button
                      variant="surface"
                      style={{ textDecoration: 'none', color: 'inherit', width: '150px'}}
                    >
                      {hunt.name}
                    </Button>
                </Table.RowHeaderCell>
                <Table.Cell style={{textAlign: 'center'}}>{hunt.location}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="2" style={{ textAlign: 'center' }}>
                <Text size="4" color="gray">No scavenger hunts created.</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default HuntTemplateEntry