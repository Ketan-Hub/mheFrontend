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
// import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { incNumber } from "../../Redux/actions";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TextArea from "antd/es/input/TextArea";
import swal from 'sweetalert';

const PassportForm = () => {
  const { passid }=useParams()
  const [BrithAddress, SetBrithAddress] = useState(false);

  const [form] = Form.useForm();
  const dispatch=useDispatch();
  const userData = JSON.parse(localStorage.getItem("userResponse"));
const [balance,setBalance]=useState();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const pricess = useSelector((state) => state.price.formPrices);
  console.log(28,pricess)

  const reducer = useSelector((state) => state.changeNumber);

  const [isVisible, setisVisible] = useState(false);
  let userFormDetails = [];
  console.log(27,userFormDetails.length)
  console.log(30000000,pricess)
  userFormDetails = pricess.filter(
    (item) => item.userID === userData.user._id
    );
    
    if (userFormDetails.length < 1) {
    userFormDetails = pricess.filter((item) => item.userID === "ALL");
   console.log(34, userFormDetails);
  }

  const [selectedRtoPricewe, setSelectedRtoPrice] = useState();
  const setFormPrice = (formType) => {
    switch (formType) {
      case "Normal":
        {
          setSelectedRtoPrice(userFormDetails[0].passport_Normal);
          setisVisible(true);
        }
        break;
      case "Tatkal":
        {
          setSelectedRtoPrice(userFormDetails[0].passport_Tatkal);
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
    if (!values.typeApplication) {
      error.typeApplication = " Type Application is required";
    }
    // if (!values.application_first_name) {
    //   error.application_first_name = " FullName English is required";
    // }
    if (!values.selecttypePassport) {
      error.selecttypePassport = " Select type Passport Is required";
    }
    if (!values.title) {
      error.title = " Title is required";
    }
    if (!values.firstName) {
      error.firstName = " FullName English is required";
    }
    if (!values.middleName) {
      error.middleName = " Middle Name is required";
    }
    if (!values.lastName) {
      error.lastName = " Last Name is required";
    }
    if (!values.mobileNumber) {
      error.mobileNumber = " Mobile Number is required";
    }
    if (!values.email) {
      error.email = " Email is required";
    }
    if (!values.mother_lastName) {
      error.mother_lastName = " mother_lastName is required";
    }
    if (!values.spouse_firstName) {
      error.spouse_firstName = " Spouse firstName is required";
    }
    if (!values.spouse_middleName) {
      error.spouse_middleName = " Spouse Middle Name is required";
    }
    if (!values.spouse_lastName) {
      error.spouse_lastName = " Spouse Last Name is required";
    }
    if (!values.mother_middleName) {
      error.mother_middleName = " Mother middleName is required";
    }
    if (!values.gender) {
      error.gender = " Gender is required";
    }
    if (!values.maritalStatus) {
      error.maritalStatus = " Marital Status is required";
    }
    
    if (!values.preferred_policeStation) {
      error.preferred_policeStation = " Preferred policeStation is required";
    }
    if (!values.isYourParents_governmentServant) {
      error.isYourParents_governmentServant = " is Your Parents_governmentServant required ";
    }
    if (!values.educationQualification) {
      error.educationQualification = "Education Qualification is required";
    }
    if (!values.employmentType) {
      error.employmentType = "Employment Type is required";
    }
    if (!values.appliedPassport) {
      error.appliedPassport = "Applied Passport is required";
    }
    if (!values.EmergencyContact_FirstName) {
      error.EmergencyContact_FirstName = "Emergency Contact FirstName is required";
    }
    if (!values.EmergencyContact_middleName) {
      error.EmergencyContact_middleName = "Emergency Contact Middle Name is required";
    }
    if (!values.EmergencyContact_lastName) {
      error.EmergencyContact_lastName = "Emergency Contact Last Name is required";
    }
    if (!values.EmergencyAddress) {
      error.EmergencyAddress = "Emergency Address is required";
    }
    if (!values.Dob) {
      error.Dob = " Dob is required";
    }
    if (!values.pob) {
      error.pob = " pob is required";
    }
    if (!values.father_firstName) {
      error.father_firstName = " Father_firstName is required";
    }
    if (!values.father_lastName) {
      error.father_lastName = " Father_Last Name is required";
    }
    if (!values.mother_firstName) {
      error.mother_firstName = " Father_Last Name is required";
    }
    if (!values.father_middleName) {
      error.father_middleName = " Father_middleName is required";
    }
    console.log("error object", error);
    return error;
  };
  
const addPreviousAddress = () => {
  SetBrithAddress(false);
  setData((prevState) => {
    return {
      ...prevState,
     
      permanantAdress: prevState.presentAddress,
      



    };
  });
};

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));

    if (userData) {
      axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
        console.log(88, res.data);
        
        const allData = res.data.filter((ele) => ele.user === userData.user._id);
        let amount = 0
        let expence = 0
        if(allData.length>0){
            allData.forEach(item=>{
             if(item.isExpence==="true"){
              expence+= item.amount;
             }else{
              amount+= item.amount;
             }
            })
        }
        setBalance(amount-expence)
      });
    }
  }, [reducer]);
  console.log(104,balance);

  const [Data, setData] = useState({

    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "passport",
    status: "IN-PROGRESS",
    typePassport: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    gender: "",
    Dob: "",
    pob: "",
    maritalStatus: "",
    father_firstName: "",
    father_middleName: "",
    father_lastName: "",
    mother_firstName: "",
    mother_middleName: "",
    mother_lastName: "",
    spouse_firstName: "",
    spouse_middleName: "",
    spouse_lastName: "",
    presentAddress: "",
    permanantAdress_as_presentAdress: "",
    permanantAdress: "",
    preferred_policeStation: "",
    isYourParents_governmentServant: "",
    educationQualification: "",
    employmentType: "",
    appliedPassport: "",
    EmergencyContact_FirstName: "",
    EmergencyContact_middleName: "",
    EmergencyContact_lastName: "",
    EmergencyContact_mobileNO: "",
    EmergencyAddress: "",
    zipAllDocuments: "",
  });
  const handleDateChange = (date, dateString) => {
    setData({ ...Data, Dob: dateString });
  };

  const [docs, setDocs] = useState({
    zipAllDocuments: "",
   
  });
  const SubmitPassForm = (e) => {
    e.preventDefault();
    const errors = validate(Data);
    console.log("formErrors:", errors);
    if (Object.keys(errors).length === 0) {
      SetIsSubmit(true);
      swal("Good job!", "form submitted successfully!", "success");


    const obj={
      Data,
      } 


    console.log(Data);


    if (balance > selectedRtoPricewe) {
      const mainDataPromise = new Promise((resolve, reject) => {
        // console.log(77, Data);
        axios
          .post(`https://mhebackend.payagain.in/api/passport/create`, Data)
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

          uploadzipAllDocuments(res.data.data._id);
  
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

  const obj={
    user:userData?.user._id,
    mode:"offline",
    amount:selectedRtoPricewe,
    isExpence:true,
    expenceFor:"individualGST"
  }
  const debitFormBalance=()=>{
   
    axios
    .post("https://mhebackend.payagain.in/api/recharge/create", obj)
    .then((res) => {
        const response = res.data;
    dispatch(incNumber());
      toast.success("form Submitted");
      swal("Good job!", "form submitted successfully!", "success");

      
    })
    .catch((err) => console.log(34, err));
  }
  const uploadzipAllDocuments = (id) => {
    const formData = new FormData();
    formData.append("zipAllDocuments", docs.zipAllDocuments);
    axios
      .put(`https://mhebackend.payagain.in/api/passport_zipAllDocuments/${id}`, formData)
      .then((res) => console.log("uploadzipAllDocuments", res.data))
      .catch((err) => {
        console.log(err);
      });
  };




  useEffect(() => {
    if (passid!= undefined) {
      axios.get(`https://mhebackend.payagain.in/api/passport/${passid}`).then((res) => {
        const data = res.data[0];
      
        console.log('data',data)
        setData(data);

      });
    }
  }, [passid]);



  const editHandler = (e) => {

    e.preventDefault()
   

    const obj={

      ...Data ,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "passport",
      status: "IN-PROGRESS",  
    }

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/passport/${passid}`, obj)
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
       
        uploadzipAllDocuments(res.data._id);

      })
      .catch((err) => {
        console.log(err);
      });
    
      
  };

  return (
    

    <Fragment>
    <Breadcrumb title={"Passport Form"} />
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
                      {" "}
                      <span className="red">*</span> <b>Type of Application</b>
                    </label>
                    <Form.Item>
                        <Select
                          placeholder="Selec Type Of Application!"
                          value={Data.typeApplication}
                          onChange={(e) => {
                            setData({ ...Data, typeApplication: e });
                            setFormPrice(e);
                          }}
                        >
                          <Select.Option value="Normal">Normal</Select.Option>
                          <Select.Option value="Tatkal">Tatkal</Select.Option>
                        </Select>
                      </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Select Type of Passport</b>
                    </label>

                    <Form.Item>
                      <Radio.Group
                        onChange={(e) => {
                          setData({ ...Data, selecttypePassport: e});
                        }}
                      >
                        <Radio value="Fresh">Fresh</Radio>
                        <Radio value="Reissue ">Reissue </Radio>
                      </Radio.Group>
                      <p className="red">{Formerror.selecttypePassport}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Title</b>
                    </label>

                    <Form.Item>
                      <Select
                      placeholder="Please Select Title"
                      value={Data.title}
                      onChange={(e) => {
                        setData({...Data,title:e})
                      }}
                      >
                        <Select.Option value="Mr.">Mr.</Select.Option>
                        <Select.Option value="Mrs.">Mrs.</Select.Option>
                        <Select.Option value="Ms.">Ms.</Select.Option>
                      </Select>
                      <p className="red">{Formerror.title}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>First Name</b>
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
                      /><p className="red">{Formerror.firstName}</p>
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
                        placeholder="Please input your middle Name!"
                        value={Data.middleName}
                        onChange={(e) => {
                          setData({ ...Data, middleName: e.target.value });
                        }}
                      /><p className="red">{Formerror.middleName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Last Name</b>
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
                      /><p className="red">{Formerror.lastName}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Mobile No</b>
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
                      /><p className="red">{Formerror.mobileNumber}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Email</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please input your Email!"
                        value={Data.email}
                        onChange={(e) => {
                          setData({ ...Data, email: e.target.value });
                        }}
                      /><p className="red">{Formerror.email}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Gender</b>
                    </label>

                    <Form.Item>
                      <Radio.Group
                      value={Data.gender}
                        onChange={(e) => {
                          setData({ ...Data, gender: e.target.value });
                        }}
                      >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="others">Others</Radio>
                      </Radio.Group><p className="red">{Formerror.gender}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Date Of Birth</b>
                    </label>

                    <Form.Item>
                      <DatePicker
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                      /><p className="red">{Formerror.Dob}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                     <b>Place Of Birth</b> 
                    </label>

                    <Form.Item>
                      <Input
                        placeholder="Please input your Country Of Birth!"
                        
                        onChange={(e) => {
                          setData({ ...Data, pob: e.target.value });
                        }}
                      /><p className="red">{Formerror.pob}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Marital Status</b>
                    </label>

                    <Form.Item>
                      <Select placeholder="Plaese Select Marital Status"
                      value={Data.maritalStatus}
                      onChange={(e)=>{
                        setData({...Data,maritalStatus:e})
                      }}
                      >
                        <Select.Option value="Single">Single</Select.Option>
                        <Select.Option value="Married">Married</Select.Option>
                        <Select.Option value="Divorced">
                          Divorced
                        </Select.Option>
                        <Select.Option value="Window/Widower">
                          Window/Widower
                        </Select.Option>
                        <Select.Option value="Separated">
                          Separated
                        </Select.Option>
                      </Select>
                      <p className="red">{Formerror.maritalStatus}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Father First Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Father First Name!"
                        value={Data.father_firstName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            father_firstName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.father_firstName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Father Middle Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter Father Middle Name!"
                        value={Data.father_middleName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            father_middleName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.father_middleName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Father Last Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="please Enter  Father last name"
                        value={Data.father_lastName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            father_lastName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.father_lastName}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Mother First Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter Mother First Name!"
                        value={Data.mother_firstName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            mother_firstName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.mother_firstName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Mother Middle Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter mother Middle Name!"
                        value={Data.mother_middleName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            mother_middleName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.mother_middleName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Mother Last Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="please Enter Mother last name"
                        value={Data.mother_lastName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            mother_lastName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.mother_lastName}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Spouse First Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter Spouse First Name!"
                        value={Data.spouse_firstName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            spouse_firstName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.spouse_firstName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Spouse Middle Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter Spouse Middle Name!"
                        value={Data.spouse_middleName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            spouse_middleName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.spouse_middleName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Spouse Last Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="please Enter Mother last name"
                        value={Data.spouse_lastName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            spouse_lastName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.spouse_lastName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Present Address</b>
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
                      <TextArea
                        placeholder=" please Enter Present Address!"
                        value={Data.present_address}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            present_address: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Permanent Address Same as
                      Present Address?</b>
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
                          onClick={() => SetBrithAddress(true)}
                        >
                          No
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
         {BrithAddress && (
<>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Permanent Address</b>
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
                      <TextArea
                        placeholder=" please Enter Present Address!"
                        value={Data.permanantAdress}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            permanantAdress: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
</>
         )}
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Preferred Police Station</b> 
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Preferred Police Station!"
                        value={Data.preferred_policeStation}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            preferred_policeStation: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.preferred_policeStation}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Is either of your
                      parent(in case of minor)/spouse, a government servant?</b>
                    </label>

                    <Form.Item>
                      <Radio.Group
                      value={Data.isYourParents_governmentServant}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            isYourParents_governmentServant: e.target.value,
                          });
                        }}
                      >
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                      </Radio.Group>
                    </Form.Item><p className="red">{Formerror.isYourParents_governmentServant}</p>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Educational qualification?</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter Edgucation Qualification!"
                        value={Data.educationQualification}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            educationQualification: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.educationQualification}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Employment Type</b>
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select Type Of Employment!"
                        value={Data.employmentType}
                        onChange={(e) => {
                          setData({ ...Data, employmentType: e });
                        }}
                      >
                        <Select.Option value="Government">Government</Select.Option>
                        <Select.Option value="Homemaker">Homemaker</Select.Option>
                        <Select.Option value="Not Employee">Not Employee</Select.Option>
                        <Select.Option value="Private">Private</Select.Option>
                        <Select.Option value="PSU">PSU</Select.Option>
                        <Select.Option value="Retired Government Servent">Retired Government Servent</Select.Option>
                      </Select>
                      <p className="red">{Formerror.employmentType}</p>
                    </Form.Item>
                  </div>


                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Have you ever applied for passport, but not issued</b>
                    </label>

                    <Form.Item>
                    <Radio.Group
                    value={Data.appliedPassport}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            appliedPassport:
                              e.target.value,
                          });
                        }}
                      >
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">NO</Radio>
                      </Radio.Group>
                      <p className="red">{Formerror.appliedPassport}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Emergency Contact First
                      Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter Emergency Contact First Name!"
                        value={Data. EmergencyContact_FirstName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            EmergencyContact_FirstName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.EmergencyContact_FirstName}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b> Emergency Contact Middle
                      Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Plaese Enter Emergency Contact Middle Name!"
                        value={Data.EmergencyContact_middleName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            EmergencyContact_middleName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.EmergencyContact_middleName}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Emergency Contact Last
                      Name</b>
                    </label>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Please Enter Emergency Contact Last Name!"
                        value={Data.EmergencyContact_lastName}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            EmergencyContact_lastName: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.EmergencyContact_lastName}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      Emergency Contact Mobile Number
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
                        placeholder="Please Enter Emergency Contact Mobile Number!"
                        value={Data.EmergencyContact_mobileNO}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            EmergencyContact_mobileNO: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Emergency Address</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Please Enter Emergency Address!"
                        value={Data.EmergencyAddress}
                        onChange={(e) => {
                          setData({
                            ...Data,
                            EmergencyAddress: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.EmergencyAddress}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Create zip of all required
                        document and upload (Size - Maximum 8 MB) [Only
                        (pdf,PDF)] *
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              zipAllDocuments: e.target.files[0],
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
                      passid==undefined ?

                    <div className="col-md-1">
                      <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={(e) => SubmitPassForm(e)}>
                          Submit
                        </Button>
                      </Form.Item>
                    </div>
                    :
                    <div className="col-md-1">
                    <Form.Item>
                      <Button type="primary" htmlType="submit" onClick={(e) => editHandler(e)}>
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

export default PassportForm;