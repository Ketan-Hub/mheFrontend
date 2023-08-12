import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { incNumber } from "../../Redux/actions";

const Tabsetvendor = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [pincode, setPincode] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [serviceablePincode, setserviceablePincode] = useState([]);
  const [view, setView] = useState(true);
  const [shopId, setShopId] = useState("");

  const save = (e) => {
    e.preventDefault();
    axios
      .post(`https://api.goanny.link/api/procurement/signup`, {
        ...formData,
        serviceablePincode: serviceablePincode,
      })
      .then((res) => {
        setShopId(res.data.data._id);
        setView(false);
        toast.success("Vendor Added Successfully");
      })
      .catch((err) => console.log(err));
  };
  const update = (e) => {
    e.preventDefault();
    axios
      .put(`https://api.goanny.link/api/user/updateById/${id}`, {
        ...formData,
        serviceablePincode: serviceablePincode,
      })
      .then((res) => {
        // setShopId(res.data.data._id);
        dispatch(incNumber());
        navigate(`/vendors/vendors-details/${id}`);
        toast.success("Vendor update Successfully");
      })
      .catch((err) => console.log(err));
  };

  //get category on page load
  const [updata, setUpData] = useState();
  useEffect(() => {
    axios
      .get(`https://api.goanny.link/api/pincode`)
      .then((res) => {
        setPincode(res.data.pincode);
        // console.log(45,res.data.pincode);
      })
      .catch((err) => console.log(err));
    if (id) {
      axios
        .get(`https://api.goanny.link/api/procurement/getAll`)
        .then((res) => {
          const response = res.data.data.reverse();
          const filter = response.find((item) => item._id === id);
          setFormData({
            ...formData,
            name: filter.name,
            email: filter.email,
            mobileNo: filter.mobileNo,
          });
          setserviceablePincode(filter.serviceablePincode);
          setUpData(filter);
          // dispatch(setVendors(response));
        })
        .catch((err) => console.log(err));
    }
  }, []);
  // console.log(65, updata);

  // const changeHandler = (e,i)=>{
  //   e.preventDefault();
  //   if(serviceablePincode.includes(e.target.value)){
  //     serviceablePincode.splice(i,1)
  //     setserviceablePincode(serviceablePincode);
  //   }else{
  //     setserviceablePincode([...serviceablePincode,e.target.value])
  //   }
  // }
  // console.log("serviceablePincode",serviceablePincode)

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Account</Tab>
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
                  required=""
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
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
                  id="validationCustom1"
                  type="text"
                  required=""
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Mobile Number
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom2"
                  type="text"
                  required=""
                  // value={formData.mobile_no}
                  value={formData.mobileNo}
                  onChange={(e) => {
                    setFormData({ ...formData, mobileNo: e.target.value });
                  }}
                />
              </div>
            </FormGroup>
            {updata ? (
              ""
            ) : (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Password
                </Label>
                <div className="col-xl-8 col-md-7">
                  <Input
                    className="form-control"
                    id="validationCustom2"
                    type="text"
                    required=""
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                  />
                </div>
              </FormGroup>
            )}

            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Servisable Pincode
              </Label>
              <div className="col-md-7">
                <select
                  onChange={(e) => {
                    {
                      const val = e.target.value;
                      const comp = serviceablePincode.includes(val);
                      if (!comp) {
                        setserviceablePincode([
                          ...serviceablePincode,
                          e.target.value,
                        ]);
                      }
                    }
                  }}
                  className="form-select"
                  required=""
                >
                  <option>--Select Pincode--</option>
                  {pincode.map((item) => {
                    return (
                      <>
                        <option value={formData.serviceablePincode}>
                          {item.pincode}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Selected Pincode
              </Label>

              <div className="col-md-7">
                {serviceablePincode.map((item,i) => {
                  return (
                    <div>
                      <span style={{marginLeft:"5px"}}>{item}</span>
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pull-right">
              {id ? (
                <Button
                  type="button"
                  color="primary"
                  onClick={(e) => {
                    update(e);
                    dispatch(incNumber());
                    navigate("/vendors/list-vendors");
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="button"
                  color="primary"
                  onClick={(e) => {
                    save(e);
                    dispatch(incNumber());
                    navigate("/vendors/list-vendors");
                  }}
                >
                  Add
                </Button>
              )}
            </div>
          </Form>
        </TabPanel>
      </Tabs>
    </Fragment>
  );
};

export default Tabsetvendor;
