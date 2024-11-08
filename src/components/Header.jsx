import React, { useState } from "react";
import Logo from "../assets/Logo.svg";

const Header = () => {


 
  return (
    <>
      <div className="flex justify-between items-center p-6 sm:px-12 py-3 shadow-md bg-background2">
        <div className="w-[120px] sm:w-[200px] md:[320px] cursor-pointer"
          onClick={()=>{
            window.open("https://sageturtle.in/daffodils/training/", "_blank");

          }}
        >
          <img className="w-[150px] h-[40px] sm:w-[200px] md:[320px] cursor-pointer" src={Logo} alt="" />
        </div>
  
      </div>
     
    
    </>
  );
};

export default Header;
