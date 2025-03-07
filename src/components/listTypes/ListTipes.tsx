import { useDispatch, useSelector } from "react-redux";
import { filterAdd } from "./listTypesSlice";
import { IInitialStateTypes } from "../../types/timbers";
import "./listTypes.css";
import { RootState } from "../../store/store";

const ListTypes = (): JSX.Element => {
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.types.type);
  const baseStyle: string = "types-li";
  const activeStyle: string = "types-li types-li-active";
  const getType = (someType: IInitialStateTypes["type"]): void => {
    dispatch(filterAdd(someType));
  };
  return (
    <ul className="types-ul">
      <li
        className={`${type === "all types" ? activeStyle : baseStyle}`}
        onClick={() => getType("all types")}
      >
        Все типы
      </li>
      <li
        className={`${type === "Разовая продажа" ? activeStyle : baseStyle}`}
        onClick={() => getType("Разовая продажа")}
      >
        Прямые продажи
      </li>
      <li
        className={`${type === "Аукцион" ? activeStyle : baseStyle}`}
        onClick={() => getType("Аукцион")}
      >
        Аукцион
      </li>
    </ul>
  );
};

export default ListTypes;
