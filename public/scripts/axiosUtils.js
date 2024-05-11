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

  axiosUtils.adjustRatingButtons = function (restaurant) {
    const allStars = document.querySelectorAll(".rating")

    const ratingValues = document.querySelectorAll(".rating input")
    for (let i = 0; i < allStars.length; i++) {
      let cust_id = "rat" + (i + 1)
      const allStar = document.querySelectorAll(`#${cust_id} .fa-star`)
      const ratingValue = ratingValues[i]
      allStar.forEach((item, idx) => {
        item.addEventListener("click", function () {
          let click = 0
          ratingValue.value = idx + 1

          allStar.forEach(i => {
            i.classList.replace("fa-solid", "fa-regular")
            i.classList.remove("active")
          })
          for (let i = 0; i < allStar.length; i++) {
            if (i <= idx) {
              allStar[i].classList.replace("fa-regular", "fa-solid")
              allStar[i].classList.add("active")
            } else {
              allStar[i].style.setProperty("--i", click)
              click++
            }
          }
        })
      })
    }
    const submitBtn = document.getElementById("send-comment-btn")
    submitBtn.addEventListener("click", async function () {
      const comment = document.getElementById("comment").value
      const rating = {
        amenities: ratingValues[0].value,
        communication: ratingValues[1].value,
        hygiene: ratingValues[2].value,
        location: ratingValues[3].value,
        pricing: ratingValues[4].value
      }
      const restaurantId = restaurant._id

      let user = $global.currentUser
      const response = await fetch("/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, rating, restaurantId, user })
      })
      const data = await response.json()
      console.log(data)
      if (data) {
        alert("Comment added successfully!")
      }
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
          i = 0
          for (i = 0; i < restaurants.length; i++) {
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
            p1.innerHTML = restaurant.about.short_info
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

            const rating = document.createElement("p")
            rating.classList.add("rest-rating-text")
            rating.innerHTML = parseFloat(
              restaurant.rating.overall.value
            ).toFixed(1)
            inner_div.appendChild(rating)

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

          let cuisines = restaurants.map(restaurant => restaurant.about.cuisine);
          cuisines = [...new Set(cuisines)];


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

        const ratingSec = document.querySelector(".rest-rating")
        ratingSec.innerHTML = "<h5>Rating</h5>"

        const full_stars = Math.floor(restaurant.rating.overall.value)
        const half_stars = full_stars == 5 ? 0 : 1
        for (let j = 0; j < full_stars; j++) {
          let star = document.createElement("i")
          star.classList.add("fa-solid")
          star.classList.add("fa-star")
          ratingSec.appendChild(star)
        }
        for (let j = 0; j < half_stars; j++) {
          let star = document.createElement("i")
          star.classList.add("fa-regular")
          star.classList.add("fa-star-half-stroke")
          ratingSec.appendChild(star)
        }
        for (let j = 0; j < 5 - full_stars - half_stars; j++) {
          let star = document.createElement("i")
          star.classList.add("fa-regular")
          star.classList.add("fa-star")
          ratingSec.appendChild(star)
        }
        const rating = document.createElement("p")
        rating.classList.add("rest-rating-text")
        rating.innerHTML = parseFloat(restaurant.rating.overall.value).toFixed(
          1
        )
        ratingSec.appendChild(rating)

        const amenities = document.querySelector("#amenities")
        amenities.children[1].innerHTML =
          restaurant.rating.services.amenities.value

        const communication = document.querySelector("#communication")
        communication.children[1].innerHTML =
          restaurant.rating.services.communication.value

        const hygiene = document.querySelector("#hygiene")
        hygiene.children[1].innerHTML = restaurant.rating.services.hygiene.value

        const location = document.querySelector("#location")
        location.children[1].innerHTML =
          restaurant.rating.services.location.value

        const pricing = document.querySelector("#pricing")
        pricing.children[1].innerHTML = restaurant.rating.services.pricing.value

        // loading comments
        const comments = document.getElementById("comments")
        const len = restaurant.reviews.length
        if (len == 0) {
          comments.innerHTML =
            "No comments yet! Make a reservation and be the first to comment!"
        } else {
          for (let i = 0; i < len; i++) {
            // container
            let comment_container = document.createElement("div")
            comment_container.classList.add("col-6")
            comment_container.classList.add("single-comment")

            // commentator-profile
            let commentator_profile = document.createElement("div")
            commentator_profile.classList.add("commentator-profile")

            // img-container
            let img_container = document.createElement("div")
            img_container.classList.add("img-container")
            let img = document.createElement("img")
            img.src = "./img/place_holder.png"
            img.alt = "profile"
            img.id = "profile-pic"
            img_container.appendChild(img)
            commentator_profile.appendChild(img_container)

            // commentator-info
            let commentator_info = document.createElement("div")
            commentator_info.classList.add("commentator-info")

            // commentator-name
            let commentator_name = document.createElement("h5")
            commentator_name.classList.add("commentator-name")
            commentator_name.innerHTML = restaurant.reviews[i].name // will be fixed to user.name or sth
            commentator_info.appendChild(commentator_name)

            // commentator-rating
            let commentator_rating = document.createElement("span")
            commentator_rating.classList.add("commentator-rating")
            let rating_spec = document.createElement("spec")
            rating_spec.id = "comment-rating"
            rating_spec.innerHTML = restaurant.reviews[i].rating
            commentator_rating.textContent = "rated "
            commentator_rating.appendChild(rating_spec)
            commentator_info.appendChild(commentator_rating)

            commentator_profile.appendChild(commentator_info)

            // comment itself
            let comment = document.createElement("div")
            comment.classList.add("comment")
            let p_comment = document.createElement("p")
            p_comment.innerHTML = restaurant.reviews[i].comment
            comment.appendChild(p_comment)
            commentator_profile.appendChild(comment)

            comment_container.appendChild(commentator_profile)
            comments.appendChild(comment_container)
          }
        }
        axiosUtils.adjustRatingButtons(restaurant)
      } else if (pageName == "base" && restaurantId == null) {
        const latest_places_container = document.getElementById("latest-places-container");
        const top_rated_places_container = document.getElementById("top-rated-places");
        const recommended_places_container = document.getElementById("suggested-places");
        
        
        let restaurants = await axiosUtils.getRestaurants();
        restaurants = restaurants.restaurants;
        
        
        let latest_places = [];
        let top_rated_places = [];
        const recommended_places = [
          restaurants[0],
          restaurants[6],
          restaurants[5],
          restaurants[8]
        ];

        for (let i=0; i<restaurants.length ;i++){
          if (restaurants[i].about.newly_added) {
            latest_places.push(restaurants[i]);
          } 
          if (restaurants[i].rating.overall.value >= 4.5) {
            top_rated_places.push(restaurants[i]);
          }
        }

        for (let i=0; i<4; i++) {
          let url = `background-image: url('./img/restaurants/${latest_places[i].id}/${latest_places[i].id}_small.jpg');
          position: relative;
          border-radius: 5px;
          background-color: var(--lighter-grey-color);
          background-size: cover;
          background-blend-mode:luminosity;
          height: 150px;
          text-align: end;
          justify-items: end;
          color: #fff;
          animation: scaleUpBase 1s 1 forwards alternate ease-in-out;`;
          console.log(latest_places_container.children[i]);
          latest_places_container.children[i].style= url;
          latest_places_container.children[i].onclick = function () {
            axiosUtils.loadPageContent("single_rest", latest_places[i]._id);
          }
          latest_places_container.children[i].addEventListener("mouseover", function () {
            latest_places_container.children[i].style = `background-image: url('./img/restaurants/${latest_places[i].id}/${latest_places[i].id}_small.jpg');
            position: relative;
            background-color: var(--lighter-grey-color);
            border-radius: 5px;
            background-size: cover;
            background-blend-mode:normal;
            height: 150px;
            text-align: end;
            justify-content: flex-end;
            color: #fff;
            animation: scaleUpBase 1s 1 forwards alternate ease-in-out;`
          });
          latest_places_container.children[i].addEventListener("mouseout", function () {
            latest_places_container.children[i].style = `background-image: url('./img/restaurants/${latest_places[i].id}/${latest_places[i].id}_small.jpg');
            position: relative;
            background-color: var(--lighter-grey-color);
            border-radius: 5px;
            background-size: cover;
            background-blend-mode:luminosity;
            color: var(--grey-color);
            height: 150px;
            text-align: end;
            justify-content: flex-end;
            color: #fff;`
          });
          latest_places_container.children[i].textContent = latest_places[i].about.name;
          }

        for (let i=0; i<4; i++) {
          let url = `background-image: url('./img/restaurants/${top_rated_places[i].id}/${top_rated_places[i].id}_small.jpg');
          position: relative;
          background-color: var(--lighter-grey-color);
          border-radius: 5px;
          background-size: cover;
          background-blend-mode:luminosity;
          height: 150px;
          text-align: end;
          justify-content: flex-end;
          color: #fff;
          animation: scaleUpBase 1s 1 forwards alternate ease-in-out;`;
          top_rated_places_container.children[i].style = url;  
          top_rated_places_container.children[i].addEventListener("mouseover", function () {
            top_rated_places_container.children[i].style = `background-image: url('./img/restaurants/${top_rated_places[i].id}/${top_rated_places[i].id}_small.jpg');
            position: relative;
            background-color: var(--lighter-grey-color);
            border-radius: 5px;
            background-size: cover;
            background-blend-mode:normal;
            height: 150px;
            text-align: end;
            justify-content: flex-end;
            color: #fff;
            animation: scaleUpBase 1s 1 forwards alternate ease-in-out;`
          });
          top_rated_places_container.children[i].addEventListener("mouseout", function () {
            top_rated_places_container.children[i].style = `background-image: url('./img/restaurants/${top_rated_places[i].id}/${top_rated_places[i].id}_small.jpg');
            position: relative;
            background-color: var(--lighter-grey-color);
            border-radius: 5px;
            background-size: cover;
            background-blend-mode:luminosity;
            height: 150px;
            text-align: end;
            justify-content: flex-end;
            color: #fff;`
          });
          top_rated_places_container.children[i].onclick = function () {
            axiosUtils.loadPageContent("single_rest", top_rated_places[i]._id);
          }
          top_rated_places_container.children[i].textContent = top_rated_places[i].about.name;   
        }

        for (let i=0; i<4; i++) {
          let url = `background-image: url('./img/restaurants/${recommended_places[i].id}/${recommended_places[i].id}_small.jpg');
          position: relative;
          background-color: var(--lighter-grey-color);
          border-radius: 5px;
          background-size: cover;
          background-blend-mode:luminosity;
          height: 150px;
          text-align: end;
          justify-content: flex-end;
          color: #fff;
          animation: scaleUpBase 1s 1 forwards alternate ease-in-out;`;
          recommended_places_container.children[i].style = url; 
          recommended_places_container.children[i].onclick = function () {
            axiosUtils.loadPageContent("single_rest", recommended_places[i]._id);
          }
          recommended_places_container.children[i].addEventListener("mouseover", function () {
            recommended_places_container.children[i].style = `background-image: url('./img/restaurants/${recommended_places[i].id}/${recommended_places[i].id}_small.jpg');
            position: relative;
            background-color: var(--lighter-grey-color);
            border-radius: 5px;
            background-size: cover;
            background-blend-mode:normal;
            height: 150px;
            text-align: end;
            justify-content: flex-end;
            color: #fff;
            animation: scaleUpBase 1s 1 forwards alternate ease-in-out;`
          });
          recommended_places_container.children[i].addEventListener("mouseout", function () {
            recommended_places_container.children[i].style = `background-image: url('./img/restaurants/${recommended_places[i].id}/${recommended_places[i].id}_small.jpg');
            position: relative;
            background-color: var(--lighter-grey-color);
            border-radius: 5px;
            background-size: cover;
            background-blend-mode:luminosity;
            height: 150px;
            text-align: end;
            justify-content: flex-end;
            color: #fff;`
          });

          recommended_places_container.children[i].textContent = recommended_places[i].about.name;
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
