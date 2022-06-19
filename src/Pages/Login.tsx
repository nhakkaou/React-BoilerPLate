import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import types from "../Redux/Actions/types";
import { typeUser } from "../Helpers";
import axios from "axios";
const Login: FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [load, setLoading] = useState<boolean>(false);
  const getData: () => void = async () => {
    try {
      if (username === "") {
        alert("Please enter a username");
      } else {
        setLoading(true);
        const student = await axios({
          method: "get",
          url: `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula={Name}="${username}"`,
          withCredentials: false,
          headers: {
            Authorization: "Bearer keyBhM1CXO76lhx4F",
          },
        }); // check if user exists
        if (student.data.records.length === 0) {
          setLoading(false);
          return alert("User not found");
        }
        const user = student.data.records[0];
        let url: string = "";
        user.fields.Classes.map((el: string, key: number) => {
          url = url + `RECORD_ID()="${el}"`;
          if (key !== user.fields.Classes.length - 1) url = url + ",";
        });
        const Classes = await axios({
          method: "get",
          url: `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes?filterByFormula=OR(${url})`,
          withCredentials: false,
          headers: {
            Authorization: "Bearer keyBhM1CXO76lhx4F",
          },
        }); // get classes
        url = "";
        const { records } = Classes.data;
        console.log(Classes);
        let studentId: string[] = [];
        for (let i = 0; i < records.length; i++) {
          const element = records[i].fields.Students;
          element.map((el: string) => {
            if (!studentId.includes(`RECORD_ID()="${el}"`))
              studentId.push(`RECORD_ID()="${el}"`);
          });
        }
        const Students = await axios({
          method: "get",
          url: `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=OR(${studentId.toString()})`,
          withCredentials: false,
          headers: {
            Authorization: "Bearer keyBhM1CXO76lhx4F",
          },
        });
        // // dispatch({ type: types.ADD_DATA, data: tmp });

        setLoading(false);
      }
    } catch (e) {
      console.log("Error Login:", e);
    }
  };
  return (
    <div className="Login">
      {load ? (
        <div>Loading...</div>
      ) : (
        <div>
          <span>Student Name:</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="submit" value="Login" onClick={getData} />
        </div>
      )}
    </div>
  );
};

export default Login;
