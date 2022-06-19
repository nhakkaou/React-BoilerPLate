import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { typeUser } from "./Helpers";
type stateType = {
  data: typeUser[];
};
function App() {
  const data = useSelector((state: stateType) => state.data);
  return (
    <div className="App">
      {data.length === 0 ? <Login /> : <Home data={data} />}
    </div>
  );
}

export default App;
