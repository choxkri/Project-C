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
import { UnassignedTickets } from "./components/S-UnassignedTickets";

//For the required Roles: 1 = Employee, 2 = Customer, 3 = Admin
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
      element: <AdminMenu />,
     requiredRole: 3, 
    },
  {
    path: '/FieldEmployeeMenu',
      element: <FieldEmployeeMenu />,
     requiredRole: 2,
    },
  {
    path: '/ServiceEmployeeMenu',
      element: <ServiceEmployeeMenu />,
      requiredRole: 1,
    },
  {
    path: '/F-MakeTicket',
      element: <MakeTicket />,
    requiredRole: 2,
  },
  {
    path: '/F-SeeFAQ',
      element: <SeeFAQ />,
      requiredRole: 2,
    },
  {
    path: '/AccountInfo',
    element: <AccountInfo />
  },
  {
    path: '/A-MakeAccount',
      element: <MakeAccount />,
      requiredRole: 3,
    },
  {
     path: '/F-MyTickets',
      element: <MyTickets />,
     requiredRole: 2,
    },
  {
     path: '/F-MachineTickets',
      element: <MachineTickets />,
      requiredRole: 2,
    },
  {
      path: '/SeeDetailsTicket',
      element: <SeeDetailsTicket />,
      requiredRole: [1, 2, 3], 
  },
    {
        path: '/S-UnassignedTickets',
        element: <UnassignedTickets />,
        requiredRole: 1,
  },
];

export default AppRoutes;
