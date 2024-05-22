import React, { useContext, useReducer, useState } from "react";
import { Dialog, Flex, Button, TextField, Text } from "@radix-ui/themes";
import {
  loginUser,
  createUser,
} from "../../services/serviceRoutes/userServices";
import { AuthContext } from "../../contexts/AuthContext";

const LoginDialog = ({ buttonName }) => {
  const { loginUserAuth } = useContext(AuthContext);
  const [registering, setRegistering] = useState(false);
  const toggleRegistering = () => {
    setRegistering(!registering);
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const formState = {
      username: username,
      password: password,
    };
    registering
      ? createUser({
          ...formState,
          email: email,
        })
      : loginUserAuth(formState);
    console.log(formState);
  };

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
                placeholder="Enter username"
                name="email"
                value={email}
                onChange={(e) => handleEmail(e)}
              />
            </label>
          ) : null}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={(e) => handleUsername(e)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => handlePassword(e)}
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
            <Button variant="surface" onClick={handleSubmit}>
              Submit
            </Button>
          </Dialog.Close>
        </Flex>
        <p>
          Need to <a onClick={toggleRegistering}>Create an Account?</a>
        </p>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default LoginDialog;
