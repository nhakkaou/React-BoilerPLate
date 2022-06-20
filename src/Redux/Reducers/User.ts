import types from "../Actions/types";
import { typeUser } from "../../Helpers";
const initialState: typeUser[] = [];
type typeReducer = {
  type?: string;
  data: typeUser[];
};
export const UserReducer = (state = initialState, { type, data }: any) => {
  switch (type) {
    case types.ADD_DATA:
      return [...data];
    case types.CLEAR:
      return [];
    default:
      return state;
  }
};
