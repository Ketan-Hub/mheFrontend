import React from "react";
import axios from "axios";
import { MdUploadFile } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { Button, Form, Input, Radio, Select, DatePicker, Upload } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { json, useParams } from "react-router-dom";
import changeNumber from "../../Redux/reducers/reducers";
import { incNumber } from "../../Redux/actions";
import { toast } from "react-toastify";
import {
  ApllicantBenificiaryOtherState,
  rto,
  vehical_type,
  cob,
  districtData,
  qualification,
} from "../../constants/data";
import swal from "sweetalert";
const LearningDL = () => {
  const { lid } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [id, setId] = useState();

  const [data, setData] = useState();
  const users = useSelector((state) => state.userData.user);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  // const SingleUser = users?.filter((ele) => ele._id === userData.user._id);
  // let userFormDetails = [];
  // console.log(35,userFormDetails)
  const [pricess, setPricess] = useState();
  const [balance, setBalance] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  
  const [selectedRtoPricewe, setSelectedRtoPrice] = useState();
  console.log(57, selectedRtoPricewe);
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
          const userFormDetails = response.filter((item) => item.userID === userData.user._id);
         setuserFormDetails(userFormDetails);
        }
      })
      .catch((err) => console.log(40, err));
  }, []);
  const setFormPrice = (formType) => {
    switch (formType) {
      case "Learning DL - Motor cycle without Gear (Non Transport) (MCWOG)":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWOG);
          setisVisible(true);
        }
        break;
      case "Learning DL - Motor Cycle with Gear(Non Transport) (MCWG)":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWG);
          setisVisible(true);
        }
        break;
      case "Learning DL - Motor Cycle with Gear(Non Transport) (MCWG)":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWG);
          setisVisible(true);
        }
        break;
      case "Learning DL - Light Motor Vehicle (LMV)":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_LMV);
          setisVisible(true);
        }
        break;
      case "Learning DL - Light Motor Vehicle Transport (LMV-TR)":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_LMV_TR);
          setisVisible(true);
        }
        break;
      case "Learning DL - Learning DL - MCWOG + MCWG":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWOG_MCWG);
          setisVisible(true);
        }
        break;
      case "Learning DL - MCWOG + LMV":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWOG_LMV);
          setisVisible(true);
        }
        break;
      case "Learning DL - MCWG + LMV":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWG_LMV);
          setisVisible(true);
        }
        break;
      case "Learning DL - MCWOG + MCWG + LMV":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWOG_MCWG_LMV);
          setisVisible(true);
        }
        break;
      case "Learning DL - MCWG + LMV-TR":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWG_LMVTR);
          setisVisible(true);
        }
        break;
      case "Learning DL - MCWOG + LMV-TR":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWOG_LMVTR);
          setisVisible(true);
        }
        break;
      case "Learning DL - MCWOG + MCWG + LMV-TR":
        {
          setSelectedRtoPrice(userFormDetails[0].learningDl_MCWOG_MCWG_LMV_TR);
          setisVisible(true);
        }
        break;

      default:
        break;
    }
  };

  const reducer = useSelector((state) => state.changeNumber);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));

    if (userData) {
      axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
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

  const [docs, setDocs] = useState({
    addressProof: "",
    ageProof: "",
    passportSize: "",
    signature: "",
  });
  // console.log(36,docs)
  const [Data, SetData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user.name,
    apllication_type: "learning",
    status: "IN-PROGRESS",
    state: "",
    rto: "",
    vehical_type: "",
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

  // console.log(Data);
  const [parmanatDetails, SetPermanatDetails] = useState(false);

  const handleDateChange = (date, dateString) => {
    SetData({ ...Data, Dob: dateString });
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
      error.rto = " FullName English Is required";
    }
    if (!values.vehical_type) {
      error.vehical_type = " FullName English is required";
    }
    if (!values.application_middle_name) {
      error.application_middle_name = " Applicatent Middle nameis required";
    }
    if (!values.application_last_name) {
      error.application_last_name = " Applicatent Middle nameis required";
    }
    if (!values.relation) {
      error.relation = " Relation is required";
    }
    if (!values.gender) {
      error.gender = "  Gender is required";
    }
    if (!values.pob) {
      error.pob = "  Place Brithdate  is required";
    }
    if (!values.cob) {
      error.cob = "  Country Brithdate  place is required";
    }
    if (!values.qualification) {
      error.qualification = "  Qualification  is required";
    }
    if (!values.mobile_No) {
      error.mobile_No = " Mobile No is required";
    }
    if (!values.email) {
      error.email = "Email  is required";
    }
    if (!values.present_Address_State) {
      error.present_Address_State = "present Address State is required";
    }

    if (!values.Present_Address_Village) {
      error.Present_Address_Village = "Present Address Village is required";
    }
    if (!values.present_Address_tehsil) {
      error.present_Address_tehsil = "present Address tehsil  is required";
    }
    if (!values.Present_Address_Line_1) {
      error.Present_Address_Line_1 = "Present AddressL ine 1  is required";
    }
    if (!values.fullname_asper_record) {
      error.fullname_asper_record = "fullname as per record  is required";
    }

    console.log("error object", error);
    return error;
  };

  console.log("item", districtData);
  const postLDJData = (e) => {
    e.preventDefault();
    const errors = validate(Data);
    if (Object.keys(errors).length === 0) {
      SetIsSubmit(true);
      swal("Good job!", "form submitted successfully!", "success");

      const obj = {
        Data,
      };

      if (balance > selectedRtoPricewe) {
        const mainDataPromise = new Promise((resolve, reject) => {
          axios
            .post(`https://mhebackend.payagain.in/api/learning/create`, Data)
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
            passportSize(res.data.data._id);
            signature(res.data.data._id);
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
      alert("Filled the required form");
    }
  };
  const obj = {
    user: userData?.user._id,
    mode: "offline",
    amount: selectedRtoPricewe,
    isExpence: true,
    expenceFor: "LearningDL",
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
  const uploadAddress = (id) => {
    const formData = new FormData();
    formData.append("addressProof", docs.addressProof);
    axios
      .put(`https://mhebackend.payagain.in/api/addressProof/${id}`, formData)
      .then((res) => console.log("addressUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const Ageproof = (id) => {
    console.log(143, id);
    const formData = new FormData();
    formData.append("ageProof", docs.ageProof);
    axios
      .put(`https://mhebackend.payagain.in/api/Ageproof/${id}`, formData)
      .then((res) => console.log("ageProofUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const passportSize = (id) => {
    const formData = new FormData();
    formData.append("passportSize", docs.passportSize);
    axios
      .put(`https://mhebackend.payagain.in/api/passportPic/${id}`, formData)
      .then((res) => console.log("passportSizeUploadaed", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const signature = (id) => {
    const formData = new FormData();
    formData.append("signature", docs.signature);
    axios
      .put(`https://mhebackend.payagain.in/api/signature/${id}`, formData)
      .then((res) => console.log("Signature Uploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (lid != undefined) {
      axios
        .get(`https://mhebackend.payagain.in/api/learning/${lid}`)
        .then((res) => {
          const data = res.data[0];

          console.log("data", data);
          SetData(data);
        });
    }
  }, [lid]);

  const editHandler = (e) => {
    e.preventDefault();

    const obj = {
      ...Data,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "learning",
      status: "IN-PROGRESS",
    };

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/learning/${lid}`, obj)
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
        uploadAddress(res.data._id);
        Ageproof(res.data._id);
        passportSize(res.data._id);
        signature(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //--------------------address same as parment----------------
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
  return (
    <Fragment>
      <Breadcrumb title={"Learning Driving License  "} parent={"license"} />
      {isVisible && <h3>{` Form Price :${selectedRtoPricewe}`}</h3>}
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> State
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
                        <p className="red">{Formerror.state}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> RTO
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
                        <span className="red">*</span> Vehicle Type
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Vehicle Type"
                          value={Data.vehical_type}
                          onChange={(e) => {
                            SetData({ ...Data, vehical_type: e });
                            setFormPrice(e);
                            console.log(557, e);
                          }}
                        >
                          <Select.Option value="Learning DL - Motor Cycle with Gear(Non Transport) (MCWG)">
                            Learning DL - Motor Cycle with Gear(Non Transport)
                            (MCWG)
                          </Select.Option>
                          <Select.Option value="Learning DL - Light Motor Vehicle (LMV)">
                            Learning DL - Light Motor Vehicle (LMV)
                          </Select.Option>
                          <Select.Option value="Learning DL - Light Motor Vehicle Transport (LMV-TR)">
                            Learning DL - Light Motor Vehicle Transport (LMV-TR)
                          </Select.Option>
                          <Select.Option value="Learning DL - MCWOG + MCWG">
                            Learning DL - MCWOG + MCWG
                          </Select.Option>
                          <Select.Option value="Learning DL - MCWOG + LMV">
                            Learning DL - MCWOG + LMV
                          </Select.Option>
                          <Select.Option value="Learning DL - MCWOG + LMV">
                            Learning DL - MCWOG + LMV
                          </Select.Option>
                          <Select.Option value="Learning DL - MCWOG + MCWG + LMV">
                            Learning DL - MCWOG + MCWG + LMV
                          </Select.Option>
                          <Select.Option value="Learning DL - MCWG + LMV-TR">
                            Learning DL - MCWG + LMV-TR
                          </Select.Option>
                          <Select.Option value="Learning DL - MCWOG + LMV-TR">
                            Learning DL - MCWOG + LMV-TR
                          </Select.Option>
                          <Select.Option value="Learning DL - MCWOG + MCWG + LMV-TR">
                            Learning DL - MCWOG + MCWG + LMV-TR
                          </Select.Option>
                        </Select>
                        <p className="red">{Formerror.vehical_type}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> Application First Name
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
                          placeholder="Application_first_name"
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
                        <span className="red">*</span> Application Middle Name
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
                          placeholder="application_middle_name"
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
                        <span className="red">*</span> Application Last Name
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
                          placeholder="application_last_name"
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
                        <span className="red">*</span>Relation
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Vehicle Type"
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
                        <span className="red">*</span> Full Name as per Records
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
                          placeholder="fullname_asper_record"
                          value={Data.fullname_asper_record}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              fullname_asper_record: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.fullname_asper_record}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Gender
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
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        Place Of Birth
                      </label>

                      <Form.Item>
                        <Input
                          value={Data.pob}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              pob: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Country Of Birth
                      </label>

                      <Form.Item>
                        <Input
                          placeholder="Country Of Birth"
                          value={Data.cob}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              cob: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.cob}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Qualification
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
                        <span className="red">*</span>Blood Group
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Blood Group"
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
                        <span className="red">*</span>Mobile Number
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Mobile Number"
                          type="Number"
                          value={Data.mobile_No}
                          onChange={(e) => {
                            SetData({ ...Data, mobile_No: e.target.value });
                          }}
                        />
                        <p style={{ color: "red" }}>{Formerror.mobile_No}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Email
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email"
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
                        Identification Marks 1
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
                          placeholder="Email"
                          type="Number"
                          value={Data.identification_mark1}
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
                        Identification Marks 2
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
                          type="Number"
                          value={Data.identification_mark2}
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
                        Emergency Mobile Number
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          type="Number"
                          value={Data.emergency_mobNo}
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
                        <span className="red">*</span>Present Address State
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
                        ``
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Present Address Tehsil</b>
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
                        <span className="red">*</span>Present Address
                        Village/Town
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
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
                        <span className="red">*</span>Present Address Line 1
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
                        Present Address Line 2
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
                        <span className="red">*</span>Present Address Pincode
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          value={Data.present_Adderess_PinCode}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              present_Adderess_PinCode: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Permanent Address Same as
                        Present Address?
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
                          </Form.Item>{" "}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <span className="red">*</span>permanent Address
                            Village/Town
                          </label>

                          <Form.Item
                            rules={[
                              {
                                required: true,
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
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          {" "}
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <span className="red">*</span>permanent Address Line
                            1
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
                                setData({
                                  ...Data,
                                  permanent_Address_Line_1: e.target.value,
                                });
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            permanent Address Line 2
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
                            <span className="red">*</span>permanent Address
                            Pincode
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

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Passport Size Photo (Size - Maximum 500 Kb) [Only
                        (jpg,jpeg)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            passportSize: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Signature (Size - Maximum 500 Kb) [Only (jpg,jpeg)]
                      </label>
                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            signature: e.target.files[0],
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
                    {lid == undefined ? (
                      <div className="col-md-1">
                        <Form.Item>
                          <Button
                            onClick={(e) => {
                              postLDJData(e);
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

export default LearningDL;
