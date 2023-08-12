import React, { Fragment, useReducer, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Tabsetuser = () => {
  const [name, setName] = useState("");
  // const [role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [role, setRole] = useState("");

  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log("=> ", name, Email, profilePicture, password, mobileNo);
    formData.append("name", name);
    formData.append("email", Email);
    formData.append("password", password);
    formData.append("mobileNo", mobileNo);
    formData.append("profilePicture", profilePicture);
    formData.append("role", role);

    for (var pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    axios
      .post("https://api.goanny.link/api/signup", formData)
      .then((res) => {
        console.log(res);
        //   e.target.reset();
        setEmail("");
        setPassword("");
        setName("");
        setProfilePicture("");
        setMobileNo("");
        setRole("");
        toast.success("User Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
        setEmail("");
        setPassword("");
        setName("");
        setProfilePicture("");
        setMobileNo("");
        toast.error("User Already Exists", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Account</Tab>
          <Tab className="nav-link">Permission</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <h4>Account Details</h4>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Name
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom0"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Email
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom2"
                  type="text"
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Password
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Mobile No
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="numbers"
                  value={mobileNo}
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Profile Picture
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom1"
                  type="file"
                  // value={profilePicture}
                  onChange={(e) => {
                    setProfilePicture(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Categories
              </Label>
              <div className="col-xl-8 col-md-7">
                <select
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="select"
                  style={{ padding: "5px" }}
                >
                  <option selected> Select</option>
                  <option selected> admin</option>
                  <option selected> vendor</option>
                  <option selected> user</option>
                </select>
              </div>
            </FormGroup>
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button type="button" color="primary" onClick={(e) => submit(e)}>
          Save
        </Button>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Tabsetuser;
