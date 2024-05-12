window.onload = function () {
  window.$axiosUtils.loadPageContent("base");
  window.$axiosUtils.loadLoggedInState();
  window.loggedIn = false;
  window.currentUser = {};
  window.reservations = [];
};

// RESERVATION STUFFF

async function submitReservation(restaurantId) {
  if (window.loggedIn === false) {
    alert("Please login to make a reservation.");
  } else {
    try {
      var selectedDay = document.querySelector(
      'input[name="btnradio"]:checked'
    ).value;
    var selectedTimeSlot = document.querySelector(
      'input[name="timeSlot"]:checked'
    ).value;
  } catch {
    alert("Please select a day and time slot.");
    return;
  }
    var confirmation = window.confirm(
      "Are you sure you want to submit the reservation for " +
        selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1) +
        " at " +
        selectedTimeSlot +
        ":00 ?"
    );
    if (confirmation) {
      // post request to the server [ reservation route ]
      const response = await fetch("/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: selectedDay,
          timeSlot: selectedTimeSlot,
          userId: window.currentUser._id,
          restaurantId: restaurantId,
        }),
      });
      const data = await response.json();
      alert(
        "Reservation submitted successfully. Please wait for restaurant confirmation before taking any action."
      );
      const modal = new bootstrap.Modal("#register-modal");
      modal.hide();
    } else {
      console.log("Reservation not submitted.");
    }
  }
}

const hearts = document.querySelectorAll(".fa-heart");
/*
document.addEventListener("click", function (event) {
  var target = event.target;
  if (target.classList.contains("navbar-toggler")) {
    var targetId = target.getAttribute("data-bs-target");
    var targetCollapse = document.querySelector(targetId);
    var allCollapses = document.querySelectorAll(".navbar-collapse");

    allCollapses.forEach(function (collapse) {
      if (collapse !== targetCollapse && collapse.classList.contains("show")) {
        new bootstrap.Collapse(collapse);
      }
    });
  }
});*/

function clearRegisterForm() {
  document.getElementById("register-email").value = "";
  document.getElementById("register-username").value = "";
  document.getElementById("register-password").value = "";
}

function clearLoginForm() {
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
}

(function setupWarranty() {
  document.getElementById("warranty").addEventListener("change", function () {
    if (this.checked) {
      document.getElementById("register-btn").disabled = false;
    } else {
      document.getElementById("register-btn").disabled = true;
    }
  });
})();

async function submitLoginForm(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    // post request to the server [ login route ]
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // send the email and password as a JSON object
      body: JSON.stringify({ email: email, password: password }),
    });

    // get the response from the server
    const data = await response.json();

    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      // if the response is ok
      // redirect to the home page
      window.loggedIn = true;
      window.currentUser = data.user;
      window.$axiosUtils.loadLoggedInState();
      window.$axiosUtils.loadPageContent("base");
      alert("Logged in successfully. You can close this window now.");
    }
  } catch (e) {
    // show the error message
    console.error(e.message);

    // if not lazy , can handle the networks errors more specifically zattiri zort
    alert("An Error occured. Please try again later.");
  }
}

async function submitRegisterForm(e) {
  e.preventDefault();

  const email = document.getElementById("register-email").value;
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  try {
    // post request to the server [ register route ]
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // send the email, username and password as a JSON object
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    // get the response from the server
    const data = await response.json();
    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      // if the response is ok
      // redirect to the home page
      alert("Account created successfully. Please login to continue.");
      window.location.href = "/"; //  !!! might need to change this
    }
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message);
    // if not lazy , can handle the networks errors more specifically
    alert("An Error occured. Please try again later.");
  }
}
async function submitLogout(e) {
  e.preventDefault();
  try {
    if (window.loggedIn === false) {
      window.location.href = "/";
      window.$axiosUtils.loadLoggedInState();
      return;
    }
    // get request to the server [ logout route ]
    window.loggedIn = false;
    window.location.href = "/";
    window.$axiosUtils.loadLoggedInState();
    window.currentUser = {};
    alert("Logged out successfully.");
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message);
    alert("An Error occured. Please try again later.");
  }
}
async function getCuisineRestaurants(e) {
  e.preventDefault();
  try {
    // const cuisine = document.getElementById("cuisine").value
    // get request to the server [ restaurants route ]
    const response = await fetch("/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cuisine: "English" }),
    });
    // get the response from the server
    const data = await response.json();

    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      // if the response is ok
      // show the restaurants
    }
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message);
    alert("An Error occured. Please try again later.");
  }
}

async function postComment() {
  const content = document.getElementById("comment").value;
  const rating = {
    services: {
      amenities: {
        value: document.getElementById("amenities-value").value,
        weight: document.getElementById("amenities-weight").value,
      },
      location: {
        value: document.getElementById("location-value").value,
        weight: document.getElementById("location-weight").value,
      },
      hygiene: {
        value: document.getElementById("hygiene-value").value,
        weight: document.getElementById("hygiene-weight").value,
      },
      communication: {
        value: document.getElementById("communication-value").value,
        weight: document.getElementById("communication-weight").value,
      },
      pricing: {
        value: document.getElementById("pricing-value").value,
        weight: document.getElementById("pricing-weight").value,
      },
    },
  };
  const user = window.currentUser._id;
  const restaurant = document.getElementById("restaurant-id").value;

  try {
    // post request to the server [ comment route ]
    const response = await fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // send the comment details as a JSON object
      body: JSON.stringify({ content, rating, user, restaurant }),
    });

    // get the response from the server
    const data = await response.json();

    // if the response is not ok
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      // if the response is ok
      // show the success message
      alert("Comment posted successfully");
    }
  } catch (e) {
    // show the error message
    console.error("Error: " + e.message);
    alert("An Error occured. Please try again later.");
  }
}
