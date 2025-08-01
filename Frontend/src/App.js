import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";




// Import sab pages yaha rakh de
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
 


import Login from "./components/Login/Login";

import UserDetails from "./components/UserDetails/Userdetails/UserDetails";
import ExamCategory from "./components/UserDetails/ExamCategory/ExamCategory";
import ExamSelection from "./components/UserDetails/ExamSelection/ExamSelection";

import AdminLogin from "./pages/mainAdmin/AdminLogin";

import SubAdminLogin from "./pages/MainSubAdmin/SubAdminLogin/SubAdminLogin"; // Naya banayega ye login component
import SubAdminDashboard from "./pages/MainSubAdmin/SubAdminDashboard/SubAdminDashboard"; // Naya banayega dashboard
import StudentInformation from "./components/StudentInformation/StudentInformation";
import IIMPredictor from "./pages/IIMPredictor/IIMPredictor";
import IIMPredictorResult from "./components/IIMPredictorResult/IIMPredictorResult";
import ManageInstructors from "./pages/SubAdmin/ManageInstructors/ManageInstructors";



// import AddCourse from "./subpages/ManageCourses/AddCourse";


import ExamPage from "./subpages/ExamPage/ExamPage";
import ResultPage from "./subpages/ResultPage/ResultPage";



import StudentDashboard from "./pages/Student/Dashboard";
import AboutUs from "./pages/AboutUs/AboutUs";
import OurBlogs from "./pages/ourBlogs/OurBlogs";
import Tips from "./pages/Tips/Tips";
import GetInTouch from "./pages/GetInTouch/GetInTouch";

import ResourcesPage from "./pages/Resources/ResourcesPage";
import OurFaculity from "./pages/ourFaculity/OurFaculity";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import CoursePurchase from "./pages/CousePurchase/CoursePurchase";
// import MyCourses from "./pages/Student/MyCourses/MyCourses";
import StudentLayout from "./pages/Student/StudentLayout/StudentLayout";

import AdminDashboard from "./pages/mainAdmin/AdminDashboard";
import AllStudents from "./pages/mainAdmin/AllStudents/AllStudents";
import AllTeachers from "./pages/mainAdmin/AllTeachers/AllTeachers";
import AdminProfile from "./pages/mainAdmin/AdminProfile/AdminProfile";
import AddCourse from "./pages/mainAdmin/AddCourse/AddCourse";
import AllUsers from "./pages/mainAdmin/AllUsers/AllUsers";
import CourseContentManager from "./pages/mainAdmin/CourseContentManager/CourseContentManager";
import CourseTreeView from "./pages/mainAdmin/CourseTreeView/CourseTreeView"; // ⬅️ isko top par bhi import karna
import CourseStructure from "./pages/mainAdmin/CourseTreeView/CourseStructure";
import PracticeTestManagement from "./pages/mainAdmin/PracticeTestManagement/PracticeTestManagement";
import StudyMaterials from "./pages/mainAdmin/StudyMaterials/StudyMaterials";
import Announcements from "./pages/mainAdmin/Announcements/Announcements";
import DiscussionManagement from "./pages/mainAdmin/DiscussionManagement/DiscussionManagement";
import MockTestManagement from "./pages/mainAdmin/MockTestManagement/MockTestManagement";
import StudentPracticeTests from "./pages/Student/PracticeTests/StudentPracticeTests";
import TestInstructions from "./pages/Student/PracticeTests/TestInstructions";
import SuccessStory from "./pages/SuccessStory/SuccessStory";
import Faq from "./pages/Faq/Faq";
import ScoreCard from "./pages/ScoreCard/ScoreCard";
import Team from "./pages/Team/Team";
import ImageGallery from "./pages/ImageGallery/ImageGallery";
import MockTest from "./pages/MockTest/MockTest";
import FinalResource from "./pages/FinalResource/FinalResource";
import WhySection from "./components/whySection/WhySection";
import Cat from "./pages/cat/Cat";
import Testimonial from "./pages/Testimonial/Testimonial";
import CourseComprasion from "./components/CourseComprasion/CourseComprasion";
import FAQ from "./components/FAQ/FAQ";
import Mycourse from "./components/MyCourses/Mycourse";
import ExploreBlog from "./components/ExploreBlog/ExploreBlog";
import Instruction from "./components/Instruction/Instruction";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import DevModeNotification from "./components/DevModeNotification/DevModeNotification";

// Auto-login functionality is handled in AppContent useEffect

// PrivateRoute: Flexible to handle admin and subadmin tokens
const PrivateRoute = ({ children, tokenName }) => {
  const token = localStorage.getItem(tokenName);
  return token ? (
    children
  ) : (
    <Navigate to={tokenName === "adminToken" ? "/admin" : "/subadmin"} />
  );
};

// Main app content
const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Check if current route is admin/subadmin login page to hide header/footer
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isSubAdminRoute =
    location.pathname.startsWith("/subadmin") &&
    !location.pathname.startsWith("/subadmin/dashboard");
  const isStudentDashboard = location.pathname.startsWith("/student");

  return (
    <>
      <DevModeNotification />
      {!isAdminRoute && !isSubAdminRoute && !isStudentDashboard && (
        <Header user={user} setUser={setUser} />
      )}

      <Routes>
        {/* Public and user routes */}
        <Route path="/" element={<Home />} />
       
       
        <Route path="/Login" element={<Login setUser={setUser} />} />


        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute tokenName="adminToken">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-students"
          element={
            <PrivateRoute tokenName="adminToken">
              <AllStudents />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-teachers"
          element={
            <PrivateRoute tokenName="adminToken">
              <AllTeachers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PrivateRoute tokenName="adminToken">
              <AdminProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-courses"
          element={
            <PrivateRoute tokenName="adminToken">
              <AddCourse />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-users"
          element={
            <PrivateRoute tokenName="adminToken">
              <AllUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/course-content-manager"
          element={
            <PrivateRoute tokenName="adminToken">
              <CourseContentManager />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/view-courses"
          element={
            <PrivateRoute tokenName="adminToken">
              <CourseTreeView />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/courses/:courseId/structure"
          element={
            <PrivateRoute tokenName="adminToken">
              <CourseStructure />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/practice-tests"
          element={
            <PrivateRoute tokenName="adminToken">
              <PracticeTestManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/study-materials"
          element={
            <PrivateRoute tokenName="adminToken">
              <StudyMaterials />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/announcements"
          element={
            <PrivateRoute tokenName="adminToken">
              <Announcements />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/discussions"
          element={
            <PrivateRoute tokenName="adminToken">
              <DiscussionManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/mock-tests"
          element={
            <PrivateRoute tokenName="adminToken">
              <MockTestManagement />
            </PrivateRoute>
          }
        />

        {/* SubAdmin routes */}
        <Route path="/subadmin" element={<SubAdminLogin />} />
        <Route
          path="/subadmin/dashboard"
          element={
            <PrivateRoute tokenName="subadminToken">
              <SubAdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Other routes */}
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/exam-category" element={<ExamCategory />} />
        <Route path="/exam-selection/:category" element={<ExamSelection />} />
        {/* <Route path="/study-zone" element={<StudentDashboard />} /> */}
        <Route path="/student-information" element={<StudentInformation />} />
        <Route path="/IIM-Predictor" element={<IIMPredictor />} />
        <Route path="/iim-results/:userId" element={<IIMPredictorResult />} />
        <Route path="/manage-instructors" element={<ManageInstructors />} />
       
        
        <Route path="/add-course" element={<AddCourse />} />
       
       
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/exam/result" element={<ResultPage />} />
 
       
        <Route path="/AboutUs" element={<AboutUs />} />

        <Route path="/Tips" element={<Tips />} />
        <Route path="/GetInTouch" element={<GetInTouch />} />
        <Route path="/Testimonial" element={<Testimonial />} />
        <Route path="/resourcespage" element={<ResourcesPage />} />
        <Route path="/ourfaculity" element={<OurFaculity />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/course-purchase" element={<CoursePurchase />} />
        <Route path="/success-stories" element={<SuccessStory />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/score-card" element={<ScoreCard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/image-gallery" element={<ImageGallery />} />
        <Route path="/mock-test" element={<MockTest />} />
        <Route path="/resource" element={<FinalResource />} />
        <Route path="/ourBlog" element={<OurBlogs />} />

        <Route path="/why" element={<WhySection />} />
        <Route path="/cat" element={<Cat />} />
        <Route path="/compare" element={<CourseComprasion />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/my-courses" element={<Mycourse />} />
        <Route path="/explore-blog" element={<ExploreBlog />} />
        <Route path="/instruction" element={<Instruction />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="practice-tests" element={<StudentPracticeTests />} />
          <Route path="practice-tests/:testId/instructions" element={<TestInstructions />} />
          <Route path="my-courses" element={<Mycourse />} />
        </Route>

        {/* Redirect all unknown routes to admin login */}
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>

      {!isAdminRoute && !isSubAdminRoute && !isStudentDashboard && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
