import React from "react";
import Navbar from "../components/homeComponents/Navbar";
import Body from "../components/homeComponents/Body";
import NewlyAdded from "../components/homeComponents/NewlyAdded";
import Footer from "../components/homeComponents/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Body />
      <NewlyAdded />
      <Footer />
    </div>
  );
}
