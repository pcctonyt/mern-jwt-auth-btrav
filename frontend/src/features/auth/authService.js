//create the authService function for the try/catch in authSlice.js, which is just used for making the http request and sending the data back
import axios from "axios";

const API_URL = "/api/users/"

// For registering a user, user's data gets passed in here like the other one on authSlice.js
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register
}

export default authService
