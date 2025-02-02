import ListTypes from "../listTypes/ListTipes";
import SearchTimber from "../searchTimber/SearchTimber";
import "./main.css";

const Main = (): JSX.Element => {
  return (
    <ul className="for-filtering">
      <li>
        <ListTypes />
      </li>
      <li>
        <SearchTimber />
      </li>
    </ul>
  );
};
export default Main;
