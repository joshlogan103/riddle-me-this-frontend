import React from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';

const LaunchHunt = () => {
  return (
    <Flex
      className="launch-hunt-container"
      direction="column"
      gap="20px"
      align="center"
      style={{ marginTop: '30px', width: '90%', maxWidth: '300px', margin: '0 auto' }}
    >
      <Text as="h1" size="6" weight="bold" color="indigo" variant="soft" highContrast textAlign="center">
        Launch a Hunt
      </Text>
      <Flex direction="column" gap="10px" width="100%">
        <Text as="label" htmlFor="start-date" size="3" weight="medium" variant="surface">
          Start Date:
        </Text>
        <input id="start-date" type="date" style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <Text as="label" htmlFor="start-time" size="3" weight="medium" variant="surface">
          Start Time:
        </Text>
        <input id="start-time" type="time" style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <Text as="label" htmlFor="end-date" size="3" weight="medium" variant="surface">
          End Date:
        </Text>
        <input id="end-date" type="date" style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <Text as="label" htmlFor="end-time" size="3" weight="medium" variant="surface">
          End Time:
        </Text>
        <input id="end-time" type="time" style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <Button color="indigo" variant="soft" size="large" style={{ width: '106%', marginTop: '20px' }}>
          Launch
        </Button>
      </Flex>
    </Flex>
  );
};

export default LaunchHunt;
