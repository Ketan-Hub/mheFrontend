import React from "react";
import { MdUploadFile } from "react-icons/md";
import { Button, Form, Input, Radio, Select, DatePicker, Upload } from "antd";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { useState, useEffect } from "react";
import axios from "axios";

import { districtData, relationApplicant_beneficiary } from "../../constants/data";
import { statusfname } from "../../constants/data";
import { work_type } from "../../constants/data";
import { useParams } from "react-router-dom";
import { incNumber } from "../../Redux/actions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

function AgeDomicile() {
  const [nameMarathi, setnameMarathi] = useState("");
  const [fnameMarathi, setfnameMarathi] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(false);
  const [items, setItems] = useState();
  const ID = items?.user?._id;
  const createdByName = items?.user?.name;

  useEffect(() => {
    const userRespons = JSON.parse(localStorage.getItem("userResponse"));
    if (userRespons) {
      setItems(userRespons);
    }
  }, []);

  const users = useSelector((state) => state.userData.user);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const [balance, setBalance] = useState(0);

  const [user, setUser] = useState([]);
  const [getAgent, setgetAgent] = useState([]);
  const [GetFormPrice, setGetFormPrice] = useState();
  const [talukas, setTalukas] = useState([]);

  const getData = () => {
    axios
      .get(`https://mhebackend.payagain.in/api/user/getAll`)
      .then((res) => {
        const response = res.data;
        setUser(response);
        const userdata = JSON.parse(localStorage.getItem("userResponse"));
        if (userdata) {
          const getFormPrice = response.find((item) => item._id === userdata.user._id);
          const getagent = response.filter((item) => item._id === getFormPrice.agent);
          // setuserData(userdata);
          setgetAgent(getagent);
          setGetFormPrice( getFormPrice?.retaile_formPrice?.retailer_ageNashnality);
          console.log(55,getFormPrice?.retaile_formPrice?.retailer_ageNashnality)
        }
        // console.log(37,response)
      })
      .catch((err) => console.log(40, err));
  };
  useEffect(() => {
    setTimeout(getData(), 1000);
  }, []);

  useEffect(() => {
    if (userData) {
      axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
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
      // dispatch(incNumber)
    }
  }, []);
  console.log(104, balance);
  const [docs, setDocs] = useState({
    reshanCard: "",
    adharCard: "",
    lightBill: "",
    schoolLeaveCertificate: "",
    taxBillOr15yerOldLightbill: "",
    photo: "",
    selfDeclaration: "",
  });

  const [form] = Form.useForm();
  const [Data, SetData] = useState({
    docName: "",
    statusfname: "",
    fullName_English: "",
    fullName_Marathi: "",
    fatherName_english: "",
    fatherName_marathi: "",
    BirthDate: "",
    Locality: "",
    age: "",
    Gender: "",
    work_type: "",
    phoneNUm: "",
    email: "",
    AdharNo: "",
    address: "",
    Building: "",
    street: "",
    // depart: { type: String },
    landmark: "",
    district: "",
    taluka: "",
    village: "",
    pincode: "",
    onAddressLiveing: "",
    Applicunt_Live_In_MH_Inyear: "",
    relationApplicant_beneficiary: "",
    benificiary_NameStatus: "",
    benificiary_Name: "",
    benificiary_DOB: "",
    Benificiary_Phoneno: "",

    // BirthDetails: "",
    BirthDetails_address: "",
    BirthDetails_streetName: "",
    BirthDetails_Building: "",
    BirthDetails_locality: "",
    BirthDetails_Country: "",
    BirthDetails_state: "",
    BirthDetails_district: "",
    BirthDetails_tehsil: "",
    BirthDetails_village: "",
    BirthDetails_pincode: "",
    // isMovablePropartyOfApp_FAther_Hus: false,
    Proparty_address: "",
    Proparty_street: "",
    Proparty_Building: "",
    Proparty_locality: "",
    Proparty_Country: "",
    Proparty_State: "",
    Proparty_district: "",
    Proparty_Tehsil: "",
    Proparty_village: "",
    Proparty_pincode: "",
    Benificiary_propartyHolder_Relation: "",
    Benificiary_propartyDetails: "",
    Benificiary_Father_HusRecidance: "",
    Benificiary_FatherRecidaceOfBirth: "",
    isBenificiary_FatherRecidaceOfBirth_outOf_MH: "",
    placeOfEmploment: "",
    isApllicantBenificiaryOtherState: false,
    ApllicantBenificiaryOtherState: "",
    ApllicantBenificiaryOtherState_district: "",
    ApllicantBenificiaryOtherState_Taluka: "",
    ApllicantBenificiaryOtherState_Village: "",
    ApllicantBenificiaryOtherState_pincode: "",
    CertificateReason: "",
  });

  const translateName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", { text: Data.fullName_English })
      .then((res) => {
        setnameMarathi(res.data.output);
        SetData({
          ...Data,
          fullName_Marathi: res.data.output,
        });
      })
      .catch((err) => console.log(err));
    };
    
    const translateFName = () => {
      axios
      .post("https://mhebackend.payagain.in/translate", {
        text: Data.fatherName_english,
      })
      .then((res) => {
        console.log(res.data.output);
        setfnameMarathi(res.data.output);
        SetData({
          ...Data,
          fatherName_marathi: res.data.output,
        });
      })
      .catch((err) => console.log(err));
  };

  const clickHandler = () => {
    translateName();
  };

  const clickHandler1 = () => {
    translateFName();
  };

  const [BrithAddress, SetBrithAddress] = useState(false);
  const [MoveableProperty, SetMoveableProperty] = useState(false);
  const [Otherstate, SetOtherstate] = useState(false);
  const [MigratedDetails, setMigratedDetails] = useState(false);

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
    if (!values.statusfname) {
      error.statusfname = " Status full name is required";
    }
    if (!values.fullName_English) {
      error.fullName_English = " FullName English is required";
    }

    if (!values.statusfname) {
      error.statusfname = "statusfname is required";
    }
    if (!values.fatherName_english) {
      error.fatherName_english = " father Name_english nameis required";
    }
    
    if (!values.age) {
      error.age = " Age is required";
    }

    if (!values.Gender) {
      error.Gender = "  Gender is required";
    }
    if (!values.work_type) {
      error.work_type = " work_type is required";
    }
    if (!values.phoneNUm) {
      error.phoneNUm = "  Place Brithdate  is required";
    }
 
    if (!values.address) {
      error.address = "  address  is required";
    }
   

    if (!values.landmark) {
      error.landmark = "landmark State is required";
    }

    if (!values.Applicunt_Live_In_MH_Inyear) {
      error.Applicunt_Live_In_MH_Inyear =
        "Applicunt_Live_In_MH_Inyear is required";
    }
    if (!values.BirthDetails_address) {
      error.BirthDetails_address = "Created By is required";
    }
    if (!values.BirthDetails_streetName) {
      error.BirthDetails_streetName = "BirthDetails_streetName is required";
    }
 
    if (!values.docName) {
      error.docName = "docName is required";
    }
    console.log("error object", error);
    return error;
  };

  const handleDateChange = (Bddate, dateString) => {
    SetData({ ...Data, BirthDate: dateString });
  };
  const ChangeDate = (Bdata, dateString) => {
    SetData({ ...Data, benificiary_DOB: dateString });
  };
  const handalStartDate = (MSdata, dateString) => {
    SetMigrationBeneficiary({
      ...MigrationBeneficiary,
      MigrationStartYear: dateString,
    });
  };
  const handalEndDate = (MEdata, dateString) => {
    SetMigrationBeneficiary({
      ...MigrationBeneficiary,
      MigrationEndYear: dateString,
    });
  };

  const [EducationDetails, SetEducationDetails] = useState({
    begree: "",
    organizationName: "",
    AddmisionYear: "",
    leaveYear: "",
    EducationPlace: "",
  });
  const [EducationDetailsArray, SetEducationDetailsArray] = useState([]);
  // console.log(178, EducationDetailsArray);
  const [MigrationBeneficiary, SetMigrationBeneficiary] = useState({
    migrationToMHYear: "",
    BeforeMigrationLocation: "",
    reasonOfMigration: "",
    placeOfMigration: "",
    MigrationStartYear: "",
    MigrationEndYear: "",
  });
  const [MigrationBeneficiaryArray, SetMigrationBeneficiaryArray] = useState(
    []
  );
  // console.log(178, MigrationBeneficiaryArray);

  const [FMemberBeneficiary, SetFMemberBeneficiary] = useState({
    relation_beneficiary: "",
    familyMember_name: "",
  });
  const [FMemberBeneficiaryArray, SetFMemberBeneficiaryArray] = useState([]);
  const AgeSubmitdomicile = (e) => {
    e.preventDefault();
    const errors = validate(Data);
    console.log("formErrors:", errors);
    if (Object.keys(errors).length === 0) {
      SetIsSubmit(true);
      // alert('form submitted successfully')
      swal("Good job!", "form submitted successfully!", "success");

      const obj = {
        Data,
      };
      console.log(obj);

      if (agree) {
        if (balance > GetFormPrice) {
          const obj = {
            application_type: "Age_Nationality",
            status: "IN-PROGRESS",
            createdBy: ID,
            createdByName,
            Data,
            EducationDetailsArray,
            MigrationBeneficiaryArray,
            FMemberBeneficiaryArray,
          };

          const mainDataPromise = new Promise((resolve, reject) => {
            // console.log(77, Data);
            axios
              .post(`https://mhebackend.payagain.in/api/Age_Nashnality/create`, obj)
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

              uploadreshaCard(res.data.data._id);
              uploadadharCard(res.data.data._id);
              uploadlightBill(res.data.data._id);
              uploadschoolLeaveCertificate(res.data.data._id);
              uploadphoto(res.data.data._id);
              uploadtaxBillOr15yerOldLightbill(res.data.data._id);
              uploadselfDeclearation(res.data.data._id);
              debitFormBalance();
              CreaditAgent();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("Please Recharge");
        }
      }
    } else {
      setFormerror(errors);
      swal("Filled the required form");
    }
  };
  const CreaditAgent = () => {
    const obj = {
      agentId: getAgent[0]._id,
      agentName: getAgent[0].name,
      creaditAmount: getAgent[0].agent_formPrice.agent_ageNasnality,
      isWithdrowl: false,
      isrequest: false,
      creaditFor: "Age Nashnality ",
      creaditBy: userData.user._id,
    };
    console.log(292, obj);
    axios
      .post(`https://mhebackend.payagain.in/api/wallet/create`, obj)
      .then((res) => {
        const response = res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const obj = {
    user: userData?.user._id,
    mode: "offline",
    amount: GetFormPrice,
    isExpence: true,
    expenceFor: "Age Nashnality",
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

  const uploadreshaCard = (id) => {
    const formData = new FormData();
    formData.append("reshanCard", docs.reshanCard);
    axios
      .put(
        `https://mhebackend.payagain.in/api/Age_Nashnality_reshanCard/${id}`,
        formData
      )
      .then((res) => console.log("reshanCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadadharCard = (id) => {
    const formData = new FormData();
    formData.append("adharcard", docs.adharCard);
    axios
      .put(`https://mhebackend.payagain.in/api/Age_Nashnality_adharCard/${id}`, formData)
      .then((res) => console.log("adharCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadlightBill = (id) => {
    const formData = new FormData();
    formData.append("lightbill", docs.lightBill);
    axios
      .put(`https://mhebackend.payagain.in/api/Age_Nashnality_lightbill/${id}`, formData)
      .then((res) => console.log("lightbill", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadschoolLeaveCertificate = (id) => {
    const formData = new FormData();
    formData.append("schoolLeaveCertificate", docs.schoolLeaveCertificate);
    axios
      .put(
        `https://mhebackend.payagain.in/api/Age_Nashnality_schoolLeaveCertificate/${id}`,
        formData
      )
      .then((res) => console.log("schoolLeaveCertificate", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadphoto = (id) => {
    const formData = new FormData();
    formData.append("photo", docs.photo);
    axios
      .put(`https://mhebackend.payagain.in/api/Age_Nashnality_photo/${id}`, formData)
      .then((res) => console.log("form16", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadtaxBillOr15yerOldLightbill = (id) => {
    const formData = new FormData();
    formData.append("taxBill", docs.taxBillOr15yerOldLightbill);
    axios
      .put(`https://mhebackend.payagain.in/api/Age_Nashnality_taxBill/${id}`, formData)
      .then((res) => console.log("taxBillOr15yerOldLightbill", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadselfDeclearation = (id) => {
    const formData = new FormData();
    formData.append("selfDeclaretion", docs.selfDeclaration);
    axios
      .put(
        `https://mhebackend.payagain.in/api/Age_Nashnality_selfDeclaretion/${id}`,
        formData
      )
      .then((res) => console.log("selfDeclearation", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id != undefined) {
      axios
        .get(`https://mhebackend.payagain.in/api/Age_Nashnality/${id}`)
        .then((res) => {
          const data = res.data[0];
          // console.log('datas',data.benificiary_father_details.benificiaryFather_fullName_english)
          SetData(data.Data);
          SetEducationDetailsArray(data.EducationDetailsArray);
          SetMigrationBeneficiaryArray(data.MigrationBeneficiaryArray);
          SetFMemberBeneficiaryArray(data.FMemberBeneficiaryArray);
        });
    }
  }, [id]);

  const editHandler = (e) => {
    const obj = {
      application_type: "EWS",
      status: "IN-PROGRESS",
      createdBy: ID,
      createdByName,
      Data,
      EducationDetailsArray,
      MigrationBeneficiaryArray,
      FMemberBeneficiaryArray,
    };

    if (agree) {
      const mainDataPromise = new Promise((resolve, reject) => {
        axios
          .put(`https://mhebackend.payagain.in/api/Age_Nashnality/${id}`, obj)
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

          uploadreshaCard(res.data.data._id);
          uploadadharCard(res.data.data._id);
          uploadlightBill(res.data.data._id);
          uploadschoolLeaveCertificate(res.data.data._id);
          uploadphoto(res.data.data._id);
          uploadtaxBillOr15yerOldLightbill(res.data.data._id);
          uploadselfDeclearation(res.data.data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [self, setSelf] = useState(false);
  const addSelfData = (dorpName) => {
    if (dorpName.toString().toLowerCase() == "self") {
      setSelf(true);
      SetData((prevState) => {
        return {
          ...prevState,
          benificiary_NameStatus: prevState.statusfname,
          benificiary_Name: prevState.fullName_English,
          benificiary_DOB: prevState.BirthDate,
          Benificiary_Phoneno: prevState.phoneNUm,
        };
      });
    }
  };
  const addPreviousAddress = () => {
    SetBrithAddress(false);
    SetData((prevState) => {
      return {
        ...prevState,
        BirthDetails_address: prevState.address,
        BirthDetails_Building: prevState.Building,
        BirthDetails_streetName: prevState.street,
        BirthDetails_locality: prevState.Locality,
        BirthDetails_district: prevState.district,
        BirthDetails_village: prevState.village,
        BirthDetails_pincode: prevState.pincode,
        BirthDetails_landmark: prevState.landmark,
        BirthDetails_tehsil: prevState.taluka,
      };
    });
  };
  const setTalukasData = (e) => {
    console.log(340, e);
    if (e) {
      const taluka = districtData.filter((item) => item.name === e);
      console.log(597, taluka[0].tahasil);
      setTalukas(taluka[0].tahasil);
      // console.log(340,taluka[0].tahasil);
    } else {
      console.log("Flop");
    }
  };
  return (
    <>
      <Breadcrumb
        title={" Age Nationality and Domicile :"}
        parent={"Certificate"}
      />
      <Container fluid={true}>
      <h3>
        Form Price :{GetFormPrice?GetFormPrice:"0"}
      </h3>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">Certificate Name :</span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Certificate Name
                        <span className="red">*</span>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="--select--"
                          onChange={(e) => {
                            SetData({ ...Data, docName: e });
                          }}
                        >
                          <Select.Option value="Certificate of Age,Nationality and Domicile">
                            Certificate of Age,Nationality and Domicile
                          </Select.Option>
                          <Select.Option value="Certificate of Age and Domicile">
                            Certificate of Age and Domicile
                          </Select.Option>
                          <Select.Option value="Certificate of Age and Nationality">
                            Certificate of Age and Nationality
                          </Select.Option>
                        </Select>
                        <p className="red">{Formerror.docName}</p>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">Applicant Details :</span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    {" "}
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Salutation<span className="red"></span>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="--select--"
                          value={Data.statusfname}
                          onChange={(e) => {
                            SetData({ ...Data, statusfname: e });
                          }}
                        >
                          {statusfname.map((row, index) => (
                            <option value={row} key={index}>
                              {row}
                            </option>
                          ))}
                        </Select>
                        <p className="red">{Formerror.statusfname}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Full Name (English) <span className="red">*</span>
                      </label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Full Name!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.fullName_English}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              fullName_English: e.target.value,
                            });
                          }}
                          onBlur={clickHandler}
                        />
                        <p className="red">{Formerror.fullName_English}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Full Name (Marathi) <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Full Name!",
                          },
                        ]}
                      >
                        <Input
                          value={nameMarathi}
                         
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red"></span> Salutation
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="--select--"
                          value={Data.statusfname}
                          onChange={(e) => {
                            SetData({ ...Data, statusfname: e });
                          }}
                        >
                          <Select.Option value="Mr">Mr.</Select.Option>
                          <Select.Option value="Shri">Shri</Select.Option>
                        </Select>
                        <p className="red">{Formerror.statusfname}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Father's Name(English) <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Full father  Name!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.fatherName_english}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              fatherName_english: e.target.value,
                            });
                          }}
                          onBlur={clickHandler1}
                        />
                        <p className="red">{Formerror.fatherName_english}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Father's Name (Marathi)<span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Father Full Name!",
                          },
                        ]}
                      >
                        <Input
                          value={fnameMarathi}
                          onChange={(e) => {
                            setfnameMarathi(e.target.value);
                          }}
                        />
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
                        <p className="red">{Formerror.BirthDate}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Age <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Age!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.age}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              age: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.age}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Gender <span className="red">*</span>
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="--select--"
                          value={Data.Gender}
                          onChange={(e) => {
                            SetData({ ...Data, Gender: e });
                          }}
                        >
                          <Select.Option value="Male">Male</Select.Option>
                          <Select.Option value="Female">Female</Select.Option>
                          <Select.Option value="Other">Other</Select.Option>
                        </Select>
                        <p className="red">{Formerror.Gender}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Occupation<span className="red"></span>
                      </label>
                      <Form.Item>
                        <select
                          placeholder="--select--"
                          value={Data.work_type}
                          onChange={(e) => {
                            SetData({ ...Data, work_type: e.target.value });
                          }}
                        >
                          {work_type.map((row, index) => (
                            <option value={row} key={index}>
                              {row}
                            </option>
                          ))}
                        </select>
                        <p className="red">{Formerror.work_type}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Mobile No <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Mobile No!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.phoneNUm}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              phoneNUm: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.phoneNUm}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Email
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your  Email!",
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
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Adhar UID No.
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your UID!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.AdharNo}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              AdharNo: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">Residence Details :</span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    {" "}
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Address<span className="red">*</span>
                      </label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Address!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.address}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              address: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.address}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Street
                      </label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Street!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.street}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              street: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.street}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Building
                      </label>

                      <Form.Item>
                        <Input
                          value={Data.Building}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              Building: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.Building}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Locality
                      </label>

                      <Form.Item>
                        <Input
                          value={Data.Locality}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              Locality: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Landmark<span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Land Mark!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.landmark}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              landmark: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.landmark}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> District
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
                          value={Data.district}
                          onChange={(e) => {
                            SetData({ ...Data, district: e });
                            setTalukasData(e)
                          }}
                        >
                          {
                            districtData.map((item,i)=>{
                              return(<>
                              
                          <Select.Option value={item.name}>
                            {item.name}
                          </Select.Option>
                              </>)
                            })
                          }
                          
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Taluka <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Taluka!",
                          },
                        ]}
                      >
                        <Select
                          value={Data.taluka}
                          placeholder="--Select Taluka--"
                          onChange={(e) => {
                            SetData({ ...Data, taluka: e });
                          }}
                        >
                          {
                            talukas.map((item,i)=>{
                              return(<>
                              
                              <Select.Option value={item}>{item}</Select.Option>
                              </>)

                            })
                          }
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Village <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Village!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="--Select Village--"
                          value={Data.village}
                          onChange={(e) => {
                            SetData({ ...Data, village: e });
                          }}
                        >
                          <Select.Option
                            value=" sangvi
"
                          >
                            sangvi
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Relation
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Vehicle Type"
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
                      </Form.Item>
                    </div> */}
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Pincode <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your pincode!",
                          },
                        ]}
                      >
                        <Input
                          value={Data.pincode}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              pincode: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Residing at present address since *
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input  Residing !",
                          },
                        ]}
                      >
                        <Input
                          value={Data.onAddressLiveing}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              onAddressLiveing: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.onAddressLiveing}</p>
                      </Form.Item>

                      {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> state
                      </label> */}
                      {/* <Form.Item>
                        <Select
                          placeholder="Select State"
                          onChange={(e) => {
                            SetData({ ...Data, state: e });
                          }}
                        >
                          <Select.Option value="Maharashtra">
                            Maharashtra
                          </Select.Option>
                        </Select>
                      </Form.Item> */}
                    </div>
                    {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        UID No.
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
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              application_last_name: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div> */}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">Beneficiary Details:</span>
                  </h3>
                </div>

                {/* <Container fluid={true}>
                  <Row>
                    <Col sm="">
                      <Card>
                        <CardBody>
                          <div class="box-header box-header-bg">
                            <h3 class="box-title">
                              <span id="CPH_Panelappdetails">
                                Beneficiary Aadhar details :
                              </span>
                            </h3>
                          </div>
                          <Form
                            name="basic"
                            autoComplete="off"
                            layout={"vertical"}
                          >
                            <div className="row">
                              <div className="col-md-4">
                                <label htmlFor="" className="mb-3">
                                  {" "}
                                  UID Number
                                  <span className="red">*</span>
                                </label>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your UID!",
                                    },
                                  ]}
                                >
                                  <Input
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        createdBy: e.target.value,
                                      });
                                    }}
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-4">
                                <Form.Item>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    // onClick={(e) => {
                                    //   AgedomicileFormSubmit(e);
                                    // }}
                                  >
                                    Bio-metric
                                  </Button>
                                </Form.Item>
                                <Form.Item>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    // onClick={(e) => {
                                    //   AgedomicileFormSubmit(e);
                                    // }}
                                  >
                                    OTP
                                  </Button>
                                </Form.Item>
                              </div>
                            </div>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container> */}
                <Container fluid={true}>
                  <Row>
                    <Col sm="">
                      <Card>
                        <CardBody>
                          <div class="box-header box-header-bg">
                            <h3 class="box-title">
                              <span id="CPH_Panelappdetails">
                                Beneficiary Relation
                              </span>
                            </h3>
                          </div>

                          <Form
                            name="basic"
                            autoComplete="off"
                            layout={"vertical"}
                          >
                            <div className="row">
                              {" "}
                              <div className="col-md-4">
                                <label htmlFor="" className="mb-3">
                                  {" "}
                                  Years of residence at current address{" "}
                                  <span className="red">*</span>
                                </label>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input residing !",
                                    },
                                  ]}
                                >
                                  <Input
                                    value={Data.relationApplicant_beneficiary}
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        relationApplicant_beneficiary:
                                          e.target.value,
                                      });
                                    }}
                                  />
                                  <p className="red">
                                    {Formerror.year_of_residences_current}
                                  </p>
                                </Form.Item>
                              </div>
                              <div className="col-md-4">
                                <label htmlFor="" className="mb-3">
                                  {" "}
                                  Applicant residing in Maharashtra mini 15y
                                  <span className="red">*</span>
                                </label>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input residing !",
                                    },
                                  ]}
                                >
                                  <Input
                                    value={Data.Applicunt_Live_In_MH_Inyear}
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        Applicunt_Live_In_MH_Inyear:
                                          e.target.value,
                                      });
                                    }}
                                  />
                                  <p className="red">
                                    {Formerror.Applicunt_Live_In_MH_Inyear}
                                  </p>
                                </Form.Item>
                              </div>
                              <div className="col-md-4">
                                <label htmlFor="" className="mb-3">
                                  {" "}
                                  Relation of Applicant with Beneficiary{" "}
                                  <span className="red">*</span>
                                </label>
                                <Form.Item>
                                  <Select
                                    placeholder="--select--"
                                    value={Data.relationApplicant_beneficiary}
                                    onChange={(e) => {
                                      // SetData({
                                      //   ...Data,
                                      //   relationApplicant_beneficiary: e,
                                      // });
                                      addSelfData(e);
                                    }}
                                  >
                                    {relationApplicant_beneficiary.map(
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
                                  Beneficiary Full Name{" "}
                                  <span className="red">*</span>
                                </label>

                                <Form.Item>
                                  <Select
                                    placeholder="--select--"
                                    value={Data.benificiary_NameStatus}
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        benificiary_NameStatus: e,
                                      });
                                    }}
                                  >
                                    <Select.Option value="Kumar">
                                      Kumar
                                    </Select.Option>
                                    <Select.Option value="Advocate">
                                      Advocate
                                    </Select.Option>
                                    <Select.Option value="Shri">
                                      Mr.
                                    </Select.Option>
                                    <Select.Option value="Kumari">
                                      Kumari
                                    </Select.Option>
                                    <Select.Option value="Ms">Ms</Select.Option>
                                    <Select.Option value="Shrimati">
                                      Shrimati
                                    </Select.Option>
                                    <Select.Option value="Mrs">
                                      Mrs
                                    </Select.Option>
                                  </Select>
                                  <Input
                                    value={Data.benificiary_Name}
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        benificiary_Name: e.target.value,
                                      });
                                    }}
                                  />
                                </Form.Item>

                                {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> state
                      </label> */}
                                {/* <Form.Item>
                        <Select
                          placeholder="Select State"
                          onChange={(e) => {
                            SetData({ ...Data, state: e });
                          }}
                        >
                          <Select.Option value="Maharashtra">
                            Maharashtra
                          </Select.Option>
                        </Select>
                      </Form.Item> */}
                              </div>
                              <div className="col-md-4">
                                <label htmlFor="" className="mb-3">
                                  {" "}
                                  <span className="red">*</span>Date Of Birth
                                </label>

                                <Form.Item>
                                  <DatePicker
                                    onChange={ChangeDate}
                                    format="YYYY-MM-DD"
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-4">
                                <label htmlFor="" className="mb-3">
                                  {" "}
                                  Mobile <span className="red">*</span>
                                </label>

                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Mobile!",
                                    },
                                  ]}
                                >
                                  <Input
                                    value={Data.Benificiary_Phoneno}
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        Benificiary_Phoneno: e.target.value,
                                      });
                                    }}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">Birth Detail :</span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Birth Address as above?
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
                      </Form.Item>{" "}
                    </div>
                    {BrithAddress && (
                      <>
                        <Container fluid={true}>
                          <Row>
                            <Col sm="">
                              <Card>
                                <CardBody>
                                  <div class="box-header box-header-bg">
                                    <h3 class="box-title">
                                      <span id="CPH_Panelappdetails">
                                        Birth Detail (In case you select any
                                        country, apart from India, mention
                                        complete address in columns for
                                        District, Tehsil and village.) :
                                      </span>
                                    </h3>
                                  </div>
                                  <Form
                                    name="basic"
                                    autoComplete="off"
                                    layout={"vertical"}
                                  >
                                    <div className="row">
                                      {" "}
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Address <span className="red">*</span>
                                        </label>
                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Address!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={Data.BirthDetails_address}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_address:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                          <p className="red">
                                            {Formerror.BirthDetails_address}
                                          </p>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Street
                                        </label>
                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Street!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={Data.BirthDetails_streetName}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_streetName:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                          <p className="red">
                                            {Formerror.BirthDetails_streetName}
                                          </p>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Building
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Building!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={Data.BirthDetails_Building}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_Building:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>

                                        {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> state
                      </label> */}
                                        {/* <Form.Item>
                        <Select
                          placeholder="Select State"
                          onChange={(e) => {
                            SetData({ ...Data, state: e });
                          }}
                        >
                          <Select.Option value="Maharashtra">
                            Maharashtra
                          </Select.Option>
                        </Select>
                      </Form.Item> */}
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Locality
                                        </label>

                                        <Form.Item>
                                          <Input
                                            value={Data.BirthDetails_locality}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_locality:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Landmark<span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Country!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={Data.BirthDetails_Country}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_Country:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          <span className="red">*</span>{" "}
                                          District
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your District!",
                                            },
                                          ]}
                                        >
                                          <Select
                                            placeholder="--Select District--"
                                            value={Data.BirthDetails_district}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_district: e,
                                              });
                                            }}
                                          >
                                            <Select.Option value="Sindhudurg">
                                              Sindhudurg
                                            </Select.Option>
                                            <Select.Option value="Solapur">
                                              Solapur
                                            </Select.Option>
                                            <Select.Option value="Thane">
                                              Thane
                                            </Select.Option>
                                            <Select.Option value="Wardha">
                                              Wardha
                                            </Select.Option>
                                            <Select.Option value="Washim">
                                              Washim
                                            </Select.Option>
                                            <Select.Option value="Yavatmal">
                                              Yavatmal
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      {/* <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Tahshil <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Tahshil!",
                                            },
                                          ]}
                                        >
                                          <Input
                                          value={Data.BirthDetails_tehsil}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_tehsil:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div> */}
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Taluka <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Taluka!",
                                            },
                                          ]}
                                        >
                                          <Select
                                            placeholder="--Select Taluka--"
                                            value={Data.BirthDetails_tehsil}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_tehsil: e,
                                              });
                                            }}
                                          >
                                            <Select.Option value="Bhor">
                                              Bhor
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Village <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Village!",
                                            },
                                          ]}
                                        >
                                          <Select
                                            placeholder="--Select Village--"
                                            value={Data.BirthDetails_village}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_village: e,
                                              });
                                            }}
                                          >
                                            <Select.Option
                                              value=" sangvi
"
                                            >
                                              sangvi
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Relation
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Vehicle Type"
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
                      </Form.Item>
                    </div> */}
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Pincode <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Pincode!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={Data.BirthDetails_pincode}
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                BirthDetails_pincode:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div>
                                      {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        UID No.
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
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              application_last_name: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div> */}
                                    </div>
                                  </Form>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </Container>
                      </>
                    )}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">
                      Education Details of Beneficiary :
                    </span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    {" "}
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Education Details of Beneficiary{" "}
                        <span className="red">*</span>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="--select--"
                          value={EducationDetails.begree}
                          onChange={(e) => {
                            SetEducationDetails({
                              ...EducationDetails,
                              begree: e,
                            });
                          }}
                        >
                          <Select.Option value="Below SSC">
                            Below SSC
                          </Select.Option>
                          <Select.Option value="Diploma">Diploma</Select.Option>
                          <Select.Option value="Graduate">
                            Graduate
                          </Select.Option>
                          <Select.Option value="HSC">HSC</Select.Option>
                          <Select.Option value="Illiterate">
                            Illiterate
                          </Select.Option>
                          <Select.Option value="ITI">ITI</Select.Option>
                          <Select.Option value="Post Graduate">
                            Post Graduate
                          </Select.Option>
                          <Select.Option value="SSC">SSC</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        University / Board<span className="red">*</span>
                      </label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input Enter  University!",
                          },
                        ]}
                      >
                        <Input
                          value={EducationDetails.organizationName}
                          onChange={(e) => {
                            SetEducationDetails({
                              ...EducationDetails,
                              organizationName: e.target.value,
                            });
                          }}
                        />
                        <p className="red">{Formerror.EducationDetails}</p>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Admission Year <span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input Enter Admission year!",
                          },
                        ]}
                      >
                        <Input
                          value={EducationDetails.AddmisionYear}
                          onChange={(e) => {
                            SetEducationDetails({
                              ...EducationDetails,
                              AddmisionYear: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>

                      {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> state
                      </label> */}
                      {/* <Form.Item>
                        <Select
                          placeholder="Select State"
                          onChange={(e) => {
                            SetData({ ...Data, state: e });
                          }}
                        >
                          <Select.Option value="Maharashtra">
                            Maharashtra
                          </Select.Option>
                        </Select>
                      </Form.Item> */}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red"></span> Completion Year
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input Enter Completion year!",
                          },
                        ]}
                      >
                        <Input
                          value={EducationDetails.leaveYear}
                          onChange={(e) => {
                            SetEducationDetails({
                              ...EducationDetails,
                              leaveYear: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red"></span> Institute Details
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input Enter Institute Details!",
                          },
                        ]}
                      >
                        <Input
                          value={EducationDetails.EducationPlace}
                          onChange={(e) => {
                            SetEducationDetails({
                              ...EducationDetails,
                              EducationPlace: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="row">
                      <div className="col-md-1">
                        <Form.Item>
                          {/* <input
                type="submit"
                name="btnsubmit"
                value="Add"
                onClick={(e) => {

                  console.log(2001,EducationDetails)
                }}
                onkeypress="return IsAlphabet(event);"
                id="CPH_btnsubmit"
                tabindex="88"
                class="btn btn-primary" style={{alignItems:"center"}}

              /> */}
                          <Button
                            className="btn btn-success"
                            onClick={(e) => {
                              e.preventDefault();
                              const find = EducationDetailsArray.find(
                                (item) =>
                                  item.organizationName ===
                                  EducationDetails.organizationName
                              );
                              if (!find) {
                                SetEducationDetailsArray([
                                  ...EducationDetailsArray,
                                  EducationDetails,
                                ]);
                              }
                            }}
                          >
                            Add
                          </Button>
                        </Form.Item>
                      </div>
                      {EducationDetailsArray.map((row) => (
                        <>
                          <div class="col-md-12 table-responsive">
                            <table
                              class="table table-striped"
                              id="tdRelationList"
                            >
                              <tbody>
                                <tr>
                                  {/* <th align="center" >Sr.no
                                <td>
                                    </td>
                                    </th> */}

                                  <th align="center">
                                    Dgree
                                    <td>
                                      <h5>{row.begree}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    University / Board
                                    <td>
                                      <h5>{row.organizationName}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    {" "}
                                    Admission Year
                                    <td>
                                      <h5>{row.AddmisionYear}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    Completion Year
                                    <td>
                                      <h5>{row.leaveYear}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    Institute Details
                                    <td>
                                      <h5>{row.EducationPlace}</h5>
                                    </td>
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">
                          *
                          <h3>
                            Has beneficiary migrated from a different state?
                            (Yes/No){" "}
                          </h3>
                        </span>
                      </label>
                      <Form.Item>
                        <Radio.Group>
                          <Radio
                            value="yes"
                            onClick={(e) => setMigratedDetails(true)}
                          >
                            Yes
                          </Radio>
                          <Radio
                            value="No"
                            onClick={(e) => setMigratedDetails(false)}
                          >
                            No
                          </Radio>
                        </Radio.Group>
                      </Form.Item>{" "}
                    </div>
                    {MigratedDetails && (
                      <>
                        <Container fluid={true}>
                          <Row>
                            <Col sm="">
                              <Card>
                                <CardBody>
                                  <div class="box-header box-header-bg">
                                    <h3 class="box-title">
                                      <span id="CPH_Panelappdetails">
                                        Migration Address Details:
                                      </span>
                                    </h3>
                                  </div>
                                  <Form
                                    name="basic"
                                    autoComplete="off"
                                    layout={"vertical"}
                                  >
                                    <div className="row">
                                      {" "}
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Migrated_Year
                                          <span className="red">*</span>
                                        </label>
                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Migrated year to maharashtra!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={
                                              MigrationBeneficiary.migrationToMHYear
                                            }
                                            onChange={(e) => {
                                              SetMigrationBeneficiary({
                                                ...MigrationBeneficiary,
                                                migrationToMHYear:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Before-Migration-location
                                        </label>
                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your District!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={
                                              MigrationBeneficiary.BeforeMigrationLocation
                                            }
                                            onChange={(e) => {
                                              SetMigrationBeneficiary({
                                                ...MigrationBeneficiary,
                                                BeforeMigrationLocation:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Reason-of-Migration
                                          <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                " Enter Reason of migration!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={
                                              MigrationBeneficiary.reasonOfMigration
                                            }
                                            onChange={(e) => {
                                              SetMigrationBeneficiary({
                                                ...MigrationBeneficiary,
                                                reasonOfMigration:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                          <p className="red">
                                            {Formerror.reasonOfMigration}
                                          </p>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Place-of-Migration{" "}
                                          <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message: "Place of Migration!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={
                                              MigrationBeneficiary.placeOfMigration
                                            }
                                            onChange={(e) => {
                                              SetMigrationBeneficiary({
                                                ...MigrationBeneficiary,
                                                placeOfMigration:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                          <p className="red">
                                            {Formerror.placeOfMigration}
                                          </p>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          From Date
                                          <span className="red">*</span>
                                        </label>

                                        <Form.Item>
                                          <DatePicker
                                            onChange={handalStartDate}
                                            format="YYYY-MM-DD"
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          To Date<span className="red">*</span>
                                        </label>
                                        <Form.Item>
                                          <DatePicker
                                            onChange={handalEndDate}
                                            format="YYYY-MM-DD"
                                          />
                                        </Form.Item>{" "}
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Migration-End-Year{" "}
                                        </label>

                                        <Form.Item>
                                          <Input
                                            value={
                                              MigrationBeneficiary.MigrationEndYea
                                            }
                                            onChange={(e) => {
                                              SetMigrationBeneficiary({
                                                ...MigrationBeneficiary,
                                                MigrationEndYea: e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-1">
                                          <Form.Item>
                                            <Button
                                              className="btn btn-success"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                const find =
                                                  MigrationBeneficiaryArray.find(
                                                    (item) =>
                                                      item.BeforeMigrationLocation ===
                                                      MigrationBeneficiary.BeforeMigrationLocation
                                                  );
                                                if (!find) {
                                                  SetMigrationBeneficiaryArray([
                                                    ...MigrationBeneficiaryArray,
                                                    MigrationBeneficiary,
                                                  ]);
                                                }
                                              }}
                                            >
                                              Add
                                            </Button>
                                          </Form.Item>
                                        </div>
                                        {MigrationBeneficiaryArray.map(
                                          (row) => (
                                            <>
                                              <div class="col-md-12 table-responsive">
                                                <table
                                                  class="table table-striped"
                                                  id="tdRelationList"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      {/* <th align="center" >Sr.no
                                <td>
                                    </td>
                                    </th> */}

                                                      <th align="center">
                                                        {" "}
                                                        Migration-To-MHYear
                                                        <td>
                                                          <h5>
                                                            {
                                                              row.migrationToMHYear
                                                            }
                                                          </h5>
                                                        </td>
                                                      </th>
                                                      <th align="center">
                                                        Before-Migration-Location
                                                        <td>
                                                          <h5>
                                                            {
                                                              row.BeforeMigrationLocation
                                                            }
                                                          </h5>
                                                        </td>
                                                      </th>
                                                      <th align="center">
                                                        {" "}
                                                        Reason-Of-Migration
                                                        <td>
                                                          <h5>
                                                            {
                                                              row.reasonOfMigration
                                                            }
                                                          </h5>
                                                        </td>
                                                      </th>
                                                      <th align="center">
                                                        {" "}
                                                        Place-Of-Migration
                                                        <td>
                                                          <h5>
                                                            {
                                                              row.placeOfMigration
                                                            }
                                                          </h5>
                                                        </td>
                                                      </th>
                                                      <th align="center">
                                                        {" "}
                                                        Migration-Start-Year
                                                        <td>
                                                          <h5>
                                                            {
                                                              row.MigrationStartYear
                                                            }
                                                          </h5>
                                                        </td>
                                                      </th>
                                                      <th align="center">
                                                        {" "}
                                                        Migration-End-Year
                                                        <td>
                                                          <h5>
                                                            {
                                                              row.MigrationEndYear
                                                            }
                                                          </h5>
                                                        </td>
                                                      </th>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </>
                                          )
                                        )}
                                      </div>
                                      <Container fluid={true}>
                                        <Row>
                                          <Col sm="">
                                            <Card>
                                              <CardBody>
                                                <Form
                                                  name="basic"
                                                  autoComplete="off"
                                                  layout={"vertical"}
                                                >
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <label
                                                        htmlFor=""
                                                        className="mb-3"
                                                      >
                                                        {" "}
                                                        <span className="red">
                                                          *
                                                        </span>
                                                        <h3>
                                                          Details of movable
                                                          property, belong to
                                                          Applicant/Father/husband
                                                          in the state of
                                                          Maharashtra
                                                        </h3>
                                                      </label>
                                                      <div>
                                                        Details of movable
                                                        property, belong to
                                                        Applicant/Father/husband
                                                        in the state of
                                                        Maharashtra *
                                                      </div>
                                                      <Form.Item>
                                                        <Radio.Group>
                                                          <Radio
                                                            value="yes"
                                                            onClick={() =>
                                                              SetMoveableProperty(
                                                                true
                                                              )
                                                            }
                                                          >
                                                            Yes
                                                          </Radio>
                                                          <Radio
                                                            value="No"
                                                            onClick={() =>
                                                              SetMoveableProperty(
                                                                false
                                                              )
                                                            }
                                                          >
                                                            No
                                                          </Radio>
                                                        </Radio.Group>
                                                      </Form.Item>{" "}
                                                    </div>
                                                    {MoveableProperty && (
                                                      <>
                                                        <Container fluid={true}>
                                                          <Row>
                                                            <Col sm="">
                                                              <Card>
                                                                <CardBody>
                                                                  <div class="box-header box-header-bg">
                                                                    <h3 class="box-title">
                                                                      <span id="CPH_Panelappdetails">
                                                                        Property
                                                                        Details
                                                                        :
                                                                      </span>
                                                                    </h3>
                                                                  </div>
                                                                  <Form
                                                                    name="basic"
                                                                    autoComplete="off"
                                                                    layout={
                                                                      "vertical"
                                                                    }
                                                                  >
                                                                    <div className="row">
                                                                      {" "}
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Address{" "}
                                                                          <span className="red">
                                                                            *
                                                                          </span>
                                                                        </label>
                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your Address!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Input
                                                                            value={Data.Proparty_address}
                                                                            onChange={(e) => {SetData({...Data,Proparty_address :e.target.value, });}}
                                                                          />
                                                                         
                                                                        </Form.Item>
                                                                      </div>
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Street
                                                                        </label>
                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your Street!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Input
                                                                            value={
                                                                              Data.Proparty_street
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  Proparty_street:
                                                                                    e
                                                                                      .target
                                                                                      .value,
                                                                                }
                                                                              );
                                                                            }}
                                                                          />
                                                                          <p className="red">
                                                                            {
                                                                              Formerror.Proparty_street
                                                                            }
                                                                          </p>
                                                                        </Form.Item>
                                                                      </div>
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Building
                                                                        </label>

                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your Building!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Input
                                                                            value={
                                                                              Data.Proparty_Building
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  Proparty_Building:
                                                                                    e
                                                                                      .target
                                                                                      .value,
                                                                                }
                                                                              );
                                                                            }}
                                                                          />
                                                                          <p className="red">
                                                                            {
                                                                              Formerror.Proparty_Building
                                                                            }
                                                                          </p>
                                                                        </Form.Item>
                                                                      </div>
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Locality
                                                                        </label>

                                                                        <Form.Item>
                                                                          <Input
                                                                            value={
                                                                              Data.Proparty_locality
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  Proparty_locality:
                                                                                    e
                                                                                      .target
                                                                                      .value,
                                                                                }
                                                                              );
                                                                            }}
                                                                          />
                                                                          <p className="red">
                                                                            {
                                                                              Formerror.Proparty_locality
                                                                            }
                                                                          </p>
                                                                        </Form.Item>
                                                                      </div>
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Country
                                                                          <span className="red">
                                                                            *
                                                                          </span>
                                                                        </label>

                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your landmark!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Input
                                                                            value={Data.Proparty_Country }
                                                                            onChange={(e) => {
                                                                              SetData({ ...Data,Proparty_Country:e.target.value,});}}
                                                                          />
                                                                        </Form.Item>
                                                                      </div>
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          <span className="red">
                                                                            *
                                                                          </span>{" "}
                                                                          District
                                                                        </label>

                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your District!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Select
                                                                            placeholder="--Select District--"
                                                                            value={
                                                                              Data.Proparty_district
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  Proparty_district:
                                                                                    e,
                                                                                }
                                                                              );
                                                                            }}
                                                                          >
                                                                            <Select.Option value="Ahmednagar">
                                                                              Ahmednagar
                                                                            </Select.Option>
                                                                            <Select.Option value="Akola">
                                                                              Akola
                                                                            </Select.Option>
                                                                            <Select.Option value="Amravati">
                                                                              Amravati{" "}
                                                                            </Select.Option>
                                                                            <Select.Option value="Aurangabad">
                                                                              Aurangabad
                                                                            </Select.Option>
                                                                            <Select.Option value="Bhandara">
                                                                              Bhandara
                                                                            </Select.Option>
                                                                            <Select.Option value="Bid">
                                                                              Bid
                                                                            </Select.Option>
                                                                            <Select.Option value="Buldhana">
                                                                              Buldhana
                                                                            </Select.Option>
                                                                            <Select.Option value="Chandrapur">
                                                                              Chandrapur
                                                                            </Select.Option>
                                                                            <Select.Option value="Dhule">
                                                                              Dhule
                                                                            </Select.Option>
                                                                            <Select.Option value="Gadchiroli">
                                                                              Gadchiroli
                                                                            </Select.Option>
                                                                            <Select.Option value="Gondhiya">
                                                                              Gondhiya
                                                                            </Select.Option>
                                                                            <Select.Option value="Hingoli">
                                                                              Hingoli
                                                                            </Select.Option>
                                                                            <Select.Option value="Jalgaon">
                                                                              Jalgaon
                                                                            </Select.Option>
                                                                            <Select.Option value="Jalna">
                                                                              Jalna
                                                                            </Select.Option>
                                                                            <Select.Option value="Kolhapur">
                                                                              Kolhapur
                                                                            </Select.Option>
                                                                            <Select.Option value="Latur">
                                                                              Latur
                                                                            </Select.Option>
                                                                            <Select.Option value="Mumbai">
                                                                              Mumbai
                                                                            </Select.Option>
                                                                            <Select.Option value="Mumbai Suburban">
                                                                              Mumbai
                                                                              Suburban
                                                                            </Select.Option>
                                                                            <Select.Option value="Nagpur">
                                                                              Nagpur
                                                                            </Select.Option>
                                                                            <Select.Option value="Nanded">
                                                                              Nanded
                                                                            </Select.Option>
                                                                            <Select.Option value="Nandurbar">
                                                                              Nandurbar
                                                                            </Select.Option>
                                                                            <Select.Option value="Nashik">
                                                                              Nashik
                                                                            </Select.Option>
                                                                            <Select.Option value="Osmanabad">
                                                                              Osmanabad
                                                                            </Select.Option>
                                                                            <Select.Option value="Parbhani">
                                                                              Parbhani
                                                                            </Select.Option>
                                                                            <Select.Option value="Pune">
                                                                              Pune
                                                                            </Select.Option>
                                                                            <Select.Option value="Raigarh">
                                                                              Raigarh
                                                                            </Select.Option>
                                                                            <Select.Option value="Ratnagiri">
                                                                              Ratnagiri
                                                                            </Select.Option>
                                                                            <Select.Option value="Sangli">
                                                                              Sangli
                                                                            </Select.Option>
                                                                            <Select.Option value="Satara">
                                                                              Satara
                                                                            </Select.Option>
                                                                            <Select.Option value="Sindhudurg">
                                                                              Sindhudurg
                                                                            </Select.Option>
                                                                            <Select.Option value="Solapur">
                                                                              Solapur
                                                                            </Select.Option>
                                                                            <Select.Option value="Thane">
                                                                              Thane
                                                                            </Select.Option>
                                                                            <Select.Option value="Wardha">
                                                                              Wardha
                                                                            </Select.Option>
                                                                            <Select.Option value="Washim">
                                                                              Washim
                                                                            </Select.Option>
                                                                            <Select.Option value="Yavatmal">
                                                                              Yavatmal
                                                                            </Select.Option>
                                                                          </Select>
                                                                        </Form.Item>
                                                                      </div>
                                                                      {/* <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Tahshil{" "}
                                                                          <span className="red">
                                                                            *
                                                                          </span>
                                                                        </label>

                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your Tahshil!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Input
                                                                          value={Data.BirthDetails_tehsil}
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  BirthDetails_tehsil:
                                                                                    e
                                                                                      .target
                                                                                      .value,
                                                                                }
                                                                              );
                                                                            }}
                                                                          />
                                                                        </Form.Item>
                                                                      </div> */}
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Taluka{" "}
                                                                          <span className="red">
                                                                            *
                                                                          </span>
                                                                        </label>

                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your Taluka!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Select
                                                                            placeholder="--Select Taluka--"
                                                                            value={
                                                                              Data.Proparty_Tehsil
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  Proparty_Tehsil:
                                                                                    e,
                                                                                }
                                                                              );
                                                                            }}
                                                                          >
                                                                            <Select.Option value="Bhor">
                                                                              Bhor
                                                                            </Select.Option>
                                                                          </Select>
                                                                        </Form.Item>
                                                                      </div>
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Village{" "}
                                                                          <span className="red">
                                                                            *
                                                                          </span>
                                                                        </label>

                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your Village!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Select
                                                                            placeholder="--Select Village--"
                                                                            value={
                                                                              Data.Proparty_village
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  Proparty_village:
                                                                                    e,
                                                                                }
                                                                              );
                                                                            }}
                                                                          >
                                                                            <Select.Option
                                                                              value=" sangvi
"
                                                                            >
                                                                              sangvi
                                                                            </Select.Option>
                                                                          </Select>
                                                                        </Form.Item>
                                                                      </div>
                                                                      {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Relation
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Vehicle Type"
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
                      </Form.Item>
                    </div> */}
                                                                      <div className="col-md-4">
                                                                        <label
                                                                          htmlFor=""
                                                                          className="mb-3"
                                                                        >
                                                                          {" "}
                                                                          Pincode{" "}
                                                                          <span className="red">
                                                                            *
                                                                          </span>
                                                                        </label>

                                                                        <Form.Item
                                                                          rules={[
                                                                            {
                                                                              required: true,
                                                                              message:
                                                                                "Please input your Pincode!",
                                                                            },
                                                                          ]}
                                                                        >
                                                                          <Input
                                                                            value={
                                                                              Data.Proparty_pincode
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              SetData(
                                                                                {
                                                                                  ...Data,
                                                                                  Proparty_pincode:
                                                                                    e
                                                                                      .target
                                                                                      .value,
                                                                                }
                                                                              );
                                                                            }}
                                                                          />
                                                                        </Form.Item>
                                                                      </div>
                                                                    </div>
                                                                  </Form>
                                                                </CardBody>
                                                              </Card>
                                                            </Col>
                                                          </Row>
                                                        </Container>
                                                      </>
                                                    )}
                                                    <Container fluid={true}>
                                                      <Row>
                                                        <Col sm="">
                                                          <Card>
                                                            <CardBody>
                                                              <div class="box-header box-header-bg">
                                                                <h3 class="box-title">
                                                                  <span id="CPH_Panelappdetails">
                                                                    Property
                                                                    Details:
                                                                  </span>
                                                                </h3>
                                                              </div>
                                                              <Form
                                                                name="basic"
                                                                autoComplete="off"
                                                                layout={
                                                                  "vertical"
                                                                }
                                                              >
                                                                <div className="row">
                                                                  {" "}
                                                                  <div className="col-md-4">
                                                                    <label
                                                                      htmlFor=""
                                                                      className="mb-3"
                                                                    >
                                                                      {" "}
                                                                      <span className="red"></span>{" "}
                                                                      Property
                                                                      Holder
                                                                      Relation
                                                                      with
                                                                      Beneficiary
                                                                    </label>

                                                                    <Form.Item>
                                                                      <Select
                                                                        placeholder="--select--"
                                                                        value={
                                                                          Data.Benificiary_propartyHolder_Relation
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          SetData(
                                                                            {
                                                                              ...Data,
                                                                              Benificiary_propartyHolder_Relation:
                                                                                e,
                                                                            }
                                                                          );
                                                                        }}
                                                                      >
                                                                        {relationApplicant_beneficiary.map(
                                                                          (
                                                                            row,
                                                                            index
                                                                          ) => (
                                                                            <option
                                                                              value={
                                                                                row
                                                                              }
                                                                              key={
                                                                                index
                                                                              }
                                                                            >
                                                                              {
                                                                                row
                                                                              }
                                                                            </option>
                                                                          )
                                                                        )}
                                                                      </Select>
                                                                    </Form.Item>
                                                                  </div>
                                                                  <div className="col-md-4">
                                                                    <label
                                                                      htmlFor=""
                                                                      className="mb-3"
                                                                    >
                                                                      {" "}
                                                                      Property
                                                                      Detail{" "}
                                                                    </label>
                                                                    <Form.Item
                                                                      rules={[
                                                                        {
                                                                          required: true,
                                                                          message:
                                                                            "Please input your property detail!",
                                                                        },
                                                                      ]}
                                                                    >
                                                                      <Input
                                                                        value={
                                                                          Data.Benificiary_propartyDetails
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          SetData(
                                                                            {
                                                                              ...Data,
                                                                              Benificiary_propartyDetails:
                                                                                e
                                                                                  .target
                                                                                  .value,
                                                                            }
                                                                          );
                                                                        }}
                                                                      />
                                                                    </Form.Item>
                                                                  </div>
                                                                  <div className="col-md-4">
                                                                    <label
                                                                      htmlFor=""
                                                                      className="mb-3"
                                                                    >
                                                                      {" "}
                                                                      Beneficiary's
                                                                      father's /
                                                                      husband's
                                                                      place of
                                                                      residence
                                                                    </label>

                                                                    <Form.Item
                                                                      rules={[
                                                                        {
                                                                          required: true,
                                                                          message:
                                                                            "Please Enter input ",
                                                                        },
                                                                      ]}
                                                                    >
                                                                      <Input
                                                                        value={
                                                                          Data.Benificiary_Father_HusRecidance
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          SetData(
                                                                            {
                                                                              ...Data,
                                                                              Benificiary_Father_HusRecidance:
                                                                                e
                                                                                  .target
                                                                                  .value,
                                                                            }
                                                                          );
                                                                        }}
                                                                      />
                                                                    </Form.Item>

                                                                    {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> state
                      </label> */}
                                                                    {/* <Form.Item>
                        <Select
                          placeholder="Select State"
                          onChange={(e) => {
                            SetData({ ...Data, state: e });
                          }}
                        >
                          <Select.Option value="Maharashtra">
                            Maharashtra
                          </Select.Option>
                        </Select>
                      </Form.Item> */}
                                                                  </div>
                                                                  <div className="col-md-4">
                                                                    <label
                                                                      htmlFor=""
                                                                      className="mb-3"
                                                                    >
                                                                      {" "}
                                                                      At the
                                                                      time of
                                                                      birth of
                                                                      the
                                                                      beneficiary,
                                                                      place of
                                                                      residence
                                                                      of father{" "}
                                                                    </label>

                                                                    <Form.Item>
                                                                      <Input
                                                                        value={
                                                                          Data.Benificiary_FatherRecidaceOfBirth
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          SetData(
                                                                            {
                                                                              ...Data,
                                                                              Benificiary_FatherRecidaceOfBirth:
                                                                                e
                                                                                  .target
                                                                                  .value,
                                                                            }
                                                                          );
                                                                        }}
                                                                      />
                                                                    </Form.Item>
                                                                  </div>
                                                                  <div className="col-md-4">
                                                                    <label
                                                                      htmlFor=""
                                                                      className="mb-3"
                                                                    >
                                                                      {" "}
                                                                      If
                                                                      Beneficiary's
                                                                      father /
                                                                      husband is
                                                                      staying
                                                                      outside
                                                                      Maharashtra,
                                                                      then place
                                                                      of
                                                                      residence{" "}
                                                                    </label>

                                                                    <Form.Item>
                                                                      <Input
                                                                        value={
                                                                          Data.isBenificiary_FatherRecidaceOfBirth_outOf_MH
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          SetData(
                                                                            {
                                                                              ...Data,
                                                                              isBenificiary_FatherRecidaceOfBirth_outOf_MH:
                                                                                e
                                                                                  .target
                                                                                  .value,
                                                                            }
                                                                          );
                                                                        }}
                                                                      />
                                                                    </Form.Item>
                                                                  </div>
                                                                  <div className="col-md-4">
                                                                    <label
                                                                      htmlFor=""
                                                                      className="mb-3"
                                                                    >
                                                                      {" "}
                                                                      Place of
                                                                      employment
                                                                      /
                                                                      enrolment
                                                                      for scheme
                                                                      if any{" "}
                                                                    </label>

                                                                    <Form.Item>
                                                                      <Input
                                                                        value={
                                                                          Data.placeOfEmploment
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          SetData(
                                                                            {
                                                                              ...Data,
                                                                              placeOfEmploment:
                                                                                e
                                                                                  .target
                                                                                  .value,
                                                                            }
                                                                          );
                                                                        }}
                                                                      />
                                                                    </Form.Item>
                                                                  </div>
                                                                </div>
                                                              </Form>
                                                            </CardBody>
                                                          </Card>
                                                        </Col>
                                                      </Row>
                                                    </Container>
                                                  </div>
                                                </Form>
                                              </CardBody>
                                            </Card>
                                          </Col>
                                        </Row>
                                      </Container>
                                    </div>
                                  </Form>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </Container>
                      </>
                    )}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>
                        <h3>
                          Whether applicant is beneficiary of government scheme
                          in other district? If yes, provide the details of the
                          place.
                        </h3>
                      </label>
                      <div>
                        Whether applicant is beneficiary of government scheme in
                        other district? If yes, provide the details of the
                        place*
                      </div>
                      <Form.Item>
                        <Radio.Group>
                          <Radio
                            value="yes"
                            onClick={() => SetOtherstate(true)}
                          >
                            Yes
                          </Radio>
                          <Radio
                            value="No"
                            onClick={() => SetOtherstate(false)}
                          >
                            No
                          </Radio>
                        </Radio.Group>
                      </Form.Item>{" "}
                    </div>
                    {Otherstate && (
                      <>
                        <Container fluid={true}>
                          <Row>
                            <Col sm="">
                              <Card>
                                <CardBody>
                                  <div class="box-header box-header-bg">
                                    <h3 class="box-title">
                                      <span id="CPH_Panelappdetails">
                                        Whether applicant is beneficiary of
                                        government scheme in other district? If
                                        yes, provide the details of the place. :
                                      </span>
                                    </h3>
                                  </div>
                                  <Form
                                    name="basic"
                                    autoComplete="off"
                                    layout={"vertical"}
                                  >
                                    <div className="row">
                                      {" "}
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          State <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your State!",
                                            },
                                          ]}
                                        >
                                          <Select
                                            placeholder="--Select State--"
                                            value={
                                              Data.ApllicantBenificiaryOtherState
                                            }
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                ApllicantBenificiaryOtherState:
                                                  e,
                                              });
                                            }}
                                          >
                                            <Select.Option value=" sangvi">
                                              sangvi
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          <span className="red">*</span>{" "}
                                          District
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your District!",
                                            },
                                          ]}
                                        >
                                          <Select
                                            placeholder="--Select District--"
                                            value={
                                              Data.ApllicantBenificiaryOtherState_district
                                            }
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                ApllicantBenificiaryOtherState_district:
                                                  e,
                                              });
                                            }}
                                          >
                                            <Select.Option value="Ahmednagar">
                                              Ahmednagar
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Taluka <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Taluka!",
                                            },
                                          ]}
                                        >
                                          <Select
                                            placeholder="--Select Taluka--"
                                            value={
                                              Data.ApllicantBenificiaryOtherState_Taluka
                                            }
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                ApllicantBenificiaryOtherState_Taluka:
                                                  e,
                                              });
                                            }}
                                          >
                                            <Select.Option value="Bhor">
                                              Bhor
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Village <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your Village!",
                                            },
                                          ]}
                                        >
                                          <Select
                                            placeholder="--Select Village--"
                                            value={
                                              Data.ApllicantBenificiaryOtherState_Village
                                            }
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                ApllicantBenificiaryOtherState_Village:
                                                  e,
                                              });
                                            }}
                                          >
                                            <Select.Option
                                              value=" sangvi
"
                                            >
                                              sangvi
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Relation
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Vehicle Type"
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
                      </Form.Item>
                    </div> */}
                                      <div className="col-md-4">
                                        <label htmlFor="" className="mb-3">
                                          {" "}
                                          Pincode <span className="red">*</span>
                                        </label>

                                        <Form.Item
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please input your pincode!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            value={
                                              Data.ApllicantBenificiaryOtherState_pincode
                                            }
                                            onChange={(e) => {
                                              SetData({
                                                ...Data,
                                                ApllicantBenificiaryOtherState_pincode:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </div>
                                    </div>
                                  </Form>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </Container>
                      </>
                    )}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">
                      Family Member Details of Beneficiary (If he / she holds a
                      valid Age, Domicile and Nationality Certificate)
                    </span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    {" "}
                    <div className="col-md-mt-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Relation with Beneficiary<span className="red">*</span>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="--select--"
                          value={FMemberBeneficiary.relation_beneficiary}
                          onChange={(e) => {
                            SetFMemberBeneficiary({
                              ...FMemberBeneficiary,
                              relation_beneficiary: e,
                            });
                          }}
                        >
                          {relationApplicant_beneficiary.map((row, index) => (
                            <option value={row} key={index}>
                              {row}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>{" "}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Family member name<span className="red">*</span>
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your Family member name!",
                          },
                        ]}
                      >
                        <Input
                          value={FMemberBeneficiary.familyMember_name}
                          onChange={(e) => {
                            SetFMemberBeneficiary({
                              ...FMemberBeneficiary,
                              familyMember_name: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="row">
                      <div className="col-md-1">
                        <Form.Item>
                          <Button
                            className="btn btn-success"
                            onClick={(e) => {
                              e.preventDefault();
                              const find = FMemberBeneficiaryArray.find(
                                (item) =>
                                  item.relation_beneficiary ===
                                  FMemberBeneficiary.relation_beneficiary
                              );
                              if (!find) {
                                SetFMemberBeneficiaryArray([
                                  ...FMemberBeneficiaryArray,
                                  FMemberBeneficiary,
                                ]);
                              }
                            }}
                          >
                            Add
                          </Button>
                        </Form.Item>
                      </div>
                      {FMemberBeneficiaryArray.map((row) => (
                        <>
                          <div class="col-md-12 table-responsive">
                            <table
                              class="table table-striped"
                              id="tdRelationList"
                            >
                              <tbody>
                                <tr>
                                  {/* <th align="center" >Sr.no
                                <td>
                                    </td>
                                    </th> */}

                                  <th align="center">
                                    {" "}
                                    Relation_Beneficiary
                                    <td>
                                      <h5>{row.relation_beneficiary}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    {" "}
                                    Family-Member-name
                                    <td>
                                      <h5>{row.familyMember_name}</h5>
                                    </td>
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">Certificate :</span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    {" "}
                    <div className="col-md-mt-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Reason<span className="red">*</span>
                      </label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input !",
                          },
                        ]}
                      >
                        <Input
                          value={Data.CertificateReason}
                          onChange={(e) => {
                            SetData({
                              ...Data,
                              CertificateReason: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div className="col-md-12">
                  <h5>Upload required documents: </h5>
                  <h6>
                    अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक कागदपत्रे
                    तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक कागदपत्रे चुकीची
                    किंवा अस्पष्ट आढळल्यास सदर चा अर्ज फेटाळला जाऊ शकतो.{" "}
                  </h6>
                </div>
                {/* reshanCard:"",//
  adharCard:"",//
  lightBill:"",//
  schoolLeaveCertificate:"",//
  taxBillOr15yerOldLightbill:"",
  photo:"",
  selfDeclaration:"",
}); */}

                <div className="col-md-12">
                  <label htmlFor="" className="mb-3">
                    {" "}
                    <span className="red">*</span>Address proof (Size - Maximum
                    1 MB) [Only (jpg,jpeg,pdf)]
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
                      // console.log(992,e);
                    }}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="" className="mb-3">
                    {" "}
                    <span className="red">*</span>electrical bill (Size -
                    Maximum 1 MB) [Only (jpg,jpeg,pdf)]{" "}
                  </label>

                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => {
                      setDocs({
                        ...docs,
                        lightBill: e.target.files[0],
                      });
                      // console.log(992,e);
                    }}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="" className="mb-3">
                    {" "}
                    Reationcard Size Photo (Size - Maximum 500 Kb) [Only
                    (jpg,jpeg)]
                  </label>

                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => {
                      setDocs({
                        ...docs,
                        reshanCard: e.target.files[0],
                      });
                      // console.log(992,e);
                    }}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="" className="mb-3">
                    {" "}
                    text Bill certificate (Size - Maximum 500 Kb) [Only
                    (jpg,jpeg)]
                  </label>
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => {
                      setDocs({
                        ...docs,
                        taxBillOr15yerOldLightbill: e.target.files[0],
                      });
                      // console.log(992,e);
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="" className="mb-3">
                    {" "}
                    school Leaving certificate (Size - Maximum 500 Kb) [Only
                    (jpg,jpeg)]
                  </label>
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => {
                      setDocs({
                        ...docs,
                        schoolLeaveCertificate: e.target.files[0],
                      });
                      // console.log(992,e);
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="" className="mb-3">
                    {" "}
                    Photo (Size - Maximum 500 Kb) [Only (jpg,jpeg)]
                  </label>
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => {
                      setDocs({
                        ...docs,
                        photo: e.target.files[0],
                      });
                      // console.log(992,e);
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="" className="mb-3">
                    {" "}
                    Self Decleration (Size - Maximum 500 Kb) [Only (jpg,jpeg)]
                  </label>
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => {
                      setDocs({
                        ...docs,
                        selfDeclaration: e.target.files[0],
                      });
                      // console.log(992,e);
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="box-title">
                    <span id="CPH_Panelappdetails">Agreement</span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> I solemnly affirm that
                        the above mentioned information submitted by me is true
                        and correct to my knowledge and belief. I hereby agree
                        to be liable for legal consequences for any information
                        found incorrect or untrue at a later date...
                      </label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please fill that!",
                          },
                        ]}
                      >
                        <Radio.Group onChange={(e) => setAgree(true)}>
                          <Radio value="yes">I accept</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="row">
        {/* <div className="col-md-6"> */}
        <div className="row">
          {/* <div className="col-md-1">
              <Form.Item>
                <input
                  type="submit"
                  name="btnsubmit"
                  value="Submit"
                  onClick={(e) => {
                    AgeSubmitdomicile(e);
                  }}
                  onkeypress="return IsAlphabet(event);"
                  id="CPH_btnsubmit"
                  tabindex="88"
                  class="btn btn-primary"
                  style={{ alignItems: "center" }}
                />
              </Form.Item>
            </div> */}

          <div class="col-md-12 text-center">
            {id == undefined ? (
              <input
                type="submit"
                name="ctl00$CPH$btnsubmit"
                value="Proceed"
                onClick={(e) => {
                  AgeSubmitdomicile(e);
                }}
                id="CPH_btnsubmit"
                tabindex="141"
                class="btn btn-success"
              />
            ) : (
              <input
                type="submit"
                name="ctl00$CPH$btnsubmit"
                value="Update"
                onClick={(e) => {
                  editHandler(e);
                }}
                id="CPH_btnsubmit"
                tabindex="141"
                class="btn btn-success"
              />
            )}
            <input
              type="submit"
              name="ctl00$CPH$btnback"
              value="Back"
              onclick='return back();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$CPH$btnback", "", true, "", "", false, false))'
              id="CPH_btnback"
              tabindex="142"
              class="btn btn-warning"
            />
            <input
              type="submit"
              name="ctl00$CPH$btnreset"
              value="Reset"
              onclick='return disp_confirm();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$CPH$btnreset", "", true, "", "", false, false))'
              id="CPH_btnreset"
              tabindex="143"
              class="btn btn-danger"
            />
          </div>
          {/* </div> */}

          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default AgeDomicile;
