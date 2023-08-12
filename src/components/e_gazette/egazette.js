import React from "react";
import axios from "axios";
import { MdUploadFile } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { Button, Form, Input, Radio, Select, DatePicker, Upload } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { toast } from "react-toastify";
import { incNumber } from "../../Redux/actions";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TextArea from "antd/es/input/TextArea";
import swal from "sweetalert";

const Egazette = () => {
  const [form] = Form.useForm();
  const { eid } = useParams();
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.changeNumber);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const pricess = useSelector((state) => state.price.formPrices);
  const [userFormDetails, setuserFormDetails] = useState([]);
  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/formPrice`)
      .then((res) => {
        const response = res.data;
        
        if (response.userID!==userData.user._id) {
          const userFormDetails = response.filter((item) => item.userID === "ALL");
          setuserFormDetails(userFormDetails);
        }else{
          const userFormDetails = response.filter(
           (item) => item.userID === userData.user._id
         );
         setuserFormDetails(userFormDetails);
        }
      })
      .catch((err) => console.log(40, err));
  }, []);

  const [balance, setBalance] = useState(0);
  const [isVisible, setisVisible] = useState(false);

  const [selectedRtoPricewe, setSelectedRtoPrice] = useState();
  const setFormPrice = (formType) => {
    console.log(48, formType);
    switch (formType) {
      case "Open/OBC":
        {
          setSelectedRtoPrice(userFormDetails[0].eGazette_OpenOBC);
          setisVisible(true);
        }
        break;
      case "SC":
        {
          setSelectedRtoPrice(userFormDetails[0].eGazette_SC);
          setisVisible(true);
        }
        break;
      case "SBC":
        {
          setSelectedRtoPrice(userFormDetails[0].eGazette_SBC);
          setisVisible(true);
        }
        break;

      case "ST":
        {
          setSelectedRtoPrice(userFormDetails[0].eGazette_ST);
          setisVisible(true);
        }
        break;
      case "VJ":
        {
          setSelectedRtoPrice(userFormDetails[0].eGazette_VJ);
          setisVisible(true);
        }
        break;
      case "NT":
        {
          setSelectedRtoPrice(userFormDetails[0].eGazette_NT);
          setisVisible(true);
        }

        break;
      default:
        break;
    }
  };
  console.log(92, selectedRtoPricewe);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));
    if (userData) {
      axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
        console.log(88, res.data);

        const allData = res.data.filter(
          (ele) => ele.user === userData.user._id
        );
        let amount = 0;
        let expence = 0;
        if (allData.length > 0) {
          allData.forEach((item) => {
            if (item.isExpence == "true") {
              expence += item.amount;
            } else {
              amount += item.amount;
            }
          });
        }
        console.log(53, amount, expence);
        setBalance(amount - expence);
      });
    }
  }, [reducer]);

  const [docs, setDocs] = useState({
    photoID: "",
    addressProof: "",
    applicationForm: "",
    identityProof: "",
    Passport_Size_Photo: "",
    OldName_Proof: "",
    PresentName_Proof: "",
    Cast_Certificate: "",
  });

  const [Data, setData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "e_gazzet",
    status: "IN-PROGRESS",
    service_type: "",
    type_cast: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    adharNumber: "",
    mobileNumber_registered_with_adharCard: "",
    gender: "",
    Dob: "",
    Old_Dob: "",
    New_Dob: "",
    OldName: "",
    NewName: "",
    reason: "",
    address: "",
  });
  const handleDateOfBirth = (date, dateString) => {
    setData({ ...Data, Dob: dateString });
  };
  const handleoldDateOfBirth = (date, dateString) => {
    setData({ ...Data, Old_Dob: dateString });
  };
  const handleNewDateOfBirth = (date, dateString) => {
    setData({ ...Data, New_Dob: dateString });
  };
  const [DOBChange, setDOBChange] = useState(false);
  const [NameChange, setNameChange] = useState(false);
  const EGazetteFormSubmit = (e) => {
    console.log(Data);
    e.preventDefault();
    const errors = validate(Data);
    console.log("formErrors:", errors);
    if (Object.keys(errors).length === 0) {
      SetIsSubmit(true);
      swal("Good job!", "form submitted successfully!", "success");

      const obj = {
        Data,
      };
      console.log(obj);
      if (balance > selectedRtoPricewe) {
        const mainDataPromise = new Promise((resolve, reject) => {
          // console.log(77, Data);
          axios
            .post(`https://mhebackend.payagain.in/api/e_gazzet/create`, Data)
            .then((res) => {
              const response = res;
              resolve({
                status: true,
                message: "data Posted Successfully",
                data: res.data,
              });
            })
            .catch((err) => {
              console.log(err);
              reject({
                status: false,
                message: "Data Not posted",
              });
            });
        });

        mainDataPromise
          .then((res) => {
            console.log(124, res.data);

            uploadphotoID(res.data.data._id);
            uploadaddressProof(res.data.data._id);
            uploadCast_Certificate(res.data.data._id);
            uploadapplicationForm(res.data.data._id);
            uploadidentityProof(res.data.data._id);
            uploadPassport_Size_Photo(res.data.data._id);
            uploadOldName_Proof(res.data.data._id);
            uploadPresentName_Proof(res.data.data._id);
            debitFormBalance();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast.error("Please Recharge");
      }
    } else {
      setFormerror(errors);
      swal("Filled the required form");
    }
  };

  const obj = {
    user: userData?.user._id,
    mode: "offline",
    amount: selectedRtoPricewe,
    isExpence: true,
    expenceFor: "eGazzet",
  };
  const debitFormBalance = () => {
    axios
      .post("https://mhebackend.payagain.in/api/recharge/create", obj)
      .then((res) => {
        const response = res.data;
        dispatch(incNumber());
        toast.success("form Submitted");

        swal("Good job!", "form submitted successfully!", "success");
      })
      .catch((err) => console.log(34, err));
  };
  const uploadphotoID = (id) => {
    const formData = new FormData();
    formData.append("photoID", docs.photoID);
    axios
      .put(`https://mhebackend.payagain.in/api/gazzet_photoID/${id}`, formData)
      .then((res) => console.log("gazzet_photoID", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadaddressProof = (id) => {
    const formData = new FormData();
    formData.append("addressProof", docs.addressProof);
    axios
      .put(`https://mhebackend.payagain.in/api/gazzet_addressProof/${id}`, formData)
      .then((res) => console.log("addressProof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadCast_Certificate = (id) => {
    const formData = new FormData();
    formData.append("Cast_Certificate", docs.Cast_Certificate);
    axios
      .put(
        `https://mhebackend.payagain.in/api/gazzet_CastCertificate/${id}`,
        formData
      )
      .then((res) => console.log("Cast_Certificate", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadapplicationForm = (id) => {
    const formData = new FormData();
    formData.append("applicationForm", docs.applicationForm);
    axios
      .put(
        `https://mhebackend.payagain.in/api/gazzet_applicationForm/${id}`,
        formData
      )
      .then((res) => console.log("applicationForm", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadidentityProof = (id) => {
    const formData = new FormData();
    formData.append("identityProof", docs.identityProof);
    axios
      .put(
        `https://mhebackend.payagain.in/api/gazzet_identityProof/${id}`,
        formData
      )
      .then((res) => console.log("identityProof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadPassport_Size_Photo = (id) => {
    const formData = new FormData();
    formData.append("Passport_Size_Photo", docs.Passport_Size_Photo);
    axios
      .put(
        `https://mhebackend.payagain.in/api/gazzet_PassportSizePhoto/${id}`,
        formData
      )
      .then((res) => console.log("Passport_Size_Photo", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadOldName_Proof = (id) => {
    const formData = new FormData();
    formData.append("OldName_Proof", docs.OldName_Proof);
    axios
      .put(`https://mhebackend.payagain.in/api/gazzet_OldNameProof/${id}`, formData)
      .then((res) => console.log("OldName_Proof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadPresentName_Proof = (id) => {
    const formData = new FormData();
    formData.append("PresentName_Proof", docs.PresentName_Proof);
    axios
      .put(
        `https://mhebackend.payagain.in/api/gazzet_PresentNameProof/${id}`,
        formData
      )
      .then((res) => console.log("PresentName_Proof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const [Formerror, setFormerror] = useState({});
  const [isSubmit, SetIsSubmit] = useState(false);
  useEffect(() => {
    console.log(Formerror);
    if (Object.keys(Formerror).length == 0 && isSubmit) {
      console.log(Data);
    }
  }, [Formerror]);
  const validate = (values) => {
    const error = {};
    if (!values.service_type) {
      error.service_type = " service type is required";
    }
    if (!values.type_cast) {
      error.type_cast = " Type Cast is required";
    }
    if (!values.title) {
      error.title = " Title Is required";
    }
    if (!values.firstName) {
      error.firstName = " First Name Is required";
    }
    if (!values.middleName) {
      error.middleName = " Middle  Name Is required";
    }
    if (!values.lastName) {
      error.lastName = " Last  Name Is required";
    }
    if (!values.mobileNumber) {
      error.mobileNumber = "Mobile Number Is required";
    }
    if (!values.email) {
      error.email = "Email Is required";
    }
    if (!values.adharNumber) {
      error.adharNumber = "Adhar Number Is required";
    }

    if (!values.gender) {
      error.gender = "Gender Is required";
    }
    if (!values.Dob) {
      error.Dob = "Dob Is required";
    }
    if (!values.address) {
      error.address = "Address Is required";
    }
    if (!values.reason) {
      error.reason = "Reason Is required";
    }

    console.log("error object", error);
    return error;
  };
  useEffect(() => {
    if (eid != undefined) {
      axios
        .get(`https://mhebackend.payagain.in/api/e_gazzet/${eid}`)
        .then((res) => {
          const data = res.data[0];

          console.log("data", data);
          setData(data);
        });
    }
  }, [eid]);

  const editHandler = (e) => {
    e.preventDefault();

    const obj = {
      ...Data,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "e_gazzet",
      status: "IN-PROGRESS",
    };

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/e_gazzet/${eid}`, obj)
        .then((res) => {
          const response = res;
          resolve({
            status: true,
            message: "data Updated Successfully",
            data: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          reject({
            status: false,
            message: "Data Not posted",
          });
        });
    });

    mainDataPromise
      .then((res) => {
        // console.log(124,res.data)

        uploadphotoID(res.data.data._id);
        uploadaddressProof(res.data.data._id);
        uploadCast_Certificate(res.data.data._id);
        uploadapplicationForm(res.data.data._id);
        uploadidentityProof(res.data.data._id);
        uploadPassport_Size_Photo(res.data.data._id);
        uploadOldName_Proof(res.data.data._id);
        uploadPresentName_Proof(res.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Breadcrumb title={"E-Gazette"} />
      <Container fluid={true}>
        {isVisible && (
          <h3 className="mx-5">{` Form Price :${selectedRtoPricewe}`}</h3>
        )}

        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Service Type</b>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="Please input your Service Type"
                          value={Data.service_type}
                          onChange={(e) => {
                            setData({ ...Data, service_type: e });
                            if (e === "Name Change") {
                              setNameChange(true);
                            } else if (e === "DOB Change") {
                              setDOBChange(true);
                            }
                          }}
                        >
                          <Select.Option value="Name Change">
                            Name Change
                          </Select.Option>
                          <Select.Option value="DOB Change">
                            DOB Change
                          </Select.Option>
                        </Select>
                        <p className="red">{Formerror.service_type}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>{" "}
                        <b>Select Type Of Caste</b>
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Please input your Caste "
                          value={Data.type_cast}
                          onChange={(e) => {
                            setData({ ...Data, type_cast: e });
                            setFormPrice(e);
                            console.log(511, e);
                          }}
                        >
                          <Select.Option value="Open/OBC">
                            Open/OBC
                          </Select.Option>
                          <Select.Option value="SC">SC</Select.Option>
                          <Select.Option value="SBC">SBC</Select.Option>
                          <Select.Option value="ST">ST</Select.Option>
                          <Select.Option value="VJ">VJ</Select.Option>
                          <Select.Option value="NT">NT</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Title</b>
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Select Title"
                          value={Data.title}
                          onChange={(e) => {
                            setData({ ...Data, title: e });
                          }}
                        >
                          <Select.Option value="Mr">Mr</Select.Option>
                          <Select.Option value="Mrs">Mrs</Select.Option>
                          <Select.Option value="Ms">Ms</Select.Option>
                        </Select>
                        <p className="red">{Formerror.title}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>First Name</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Please input your First Name!"
                          value={Data.firstName}
                          onChange={(e) => {
                            setData({ ...Data, firstName: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.firstName}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Middle Name</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your middle Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Please input your middle Name"
                          value={Data.middleName}
                          onChange={(e) => {
                            setData({ ...Data, middleName: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.middleName}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b> Last Name</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Last Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Please input your Last Name!"
                          value={Data.lastName}
                          onChange={(e) => {
                            setData({ ...Data, lastName: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.lastName}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Mobile Number</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Mobile Number!",
                          },
                        ]}
                      >
                        <Input
                          type="Number"
                          placeholder="Please input your Mobile Number!"
                          value={Data.mobileNumber}
                          onChange={(e) => {
                            setData({ ...Data, mobileNumber: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.mobileNumber}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Email</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            // message: "Please input your Email!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Please input your Email!"
                          value={Data.email}
                          onChange={(e) => {
                            setData({ ...Data, email: e.target.value });
                          }}
                        />{" "}
                        <p className="red">{Formerror.email}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>ADHAAR Number</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            // message:"Please input your Adhar Number!"
                          },
                        ]}
                      >
                        <Input
                          type="Number"
                          placeholder="Please input your Adhar Number!"
                          value={Data.adharNumber}
                          onChange={(e) => {
                            setData({ ...Data, adharNumber: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.adharNumber}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Mobile number registered with Aadhar card?</b>
                      </label>

                      <Form.Item>
                        <Radio.Group
                          value={Data.mobileNumber_registered_with_adharCard}
                          onChange={(e) => {
                            setData({
                              ...Data,
                              mobileNumber_registered_with_adharCard:
                                e.target.value,
                            });
                          }}
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="No">NO</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Gender</b>
                      </label>

                      <Form.Item>
                        <Radio.Group
                          onChange={(e) => {
                            setData({ ...Data, gender: e.target.value });
                          }}
                        >
                          <Radio value="male">Male</Radio>
                          <Radio value="female">Female</Radio>
                          <Radio value="others">Others</Radio>
                        </Radio.Group>
                        <p className="red">{Formerror.gender}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Date Of Birth</b>
                      </label>

                      <Form.Item>
                        <DatePicker
                          placeholder="Date Of Birth"
                          onChange={handleDateOfBirth}
                        />
                        <p className="red">{Formerror.Dob}</p>
                      </Form.Item>
                    </div>

                    {DOBChange && (
                      <>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            <b>Old Date of Brith</b>
                          </label>

                          <Form.Item>
                            <DatePicker
                              placeholder=" Old Date Of Birth"
                              onChange={handleoldDateOfBirth}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>New Date Of Birth</b>
                          </label>

                          <Form.Item>
                            <DatePicker
                              placeholder="  New Date Of Birth"
                              onChange={handleNewDateOfBirth}
                            />
                          </Form.Item>
                        </div>
                      </>
                    )}
                    {NameChange && (
                      <>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>Old Name</b>
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              placeholder="Please input your Adhar Number!"
                              value={Data.OldName}
                              onClick={(e) => {
                                setData({ ...Data, OldName: e.target.value });
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>New Name</b>
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              placeholder="Please input your Adhar Number!"
                              value={Data.NewName}
                              onClick={(e) => {
                                setData({ ...Data, NewName: e.target.value });
                              }}
                            />
                          </Form.Item>
                        </div>
                      </>
                    )}

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Reason</b>
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={4}
                          placeholder="Please input your Reason!"
                          onChange={(e) => {
                            setData({ ...Data, reason: e.target.value });
                          }}
                        />{" "}
                        <p className="red">{Formerror.reason}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Address</b>
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={4}
                          placeholder="Please input your Address!"
                          value={Data.address}
                          onChange={(e) => {
                            setData({ ...Data, address: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.address}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6" style={{ marginLeft: "793px" }}>
                      <h5>Forms: </h5>
                      <u>
                        <b>
                          <a href="upload_frms.php?file=Gazette_DOB_Change_Form_English.pdf">
                            {" "}
                            Gazette DOB Change Form - English
                          </a>
                        </b>
                      </u>
                      <br />
                      <u>
                        <b>
                          <a href="upload_frms.php?file=Gazette_DOB_Change_Form_Marathi.pdf">
                            {" "}
                            Gazette DOB Change Form - Marathi
                          </a>
                        </b>
                      </u>
                      <br />
                      <u>
                        <b>
                          <a href="upload_frms.php?file=Gazette_Name_Change_Form_English_.pdf">
                            {" "}
                            Gazette Name Change Form - English
                          </a>
                        </b>
                      </u>
                      <br />
                      <u>
                        <b>
                          <a href="upload_frms.php?file=Gazette_Name_Change_Form_Marathi.pdf">
                            {" "}
                            Gazette Name Change Form - Marathi
                          </a>
                        </b>
                      </u>
                    </div>
                    <div className="col-md-12">
                      <h5>Upload required documents: </h5>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Photo ID (Pan card or
                        Passport or Driving Licence or Aadhar Card or Voters Id)
                        (Size - Maximum 75 Kb to 100 Kb (200 DPI)) [Only
                        (jpg,jpeg,pdf)]*
                      </label>
                      {/* const [docs, setDocs] = useState({
    photoID: "",
    addressProof: "",
    applicationForm: "",
    identityProof: "",
    Passport_Size_Photo: "",
    OldName_Proof: "",
    PresentName_Proof: "",
    Cast_Certificate: "",
  }); */}

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            photoID: e.target.files,
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Address Proof (Ration Card
                        or Aadhar Card or Electricity Bill or Passport) (Size -
                        Maximum 75 Kb to 100 Kb (200 DPI)) [Only
                        (jpg,jpeg,pdf)]*
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            addressProof: e.target.files,
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Application Form : Duly Signed Application Form with all
                        details (Size - Maximum 75 Kb to 100 Kb (200 DPI)) [Only
                        (jpg,jpeg,pdf)] *
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            applicationForm: e.target.files,
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Identity Proof (Size - Maximum 75 Kb to 100 Kb (200
                        DPI)) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            identityProof: e.target.files,
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Passport Size Photo (Size - Maximum 5 Kb to 20 Kb (
                        resize Width 160 × Height 212) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            Passport_Size_Photo: e.target.files,
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Old Name Proof (Size - Maximum 75 Kb to 100 Kb (200
                        DPI)) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            PresentName_Proof: e.target.files,
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Present Name Proof (Size - Maximum 75 Kb to 100 Kb (200
                        DPI)) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            Cast_Certificate: e.target.files,
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Cast Certificate (Size - Maximum 75 Kb to 100 Kb (200
                        DPI)) [Only (jpg,jpeg,pdf)]
                      </label>

                      <Form.Item name="upload" valuePropName="fileList">
                        <Upload
                          name="logo"
                          action="/upload.do"
                          listType="picture"
                        >
                          <Button icon={<MdUploadFile />}>
                            Click to upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  </div>
                  <h5 className="red">
                    अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक कागदपत्रे
                    तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक कागदपत्रे चुकीची
                    किंवा अस्पष्ट आढळल्यास सदर चा अर्ज फेटाळला जाऊ शकतो.{" "}
                  </h5>
                  <div className="row">
                    {eid == undefined ? (
                      <div className="col-md-1">
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={(e) => {
                              EGazetteFormSubmit(e);
                            }}
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </div>
                    ) : (
                      <div className="col-md-1">
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={(e) => {
                              editHandler(e);
                            }}
                          >
                            Update
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Egazette;
