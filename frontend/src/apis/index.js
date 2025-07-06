// src/apis/index.js
//parse means convert Takes a JSON-formatted string and parses it back into the corresponding JavaScript value (object, array, number, etc.)
// Takes a JavaScript value (object, array, number, etc.) and returns a JSON-formatted string
// 1. Define your key as a string constant
import axios from 'axios';
const API_BASE = 'http://localhost:5000/users';  
const TOKEN_KEY = 'AUTH_TOKEN';  
// localStorage.clear();


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
    const user = resp.data.data;
    const token = resp.data.token;
    console.log(user)
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
  if (localStorage.getItem("current_problem_id")) {
    localStorage.removeItem("current_problem_id");
  }
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

//i want to store the porblem_id in local storage when the user clicks on the problem
export async function handleProblemClick(problemId) {
  try {
    if (!problemId) {
      console.error("No problem ID provided.");
      return;
    }
//axios call
    const response = await axios.get(`${API_BASE}/problems/${problemId}`);

    if (response.status === 200) {
      console.log("Problem fetched:", response.data);
      localStorage.setItem("current_problem_id", JSON.stringify(problemId));
    }
    else {
      console.error("Problem not found or failed to fetch.");
    }
  } catch (error) {
    console.error("Error fetching problem:", error);
  }
}

//for running the code
export async function runCodeAndEvaluateAPI({
  problemId,
  code,
  language,
  version = "default",
}) {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const response = await axios.post(
      `http://localhost:5000/api/submit/${problemId}`,
      { code, language, version },
      {
        headers: {
          Authorization: `Bearer ${token}`, // this is required by requireAuth
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error running code:", error.response?.data || error.message);
    throw error.response?.data || { message: "Unknown error occurred" };
  }
}



//this is i making to get the problems of that particular user_id
export async function getProblemListAPI() {
  try {
    const user = JSON.parse(localStorage.getItem("USER"));
    const token = localStorage.getItem("AUTH_TOKEN"); // adjust if your token is stored with a different key

    if (!user || !user.user_id || !token) {
      console.error("User not logged in or token not found");
      return { success: false, message: "Authentication failed" };
    }
    const url = `${API_BASE}/listproblems?user_id=${user.user_id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      console.error("API request failed with status", response.status);
      return { success: false, message: "Failed to fetch problems" };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error while fetching problems:", err.message);
    return { success: false, message: "Something went wrong" };
  }
}






