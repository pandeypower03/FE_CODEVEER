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
  if (localStorage.getItem("PROBLEM_LIST")) {
    localStorage.removeItem("PROBLEM_LIST");
  }
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
export async function getproblembyidAPI(problemId) {
  try {
    const user = JSON.parse(localStorage.getItem("USER"));
    const token = localStorage.getItem("AUTH_TOKEN");
// console.log(user,token)
    if (!user || !user.user_id || !token) {
      console.error("User not logged in or token not found");
      return { success: false, message: "Authentication failed" };
    }

    if (!problemId) {
      console.error("No problem ID provided.");
      return { success: false, message: "No problem ID provided." };
    }

    const url = `${API_BASE}/problems/${problemId}`;
    console.log("URL:", url);
    console.log("Authorization:", `Bearer ${token}`);
    console.log("Problem ID:", problemId);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      console.error("Failed to fetch problem:", response.status);
      return { success: false, message: `HTTP error: ${response.status}` };
    }

    const data = await response.json(); // ✅ read actual data
    console.log("Problem fetched:", data);

    localStorage.setItem("current_problem_id", JSON.stringify(problemId));
    return { success: true,problem: data }; // ✅ return usable data
    
  } catch (error) {
    console.error("Error fetching problem:", error);
    return { success: false, message: "Something went wrong" };
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
console.log(problemId,code,language,version)
  try {
    const response = await axios.post(
      `${API_BASE}/runcode/${problemId}`,
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
    // ✅ Save problems to localStorage if fetch is successful
    if (data.success && data.problems) {
      localStorage.setItem("PROBLEM_LIST", JSON.stringify(data.problems));
    }

    return data;
  } catch (err) {
    console.error("Error while fetching problems:", err.message);
    return { success: false, message: "Something went wrong" };
  }
}


//now i will make frontend api for submitting code 

export async function submitcodeAPI({ problemId, code, language, version }) {
  try {
    const user = JSON.parse(localStorage.getItem("USER"));
    const token = localStorage.getItem("AUTH_TOKEN");

    if (!user || !user.user_id || !token) {
      console.error("User not logged in or token not found");
      return { success: false, message: "Authentication failed" };
    }

    const url = `${API_BASE}/submitcode/${problemId}/${user.user_id}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
        version,
      }),
    });

    // Parse JSON for both success and error responses
    const data = await response.json();

    if (!response.ok) {
      console.error("API request failed with status", response.status);
      // Return the parsed data (which contains the error message)
      return data;
    }
    // ✅ Clear the problems cache on successful submission
    localStorage.removeItem("PROBLEM_LIST");
  
    return data;
  } catch (err) {
    console.error("Error while submitting problem:", err.message);
    return { success: false, message: "Something went wrong" };
  }
}



