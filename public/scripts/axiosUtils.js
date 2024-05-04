(function($global){


    var axiosUtils = {};
    axiosUtils.sendGetRequest = function (URL, handleResponse, handleError){
        axios.get(URL)
        .then(response => {
            handleResponse(response);
        })
        .catch(error => {
            handleError(error);
        });
    }

    axiosUtils.sendPostRequest = function (URL, data, handleResponse, handleError){
        axios.post(URL, data)
        .then(response => {
            handleResponse(response);
        })
        .catch(error => {
            handleError(error);
        });
    }

    axiosUtils.sendPutRequest = function (URL, data, handleResponse, handleError){
        axios.put(URL, data)
        .then(response => {
            handleResponse(response);
        })
        .catch(error => {
            handleError(error);
        });
    }

    axiosUtils.sendDeleteRequest = function (URL, handleResponse, handleError){
        axios.delete(URL)
        .then(response => {
            handleResponse(response);
        })
        .catch(error => {
            handleError(error);
        });
    }

    axiosUtils.loadPageContent = async function (pageName){
        try {
            const response = await axios.get('/snippets/' + pageName + '_snippet.html');
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = response.data;

            if (mainContent.classList.toggle('reservation-container'))
                mainContent.classList.remove('reservation-container');
            if (mainContent.classList.toggle('single-rest-container'))
                mainContent.classList.remove('single-rest-container');

            if (pageName == 'reservations' ) {
                mainContent.classList.add('reservation-container');
            } else if (pageName) {
                mainContent.classList.add('single-rest-container');
            }
            console.log('Page content >'+ pageName +'< loaded successfully!');
            
        } catch (error) {
            console.error('Error loading page content : '+ error);
        }
    }
  
    $global.$axiosUtils = axiosUtils;
})(window);