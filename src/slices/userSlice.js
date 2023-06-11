import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

// createSlice returns a slice object with props of 
// name -> name of slice in the store
// actions -> name of the actions setUser
// reducer - all the reducer functions are returned here


  
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    } 
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;



// What the createSlice function returns
// {
//     name: 'user',
//     actions: {
//       setUser: [action creator function],
//       clearUser: [action creator function]
//     },
//     reducer: [reducer function]
//   }