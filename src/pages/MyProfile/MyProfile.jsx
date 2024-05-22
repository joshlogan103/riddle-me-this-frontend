import { Avatar, Flex, Separator, Table, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { getProfile } from "../../services/serviceRoutes/userServices";
import { NavLink } from "react-router-dom";
import ProfileInstancesList from "../../components/ProfileInstancesList/ProfileInstancesList";

const MyProfile = () => {
  useEffect(() => {
    const fetchUserData = () => {
      try {
        // const userData = getProfile()
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <Flex direction="column" className="" align="center">
      <Avatar src="" fallback="F" size="8" radius="full" m="6" />
      <Text size="6">Username</Text>
      <Separator orientation="horizontal" m="7" style={{ width: "80%" }} />
      <Tabs.Root defaultValue="upcoming">
        <Flex direction="column" align="center">
          <Tabs.List>
            <Tabs.Trigger value="upcoming">Upcoming Games</Tabs.Trigger>
            <Tabs.Trigger value="previous">Previous Games</Tabs.Trigger>
          </Tabs.List>
        </Flex>
        <Tabs.Content value="upcoming">
          <ProfileInstancesList />
        </Tabs.Content>
        <Tabs.Content value="previous">
          <ProfileInstancesList />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};
// name, date
export default MyProfile;
