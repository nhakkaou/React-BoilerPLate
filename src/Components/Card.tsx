import { typeUser } from "../Helpers";
type propsType = {
  el: typeUser;
};
const Card = (props: propsType) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.el.name}</h5>
        {props.el.students.map((el: string, key: number) => (
          <p className="card-text" key={key}>
            {el}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Card;
