import { useState } from "react";
import { useDispatch } from "react-redux";
import { timberSearchByName } from "../timberList/timberSlice";
import "./searchTimber.css";
import search from "../img/search.svg";

const SearchTimber = (): JSX.Element => {
  const dispatch = useDispatch();
  const [resultSearch, setSearch] = useState<string>("");
  return (
    <div className="search-pannel">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Поиск по названию"
        className="search-pannel-input"
      />
      <div
        onClick={() => dispatch(timberSearchByName(resultSearch))}
        className="search-pannel-btn"
      >
        <img src={search} alt="" />
      </div>
    </div>
  );
};
export default SearchTimber;
