import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'

const LaunchHunt = () => {
  return (
    <Flex
      className="launch-hunt-container"
      direction="column"
      gap="20px"
      align="center"
      style={{ marginTop: '40px' }} 
    >
      <Text as="h1" size="6" weight="bold" color="indigo" variant="soft" highContrast>Launch a Hunt</Text>   
      <Flex direction="column" gap="20px" width="100%"> 
      <Text as="label" htmlFor="start-time" color="green" size="4xl" weight="medium">Start time</Text>
        <input id="start-time" type="text" />

        <Text as="label" htmlFor="end-time" color="red" size="4xl" weight="medium">End time</Text>
        <input id="end-time" type="text" />

        <Flex direction="column" gap="40px" width="100%"> 
        <Button color="indigo" variant="soft" size="large">Launch</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};


export default LaunchHunt;