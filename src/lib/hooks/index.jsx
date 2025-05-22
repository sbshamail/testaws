import { v4 as uuidv4 } from "uuid";
export { default as useQuery } from "./useQuery";

export const useUUID = () => {
  return uuidv4();
};
