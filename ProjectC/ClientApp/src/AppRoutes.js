import { AdminMenu } from "./components/AdminMenu";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { LogInPage } from "./components/LogInPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
  {
    path: '/LogInPage',
    element: <LogInPage />
    },
  {
    path: '/AdminMenu',
    element: <AdminMenu />
  }
];

export default AppRoutes;
