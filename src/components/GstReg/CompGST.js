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

const CompGST = () => {
  const [form] = Form.useForm();
  const { cid } = useParams();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const reducer = useSelector((state) => state.changeNumber);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  // const pricess = useSelector((state) => state.price.formPrices);
  const [balance, setBalance] = useState(0);
  
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
    if (!values.companyName) {
      error.companyName = " company Name is required";
    }
    if (!values.ownerName) {
      error.ownerName = " Owner Name is required";
    }
    if (!values.mobileNO) {
      error.mobileNO = " Mobile Number is required";
    }
    if (!values.email) {
      error.email = " Email Is required";
    }
    if (!values.businessStarted) {
      error.businessStarted = " Business Started is required";
    }
    if (!values.companyAddress) {
      error.companyAddress = " Company Address is required";
    }
    if (!values.companyPan) {
      error.companyPan = " Company Pan is required";
    }
    if (!values.RegCertificate) {
      error.RegCertificate = " Company Pan is required";
    }
    if (!values.RegCertificateMoa) {
      error.RegCertificateMoa = " Reg Certificate Moa is required";
    }
    if (!values.authorityLetter) {
      error.authorityLetter = " Authority Letter is required";
    }
    if (!values.natureBusiness) {
      error.natureBusiness = " Nature Business is required";
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
  console.log(104, balance);
  const [docs, setDocs] = useState({
    adharCard: "",
    electricityBill: "",
    bankPassbook: "",
    panCard: "",
    passportPhoto: "",
    shopAct_licence: "",
    rentAgreement: "",
    signature: "",
  });
  const [Data, setData] = useState({
    createdBy: userData.user._id,
    createdByName: userData.user?.name,
    application_type: "CompanyGST",
    status: "IN-PROGRESS",
    companyName: "",
    ownerName: "",
    mobileNO: "",
    email: "",
    businessStarted: "",
    companyAddress: "",
    companyPan: "",
    RegCertificate: "",
    MOA_AOA: "",
    authorityLetter: "",
    natureBusiness: "",
  });
  const businessStarted = (date, dateString) => {
    setData({ ...Data, businessStarted: dateString });
  };
  const COmpGstForm = (e) => {
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

      if (balance > userFormDetails[0].companyGST) {
        const mainDataPromise = new Promise((resolve, reject) => {
          // console.log(77, Data);
          axios
            .post(`https://mhebackend.payagain.in/api/compgst/create`, Data)
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

            uploadadharCard(res.data.data._id);
            uploadelectricityBill(res.data.data._id);
            uploadbankPassbook(res.data.data._id);
            uploadpanCard(res.data.data._id);
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
    amount: userFormDetails[0]?.companyGST,
    isExpence: true,
    expenceFor: "companyGST",
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
  const uploadadharCard = (id) => {
    const formData = new FormData();
    formData.append("adharCard", docs.adharCard);
    axios
      .put(`https://mhebackend.payagain.in/api/compgst_adharCard/${id}`, formData)
      .then((res) => console.log("compgst_adharCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadelectricityBill = (id) => {
    const formData = new FormData();
    formData.append("electricityBill", docs.electricityBill);
    axios
      .put(
        `https://mhebackend.payagain.in/api/compgst_electricityBill/${id}`,
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
      .put(
        `https://mhebackend.payagain.in/api/compgst_bankPassbook/${id}`,
        formData
      )
      .then((res) => console.log("bankPassbook", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadpanCard = (id) => {
    const formData = new FormData();
    formData.append("panCard", docs.panCard);
    axios
      .put(`https://mhebackend.payagain.in/api/compgst_panCard/${id}`, formData)
      .then((res) => console.log("panCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadpassportPhoto = (id) => {
    const formData = new FormData();
    formData.append("passportPhoto", docs.passportPhoto);
    axios
      .put(
        `https://mhebackend.payagain.in/api/compgst_passportPhoto/${id}`,
        formData
      )
      .then((res) => console.log("identityProof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadshopAct_licence = (id) => {
    const formData = new FormData();
    formData.append("shopAct_licence", docs.shopAct_licence);
    axios
      .put(
        `https://mhebackend.payagain.in/api/compgst_shopActLicence/${id}`,
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
        `https://mhebackend.payagain.in/api/compgst_rentAgreement/${id}`,
        formData
      )
      .then((res) => console.log("OldName_Proof", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadsignature = (id) => {
    const formData = new FormData();
    formData.append("signature", docs.signature);
    axios
      .put(`https://mhebackend.payagain.in/api/compgst_signature/${id}`, formData)
      .then((res) => console.log("signature", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (cid != undefined) {
      axios.get(`https://mhebackend.payagain.in/api/compgst/${cid}`).then((res) => {
        const data = res.data[0];

        console.log("data", data);
        setData(data);
      });
    }
  }, [cid]);

  const editHandler = (e) => {
    e.preventDefault();

    const obj = {
      ...Data,
      createdBy: userData.user._id,
      createdByName: userData.user?.name,
      application_type: "CompanyGST",
      status: "IN-PROGRESS",
    };

    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/compgst/${cid}`, obj)
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

        uploadadharCard(res.data._id);
        uploadelectricityBill(res.data._id);
        uploadbankPassbook(res.data._id);
        uploadpanCard(res.data._id);
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
      <Breadcrumb title={"Company GST"} parent={"GST registration"} />
      <Container fluid={true}>
        <h3>Form Price : {userFormDetails[0]?.companyGST}</h3>

        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Company Name</b>
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
                          placeholder="companyName"
                          value={Data.companyName}
                          onChange={(e) => {
                            setData({ ...Data, companyName: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.companyName}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Owner Name</b>
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
                          placeholder="Please input your Owner Name!"
                          value={Data.ownerName}
                          onChange={(e) => {
                            setData({ ...Data, ownerName: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.ownerName}</p>
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
                            message: "Please input your Owner Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Please input your Owner Name!"
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
                        <span className="red">*</span>
                        <b>Email</b>
                      </label>
                      Formerror
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
                        <p className="red">{Formerror.email}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Date Business was Started</b>
                      </label>

                      <Form.Item>
                        <DatePicker onChange={businessStarted} />
                        <p className="red">{Formerror.businessStarted}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Company Address</b>
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={2}
                          placeholder="Please input your Company Address!"
                          onChange={(e) => {
                            setData({
                              ...Data,
                              companyAddress: e.target.value,
                            });
                          }}
                        />{" "}
                        <p className="red">{Formerror.companyAddress}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Company PAN</b>
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
                          value={Data.companyPan}
                          onChange={(e) => {
                            setData({ ...Data, companyPan: e.target.value });
                          }}
                        />
                        <p className="red">{Formerror.companyPan}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Reg Certificate</b>
                      </label>

                      <Form.Item>
                        <Radio.Group
                          onChange={(e) => {
                            setData({
                              ...Data,
                              RegCertificate: e.target.value,
                            });
                          }}
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="No">NO</Radio>
                        </Radio.Group>
                        <p className="red">{Formerror.RegCertificate}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <b>RegCertificate</b>
                        <span className="red">*</span> <b>MOA/AOA</b>
                      </label>

                      <Form.Item>
                        <Radio.Group
                          onChange={(e) => {
                            setData({
                              ...Data,
                              RegCertificateMoa: e.target.value,
                            });
                          }}
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="No">NO</Radio>
                        </Radio.Group>
                        <p className="red">{Formerror.RegCertificateMoa}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <b>Authority Letter</b>
                      </label>

                      <Form.Item>
                        <Radio.Group
                          onChange={(e) => {
                            setData({
                              ...Data,
                              authorityLetter: e.target.value,
                            });
                          }}
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="No">NO</Radio>
                        </Radio.Group>{" "}
                        <p className="red">{Formerror.authorityLetter}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> <b>Nature Of Business</b>
                      </label>

                      <Form.Item rules={[]}>
                        <TextArea
                          rows={2}
                          placeholder="Please input Nature Of Business!"
                          onChange={(e) => {
                            setData({
                              ...Data,
                              natureBusiness: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.natureBusiness}</p>
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <h5>Upload required documents: </h5>
                    </div>
                    {/* adharCard: "",
    electricityBill: "",
    bankPassbook: "",
    panCard: "",
    passportPhoto: "",
    shopAct_licence: "",
    rentAgreement: "",
    signature: "", */}
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
                            adharCard: e.target.files[0],
                          });
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
                            panCard: e.target.files[0],
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
                    {cid == undefined ? (
                      <div className="col-md-1">
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={(e) => {
                              COmpGstForm(e);
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

export default CompGST;
