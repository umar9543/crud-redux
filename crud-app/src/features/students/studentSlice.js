import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  students: [],
  status: 'idle',
  error: null,
};

// Mock API endpoints
const STUDENTS_API_URL = 'http://localhost:5000/students';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(STUDENTS_API_URL);
  return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (newStudent) => {
  const response = await axios.post(STUDENTS_API_URL, newStudent);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`${STUDENTS_API_URL}/${id}`);
  return id;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async (updatedStudent) => {
  const { id, name, studentClass, section } = updatedStudent;
  const response = await axios.put(`${STUDENTS_API_URL}/${id}`, {
    name,
    class: studentClass,
    section,
  });
  return response.data;
});

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student.id !== action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student.id === action.payload.id);
        state.students[index] = action.payload;
      });
  },
});

export default studentSlice.reducer;
