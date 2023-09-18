import React, { useContext, useEffect } from "react";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FcAddDatabase, FcHome, FcList } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../components/useAdmin";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLOgout = () => {
    logOut().then(() => {
      localStorage.removeItem("voter-access-token");
      navigate("/login");
    });
  };

  const [isAdmin] = useAdmin();

  useEffect(() => {
    if (isAdmin) {
      navigate("/adminDashboard");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="drawer lg:drawer-open text-white">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content md:items-center justify-center min-h-screen bg-gradient-to-b">
  
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="drawer-button  btn btn-warning btn-outline border-2 text-white  btn-lg   lg:hidden fixed right-0 top-0  m-2 "
        >
          <AiOutlineMenuFold />
        </label>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full  text-white  bg-gradient-to-b  border-warning border-2">
          {/* Sidebar content here */}

          {isAdmin ? (
            <>
              <li className="hover:text-warning md:border-r border-warning">
                <NavLink to={"/"}>
                  <FcHome className="text-xl text-warning" /> Voters Home
                </NavLink>
              </li>
              <li className="hover:text-warning md:border-r border-warning">
                <NavLink to={"/adminDashboard"}>
                  <FcAddDatabase className="text-xl text-warning" /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/"}>
                  <FcList className="text-xl " /> Voters list
                </NavLink>
              </li>
              <li className="hover:text-warning md:border-r border-warning">
                <NavLink to={"/addNew"}>
                  <FcAddDatabase className="text-xl text-warning" /> Add A new
                </NavLink>
              </li>
            </>
          )}

          <div className="border-b border-warning py-3 mb-3"></div>

          {user ? (
            <li
              onClick={handleLOgout}
              className="hover:text-warning border-warning "
            >
              <NavLink to={"/login"}>
                <AiOutlineLogout className="text-xl text-warning" /> Logout
              </NavLink>
            </li>
          ) : (
            <li className="hover:text-warning border-warning ">
              <NavLink to={"/login"}>
                <AiOutlineLogin className="text-xl text-warning" /> Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
