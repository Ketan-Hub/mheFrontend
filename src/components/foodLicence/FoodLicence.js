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

const FoodLicence = () => {
  const [form] = Form.useForm();
  const { fid }=useParams()
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  // console.log(277,Expence);
  const [balance, setBalance] = useState(0);
  const reducer = useSelector((state) => state.changeNumber);
  const [isVisible, setisVisible] = useState(false);
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
          const userFormDetails = response.filter((item) => item.userID === userData.user._id);
         setuserFormDetails(userFormDetails);
        }
      })
      .catch((err) => console.log(40, err));
  }, []);
  const [selectedRtoPricewe, setSelectedRtoPrice] = useState();
  const setFormPrice = (formType) => {
    switch (formType) {
      case "Food Licence(1 Year)":
        {
          setSelectedRtoPrice(userFormDetails[0].foodLicense1year);
          setisVisible(true);
        }
        break;
      case "Food Licence(2 Year)":
        {
          setSelectedRtoPrice(userFormDetails[0].foodLicense2year);
          setisVisible(true);
        }
        break;
      case "Food Licence(3 Year)":
        {
          setSelectedRtoPrice(userFormDetails[0].foodLicense3year);
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
    if (!values.no_OF_years) {
      error.no_OF_years = " No OF years type is required";
    }
    if (!values.title) {
      error.title = " Title is required";
    }
    if (!values.firstName) {
      error.firstName = " FirstName Is required";
    }
    if (!values.middleName) {
      error.middleName = " Middle Name Is required";
    }
    if (!values.lastName) {
      error.lastName = " Last Name Is required";
    }
    if (!values.mobileNO) {
      error.mobileNO = " Last Name Is required";
    }
    if (!values.mobileNO) {
      error.mobileNO = " Last Name Is required";
    }
    if (!values.email) {
      error.email = " Email Is required";
    }
    if (!values.natureBusiness) {
      error.natureBusiness = "Nature Business Is required";
    }
    if (!values.businessName) {
      error.businessName = "Business Name Is required";
    }
    if (!values.shopAddess) {
      error.shopAddess = "Shop Addess Is required";
    }
    console.log("error object", error);
    return error;
  }

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
    adharCard_businessOwner: "",
    passportSize_Photo_businessOwner: "",
    declaration_businessOwner: "",
    affidavitFrom_businessOwner: "",
    electricBill_businessPlace: "",
    rentAgreement: "",
  });
  const [Data, setData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "foodLicence",
    status: "IN-PROGRESS",
    no_OF_years: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNO: "",
    email: "",
    businessName: "",
    shopAddess: "",
    natureBusiness: "",
  });


  const FoodLicecenceForm = (e) => {
    console.log(Data);
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
    if (balance > selectedRtoPricewe) {
      const mainDataPromise = new Promise((resolve, reject) => {
        axios
          .post(`https://mhebackend.payagain.in/api/foodLicence/create`, Data)
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

          uploadadharCard_businessOwner(res.data.data._id);
          uploadpassportSize_Photo_businessOwner(res.data.data._id);
          uploaddeclaration_businessOwner(res.data.data._id);
          uploadapplicationForm(res.data.data._id);
          uploadelectricBill_businessPlace(res.data.data._id);
          uploadrentAgreement(res.data.data._id);
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
};
  // foodLicence
  const obj = {
    user: userData?.user._id,
    mode: "offline",
    amount: selectedRtoPricewe,
    isExpence: true,
    expenceFor: "foodLicence",
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
  const uploadadharCard_businessOwner = (id) => {
    const formData = new FormData();
    formData.append("adharCard_businessOwner", docs.adharCard_businessOwner);
    axios
      .put(`https://mhebackend.payagain.in/api/foodLicence_adharCard/${id}`, formData)
      .then((res) => console.log("adharCard_businessOwner", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadpassportSize_Photo_businessOwner = (id) => {
    const formData = new FormData();
    formData.append(
      "passportSize_Photo_businessOwner",
      docs.passportSize_Photo_businessOwner
    );
    axios
      .put(`https://mhebackend.payagain.in/api/foodLicence_passport/${id}`, formData)
      .then((res) => console.log("addressProof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploaddeclaration_businessOwner = (id) => {
    const formData = new FormData();
    formData.append(
      "declaration_businessOwner",
      docs.declaration_businessOwner
    );
    axios
      .put(`https://mhebackend.payagain.in/api/foodLicence_decBussOner/${id}`, formData)
      .then((res) => console.log("declaration_businessOwner", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadapplicationForm = (id) => {
    const formData = new FormData();
    formData.append(
      "affidavitFrom_businessOwner",
      docs.affidavitFrom_businessOwner
    );
    axios
      .put(
        `https://mhebackend.payagain.in/api/affidavitFrom_businessOwner/${id}`,
        formData
      )
      .then((res) => console.log("applicationForm", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadelectricBill_businessPlace = (id) => {
    const formData = new FormData();
    formData.append(
      "electricBill_businessPlace",
      docs.electricBill_businessPlace
    );
    axios
      .put(`https://mhebackend.payagain.in/api/foodLicence_electricBill/${id}`, formData)
      .then((res) => console.log("identityProof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadrentAgreement = (id) => {
    const formData = new FormData();
    formData.append("rentAgreement", docs.rentAgreement);
    axios
      .put(
        `https://mhebackend.payagain.in/api/foodLicence_rentAggrement/${id}`,
        formData
      )
      .then((res) => console.log("Passport_Size_Photo", res.data))
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    if (fid!= undefined) {
      axios.get(`https://mhebackend.payagain.in/api/foodLicence/${fid}`).then((res) => {
        const data = res.data[0];
      
        console.log('data',data)
        setData(data);

      });
    }
  }, [fid]);



  const editHandler = (e) => {

    e.preventDefault()
   

    const obj={

      ...Data ,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "foodLicence",
      status: "IN-PROGRESS",  
    }

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/foodLicence/${fid}`, obj)
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
       
        uploadadharCard_businessOwner(res.data._id);
        uploadpassportSize_Photo_businessOwner(res.data._id);
        uploaddeclaration_businessOwner(res.data._id);
        uploadapplicationForm(res.data._id);
        uploadelectricBill_businessPlace(res.data._id);
        uploadrentAgreement(res.data._id);
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  return (
    // <Fragment>
    //   <Breadcrumb title={"Food Licence"} />
    //   {isVisible && <h3>{` Form Price :${selectedRtoPricewe}`}</h3>}

    //   <Container fluid={true}>
    //     <Row>
    //       <Col sm="">
    //         <Card>
    //           <CardBody>
    //             <Form name="basic" autoComplete="off" layout={"vertical"}>
    //               <div className="row">
    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>Licence Require No. Of
    //                     Years
    //                   </label>
    //                   <Form.Item>
    //                     <Select
    //                       placeholder="Please input your Service Type"
    //                       onChange={(e) => {
    //                         setData({ ...Data, no_OF_years: e });
    //                         setFormPrice(e);
    //                       }}
    //                     >
    //                       <Select.Option value="Food Licence(1 Year)">
    //                         Food Licence(1 Year)
    //                       </Select.Option>
    //                       <Select.Option value="Food Licence(2 Year)">
    //                         Food Licence(2 Year)
    //                       </Select.Option>
    //                       <Select.Option value="Food Licence(3 Year)">
    //                         Food Licence(3 Year)
    //                       </Select.Option>
    //                     </Select>
    //                   </Form.Item>
    //                 </div>

    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span> Title
    //                   </label>

    //                   <Form.Item>
    //                     <Select
    //                       placeholder="Select Title"
    //                       onChange={(e) => {
    //                         setData({ ...Data, title: e });
    //                       }}
    //                     >
    //                       <Select.Option value="Mr">Mr</Select.Option>
    //                       <Select.Option value="Mrs">Mrs</Select.Option>
    //                       <Select.Option value="Ms">Ms</Select.Option>
    //                     </Select>
    //                   </Form.Item>
    //                 </div>
    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>First Name
    //                   </label>

    //                   <Form.Item
    //                     rules={[
    //                       {
    //                         required: true,
    //                         message: "Please input your First Name!",
    //                       },
    //                     ]}
    //                   >
    //                     <Input
    //                       placeholder="Please input your First Name!"
    //                       onChange={(e) => {
    //                         setData({ ...Data, firstName: e.target.value });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>
    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span> Middle Name
    //                   </label>

    //                   <Form.Item
    //                     rules={[
    //                       {
    //                         required: true,
    //                         message: "Please input your middle Name!",
    //                       },
    //                     ]}
    //                   >
    //                     <Input
    //                       placeholder="Please input your middle Name"
    //                       onChange={(e) => {
    //                         setData({ ...Data, middleName: e.target.value });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>

    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span> Last Name
    //                   </label>

    //                   <Form.Item
    //                     rules={[
    //                       {
    //                         required: true,
    //                         message: "Please input your Last Name!",
    //                       },
    //                     ]}
    //                   >
    //                     <Input
    //                       placeholder="Please input your Last Name!"
    //                       onChange={(e) => {
    //                         setData({ ...Data, lastName: e.target.value });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>
    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>Mobile Number
    //                   </label>

    //                   <Form.Item
    //                     rules={[
    //                       {
    //                         required: true,
    //                         message: "Please input your Mobile Number!",
    //                       },
    //                     ]}
    //                   >
    //                     <Input
    //                       type="Number"
    //                       placeholder="Please input your Mobile Number!"
    //                       onChange={(e) => {
    //                         setData({ ...Data, mobileNO: e.target.value });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>

    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>Email
    //                   </label>

    //                   <Form.Item
    //                     rules={[
    //                       {
    //                         required: true,
    //                         // message: "Please input your Email!",
    //                       },
    //                     ]}
    //                   >
    //                     <Input
    //                       placeholder="Please input your Email!"
    //                       onChange={(e) => {
    //                         setData({ ...Data, email: e.target.value });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>

    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span> Business Name
    //                   </label>

    //                   <Form.Item rules={[]}>
    //                     <TextArea
    //                       rows={2}
    //                       placeholder="Please input your Reason!"
    //                       onChange={(e) => {
    //                         setData({ ...Data, businessName: e.target.value });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>
    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>Shop Address
    //                   </label>

    //                   <Form.Item rules={[]}>
    //                     <TextArea
    //                       rows={2}
    //                       placeholder="Please input your Address!"
    //                       onChange={(e) => {
    //                         setData({ ...Data, shopAddess: e.target.value });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>
    //                 <div className="col-md-4">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>Nature Of Business
    //                   </label>

    //                   <Form.Item rules={[]}>
    //                     <TextArea
    //                       rows={2}
    //                       placeholder="Please input your Address!"
    //                       onChange={(e) => {
    //                         setData({
    //                           ...Data,
    //                           natureBusiness: e.target.value,
    //                         });
    //                       }}
    //                     />
    //                   </Form.Item>
    //                 </div>

    //                 <div className="col-md-12">
    //                   <h5>Upload required documents: </h5>
    //                   <h6>
    //                     अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक
    //                     कागदपत्रे तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक
    //                     कागदपत्रे चुकीची किंवा अस्पष्ट आढळल्यास सदर चा अर्ज
    //                     फेटाळला जाऊ शकतो.{" "}
    //                   </h6>
    //                 </div>

    //                 <div className="col-md-12">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>Adhaar Card of the
    //                     Business Owner/any one Partner (Size - Maximum 270 Kb)
    //                     [Only (jpg,jpeg,pdf)]*
    //                   </label>

    //                   <input
    //                     type="file"
    //                     name=""
    //                     id=""
    //                     onChange={(e) => {
    //                       setDocs({
    //                         ...docs,
    //                         adharCard_businessOwner: e.target.files[0],
    //                       });
    //                       // console.log(992,e);
    //                     }}
    //                   />
    //                 </div>

    //                 <div className="col-md-12">
    //                   <label htmlFor="" className="mb-3">
    //                     {" "}
    //                     <span className="red">*</span>Passport Size Photo of the
    //                     Business Owner/any one Partner (Size - Maximum 17 Kb)
    //                     [Only (jpg,jpeg)]
    //                   </label>
    //                   {/* adharCard_businessOwner: "",
    // passportSize_Photo_businessOwner: "",
    // declaration_businessOwner: "",
    // affidavitFrom_businessOwner: "",
    // electricBill_businessPlace: "",
    // rentAgreement: "", */}
    //                   <input
    //                     type="file"
    //                     name=""
    //                     id=""
    //                     onChange={(e) => {
    //                       setDocs({
    //                         ...docs,
    //                         passportSize_Photo_businessOwner: e.target.files[0],
    //                       });
    //                       // console.log(992,e);
    //                     }}
    //                   />
    //                 </div>

    //                 <div className="col-md-12">
    //                   <label htmlFor="" className="mb-3">
    //                     Declaration of the Business owner/any one Partner (Size
    //                     - Maximum 216 Kb) [Only (jpg,jpeg,pdf)]
    //                   </label>

    //                   <input
    //                     type="file"
    //                     name=""
    //                     id=""
    //                     onChange={(e) => {
    //                       setDocs({
    //                         ...docs,
    //                         declaration_businessOwner: e.target.files[0],
    //                       });
    //                       // console.log(992,e);
    //                     }}
    //                   />
    //                 </div>
    //                 {/* <div className="col-md-12">
    //                   <label htmlFor="" className="mb-3">
    //                     Affidavit from Business owner/any one Partner (Size -
    //                     Maximum 500 Kb) [Only (jpg,jpeg,pdf)]
    //                   </label>

    //                 </div> */}
    //                 <div className="col-md-12">
    //                   <label htmlFor="" className="mb-3">
    //                     Passport Size Photo (Size - Maximum 5 Kb to 20 Kb (
    //                     resize Width 160 × Height 212) [Only (jpg,jpeg,pdf)]
    //                   </label>

    //                   <input
    //                     type="file"
    //                     name=""
    //                     id=""
    //                     onChange={(e) => {
    //                       setDocs({
    //                         ...docs,
    //                         affidavitFrom_businessOwner: e.target.files[0],
    //                       });
    //                       // console.log(992,e);
    //                     }}
    //                   />
    //                 </div>
    //                 <div className="col-md-12">
    //                   <label htmlFor="" className="mb-3">
    //                     Electric Bill of the Business place (Size - Maximum 500
    //                     Kb) [Only (jpg,jpeg,pdf)]
    //                   </label>

    //                   <input
    //                     type="file"
    //                     name=""
    //                     id=""
    //                     onChange={(e) => {
    //                       setDocs({
    //                         ...docs,
    //                         electricBill_businessPlace: e.target.files[0],
    //                       });
    //                       // console.log(992,e);
    //                     }}
    //                   />
    //                 </div>
    //                 <div className="col-md-12">
    //                   <label htmlFor="" className="mb-3">
    //                     Rent agreement/NOC from the business place owner
    //                     properly notarized (Size - Maximum 500 Kb) [Only
    //                     (jpg,jpeg,pdf)]
    //                   </label>

    //                   <input
    //                     type="file"
    //                     name=""
    //                     id=""
    //                     onChange={(e) => {
    //                       setDocs({
    //                         ...docs,
    //                         rentAgreement: e.target.files[0],
    //                       });
    //                       // console.log(992,e);
    //                     }}
    //                   />
    //                 </div>
    //               </div>
    //               <div className="row">
    //                 <div className="col-md-1">
    //                   <Form.Item>
    //                     <Button
    //                       type="primary"
    //                       htmlType="submit"
    //                       onClick={(e) => {
    //                         FoodLicecenceForm(e);
    //                       }}
    //                     >
    //                       Submit
    //                     </Button>
    //                   </Form.Item>
    //                 </div>
    //               </div>
    //             </Form>
    //           </CardBody>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Fragment>

    <Fragment>
      <Breadcrumb title={"Food Licence"} />
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
                        <span className="red">*</span><b>Licence Require No. Of
                        Years</b>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="Please input your Service Type"
                          value={Data.no_OF_years}
                          onChange={(e) => {
                            setData({ ...Data, no_OF_years: e });
                            setFormPrice(e);
                          }}
                        >
                          <Select.Option value="Food Licence(1 Year)">
                            Food Licence(1 Year)
                          </Select.Option>
                          <Select.Option value="Food Licence(2 Year)">
                            Food Licence(2 Year)
                          </Select.Option>
                          <Select.Option value="Food Licence(3 Year)">
                            Food Licence(3 Year)
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
                        /> <p className="red">{Formerror.middleName}</p>
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
                            setData({ ...Data, lastName: e.target.value });
                          }}
                        /> <p className="red">{Formerror.lastName}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Mobile Number</b>
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
                          value={Data.mobileNO}
                          onChange={(e) => {
                            setData({ ...Data, mobileNO: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.mobileNO}</p>
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
                        /> <p className="red">{Formerror.email}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Business Name</b>
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={2}
                          placeholder="Please input your Reason!"
                          value={Data.businessName}
                          onChange={(e) => {
                            setData({ ...Data, businessName: e.target.value });
                          }}
                        /><p className="red">{Formerror.businessName}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Shop Address</b>
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={2}
                          placeholder="Please input your Address!"
                          value={Data.shopAddess}
                          onChange={(e) => {
                            setData({ ...Data, shopAddess: e.target.value });
                          }}
                        /><p className="red">{Formerror.shopAddess}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Nature Of Business</b>
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={2}
                          placeholder="Please input your Address!"
                          value={Data.natureBusiness}
                          onChange={(e) => {
                            setData({
                              ...Data,
                              natureBusiness: e.target.value,
                            });
                          }}
                        /><p className="red">{Formerror.natureBusiness}</p>
                      </Form.Item>
                    </div>
                    </div>
                    <div className="col-md-6" style={{marginLeft:"793px"}}>
                      <h5>Forms: </h5>
                          <u>
                            <b><a href="upload_frms.php?file=Gazette_DOB_Change_Form_English.pdf" >  Declaration Form
</a></b>
                          </u>
                          <br/>
                          </div>
                    <div className="col-md-12">
                      <h5>Upload required documents: </h5>
                     
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Adhaar Card of the
                        Business Owner/any one Partner (Size - Maximum 270 Kb)
                        [Only (jpg,jpeg,pdf)]*
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            adharCard_businessOwner: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Passport Size Photo of the
                        Business Owner/any one Partner (Size - Maximum 17 Kb)
                        [Only (jpg,jpeg)]
                      </label>
                      {/* adharCard_businessOwner: "",
    passportSize_Photo_businessOwner: "",
    declaration_businessOwner: "",
    affidavitFrom_businessOwner: "",
    electricBill_businessPlace: "",
    rentAgreement: "", */}
                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            passportSize_Photo_businessOwner: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Declaration of the Business owner/any one Partner (Size
                        - Maximum 216 Kb) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            declaration_businessOwner: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    {/* <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Affidavit from Business owner/any one Partner (Size -
                        Maximum 500 Kb) [Only (jpg,jpeg,pdf)]
                      </label>

                    </div> */}
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
                            affidavitFrom_businessOwner: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Electric Bill of the Business place (Size - Maximum 500
                        Kb) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            electricBill_businessPlace: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        Rent agreement/NOC from the business place owner
                        properly notarized (Size - Maximum 500 Kb) [Only
                        (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            rentAgreement: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                  
                  <h5 className="red">
                        अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक
                        कागदपत्रे तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक
                        कागदपत्रे चुकीची किंवा अस्पष्ट आढळल्यास सदर चा अर्ज
                        फेटाळला जाऊ शकतो.{" "}
                      </h5>
                  <div className="row">
                    {
                      fid==undefined ? 
                      <div className="col-md-1">
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={(e) => {
                            FoodLicecenceForm(e);
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


                    }
                   
                  
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

export default FoodLicence;
