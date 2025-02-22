import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Category from "./Category";
import Top from "./Top";
import Job from "./Job";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <Top />
      <Job />
      <Footer />
    </div>
  );
};

export default Home;
