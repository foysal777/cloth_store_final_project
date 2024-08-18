const handleRegister = (event) => {
  event.preventDefault();
  
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
  };


  if (password === confirm_password) {
    document.getElementById("error").innerText = "";
    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (passwordPattern.test(password)) {
        fetch("https://cloth-store-project-backend-api.onrender.com/shop/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error && data.error.includes("email already exists")) {
                document.getElementById("error").innerText = "Email already exists.";
            } else {
                alert("Check your email.");
                document.getElementById("error").innerText = "Registration Successful. Check your email.";
                window.location.href = 'login.html'; 
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("error").innerText = "Registration failed. Please try again.";
        });
    } else {
        document.getElementById("error").innerText = "Password must contain eight characters, at least one letter, one number, and one special character.";
    }
} else {
    document.getElementById("error").innerText = "Password and Confirm Password Doesn't Match.";
}
};







const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

// Log in Part 


const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    const errorElement = document.getElementById("error2");
    console.log(username, password);
    if ((username, password)) {
      fetch("https://cloth-store-project-backend-api.onrender.com/shop/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
      
            
          const NameElement = document.getElementById("current_users");
          NameElement.innerHTML = `<span> Current User : ${username}</span>`;
  
            errorElement.innerText = "Login Successfully Completed";
            window.location.href = 'index.html'; 
            
          }  else {
  
            errorElement.innerText = "Login Failed , Give Valid Information or Check Email Conformation";
          }
  
        });
    }
  };



  // Authentication Part 
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token") !== null;
    const navbarMenu = document.getElementById("navbarMenu");

    if (token) {
        
        navbarMenu.innerHTML = `
           
            <li class="nav-item">
                <a  class="nav-link" href="wishlist.html">Wishlist</a>
            </li>
            <li class="nav-item">
                <a id="logoutLink" class="nav-link" href="#" onclick="handleLogout()">Logout</a>
            </li>
        `;
    } else {
        navbarMenu.innerHTML = `
            <li class="nav-item">
                <a  id="registerLink" class="nav-link"  href="register.html">Register</a>
            </li>
            <li class="nav-item">
                <a  id="loginLink" class="nav-link" href="login.html">Login</a>
            </li>
        `;
    }
};


const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    alert("Do You Want To Log Out ?")
    window.location.href = "index.html";
};


document.addEventListener("DOMContentLoaded", checkAuthStatus);






document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token');
  const registerLink = document.getElementById("registerLink");
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");

  if (token === "true") {
      registerLink.style.display = "none";
      loginLink.style.display = "none";
      logoutLink.style.display = "block";
  } else {
      registerLink.style.display = "block";
      loginLink.style.display = "block";
      logoutLink.style.display = "none";
  }
});

// Function to handle log out
function handleLogOut() {
  localStorage.removeItem("token");
  location.reload();
}
