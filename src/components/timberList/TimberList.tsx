import { useSelector } from "react-redux";

import TimberItem from "../timberItem/timberItem";
import "./timberList.css";

import { filteredTimbers } from "./timberSlice";
import ITimberList from "../../types/timbers";
type TimberElements = JSX.Element[] | JSX.Element;
const TimberList = (): JSX.Element => {
  const newElement = (timbers: ITimberList[]): TimberElements => {
    if (timbers.length === 0) {
      return (
        <>
          <div className="element-not-found">Список пуст</div>
        </>
      );
    }
    return timbers.map((item: ITimberList, index: number) => {
      return <TimberItem key={index} {...item} />;
    });
  };

  const filteredTimbersDone: ITimberList[] = useSelector(filteredTimbers);
  const elemets: TimberElements | JSX.Element = newElement(filteredTimbersDone);
  return <ul className="list-ul">{elemets}</ul>;
};

export default TimberList;
