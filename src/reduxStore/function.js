import { useSelector } from "react-redux";

export const useSelection = (select) =>
  useSelector((state) => state?.[select]?.data);
