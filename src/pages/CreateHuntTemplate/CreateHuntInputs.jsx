import React from "react";
import { TextField, TextArea } from "@radix-ui/themes";

const CreateHuntInputs = ({
  huntName,
  setHuntName,
  description,
  setDescription,
  location,
  setLocation,
}) => {
  return (
    <>
      <TextField.Root
        type="text"
        placeholder="Hunt Name"
        value={huntName}
        onChange={(e) => setHuntName(e.target.value)}
        style={{ width: "300px" }}
      >
        <TextField.Slot />
      </TextField.Root>
      <TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "300px", height: "50px" }}
      />
      <TextField.Root
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: "300px" }}
      >
        <TextField.Slot />
      </TextField.Root>
    </>
  );
};

export default CreateHuntInputs;
