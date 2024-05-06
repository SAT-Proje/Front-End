window.onload = function () {
  $axiosUtils.loadPageContent("base")
  $axiosUtils.loadLoggedInState()
}

;(function ($global) {
  $global.loggedIn = false
})(window)

const currentUser = {}

const hearts = document.querySelectorAll(".fa-heart")

for (let i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener("mouseover", () => {
    let classValue = hearts[i].className
    classValue = classValue.replace(new RegExp("fa-regular", "g"), "")
    classValue += " fa-solid"
    hearts[i].className = classValue
  })
  hearts[i].addEventListener("mouseout", () => {
    let classValue = hearts[i].className
    classValue = classValue.replace(new RegExp("fa-solid", "g"), "")
    classValue += " fa-regular"
    hearts[i].className = classValue
  })
}

async function submitLoginForm(e) {
  e.preventDefault()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  try {
    // post request to the server [ login route ]
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // send the email and password as a JSON object
      body: JSON.stringify({ email: email, password: password })
    })

    // get the response from the server
    const data = await response.json()

    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!")
    } else {
      // if the response is ok
      // redirect to the home page
      window.loggedIn = true
      window.$axiosUtils.loadLoggedInState()
      window.$axiosUtils.loadPageContent("base")
    }
  } catch (e) {
    // show the error message
    console.error(e.message)

    // if not lazy , can handle the networks errors more specifically zattiri zort
    alert("An Error occured. Please try again later.")
  }
}

async function submitRegisterForm(e) {
  e.preventDefault()

  const email = document.getElementById("register-email").value
  const username = document.getElementById("register-username").value
  const password = document.getElementById("register-password").value

  try {
    // post request to the server [ register route ]
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // send the email, username and password as a JSON object
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    })

    // get the response from the server
    const data = await response.json()

    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!")
    } else {
      // if the response is ok
      // redirect to the home page
      alert("Account created successfully. Please login to continue.")
      window.location.href = "/" //  !!! might need to change this
    }
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message)
    // if not lazy , can handle the networks errors more specifically
    alert("An Error occured. Please try again later.")
  }
}
