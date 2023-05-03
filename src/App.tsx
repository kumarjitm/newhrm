import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
// import '../public/css/style.css'
// import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import Profile from '@pages/profile/Profile';
import Employee from '@pages/Emplyee/Employee';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import CompanyStructure from './pages/Company/CompanyStructure';
import Skills from './pages/Company/Fields/Skills';
import EmployeeList from './pages/Emplyee/EmployeeList';
import Expenses from './pages/Expenses/Expenses';
import Project from './pages/Time/Project';
import TimeSheet from './pages/Time/TimeSheet';
import Masters from './pages/Company/Masters';
import EmpProfile from './pages/Emplyee/EmpProfile';
import SubMenu from './pages/SubMenu';

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route> */}
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sub" element={<SubMenu />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path='/company' element={<CompanyStructure/>}/>
            <Route path='/expenses' element={<Expenses/>}/>
            <Route path='/projects' element={<Project/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/timesheet" element={<TimeSheet />} />
            <Route path="/masters" element={<Masters />} />
            <Route path="/empprofile" element={<EmpProfile />} />
            <Route path="/addleave" element={<EmpProfile />} />
            <Route path="/manageleave" element={<EmpProfile />} />
            <Route path="/*" element={<Blank />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
