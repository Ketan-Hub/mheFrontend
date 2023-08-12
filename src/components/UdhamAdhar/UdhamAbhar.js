import React from "react";
import axios from "axios";
import { MdUploadFile } from "react-icons/md";
import { Cired } from "react-icons/ci";
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
// import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import changeNumber from "../../Redux/reducers/reducers";
// import { incNumber } from "../../Redux/actions";
import TextArea from "antd/es/input/TextArea";
import swal from 'sweetalert';

const UdhamAbhar = () => {
  const { udhamid }=useParams()
  const reducer = useSelector((state) => state.changeNumber);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  const [id, setId] = useState();
  // const [data, setData] = useState();
  const users = useSelector((state) => state.userData.user);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const SingleUser = users?.filter((ele) => ele._id === userData?.user?._id);
  
  const [balance, setBalance] = useState(0);
  console.log(34, balance);
  const [Formerror, setFormerror] = useState({});
  const [isSubmit, SetIsSubmit] = useState(false);
  const[ userFormDetails,setuserFormDetails]=useState([]) ;

    // console.log(35,userFormDetails)
    useEffect(() => {
      // Define a variable to store the timeout ID.
      let timeoutId;
  
      // Function to fetch data using Axios.
      const fetchData = () => {
        axios
          .get(`https://mhebackend.payagain.in/api/formPrice`)
          .then((res) => {
            const response = res.data;
            console.log("okkkk")
            if (response.userID !== userData.user._id) {
              const filteredDetails = response.filter((item) => item.userID === 'ALL');
              setuserFormDetails(filteredDetails);
            } else {
              const filteredDetails = response.filter((item) => item.userID === userData.user._id);
              setuserFormDetails(filteredDetails); 
            }
          })
          .catch((err) => console.log(40, err));
        };
      timeoutId = setTimeout(fetchData, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);
useEffect(() => {
  console.log(Formerror);
  if (Object.keys(Formerror).length == 0 && isSubmit) {
    console.log(Data);
  }
}, [Formerror]);
const validate = (values) => {
  const error = {};
  if (!values.Title) {
    error.Title = " Title is required";
  }
  if (!values.Owner_Name) {
    error.Owner_Name = " FullName English is required";
  }
  // if (!values.Adhar_Card_no) {
  //   error.Adhar_Card_no = "Adhar_Card_no Is required";
  // }
  if (!values.Social_Category) {
    error.Social_Category = "Social Category is required";
  }
  if (!values.Gender) {
    error.Gender = " Gender is required";
  }
  if (!values.Shop_Name) {
    error.Shop_Name = " Shop_Name is required";
  }
  if (!values.Mobile_Number) {
    error.Mobile_Number = " Mobile_Number is required";
  }
  if (!values.email) {
    error.email = " Email is required";
  }
  if (!values.Shop_Address) {
    error.Shop_Address = " Shop Address is required";
  }
  if (!values.Bank_IFSC_Code) {
    error.Bank_IFSC_Code = " Bank_IFSC_Code is required";
  }
  if (!values.Bank_Name) {
    error.Bank_Name = " Bank_Name is required";
  }
  // if (!values.Bank_Account_Number) {
  //   error.Bank_Account_Number = "Bank_Account_Number is required";
  // }
  if (!values.Nature_Of_Business) {
    error.Nature_Of_Business = " Nature_Of_Business is required";
  }
  console.log("error object", error);
  return error;
};
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));
    if (userData) {
      axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
        console.log(88, res.data);

        const allData = res.data.filter(
          (ele) => ele.user === userData?.user?._id
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

  const [docs, setDocs] = useState({
    udhamAbhar_AadharUploadCard: "",
    udhamAbhar_PanUploadCard: "",
    udhamAbhar_Passport: "",
    udhamAbhar_BankUploadPassbook: "",
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [Data, setData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "udhamAdhar",
    status: "IN-PROGRESS",
    Title: "",
    Owner_Name: "",
    PAN_Card: "",
    Adhar_Card_no: "",
    GST_Number: "",
    Social_Category: "",
    Gender: "",
    Shop_Name: "",
    Mobile_Number: "",
    email: "",
    Number_of_Employee: "",
    Business_redted_Date: "",
    Shop_Address: "",
    Nature_Of_Business: "",
    Investment_Rs: "",
    Bank_Name: "",
    Bank_Account_Number: "",
    Bank_IFSC_Code: "",
    Aadhar_Upload_Card: "",
    emergency_mobNo: "",
    Pan_Upload_Card: "",
    Passport: "",
    Bank_Upload_Passbook: "",
  });
  const handleDateChange = (date, dateString) => {
    setData({ ...Data, Business_redted_Date: dateString });
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
    console.log(23, userFormDetails[0].udhamAdhar);
    if (balance > userFormDetails[0]?.udhamAdhar) {
      const mainDataPromise = new Promise((resolve, reject) => {
        // console.log(77, Data);
        axios
          .post(`https://mhebackend.payagain.in/api/udhamAbhar/create`, Data)
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
            console.log(135, err);
            reject({
              status: false,
              message: "Data Not posted",
            });
          });
      });

      mainDataPromise
        .then((res) => {
          console.log(124, res.data.data._id);

          AadharUploadCard(res.data.data._id);
          PanUploadCard(res.data.data._id);
          Passport(res.data.data._id);
          BankUploadPassbook(res.data.data._id);

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
    amount: userFormDetails[0]?.udhamAdhar,
    isExpence: true,
    expenceFor: "udhamAdharctl",
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
  const AadharUploadCard = (id) => {
    const formData = new FormData();
    formData.append("Aadhar_Upload_Card", docs.udhamAbhar_AadharUploadCard);
    axios
      .put(
        `https://mhebackend.payagain.in/api/udhamAbhar_AadharUploadCard/${id}`,
        formData
      )
      .then((res) => console.log("zipAllDocuments", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const PanUploadCard = (id) => {
    const formData = new FormData();
    formData.append("Pan_Upload_Card", docs.udhamAbhar_PanUploadCard);
    axios
      .put(`https://mhebackend.payagain.in/api/udhamAbhar_PanUploadCard/${id}`, formData)
      .then((res) => console.log("zipAllDocuments", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const Passport = (id) => {
    const formData = new FormData();
    formData.append("Passport", docs.udhamAbhar_Passport);
    axios
      .put(`https://mhebackend.payagain.in/api/udhamAbhar_Passport/${id}`, formData)
      .then((res) => console.log("zipAllDocuments", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const BankUploadPassbook = (id) => {
    const formData = new FormData();
    formData.append("Bank_Upload_Passbook", docs.udhamAbhar_BankUploadPassbook);
    axios
      .put(
        `https://mhebackend.payagain.in/api/udhamAbhar_BankUploadPassbook/${id}`,
        formData
      )
      .then((res) => console.log("zipAllDocuments", res.data))
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    if (udhamid!= undefined) {
      axios.get(`https://mhebackend.payagain.in/api/udhamAbhar/${udhamid}`).then((res) => {
        const data = res.data[0];
      
        console.log('data',data)
        setData(data);

      });
    }
  }, [udhamid]);



  const editHandler = (e) => {

    e.preventDefault()
   

    const obj={

      ...Data ,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "udhamAdhar",
      status: "IN-PROGRESS",  
    }

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/udhamAbhar/${udhamid}`, obj)
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
       
        AadharUploadCard(res.data._id);
        PanUploadCard(res.data._id);
        Passport(res.data._id);
        BankUploadPassbook(res.data._id);

      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  return (
    
    <Fragment>
      <Breadcrumb title={"Udham Abhar Form"}  />
      <Container fluid={true}>
      <h3>Form Price : {userFormDetails[0]?.udhamAbhar}</h3>

        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Title</b> 
                      </label>
                      <Form.Item>
                        <Select
                        value={Data.Title}
                        onChange={(e)=>{
                          setData({...Data,Title:e});
                        }}
                        >
                          <Select.Option value="Mr.">Mr.</Select.Option>
                          <Select.Option value="Mrs.">Mrs.</Select.Option>
                          <Select.Option value="Ms.">Ms.</Select.Option>
                        </Select><p className="red">{Formerror.Title}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b> Owner Name</b>
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
                        placeholder="Please input your Oner Name!"
                        value={Data.Owner_Name}
                        onChange={(e)=>{
                          setData({...Data,Owner_Name:e.target.value});
                        }}
                        /><p className="red">{Formerror.Owner_Name}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>PAN Card</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your PAN Card!",
                          },
                        ]}
                      >
                        <Input 
                        placeholder=""
                        value={Data.PAN_Card}
                        onChange={(e)=>{
                          setData({...Data,PAN_Card:e.target.value});
                        }}
                        /><p className="red">{Formerror.PAN_Card}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Adhar Card</b> 
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Adhar Card Number!",
                          },
                        ]}
                      >
                        <Input 
                        type="Number"
                        
                        placeholder="Please input your Adhar Card Number!"
                        value={Data.Adhar_Card_no}
                        onChange={(e)=>{
                          setData({...Data,Adhar_Card_no:e.target.value});
                        }}
                        /><p className="red">{Formerror.Adhar_Card_no}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>GST Number</b>
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
                        placeholder=""
                        value={Data.GST_Number}
                        onChange={(e)=>{
                          setData({...Data,GST_Number:e.target.value});
                        }}
                        /><p className="red">{Formerror.GST_Number}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Social Category</b>
                      </label>

                      <Form.Item>
                        <Radio.Group placeholder="--select--"
                       value={Data.Social_Category}
                       onChange={(e) => {
                        setData({ ...Data, Social_Category: e.target.value  });
                       }}>
                          <Radio value="General">General</Radio>
                          <Radio value="SC ">SC </Radio>
                          <Radio value="ST">ST</Radio>
                          <Radio value="OBC  ">OBC  </Radio>
                        </Radio.Group>
                        <p className="red">{Formerror.GST_Number}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Gender</b>
                      </label>

                      <Form.Item>
                        <Radio.Group
                        value={Data.Gender}
                          onChange={(e) => {
                            setData({ ...Data, Gender: e.target.value });
                          }}
                        >
                          <Radio value="male">Male</Radio>
                          <Radio value="female">Female</Radio>
                          <Radio value="others">Others</Radio>
                        </Radio.Group> <p className="red">{Formerror.Gender}</p>
                      </Form.Item>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Shop Name</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                        value={Data.Shop_Name}
                        onChange={(e)=>{
                          setData({ ...Data, Shop_Name: e.target.value });
                        }}
                        /><p className="red">{Formerror.Shop_Name}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Mobile Number</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                        value={Data.Mobile_Number}
                        onChange={(e)=>{
                          setData({ ...Data, Mobile_Number: e.target.value });
                        }}
                        /><p className="red">{Formerror.Mobile_Number}</p>
                      </Form.Item>
                    </div>

                  

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Email</b>
                      </label>

                      <Form.Item>
                      <Input 
                      value={Data.email}
                      onChange={(e)=>{
                        setData({ ...Data, email: e.target.value });
                      }}
                      /><p className="red">{Formerror.email}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                      <b>Number of Employee</b>
                      </label>

                      <Form.Item>
                      <Input 
                      type="Number"
                      value={Data.Numbe_of_Employee}
                      onChange={(e)=>{
                        setData({ ...Data, Number_of_Employee: e.target.value });
                      }}
                      />
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>Date Business Was redted</b>
                      </label>

                      <Form.Item>
                        <DatePicker
                        onChange={handleDateChange}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Shop Address</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <TextArea
                        value={Data.Shop_Address}
                        onChange={(e)=>{
                          setData({ ...Data, Shop_Address: e.target.value });
                        }}
                        />                        <p className="red">{Formerror.Shop_Address}</p>

                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Nature Of Business</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <TextArea
                        value={Data.Nature_Of_Business}
                        onChange={(e)=>{
                          setData({ ...Data, Nature_Of_Business: e.target.value });
                        }}
                        /> <p className="red">{Formerror.Nature_Of_Business}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Investment Rs</b>
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

                        value={Data.Investment_Rs}
                        onChange={(e)=>{
                          setData({ ...Data, Investment_Rs: e.target.value });
                        }}
                        /><p className="red">{Formerror.Investment_Rs}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span><b>Bank Name</b>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input 
                        value={Data.Bank_Name}
                        onChange={(e)=>{
                          setData({ ...Data, Bank_Name: e.target.value });
                        }}
                        /><p className="red">{Formerror.Bank_Name}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                       <b> Bank Account Number</b>
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
                        value={Data.Bank_Account_Number}
                        onChange={(e)=>{
                          setData({ ...Data, Bank_Account_Number: e.target.value });
                        }}
                        /><p className="red">{Formerror.Bank_Account_Number}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>Bank IFSC Code </b>
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
                        value={Data.Bank_IFSC_Code}
                        onChange={(e)=>{
                          setData({ ...Data, Bank_IFSC_Code: e.target.value });
                        }}
                        /><p className="red">{Formerror.Bank_IFSC_Code}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
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
                                           <h5><a href="https://mhseva.com/upload_frms.php?file=Self_Declaration_Form.pdf">Self Declaration Form</a></h5> 

                      </Form.Item>
                    </div>
                    </div>
                    
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Aadhar Card (Size -
                        Maximum 500 Kb) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            udhamAbhar_AadharUploadCard: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Pan Card (Size - Maximum
                        500 Kb) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            udhamAbhar_PanUploadCard: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Passport Size Photo (Size
                        - Maximum 500 Kb) [Only (jpg,jpeg)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            udhamAbhar_Passport: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Bank Passbook (Size -
                        Maximum 500 Kb) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            udhamAbhar_BankUploadPassbook: e.target.files[0],
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
                    {udhamid == undefined ? (
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

export default UdhamAbhar;
