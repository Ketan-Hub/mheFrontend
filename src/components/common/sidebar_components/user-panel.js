import React, { useEffect, useState } from "react";
import man from "../../../assets/images/dashboard/man.png";

const UserPanel = () => {
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const [role, setRole] = useState();
  useEffect(()=>{

	  if (userData.user.role === "retailer") {
		setRole("MESK USER");
	  } else if (userData.user.role === "agent") {
		setRole("MESK Co-Ordinetor");
	  } else if (userData.user.role === "admin") {
		setRole("ADMIN");
	  }
  },[userData]);
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img
            className="img-60 rounded-circle lazyloaded blur-up"
            src={man}
            alt="#"
          />
        </div>
        <h6 className="mt-3 f-14 ">{userData.user.name}</h6>
        <p  className="text-white">{role}</p>
      </div>
    </div>
  );
};

export default UserPanel;
