import { FC } from "react";
import Card from "../Components/Card";
import { typeUser } from "../Helpers";
import types from "../Redux/Actions/types";
import { useDispatch } from "react-redux";

type propsType = {
  data: typeUser[];
};
const Home = (props: propsType) => {
  const dispatch = useDispatch();
  const ft_logout = () => {
    dispatch({ type: types.CLEAR, data: [] });
  };
  return (
    <div className="Home">
      <div style={{ cursor: "pointer" }}>
        <span onClick={ft_logout}>Logout</span>
      </div>
      {props.data.map((el: typeUser, key: number) => (
        <Card key={key} el={el} />
      ))}
    </div>
  );
};

export default Home;
