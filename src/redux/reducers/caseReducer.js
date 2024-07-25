import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  loading: false,
  error: null,
};

const caseSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPatients, setLoading, setError } = caseSlice.actions;
export default caseSlice.reducer;
