import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./log.css";
import Mesk_logo2 from "../../components/landing_page/image/Mesk_logo2.png";
const LoginTabset = () => {
  const navigate = useNavigate();
  // const history = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const users = useSelector((state) => state.userData.user);
  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      username,

      password,
    };
    axios
      .post("https://mhebackend.payagain.in/api/signin", obj)
      .then((res) => {
        localStorage.setItem("userResponse", JSON.stringify(res.data));
        console.log(26, res.data.user.role);
        if (res.data.user.role == "retailer") {
          navigate("/RetailerDashboard");
        } else if (res.data.user.role == "admin") {
          // navigate('/RetailerDashboard')
          navigate("/dashboard");
        } else if (res.data.user.role == "agent") {
          // navigate('/RetailerDashboard')
          navigate("/AgentDashboard");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };
  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };
  function myFunction() {
    var x = document.getElementById("myinput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div>
      {/* <Fragment>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link" onClick={(e) => clickActive(e)}>
              <User />
              Login
            </Tab>
          </TabList>

          <TabPanel>
            <Form
              className="form-horizontal auth-form"
              onSubmit={(e) => submitHandler(e)}
            >
              <FormGroup>
                <Input
                  required=""
                  name="login[username]"
                  type="username"
                  className="form-control"
                  placeholder="username"
                  id="exampleInputusername1"
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  value={username}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="myinput"
                  required=""
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </FormGroup>
              <input type="checkbox" onClick={myFunction} />
              Show Password
              <div className="form-terms">
                <div className="custom-control custom-checkbox me-sm-2">

                </div>
              </div>
              <div className="form-button">
                <Button
                  color="primary"
                  type="submit"
                  // onClick={(e) => submitHandler(e)}
                >
                  Login
                </Button>
              </div>
            </Form>
          </TabPanel>
        </Tabs>
      </Fragment> */}

      {/* <div className=" backBody">
        <div className="middleCard">
          <div className="all-data row">
            <div className="left col-lg-4">
              <img className="login_logoo" src={Mesk_logo2} alt="" />
            </div>
            <div className="right col-lg-8">
              <h4 className="headingg mb-4">
                Login In to Maharashtra e-Seva Kentra
              </h4>
              <div class=" mb-3">
                <label for=" exampleFormControlInput1" class="text form-label">
                  Username
                </label>
                <input
                  type="email"
                  class="user border-bottom form-control"
                  id="exampleFormControlInput1"
                  placeholder="Username"
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  value={username}
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="text form-label">
                  Password
                </label>
                <input
                  type="email"
                  class="user form-control border-bottom"
                  id="exampleFormControlInput1"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  onClick={myFunction}
                />
                <label class="text form-check-label" for="flexCheckChecked">
                  Show Password
                </label>
              </div>
              <button
                type="button"
                class="login_btn btn btn-success btn-lg mt-3 mb-2 "
                onClick={(e) => submitHandler(e)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LoginTabset;
