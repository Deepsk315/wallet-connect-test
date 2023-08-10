import React from "react";
import logo from "../assets/images/logo.png";


export default function Login() {

  return (
    <div className="profile-view">
      <div style={{textAlign: "center"}}>
        <img
          src={logo}
          alt="logo"
          className="sidebar-logo"
          style={{width: '200px', filter: "saturate(0) brightness(4)"}}
        />
      </div>

      <div className="setting-box">
        <div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
            ></input>
          </div>
        </div>
        <div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="@John"
            ></input>
          </div>
        </div>
        <div
          className="col-12 col-sm-6 d-flex justify-content-center align-items-end"
          style={{marginBottom: "10px"}}
        >
          <button className="btn-template m-2">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
