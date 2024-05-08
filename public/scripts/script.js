window.onload = function () {
  $axiosUtils.loadPageContent("base")
  $axiosUtils.loadLoggedInState()
}

(function ($global){
  $global.loggedIn = false
})(window);

const currentUser = {}

// RESERVATION STUFFF



function getSelectedValue() {
  if (window.loggedIn === false) {
    alert("Please login to make a reservation.")
  } else {
    var selectedDay = document.querySelector('input[name="btnradio"]:checked').value;
    var selectedTimeSlot = document.querySelector('input[name="timeSlot"]:checked').value; 
    var confirmation = window.confirm("Are you sure you want to submit the reservation for " + selectedDay + " at " + selectedTimeSlot + "?");
    if (confirmation) {
        console.log("Reservation submitted!");
    } else {
        console.log("Reservation not submitted.");
    }
  }
}






const hearts = document.querySelectorAll(".fa-heart")

document.addEventListener("click", function (event) {
  var target = event.target
  if (target.classList.contains("navbar-toggler")) {
    var targetId = target.getAttribute("data-bs-target")
    var targetCollapse = document.querySelector(targetId)
    var allCollapses = document.querySelectorAll(".navbar-collapse")

    allCollapses.forEach(function (collapse) {
      if (collapse !== targetCollapse && collapse.classList.contains("show")) {
        new bootstrap.Collapse(collapse)
      }
    })
  }
})

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
async function submitLogout(e) {
  e.preventDefault()
  try {
    // get request to the server [ logout route ]
    window.loggedIn = false
    window.location.href = "/"
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message)
    alert("An Error occured. Please try again later.")
  }
}
async function getCuisineRestaurants(e) {
  e.preventDefault()
  try {
    // const cuisine = document.getElementById("cuisine").value
    // get request to the server [ restaurants route ]
    const response = await fetch("/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cuisine: "English" })
    })
    // get the response from the server
    const data = await response.json()

    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!")
    } else {
      // if the response is ok
      // show the restaurants
      console.log(data)
    }
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message)
    alert("An Error occured. Please try again later.")
  }
}

async function submitReservation(e) {
  e.preventDefault()
  const timeSlot = document.getElementById("time-slot").value
  try {
    // post request to the server [ reservation route ]
    const response = await fetch("/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // send the time slot as a JSON object
      body: JSON.stringify({ timeSlot: timeSlot })
    })

    // get the response from the server
    const data = await response.json()

    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!")
    } else {
      // if the response is ok
      // show the success message
      alert(data.message)
    }
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message)
    alert("An Error occured. Please try again later.")
  }
}
