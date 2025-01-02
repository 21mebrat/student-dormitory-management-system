import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import RegisterStudents from "../pages/DirectorPages/manageStudents/registerStudents/RegisterStudents";
import RegisterBuilding from "../pages/DirectorPages/manageBuildings/register building/RegisterBuilding";
import PasswordReset from "../components/PasswordReset/ForgotPassword";
import ResetPassword from "../components/PasswordReset/ResetPassword";

// Wrapping lazy-loaded components with Suspense
const LazyLoad = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

// Lazy-loaded components
const App = React.lazy(() => import("../App"));
const Login = React.lazy(() => import("../pages/login/Login"));
const Unauthorized = React.lazy(() => import("../components/unauthorized/Unauthorized"));

// Student Pages
const Home = React.lazy(() => import("../pages/studentPages/Home/Home"));
const StudentHome = React.lazy(() =>
  import("../pages/studentPages/studenthome/StudentHome")
);
const SearchDorm = React.lazy(() =>
  import("../pages/studentPages/searchDorm/SearchDorm")
);
const Contact = React.lazy(() =>
  import("../pages/studentPages/contact/Contact")
);
const About = React.lazy(() => import("../pages/studentPages/about/About"));

// Director Pages
const DashboardLayout = React.lazy(() =>
  import("../pages/DirectorPages/dashboardLayout/DashboardLayout")
);
const UpdateDirector = React.lazy(() =>
  import("../pages/DirectorPages/UpdateDirectorAccount/UpdateDirector")
);
const Message = React.lazy(() =>
  import("../pages/DirectorPages/message/Message")
);
const DirectorDashBord = React.lazy(() =>
  import("../pages/DirectorPages/directorDashbord/DirectorDashBord")
);
const UpdateStudent = React.lazy(() =>
  import("../pages/DirectorPages/manageStudents/UpdateStudents/UpdateStudent"))
const UpdateBuilding = React.lazy(() =>
  import("../pages/DirectorPages/manageBuildings/UpdateBuilding/UpdateBuilding"))
const ManageStudents = React.lazy(() =>
  import("../pages/DirectorPages/manageStudents/ManageStudents")
);
const ManageProctors = React.lazy(() =>
  import("../pages/DirectorPages/manageProctors/ManageProctors")
);
const ManageBuildings = React.lazy(() =>
  import("../pages/DirectorPages/manageBuildings/ManageBuildings")
);

// Admin Pages

const AdminDashboardLayout = React.lazy(() =>
  import("../pages/AdminPages/DashboardLayout/DashboardLayout")
);
const AdminUpdate = React.lazy(() =>
  import("../pages/AdminPages/AdminUpdate/AdminUpdate")
);
const ProtectedRoute = React.lazy(() =>
  import("../components/protectedRoute/ProtectedRoute")
);
const AdminDashboard = React.lazy(() =>
  import("../pages/AdminPages/adminDashboard/AdminDashboard")
);
const CreateAcount = React.lazy(() =>
  import("../components/Admin/manageAccout/createAccount/CreateAcount")
);
const BackupComponent = React.lazy(() =>
  import("../pages/AdminPages/backup/Backup")
);
const AccountController = React.lazy(() =>
  import("../components/Admin/manageAccout/controllAccount/AccountController")
);
const UpdateAccount = React.lazy(() =>
  import("../components/Admin/manageAccout/updateAccount/UpdateAccount")
);

// Proctor Pages
const ProctorLayout = React.lazy(() =>
  import("../pages/ProctorPages/proctorLayout/ProctorLayout")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: LazyLoad(App),
    children: [
      // Login Route
      {
        path: "/",
        element: LazyLoad(Login),
      },
      {
        path: "/forgot-password",
        element: LazyLoad(PasswordReset),
      },
      {
        path: "/reset-password",
        element: LazyLoad(ResetPassword),
      },
      {
        path: "/unauthorized",
        element: LazyLoad(Unauthorized),
      },

      // Student Routes
      {
        path: "/student",
        element: LazyLoad(Home),
        children: [
          { path: "", element: LazyLoad(StudentHome) },
          { path: "search-dorm", element: LazyLoad(SearchDorm) },
          { path: "contact", element: LazyLoad(Contact) },
          { path: "about", element: LazyLoad(About) },
        ],
      },

      // Director Routes
      {
        path: "/director-dashboard",
        element: (
          <ProtectedRoute alloweduser={["DIRECTOR"]}>
            {LazyLoad(DashboardLayout)}
          </ProtectedRoute>
        ),

        children: [
          { path: "", element: LazyLoad(DirectorDashBord) },
          { path: "update-DIRECTOR", element: LazyLoad(UpdateDirector) },
          { path: "manage-students", element: LazyLoad(ManageStudents) },
          { path: "manage-proctors", element: LazyLoad(ManageProctors) },
          { path: "manage-buildings", element: LazyLoad(ManageBuildings) },
          { path: "update-student/:id", element: LazyLoad(UpdateStudent) },
          { path: "register-student", element: LazyLoad(RegisterStudents) },
          { path: "register-building", element: LazyLoad(RegisterBuilding) },
          { path: "update-building/:id", element: LazyLoad(UpdateBuilding) },
          { path: "messages", element: LazyLoad(Message) },
        ],
      },

      // Admin Routes
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute alloweduser={["ADMIN"]}>
            {LazyLoad(AdminDashboardLayout)
            }          </ProtectedRoute>
        ),
        children: [
          { path: "", element: LazyLoad(AdminDashboard) },
          { path: "create-account", element: LazyLoad(CreateAcount) },
          { path: "update-ADMIN", element: LazyLoad(AdminUpdate) },
          { path: "backup", element: LazyLoad(BackupComponent) },
          { path: "manage-accounts", element: LazyLoad(AccountController) },
          { path: "update-account/:id", element: LazyLoad(UpdateAccount) },
        ],
      },

      // Proctor Routes
      {
        path: "/proctor",
        element: LazyLoad(ProctorLayout),
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
