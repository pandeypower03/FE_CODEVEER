import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "./AuthProvider.jsx";
import { Link, useNavigate } from 'react-router-dom';

import Button from "./reusablecomponents/Button";
import InputField from "./reusablecomponents/InputField";
import ImageContainer from "./reusablecomponents/ImageContainer";
import LogoBar from "./reusablecomponents/LogoBar";

import leftImage from "./Assets/images/leftimg.png";
import rightImage from "./Assets/images/rightimg.png";
import logoImage from "./Assets/images/logocodebeer.png";
import instaIcon from "./Assets/images/instagram1.png";
import profileIcon from "./Assets/images/profile.png";
import emailIcon from "./Assets/images/send.png";
import lockIcon from "./Assets/images/lock.png";

export default function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signup, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup({ username, email, password });
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard/');
    }
  }, [user, navigate]);

  return (
    <div className="main-container flex px-[100px] py-[50px] bg-[#e3e3e3] font-[Poppins]">
      <div className='inner-containe flex flex-col bg-[#f7f5f4] px-[30px] pt-0 pb-[70px] pl-[50px] w-full rounded-[30px]'>
        <LogoBar logo={logoImage} instagram={instaIcon} />
        <div className="login-sign flex flex-row justify-center items-center gap-[20px]">
          <ImageContainer side="left" imgSrc={leftImage} />

          <div className="form-box p-[30px_40px] w-[300px] flex flex-col gap-[15px] rounded-[20px] bg-[#fff]">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="heading text-[30px] font-medium capitalize font-[Poppins]">
              Let's <br /> Get Started
            </div>
            <p className="request text-sm font-medium text-[#9b9b9b] font-[Poppins]">
              Please Sign Up to create an account
            </p>

            <InputField
              icon={profileIcon}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              icon={emailIcon}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              icon={lockIcon}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button label="Sign Up" onClick={handleSignup} />

            <Link to="/" className="text-sm text-gray-600 mt-3 block text-center">
              Already have an account? Login
            </Link>
          </div>

          <ImageContainer side="right" imgSrc={rightImage} />
        </div>
      </div>
    </div>
  );
}
