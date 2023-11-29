import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../../firebase/firebase.config";
import { doc,updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// import { doc } from "firebase/firestore";

const initialState = {
  state: {
    isFetching: false,
    isLoading: false,
    error: "",
  },
  user: {
    userType: "",
    isAuthenticated: false,
    token: "",
    profileData: {},
    likedNews:{
      isLoading:false,
      error: "",
      likedSavedData:[]
    },
    

  },

  
};

export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("RESULLT123", result);

      // Check if the user document already exists
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // User document already exists, you may want to dispatch an action or perform additional logic
        // console.log("User already exists:", userDocSnapshot.data());
      } else {
        // User document does not exist, create a new one
        await createUserDocument(user.uid, {
          // Additional user data if needed
          email: user.email
        });
      }

      // You may want to dispatch further actions here to update the state
      return {
        userType: "user", // Set user type accordingly
        token: user?.accessToken, // Set the user token accordingly
        profileData: user, // Update this with the actual user profile data you need
      };
    } catch (error) {
      // console.log("Some error432", error);
      // console.error("Google Sign-In Error:", error.message);
      throw error;
    }
  }
);

// Function to create a user document in Firestore
const createUserDocument = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);

    // Set the user document with the provided data
    await setDoc(userRef, userData, {merge:true});

    // console.log("User document created successfully");
  } catch (error) {
    console.error("Error creating user document:", error.message);
  }
};

export const signOutUser = createAsyncThunk(
  "user/signOutUser",
  async (_, { dispatch }) => {
    try {
      await signOut(auth);

      // You may want to dispatch further actions here to update the state
      dispatch(listenToAuthState);
    } catch (error) {
      console.error("Sign-Out Error:", error.message);
      throw error;
    }
  }
);

export const listenToAuthState = createAsyncThunk(
  "user/listenToAuthState",
  async (_, { dispatch }) => {
    // console.log("Auth state changes");
    onAuthStateChanged(auth, (user) => {
      // console.log("Already user", user);
      if (user) {
        // User is signed in
        dispatch(
          setUser({
            userType: "user",
            token: user?.accessToken,
            uid: user?.uid,
            profileData: user,
          })
        );
      } else {
        // console.log("Sign out feature");
        // User is signed out
        dispatch(signOutUser());
      }
    });
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (registerData, thunkAPI) => {
    try {
      const { email, password } = registerData;
      const authResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("Auth res", authResult);
      const user = authResult.user;
      await createUserDocument(authResult.user.uid, {
        // Additional user data if needed
        email: email
      });

      return {
        userType: "user", // Set user type accordingly
        token: user?.accessToken, // Set the user token accordingly
        profileData: user, // Update this with the actual user profile data you need
      };
    } catch (error) {
      // console.log("ERR:>", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUserWithEmailPassword = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const { email, password } = loginData;
      const loginRes = await signInWithEmailAndPassword(auth, email, password);
      // console.log("Auth res", loginRes);
      const user = loginRes.user;
      return {
        userType: "user", // Set user type accordingly
        token: user?.accessToken, // Set the user token accordingly
        profileData: user, // Update this with the actual user profile data you need
      };
    } catch (error) {
      // console.log("ERR:>", error.code, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      let url = `${BASE_URL}/customer/getProfile`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          userType: userType,
          userToken: userId,
        },
      });
      //   console.log("RESP>>", response);
      return response?.data;
    } catch (error) {
      //   console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const getAllLiked = createAsyncThunk(
  'admin/getAllLiked',
  async (_, thunkAPI) => {
    try{
      let { uid }=_;
      
      // console.log("HRERERE", uid);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        // console.log("No such document!");
      }
          return {data: docSnap.data()};

   
    }
    catch(err){
        // console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }

  }
);



export const AddLikedSaved = createAsyncThunk(
  "admin/likeSaved",
  async (postData, thunkAPI) => {
    
    try {
      const { uid, action, newsData } = postData;
      // console.log("HERE" , uid, action ,newsData);
      const userRef = doc(db, "users", uid);

      let updateRes;

      if (action === "liked") {
        // Atomically add a new value to the "liked" array field.
        updateRes = await updateDoc(userRef, {
          liked: arrayUnion(newsData),
        }, {merge:true});
      } else if (action === "saved") {
        // Atomically add a new value to the "saved" array field.
        updateRes = await updateDoc(userRef, {
          saved: arrayUnion(newsData),
        }, {merge:true});
      } else {
        // Handle other action types if needed
        console.error("Invalid action type");
      }
    //  console.log("UPD RES", updateRes);
      return { data: updateRes };
    } catch (err) {
      // console.log("ERR:", err);
      return thunkAPI.rejectWithValue(err?.response?.data?.error);
    }
  }
);





const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    setUser: (state, action) => {
      state.user.userType = action.payload.userType;
      state.user.token = action.payload.token;
      state.user.isAuthenticated = true;
      state.user.profileData = action.payload.profileData;
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled action of signInWithGoogle
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      setUser(state, action); // Call the setUser reducer to update the state
      state.state.isFetching = false; // Update the fetching state if needed
      // console.log("Sucess fsign in", action);

      state.user.userType = action?.payload?.userType;
      state.user.isAuthenticated = true;
      state.user.token = action?.payload?.token;
      state.user.profileData = action?.payload?.profileData;
    });

    // Handle the fulfilled action of signOutUser
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.user.userType = "";
      state.user.token = "";
      state.user.isAuthenticated = false;
      // Clear other user properties as needed
    });
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.state.isLoading = true;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.state.isLoading = false;
      state.state.error = action.error.message;
      // console.log("rejected reaseon", action);
    });
    // for sign up with email password
    builder.addCase(registerUser.fulfilled, (state, action) => {
      setUser(state, action); // Call the setUser reducer to update the state
      state.state.isFetching = false; // Update the fetching state if needed
      // console.log("Sucess fsign email/password in", action);

      state.user.userType = action?.payload?.userType;
      state.user.isAuthenticated = true;
      state.user.token = action?.payload?.token;
      state.user.profileData = action?.payload?.profileData;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.state.isLoading = false;
      state.state.error = action.payload;
      // console.log("rejected reaseon", action);
    });

    // for sign in with email password
    builder.addCase(loginUserWithEmailPassword.fulfilled, (state, action) => {
      setUser(state, action); // Call the setUser reducer to update the state
      state.state.isFetching = false; // Update the fetching state if needed
      // console.log("Sucess sign in  email/password in", action);

      state.user.userType = action?.payload?.userType;
      state.user.isAuthenticated = true;
      state.user.token = action?.payload?.token;
      state.user.profileData = action?.payload?.profileData;
    });
    builder.addCase(loginUserWithEmailPassword.pending, (state) => {
      state.state.isLoading = true;
    });
    builder.addCase(loginUserWithEmailPassword.rejected, (state, action) => {
      state.state.isLoading = false;
      state.state.error = action.payload;
      // console.log("rejected reaseon", action);
    });
   // sign out user action handling
    builder.addCase(signOutUser.pending, (state) => {
      state.state.isLoading = true;
    });
    builder.addCase(signOutUser.rejected, (state, action) => {
      state.state.isLoading = false;
      state.state.error = action.error.message;
    });
    builder.addCase(listenToAuthState.fulfilled, (state, action) => {
      state.state.isFetching = false; // Update the fetching state if needed
    });
    //getting the liked and saved news articles
    builder.addCase(getAllLiked.pending, (state) => {
      state.user.likedNews.isLoading = true;
    });
    builder.addCase(getAllLiked.fulfilled, (state, action) => {
             state.user.likedNews.isLoading=false;
             state.user.likedNews.likedSavedData=action.payload;
    });
    builder.addCase(getAllLiked.rejected, (state, action) => {
      state.user.likedNews.isLoading = false;
      state.user.likedNews.error = action.payload;
      // console.log("rejected reaseon", action);
    });
    // handling the action of adding or saving news article
    builder.addCase(AddLikedSaved.pending, (state) => {
      state.user.likedNews.isLoading = true;
    });
    builder.addCase(AddLikedSaved.fulfilled, (state, action) => {
             state.user.likedNews.isLoading=false;
            
    });
    builder.addCase(AddLikedSaved.rejected, (state, action) => {
      state.user.likedNews.isLoading = false;
      state.user.likedNews.error = action.payload;
      // console.log("rejected reaseon", action);
    });



  },
});

export const { setIsFetching, setUser } = userSlice.actions;

export default userSlice.reducer;
