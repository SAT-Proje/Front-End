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
      const response = window.loggedIn;
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

  axiosUtils.loadPageContent = async function (pageName,restaurantId=null) {
    try {
      const response = await axios.get(
        "./snippets/" + pageName + "_snippet.html"
      )
      
      if (restaurantId != null && pageName == "single_rest") {
        loadRestaurantDetails(restaurantId){
          
          // buraya restorant objesini çekmem lazım !!

        }
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
