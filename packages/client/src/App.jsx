import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';
import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import { Login } from './pages/Authentication/Login.jsx';
import { Signup } from './pages/Authentication/Signup.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const dashboardPage = <SiteWrapper>
  <DashboardBulletin />
</SiteWrapper>;

const newAssessmentPage = <SiteWrapper>
  <NewAssessment />
</SiteWrapper>;

const assessmentListPage = <SiteWrapper>
  <AssessmentList />
</SiteWrapper>;

const router = createBrowserRouter([
  {
    element: <Navigate to="/login" replace />,
    path: `/`,
  },
  {
    element: <Login />,
    path: `/login`,
  },
  {
    element: <Signup />,
    path: `/signup`,
  },
  {
    element: dashboardPage,
    path: `/dashboard`,
  },
  {
    element: newAssessmentPage,
    path: `/assessment/new`,
  },
  {
    element: assessmentListPage,
    path: `/assessment/list`,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
