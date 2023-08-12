import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdUploadFile } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { Button, Form, Input, Radio, Select, DatePicker, Upload } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { occupationData } from "../../constants/data";
import { relation, income_input } from "../../constants/data";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { incNumber, setUsersData } from "../../Redux/actions";
import {
  work_type,
  districtData,
  ApllicantBenificiaryOtherState,
} from "../../constants/data";
import swal from "sweetalert";

function Income() {
  const { id } = useParams();
  const [balance, setBalance] = useState(0);

  const dispatch = useDispatch();
  const [nameLoading, setNameLoading] = useState(false);
  const [nameMarathi, setnameMarathi] = useState("");
  const [fnameMarathi, setfnameMarathi] = useState("");
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
  const pricess = useSelector((state) => state.price.formPrices);
  // console.log(277,Expence);
  // const users = useSelector((state) => state.userData.user);
  const [user, setUser] = useState([]);
  const [userData, setuserData] = useState({});
  const [getAgent, setgetAgent] = useState([]);
  const [GetFormPrice, setGetFormPrice] = useState();
  const [distict, setDistict] = useState();
  const [Formerror, setFormerror] = useState({});
  const [isSubmit, SetIsSubmit] = useState(false);
  const getData = () => {
    axios
      .get(`https://mhebackend.payagain.in/api/user/getAll`)
      .then((res) => {
        const response = res.data;
        console.log(54, response);
        setUser(response);
        const userdata = JSON.parse(localStorage.getItem("userResponse"));
        console.log(57, userdata.user._id);
        if (userdata) {
          const getFormPrice = response.find(
            (item) => item._id == userdata.user._id
          );
          const getagent = response.filter(
            (item) => item._id === getFormPrice.agent
          );
          setuserData(userdata);
          setgetAgent(getagent);
          setGetFormPrice(getFormPrice?.retaile_formPrice?.retailer_income);
          console.log(66, getFormPrice?.retaile_formPrice?.retailer_income);
        }
        // console.log(37,response)
      })
      .catch((err) => console.log(40, err));
  };
  useEffect(() => {
    setTimeout(getData(), 1000);
  }, []);
  // useEffect(() => {
  //   console.log(Formerror);
  //   if (Object.keys(Formerror).length == 0 && isSubmit) {
  //     // console.log(Data);
  //   }

  // }, [Formerror]);
  // const validate = (values) => {
  //   const error = {};
  //   if (!values.statusfname) {
  //     error.statusfname = " Status full name is required";
  //   }
  //   if (!values.fullName_English) {
  //     error.fullName_English = " FullName English is required";
  //   }

  //   if (!values.statusfname) {
  //     error.statusfname = "statusfname is required";
  //   }
  //   if (!values.fatherName_english) {
  //     error.fatherName_english = " father Name_english nameis required";
  //   }
  //   if (!values.work_type) {
  //     error.work_type = " work_type is required";
  //   }
  //   if (!values.relationOfApplicant) {
  //     error.relationOfApplicant = "relationOfApplicant is required";
  //   }
  //   if (!values.NameOfApplicant) {
  //     error.NameOfApplicant = "NameOfApplicant is required";
  //   }
  //   if (!values.ReasonOfApllication) {
  //     error.ReasonOfApllication = "ReasonOfApllication is required";
  //   }
  //   if (!values.statusOfApplicant) {
  //     error.statusOfApplicant = "statusOfApplicant  is required";
  //   }
  //   if (!values.ReasonOfincome_get) {
  //     error.ReasonOfincome_get = "ReasonOfincome_get is required";
  //   }
  //   if (!values.IncomeDOcsName) {
  //     error.IncomeDOcsName = "IncomeDOcsName is required";
  //   }
  //   console.log("error object", error);
  //   return error;
  // };
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
  }, []);
  console.log(104, balance);
  const [docs, setDocs] = useState({
    reshaCard: "",
    adharCard: "",
    lightBill: "",
    photo: "",
    form16: "",
    consentform: "",
    selfDeclearation: "",
  });

  const [form] = Form.useForm();
  const [Data, SetData] = useState({
    statusfname: "",
    fullName_English: "",
    fullName_Marathi: "",
    fatherName_english: "",
    fatherName_marathi: "",
    incoCerYear: "",
    BirthDate: "",
    age: "",
    Gender: "",
    work_type: "",
    phoneNUm: "",
    email: "",
    PanNo: "",
    AdharNo: "",
    address: "",
    streetName: "",
    depart: "",
    Building: "",
    landmark: "",
    district: "",
    taluka: "",
    village: "",
    pincode: "",
    relationOfApplicant: "",
    statusOfApplicant: "",
    NameOfApplicant: "",
    ReasonOfApllication: "",
    ReasonOfincome_get: "",
    IncomeDOcsName: "",
  });

  const [incomeSource, setIncomeSource] = useState([]);
  const handleIncomeChange = (e) => {
    const find = incomeSource.find((data) => data.sourceName === e.target.name);
    console.log(e.target.tabIndex);
    if (e.target.tabIndex === 0) {
      incomeSource[incomeSource.indexOf(find)]["discription"] = e.target.value;
    } else {
      incomeSource[incomeSource.indexOf(find)][e.target.tabIndex] =
        e.target.value;
    }
  };

  useEffect(() => {
    setIncomeSource([
      {
        sourceName: "farm",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "farmRelated",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "frstscaledairy",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "txtfrstscaleagri",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "frstscalelab",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "txtfrstscalebussi",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "txtfrstscaleimmovabl",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "txtfrstscaleannualincom",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "txtfrstscaleintrstpro",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
      {
        sourceName: "txtfrstscaleanysource",
        2021: 0,
        2122: 0,
        2223: 0,
        discription: "",
      },
    ]);
  }, []);

  const translateName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", {
        text: Data.fullName_English,
      })
      .then((res) => {
        setnameMarathi(res.data.output);
        setNameLoading(false);
        SetData({ ...Data, fullName_Marathi: res.data.output });
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
        SetData({ ...Data, fatherName_marathi: res.data.output });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    console.log(221, e.target.value);
    const { name, value } = e.target.value;
    SetData({ ...Data, [name]: value });
  };

  const [familyData, setfamilyData] = useState({
    relation: "",
    name: "",
    age: "",
    occupation: "",
    income: "",
  });

  const [family, setFamily] = useState([]);

  const [IncomeData, setIncomeData] = useState({
    accountHolder_Name: "",
    totalfarm: "",
    farmingdetails: "",
    accountHolder_DIstrict: "",
    accountHolder_Taluka: "",
    accountHolder_village: "",
  });

  const [distibutionOfIncomefromAgri, setdistibutionOfIncomefromAgri] =
    useState([]);
  const handleDateChange = (Date, dateString) => {
    SetData({ ...Data, BirthDate: dateString });
  };
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

  const postLDJData = (e) => {
    e.preventDefault();
    if (balance > GetFormPrice) {
      const obj = {
        application_type: "Income certificate",
        status: "IN-PROGRESS",
        createdBy: ID,
        createdByName,
        Data,
        distibutionOfIncomefromAgri,
        incomeSource,
        family,
      };
      const mainDataPromise = new Promise((resolve, reject) => {
        axios
          .post(`https://mhebackend.payagain.in/api/income_Certificate/create`, obj)
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
          uploadlightBill(res.data.data._id);
          uploadphoto(res.data.data._id);
          uploadform16(res.data.data._id);
          uploadconsentform(res.data.data._id);
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
  };
  const CreaditAgent = () => {
    const obj = {
      agentId: getAgent[0]._id,
      agentName: getAgent[0].name,
      creaditAmount: getAgent[0].agent_formPrice.agent_income,
      isWithdrowl: false,
      isrequest: false,
      creaditFor: "Income Certificate",
      creaditBy: userData.user._id,
    };
    axios
      .post(`https://mhebackend.payagain.in/api/wallet/create`, obj)
      .then((res) => {
        const response = res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const debitFormBalance = () => {
    const obj = {
      user: userData?.user._id,
      mode: "offline",
      amount: GetFormPrice,
      isExpence: true,
      expenceFor: "income Certificate",
    };
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
    formData.append("reshaCard", docs.reshaCard);
    axios
      .put(
        `https://mhebackend.payagain.in/api/incomeCertificate_reshancard/${id}`,
        formData
      )
      .then((res) => console.log("reshaCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadadharCard = (id) => {
    const formData = new FormData();
    formData.append("adharCard", docs.adharCard);
    axios
      .put(
        `https://mhebackend.payagain.in/api/incomeCertificate_adharCard/${id}`,
        formData
      )
      .then((res) => console.log("adharCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadlightBill = (id) => {
    const formData = new FormData();
    formData.append("lightBill", docs.lightBill);
    axios
      .put(
        `https://mhebackend.payagain.in/api/incomeCertificate_lightBill/${id}`,
        formData
      )
      .then((res) => console.log("lightBill", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadphoto = (id) => {
    const formData = new FormData();
    formData.append("photo", docs.photo);
    axios
      .put(`https://mhebackend.payagain.in/api/incomeCertificate_photo/${id}`, formData)
      .then((res) => console.log("photo", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadform16 = (id) => {
    const formData = new FormData();
    formData.append("form16", docs.form16);
    axios
      .put(`https://mhebackend.payagain.in/api/incomeCertificate_form16/${id}`, formData)
      .then((res) => console.log("form16", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadconsentform = (id) => {
    const formData = new FormData();
    formData.append("consentform", docs.consentform);
    axios
      .put(
        `https://mhebackend.payagain.in/api/incomeCertificate_consentform/${id}`,
        formData
      )
      .then((res) => console.log("consentform", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadselfDeclearation = (id) => {
    const formData = new FormData();
    formData.append("selfDeclearation", docs.selfDeclearation);
    axios
      .put(
        `https://mhebackend.payagain.in/api/incomeCertificate_selfDeclearation/${id}`,
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
        .get(`https://mhebackend.payagain.in/api/income_Certificate/${id}`)
        .then((res) => {
          const data = res.data[0];
          SetData(data.Data);
          setdistibutionOfIncomefromAgri(data.distibutionOfIncomefromAgri);
          setIncomeData(data.incomeSource);
          setFamily(family);
        });
    }
  }, [id]);

  const editHandler = (e) => {
    const obj = {
      application_type: "Income certificate",
      status: "IN-PROGRESS",
      createdBy: ID,
      createdByName,
      Data,
      distibutionOfIncomefromAgri,
      incomeSource,
      family,
    };

    if (agree) {
      const mainDataPromise = new Promise((resolve, reject) => {
        axios
          .put(`https://mhebackend.payagain.in/api/income_Certificate/${id}`, obj)
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
          uploadlightBill(res.data.data._id);
          uploadphoto(res.data.data._id);
          uploadform16(res.data.data._id);
          uploadconsentform(res.data.data._id);
          uploadselfDeclearation(res.data.data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const clickHandler = () => {
    setNameLoading(true);
    translateName();
  };
  const clickHandler1 = () => {
    translateFName();
  };

  const setTalukasData = (e) => {
    console.log(340, e);
    if (e) {
      const taluka = districtData.filter((item) => item.name === e);
      console.log(597, taluka[0].tahasil);
      setTalukas(taluka[0].tahasil);
    } else {
      console.log("Flop");
    }
  };
  // console.log(592,districtData)
  return (
    <Fragment>
      <Breadcrumb title={"Income Certificate"} parent={"license"} />
      <Container fluid={true}>
        <h3>Form Price :{GetFormPrice}</h3>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="CPH_lbl_AppDtl">अर्जदाराचा तपशील :</span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-2">
                              <span id="CPH_Label15"></span>
                              <img
                                id="CPH_Image2"
                                class="img-thumbnail"
                                src="../Images/Logos/download1.jpg"
                              />
                            </div>
                            <div class="col-md-12">
                              <div class="row">
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label
                                      for="CPH_ddlSalutation"
                                      id="CPH_Label5"
                                    >
                                      संबोधन
                                    </label>
                                    <span className="red">*</span>

                                    <select
                                      name="statusfname"
                                      id="CPH_ddlSalutation"
                                      tabindex="5"
                                      class="form-control"
                                      value={Data.statusfname}
                                      onChange={(e) =>
                                        SetData({
                                          ...Data,
                                          statusfname: e.target.value,
                                        })
                                      }
                                      onkeypress="return IsAlphabet(event);"
                                    >
                                      <option value="---निवडा---">
                                        ---निवडा---
                                      </option>
                                      <option value="कुमार">कुमार</option>
                                      <option value="कुमारी">कुमारी</option>
                                      <option value="वकील">वकील</option>
                                      <option value="श्री.">श्री.</option>
                                      <option value="श्रीमती">श्रीमती</option>
                                      <option value="सौ">सौ</option>
                                    </select>
                                    <p className="red">
                                      {Formerror.statusfname}
                                    </p>
                                    <span
                                      id="CPH_RequiredFieldValidator11"
                                      class="lbl_Validator"
                                    >
                                      कृपया अर्जदाराच्या संबोधनाची निवड करा.
                                    </span>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label
                                      for="CPH_txtappfullname"
                                      id="CPH_lblappfullname"
                                    >
                                      पूर्ण नाव(इंग्रजी)
                                    </label>
                                    <span className="red">*</span>

                                    <input
                                      name="fullName_English"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_txtappfullname"
                                      tabindex="6"
                                      class="form-control"
                                      value={Data.fullName_English}
                                      onChange={(e) => {
                                        SetData({
                                          ...Data,
                                          fullName_English: e.target.value,
                                        });
                                        setNameLoading(true);
                                      }}
                                      onBlur={clickHandler}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                    <p className="red">
                                      {Formerror.fullName_English}
                                    </p>
                                    <span
                                      id="CPH_RequiredFieldValidator1"
                                      class="lbl_Validator"
                                    >
                                      कृपया अर्जदाराच्या पूर्ण नावाची (इंग्रजी)
                                      नोंद करा.
                                    </span>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label
                                      for="CPH_txtfullname_ll"
                                      id="CPH_lblappfullnamell"
                                    >
                                      पूर्ण नाव (मराठी)
                                    </label>
                                    <span className="red">*</span>

                                    <input
                                      name="fullName_Marathi"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_txtfullname_ll"
                                      tabindex="7"
                                      class="form-control"
                                      value={nameMarathi}
                                      // onChange={(e) => {
                                      //   SetData({
                                      //     ...Data,
                                      //     fullName_Marathi: e.target.value,
                                      //   });

                                      // }}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                    <span
                                      id="CPH_RequiredFieldValidator2"
                                      class="lbl_Validator"
                                    >
                                      कृपया अर्जदाराच्या पूर्ण नावाची (मराठी)
                                      नोंद करा.
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label
                                      for="CPH_ddlfathersal"
                                      id="CPH_C04_lblAppSal0"
                                    >
                                      संबोधन
                                    </label>
                                    <span class="red">*</span>
                                    <select
                                      name="statusfname"
                                      id="CPH_ddlfathersal"
                                      tabindex="8"
                                      class="form-control"
                                      onChange={handleChange}
                                      onkeypress="return IsAlphabet(event);"
                                    >
                                      <option value="---निवडा---">
                                        ---निवडा---
                                      </option>
                                      <option value="श्री.">श्री.</option>
                                    </select>
                                    <p className="red">
                                      {Formerror.fatherName_marathi}
                                    </p>
                                    <span
                                      id="CPH_RequiredFieldValidator13"
                                      class="lbl_Validator"
                                    >
                                      कृपया अर्जदाराच्या वडिलांच्या संबोधनाची
                                      निवड करा.
                                    </span>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label
                                      for="CPH_txtfathername_en"
                                      id="CPH_CO7_lblmar1"
                                    >
                                      वडिलांचे नाव(इंग्रजी)
                                    </label>
                                    <span className="red">*</span>

                                    <input
                                      name="fatherName_english"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_txtfathername_en"
                                      tabindex="9"
                                      class="form-control"
                                      value={Data.fatherName_english}
                                      onChange={(e) => {
                                        SetData({
                                          ...Data,
                                          fatherName_english: e.target.value,
                                        });
                                        setNameLoading(true);
                                      }}
                                      onBlur={clickHandler1}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                    <p className="red">
                                      {Formerror.fatherName_english}
                                    </p>
                                    <span
                                      id="CPH_RequiredFieldValidator14"
                                      class="lbl_Validator"
                                    >
                                      कृपया अर्जदाराच्या वडिलांच्या पूर्ण नावाची
                                      (इंग्रजी) नोंद करा.
                                    </span>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label
                                      for="CPH_txtfathername_mr"
                                      id="CPH_CO7_lblmar0"
                                    >
                                      वडिलांचे नाव(मराठी)
                                    </label>
                                    <span className="red">*</span>

                                    <input
                                      name="fatherName_marathi"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_txtfathername_mr"
                                      tabindex="10"
                                      class="form-control"
                                      value={fnameMarathi}
                                      // onChange={(e) => {
                                      //   // SetData({
                                      //   //   ...Data,
                                      //   //   fatherName_marathi: e.target.value,
                                      //   // });
                                      //   // setNameLoading(true);
                                      // }}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                    <span
                                      id="CPH_RequiredFieldValidator15"
                                      class="lbl_Validator"
                                    >
                                      कृपया अर्जदाराच्या वडिलांच्या पूर्ण नावाची
                                      (मराठी) नोंद करा.
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="separator"></div>
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_DropDownList1" id="CPH_Label7">
                                  {" "}
                                  मिळकत प्रमाणपत्र
                                </label>
                                <span className="red">*</span>
                                <select
                                  name="incoCerYear"
                                  id="CPH_DropDownList1"
                                  tabindex="11"
                                  class="form-control"
                                  value={Data.incoCerYear}
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      incoCerYear: e.target.value,
                                    });
                                    // setNameLoading(true);
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value="0" selected="selected">
                                    ---निवडा---
                                  </option>
                                  <option value="१ वर्षासाठी">
                                    १ वर्षासाठी
                                  </option>
                                  <option value="३ वर्षांसाठी">
                                    ३ वर्षांसाठी
                                  </option>
                                </select>
                                <p className="red">{Formerror.incoCerYear}</p>{" "}
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_txtappDOB" id="CPH_lblappdob">
                                  जन्मतारीख
                                </label>
                                <br />
                                <DatePicker
                                  name="BirthDate"
                                  type="text"
                                  maxlength="10"
                                  class="form-control"
                                  onChange={handleDateChange}
                                  format="YYYY-MM-DD"
                                  style={{ width: "370px" }}
                                />
                                <span
                                  id="CPH_RegularExpressionValidator33"
                                  class="lbl_Validator"
                                >
                                  <br />
                                  वैध दिनांक निवडा .
                                </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <div class="form-group">
                                  <label for="CPH_txtappage" id="CPH_lblappage">
                                    वय
                                  </label>
                                  <span className="red">*</span>

                                  <input
                                    name="age"
                                    type="text"
                                    maxlength="3"
                                    id="CPH_txtappage"
                                    tabindex="13"
                                    class="form-control"
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        age: e.target.value,
                                      });
                                      // setNameLoading(true);
                                    }}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                  <p className="red">{Formerror.age}</p>
                                  <span
                                    id="CPH_RequiredFieldValidator12"
                                    class="lbl_Validator"
                                  >
                                    कृपया अर्जदाराच्या वयाची नोंद करा.
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_Dropgen3">लिंग</label>
                                <span className="red">*</span>

                                <select
                                  name="Gender"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      Gender: e.target.value,
                                    });
                                    //  console.log(966,e.target.value);
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value="">---निवडा---</option>
                                  <option value="इतर">इतर </option>
                                  <option value="पुरुष">पुरुष</option>
                                  <option value="स्त्री">स्त्री</option>
                                </select>
                                <p className="red">{Formerror.Gender}</p>
                                <span
                                  id="CPH_RequiredFieldValidator17"
                                  class="lbl_Validator"
                                >
                                  कृपया अर्जदाराच्या लिंगाची निवड करा.
                                </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_Occupation">व्यवसाय</label>
                                <span className="red">*</span>
                                <select
                                  name="work_type"
                                  class="form-control"
                                  value={Data.work_type}
                                  onChange={(e) =>
                                    SetData({
                                      ...Data,
                                      work_type: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  {occupationData.map((item, i) => (
                                    <option value={item} key={i}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
                                <p className="red">{Formerror.work_type}</p>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_txtappMobile"
                                  id="CPH_lblappmobile"
                                >
                                  भ्रमणध्वनी क्रमांक{" "}
                                </label>
                                <span className="red">*</span>

                                <input
                                  name="phoneNUm"
                                  type="number"
                                  maxlength="10"
                                  id="CPH_txtappMobile"
                                  tabindex="14"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      phoneNUm: e.target.value,
                                    });
                                    // setNameLoading(true);
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                <p className="red">{Formerror.phoneNUm}</p>
                                <span
                                  id="CPH_RequiredFieldValidator35"
                                  class="lbl_Validator"
                                >
                                  कृपया अर्जदाराच्या भ्रमणध्वनी क्रमांकाची नोंद
                                  करा.
                                </span>
                                <span
                                  id="CPH_RegularExpressionValidator7"
                                  class="lbl_Validator"
                                >
                                  कृपया वैध भ्रमणध्वनी क्रमांकाची नोंद करा.
                                </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_txtemail" id="CPH_lblappemail">
                                  ई-मेल
                                </label>
                                <input
                                  name="email"
                                  type="text"
                                  maxlength="40"
                                  id="CPH_txtemail"
                                  tabindex="21"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      email: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                <span
                                  id="CPH_revInvalidEmail"
                                  class="lbl_Validator"
                                >
                                  वैध ई-मेल आयडी ची नोंद करा.
                                </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_CO7_lbl_pancard">
                                  पॅनकार्ड क्रमांक
                                </span>
                                <input
                                  name="PanNo"
                                  type="text"
                                  maxlength="10"
                                  id="CPH_txt_pancard"
                                  tabindex="27"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      PanNo: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                <span
                                  id="CPH_RegularExpressionValidator22"
                                  class="lbl_Validator"
                                >
                                  वैध पॅनकार्ड क्रमांक. (AAAAA1111A)
                                </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_txtUID" id="CPH_C11_lbl_uid0">
                                  आधारकार्ड क्रमांक
                                </label>
                                <input
                                  name="AdharNo"
                                  type="text"
                                  maxlength="12"
                                  id="CPH_txtUID"
                                  tabindex="28"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      AdharNo: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="CPH_Label16">
                              अर्जदाराच्या निवासाचे तपशील :
                            </span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_AddrCare"
                                  id="CPH_lblappaddresscareof"
                                >
                                  पत्ता
                                </label>
                                <span className="red">*</span>

                                <input
                                  name="address"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_AddrCare"
                                  tabindex="16"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      address: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                <p className="red">{Formerror.address}</p>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_AddrStreet"
                                  id="CPH_lbladdressstreet"
                                >
                                  मार्ग{" "}
                                </label>
                                <input
                                  name="streetName"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_AddrStreet"
                                  tabindex="17"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      streetName: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_AddrLocality"
                                  id="CPH_lbladdresslocal"
                                >
                                  विभाग
                                </label>
                                <input
                                  name="depart"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_AddrLocality"
                                  tabindex="18"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      depart: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_Building"
                                  id="CPH_lbladdressbuild"
                                >
                                  इमारत
                                </label>
                                <input
                                  name="Building"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_Building"
                                  tabindex="19"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      Building: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_Landmark"
                                  id="CPH_lblapplandmark"
                                >
                                  लॅंडमार्क
                                </label>
                                <input
                                  name="landmark"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_Landmark"
                                  tabindex="20"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      landmark: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <label htmlFor="" className="mb-3">
                                {" "}
                                <b>जिल्हा</b>
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
                                    SetData({
                                      ...Data,
                                      district: e,
                                    });
                                    setDistict(e);
                                    setTalukasData(e);
                                    // console.log(1305,e)
                                  }}
                                >
                                  {districtData.map((item, i) => {
                                    return (
                                      <Select.Option value={item.name} key={i}>
                                        {item.name}
                                      </Select.Option>
                                    );
                                  })}
                                </Select>
                              </Form.Item>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_SubDistrict"
                                  id="CPH_lblappsubdis"
                                >
                                  तालुका
                                </label>
                                <span className="red">*</span>

                                <Select
                                  placeholder="--Select District--"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      taluka: e,
                                    });
                                  }}
                                >
                                  {talukas.map((item, i) => {
                                    return (
                                      <Select.Option value={item} key={i}>
                                        {item}
                                      </Select.Option>
                                    );
                                  })}
                                </Select>
                                <input
                                  type="hidden"
                                  name="ctl00$CPH$CascadingSubDistrict_ClientState"
                                  id="CPH_CascadingSubDistrict_ClientState"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_Village" id="CPH_lblappvillage">
                                  गाव
                                </label>
                                <span className="red">*</span>

                                <input
                                  name="village"
                                  id="CPH_Village"
                                  tabindex="24"
                                  class="form-control"
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      village: e.target.value,
                                    });
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                <p className="red">{Formerror.village}</p>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_Pincode" id="CPH_lblapppincode">
                                  पिनकोड
                                </label>
                                <span className="red">*</span>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your पिनकोड!",
                                    },
                                  ]}
                                >
                                  <input
                                    name="pincode"
                                    type="text"
                                    maxlength="6"
                                    id="CPH_Pincode"
                                    tabindex="25"
                                    class="form-control"
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        pincode: e.target.value,
                                      });
                                    }}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                  <p className="red">{Formerror.pincode}</p>
                                </Form.Item>
                                <span
                                  id="CPH_RangeValidator2"
                                  class="lbl_Validator"
                                >
                                  पिन कोड ४ या अंकानेच सुरू व्हायला हवा
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="family">
                              कुटुंबातील सज्ञान व्यक्तींची माहीती :
                            </span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="CPH_ddlrelation">नाते</label>
                                <select
                                  name="relation"
                                  type="text"
                                  maxlength="50"
                                  tabindex="29"
                                  class="form-control"
                                  value={familyData.relation}
                                  onChange={(e) =>
                                    setfamilyData({
                                      ...familyData,
                                      relation: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  {relation.map((itm, index) => (
                                    <option value={itm} key={index}>
                                      {itm}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label>कुटुंबातील व्यक्तीचे नाव</label>
                                <input
                                  name="Name"
                                  type="text"
                                  maxlength="50"
                                  class="form-control"
                                  value={familyData.name}
                                  onChange={(e) =>
                                    setfamilyData({
                                      ...familyData,
                                      name: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label>वय</label>
                                <input
                                  name="AgeOfRelative"
                                  type="text"
                                  maxlength="2"
                                  class="form-control"
                                  value={familyData.age}
                                  onChange={(e) =>
                                    setfamilyData({
                                      ...familyData,
                                      age: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_ddlfamilyoccupation"
                                  id="CPH_lblfamilyoccupation"
                                >
                                  व्यवसाय/नोकरी
                                </label>
                                <select
                                  name="WorkTypeOfRelative"
                                  type="text"
                                  maxlength="2"
                                  class="form-control"
                                  value={familyData.occupation}
                                  onChange={(e) =>
                                    setfamilyData({
                                      ...familyData,
                                      occupation: e.target.value,
                                    })
                                  }
                                >
                                  {occupationData.map((itm, index) => (
                                    <option value={itm} key={index}>
                                      {itm}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label>उत्पन्न</label>
                                <input
                                  name="incomeOfRelative"
                                  type="text"
                                  maxlength="16"
                                  class="form-control"
                                  value={familyData.income}
                                  onChange={(e) =>
                                    setfamilyData({
                                      ...familyData,
                                      income: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 text-center"></div>
                      </div>

                      <Button
                        className="btn btn-success"
                        onClick={(e) => {
                          e.preventDefault();
                          const found = family.find(
                            (itm) => itm.name === familyData.name
                          );
                          if (!found) {
                            setFamily([
                              ...family,
                              {
                                name: familyData.name,
                                relation: familyData.relation,
                                income: parseInt(familyData.income),
                                occupation: familyData.occupation,
                                age: parseInt(familyData.age),
                              },
                            ]);
                          }
                        }}
                      >
                        जोडा
                      </Button>
                    </div>
                    {family.map((itm, i) => (
                      <>
                        <div class="col-md-12 table-responsive">
                          <table
                            class="table table-striped"
                            id="tdRelationList"
                          >
                            <tbody>
                              <tr>
                                <th align="center">
                                  अ.क्र
                                  <td>{i + 1}</td>
                                </th>

                                <th align="center">
                                  कुटुंबातील व्यक्तीचे नाव/ व्यक्तींची नावे
                                  <td>
                                    <h5>{itm.name}</h5>
                                  </td>
                                </th>
                                <th align="center">
                                  नाते
                                  <td>
                                    <h5>{itm.relation}</h5>
                                  </td>
                                </th>
                                <th align="center">
                                  उत्पन्न
                                  <td>
                                    <h5>{itm.income}</h5>
                                  </td>
                                </th>
                                <th align="center">
                                  व्यवसाय/नोकरी
                                  <td>
                                    <h5>{itm.occupation}</h5>
                                  </td>
                                </th>
                                <th align="center">
                                  वय
                                  <td>
                                    <h5>{itm.age}</h5>
                                  </td>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    ))}
                  </div>
                  <div class="clearfix"></div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="CPH_label10">लाभार्थीचा तपशील:</span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_ddlbenfRelation"
                                  id="CPH_Label11"
                                >
                                  सदर व्यक्तीचे अर्जदाराशी नाते
                                </label>
                                <span className="red">*</span>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <select
                                    name="relationOfApplicant"
                                    type="text"
                                    maxlength="50"
                                    class="form-control"
                                    value={Data.relationOfApplicant}
                                    onChange={(e) =>
                                      SetData({
                                        ...Data,
                                        relationOfApplicant: e.target.value,
                                      })
                                    }
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    {relation.map((itm, index) => (
                                      <option value={itm} key={index}>
                                        {itm}
                                      </option>
                                    ))}
                                  </select>
                                  <p className="red">
                                    {Formerror.relationOfApplicant}
                                  </p>
                                </Form.Item>
                              </div>
                            </div>

                            <div class="col-md-8">
                              <div class="row">
                                <div class="form-group col-md-4">
                                  <label
                                    for="CPH_txtfullname_ll"
                                    id="CPH_lblappfullnamell"
                                  >
                                    लाभार्थीचे नाव
                                  </label>
                                  <span className="red">*</span>
                                  <Form.Item
                                    rules={[
                                      {
                                        required: true,
                                      },
                                    ]}
                                  >
                                    <input
                                      name="fullName_Marathi"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_txtfullname_ll"
                                      tabindex="7"
                                      class="form-control"
                                      value={Data.NameOfApplicant}
                                      onChange={(e) =>
                                        SetData({
                                          ...Data,
                                          NameOfApplicant: e.target.value,
                                        })
                                      }
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                    <p className="red">
                                      {Formerror.NameOfApplicant}
                                    </p>
                                  </Form.Item>
                                </div>
                                <div class="form-group col-md-4">
                                  <label
                                    for="CPH_ddlSalutatn"
                                    id="CPH_Label71"
                                  ></label>
                                  <span className="red">*</span>
                                  <Form.Item
                                    rules={[
                                      {
                                        required: true,
                                      },
                                    ]}
                                  >
                                    <select
                                      name="statusOfApplicant"
                                      id="CPH_ddlSalutatn"
                                      tabindex="35"
                                      class="form-control"
                                      value={Data.statusOfApplicant}
                                      onChange={(e) =>
                                        SetData({
                                          ...Data,
                                          statusOfApplicant: e.target.value,
                                        })
                                      }
                                      onkeypress="return IsAlphabet(event);"
                                    >
                                      <option value="---निवडा---">
                                        ---निवडा---
                                      </option>
                                      <option value="कुमार">कुमार</option>
                                      <option value="कुमारी">कुमारी</option>
                                      <option value="वकील">वकील</option>
                                      <option value="श्री.">श्री.</option>
                                      <option value="श्रीमती">श्रीमती</option>
                                      <option value="सौ">सौ</option>
                                    </select>
                                    <p className="red">
                                      {Formerror.statusOfApplicant}
                                    </p>
                                  </Form.Item>
                                </div>

                                <div class="form-group col-md-4">
                                  <label>प्रमाणपत्र का आवश्यक आहे</label>
                                  <span className="red">*</span>
                                  <Form.Item
                                    rules={[
                                      {
                                        required: true,
                                      },
                                    ]}
                                  >
                                    <select
                                      name="ReasonOfApllication"
                                      class="form-control"
                                      value={Data.ReasonOfApllication}
                                      onChange={(e) =>
                                        SetData({
                                          ...Data,
                                          ReasonOfApllication: e.target.value,
                                        })
                                      }
                                      onkeypress="return IsAlphabet(event);"
                                    >
                                      <option value="---निवडा---">
                                        ---निवडा---
                                      </option>
                                      <option value="शिक्षण">शिक्षण</option>
                                      <option value="वैद्यकीय">वैद्यकीय</option>
                                      <option value="इतर">इतर</option>
                                    </select>
                                    <p className="red">
                                      {Formerror.ReasonOfApllication}
                                    </p>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_txtfrstscalepurpose"
                                  id="CPH_lblpurpose"
                                >
                                  उत्पन्नाचे प्रमाणपत्र कशासाठी हवे त्याचा तपशील
                                </label>
                                <span className="red">*</span>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <textarea
                                    name="IncomefromAgri"
                                    rows="2"
                                    cols="20"
                                    id="CPH_txtfrstscalepurpose"
                                    tabindex="37"
                                    class="form-control"
                                    value={Data.ReasonOfincome_get}
                                    onChange={(e) =>
                                      SetData({
                                        ...Data,
                                        ReasonOfincome_get: e.target.value,
                                      })
                                    }
                                    onkeypress="return IsAlphabet(event);"
                                  ></textarea>
                                  <p className="red">
                                    {Formerror.ReasonOfincome_get}
                                  </p>
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="distibutionOfIncomefromAgri">
                              कुटुंबाला शेतीपासून मिळणाऱ्या उत्पन्नाचे विवरण:
                            </span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_txtappaccountname"
                                  id="CPH_lblappaccountname"
                                >
                                  खातेदाराचे नाव
                                </label>
                                <input
                                  name="accountHolder_Name"
                                  type="text"
                                  maxlength="50"
                                  id="CPH_txtfamilyname"
                                  tabindex="29"
                                  class="form-control"
                                  value={IncomeData.accountHolder_Name}
                                  onChange={(e) =>
                                    setIncomeData({
                                      ...IncomeData,
                                      accountHolder_Name: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-8">
                              <div class="row">
                                <div class="form-group col-md-6">
                                  <label
                                    for="CPH_txtappfarmingacre"
                                    id="CPH_lblappfarmingacre"
                                  >
                                    शेतीचे एकूण क्षेत्र
                                  </label>
                                  <input
                                    name="totalfarm"
                                    type="text"
                                    maxlength="6"
                                    id="CPH_txtappfarmingacre"
                                    tabindex="39"
                                    class="form-control"
                                    value={IncomeData.totalfarm}
                                    onChange={(e) =>
                                      setIncomeData({
                                        ...IncomeData,
                                        totalfarm: e.target.value,
                                      })
                                    }
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                </div>
                                <div class="form-group col-md-6">
                                  <label></label>
                                  <input
                                    type="hidden"
                                    name="ctl00$CPH$hdvvalue"
                                    id="CPH_hdvvalue"
                                  />
                                  <select
                                    name="totalfarm"
                                    type="text"
                                    maxlength="50"
                                    id="CPH_txtfamilyname"
                                    tabindex="29"
                                    class="form-control"
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    <option value="---निवडा---">
                                      ---निवडा---
                                    </option>
                                    <option value="आर">आर</option>
                                    <option value="एकर">एकर </option>
                                    <option value="गुंठे">गुंठे </option>
                                    <option value="हेक्टर">हेक्टर </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_txtappfarmingdetails"
                                  id="CPH_lblappfarmingdetails"
                                >
                                  शेतीचे विवरण
                                </label>
                                <input
                                  name="farmingdetails"
                                  type="text"
                                  maxlength="50"
                                  id="CPH_txtfamilyname"
                                  tabindex="29"
                                  class="form-control"
                                  value={IncomeData.farmingdetails}
                                  onChange={(e) =>
                                    setIncomeData({
                                      ...IncomeData,
                                      farmingdetails: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_AppDistrict"
                                  id="CPH_lblappvildistrict"
                                >
                                  जिल्हा
                                </label>
                                <select
                                  name="accountHolder_DIstrict"
                                  type="text"
                                  maxlength="50"
                                  id="CPH_txtfamilyname"
                                  tabindex="29"
                                  class="form-control"
                                  value={IncomeData.accountHolder_DIstrict}
                                  onChange={(e) => {
                                    setIncomeData({
                                      ...IncomeData,
                                      accountHolder_DIstrict: e.target.value,
                                    });
                                    setTalukasData(e.target.value);
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  {districtData.map((item, i) => {
                                    return (
                                      <>
                                        <option value={item.name}>
                                          {item.name}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                                <input
                                  type="hidden"
                                  name="ctl00$CPH$CascadingDist_ClientState"
                                  id="CPH_CascadingDist_ClientState"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_AppSubdistrict"
                                  id="CPH_lblappvilsubdistrict"
                                >
                                  तालुका
                                </label>
                                <select
                                  name="accountHolder_Taluka"
                                  type="text"
                                  maxlength="50"
                                  id="CPH_txtfamilyname"
                                  tabindex="29"
                                  class="form-control"
                                  value={IncomeData.accountHolder_Taluka}
                                  onChange={(e) => {
                                    setIncomeData({
                                      ...IncomeData,
                                      accountHolder_Taluka: e.target.value,
                                    });
                                    console.log(12345, e.target.value);
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  {talukas.map((item, i) => {
                                    return (
                                      <>
                                        <option value={item}>{item}</option>
                                      </>
                                    );
                                  })}
                                </select>
                                <input
                                  type="hidden"
                                  name="ctl00$CPH$CascadingSubDist_ClientState"
                                  id="CPH_CascadingSubDist_ClientState"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label
                                  for="CPH_AppVillage"
                                  id="CPH_lblappvillname"
                                >
                                  गाव
                                </label>
                                {/* <select
                                  name="accountHolder_village"
                                  type="text"
                                  maxlength="50"
                                  id="CPH_txtfamilyname"
                                  tabindex="29"
                                  class="form-control"
                                  value={IncomeData.accountHolder_village}
                                  onChange={(e) =>
                                    setIncomeData({
                                      ...IncomeData,
                                      accountHolder_village: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value="---निवडा---">
                                    ---निवडा---
                                  </option>
                                  <option value="">barshi</option>
                                </select> */}
                                <input
                                  name="accountHolder_village"
                                  type="text"
                                  maxlength="6"
                                  id="CPH_txtappfarmingacre"
                                  tabindex="39"
                                  class="form-control"
                                  value={IncomeData.accountHolder_village}
                                  onChange={(e) =>
                                    setIncomeData({
                                      ...IncomeData,
                                      accountHolder_village: e.target.value,
                                    })
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                />

                                <input
                                  type="hidden"
                                  name="ctl00$CPH$CascadingVillage_ClientState"
                                  id="CPH_CascadingVillage_ClientState"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          className="btn btn-success"
                          onClick={(e) => {
                            e.preventDefault();
                            const found = distibutionOfIncomefromAgri.find(
                              (itm) =>
                                itm.accountHolder_Name ===
                                IncomeData.accountHolder_Name
                            );
                            if (!found) {
                              setdistibutionOfIncomefromAgri([
                                ...distibutionOfIncomefromAgri,
                                {
                                  accountHolder_Name:
                                    IncomeData.accountHolder_Name,
                                  totalfarm: parseInt(IncomeData.totalfarm),
                                  farmingdetails: IncomeData.farmingdetails,
                                  accountHolder_DIstrict:
                                    IncomeData.accountHolder_DIstrict,
                                  accountHolder_Taluka:
                                    IncomeData.accountHolder_Taluka,
                                  accountHolder_village:
                                    IncomeData.accountHolder_village,
                                },
                              ]);
                            }
                          }}
                        >
                          जोडा
                        </Button>
                      </div>
                      {distibutionOfIncomefromAgri.map((itm) => (
                        <>
                          <div class="col-md-12 table-responsive">
                            <table
                              class="table table-striped"
                              id="tdRelationList"
                            >
                              <tbody>
                                <tr>
                                  <th align="center">
                                    खातेदाराचे नाव
                                    <td>
                                      <h5>{itm.accountHolder_Name}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    शेतीचे एकूण क्षेत्र
                                    <td>
                                      <h5>{itm.totalfarm}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    शेतीचे विवरण
                                    <td>
                                      <h5>{itm.farmingdetails}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    जिल्हा
                                    <td>
                                      <h5>{itm.accountHolder_DIstrict}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    तालुका
                                    <td>
                                      <h5>{itm.accountHolder_Taluka}</h5>
                                    </td>
                                  </th>
                                  <th align="center">
                                    गाव
                                    <td>
                                      <h5>{itm.accountHolder_village}</h5>
                                    </td>
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      ))}
                    </div>
                    <div class="col-md-12 table-responsive">
                      <table
                        class="table table-striped"
                        id="tdRelationList1"
                      ></table>
                    </div>

                    <div class="clearfix"></div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="familyIncomeType"></span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-12 table-responsive">
                              <table
                                id="incomeYear"
                                cellpadding="0"
                                cellspacing="0"
                                class="table-striped form-table"
                              >
                                <tr>
                                  <th>
                                    <span id="CPH_lblseno">क्र.</span>
                                  </th>
                                  <th>
                                    <span id="CPH_lblincmesources">
                                      उत्पन्नाचे स्रोत
                                    </span>
                                  </th>
                                  <th id="CPH_td1">
                                    <span id="CPH_lblyr1">2020 - 2021</span>
                                  </th>
                                  <th id="CPH_td2">
                                    <span id="CPH_lblyr2">2021 - 2022</span>
                                  </th>
                                  <th>
                                    <span id="CPH_lblyr3">2022 - 2023</span>
                                  </th>
                                  <th>
                                    <span id="CPH_lblbriefdetails">
                                      उत्पन्न व उत्पन्नाच्या स्रोताची थोडक्यात
                                      माहिती
                                    </span>
                                  </th>
                                </tr>
                                {income_input.map((item, i) => (
                                  <tr key={i}>
                                    <td>
                                      <span id="CPH_lbl1">{i + 1}</span>
                                    </td>
                                    <td>
                                      <span id="CPH_lblfarming">
                                        {item.source_name}
                                      </span>
                                    </td>
                                    <td id="CPH_td11">
                                      <div class="icon-addon">
                                        <span>
                                          <i class="fa fa-inr"></i>
                                        </span>
                                        <input
                                          name={item.source}
                                          type="text"
                                          maxlength="9"
                                          id="txtfrstscale"
                                          tabindex={item.t1}
                                          class="lbl_value rupees form-control form-control"
                                          onChange={(e) =>
                                            handleIncomeChange(e)
                                          }
                                          onkeypress="return IsAlphabet(event);"
                                        />
                                      </div>
                                    </td>
                                    <td id="CPH_td21">
                                      <div class="icon-addon">
                                        <span>
                                          <i class="fa fa-inr"></i>
                                        </span>
                                        <input
                                          name={item.source}
                                          type="text"
                                          maxlength="9"
                                          id="CPH_txtsecscale"
                                          tabindex={item.t2}
                                          class="lbl_value rupees form-control form-control"
                                          onChange={(e) =>
                                            handleIncomeChange(e)
                                          }
                                          onkeypress="return IsAlphabet(event);"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="icon-addon">
                                        <span>
                                          <i class="fa fa-inr"></i>
                                        </span>
                                        <input
                                          name={item.source}
                                          type="text"
                                          maxlength="9"
                                          id="txtthrdscale"
                                          tabindex={item.t3}
                                          class="lbl_value rupees form-control"
                                          onChange={(e) =>
                                            handleIncomeChange(e)
                                          }
                                          onkeypress="return IsAlphabet(event);"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        name={item.source}
                                        type="text"
                                        maxlength="50"
                                        id="CPH_txtbriefdetails"
                                        tabindex={item.t4}
                                        class="lbl_value form-control"
                                        onChange={(e) => handleIncomeChange(e)}
                                      />
                                    </td>
                                  </tr>
                                ))}

                                <tr>
                                  <td></td>
                                  <td>
                                    <span id="CPH_lblannuincome">एकूण</span>
                                    <span id="CPH_Label86">*</span>
                                  </td>
                                  <td id="CPH_td111">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        name="frstscaleannu"
                                        type="text"
                                        maxlength="9"
                                        id="CPH_txtfrstscaleannu"
                                        tabindex="13333"
                                        class="lbl_value rupees form-control"
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                  <td id="CPH_td211">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        name="txtsecscaleannu"
                                        type="text"
                                        maxlength="9"
                                        id="CPH_txtsecscaleannu"
                                        tabindex="1200"
                                        class="lbl_value rupees form-control"
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        name="txtthrdscaleannu"
                                        type="text"
                                        maxlength="9"
                                        class="lbl_value rupees form-control"
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                  <td width="150px" valign="top"></td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td valign="top">
                                    <span id="year">एकूण (अक्षरी)</span>
                                  </td>
                                  <td id="CPH_td112">
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                      name="Income"
                                      type="text"
                                      maxlength="9"
                                      id="CPH_txtfrstscaleannuin"
                                      tabindex="12000"
                                      class="lbl_value rupees form-control"
                                      onChange={handleChange}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                  </td>
                                  <td id="CPH_td212">
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                      name="Income"
                                      type="text"
                                      maxlength="9"
                                      id="CPH_txtsecscaleannuin"
                                      tabindex="1200"
                                      class="lbl_value rupees form-control"
                                      onChange={handleChange}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                      name="Income"
                                      type="text"
                                      maxlength="9"
                                      id="CPH_txtthrdscaleannuin"
                                      tabindex="12121"
                                      class="lbl_value rupees form-control"
                                      onChange={handleChange}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                  </td>
                                  <td></td>
                                </tr>
                              </table>

                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="CPH_DropDownList1"
                                    id="CPH_Label87"
                                  >
                                    उत्पन्नाबाबत जोड कागदपत्र{" "}
                                  </label>
                                  <span class="star">*</span>
                                  <select
                                    name="IncomeDOcsName"
                                    id="CPH_ddlattach"
                                    tabindex="86"
                                    class="form-control"
                                    value={Data.IncomeDOcsName}
                                    onChange={(e) =>
                                      SetData({
                                        ...Data,
                                        IncomeDOcsName: e.target.value,
                                      })
                                    }
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    <option value="0">---निवडा---</option>
                                    <option value="प्रतिज्ञापत्र">
                                      प्रतिज्ञापत्र
                                    </option>
                                    <option value="तलाठी अहवाल">
                                      तलाठी अहवाल
                                    </option>
                                    <option value="आयकर विवरणपत्र ">
                                      आयकर विवरणपत्र{" "}
                                    </option>
                                    <option value="वेतन प्रमाणपत्र">
                                      वेतन प्रमाणपत्र
                                    </option>
                                    <option value=" नगर सेवक यांचे प्रमाणपत्र">
                                      नगर सेवक यांचे प्रमाणपत्र
                                    </option>
                                    <option value="मंडळ अधिकारी अहवाल">
                                      मंडळ अधिकारी अहवाल
                                    </option>
                                    <p className="red">
                                      {Formerror.IncomeDOcsName}
                                    </p>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <h5>Upload required documents: </h5>
                    <h6>
                      अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व आवश्यक कागदपत्रे
                      तपासून व स्कॅन करून अपलोड करावे. जर आवश्यक कागदपत्रे
                      चुकीची किंवा अस्पष्ट आढळल्यास सदर चा अर्ज फेटाळला जाऊ
                      शकतो.{" "}
                    </h6>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>आधार कार्ड (Maximum
                      500Kb)PDF
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
                    <p className="red">{Formerror.adharCard}</p>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>लाईट बिल (Maximum 500Kb)PDF
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
                      }}
                    />
                    <p className="red">{Formerror.IncomeDOcsName}</p>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      रेशनकार्ड Size Photo (Maximum 500Kb)PDF
                    </label>

                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDocs({
                          ...docs,
                          reshaCard: e.target.files[0],
                        });
                      }}
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      तलाठी उत्पन्न अहवाल / फॉम १६ , A (Maximum 500Kb)PDF
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDocs({
                          ...docs,
                          form16: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      फोटो (अर्डदार , लाभार्थी ) (5Kb to 20Kb)JPG/JEPG
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
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      घर भार््याने असल्यास संमती पत्र (5Kb to 20Kb)JPG/JEPG
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDocs({
                          ...docs,
                          consentform: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      स्वघोषनापत्र(5Kb to 20Kb)JPG/JEPG
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDocs({
                          ...docs,
                          selfDeclearation: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                  <div className="row">
                    IMP Note :- १) तलाठी उत्पन्न अहवाल बकं वा फॉमडनं१६ पाटडB ,A
                    अनिवार्य. २) रेशन-कार्ड अनिवार्य
                  </div>

                  <div className="row"></div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="CPH_label4">कराराचा तपशील:</span>
                            <legend> &nbsp;</legend>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-12">
                              <span
                                id="CPH_lblbenefagreement"
                                class="lbl_property "
                              >
                                मी घोषित करतो/ करते की वरील सर्व माहिती माझ्या
                                व्यक्तीगत माहिती व समजुतीनुसार खरी आहे. सदर
                                माहिती खोटी आढळून आल्यास, भारतीय दंड संहिता १९६०
                                कलम १९९ व २०० व अन्य/ संबंधित कायदयानुसार
                                माझ्यावर खटला भरला जाईल व त्यानुसार मी शिक्षेस
                                पात्र राहीन याची मला पूर्ण जाणीव आहे.
                              </span>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span className="red">*</span>
                                <span class="minimal">
                                  <input
                                    id="CPH_chkaccept"
                                    type="checkbox"
                                    name="ctl00$CPH$chkaccept"
                                    tabindex="87"
                                    onChange={(e) => setAgree(true)}
                                  />
                                  <p className="red">
                                    {Formerror.ctl00$CPH$chkaccept}
                                  </p>

                                  <label for="CPH_chkaccept">मला मंजूर</label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 text-center  gap-5">
                    {id == undefined ? (
                      <input
                        type="submit"
                        name="btnsubmit"
                        value="समावेश करा"
                        onClick={(e) => {
                          postLDJData(e);
                        }}
                        id="CPH_btnsubmit"
                        tabindex="88"
                        className="btn btn-success gap-5"
                        style={{ marginRight: "30" }}
                      />
                    ) : (
                      <input
                        type="submit"
                        name="btnsubmit"
                        value="Update"
                        onClick={(e) => {
                          editHandler(e);
                        }}
                        id="CPH_btnsubmit"
                        tabindex="88"
                        className="btn btn-success gap-5"
                        style={{ marginRight: "30" }}
                      />
                    )}

                    <input
                      type="submit"
                      name="btnback"
                      value="मागे"
                      onclick="return back();"
                      id="CPH_btnback"
                      tabindex="89"
                      class="btn btn-warning"
                    />
                    <input
                      type="submit"
                      name="btnreset"
                      value="पुनर्स्थित"
                      onclick="return disp_confirm();"
                      id="CPH_btnreset"
                      tabindex="90"
                      class="btn btn-danger"
                    />
                  </div>

                  <div class="clearfix"></div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Income;
