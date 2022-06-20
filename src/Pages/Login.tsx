import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import types from "../Redux/Actions/types";
import { typeUser, filterClasses } from "../Helpers";
import AppAPI from "../Services/App";
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
        const student = await AppAPI.getStudents(`{Name}="${username}"`);
        // check if user exists
        if (student.length === 0) {
          setLoading(false);
          return alert("User not found");
        }
        const user = student[0];
        let url: string = "";
        user.fields.Classes.map((el: string, key: number) => {
          url = url + `RECORD_ID()="${el}"`;
          if (key !== user.fields.Classes.length - 1) url = url + ",";
        });
        const Classes = await AppAPI.getClasses(`OR(${url})`);
        url = "";
        let studentId: string[] = [];
        for (let i = 0; i < Classes.length; i++) {
          const element = Classes[i].fields.Students;
          element.map((el: string) => {
            if (!studentId.includes(`RECORD_ID()="${el}"`))
              studentId.push(`RECORD_ID()="${el}"`);
          });
        }
        const Students = await AppAPI.getStudents(
          `OR(${studentId.toString()})`
        );

        const tmp = filterClasses(Classes, Students);
        dispatch({ type: types.ADD_DATA, data: tmp });
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
