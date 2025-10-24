import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Toast = {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  isLeaving?: boolean;
};

export type account = {
  fullname: string;
  email: string;
  isVerify: boolean | null;
  avatar: string;
  roles: string[];
  numberCartItem: number;
  createdAt: string;
};

type GlobalState = {
  toasts: Toast[];
  account: account | null;
  isShowPopup: boolean;
};

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "START_REMOVE_TOAST"; id: string }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "SET_ACCOUNT"; account: account | null }
  | { type: "SET_IS_SHOW_POPUP"; isShowPopup: boolean };

const AppStateContext = createContext<GlobalState | undefined>(undefined);
const AppDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined,
);

function appReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "START_REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, isLeaving: true } : t,
        ),
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
    case "SET_ACCOUNT":
      return { ...state, account: action.account };
    case "SET_IS_SHOW_POPUP":
      return { ...state, isShowPopup: action.isShowPopup };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    toasts: [],
    account: null,
    isShowPopup: false,
  });
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be inside AppProvider");
  return ctx;
}

export function useAppDispatch() {
  const ctx = useContext(AppDispatchContext);
  if (!ctx) throw new Error("useAppDispatch must be inside AppProvider");
  return ctx;
}
