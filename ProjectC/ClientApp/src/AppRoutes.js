import { MakeAccount } from "./components/A-MakeAccount";
import { AccountInfo } from "./components/AccountInfo";
import { AdminMenu } from "./components/AdminMenu";
import { Counter } from "./components/Counter";
import { MachineTickets } from "./components/F-MachineTickets";
import { MakeTicket } from "./components/F-MakeTicket";
import { MyTickets } from "./components/F-MyTickets";
import { SeeFAQ } from "./components/F-SeeFAQ";
import { FetchData } from "./components/FetchData";
import { FieldEmployeeMenu } from "./components/FieldEmployeeMenu";
import { Home } from "./components/Home";
import { LogInPage } from "./components/LogInPage";
import { SeeDetailsTicket } from "./components/SeeDetailsTicket";
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
    },
  {
    path: '/F-MakeTicket',
    element: <MakeTicket />
  },
  {
    path: '/F-SeeFAQ',
    element: <SeeFAQ />
    },
  {
    path: '/AccountInfo',
    element: <AccountInfo />
  },
  {
    path: '/A-MakeAccount',
    element: <MakeAccount    />
    },
  {
     path: '/F-MyTickets',
     element: <MyTickets />
    },
  {
     path: '/F-MachineTickets',
     element: <MachineTickets />
    },
  {
      path: '/SeeDetailsTicket',
      element: <SeeDetailsTicket />
  },
];

export default AppRoutes;
