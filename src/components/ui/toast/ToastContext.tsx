import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Toast = {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
};

type State = {
  toasts: Toast[];
};

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string };

const ToastStateContext = createContext<State | undefined>(undefined);
const ToastDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined,
);

function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { toasts: [...state.toasts, action.toast] };
    case "REMOVE_TOAST":
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });
  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export function useToastState() {
  const ctx = useContext(ToastStateContext);
  if (!ctx) throw new Error("useToastState must be inside ToastProvider");
  return ctx;
}

export function useToastDispatch() {
  const ctx = useContext(ToastDispatchContext);
  if (!ctx) throw new Error("useToastDispatch must be inside ToastProvider");
  return ctx;
}

// Hook để gửi thông báo
export function useToast(timeout = 3000) {
  const dispatch = useToastDispatch();
  function toast(type: Toast["type"], message: string) {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: "ADD_TOAST",
      toast: { id, type, message },
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", id });
    }, timeout);
  }
  return toast;
}
