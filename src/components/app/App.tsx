import { Provider } from "react-redux";
import Page from "../page/Page";
import store from "../../store/store";
const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};
export default App;
