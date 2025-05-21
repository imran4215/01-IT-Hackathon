import React from "react";
import Navbar from "../components/homeComponents/Navbar";
import Body from "../components/homeComponents/Body";
import NewlyAdded from "../components/homeComponents/NewlyAdded";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Body />
      <NewlyAdded />
    </div>
  );
}
