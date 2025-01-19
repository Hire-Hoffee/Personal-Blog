import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import { AxiosError } from "axios";
import { PostsData } from "@/types";

const initialState: { posts: PostsData[]; loading: boolean; error: string | undefined } = {
  posts: [],
  loading: false,
  error: undefined,
};

export const fetchPosts = createAsyncThunk<PostsData[], void, { rejectValue: { message: string } }>(
  "posts/fetchPosts",
  async () => {
    const response = await api.get("/posts");
    return response.data;
  }
);

export const createPost = createAsyncThunk<
  PostsData,
  { content: string; media: File | undefined },
  { rejectValue: { message: string } }
>("posts/createPost", async (postData: { content: string; media: File | undefined }, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("content", postData.content);
    if (postData.media) {
      formData.append("media", postData.media);
    }
    const response = await api.post("/posts/create", formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});

export const updatePost = createAsyncThunk<
  PostsData,
  { id: number; content: string; media: File | undefined },
  { rejectValue: { message: string } }
>(
  "posts/updatePost",
  async (postData: { id: number; content: string; media: File | undefined }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("content", postData.content);
      if (postData.media) {
        formData.append("media", postData.media);
      }
      const response = await api.put(`/posts/update/${postData.id}`, formData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const deletePost = createAsyncThunk<
  { message: number },
  number,
  { rejectValue: { message: string } }
>("posts/deletePost", async (id: number, thunkAPI) => {
  try {
    const response = await api.delete(`/posts/delete/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              ...action.payload,
            };
          }
          return post;
        });
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload.message);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { resetError } = postSlice.actions;
export default postSlice.reducer;
