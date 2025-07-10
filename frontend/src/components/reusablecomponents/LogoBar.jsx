import React from 'react';

const LogoBar = ({ logo, instagram }) => {
  return (
    <div className="top-logo-social w-full">
      <div className="logo flex items-center justify-between">
        <img className="logo-img w-[220px] h-[150px]" src={logo} alt="logo" />
        <img className="insta-img w-[30px] h-[30px] ml-[20px]" src={instagram} alt="instagram" />
      </div>
    </div>
  );
};

export default LogoBar;
