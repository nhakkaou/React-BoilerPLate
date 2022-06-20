export type typeUser = {
  name: string;
  students: Array<string>;
};

export const filterClasses = (Classes: any, Students: any) => {
  let tmp: typeUser[] = [];
  console.log("Class", Classes);
  console.log("students", Students);
  Classes.forEach((Class: any) => {
    let tmpClass: typeUser = {
      name: Class.fields.Name,
      students: [],
    };
    Students.forEach((Student: any) => {
      if (Student.fields.Classes.includes(Class.id)) {
        tmpClass.students.push(Student.fields.Name);
      }
    });
    tmp.push(tmpClass);
  });
  return tmp;
};
