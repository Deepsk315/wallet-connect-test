import React, {useEffect} from "react";
import {NavLink, Link} from "react-router-dom";
import logo from "../assets/images/logo.png";
import {BiBell} from "react-icons/bi";
import Icons from "../Icons";
import {getUserNodes} from "../actions/profileActions";
import {RiMoneyPoundCircleLine} from "react-icons/ri";
import {MdOutlineDashboard} from "react-icons/md";
import {TbFileCertificate} from "react-icons/tb";
import {CgProfile} from "react-icons/cg";
import {SiDatabricks} from "react-icons/si";
import {useDispatch} from "react-redux";
import Avatar from "../assets/images/avatar.png";



export default function Layout({ profilePic, children }) {

  const useRefMenu = React.useRef();
  const dispatch = useDispatch();
  // const address = useAddress();

  // const loadUserNodes = loadProvider => {
  //   dispatch(getUserNodes(address, chainID, loadProvider));
  // };

  // useEffect(() => {
  //   if (connected) loadUserNodes(provider);
  // }, [connected]);

  const hideMiniMenu = () => {
    const cl = useRefMenu.current.className.toString();
    if (window.innerWidth <= 778) {
      if (cl.indexOf("show") > -1) {
        useRefMenu.current.className = "navbar-panel hide";
      }
    }
  }


  return (
    <div className="d-flex h-100">
      <div className="layout-sidebar">
        <span
          className="sidebar-top-menu"
          onClick={() => {
            const cl = useRefMenu.current.className.toString();
            if (cl.indexOf("show") > -1) {
              useRefMenu.current.className = "navbar-panel hide";
            } else {
              useRefMenu.current.className = "navbar-panel show";
            }
          }}
        >
          <Icons.Menu />
        </span>
        <div className="navbar-panel" ref={useRefMenu}>
          <NavLink to="/dashboard" className="sidebar-menu-item"  
             onClick={() => {
                    hideMiniMenu()
               }}
               >
            <span style={{marginRight: "1em", marginLeft: "1em"}}>
              <MdOutlineDashboard
                color="white"
                style={{width: "24px", height: "24px"}}
              />
            </span>
            {"Dashboard"}
          </NavLink>
        </div>
      </div>
      <div className="layout-mainbox">{children}</div>
    </div>
  );
}
