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
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import changeNumber from "../../Redux/reducers/reducers";
import swal from 'sweetalert';

const ShopActForm = () => {
  const { shopid }=useParams()
  const reducer = useSelector((state) => state.changeNumber);
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [form] = Form.useForm();


  
  const users = useSelector((state) => state.userData.user);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const SingleUser = users?.filter((ele) => ele._id === userData.user._id);
  // const Expence=useSelector((state)=>state.expence)
  // const recharges=useSelector((state)=>state.balance)
  const pricess=useSelector((state)=>state.price.formPrices)
  let userFormDetails = [];

  userFormDetails = pricess.filter(
    (item) => item.userID === userData.user._id
    );
    
    if (userFormDetails.length < 1) {
    userFormDetails = pricess.filter((item) => item.userID === "ALL");
   console.log(34, userFormDetails);
  }
  console.log(25, userFormDetails);

  const [balance, setBalance] = useState(0);
  console.log(277,balance);
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
    if (!values.title) {
      error.title = " Title is required";
    }
    if (!values.select_type) {
      error.select_type = " Select type is required";
    }
    if (!values.firstName) {
      error.firstName = " FullName  Is required";
    }
    if (!values.shopName) {
      error.shopName = " shop Name  is required";
    }
    if (!values.lastName) {
      error.lastName = " FullName  is required";
    }
    if (!values.middleName) {
      error.middleName = " middleName  is required";
    }
    if (!values.middleName) {
      error.middleName = " middleName  is required";
    }
    // if (!values.mobileNo) {
    //   error.mobileNo = " mobileNo is required";
    // }
    if (!values.shop_nature) {
      error.shop_nature = " shop_nature is required";
    }
    if (!values.email) {
      error.email = " mobileNo is required";
    }
    // if (!values.adharNumber) {
    //   error.adharNumber = " Adhar Number is required";
    // }
    if (!values.mobileNumber_registered_WithAdharCard) {
      error.mobileNumber_registered_WithAdharCard = " Mobile Number_registered_With AdharCard is required";
    }
    if (!values.gender) {
      error.gender = " gender is required";
    }
    if (!values.dob) {
      error.dob = " dob is required";
    }
     console.log("error object", error);
    return error;
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
  console.log(104,balance)

// console.log(29,pricess[0]?.voteCard

//   )



  const [docs, setDocs] = useState({
    shopact_ownerPassportPhoto: "",
    shopact_ownerSignatureAsPer_PAN: "",
    shopact_adharCard: "",
    shopact_shopPhotograph: "",
    shopact_selfDeclaration:"",
    shopact_ownerPANCard:"",
    shopact_oldShopActForRenewal:"",
  });
  // const [Data , SetData] = useState({
  //   select_type:"",
  //   title:"",
  //   firstName:"",
  //   middleName:"",
  //   lastName:"",
  //   mobileNo:"",
  //   email:"",
  //   adharNumber:"",
  //   mobileNumber_registered_WithAdharCard:"",
  //   gender:"",
  //   dob:"",
  //   residenceAddress:"",
  //   no_of_years_staying_in_residenceAddress:"",
  //   shopName:"",
  //   shop_nature:"",
  //   shopAddress_with_Pincode:"",
  //   IsShop_Rented:"",
  //   dateBusiness_Started:"",
  //   number_of_Employees:"",
  //   number_of_MenEmployees:"",
  //   number_of_WomenEmployees:"",
  // })
  const [partner, Setpartner]= useState({
    Partner1_Name: "",
    Partner1_mobileNumber: "",
    Partner1_email: "",
    Partner1_address: "",
    Partner2_Name: "",
    Partner2_mobileNumber: "",
    Partner2_email: "",
    Partner2_address: "",
    Partner3_Name: "",
    Partner3_mobileNumber: "",
    Partner3_email: "",
    Partner3_address: "",
    Partner4_Name: "",
    Partner4_mobileNumber: "",
    Partner4_email: "",
    Partner4_address:"",
    ownerPassport_photo:"",
    ownerSignatureAsPer_PAN:"",
    adharCard:"",
    shopPhotographFrom_FrontSide_WithBusinessBoard:"",
    selfDeclaration:"",
    ownerPANCard:"",
    oldShopAct_ForRenewal:"",
  })



  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [Data, SetData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "shopAct",
    status: "IN-PROGRESS",
    selectType: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    adharNumber: "",
    mobileNumber_registered_WithAdharCard: "",
    gender: "",
    dob: "",
    residenceAddress_same_AadharAddress: "",
    residenceAddress: "",
    no_of_years_staying_in_residenceAddress: "",
    shopName: "",
    shopAddress_with_Pincode: "",
    IsShop_Rented: "",
    natureOfBusiness: "",
    dateBusiness_Started: "",
    number_of_Employees: "",
    number_of_MenEmployees: "",
    number_of_WomenEmployees: "",
    Partner1_Name: "",
    Partner1_mobileNumber: "",
    Partner1_email: "",
    Partner1_address: "",
    Partner2_Name: "",
    Partner2_mobileNumber: "",
    Partner2_email: "",
    Partner2_address: "",
    Partner3_Name: "",
    Partner3_mobileNumber: "",
    Partner3_email: "",
    Partner3_address: "",
    Partner4_Name: "",
    Partner4_mobileNumber: "",
    Partner4_email: "",
    ownerPassport_photo: "",
    ownerSignatureAsPer_PAN: "",
    adharCard: "",
    shopPhotographFrom_FrontSide_WithBusinessBoard: "",
    selfDeclaration: "",
    ownerPANCard: "",
    oldShopAct_ForRenewal: "",
  });
  const handleDateChange = (date, dateString) => {
    SetData({ ...Data, dob: dateString });
  };
  const DateBissnessStarted = (date, dateString) => {
    SetData({ ...Data, dateBusiness_Started: dateString });
  };
  // const onshopActFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(Data);
  // };
  const [isVisible, setisVisible] = useState(false);

  console.log(25, userFormDetails);
  const [selectedRtoPricewe, setSelectedRtoPrice] = useState();
  const setFormPrice = (formType) => {
    switch (formType) {
      case "Shop Act new":
        {
          setSelectedRtoPrice(userFormDetails[0].shopActNew);
          setisVisible(true);
        }
        break;
      case "Shop Act Renewl":
        {
          setSelectedRtoPrice(userFormDetails[0].shopActReNew);
          setisVisible(true);
        }
        break;
      default:
        break;
    }
  };
  const postLDJData = (e) => {
    
    e.preventDefault();
    const errors = validate(Data);
    console.log("formErrors:", errors);
    if (Object.keys(errors).length === 0) {
      SetIsSubmit(true);
      swal("Good job!", "form submitted successfully!", "success");

    // console.log("Data:",Data)
    // console.log("partner:",partner)


    const obj={
      Data,
      partner,
    }
    console.log(obj);
    if(balance>selectedRtoPricewe){

  
    const mainDataPromise = new Promise((resolve, reject) => {
      // console.log(77, Data);
      axios
        .post(`https://mhebackend.payagain.in/api/shopact/create`, Data)
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
        // console.log(124,res.data)
       
        ownerPassport(res.data.data._id);
        ownerSignatureAsPer(res.data.data._id);
        adharCard(res.data.data._id);
        shopPhotographFrom(res.data.data._id);
        selfDeclaration(res.data.data._id);
        ownerPANCard(res.data.data._id);
        oldShopAct(res.data.data._id);
          debitFormBalance()
        
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      toast.error("Please Recharge")
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
    expenceFor:"ShopAct"
  }
  console.log(146,obj)
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
  const ownerPassport = (id) => {
    const formData = new FormData();
    formData.append("ownerPassport_photo", docs.shopact_ownerPassportPhoto);
    axios
      .put(`https://mhebackend.payagain.in/api/shopact_ownerPassportPhoto/${id}`, formData)
      .then((res) => console.log("addressUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const ownerSignatureAsPer = (id) => {
    console.log(143, id);
    const formData = new FormData();
    formData.append("ownerSignatureAsPer_PAN", docs.shopact_ownerSignatureAsPer_PAN);
    axios
      .put(`https://mhebackend.payagain.in/api/shopact_ownerSignatureAsPer_PAN/${id}`, formData)
      .then((res) => console.log("ageProofUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const adharCard = (id) => {
    const formData = new FormData();
    formData.append("adharCard", docs.shopact_adharCard);
    axios
      .put(`https://mhebackend.payagain.in/api/shopact_adharCard/${id}`, formData)
      .then((res) => console.log("passportSizeUploadaed", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const shopPhotographFrom = (id) => {
    const formData = new FormData();
    formData.append("shopPhotographFrom_FrontSide_WithBusinessBoard", docs.shopact_shopPhotograph);
    axios
      .put(`https://mhebackend.payagain.in/api/shopact_shopPhotograph/${id}`, formData)
      .then((res) => console.log("ageDeclarationForm Uploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const selfDeclaration = (id) => {
    const formData = new FormData();
    formData.append("selfDeclaration", docs.shopact_selfDeclaration);
    axios
      .put(`https://mhebackend.payagain.in/api/shopact_selfDeclaration/${id}`, formData)
      .then((res) => console.log("ageDeclarationForm Uploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const ownerPANCard = (id) => {
    const formData = new FormData();
    formData.append("ownerPANCard", docs.shopact_ownerPANCard);
    axios
      .put(`https://mhebackend.payagain.in/api/shopact_ownerPANCard/${id}`, formData)
      .then((res) => console.log("ageDeclarationForm Uploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const oldShopAct = (id) => {
    const formData = new FormData();
    formData.append("oldShopAct_ForRenewal", docs.shopact_oldShopActForRenewal);
    axios
      .put(`https://mhebackend.payagain.in/api/shopact_oldShopActForRenewal/${id}`, formData)
      .then((res) => console.log("ageDeclarationForm Uploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    if (shopid!= undefined) {
      axios.get(`https://mhebackend.payagain.in/api/shopact/${shopid}`).then((res) => {
        const data = res.data[0];
      
        console.log('data',data)
        SetData(data);

      });
    }
  }, [shopid]);



  const editHandler = (e) => {

    e.preventDefault()
  
    const obj={

      ...Data ,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "shopAct",
      status: "IN-PROGRESS",  
    }

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/shopact/${shopid}`, obj)
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
       
        ownerPassport(res.data._id);
        ownerSignatureAsPer(res.data._id);
        adharCard(res.data._id);
        shopPhotographFrom(res.data._id);
        selfDeclaration(res.data._id);
        ownerPANCard(res.data._id);
        oldShopAct(res.data._id);

      })
      .catch((err) => {
        console.log(err);
      });
    
  };
  return (

    <Fragment>
    <Breadcrumb title={"Shop Act Form"} />
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
                      <span className="red">*</span> <b>Select Type</b>
                    </label>
                    <Form.Item>
                        <Select
                          placeholder="Select Type OF Cast!"
                          onChange={(e) => {
                            SetData({ ...Data, selectType: e });
                            setFormPrice(e)
                          }}
                        >
                          <Select.Option value="Shop Act new">
                            Shop Act New
                          </Select.Option>
                          <Select.Option value="Shop Act Renew">
                            Shop Act Renew
                          </Select.Option>
                        </Select>
                      </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Title</b>
                    </label>

                    <Form.Item>
                      <Select  placeholder="Select Type OF Cast!"
                      value={Data.title}
                        onChange={(e) => {
                          SetData({ ...Data, title: e });
                        }}>
                        <Select.Option value="Mr.">Mr.</Select.Option>
                        <Select.Option value="Mrs.">Mrs.</Select.Option>
                        <Select.Option value="Ms.">Ms.</Select.Option>
                      </Select> <p className="red">{Formerror.title}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>First Name</b>
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
                        onChange={(e) => 
                          SetData({ ...Data, firstName: e.target.value })
                        }
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
                          SetData({ ...Data, middleName: e.target.value });
                        }}
                      />
                      <p className="red">{Formerror.middleName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Last Name</b>
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
                          SetData({ ...Data, lastName: e.target.value });
                        }}
                      /><p className="red">{Formerror.lastName}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Mobile Number</b>
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
                        placeholder="Please input your Full Name as per Records!"
                        value={Data.mobileNo}
                        onChange={(e) => {
                          SetData({ ...Data, mobileNo: e.target.value });
                        }}
                      /><p className="red">{Formerror.mobileNo}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>Email</b>
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
                        placeholder="Please input your Full Name as per Records!"
                        value={Data.email}
                        onChange={(e) => {
                          SetData({ ...Data, email: e.target.value });
                        }}
                      /><p className="red">{Formerror.email}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> <b>AADHAAR Number</b>
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
                        placeholder="Please input your Full Name as per Records!"
                        value={Data.adharNumber}
                        onChange={(e) => {
                          SetData({ ...Data, adharNumber: e.target.value });
                        }}
                      /><p className="red">{Formerror.adharNumber}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Mobile number registered
                      with Aadhar card?</b>
                    </label>

                    <Form.Item>
                      <Radio.Group
                      value={Data.mobileNumber_registered_WithAdharCard}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            mobileNumber_registered_WithAdharCard:
                              e.target.value,
                          });
                        }}
                      >
                        <Radio value="yes">yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group><p className="red">{Formerror.mobileNumber_registered_WithAdharCard}</p>
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
                          SetData({ ...Data, gender: e.target.value });
                        }}
                      >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="others">Others</Radio><p className="red">{Formerror.gender}</p>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Date Of Birth</b>
                    </label>

                    <Form.Item>
                      <DatePicker
                        placeholder="Date Of Birth"
                        onChange={handleDateChange}
                      />
                      <p className="red">{Formerror.dob}</p>
                    </Form.Item>
                  </div>
                  
<>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Residence Address</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Enter Residence Address"
                        value={Data.residenceAddress}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            residenceAddress: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  </>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>No. of years staying in
                      Residence Address*</b>
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
                        value={Data.no_of_years_staying_in_residenceAddress}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            no_of_years_staying_in_residenceAddress:
                              e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Shop/Business Name</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Shop/Business Name"
                        value={Data.shopName}
                        onChange={(e) => {
                          SetData({ ...Data, shopName: e.target.value });
                        }}
                      /><p className="red">{Formerror.shopName}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Shop/Business Nature</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Shop/Business Nature"
                        value={Data.shop_nature}
                        onChange={(e) => {
                          SetData({ ...Data, shop_nature: e.target.value });
                        }}
                      /> <p className="red">{Formerror.shop_nature}</p>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Shop Address with Pincode </b> 
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
                        placeholder="Enter Shop Address with Pincode "
                        value={Data.shopAddress_with_Pincode}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            shopAddress_with_Pincode: e.target.value,
                          });
                        }}
                      /><p className="red">{Formerror.shopAddress_with_Pincode}</p>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span><b>Is Shop Rented?*</b>
                    </label>

                    <Form.Item>
                      <Radio.Group
                        value={Data.IsShop_Rented}
                        onChange={(e) => {
                          SetData({ ...Data, IsShop_Rented: e.target.value });
                        }}
                      >
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Date Business was Started</b>
                    </label>

                    <Form.Item>
                      <DatePicker
                        placeholder="Date Of Birth"
                        onChange={DateBissnessStarted}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Number of Employees </b>
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
                        placeholder="Enter Number of Employees *"
                        value={Data.number_of_Employees}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            number_of_Employees: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Number of Men Employees</b> 
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Number of Men Employees"
                        value={Data.number_of_MenEmployees}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            number_of_MenEmployees: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Number of Women Employees</b>
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                      value={Data.number_of_WomenEmployees}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            number_of_WomenEmployees: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Partner 1 Name</b>
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
                          Setpartner({ ...partner, Partner1_Name: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Partner 1 Mobile Number</b>
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
                       
                        onChange={(e) => {
                          Setpartner({
                            ...partner,
                            Partner1_mobileNumber: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Partner 1 Email</b>
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
                          Setpartner({
                            ...partner,
                            Partner1_email: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Partner 1 Address</b>
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
                          Setpartner({
                            ...partner,
                            Partner1_address: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Partner 2 Name</b>
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
                          Setpartner({ ...partner, Partner2_Name: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Partner 2 Mobile Number</b>
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
                        value={Data.Partner2_mobileNumber}
                        onChange={(e) => {
                          Setpartner({
                            ...partner,
                            Partner2_mobileNumber: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                    <b>Partner 2 Email</b>
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
                          Setpartner({
                            ...partner,
                            Partner2_email: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Partner 2 Address</b>
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
                          Setpartner({
                            ...partner,
                            Partner2_address: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                    <b>Partner 3 Name</b>
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
                          Setpartner({ ...partner, Partner3_Name: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Partner 3 Mobile Number</b>
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
                      
                        onChange={(e) => {
                          Setpartner({
                            ...partner,
                            Partner3_mobileNumber: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Partner 3 Email</b>
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
                          Setpartner({
                            ...partner,
                            Partner3_email: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Partner 3 Address</b>
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
                          Setpartner({
                            ...partner,
                            Partner3_address: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Partner 4 Name</b>
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
                          Setpartner({ ...partner, Partner4_Name: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <b>Partner 4 Mobile Number</b>
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
                     
                        onChange={(e) => {
                          Setpartner({
                            ...partner,
                            Partner4_mobileNumber: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Partner 4 Email</b>
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
                          Setpartner({
                            ...partner,
                            Partner4_email: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <label htmlFor="" className="mb-3">
                      {" "}
                     <b>Partner 4 Address</b>
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
                          Setpartner({
                            ...partner,
                            Partner4_address: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>

                    <div className="col-md-12">
                      <h5>Upload required documents: </h5>
                      <h6>
                        अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक
                        कागदपत्रे तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक
                        कागदपत्रे चुकीची किंवा अस्पष्ट आढळल्यास सदर चा अर्ज
                        फेटाळला जाऊ शकतो.{" "}
                      </h6>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Owner Passport photo (Size - Maximum 5 Kb to 20 Kb (photo length 160 pixels * width 200 pixels)) [Only (jpg,jpeg)] 
                      </label>
                            
                        <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              shopact_ownerPassportPhoto: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Owner Signature As Per PAN (Size - Maximum 5 Kb to 20 Kb (photo length 256 pixels * wide 64)) [Only (jpg,jpeg)]
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              shopact_ownerSignatureAsPer_PAN: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                            
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Aadhar Card (Size - Maximum 75 Kb to 100 Kb) [Only (jpg,jpeg,pdf)] 
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              shopact_adharCard: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>
               
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Shop Photograph From Front Side With Business Board (Size - Maximum 75 Kb to 100 Kb) [Only (jpg,jpeg)]
                      </label>
                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              shopact_shopPhotograph: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Self Declaration (Size - Maximum 1 MB) [Only (jpg,jpeg,pdf)] 
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              shopact_selfDeclaration: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Owner PAN Card (Size-Maximum 75 Kb to 100 Kb) [Only (jpg,jpeg)]
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              shopact_ownerPANCard: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Old Shop Act For Renewal (Min 60 Days Before Of Expiry) (Size - Maximum 75 Kb to 100 Kb) [Only (jpg,jpeg)] ]
                      </label>

                      <input type="file" name="" id=""  onChange={(e) => {
                            setDocs({
                              ...docs,
                              shopact_oldShopActForRenewal: e.target.files[0],
                            });
                            // console.log(992,e);
                          }}/>
                    </div>
                  </div>
                  <div className="row">
                    {
                      shopid==undefined ?

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
                        Submit
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

export default ShopActForm;