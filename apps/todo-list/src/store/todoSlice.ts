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

export const postTodos = createAsyncThunk(
  "todos/postTodos",
  async (text: string) => {
    const response = await instance.post<TodoItemType>("/todos", {
      id: Date.now(),
      text,
      completed: false,
    });
    return response.data;
  }
);

export const editTodos = createAsyncThunk(
  "todos/editTodos",
  async ({ id, text }: { id: number; text: string }) => {
    const response = await instance.patch<TodoItemType>(`/todos/${id}`, {
      text,
    });
    return response.data;
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (id: number) => {
    await instance.delete(`/todos/${id}`);
    return id;
  }
);

export const deleteAllTodos = createAsyncThunk(
  "todos/deleteAllTodos",
  async (_, { getState }) => {
    const state = getState() as { todo: TodoListType };
    const ids = state.todo.list.map((item) => item.id);
    for (const id of ids) {
      await instance.delete(`/todos/${id}`);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
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
    filterTodo: (state, action) => {
      state.filter = action.payload?.filter || "all";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        state.list = state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id === action.payload);
      })
      .addCase(deleteAllTodos.fulfilled, (state) => {
        state.list = [];
      });
  },
});

export const { toggleTodo, allToggleTodo, filterTodo } = todoSlice.actions;

export default todoSlice.reducer;
