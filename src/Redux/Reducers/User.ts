import types from "../Actions/types";

const initialState = {
  name: [],
  students: [],
};

export const UserReducer = (state = initialState, { type, data }: any) => {
  switch (type) {
    case types.ADD_DATA:
      return {
        name: data?.name,
        students: data?.students,
      };
    case types.CLEAR:
      return {
        name: [],
        students: [],
      };
    default:
      return state;
  }
};
