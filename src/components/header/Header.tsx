import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { timberSelect } from "../timberList/timberSlice";
import { timberAdd } from "../timberList/timberSlice";

import data from "../../data/data";

import "./header.css";

import heart from "../img/heart.svg";
import box from "../img/box.svg";
import bag from "../img/bag.svg";

const Header = () => {
  type ForSection = "favorite" | "warehouse" | "deal";
  const dispatch = useDispatch();
  const [section, setSection] = useState<ForSection>("warehouse");

  useEffect(() => {
    dispatch(timberAdd(data));
  }, [section, dispatch]);

  function changeSection(section: ForSection): void {
    setSection(section);
    dispatch(timberSelect(section));
  }
  return (
    <div className="header">
      <div className="top"></div>
      <ul className="nav-ul">
        <li
          className={`${section === "favorite" ? "nav-active" : "nav"}`}
          onClick={() => changeSection("favorite")}
        >
          <img className="nav-img" src={heart} alt="" />
          <h3 className="nav-name">Избранное</h3>
        </li>
        <li
          className={`${section === "warehouse" ? "nav-active" : "nav"}`}
          onClick={() => changeSection("warehouse")}
        >
          <img className="nav-img" src={box} alt="" />
          <h3 className="nav-name">Склад</h3>
        </li>
        <li
          className={`${section === "deal" ? "nav-active" : "nav"}`}
          onClick={() => changeSection("deal")}
        >
          <img className="nav-img" src={bag} alt="" />
          <h3 className="nav-name">Сделки</h3>
        </li>
      </ul>
    </div>
  );
};

export default Header;
