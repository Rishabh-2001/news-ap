import axiosInstance from "@/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const NEWS_URL = process.env.NEXT_PUBLIC_NEWS_URL;
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const initialState = {
  state: {
    isFetching: false,
  },
  news: {
    newsData: [],
    error: "",
    isLoading: false,
    search: "",
  },
};

export const getAllNews = createAsyncThunk("user/news", async (_, thunkAPI) => {
  try {
    let { page, category, query } = _;
    // category
    // page
    // country
    // query q
    // sort by
    // from
    // to
    // sources

    let url = `${NEWS_URL}top-headlines?country=in&page=${page}&language=en`;
    if (category) {
      url += `&category=${category}`;
    }
    if (query) {
      url += `&q=${query}`;
    }
    const data = await axios.get(`${url}&apiKey=${API_KEY}`);
    //  console.log("RERER", data);
    return { data };
  } catch (err) {
    // console.log("ERR:", err);
    return thunkAPI.rejectWithValue(err?.response?.data);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.news.search = action?.payload;
    },
  },
  extraReducers: (builder) => {
    // to get all news
    builder.addCase(getAllNews.pending, (state) => {
      state.news.isLoading = true;
    });
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      // console.log(
      //   "Sucess fsign email/password in",
      //   action?.payload?.data?.data
      // );
      state.news.isLoading = false;
      state.news.newsData = action?.payload?.data?.data;
    });
    builder.addCase(getAllNews.rejected, (state, action) => {
      // console.log("rejected reaseon", action);
      state.news.isLoading = false;
      state.news.error = action.payload.code;
    });
  },
});

export const { setSearch } = newsSlice.actions;

export default newsSlice.reducer;
