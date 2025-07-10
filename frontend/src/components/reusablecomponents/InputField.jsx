import React from 'react';

// const InputField = ({ icon, type, placeholder }) => {
//   return (
//     <div className="input-field flex items-center mb-5 border border-[#f2f2f0] rounded-[15px] pl-[10px] bg-[#f7f5f4] focus-within:border-black">
//       <img className="input-icon w-[20px] h-[20px]" src={icon} alt={placeholder} />
//       <input
//         type={type}
//         placeholder={placeholder}
//         className="border-none p-[15px] w-full rounded-[15px] bg-[#f7f5f4] focus:outline-none"
//       />
//     </div>
//   );
// };

const InputField = ({ icon, type, placeholder, value, onChange }) => {
  return (
    <div className="input-field flex items-center mb-5 border border-[#f2f2f0] rounded-[15px] pl-[10px] bg-[#f7f5f4] focus-within:border-black">
      <img className="input-icon w-[20px] h-[20px]" src={icon} alt={placeholder} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-none p-[15px] w-full rounded-[15px] bg-[#f7f5f4] focus:outline-none"
      />
    </div>
  );
};


export default InputField;
