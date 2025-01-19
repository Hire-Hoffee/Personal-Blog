import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import { AxiosError } from "axios";

interface AuthState {
  user: { username: string; id: number } | null;
  token: string | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: undefined,
};

export const login = createAsyncThunk<
  { username: string; id: number; token: string },
  { username: string; password: string },
  { rejectValue: { message: string } }
>("auth/login", async (credentials: { username: string; password: string }, thunkAPI) => {
  try {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.id);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});

export const register = createAsyncThunk<
  { message: string },
  { username: string; password: string },
  { rejectValue: { message: string } }
>("auth/register", async (credentials: { username: string; password: string }, thunkAPI) => {
  try {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUserId: (state, action) => {
      state.user = {
        username: state.user?.username || "",
        id: Number(action.payload),
      };
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { username: action.payload.username, id: action.payload.id };
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logout, setUserId, resetError } = authSlice.actions;
export default authSlice.reducer;
