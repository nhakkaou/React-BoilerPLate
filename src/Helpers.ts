export type typeUser = {
  name: string;
  students: Array<string>;
};
export type typeStudent = {
  Name: string;
  Classes: Array<string>;
};
type typeClass = {
  fields: typeUser;
  id: string;
};

type typeStudents = {
  fields: typeStudent;
};
export const filterClasses = (
  Classes: typeClass[],
  Students: typeStudents[]
) => {
  let tmp: typeUser[] = [];
  Classes.forEach((Class: typeClass) => {
    let tmpClass: typeUser = {
      name: Class.fields.name,
      students: [],
    };
    Students.forEach((Student: typeStudents) => {
      if (Student.fields.Classes.includes(Class.id)) {
        tmpClass.students.push(Student.fields.Name);
      }
    });
    tmp.push(tmpClass);
  });
  return tmp;
};
