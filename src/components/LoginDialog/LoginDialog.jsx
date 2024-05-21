import React, { useState } from "react";
import { Dialog, Flex, Button, TextField, Text } from "@radix-ui/themes";

const LoginDialog = ({ buttonName }) => {
  const [registering, setRegistering] = useState(false);

  const toggleRegistering = () => {
    setRegistering(!registering)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="surface">{buttonName}</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{registering ? "Create Account" : "Login"}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          You must login before performing this function
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {registering ? (
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                defaultValue="Bob the Builder"
                placeholder="Enter username"
              />
            </label>
          ) : null}
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
            <Button variant="surface" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="surface">Submit</Button>
          </Dialog.Close>
        </Flex>
        <p>Need to <a onClick={toggleRegistering}>Create an Account?</a></p>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default LoginDialog;
