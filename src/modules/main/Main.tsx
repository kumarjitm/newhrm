import {useState, useEffect, useCallback} from 'react';
import {Outlet} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser} from '@store/reducers/auth';
import {toggleSidebarMenu} from '@app/store/reducers/ui';
import {addWindowClass, removeWindowClass, sleep} from '@app/utils/helpers';
import ControlSidebar from '@app/modules/main/control-sidebar/ControlSidebar';
import Header from '@app/modules/main/header/Header';
import MenuSidebar from '@app/modules/main/menu-sidebar/MenuSidebar';
import Footer from '@app/modules/main/footer/Footer';
import {PfImage} from '@profabric/react-components';
import axios from 'axios';
import { log } from 'console';
import { userDetailsUrl } from '@app/services/urls';

const Main = () => {
      const dispatch = useDispatch();

      const menuSidebarCollapsed = useSelector(
        (state: any) => state.ui.menuSidebarCollapsed
      );

      const controlSidebarCollapsed = useSelector(
        (state: any) => state.ui.controlSidebarCollapsed
      );

      const screenSize = useSelector((state: any) => state.ui.screenSize);
      const [isAppLoaded, setIsAppLoaded] = useState(false);

      const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
      };
      
      const userId=localStorage.getItem("userId");
      
      const checkTime=()=>{
        const expireTime=localStorage.getItem("expiresIn");
        const setTime=localStorage.getItem("setTime");
        const now=new Date().getTime();
        if(expireTime && setTime && (now-parseInt(setTime))>(parseInt(expireTime)*1000)){
          alert("Session Expired!! Login Again...");
          dispatch(logoutUser());
        }
      }

      const fetchProfile = async () => {
        try {
          const token=localStorage.getItem("token");
          const response = await axios.post(userDetailsUrl,{"id":`${userId}`},{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
          dispatch(loadUser(response.data.data));
          await sleep(1000);
          setIsAppLoaded(true);
        } catch (error) {
          log(error);
          dispatch(logoutUser());
          await sleep(1000);
          setIsAppLoaded(true);
        }
      };

      useEffect(() => {
        const interval = setInterval(() => {
          checkTime();
        }, 1000);
        return () => clearInterval(interval);
      }, []);

      useEffect(() => {
        removeWindowClass('register-page');
        removeWindowClass('login-page');
        removeWindowClass('hold-transition');
        addWindowClass('sidebar-mini');
        fetchProfile();
        return () => {
          removeWindowClass('sidebar-mini');
        };
      }, []);

      useEffect(() => {
        removeWindowClass('sidebar-closed');
        removeWindowClass('sidebar-collapse');
        removeWindowClass('sidebar-open');
        if (menuSidebarCollapsed && screenSize === 'lg') {
          addWindowClass('sidebar-collapse');
        } else if (menuSidebarCollapsed && screenSize === 'xs') {
          addWindowClass('sidebar-open');
        } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
          addWindowClass('sidebar-closed');
          addWindowClass('sidebar-collapse');
        }
      }, [screenSize, menuSidebarCollapsed]);

      useEffect(() => {
        if (controlSidebarCollapsed) {
          removeWindowClass('control-sidebar-slide-open');
        } else {
          addWindowClass('control-sidebar-slide-open');
        }
      }, [screenSize, controlSidebarCollapsed]);

      const getAppTemplate = useCallback(() => {
          if (!isAppLoaded) {
            return (
              <div className="preloader flex-column justify-content-center align-items-center">
                <PfImage
                  className="animation__shake"
                  src="/img/dbs_logo.jpg"
                  alt="AdminLTELogo"
                  height={60}
                  width={60}
                />
              </div>
            );
          }
  return (
    <>
      <Header />
      <MenuSidebar />
      <div className="content-wrapper">
        <div className="pt-3" />
        <section className="content">
          <Outlet />
        </section>
      </div>
      <Footer />
      <ControlSidebar />
      <div
        id="sidebar-overlay"
        role="presentation"
        onClick={handleToggleMenuSidebar}
        onKeyDown={() => {}}
      />
    </>
  );
      }, [isAppLoaded]);

  return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
