import Header from "../header/Header";
import Main from "../main/Main";
import TimberList from "../timberList/TimberList";
import "./page.css";

const Page = (): JSX.Element => {
  return (
    <div className="page">
      <Header />
      <Main />
      <TimberList />
    </div>
  );
};
export default Page;
