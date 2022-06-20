import Api from "./Api";

const AppAPI = {
  getStudents: (formula: string) => {
    return Api()
      .get(`/Students?filterByFormula=${formula}`)
      .then((response) => {
        return response.data.records;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getClasses: (formula: string) => {
    return Api()
      .get("/Classes?filterByFormula=" + formula)
      .then((response) => {
        return response.data.records;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default AppAPI;
