import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incNumber } from "../../Redux/actions";

const Tabset = () => {
  const { id } = useParams();
  const [startDate, setstartDate] = useState(new Date());
  const navigate = useNavigate();
  const [endDate, setendDate] = useState(new Date());
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discount: "",
    discountType: null,
    createdBy: userData.user._id,
    scope: userData.user.role === "admin" ? "global" : "local",
    tnc: "",
    minOrderValue: 0,
    minOrderItems: 0,
  });
  const [checkVisible, setCheckVisible] = useState({
    check1: false,
    check2: false,
  });
  console.log(formData, "formData");
  const handleEndDate = (date) => {
    setendDate(date);
  };
  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };
  const save = (e) => {
    e.preventDefault();
    if (formData.discountType === null) {
      toast.error("Please Select Discount Type");
    } else {
      console.log({ ...formData, expiresAt: new Date(endDate) });
      axios
        .post("https://api.goanny.link/api/coupon/create", {
          ...formData,
          expiresAt: endDate,
        })
        .then((res) => {
          toast.success("Coupon Created Successfully");
          navigate("/coupons/list-coupons");
        })
        .catch((err) => console.log(err));
    }
  };
  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`https://api.goanny.link/api/coupon/update/${id}`, {
        ...formData,
      })
      .then((res) => {
        // setShopId(res.data.data._id);
        // console.log(res);
        // useDispatch(incNumber());
        navigate(`/coupons/list-coupons`);
        toast.success("coupon update Successfully");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // axios
    //   .get("https://api.goanny.link/api/coupon/getAll")
    //   .then((res) => {
    //     console.log(63, res.data.coupon);
    //     const filter = res.data.coupon.find((item) => item._id === param.id);
    //     setSingleCoupon(filter);
    //   })
    //   .catch((err) => console.log(err));
    if (id) {
      axios
        .get("https://api.goanny.link/api/coupon/get")
        .then((res) => {
          const response = res.data.coupon.reverse();
          const filter = response.find((item) => item._id === id);
          setFormData({
            ...formData,
            name: filter.name,
            code: filter.code,
            discount: filter.discount,
            discountType: null,
            createdBy: userData.user._id,
            scope: userData.user.role === "admin" ? "global" : "local",
            tnc: filter.tnc,
            minOrderValue: filter.minOrderValue,
            minOrderItems: filter.minOrderItems,
            status: filter.status,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link" onClick={(e) => clickActive(e)}>
            General
          </Tab>
        </TabList>

        <TabPanel>
          <div className="tab-pane fade active show">
            <Form
              className="needs-validation"
              noValidate=""
              // onSubmit={submitHandler}
            >
              <h4>General</h4>
              <Row>
                <Col sm="12">
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Name
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        placeholder="Enter Coupon Name"
                        required={true}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Code
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="text"
                        placeholder="Enter Coupon Code"
                        required={true}
                        value={formData.code}
                        onChange={(e) =>
                          setFormData({ ...formData, code: e.target.value })
                        }
                      />
                    </div>
                    <div className="valid-feedback">
                      Please Provide a Valid Coupon Code.
                    </div>
                  </div>
                  {id && (
                    <>
                      <div className="form-group row">
                        <Label className="col-xl-3 col-md-4">Status</Label>
                        <div className="col-md-7">
                          <select
                            className="form-select"
                            required=""
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value={formData.status}>
                              curret status :- {formData.status}
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Expire Date</Label>
                    <div className="col-md-7">
                      <DatePicker
                        selected={endDate}
                        endDate={endDate}
                        onChange={handleEndDate}
                        required={true}
                      />
                    </div>
                  </div>
                  {/* <div className="form-group row">
										<Label className="col-xl-3 col-md-4">Free Shipping</Label>
										<div className="col-md-7">
											<Label className="d-block">
												<Input
													className="checkbox_animated"
													id="chk-ani2"
													type="checkbox"
												/>
												Allow Free Shipping
											</Label>
										</div>
									</div>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">Quantity</Label>
										<div className="col-md-7">
											<Input
												className="form-control"
												type="number"
												placeholder="Enter Quantity"
												required=""
											/>
										</div>
									</div> */}
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Discount Type</Label>
                    <div className="col-md-7">
                      <select
                        className="form-select"
                        required=""
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            discountType: e.target.value,
                          })
                        }
                      >
                        <option value={null}>--Select--</option>
                        <option value="percent">Percent</option>
                        <option value="flat">Flat</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Discount
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="number"
                        placeholder="Discount Amount"
                        required={true}
                        value={formData.discount}
                        onChange={(e) =>
                          setFormData({ ...formData, discount: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Set Conditions
                    </Label>
                    <div className="col-md-7">
                      <div className="form-group row">
                        <div className="col-md-6">
                          <FormGroup>
                            <Input
                              type="checkbox"
                              onChange={() => {
                                setCheckVisible({
                                  ...checkVisible,
                                  check1: !checkVisible.check1,
                                });
                              }}
                            />{" "}
                            <Label>Set Minimum Order Value</Label>
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                  {checkVisible.check1 && (
                    <div className="form-group row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Minimum Order Value
                      </Label>
                      <div className="col-md-7">
                        <Input
                          className="form-control"
                          id="validationCustom0"
                          type="number"
                          placeholder="Minimum Order Value Amount"
                          required={true}
                          value={formData.minOrderValue}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              minOrderValue: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> T&C
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="textarea"
                        placeholder="Terms and Conditions"
                        required={true}
                        value={formData.tnc}
                        onChange={(e) =>
                          setFormData({ ...formData, tnc: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              {id ? (
                <>
                  <div className="pull-right">
                    <Button
                      type="submit"
                      color="primary"
                      onClick={(e) => Update(e)}
                    >
                      Update
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pull-right">
                  <Button
                    type="submit"
                    color="primary"
                    onClick={(e) => save(e)}
                  >
                    Save
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </TabPanel>
      </Tabs>
    </Fragment>
  );
};

export default Tabset;