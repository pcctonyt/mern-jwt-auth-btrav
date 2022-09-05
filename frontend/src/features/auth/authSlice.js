// where the reducers and initial state for the authentication for the redux goes
// the async thunk allows for aysnchronous middleware to get along with the server, easier to do with the Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
// Register the user - Create the asyncThunk function to handle the asynchronous data in/out of the server, we'll do a service file to deal with all of the http:// stuff, we'll use axios with npm i axios react-toastify to "toast" the successes / deal with the errors.  The user gets passed in from the register component
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        // this error response could be in different places, let's check for that
        const message = ( error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
    },
}, //using this instead of the root reducer switch statement in regular Redux
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.isLoading = true
          }) // the name of the function, what we do with state when a register action is pending
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          }) // when we get the user's data back
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
    }
})

// he says it's weird that we have to export that reset function, but when it is in the authSlice, we have to, so we can bring it into components where we want to use it
export const { reset } = authSlice.actions
export default authSlice.reducer