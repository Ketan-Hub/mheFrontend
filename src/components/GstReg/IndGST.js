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
import swal from "sweetalert";

const IndGST = () => {
  const [form] = Form.useForm();
  const { iid } = useParams();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const reducer = useSelector((state) => state.changeNumber);
  const [balance, setBalance] = useState(0);

  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const pricess = useSelector((state) => state.price.formPrices);
  // console.log(277,Expence);
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
    if (!values.customerName) {
      error.customerName = " Customer Name is required";
    }
    if (!values.address) {
      error.address = " Address is required";
    }
    if (!values.mobileNO) {
      error.mobileNO = " Mobile NO Is required";
    }
    if (!values.email) {
      error.email = " Email Is required";
    }
    if (!values.panCard) {
      error.panCard = " Pan Card Is required";
    }
    if (!values.adharCard) {
      error.adharCard = " Adhar Card Is required";
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
    adharCard_Docs: "",
    electricityBill: "",
    bankPassbook: "",
    panCard_Docs: "",
    passportPhoto: "",
    shopAct_licence: "",
    rentAgreement: "",
    signature: "",
  });

  const [Data, setData] = useState({
    createdById: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "indGST",
    status: "IN-PROGRESS",
    customerName: "",
    address: "",
    mobileNO: "",
    email: "",
    panCard: "",
    adharCard: "",
  });
  const INDpGstForm = (e) => {
    e.preventDefault();
    const errors = validate(Data);
    console.log("formErrors:", errors);
    if (Object.keys(errors).length === 0) {
      swal("Good job!", "form submitted successfully!", "success");

      SetIsSubmit(true);
      const obj = {
        Data,
      };
      console.log(obj);
      console.log(Data);
      if (balance > userFormDetails[0].individualGST) {
        const mainDataPromise = new Promise((resolve, reject) => {
          // console.log(77, Data);
          axios
            .post(`https://mhebackend.payagain.in/api/indGST/create`, Data)
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

            uploadadharCard_Docs(res.data.data._id);
            uploadelectricityBill(res.data.data._id);
            uploadbankPassbook(res.data.data._id);
            uploadpanCard_Docs(res.data.data._id);
            uploadpassportPhoto(res.data.data._id);
            uploadshopAct_licence(res.data.data._id);
            uploadrentAgreement(res.data.data._id);
            uploadsignature(res.data.data._id);
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
    amount: userFormDetails[0]?.individualGST,
    isExpence: true,
    expenceFor: "individualGST",
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
  const uploadadharCard_Docs = (id) => {
    const formData = new FormData();
    formData.append("adharCard_Docs", docs.adharCard_Docs);
    axios
      .put(
        `https://mhebackend.payagain.in/api/indGST_adharCardDocs/${id}`,
        formData
      )
      .then((res) => console.log("gazzet_photoID", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadelectricityBill = (id) => {
    const formData = new FormData();
    formData.append("electricityBill", docs.electricityBill);
    axios
      .put(
        `https://mhebackend.payagain.in/api/indGST_electricityBill/${id}`,
        formData
      )
      .then((res) => console.log("addressProof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadbankPassbook = (id) => {
    const formData = new FormData();
    formData.append("bankPassbook", docs.bankPassbook);
    axios
      .put(`https://mhebackend.payagain.in/api/indGST_bankPassbook/${id}`, formData)
      .then((res) => console.log("Cast_Certificate", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadpanCard_Docs = (id) => {
    const formData = new FormData();
    formData.append("panCard_Docs", docs.panCard_Docs);
    axios
      .put(`https://mhebackend.payagain.in/api/indGST_panCardDocs/${id}`, formData)
      .then((res) => console.log("panCard_Docs", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadpassportPhoto = (id) => {
    const formData = new FormData();
    formData.append("passportPhoto", docs.passportPhoto);
    axios
      .put(
        `https://mhebackend.payagain.in/api/indGST_passportPhoto/${id}`,
        formData
      )
      .then((res) => console.log("passportPhoto", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadshopAct_licence = (id) => {
    const formData = new FormData();
    formData.append("shopAct_licence", docs.shopAct_licence);
    axios
      .put(
        `https://mhebackend.payagain.in/api/indGST_shopActLicence/${id}`,
        formData
      )
      .then((res) => console.log("shopAct_licence", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadrentAgreement = (id) => {
    const formData = new FormData();
    formData.append("rentAgreement", docs.rentAgreement);
    axios
      .put(
        `https://mhebackend.payagain.in/api/indGST_rentAgreement/${id}`,
        formData
      )
      .then((res) => console.log("rentAgreement", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadsignature = (id) => {
    const formData = new FormData();
    formData.append("signature", docs.signature);
    axios
      .put(`https://mhebackend.payagain.in/api/indGST_signature/${id}`, formData)
      .then((res) => console.log("signature", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (iid != undefined) {
      axios.get(`https://mhebackend.payagain.in/api/indGST/${iid}`).then((res) => {
        const data = res.data[0];

        console.log("data", data);
        setData(data);
      });
    }
  }, [iid]);

  const editHandler = (e) => {
    e.preventDefault();

    const obj = {
      ...Data,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "indGST",
      status: "IN-PROGRESS",
    };

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/indGST/${iid}`, obj)
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

        uploadadharCard_Docs(res.data._id);
        uploadelectricityBill(res.data._id);
        uploadbankPassbook(res.data._id);
        uploadpanCard_Docs(res.data._id);
        uploadpassportPhoto(res.data._id);
        uploadshopAct_licence(res.data._id);

        uploadrentAgreement(res.data._id);
        uploadsignature(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Breadcrumb title={"Individual GST"} parent={"GST registration"} />
      <Container fluid={true}>
        <h3>Form Price : {userFormDetails[0]?.individualGST}</h3>

        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Company Name
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Company Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder=""
                          value={Data.customerName}
                          onChange={(e) => {
                            setData({ ...Data, customerName: e.target.value });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> Address
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={2}
                          placeholder="Please input your Address!"
                          value={Data.address}
                          onChange={(e) => {
                            setData({ ...Data, address: e.target.value });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Mobile Number
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Owner Name!",
                          },
                        ]}
                      >
                        <Input
                          type="Number"
                          placeholder="Please input your Owner Name!"
                          value={Data.mobileNO}
                          onChange={(e) => {
                            setData({ ...Data, mobileNO: e.target.value });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
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
                          placeholder="Please input Email!"
                          value={Data.email}
                          onChange={(e) => {
                            setData({ ...Data, email: e.target.value });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Pan Card
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Please Enter Pan Number"
                          value={Data.panCard}
                          onChange={(e) => {
                            setData({ ...Data, panCard: e.target.value });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Aadhar Card
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Please Enter Pan Number"
                          value={Data.adharCard}
                          onChange={(e) => {
                            setData({ ...Data, adharCard: e.target.value });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <h5>Upload required documents: </h5>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Aadhar Card (Size -
                        Maximum 1 MB) [Only (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            adharCard_Docs: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Electricity Bill (Size -
                        Maximum 1 MB) [Only (jpg,jpeg,pdf)]*
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            electricityBill: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Bank Passbook/Cancel Check (Size - Maximum 1 MB) [Only
                        (jpg,jpeg,pdf)]
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            bankPassbook: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Pan Card (Size - Maximum 1 MB) [Only (jpg,jpeg,pdf)
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            panCard_Docs: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Passport Size Photo (Size - Maximum 1 MB) [Only
                        (jpg,jpeg,pdf)] *
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            passportPhoto: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Shop Act License (Size - Maximum 1 MB) [Only
                        (jpg,jpeg,pdf)]
                      </label>
                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                          setDocs({
                            ...docs,
                            shopAct_licence: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Rent Agreement (Size - Maximum 1 MB) [Only
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
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Signature (Size - Maximum 1 MB) [Only (jpg,jpeg,pdf)]
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
                    {iid == undefined ? (
                      <div className="col-md-1">
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={(e) => {
                              INDpGstForm(e);
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

export default IndGST;
