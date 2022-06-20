import axios from "axios";
const Api = () => {
  let data = {
    baseURL: "https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyBhM1CXO76lhx4F",
    },
  };
  return axios.create(data);
};

export default Api;
