import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Address {
  street: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Fetch users from an external API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

// Slice for managing users
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      // Add a new user to the users array
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      // Find and update the user with the given id
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      // Filter out the user with the given id
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  }
});

// Export actions and reducer
export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
