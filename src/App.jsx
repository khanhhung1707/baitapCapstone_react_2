import {
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import HomeTemplate from "./Templates/HomeTemplate";
import Index from "./Pages/Index/Index";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Search from "./Pages/Search/Search";
import Detail from "./Pages/Detail/Detail";

export const routeLink = createBrowserHistory();

function App() {
  return (
    <>
      <HistoryRouter history={routeLink}>
        <Routes>
          <Route path="" element={<HomeTemplate />}>
            <Route index element={<Index />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="search" element={<Search />}></Route>
            <Route path="detail">
              <Route path=":id" element={<Detail />}></Route>
            </Route>
            <Route path="*" element={<Navigate to={"/"} />}></Route>
          </Route>
        </Routes>
      </HistoryRouter>
    </>
  );
}

export default App;
