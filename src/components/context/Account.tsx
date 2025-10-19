import { useAppDispatch } from "./AppContext";
import type { account } from "./AppContext";

export function useAccount() {
  const dispatch = useAppDispatch();
  return (account: account) => {
    dispatch({ type: "SET_ACCOUNT", account });
  };
}
