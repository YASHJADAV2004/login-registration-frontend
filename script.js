
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");
const dashboard = document.getElementById("dashboard");

document.getElementById("loginTab").onclick = () => {
  loginForm.hidden = false;
  registerForm.hidden = true;
  dashboard.hidden = true;
  message.textContent = "";
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
};

document.getElementById("registerTab").onclick = () => {
  loginForm.hidden = true;
  registerForm.hidden = false;
  dashboard.hidden = true;
  message.textContent = "";
  document.getElementById("registerTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
};

registerForm.onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const password = document.getElementById("regPassword").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some(user => user.email === email)) {
    message.textContent = "Email already registered!";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  registerForm.reset();
  loginForm.hidden = false;
  registerForm.hidden = true;
  message.textContent = "Registration successful! Please log in.";

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
};

loginForm.onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (!user) {
    message.textContent = "Invalid email or password!";
    return;
  }

  loginForm.hidden = true;
  registerForm.hidden = true;
  document.querySelector(".tabs").hidden = true;
  dashboard.hidden = false;
  document.getElementById("welcome").textContent =
    "Welcome, " + user.name + "!";
  message.textContent = "";
  loginForm.reset();
};

document.getElementById("logout").onclick = () => {
  dashboard.hidden = true;
  document.querySelector(".tabs").hidden = false;
  loginForm.hidden = false;
  message.textContent = "Logged out successfully!";
};
