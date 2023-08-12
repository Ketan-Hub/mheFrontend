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
import {
  ApllicantBenificiaryOtherState,
  rto,
  vehical_type,
  cob,
  districtData,
  qualification,
} from "../../constants/data";
import swal from "sweetalert";

const ParmanantDl = () => {
  const [form] = Form.useForm();
  const { pid } = useParams();
  const [balance, setBalance] = useState(0);
  const [pricess, setPricess] = useState();
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const reducer = useSelector((state) => state.changeNumber);
  const [isVisible, setisVisible] = useState(false);
  
  const [docs, setDocs] = useState({
    addressProof: "",
    ageProof: "",
  })
  const [selectedRtoPricewe, setSelectedRtoPrice] = useState();
  const[ userFormDetails,setuserFormDetails]=useState([]) ;
  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/formPrice`)
      .then((res) => {
        const response = res.data;
        if (userFormDetails.length < 1) {
         const userFormDetails = response.filter((item) => item.userID === "ALL");
          setuserFormDetails(userFormDetails);
          console.log(49,userFormDetails)
        }else{
          const userFormDetails = response.filter((item) => item.userID === userData.user._id);
          setuserFormDetails(userFormDetails);
          console.log(53,userFormDetails)

        }
      })
      .catch((err) => console.log(40, err));
  }, []);



 


  const setFormPrice = (formType) => {
    switch (formType) {
      case "Permanent DL -  Motor cycle without Gear (Non Transport) (MCWOG)":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWOG);
          setisVisible(true);
          console.log(70,userFormDetails[0].permanent_MCWOG)
        }
        break;
      case "Permanent DL -  Motor Cycle with Gear(Non Transport) (MCWG)":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWG);
          setisVisible(true);
        }
        break;

      case "Permanent DL -  Light Motor Vehicle (LMV)":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_LMV);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  Light Motor Vehicle Transport (LMV-TR)":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_LMV_TR);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  MCWOG + MCWG":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWOG_MCWG);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  MCWOG + LMV":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWOG_LMV);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  MCWG + LMV":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWG_LMV);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  MCWOG + MCWG + LMV":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWOG_MCWG_LMV);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  MCWG + LMV-TR":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWG_LMVTR);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  MCWOG + LMV-TR":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWOG_LMVTR);
          setisVisible(true);
        }
        break;
      case "Permanent DL -  MCWOG + MCWG + LMV-TR":
        {
          setSelectedRtoPrice(userFormDetails[0].permanent_MCWOG_MCWG_LMV_TR);
          setisVisible(true);
        }
        break;

      default:
        break;
    }
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
    if (!values.state) {
      error.state = " State is required";
    }
    if (!values.application_first_name) {
      error.application_first_name = " FullName English is required";
    }
    if (!values.rto) {
      error.rto = " rto Is required";
    }
    // if (!values.learningLicenceNo) {
    //   error.learningLicenceNo = " Please input your Loicence Number is required";
    // }
    if (!values.vehical_type) {
      error.vehical_type = " FullName English is required";
    }
    if (!values.application_middle_name) {
      error.application_middle_name = " Application middle name is required";
    }
    if (!values.application_last_name) {
      error.application_last_name = " Application last name is required";
    }
    if (!values.relation) {
      error.relation = " Application relation is required";
    }
    if (!values.fullname_asper_record) {
      error.fullname_asper_record =
        " Application fullname as perrecord is required";
    }
    if (!values.gender) {
      error.gender = " gender is required";
    }
    if (!values.Dob) {
      error.Dob = " Brithdate is required";
    }
    if (!values.pob) {
      error.pob = " Place of Brith is required";
    }
    if (!values.cob) {
      error.cob = " Country of Brith is required";
    }
    if (!values.blood_group) {
      error.blood_group = " Blood group is required";
    }
    if (!values.mobile_No) {
      error.mobile_No = " Blood group is required";
    }
    if (!values.email) {
      error.email = " Email is required";
    }
    if (!values.present_Address_State) {
      error.present_Address_State = "Present Add State is required";
    }
    // if (!values.present_Address_Distict) {
    //   error.present_Address_Distict = "Present Add District is required";
    // }
    if (!values.present_Address_tehsil) {
      error.present_Address_tehsil = "Present Add Taluka is required";
    }
    if (!values.Present_Address_Village) {
      error.Present_Address_Village = "Present Add Taluka is required";
    }
    if (!values.Present_Address_Line_1) {
      error.Present_Address_Line_1 = "Present Add  is required";
    }
    if (!values.present_Adderess_PinCode) {
      error.present_Adderess_PinCode = "Present Add Pincode is required";
    }
   toast.error("error object", error);
    return error;
  };

  const [Data, SetData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "permanant",
    status: "IN-PROGRESS",
    state: "",
    rto: "",
    vehical_type: "",
    learningLicenceNo: "",
    application_first_name: "",
    application_middle_name: "",
    application_last_name: "",
    relation: "",
    fullname_asper_record: "",
    gender: "",
    Dob: "",
    pob: "",
    cob: "",
    qualification: "",
    blood_group: "",
    mobile_No: "",
    email: "",
    identification_mark1: "",
    identification_mark2: "",
    emergency_mobNo: "",
    present_Address_State: "",
    present_Address_Distict: "",
    present_Address_tehsil: "",
    Present_Address_Village: "",
    Present_Address_Line_1: "",
    Present_Address_Line_2: "",
    present_Adderess_PinCode: "",
    present_Address_Same_AS_Premant_Address: "",
    permanent_Address_State: "",
    permanent_Address_Distict: "",
    permanent_Address_tehsil: "",
    permanent_Address_Village: "",
    permanent_Address_Line_1: "",
    permanent_Address_Line_2: "",
    permanent_Adderess_PinCode: "",
  });

  const [parmanatDetails, SetPermanatDetails] = useState(false);

  const handleDateChange = (date, dateString) => {
    SetData({ ...Data, Dob: dateString });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
            if (item.isExpence === "true") {
              expence += item.amount;
            } else {
              amount += item.amount;
            }
          });
        }
        setBalance(amount - expence);
      });
    }
  }, [reducer]);
  console.log(104, balance);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(Data);
    console.log("formErrors:", errors);
    if (Object.keys(errors).length === 0) {
      SetIsSubmit(true);
      swal("Good job!", "form submitted successfully!", "success");
      const obj = {
        Data,
      };

      if (balance > selectedRtoPricewe) {
        const mainDataPromise = new Promise((resolve, reject) => {
          axios
            .post(`https://mhebackend.payagain.in/api/permanant/create`, Data)
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
            uploadAddress(res.data.data._id);
            Ageproof(res.data.data._id);
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

  const debitFormBalance = () => {
    const obj = {
      user: userData?.user._id,
      mode: "offline",
      amount: selectedRtoPricewe,
      isExpence: true,
      expenceFor: "PermanatDl",
    };
    axios
      .post("https://mhebackend.payagain.in/api/recharge/create", obj)
      .then((res) => {
        const response = res.data;
        toast.success("form Submitted");

        swal("Good job!", "form submitted successfully!", "success");
      })
      .catch((err) => console.log(34, err));
  };
  const uploadAddress = (id) => {
    const formData = new FormData();
    formData.append("addressProof", docs.addressProof);
    axios
      .put(`https://mhebackend.payagain.in/api/perAddressProof/${id}`, formData)
      .then((res) => console.log("addressUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const Ageproof = (id) => {
    console.log(143, id);
    const formData = new FormData();
    formData.append("ageproof", docs.ageProof);
    axios
      .put(`https://mhebackend.payagain.in/api/perAgeproof/${id}`, formData)
      .then((res) => console.log("ageProofUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (pid != undefined) {
      axios
        .get(`https://mhebackend.payagain.in/api/permanant/${pid}`)
        .then((res) => {
          const data = res.data[0];

          console.log("data", data);
          SetData(data);
        });
    }
  }, [pid]);

  const editHandler = (e) => {
    e.preventDefault();

    const obj = {
      ...Data,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "permanant",
      status: "IN-PROGRESS",
    };

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/permanant/${pid}`, obj)
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
        console.log(124, res.data);

        uploadAddress(res.data._id);
        Ageproof(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("item", districtData);
  const [districtName, setDistrictName] = useState("");
  const [talukas, setTalukas] = useState([]);
  const setDestrictName = (e) => {
    console.log("districtData:", districtData);

    districtData.filter((dist) => {
      if (dist.name.toLowerCase() == e.toString().toLowerCase()) {
        console.log(dist.tahasil);
        setTalukas(dist.tahasil);
      }
    });

    // console.log("talukaArray:", talukaArray);
  };
  const [parmanentDetails, SetparmanentDetails] = useState(false);

  const addPreviousAddress = () => {
    SetparmanentDetails(false);
    SetData((prevState) => {
      return {
        ...prevState,

        permanent_Address_State: prevState.present_Address_State,
        permanent_Address_Distict: prevState.present_Address_Distict,
        permanent_Address_tehsil: prevState.present_Address_tehsil,
        permanent_Address_Village: prevState.Present_Address_Village,
        permanent_Address_Line_1: prevState.Present_Address_Line_1,
        permanent_Address_Line_2: prevState.Present_Address_Line_2,
        permanent_Adderess_PinCode: prevState.present_Adderess_PinCode,
      };
    });
  };
  return (
   
    <Fragment>
      <Breadcrumb title={"Permanent Driving License  "} parent={"license"} />
      <Container fluid={true}>
        {isVisible && <h3>{` Form Price :${selectedRtoPricewe}`}</h3>}

        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        <span className="red">*</span> <b>State</b>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="Select State"
                          value={Data.state}
                          onChange={(e) => {
                            SetData({ ...Data, state: e });
                          }}
                        >
                          <Select.Option value="Maharashtra">
                            Maharashtra
                          </Select.Option>
                        </Select>
                        <h5 >{Formerror.state}</h5>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>RTO</b>
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="RTO"
                          value={Data.rto}
                          onChange={(e) => {
                            SetData({ ...Data, rto: e });
                          }}
                        >
                          {rto.map((row, index) => (
                            <option value={row} key={index}>
                              {row}
                            </option>
                          ))}
                        </Select>
                        <p className="red">{Formerror.rto}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Vehicle Type</b>
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Vehicle Type"
                          onChange={(e) => {
                            SetData({ ...Data, vehical_type: e });
                            setFormPrice(e);
                          }}
                        >
                          <Select.Option value="Permanent DL -  Motor cycle without Gear (Non Transport) (MCWOG)">
                            Permanent DL - Motor cycle without Gear (Non
                            Transport) (MCWOG)
                          </Select.Option>
                          <Select.Option value="Permanent DL -  Motor Cycle with Gear(Non Transport) (MCWG)">
                            Permanent DL - Motor Cycle with Gear(Non Transport)
                            (MCWG)
                          </Select.Option>
                          <Select.Option value="Permanent DL -  Light Motor Vehicle (LMV)">
                            Permanent DL - Light Motor Vehicle (LMV)
                          </Select.Option>
                          <Select.Option value="Permanent DL -  Light Motor Vehicle Transport (LMV-TR)">
                            Permanent DL - Light Motor Vehicle Transport
                            (LMV-TR)
                          </Select.Option>
                          <Select.Option value="Permanent DL -  MCWOG + MCWG">
                            Permanent DL - MCWOG + MCWG
                          </Select.Option>
                          <Select.Option value="Permanent DL -  MCWOG + LMV">
                            Permanent DL - MCWOG + LMV
                          </Select.Option>
                          <Select.Option value="Permanent DL -  MCWG + LMV">
                            Permanent DL - MCWG + LMV
                          </Select.Option>
                          <Select.Option value="Permanent DL -  MCWOG + MCWG + LMV">
                            Permanent DL - MCWOG + MCWG + LMV
                          </Select.Option>
                          <Select.Option value="Permanent DL -  MCWG + LMV-TR">
                            Permanent DL - MCWG + LMV-TR
                          </Select.Option>
                          <Select.Option value="Permanent DL -  MCWOG + LMV-TR">
                            Permanent DL - MCWOG + LMV-TR
                          </Select.Option>
                          <Select.Option value="Permanent DL -  MCWOG + MCWG + LMV-TR">
                            Permanent DL - MCWOG + MCWG + LMV-TR
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>{" "}
                        <b>Learning License Number</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Loicence Number!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter Learning License Number"
                          value={Data.learningLicenceNo}
                          type="Number"
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              learningLicenceNo: e.target.value,
                            });
                          }}
                        />
                        {/* <p className="red">{Formerror.learningLicenceNo}</p> */}
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>{" "}
                        <b>Application First Name</b>
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
                          value={Data.application_first_name}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              application_first_name: e.target.value,
                            });
                          }}
                        />
                        <p className="red">
                          {Formerror.application_first_name}
                        </p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>{" "}
                        <b>Application Middle Name</b>
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
                          value={Data.application_middle_name}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              application_middle_name: e.target.value,
                            });
                          }}
                        />
                        <p className="red">
                          {Formerror.application_middle_name}
                        </p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>{" "}
                        <b>Application Last Name</b>
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
                          value={Data.application_last_name}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              application_last_name: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.application_last_name}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Relation</b>
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="relation Type"
                          value={Data.relation}
                          onChange={(e) => {
                            SetData({ ...Data, relation: e });
                          }}

                          //   value={Relation}
                        >
                          <Select.Option value="Father"></Select.Option>
                          <Select.Option value="Mother"></Select.Option>
                          <Select.Option value="Husband"></Select.Option>
                          <Select.Option value="Gaurdian"></Select.Option>
                        </Select>
                        <p className="red">{Formerror.relation}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Full Name as per Records</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Full Name as per Records!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.fullname_asper_record}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              fullname_asper_record: e.target.value,
                            });
                          }}
                        />
                        <p className="red" style={{color:"red"}}>{Formerror.fullname_asper_record}</p>
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
                          value={Data.gender}
                          onChange={(e) => {
                            SetData({ ...Data, gender: e.target.value });
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
                        <span className="red">*</span>Date Of Birth
                      </label>

                      <Form.Item>
                        <DatePicker
                          onChange={handleDateChange}
                          format="YYYY-MM-DD"
                        />
                        <p className="red">{Formerror.Dob}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>Place Of Brith </b>
                        <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Place of brith!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.pob}
                          onChange={(e) => {
                            SetData({ ...Data, pob: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.pob}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        <b>Country of Birth</b> <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Place of brith!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="--Select Contry--"
                          value={Data.cob}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              cob: e,
                            });
                          }}
                        >
                          <Select.Option
                            value=" Indian"
                          >
                            Indian
                          </Select.Option>
                        </Select>
                        <p className="red">{Formerror.cob}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Qualification</b>
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="--Select State--"
                          value={Data.qualification}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              qualification: e,
                            });
                          }}
                        >
                          {qualification.map((row, index) => (
                            <option value={row} key={index}>
                              {row}
                            </option>
                          ))}
                        </Select>
                        <p className="red">{Formerror.qualification}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Blood Group</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          value={Data.blood_group}
                          onChange={(e) => {
                            SetData({ ...Data, blood_group: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.blood_group}</p>
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
                          },
                        ]}
                      >
                        <Input
                          value={Data.mobile_No}
                          type="Number"
                          onChange={(e) => {
                            SetData({ ...Data, mobile_No: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.mobile_No}</p>
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
                          },
                        ]}
                      >
                        <Input
                          value={Data.email}
                          onChange={(e) => {
                            SetData({ ...Data, email: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.email}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b> Identification Marks 1</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Full Name as per Records!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.identification_mark1}
                          type="Number"
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              identification_mark1: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>Identification Marks 2</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Full Name as per Records!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.identification_mark2}
                          type="Number"
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              identification_mark2: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>Emergency Mobile Number</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          value={Data.emergency_mobNo}
                          type="Number"
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              emergency_mobNo: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>State</b>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="Select State"
                          value={Data.present_Address_State}
                          onChange={(e) => {
                            SetData({ ...Data, present_Address_State: e });
                          }}
                        >
                          {ApllicantBenificiaryOtherState.map((row, index) => (
                            <option value={row} key={index}>
                              {row}
                            </option>
                          ))}
                        </Select>
                        <p className="red">{Formerror.present_Address_State}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>District</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your District!",
                          },
                        ]}
                      >
                        <Select
                          value={Data.districtData}
                          placeholder="--Select District--"
                          onChange={(e) => {
                            // SetData({ ...Data, district: e });
                            setDestrictName(e);
                          }}
                        >
                          {districtData.map((item, i) => {
                            return (
                              <Select.Option value={item.name} key={i}>
                                {item.name}{" "}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Taluka</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder="--Select Taluka--"
                          value={Data.present_Address_tehsil}
                          onChange={(e) => {
                            SetData({ ...Data, present_Address_tehsil: e });
                          }}
                        >
                          {talukas.map((taluka, index) => {
                            return (
                              <Select.Option key={index} value={taluka}>
                                {taluka}
                              </Select.Option>
                            );
                          })}
                        </Select>
                        <p className="red">
                          {Formerror.present_Address_tehsil}
                        </p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>Village</b> <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Village!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.Present_Address_Village}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              Present_Address_Village: e.target.value,
                            });
                          }}
                        />
                        <p className="red">
                          {Formerror.Present_Address_Village}
                        </p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Present Address Line 1</b>
                      </label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          value={Data.Present_Address_Line_1}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              Present_Address_Line_1: e.target.value,
                            });
                          }}
                        />
                        <p className="red">
                          {Formerror.Present_Address_Line_1}
                        </p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        <b>Present Address Line 2</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          value={Data.Present_Address_Line_2}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              Present_Address_Line_2: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Present Address Pincode</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              present_Adderess_PinCode: e.target.value,
                            });
                          }}
                        />
                        <p className="red">
                          {Formerror.Present_Address_Line_1}
                        </p>
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>Permanent Address Same as Present Address?</b>
                      </label>

                      <Form.Item>
                        <Radio.Group>
                          <Radio
                            value="yes"
                            // onClick={() => SetBrithAddress(false)}
                            onClick={() => addPreviousAddress()}
                          >
                            Yes
                          </Radio>
                          <Radio
                            value="No"
                            onClick={() => SetparmanentDetails(true)}
                          >
                            No
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    {parmanentDetails && (
                      <>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>State</b>
                          </label>
                          <Form.Item>
                            <Select
                              placeholder="Select State"
                              value={Data.permanent_Address_State}
                              onChange={(e) => {
                                SetData({
                                  ...Data,
                                  permanent_Address_State: e,
                                });
                              }}
                            >
                              {ApllicantBenificiaryOtherState.map(
                                (row, index) => (
                                  <option value={row} key={index}>
                                    {row}
                                  </option>
                                )
                              )}
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <span className="red">*</span> <b>District</b>
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Please input your District!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="--Select District--"
                              value={Data.districtData}
                              onChange={(e) => {
                                // SetData({ ...Data, district: e });
                                setDestrictName(e);
                              }}
                            >
                              {districtData.map((item, i) => {
                                return (
                                  <Select.Option value={item.name} key={i}>
                                    {item.name}{" "}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>permanent Address Tehsil</b>
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Select
                              placeholder="--Select Taluka--"
                              value={Data.permanent_Address_tehsil}
                              onChange={(e) => {
                                SetData({
                                  ...Data,
                                  permanent_Address_tehsil: e,
                                });
                              }}
                            >
                              {talukas.map((taluka, index) => {
                                return (
                                  <Select.Option key={index} value={taluka}>
                                    {taluka}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>Village</b>
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Please input your Village!",
                              },
                            ]}
                          >
                            <Input
                              value={Data.permanent_Address_Village}
                              onChange={(e) => {
                                SetData({
                                  ...Data,
                                  permanent_Address_Village: e.target.value,
                                });
                              }}
                            />{" "}
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          {" "}
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>permanent Address Line 1</b>
                          </label>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              value={Data.permanent_Address_Line_1}
                              onChange={(e) => {
                                SetData({
                                  ...Data,
                                  permanent_Address_Line_1: e.target.value,
                                });
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            <b>permanent Address Line 2</b>
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              value={Data.permanent_Address_Line_2}
                              onChange={(e) => {
                                SetData({
                                  ...Data,
                                  permanent_Address_Line_2: e.target.value,
                                });
                              }}
                            />
                          </Form.Item>
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <b>permanent Address Pincode</b>
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              value={Data.permanent_Adderess_PinCode}
                              onChange={(e) => {
                                SetData({
                                  ...Data,
                                  permanent_Adderess_PinCode: e.target.value,
                                });
                              }}
                            />
                          </Form.Item>
                        </div>
                      </>
                    )}

                    <div className="col-md-12">
                      <h5>Upload required documents: </h5>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Address proof (Size -
                        Maximum 1 MB) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            addressProof: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Age Proof (Size - Maximum
                        1 MB) [Only (jpg,jpeg,pdf)]{" "}
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            ageProof: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                  </div>
                  <h5 className="red">
                    अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक कागदपत्रे
                    तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक कागदपत्रे चुकीची
                    किंवा अस्पष्ट आढळल्यास सदर चा अर्ज फेटाळला जाऊ शकतो.{" "}
                  </h5>
                  <div className="row">
                    {pid == undefined ? (
                      <div className="col-md-1">
                        <Form.Item>
                          <Button
                            onClick={(e) => {
                              handleSubmit(e);
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
                            onClick={(e) => {
                              editHandler(e);
                            }}
                          >
                            Update
                          </Button>
                        </Form.Item>
                      </div>
                    )}

                    <div className="col-md-1">
                      <Form.Item>
                        {/* <Button type="primary" htmlType="submit">
                          Reset
                        </Button> */}
                      </Form.Item>
                    </div>
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

export default ParmanantDl;
