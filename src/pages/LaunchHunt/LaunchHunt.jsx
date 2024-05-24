import React, { useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { createHuntInstance } from "../../services/serviceRoutes/huntInstanceServices";
import { useNavigate, useParams } from "react-router";

// TODO: ensure Launch Hunt creates Hunt Instance
// TODO: ensure Launch Hunt redirects

const LaunchHunt = () => {
  const [formInputs, setFormInputs] = useState({
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });
  const { huntTemplateId } = useParams()
  const navigate = useNavigate()

  const handleUpdateInput = (e) => {
    const { name, value } = e.target
    setFormInputs({ ...formInputs, [name]: value})
    console.log(name, value)
  };

  const transformInputs = (dateString, timeString) => {
        // Parse the date string and time string
        const [year, month, day] = dateString.split('-').map(Number);
        const [hour, minute] = timeString.split(':').map(Number);
    
        // Create a new Date object
        const date = new Date(year, month - 1, day, hour, minute);
    
        // Format the date as desired (ISO 8601 format)
        const isoString = date.toISOString();
    
        // Return the formatted date string
        return isoString;
  }

  const handleSubmit = async () => {
    const { startTime, startDate, endTime, endDate } = formInputs
    const startDateTime = transformInputs(startDate, startTime)
    const endDateTime = transformInputs(endDate, endTime)
    console.log(startDateTime, endDateTime)

    try {
      const response = await createHuntInstance(huntTemplateId, {
        "start_time": startDateTime,
        "end_time": endDateTime
      })
      if (response.status === 201) {
        navigate("/creator-control-panel")
      }
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex
      className="launch-hunt-container"
      direction="column"
      gap="20px"
      align="center"
      style={{
        marginTop: "30px",
        width: "90%",
        maxWidth: "300px",
        margin: "0 auto",
      }}
    >
      <Text
        as="h1"
        size="6"
        weight="bold"
        color="indigo"
        variant="soft"
        highContrast
      >
        Launch a Hunt
      </Text>
      <Flex direction="column" gap="10px" width="100%">
        <Text
          as="label"
          htmlFor="start-date"
          size="3"
          weight="medium"
          variant="surface"
        >
          Start Date:
        </Text>
        <input
          id="start-date"
          onChange={handleUpdateInput}
          type="date"
          name="startDate"
          value={formInputs.startDate}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <Text
          as="label"
          htmlFor="start-time"
          size="3"
          weight="medium"
          variant="surface"
        >
          Start Time:
        </Text>
        <input
          id="start-time"
          onChange={handleUpdateInput}
          type="time"
          name="startTime"
          value={formInputs.startTime}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <Text
          as="label"
          htmlFor="end-date"
          size="3"
          weight="medium"
          variant="surface"
        >
          End Date:
        </Text>
        <input
          id="end-date"
          onChange={handleUpdateInput}
          type="date"
          name="endDate"
          value={formInputs.endDate}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <Text
          as="label"
          htmlFor="end-time"
          size="3"
          weight="medium"
          variant="surface"
        >
          End Time:
        </Text>
        <input
          id="end-time"
          onChange={handleUpdateInput}
          value={formInputs.endTime}
          type="time"
          name="endTime"
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <Button
          color="indigo"
          variant="soft"
          size="large"
          onClick={handleSubmit}
          style={{ width: "106%", marginTop: "20px" }}
        >
          Launch
        </Button>
      </Flex>
    </Flex>
  );
};

export default LaunchHunt;
