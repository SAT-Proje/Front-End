;(function ($global) {
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
  axiosUtils.getRestaurantById = async function (restaurantId) {
    try {
      const response = await axios.get("/restaurants/" + restaurantId)
      return response.data
    } catch (e) {
      console.error("Error getting restaurant by id : " + e)
    }
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
  axiosUtils.getRestaurants = async function () {
    const restaurants = await fetch("/restaurants", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    const data = await restaurants.json()
    return data
  }

  axiosUtils.loadPageContent = async function (pageName, restaurantId = null) {
    try {
      const response = await axios.get(
        "./snippets/" + pageName + "_snippet.html"
      )

      const mainContent = document.getElementById("main-content")
      mainContent.innerHTML = response.data

      if (pageName == "searched" && restaurantId == null) {
        let restaurants = await axiosUtils.getRestaurants()
        restaurants = restaurants.restaurants
        let searchResults = document.getElementById("search-result-container")
        searchResults.innerHTML = ""

        let counter = 0
        if (restaurants.length == 0) {
          searchResults.innerHTML = "No restaurants found"
        } else {
          restaurants.forEach(restaurant => {
            console.log(counter)
            if (counter % 3 == 0) {
              searchResults.innerHTML += `<div class="row justify-content-evenly mb-5">`
            }
            let restaurantCard = document.createElement("div")
            restaurantCard.classList.add("restaurant-card")
            restaurantCard.classList.add("card")
            restaurantCard.classList.add("p-0")
            restaurantCard.classList.add("out-0")
            restaurantCard.innerHTML =
              `
            <img src="./img/` +
              "place_holder" +
              `.png" class="card-img-top" alt="` +
              restaurant.id +
              `-image" />
            <div class="card-body">
              <h5 class="card-title rest-name">` +
              restaurant.about.name +
              `</h5>
              <p class="card-text rest-sm-info">
                Lorem ipsium bora gotten yiyenkeeeee
              </p>
              <p class="card-text rest-open-hours">10AM - 11PM</p>
              <div class="card-text rest-rating">
                `

            const full_stars = Math.floor(restaurant.about.rating)
            const half_stars = 5 - full_stars
            for (let i = 0; i < full_stars; i++) {
              let star = document.createElement("i")
              star.classList.add("fa-solid")
              star.classList.add("fa-star")
              restaurantCard.innerHTML += star
            }
            for (let i = 0; i < half_stars; i++) {
              let star = document.createElement("i")
              star.classList.add("fa-regular")
              star.classList.add("fa-star")
              restaurantCard.innerHTML += star.outerHTML
            }
            restaurantCard.innerHTML +=
              `
              </div>
            </div>
            <button type="button" class="btn text-center" onclick="$axiosUtils.loadPageContent('single_rest',` +
              restaurant._id +
              `)">Reserve a place!</button>
            `
            searchResults.innerHTML += restaurantCard.outerHTML
            if (counter % 3 == 2) {
              searchResults.innerHTML += `</div>`
            }
            counter++
          })
          if (counter % 3 != 0) {
            searchResults.innerHTML += `</div>`
          }
        }
        /*<i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <p class="rest-rating-text">5.0</p>*/
      }

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
