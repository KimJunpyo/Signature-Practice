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

export const init = (): TodoListType => {
  const initList = localStorage.getItem("todoList");
  const initId = localStorage.getItem("id");

  return {
    list: initList ? (JSON.parse(initList) as TodoItemType[]) : [],
    id: initId ? Number(JSON.parse(initId)) : 0,
    filter: "all",
  };
};

export const initialState: TodoListType = {
  list: [],
  id: 0,
  filter: "all",
};

export const reducer = (state: TodoListType, action: TodoListAction) => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        list: state.list.concat({
          id: state.id,
          text: action.payload?.text || "",
          completed: false,
        }),
        id: state.id + 1,
      };
    case TOGGLE_TODO:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === (action.payload?.id || 0)
            ? { ...item, completed: !item.completed }
            : item
        ),
      };
    case ALL_TOGGLE:
      return {
        ...state,
        list: state.list.map((item) => ({
          ...item,
          completed: action.payload?.completed || false,
        })),
      };
    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter(
          (item) => item.id !== (action.payload?.id || 0)
        ),
      };
    case DELETE_ALL_TODO:
      return {
        ...state,
        list: state.list.filter((item) => !item.completed),
      };
    case EDIT_TODO:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? { ...item, text: action.payload?.text || "" }
            : item
        ),
      };
    case FILTER_TODO:
      return {
        ...state,
        filter: action.payload?.filter || "all",
      };
    default:
      return state;
  }
};
