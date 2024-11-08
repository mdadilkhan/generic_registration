import React, { useState } from "react";
import Logo from "../assets/Logo1.png";

const Header = () => {


 
  return (
    <>
      <div className="bg-white border-b flex justify-center items-center h-[60px]">
      <img className="w-[150px] h-[40px] sm:w-[200px] md:[320px] cursor-pointer" src={Logo} alt="" />  
      </div>
    </>
  );
};

export default Header;
