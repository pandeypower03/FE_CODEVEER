import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      className="signup-btn bg-[#fda904] text-white border-none p-[10px] font-[Poppins] rounded-[10px] mt-[10px] cursor-pointer text-[20px] font-medium"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
