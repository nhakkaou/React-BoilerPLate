import React, { FC, useState } from "react";
import axios from "axios";
const Login: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [load, setLoading] = useState<boolean>(false);

  const getData: () => void = async () => {
    try {
      if (username === "" || !username.match(/^\s*[a-zA-Z0-9]*\s*$/)) {
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
        if (student.data.records.length === 0) return alert("User not found");
        const user = student.data.records[0];
        let url = "";
        user.fields.Classes.map((el: string, key: number) => {
          url = url + `{id}=RECORD_ID(${el})`;
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
        console.log(Classes.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="Login">
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
    </div>
  );
};

export default Login;
