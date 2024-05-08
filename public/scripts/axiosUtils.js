(function ($global) {
  var axiosUtils = {}
  axiosUtils.sendGetRequest = function (URL, handleResponse, handleError) {
    axios
      .get(URL)
      .then(response => {
        handleResponse(response)
      })
      .catch(error => {
        handleError(error)
      })
  }

  axiosUtils.sendPostRequest = function (
    URL,
    data,
    handleResponse,
    handleError
  ) {
    axios
      .post(URL, data)
      .then(response => {
        handleResponse(response)
      })
      .catch(error => {
        handleError(error)
      })
  }

  axiosUtils.sendPutRequest = function (
    URL,
    data,
    handleResponse,
    handleError
  ) {
    axios
      .put(URL, data)
      .then(response => {
        handleResponse(response)
      })
      .catch(error => {
        handleError(error)
      })
  }

  axiosUtils.sendDeleteRequest = function (URL, handleResponse, handleError) {
    axios
      .delete(URL)
      .then(response => {
        handleResponse(response)
      })
      .catch(error => {
        handleError(error)
      })
  }

  axiosUtils.loadLoggedInState = async function () {
    try {
      const response = window.loggedIn
      const container = document.getElementById("login-signup-container")
      if (response) {
        const htmlResponse = await axios.get(
          "./snippets/logged_in_snippet.html",
          { responseType: "text" }
        )
        container.innerHTML = htmlResponse.data
      } else {
        const htmlResponse = await axios.get(
          "./snippets/login_signup_snippet.html",
          { responseType: "text" }
        )
        container.innerHTML = htmlResponse.data
      }
    } catch (e) {
      console.error("Error loading logged in state : " + e)
    }
  }

 // get all restaurants
  async function getRestaurants() {
    const restaurants = await fetch("/restaurants", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = await restaurants.json();
    console.log(data);
    return data;
  }


<<<<<<< HEAD
 // get all restaurants
  axiosUtils.getRestaurants = async function() {
    const restaurants = await fetch("/restaurants", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = await restaurants.json();
    console.log(data);
  }


=======
>>>>>>> e31f6fa4be413028f10dd93c95c98b2758a8529c
  axiosUtils.loadPageContent = async function (pageName, restaurantId = null) {
    try {
      const response = await axios.get(
        "./snippets/" + pageName + "_snippet.html"
      )
      
      if (restaurantId != null && pageName == "single_rest") {
        responseData = getRestaurants()

>>>>>>> e31f6fa4be413028f10dd93c95c98b2758a8529c
        const restaurantData = restaurantResponse.data
        const restaurant = restaurantData.restaurant

        const restaurantName = document.getElementById("restaurant-name")
        restaurantName.innerHTML = restaurant.name

        const restaurantAddress = document.getElementById("restaurant-address")
        restaurantAddress.innerHTML = restaurant.address

        const restaurantPhone = document.getElementById("restaurant-phone");
        restaurantPhone.innerHTML = restaurant.phone;

        const restaurantEmail = document.getElementById("restaurant-email");
        restaurantEmail.innerHTML = restaurant.email;

        const restaurantDescription = document.getElementById("restaurant-description");
        restaurantDescription.innerHTML = restaurant.description;

        const restaurantImage = document.getElementById("restaurant-image");
        restaurantImage.src = restaurant.image;

        const restaurantMenu = document.getElementById("restaurant-menu");
        restaurantMenu.innerHTML = restaurant.menu;

        const restaurantRating = document.getElementById("restaurant-rating");
        restaurantRating.innerHTML = restaurant.rating;

        const restaurantReviews = document.getElementById("restaurant-reviews");
        restaurantReviews.innerHTML = restaurant.reviews;

        const restaurantReservations = document.getElementById("restaurant-reservations");
        restaurantReservations.innerHTML = restaurant.reservations;

        const restaurantCreatedAt = document.getElementById("restaurant-created-at");
        restaurantCreatedAt.innerHTML = restaurant.createdAt;

        const restaurantUpdatedAt = document.getElementById("restaurant-updated-at");
        restaurantUpdatedAt.innerHTML = restaurant.updatedAt;

        const restaurantOwner = document.getElementById("restaurant-owner")
        restaurantOwner.innerHTML = restaurant.owner
      }



      const mainContent = document.getElementById("main-content")
      mainContent.innerHTML = response.data

      document.getElementById("home-navBtn").classList.remove("active")
      document.getElementById("reservations-navBtn").classList.remove("active")
      document.getElementById("searched-navBtn").classList.remove("active")
      document.getElementById("single_rest-navBtn").classList.remove("active")

      switch (pageName) {
        case "home":
          document.getElementById("home-navBtn").classList.add("active")
          break
        case "reservations":
          document.getElementById("reservations-navBtn").classList.add("active")
          mainContent.classList.add("reservation-container")
          break
        case "searched":
          document.getElementById("searched-navBtn").classList.add("active")
          break
        case "single_rest":
          document.getElementById("single_rest-navBtn").classList.add("active")
          mainContent.classList.add("single-rest-container")
          break
        case "base":
          break
        default:
          alert("Something went wrong!")
          break
      }
    } catch (error) {
      console.error("Error loading page content : " + error)
    }
  }

  $global.$axiosUtils = axiosUtils
})(window)
