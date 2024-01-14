import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import LoadingBar from 'react-top-loading-bar';
import { useLocation } from 'react-router-dom';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import NotFound from './components/Layout/NotFound/NotFound';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Createcourse from './components/Admin/CreateCourse/Createcourse';
import Users from './components/Admin/Users/Users';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getMyProfile } from './redux/actions/user';
import Loader from './components/Layout/Loader/Loader';
import ProtectedRoute from './components/Protect/protectedRoute';

const App = () => {
  // window.addEventListener('contextmenu',(e)=>{
  //   e.preventDefault()
  // })
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { message, error, loading } = useSelector(state => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message]);


  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  let admin;
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  if (
    location.pathname === '/admin/dashboard' ||
    location.pathname === '/admin/courses' ||
    location.pathname === '/admin/createcourse' ||
    location.pathname === '/admin/users'
  ) {
    admin = true;
  } else {
    admin = false;
  }
  useEffect(() => {
    setProgress(100);
  }, [location.pathname]);

  const authenticated = localStorage.getItem('Authenticated');

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <LoadingBar
            color={admin ? '#e76ffc' : 'yellow'}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            height="3px"
          /> */}
          <Header isAuthenticated={user.isAutenticated} user={user.user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:id"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <CoursePage />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request" element={<Request />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAutenticated={!authenticated}
                  redirect={'/profile'}
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <Profile user={user.user} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route
              path="/register"
              element={
                  <Register />
              }
            />
            <Route path="/forgerpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createcourse"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <Createcourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  isAutenticated={authenticated}
                  redirect={'/login'}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </>
  );
};

export default App;
