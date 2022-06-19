import types from "../Actions/types";

const initialState = [
  {
    name: "",
    students: [],
  },
];

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
