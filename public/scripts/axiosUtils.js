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
      const response = await fetch("/restaurants-get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: restaurantId })
      })
      const data = await response.json()
      return data
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

        if (restaurants.length == 0) {
          searchResults.innerHTML = "No restaurants found"
        } else {
          let row = document.createElement("div")
          for (let i = 0; i < restaurants.length; i++) {
            let restaurant = restaurants[i]
            if (i % 3 == 0) {
              row = document.createElement("div")
              row.classList.add("row")
              row.classList.add("justify-content-evenly")
              row.classList.add("mb-5")
              row.innerHTML = ""
            }
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add("restaurant-card")
            card.classList.add("p-0")
            card.classList.add("out-0")

            let img = document.createElement("img")
            img.src =
              "./img/restaurants/" +
              restaurant.id +
              "/" +
              restaurant.id +
              "_small.jpg"
            img.classList.add("card-img-top")
            img.alt = restaurant.id + "-image"
            card.appendChild(img)

            let cardBody = document.createElement("div")

            let h5 = document.createElement("h5")
            h5.classList.add("card-title")
            h5.classList.add("rest-name")
            h5.innerHTML = restaurant.about.name
            cardBody.appendChild(h5)

            let p1 = document.createElement("p")
            p1.classList.add("card-text")
            p1.classList.add("rest-sm-info")
            p1.innerHTML =
              "lorem ipsium bora gotten yiyenkeeeee lorem20 something more to comee"
            cardBody.appendChild(p1)

            let p2 = document.createElement("p")
            p2.classList.add("card-text")
            p2.classList.add("rest-open-hours")
            p2.innerHTML = "10AM - 11PM"
            cardBody.appendChild(p2)

            let inner_div = document.createElement("div")
            inner_div.classList.add("card-text")
            inner_div.classList.add("rest-rating")

            const full_stars = Math.floor(restaurant.rating.overall.value)
            const half_stars = full_stars == 5 ? 0 : 1
            for (let j = 0; j < full_stars; j++) {
              let star = document.createElement("i")
              star.classList.add("fa-solid")
              star.classList.add("fa-star")
              inner_div.appendChild(star)
            }
            for (let j = 0; j < half_stars; j++) {
              let star = document.createElement("i")
              star.classList.add("fa-regular")
              star.classList.add("fa-star-half-stroke")
              inner_div.appendChild(star)
            }
            for (let j = 0; j < 5 - full_stars - half_stars; j++) {
              let star = document.createElement("i")
              star.classList.add("fa-regular")
              star.classList.add("fa-star")
              inner_div.appendChild(star)
            }

            cardBody.appendChild(inner_div)

            let button = document.createElement("button")
            button.type = "button"
            button.classList.add("btn")
            button.classList.add("text-center")
            button.innerHTML = "Reserve a place!"
            button.onclick = function () {
              axiosUtils.loadPageContent("single_rest", restaurant._id)
            }
            cardBody.appendChild(button)

            card.appendChild(cardBody)
            row.appendChild(card)

            if (i % 3 == 2) {
              searchResults.appendChild(row)
            }
          }
          if (i % 3 != 0) {
            searchResults.appendChild(row)
          }
        }
      } else if (pageName == "single_rest" && restaurantId != null) {
        let restaurant = await axiosUtils.getRestaurantById(restaurantId)
        restaurant = restaurant.restaurant

        const rest_img = document.querySelector(".rest-img")
        rest_img.children[0].src =
          "./img/restaurants/" + restaurant.id + "/" + restaurant.id + ".jpg"
        rest_img.children[0].alt = restaurant.about.name + "-image"

        const rest_name = document.querySelector("#rest-name-space")
        rest_name.innerHTML = restaurant.about.name

        const address = document.getElementById("rest-location-text")
        address.innerHTML = restaurant.about.address_full

        const about = document.querySelector(".rest-about-text")
        about.innerHTML = restaurant.about.short_info

        const google_maps = document.getElementById("google-maps")
        google_maps.src = restaurant.about.google_maps_embed

        const submitBtn = document.getElementById("submit-time-slot-btn")
        submitBtn.onclick = async function () {
          await submitReservation(restaurantId)
        }
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
