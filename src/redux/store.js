import { configureStore } from "@reduxjs/toolkit";
import { userReducer} from "./slices/user-slice";


const store = configureStore({
    reducer:{
        users:userReducer,
    }
})

export default store; 