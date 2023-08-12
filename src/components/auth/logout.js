import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate()
    const logOut = ()=>{
        localStorage.clear();
        navigate('/')
    }
  return (
    <>
      <div class="card text-center" style={{ margin: "13rem" }}>
        <div
          class="card-header"
          style={{
            "font-weight": "700",
            color: "#2acc46",
            "font-family": "system-ui",
            "font-size": "2rem",
          }}
        >
         Maha E Seva
        </div>
        <div class="card-body">
          <h5 class="card-title">Are You Sure You Want To Log Out?</h5>
          <a href="#" class="btn btn-primary mt-5" onClick={()=>{ logOut() }}>
            Log Out
          </a>
          <a
            href="#"
            class="btn btn-primary mt-5"
            style={{ "margin-left": "62px" }}
            // onClick={()=>{ navigate('/dashboard')}}
          >
            Cancle
          </a>
        </div>
      </div>
    </>
  );
}
