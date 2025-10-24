import { useAppDispatch } from "./AppContext";

export function usePopup() {
  const dispatch = useAppDispatch();
  return (isShowPopup: boolean) => {
    dispatch({ type: "SET_IS_SHOW_POPUP", isShowPopup });
  };
}
