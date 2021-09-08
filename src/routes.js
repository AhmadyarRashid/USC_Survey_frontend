import VectorMap from "views/maps/VectorMap.jsx";
import GoogleMaps from "views/maps/GoogleMaps.jsx";
import FullScreenMap from "views/maps/FullScreenMap.jsx";
import ReactTables from "views/tables/ReactTables.jsx";
import RegularTables from "views/tables/RegularTables.jsx";
import ExtendedTables from "views/tables/ExtendedTables.jsx";
import Wizard from "views/forms/Wizard.jsx";
import ValidationForms from "views/forms/ValidationForms.jsx";
import ExtendedForms from "views/forms/ExtendedForms.jsx";
import RegularForms from "views/forms/RegularForms.jsx";
import CreateUserComponent from "views/forms/RegularForms.jsx";
import Calendar from "views/Calendar.jsx";
import Widgets from "views/Widgets.jsx";
import Charts from "views/Charts.jsx";
import Dashboard from "views/Dashboard.jsx";
import Buttons from "views/components/Buttons.jsx";
import SweetAlert from "views/components/SweetAlert.jsx";
import Notifications from "views/components/Notifications.jsx";
import Grid from "views/components/Grid.jsx";
import Typography from "views/components/Typography.jsx";
import Panels from "views/components/Panels.jsx";
import Icons from "views/components/Icons.jsx";
import Pricing from "views/pages/Pricing.jsx";
import Register from "views/pages/Register.jsx";
import Timeline from "views/pages/Timeline.jsx";
import User from "views/pages/User.jsx";
import Login from "views/pages/Login.jsx";
import Rtl from "views/pages/Rtl.jsx";
import Lock from "views/pages/Lock.jsx";
import UserReportsPage from "./views/Reports/userReports";
import RegionReportsPage from "./views/Reports/regionReports";
import StoresPage from "./views/Stores/index";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/ourStores",
    name: "Stores",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-cart",
    component: StoresPage,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Reports",
    rtlName: "إستمارات",
    icon: "tim-icons icon-notes",
    state: "reportsCollapse",
    views: [
      {
        path: "/userReports",
        name: "User Reports",
        rtlName: "أشكال عادية",
        mini: "User",
        rtlMini: "صو",
        component: UserReportsPage,
        layout: "/admin"
      },
      {
        path: "/regionReports",
        name: "Region Reports",
        rtlName: "أشكال عادية",
        mini: "Region",
        rtlMini: "صو",
        component: RegionReportsPage,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "User Management",
    rtlName: "إستمارات",
    icon: "tim-icons icon-single-02",
    state: "userCollapse",
    views: [
      {
        path: "/users",
        name: "Users",
        rtlName: "أشكال عادية",
        mini: "all",
        rtlMini: "صو",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/create",
        name: "Create User",
        rtlName: "أشكال عادية",
        mini: "Create",
        rtlMini: "صو",
        component: CreateUserComponent,
        layout: "/admin"
      },
    ]
  },
];

export const unAuthRoutes = [
  {
    path: "/login",
    name: "Login",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Login,
    layout: "/auth"
  },
]

const routesOld = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        rtlName: "عالتسعير",
        mini: "P",
        rtlMini: "ع",
        component: Pricing,
        layout: "/auth"
      },
      {
        path: "/rtl-support",
        name: "RTL Support",
        rtlName: "صودعم رتل",
        mini: "RS",
        rtlMini: "صو",
        component: Rtl,
        layout: "/rtl"
      },
      {
        path: "/timeline",
        name: "Timeline",
        rtlName: "تيالجدول الزمني",
        mini: "T",
        rtlMini: "تي",
        component: Timeline,
        layout: "/admin"
      },
      {
        path: "/login",
        name: "Login",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: Login,
        layout: "/auth"
      },
      {
        path: "/register",
        name: "Register",
        rtlName: "تسجيل",
        mini: "R",
        rtlMini: "صع",
        component: Register,
        layout: "/auth"
      },
      {
        path: "/lock-screen",
        name: "Lock Screen",
        rtlName: "اقفل الشاشة",
        mini: "LS",
        rtlMini: "هذاع",
        component: Lock,
        layout: "/auth"
      },
      {
        path: "/user-profile",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        rtlMini: "شع",
        component: User,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Components",
    rtlName: "المكونات",
    icon: "tim-icons icon-molecule-40",
    state: "componentsCollapse",
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        rtlName: "انهيار متعدد المستويات",
        mini: "MLT",
        rtlMini: "ر",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            rtlName: "وصفت",
            mini: "B",
            rtlMini: "ب",
            component: Buttons,
            layout: "/admin"
          }
        ]
      },
      {
        path: "/buttons",
        name: "Buttons",
        rtlName: "وصفت",
        mini: "B",
        rtlMini: "ب",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/grid-system",
        name: "Grid System",
        rtlName: "نظام الشبكة",
        mini: "GS",
        rtlMini: "زو",
        component: Grid,
        layout: "/admin"
      },
      {
        path: "/panels",
        name: "Panels",
        rtlName: "لوحات",
        mini: "P",
        rtlMini: "ع",
        component: Panels,
        layout: "/admin"
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        rtlName: "الحلو تنبيه",
        mini: "SA",
        rtlMini: "ومن",
        component: SweetAlert,
        layout: "/admin"
      },
      {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        mini: "N",
        rtlMini: "ن",
        component: Notifications,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        mini: "I",
        rtlMini: "و",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        mini: "T",
        rtlMini: "ر",
        component: Typography,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "إستمارات",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "نماذج موسعة",
        mini: "EF",
        rtlMini: "هوو",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "نماذج التحقق من الصحة",
        mini: "VF",
        rtlMini: "تو",
        component: ValidationForms,
        layout: "/admin"
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "ساحر",
        mini: "W",
        rtlMini: "ث",
        component: Wizard,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "الجداول",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "طاولات عادية",
        mini: "RT",
        rtlMini: "صر",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "جداول ممتدة",
        mini: "ET",
        rtlMini: "هور",
        component: ExtendedTables,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Maps",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    state: "mapsCollapse",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "خرائط جوجل",
        mini: "GM",
        rtlMini: "زم",
        component: GoogleMaps,
        layout: "/admin"
      },
      {
        path: "/full-screen-map",
        name: "Full Screen Map",
        rtlName: "خريطة كاملة الشاشة",
        mini: "FSM",
        rtlMini: "ووم",
        component: FullScreenMap,
        layout: "/admin"
      },
      {
        path: "/vector-map",
        name: "Vector Map",
        rtlName: "خريطة المتجه",
        mini: "VM",
        rtlMini: "تم",
        component: VectorMap,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "الحاجيات",
    icon: "tim-icons icon-settings",
    component: Widgets,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "الرسوم البيانية",
    icon: "tim-icons icon-chart-bar-32",
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "التقويم",
    icon: "tim-icons icon-time-alarm",
    component: Calendar,
    layout: "/admin"
  }
];

export default routes;
