import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  clearAuthCookie,
  clearAuthStorage,
  loadAuthFromStorage,
  saveAuthToStorage,
  setAuthCookie,
} from './authStorage';

const API_BASE = 'http://localhost:4000/api/v1.0.0';

export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/login`, { username, password });
    return res.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.error || err.message || 'Login failed');
  }
});

const persisted = typeof window !== 'undefined' ? loadAuthFromStorage() : null;

const initialState = {
  token: persisted?.token || null,
  user: persisted?.user || null,
  status: 'idle',
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      clearAuthStorage();
      clearAuthCookie();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.token = action.payload.token;
        state.user = action.payload.user;

        saveAuthToStorage({ token: state.token, user: state.user });
        setAuthCookie(state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = slice.actions;

export const selectAuth = (state) => state.auth;
export const selectToken = (state) => state.auth.token;

export default slice.reducer;
