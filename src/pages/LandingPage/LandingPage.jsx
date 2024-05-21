import React from "react";
import "./landingPage.css";
import { Button, Flex } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="page">
      <div>
        <img
          src="/mag-logo.jpg"
          className="landing-logo"
          alt="magnifying glass logo"
        />
      </div>
      <Flex display="flex" direction="column" gap="20px">
        <Button variant="surface" asChild>
          <NavLink to="/browse">Browse</NavLink>
        </Button>
        <Button variant="surface">
          {/* TODO: link login to login modal */}
          <NavLink>Login</NavLink>
        </Button>
      </Flex>
    </div>
  );
};

export default LandingPage;
