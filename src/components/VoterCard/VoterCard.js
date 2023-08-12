import React from "react";
import axios from "axios";
import { MdUploadFile } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { Button, Form, Input, Radio, Select, DatePicker, Upload } from "antd";
import { Fragment, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { toast } from "react-toastify";
// import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { incNumber } from "../../Redux/actions";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import changeNumber from "../../Redux/reducers/reducers";
// import { incNumber } from "../../Redux/actions";
// import { toast } from "react-toastify";
import swal from 'sweetalert';

import {
  work_type,
  districtData,
  ApllicantBenificiaryOtherState,
} from "../../constants/data";
const VoterCard = () => {
  const {vid} =useParams()
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [form] = Form.useForm();

  const [data, setData] = useState();
  const users = useSelector((state) => state.userData.user);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const SingleUser = users?.filter((ele) => ele._id === userData.user._id);
  const pricess = useSelector((state) => state.price.formPrices);
  const [balance, setBalance] = useState(0);
  const [userFormDetails, setuserFormDetails] = useState([]);
  const reducer = useSelector((state) => state.changeNumber);

  useEffect(() => {
    axios
    .get(`https://mhebackend.payagain.in/api/formPrice`)
    .then((res) => {
      const response = res.data;
      console.log(46,response)
      if (response.userID!==userData.user._id) {
        const userFormDetails = response.filter((item) => item.userID === "ALL");
        setuserFormDetails(userFormDetails);
      }else{
        const userFormDetails = response.filter((item) => item.userID === userData.user._id );
       setuserFormDetails(userFormDetails);
      }
    })
    .catch((err) => console.log(40, err));
  }, []);
  useEffect(() => {
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
            if (item.isExpence) {
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
  // let userFormDetails = [];

  // userFormDetails = pricess.filter(
  //   (item) => item.userID === userData.user._id
  //   );
    
  //   if (userFormDetails.length < 1) {
  //   userFormDetails = pricess.filter((item) => item.userID === "ALL");
  //  console.log(34, userFormDetails);
  // }
  console.log(25, userFormDetails);
  const [docs, setDocs] = useState({
    votercard_addressProofDoc: "",
    votercard_ageProofDOc: "",
    votercard_PassportSizePhoto: "",
    votercard_ageDeclarationForm: "",
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [Data, SetData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "voterCard",
    status: "IN-PROGRESS",
    assembly_Parliamentary_Constituency: "",
    request_name_electoral_roll_Constituency: "",
    name: "",
    Surname: "",
    gender: "",
    date_of_Birth: "",
    birth_Town_Village_Office: "",
    birth_District: "",
    birth_State_Union_Territory: "",
    relation: "",
    currentAddress_houseNumber: "",
    currentAddress_streetArea_Locality: "",
    currentAddress_townVillage_Office: "",
    currentAddress_postOffice: "",
    currentAddress_district: "",
    currentAddress_stateUnion_Territory: "",
    currentAddress_pincodeZip_code: "",
    currentAddress_ordinarily_resident_address_since: "",
    currentAddress_permanentAddress_currentAddress: "",
    permanent_address: "",
    permanentAddress_House_No: "",
    permanentAddress_streetArea_Locality: "",
    permanentAddress_townVillage_Office: "",
    permanentAddress_postOffice: "",
    permanentAddress_district: "",
    permanentAddress_stateUnion_territory: "",
    permanentAddress_pincodeZip_code: "",
    permanentAddress_telephoneMobile_Number: "",
    email: "",
    EPIC_No: "",
    disability: "",
    previous_Constituency: "",
    previousConstituency_state: "",
    // addressProof:"",
    // ageProof:"",
    // PassportSize_photo:"",
    // age_declaration_form:"",
  });
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
    if (!values.assembly_Parliamentary_Constituency) {
      error.assembly_Parliamentary_Constituency = " assembly_Parliamentary_Constituency is required";
    }
    if (!values.request_name_electoral_roll_Constituency) {
      error.request_name_electoral_roll_Constituency = " request_name_electoral_roll_Constituency is required";
    }
    if (!values.name) {
      error.name = " FullName  Is required";
    }
    if (!values.Surname) {
      error.Surname = " Surname is required";
    }
    if (!values.gender) {
      error.gender = " gender is required";
    }
    if (!values.date_of_Birth) {
      error.date_of_Birth = " Date_of_Birth is required";
    }
    if (!values.relation) {
      error.relation = " relation is required";
    }
    if (!values.currentAddress_houseNumber) {
      error.currentAddress_houseNumber = " currentAddress_houseNumber is required";
    }
    if (!values.currentAddress_streetArea_Locality) {
      error.currentAddress_streetArea_Locality = " currentAddress_streetArea_Locality is required";
    }
    if (!values.currentAddress_stateUnion_Territory) {
      error.currentAddress_stateUnion_Territory = "currentAddress_stateUnion_Territory is required";
    }
    if (!values.currentAddress_townVillage_Office) {
      error.currentAddress_townVillage_Office = " currentAddress_townVillage_Office is required";
    }
    if (!values.currentAddress_postOffice) {
      error.currentAddress_postOffice = " currentAddress_postOffice is required";
    }
   
    console.log("error object", error);
    return error;
  };
  const handleDateChange = (Bddate, dateString) => {
    SetData({ ...Data,  date_of_Birth: dateString });
  };
  const handleResident = (resident, dateString) => {
    SetData({ ...Data,  currentAddress_ordinarily_resident_address_since: dateString });
  };
  const postLDJData = (e) => {
    e.preventDefault();
    const errors = validate(Data);
    console.log("formErrors:", errors);
    if (Object.keys(errors).length === 0) {
      SetIsSubmit(true);
      swal("Good job!", "form submitted successfully!", "success");

    const obj={
      Data,
      } 
      console.log(obj);
    console.log(23, userFormDetails[0].voteCard);
    if (balance > userFormDetails[0]?.voteCard) {
      const mainDataPromise = new Promise((resolve, reject) => {
        // console.log(77, Data);
        axios
          .post(`https://mhebackend.payagain.in/api/votercard/create`, Data)
          .then((res) => {
            const response = res;
            // console.log(136, response);
            resolve({
              status: true,
              message: "data Posted Successfully",
              data: res.data,
            });
            // setId(response._id);
            // setIsres(true);
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

          addressProof(res.data.data._id);
          ageProof(res.data.data._id);
          passportSize(res.data.data._id);
          agedeclaration(res.data.data._id);
          debitFormBalance();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Recharge");
    }
  }
  else{
    setFormerror(errors);
    swal('Filled the required form')
  }
}
  const obj = {
    user: userData?.user._id,
    mode: "offline",
    amount: userFormDetails[0]?.voterCard,
    isExpence: true,
    expenceFor: "voterCardCtl",
  };
  console.log(146, obj);
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
  const addressProof = (id) => {
    const formData = new FormData();
    formData.append("addressProof_Doc", docs.votercard_addressProofDoc);
    axios
      .put(
        `https://mhebackend.payagain.in/api/votercard_addressProofDoc/${id}`,
        formData
      )
      .then((res) => console.log("addressUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const ageProof = (id) => {
    console.log(143, id);
    const formData = new FormData();
    formData.append("ageProof_DOc", docs.votercard_ageProofDOc);
    axios
      .put(`https://mhebackend.payagain.in/api/votercard_ageProofDOc/${id}`, formData)
      .then((res) => console.log("ageProofUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const passportSize = (id) => {
    const formData = new FormData();
    formData.append("PassportSize_photo", docs.votercard_PassportSizePhoto);
    axios
      .put(
        `https://mhebackend.payagain.in/api/votercard_PassportSizePhoto/${id}`,
        formData
      )
      .then((res) => console.log("passportSizeUploadaed", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const agedeclaration = (id) => {
    const formData = new FormData();
    formData.append("age_declaration_form", docs.votercard_ageDeclarationForm);
    axios
      .put(
        `https://mhebackend.payagain.in/api/votercard_ageDeclarationForm/${id}`,
        formData
      )
      .then((res) => console.log("ageDeclarationForm Uploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (vid!= undefined) {
      axios.get(`https://mhebackend.payagain.in/api/votercard/${vid}`).then((res) => {
        const data = res.data[0];
      
        console.log('data',data)
        SetData(data);

      });
    }
  }, [vid]);

  const [talukas, setTalukas] = useState([]);
  const setDestrictName = (e) => {
    console.log("districtData:", districtData);

    districtData.filter((dist) => {
      if (dist.name.toLowerCase() == e.toString().toLowerCase()) {
        console.log(dist.tahasil);
        setTalukas(dist.tahasil);
      }
    });
  };

  const editHandler = (e) => {

    e.preventDefault()
   

    const obj={

      ...Data ,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "voterCard",
      status: "IN-PROGRESS",  
    }

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/votercard/${vid}`, obj)
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
       
        addressProof(res.data._id);
        ageProof(res.data._id);
        passportSize(res.data._id);
        agedeclaration(res.data._id);
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  return (
   
    <Fragment>
    <Breadcrumb title={"Voter Card Form"}  />
    <Container fluid={true}>
    <h3>Form Price :{userFormDetails[0]?.voterCard}</h3>

      <Row>
        <Col sm="">
          <Card>
            <CardBody>
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div className="row">

                <div className="col-md-6">
                    <label htmlFor="" className="mb-3" style={{fontWeight:"500"}}>
                      {" "}
                      <span className="red">*</span> <b>Assembly / Parliamentary Constituency</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your Assembly / Parliamentary Constituency!",
                        },
                      ]}
                    >
                      <Input  
                      value={Data.assembly_Parliamentary_Constituency}
                      onChange={(e)=>{
                        SetData({...Data,assembly_Parliamentary_Constituency:e.target.value});
                       }} /> <p className="red">{Formerror.assembly_Parliamentary_Constituency}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>I request that my name be included in the electoral roll for the above Constituency</b>
                    </label>

                    <Form.Item>
                      <Radio.Group placeholder="--select--"
                      value={Data.request_name_electoral_roll_Constituency}
                     onChange={(e) => {
                      SetData({ ...Data,  request_name_electoral_roll_Constituency: e.target.value });
                      console.log("request data:",e.target.value);
                     }}>
                        <Radio value="As a first time voter">As a first time voter</Radio><br/>
                        <Radio value="Due to shifting from another constituency">Due to shifting from another constituency</Radio>
                    
                      </Radio.Group>
                      <p className="red">{Formerror.request_name_electoral_roll_Constituency}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Name</b>
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
                      value={Data.name}
                        onChange={(e)=>{
                        SetData({...Data,name:e.target.value});
                       }}/> <p className="red">{Formerror.name}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Surname</b>
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
                      value={Data.Surname}
                      onChange={(e)=>{
                        SetData({...Data,Surname:e.target.value});
                       }} /><p className="red">{Formerror.Surname}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Gender</b>
                    </label>

                    <Form.Item>
                      <Radio.Group placeholder="--select--"
                     onChange={(e) => {
                      SetData({ ...Data, gender: e });
                     }}>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="others">Others</Radio>
                      </Radio.Group><p className="red">{Formerror.gender}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Date Of Birth</b>
                    </label>

                    <Form.Item>
                      <DatePicker  onChange={handleDateChange}
                        format="YYYY-MM-DD" />
                        <p className="red">{Formerror.date_of_Birth}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Birth Town/Village Office</b>
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
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            birth_Town_Village_Office: e.target.value,
                          });
                        }}
                      />  <p className="red">{Formerror.birth_Town_Village_Office}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Birth District</b>
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
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Brith State</b>
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select State"

                        onChange={(e) => {
                          SetData({ ...Data,  birth_State_Union_Territory: e });
                        }}
                      >
                        {ApllicantBenificiaryOtherState.map((row, index) => (
                          <option value={row} key={index}>
                            {row}
                          </option>
                        ))}
                      </Select>
                      <p className="red">{Formerror.birth_State_Union_Territory}</p>
                    </Form.Item>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Relation</b>
                    </label>

                    <Form.Item>
                      <Select  placeholder="--Select Relation--"
                      value={Data.relation}
                        onChange={(e) => {
                          SetData({ ...Data, relation: e });
                        }}>
                        <Select.Option value="Father"></Select.Option>
                        <Select.Option value="Mother"></Select.Option>
                        <Select.Option value="Husband"></Select.Option>
                        <Select.Option value="Gaurdian"></Select.Option>
                        <Select.Option value="other"></Select.Option>

                      </Select> <p className="red">{Formerror.relation}</p>
                    </Form.Item>
                  </div>

                 <div className="col-md-6 mb-3 text-decoration-underline font-bold"><b>Current Address</b></div>
                 <div className="col-md-6"></div>

                 <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>House No.</b>
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
                      value={Data.currentAddress_houseNumber}
                      onChange={(e)=>{
                        SetData({...Data,currentAddress_houseNumber:e.target.value});
                       }}/><p className="red">{Formerror.currentAddress_houseNumber}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Street/Area/Locality</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input onChange={(e)=>{
                        SetData({...Data,currentAddress_streetArea_Locality:e.target.value});
                       }} /><p className="red">{Formerror.currentAddress_streetArea_Locality}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
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
                       value={Data.currentAddress_townVillage_Office}
                       onChange={(e)=>{
                        SetData({...Data,currentAddress_townVillage_Office:e.target.value});
                       }} /><p className="red">{Formerror.currentAddress_townVillage_Office}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Post Office</b> 
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
                      value={Data.currentAddress_postOffice}
                      onChange={(e)=>{
                        SetData({...Data,currentAddress_postOffice:e.target.value});
                       }}  /><p className="red">{Formerror.currentAddress_postOffice}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>District</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                       <Select
                                                                          placeholder="--Select District--"
                                                                          onChange={(
                                                                            e
                                                                          ) => {
                                                                            // SetData({ ...Data, district: e });
                                                                            setDestrictName(
                                                                              e
                                                                            );
                                                                          }}
                                                                        >
                                                                          {districtData.map(
                                                                            (
                                                                              item,
                                                                              i
                                                                            ) => {
                                                                              return (
                                                                                <Select.Option
                                                                                  value={
                                                                                    item.name
                                                                                  }
                                                                                  key={
                                                                                    i
                                                                                  }
                                                                                >
                                                                                  {
                                                                                    item.name
                                                                                  }{" "}
                                                                                </Select.Option>
                                                                              );
                                                                            }
                                                                          )}
                                                                        </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>State / Union Territory</b>
                    </label>

                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        value={Data.currentAddress_stateUnion_Territory}
                        onChange={(e) => {
                          SetData({ ...Data,  currentAddress_stateUnion_Territory: e });
                        }}
                      >
                        <Select.Option value="Maharashtra">
                          Maharashtra
                        </Select.Option>
                      </Select><p className="red">{Formerror.currentAddress_stateUnion_Territory
                      
                      }</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     
                  <b>Pincode / Zip code</b> 
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
                      value={Data.currentAddress_pincodeZip_code}
                      onChange={(e)=>{
                        SetData({...Data,currentAddress_pincodeZip_code:e.target.value});
                       }} />
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>I am ordinarily resident at the address given at above since</b>
                    </label>

                    <Form.Item>
                      <DatePicker onChange={handleResident}
                        format="YYYY-MM-DD"/>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Permanent Address </b>
                    </label>

                  
                  </div>
                 
                 <div className="col-md-6"></div>
                  
                 

                
                 <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>House No.</b>
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
                      value={Data.permanentAddress_House_No}
                      onChange={(e)=>{
                        SetData({...Data,permanentAddress_House_No:e.target.value});
                       }} />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                    <b> Street/Area/Locality</b>
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
                      
                    
                      onChange={(e)=>{
                        SetData({...Data,permanentAddress_streetArea_Locality:e.target.value});
                       }} />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Town/Village Office</b>
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
                      
                      value={Data.permanentAddress_streetArea_Locality}
                      onChange={(e)=>{
                        SetData({...Data,permanentAddress_townVillage_Office:e.target.value});
                       }} />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Post Office</b>
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
                      value={Data.permanentAddress_postOffice}
                      onChange={(e)=>{
                        SetData({...Data,permanentAddress_postOffice:e.target.value});
                       }}/>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>District</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
<Select
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
                      </Select>               </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b> State / Union Territory</b>
                    </label>

                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        onChange={(e) => {
                          SetData({ ...Data,  permanentAddress_stateUnion_territory: e });
                        }}
                      >
                       {ApllicantBenificiaryOtherState.map((row, index) => (
                          <option value={row} key={index}>
                            {row}
                          </option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Pincode / Zip code</b> 
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
                      value={Data.permanentAddress_pincodeZip_code}
                      onChange={(e) => {
                          SetData({
                            ...Data,
                            permanentAddress_pincodeZip_code: e.target.value,
                          });
                        }}/>
                    </Form.Item>
                  </div>                  

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
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
                      value={Data.permanentAddress_telephoneMobile_Number}
                      onChange={(e) => {
                          SetData({
                            ...Data,
                            permanentAddress_telephoneMobile_Number: e.target.value,
                          });
                        }}/>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
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
                          SetData({
                            ...Data,
                            email: e.target.value,
                          });
                        }}/>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>EPIC No</b>
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
                      value={Data.EPIC_No}
                      onChange={(e) => {
                          SetData({
                            ...Data,
                            EPIC_No: e.target.value,
                          });
                        }}/>
                    </Form.Item>
                  </div>
                   
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Disability</b>
                    </label>

                    <Form.Item>
                      <Select  placeholder="--Select Disability--"
                        onChange={(e) => {
                          SetData({ ...Data, disability: e });
                        }}>
                        <Select.Option value="Visual Impairment"></Select.Option>
                        <Select.Option value="Speech & Hearning Disability"></Select.Option>
                        <Select.Option value="Locomotor Disability"></Select.Option>
                        <Select.Option value="others"></Select.Option>

                      </Select>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Previous Constituency</b>
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
                      value={Data.previous_Constituency}
                      onChange={(e) => {
                          SetData({
                            ...Data,
                            previous_Constituency: e.target.value,
                          });
                        }}/>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Previous Constituency State</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                       <Select
                        placeholder="Select State"

                        onChange={(e) => {
                          SetData({ ...Data,  previousConstituency_state: e });
                        }}
                      >
                          {ApllicantBenificiaryOtherState.map((row, index) => (
                          <option value={row} key={index}>
                            {row}
                          </option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  
                  <div className="col-md-6">
                    <label htmlFor="" className="mb-3">
                      {" "}<span className="red">*</span> 
                     <b>  Forms</b>
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
                                         <h5><a href="https://mhseva.com/upload_frms.php?file=Age_Declaration_Form.pdf"> Age Declaration Form</a></h5> 

                    </Form.Item>
                  </div>
                  </div>
                  <div className="col-md-12">
                      <h5>Upload required documents: </h5>
                    
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Address proof (Size -
                        Maximum 1 MB) [Only (jpg,jpeg,pdf)]
                      </label>
                            
                        <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              votercard_addressProofDoc: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Age Proof (Size - Maximum
                        1 MB) [Only (jpg,jpeg,pdf)]{" "}
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              votercard_ageProofDOc: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                            
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Passport Size Photo (Size - Maximum 500 Kb) [Only
                        (jpg,jpeg)]
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              votercard_PassportSizePhoto: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>
               
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Age Declaration Form (Size - Maximum 1 MB) [Only (jpg,jpeg,pdf)]
                      </label>
                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              votercard_ageDeclarationForm: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>
                
                  <h5 className="red">
                        अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक
                        कागदपत्रे तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक
                        कागदपत्रे चुकीची किंवा अस्पष्ट आढळल्यास सदर चा अर्ज
                        फेटाळला जाऊ शकतो.{" "}
                      </h5>
                  <div className="row">
                    {
                      vid==undefined ? 
                    
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
                    :
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
                    
                    }
                    <div className="col-md-1">
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Reset
                        </Button>
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

export default VoterCard;
