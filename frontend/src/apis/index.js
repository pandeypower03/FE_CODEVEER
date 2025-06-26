// src/apis/index.js
//parse means convert Takes a JSON-formatted string and parses it back into the corresponding JavaScript value (object, array, number, etc.)
// Takes a JavaScript value (object, array, number, etc.) and returns a JSON-formatted string
// 1. Define your key as a string constant
import axios from 'axios';
const API_BASE = 'http://localhost:5000/users';  
const TOKEN_KEY = 'AUTH_TOKEN';  

// 2. Named export for signup
export async function userSignup({ username, email, password }) {
  try {
    const resp = await axios.post(`${API_BASE}/`, {
      username,
      email,
      password
    });
    // API returns { message, user: { … }, token }
    const { user, token } = resp.data;
    console.log(user)

    // store the JWT
    
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('USER', JSON.stringify(user));


    // return the user object so components can use it
    return user;
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err);
    return false;
  }
}

// 2️⃣ Login against your real API
export async function userLogin({ username,email, password }) {
  try {
    const resp = await axios.post(`${API_BASE}/login`, { username,email, password });
    const { user, token } = resp.data;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('USER', JSON.stringify(user));
    return user;
  } catch (err) {
    console.error('Login failed:', err.response?.data || err);
    return false;
  }
}

// 3️⃣ Logout clears the token
export function userLogout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('USER');
}

// 4️⃣ checkLogin returns the token (or null)
export function checkLogin() {
  const token   = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem('USER'); // make sure this matches exactly where you .setItem()

  let user = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch (e) {
      console.warn('Couldn’t parse USER from localStorage:', rawUser, e);
      // fallback: leave user === null
    }
  }

  return { token, user };
}

