import React from 'react'

const RegisterFields = () => {
  return (
    <Dialog.Content maxWidth="450px">
    <Dialog.Title>Create Account</Dialog.Title>
    <Dialog.Description size="2" mb="4">
      You must login before performing this function
    </Dialog.Description>

    <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Email
        </Text>
        <TextField.Root
          defaultValue=""
          placeholder="password"
          type="password"
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Username
        </Text>
        <TextField.Root
          defaultValue="Bob the Builder"
          placeholder="Enter username"
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Password
        </Text>
        <TextField.Root
          defaultValue=""
          placeholder="password"
          type="password"
        />
      </label>
    </Flex>
    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button>Submit</Button>
      </Dialog.Close>
    </Flex>
  </Dialog.Content>
  )
}

export default RegisterFields