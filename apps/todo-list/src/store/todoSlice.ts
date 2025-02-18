import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api";

export const CREATE_TODO = "CREATE";
export const TOGGLE_TODO = "TOGGLE";
export const ALL_TOGGLE = "ALL_TOGGLE";
export const DELETE_TODO = "DELETE";
export const DELETE_ALL_TODO = "DELETE_ALL";
export const EDIT_TODO = "EDIT";
export const FILTER_TODO = "FILTER";

export interface TodoItemType {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoListType {
  list: TodoItemType[];
  id: number;
  filter: "all" | "todo" | "done";
}
export interface TodoListPayload {
  id?: number;
  text?: string;
  completed?: boolean;
  filter?: "all" | "todo" | "done";
}

export interface TodoListAction {
  type:
    | "CREATE"
    | "TOGGLE"
    | "ALL_TOGGLE"
    | "DELETE"
    | "DELETE_ALL"
    | "EDIT"
    | "FILTER";
  payload: TodoListPayload;
}

export const initialState: TodoListType = {
  list: [],
  id: 0,
  filter: "all",
};

export const fetchTodos = createAsyncThunk<TodoItemType[]>(
  "todos/fetchTodos",
  async () => {
    const response = await instance.get<TodoItemType[]>("/todos");
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list = state.list.concat({
        id: state.id,
        text: action.payload?.text || "",
        completed: false,
      });
      state.id += 1;
    },
    toggleTodo: (state, action) => {
      state.list = state.list.map((item) =>
        item.id === (action.payload?.id || 0)
          ? { ...item, completed: !item.completed }
          : item
      );
    },
    allToggleTodo: (state, action) => {
      console.log(action);
      state.list = state.list.map((item) => ({
        ...item,
        completed: action.payload?.completed || false,
      }));
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter(
        (item) => item.id !== (action.payload?.id || 0)
      );
    },
    deleteAllTodo: (state) => {
      state.list = state.list.filter((item) => !item.completed);
    },
    editTodo: (state, action) => {
      state.list = state.list.map((item) =>
        item.id === action.payload.id
          ? { ...item, text: action.payload?.text || "" }
          : item
      );
    },
    filterTodo: (state, action) => {
      state.filter = action.payload?.filter || "all";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const {
  addTodo,
  toggleTodo,
  allToggleTodo,
  deleteTodo,
  deleteAllTodo,
  editTodo,
  filterTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
