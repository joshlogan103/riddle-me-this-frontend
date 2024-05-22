import { Avatar, Flex, Separator, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { getProfile } from "../../services/serviceRoutes/userServices";
import ProfileInstancesList from "../../components/ProfileInstancesList/ProfileInstancesList";
import { Pencil2Icon } from "@radix-ui/react-icons";

const MyProfile = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getProfile();
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <Flex direction="column" className="" align="center">
      <div style={{position: "relative"}}>
        <Avatar src="" fallback="F" size="8" radius="full" m="6" />
        <Pencil2Icon style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          height: "20px",
          width: "20px",
          padding: "10px"
        }}/>
      </div>
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

export default MyProfile;
