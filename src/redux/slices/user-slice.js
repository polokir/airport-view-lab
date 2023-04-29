import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios-queries";

const initialState = {
  data: null,
  status: "loading",
  role:''
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (params) => {
    const { data } = await axios.post("users/login", params);
    return data;
  }
);

export const registerUser = createAsyncThunk("users/registerUser", async (params) =>{
  const {data} =await axios.post('users/register',params);
  return data;
})

export const getRole = createAsyncThunk('users/GetRole',async () =>{
  const {data} = await axios.get('/refresh');
  console.log(data);
  return data;
})

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    //==========login================
    [fetchUserData.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUserData.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //================================


     //==========register================
    [registerUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [registerUser.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //================================



    //==============================
    [getRole.pending]: (state) => {
      state.status = "loading";
      state.role = null;
    },
    [getRole.fulfilled]: (state, action) => {
      state.role = action.payload.trim();
      state.status = "loaded";
    },
    [getRole.rejected]: (state) => {
      state.role = null;
      state.status = "error";
    },

  },
});

export const isAuthUser = state => Boolean(state.users.data);
export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
