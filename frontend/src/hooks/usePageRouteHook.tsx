import { useLocation } from "react-router-dom";

export const usePageRoute = () => {
  const location = useLocation();

  const modifiedPath = location.pathname.replace("/", "");

  return modifiedPath;
};
