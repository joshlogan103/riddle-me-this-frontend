import React from 'react'
import { Button } from '@radix-ui/themes';

const SubmitHuntBtn = ({createHunt, saveAndExit, isTempCreated}) => {
  return (
    <Button
    onClick={!isTempCreated ? createHunt : saveAndExit}
    variant="surface"
    style={{
      width: "100%",
      maxWidth: "500px",
      transition: "transform 0.2s, background-color 0.2s",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.backgroundColor = "#4B0082";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.backgroundColor = "";
    }}
  >{!isTempCreated ? "Create Scavenger Hunt" : "Save and Exit" }</Button>
  )
}

export default SubmitHuntBtn