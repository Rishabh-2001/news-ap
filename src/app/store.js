import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/user.slice'
import newsSlice from "./slice/news.slice";


export default configureStore({
    reducer:{
        user:userReducer,
        news: newsSlice,
    }
})

