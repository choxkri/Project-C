import { AdminMenu } from "./components/AdminMenu";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { FieldEmployeeMenu } from "./components/FieldEmployeeMenu";
import { Home } from "./components/Home";
import { LogInPage } from "./components/LogInPage";
import { ServiceEmployeeMenu } from "./components/ServiceEmployeeMenu";

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
    },
  {
    path: '/FieldEmployeeMenu',
    element: <FieldEmployeeMenu />
    },
  {
    path: '/ServiceEmployeeMenu',
    element: <ServiceEmployeeMenu />
  }
];

export default AppRoutes;
