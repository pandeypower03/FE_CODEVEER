// src/apis/index.js
//parse means convert Takes a JSON-formatted string and parses it back into the corresponding JavaScript value (object, array, number, etc.)
// Takes a JavaScript value (object, array, number, etc.) and returns a JSON-formatted string
// 1. Define your key as a string constant
const CURRENT_USER = "CURRENT_USER";

// 2. Named export for signup
export function userSignup({ name, password, email }) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // check for existing user
  if (users.some(u => u.name === name)) {
    console.log("user already exists");
    return false;
  }

  // add new user
  users.push({ name, password, email });
  localStorage.setItem("users", JSON.stringify(users));

  // store current user email
  localStorage.setItem(CURRENT_USER, email);
  return true;
}

// 3. Named export for login
export function userLogin({ name, password, email }) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user  = users.find(u => u.email === email);

  if (user && user.password === password) {
    // store current user email
    localStorage.setItem(CURRENT_USER, email);
    return user;
  }

  console.log("Invalid credentials");
  return false;
}

export function userLogout(){
  localStorage.removeItem(CURRENT_USER)
}


// 4. Named export for checkLogin
export function checkLogin() {
  return localStorage.getItem(CURRENT_USER);
}
