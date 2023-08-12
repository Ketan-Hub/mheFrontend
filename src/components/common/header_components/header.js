import React, { Fragment, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchHeader from "./searchHeader";
import Notification from "./notification";
import UserMenu from "./user-menu";
import Language from "./language";
import { Button } from "reactstrap";
import { MdPersonOutline } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";

import {
  AlignLeft,
  Maximize2,
  Bell,
  MessageSquare,
  MoreHorizontal,
  LogOut,
} from "react-feather";

//images
// import logo from "../../../assets/images/dashboard/freedy_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { incNumber } from "../../../Redux/actions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(true);
  const [rightSidebar, setRightSidebar] = useState(true);
  const [navMenus, setNavMenus] = useState(false);
  const [Data, setData] = useState(null);
  const [items, setItems] = useState();
  const ID = items?.user?._id;
  const reducer = useSelector((state) => state.changeNumber);

  useEffect(() => {
    const userRespons = JSON.parse(localStorage.getItem("userResponse"));
    if (userRespons) {
      setItems(userRespons);
    }
  }, []);

  useEffect(() => {
    if (ID != undefined) {
      axios
        .get(`https://mhebackend.payagain.in/api/user/getone/${ID}`)
        .then(async (res) => {
          const data = await res.data;
          setData(data);
        });
    }
  }, [ID]);

  const toggle = () => {
    setNavMenus(!navMenus);
  };

  const showRightSidebar = () => {
    if (rightSidebar) {
      setRightSidebar(false);
      document.querySelector(".right-sidebar").classList.add("show");
    } else {
      setRightSidebar(true);
      document.querySelector(".right-sidebar").classList.remove("show");
    }
  };
  const goFull = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };
  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(false);
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
      document.querySelector(".footer").classList.add("open");
    } else {
      setSidebar(true);
      document.querySelector(".page-main-header").classList.remove("open");
      document.querySelector(".page-sidebar").classList.remove("open");
      document.querySelector(".footer").classList.remove("open");
    }
  };

  const recharge = () => {
    navigate(`${process.env.PUBLIC_URL}/recharge_details`);
  };

  const [balance, setBalance] = useState();

  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const users = useSelector((state) => state.userData.user);
  const [roll, setRoll] = useState(false);
  const GetRoll = users?.filter((item) => item._id === userData.user._id);
  const getRechargePoint = (user) => {
    if (user.role === "retailer") {
      axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
        const allData = res.data.filter((ele) => ele.user === user._id);
        let amount = 0;
        let expence = 0;
        if (allData.length > 0) {
          allData.forEach((item) => {
            if (item.isExpence === "true") {
              expence += item.amount;
            } else {
              amount += item.amount;
            }
          });
        }
        setBalance(amount - expence);
      });
    } else if (user.role === "agent") {
      axios.get(`https://mhebackend.payagain.in/api/wallet`).then((res) => {
        console.log(88, res.data);
        setRoll(true);

        const allData = res.data.filter((ele) => ele.agentId === user._id);
        console.log(152, allData);
        let withdrow = 0;
        let credit = 0;
        if (allData.length > 0) {
          allData.forEach((item) => {
            if (item.isWithdrowl === "false") {
              credit += item.creaditAmount;
            } else {
              withdrow += item.creaditAmount;
            }
          });
        }
        setBalance(credit - withdrow);
      });
    }
  };
  useEffect(() => {
    if (userData) {
      getRechargePoint(userData?.user);
    }
  }, [reducer]);
  const [sendReq, setSendReq] = useState({
    agentId: userData?.user?._id,
    agentName: userData?.user?.name,
    withdrowReqAmount: "",
    isAcceted: false,
    note: "",
    status: "Request Send",
  });
  const sendRequest = (e) => {
    e.preventDefault();
    if (balance > 0) {
     
      axios
        .post(`https://mhebackend.payagain.in/api/withdrowWallet/create`, sendReq)
        .then((res) => {
          const response = res;
          dispatch(incNumber());
          toast.success("Request Send SucceFully....")
        })
        .catch((err) => {
          console.log(err);
        });
    } else toast.error("Insufficient Funds");
  };

  return (
    <Fragment>
      {/* open */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
               Withdrawl
              </h1>
              <h4 className="mx-5 text-uppercase "> Balance :<span className="fs-3 fw-bolder"> {balance} ₹ </span> </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
           <div className="row mt-3">
            <div className="col-lg-6 ">

             <label htmlFor="Amount" className="fs-6 fw-bold">Enter Withdrawl Amount : </label> 
            </div>
            <div className="col-lg-6">
              <input type="number" className="form-control form-control-sm" name="" value={sendReq.withdrowReqAmount} id="Amount" onChange={(e)=>setSendReq({...sendReq,withdrowReqAmount:e.target.value})} />
            </div>
            <div className="col-lg-6 mt-4 ">

             <label htmlFor="Amount" className="fs-6 fw-bold">Note : </label> 
            </div>
            <div className="col-lg-12">
              {/* <input type="number" className="form-control form-control-sm" name="" value={sendReq.withdrowReqAmount} id="Amount" /> */}
              <textarea name=""  className="form-control form-control-sm mt-2" id="" cols="30" rows="10"onChange={(e)=>setSendReq({...sendReq,note:e.target.value})}></textarea>
            </div>
           </div>

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
                        
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => sendRequest(e)} >
                send Request
              </button>
            </div>
          </div>
        </div>
      </div>
      {Data != null && (
        <div className="page-main-header ">
          <div className="main-header-right row">
            <div className="main-header-left d-lg-none col-auto">
              <div className="logo-wrapper">
                <a href="index.html">
                  {/* <img className="blur-up lazyloaded" src={logo} alt="" /> */}
                </a>
              </div>
            </div>
            <div className="mobile-sidebar col-auto p-0">
              <div className="media-body text-end switch-sm">
                <label className="switch">
                  <a href="#javaScript" onClick={openCloseSidebar}>
                    <AlignLeft />
                  </a>
                </label>
              </div>
            </div>
            <div className="nav-right col">
              <ul className={"nav-menus " + (navMenus ? "open" : "")}>
                {userData.user.role === "admin" && <></>}
                {userData.user.role === "agent" && (
                  // <>
                  //   <Button
                  //     className="btn  p-2 "
                  //     style={{ backgroundColor: "#04d560" }}
                  //     onClick={(e) => sendRequest(e)}
                  //   >
                  //     Withdrow
                  //   </Button>

                  //   <li>
                  //     <div className="sm">
                  //       <h4>
                  //         current Balance:
                  //         <FaRupeeSign /> {balance}
                  //       </h4>
                  //     </div>
                  //   </li>
                  // </>
                  <>
                    <li>
                      {/* <!-- Button/ trigger modal --> */}
                      <button
                        type="button"
                        className="btn  p-2 "
                        style={{ backgroundColor: "#04d560" }}
                        // onClick={(e) => sendRequest(e)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Withdrawl
                      </button>

                      {/* <!-- Modal --> */}
                    </li>
                    <li>
                      <div className="sm">
                        <h4>
                          current Balance:
                          <FaRupeeSign /> {balance}
                        </h4>
                      </div>
                    </li>
                  </>
                )}
                {userData.user.role === "retailer" && (
                  <>
                    <li>
                      <Button
                        className="btn  p-2 "
                        style={{ backgroundColor: "#04d560" }}
                        onClick={recharge}
                      >
                        Recharge
                      </Button>
                    </li>

                    <li>
                      <div className="sm">
                        <h4>
                          current Balance:
                          <FaRupeeSign /> {Math.floor(balance)}
                        </h4>
                      </div>
                    </li>
                    {/* </ul> */}
                  </>
                )}

                <li style={{ padding: "25px", marginTop: "10px" }}>
                  <div className="sm">
                    <h4>{Data[0].name}</h4>
                  </div>
                </li>
                <UserMenu />
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
