import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: " Buyer Dashboard",
    path: "/dashboard/buyer",
    type: ACCOUNT_TYPE.BUYER,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "Book Property",
    path: "/dashboard/buyer",
    type: ACCOUNT_TYPE.BUYER,
    icon: "VscDashboard",
  },
  {
    id: 4,
    name: "Cancel Booking",
    path: "/dashboard/buyer",
    type: ACCOUNT_TYPE.BUYER,
    icon: "VscDashboard",
  },
  {
    id: 5,
    name: "View Reservation",
    path: "/dashboard/buyer",
    type: ACCOUNT_TYPE.BUYER,
    icon: "VscDashboard",
  },
  {
    id: 6,
    name: "Seller Dashboard",
    path: "/dashboard/seller",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscDashboard",
  },
  {
    id: 7,
    name: "Add  New Property",
    path: "/dashboard/seller",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscDashboard",
  },
  {
    id: 8,
    name: "View Your Bookings",
    path: "/dashboard/seller",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscDashboard",
  },
];
