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
import data from "../../assets/data/listCoupons";
import { NonCreamyLayer_income_input, districtData } from "../../constants/data";
import { occupation_income_input, work_type } from "../../constants/data";

function NonCreamyLayer() {
  const [nameMarathi, setnameMarathi] = useState("");
  const [fnameMarathi, setfnameMarathi] = useState("");
  const [mnameMarathi, setmnameMarathi] = useState("");
  const [snameMarathi, setsnameMarathi] = useState("");
  const [agree, setAgree] = useState(false);
  const [items, setItems] = useState();
  const ID = items?.user?._id;
  const createdByName = items?.user?.name;
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    const userRespons = JSON.parse(localStorage.getItem("userResponse"));
    if (userRespons) {
      setItems(userRespons);
    }
  }, []);
  const users = useSelector((state) => state.userData.user);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  // const GetFormPrice = users.filter((item) => item._id === userData.user._id);
  // const getAgent = users.filter((item) => item._id === GetFormPrice[0].agent);
  const reducer = useSelector((state) => state.changeNumber);

  const [getAgent, setgetAgent] = useState([]);
  const [GetFormPrice, setGetFormPrice] = useState(); 
  const getData = () => {
    axios
      .get(`https://mhebackend.payagain.in/api/user/getAll`)
      .then((res) => {
        const response = res.data;
        // setUser(response);
        const userdata = JSON.parse(localStorage.getItem("userResponse"));
        if (userdata) {
          const getFormPrice = response.find(
            (item) => item._id === userdata.user._id
          );
          const getagent = response.filter(
            (item) => item._id === getFormPrice.agent
          );
          // setuserData(userdata);
          setgetAgent(getagent);
          setGetFormPrice(getFormPrice?.retaile_formPrice?.retailer_nonCriminal);
          console.log(325,getFormPrice?.retaile_formPrice?.retailer_nonCriminal)
        }
        // console.log(37,response)
      })
      .catch((err) => console.log(40, err));
  };
  useEffect(() => {
    setTimeout(getData(), 1000);
  }, []);
  const [balance, setBalance] = useState(0);
  console.log(326, balance);


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
    reshanCard: "",
    adharCard: "",
    lightBill: "",
    SchoolLeaveCertificate: "",
    photo: "",
    incomeCertificate3year: "",
    castCertificate: "",
    taxRecipt: "",
  });
  console.log(399, docs);

  const [form] = Form.useForm();
  const [Data, SetData] = useState({
    statusfname: "",
    fullName_English: "",
    fullName_Marathi:"",
    fatherName_english: "",
    fatherName_marathi:"",
    BirthDate: "",
    age: "",
    Gender: "",
    phoneNUm: "",
    email: "",
    UDI_NO: "",
    Applicant_address: "",
    Applicant_street: "",
    Applicant_Locality: "",
    Applicant_Building: "",
    Applicant_landmark: "",
    Applicant_district: "",
    Applicant_taluka: "",
    Applicant_village: "",
    Applicant_pincode: "",
    Applicant_CurrentOccupation: "",
    relationOfBanificiaryWithApplicant: "",
    benificiary_Cast: "",
    benificiary_Catagary: "",
    brnificiary_Validity_Duration: "",
    migration_MH_From_Another_State: "",
    Migrant_Distict: "",
    Migrant_Taluka: "",
    Migrant_village: "",
    isAppliedForCastCertificate: "",
    is_Certificate_Given: "",
    previos_CastCerNum: "",
    previos_CastCerPlaceIssue: "",
    previos_CastCerIssuedDate: "",


    propowner: "",
    txtLocation: "",
    txtarea: "",
    ddlareaunits: "",
    checkbox: "",
    txtirriarea: "",
    ddlunits: "",
    txtpercentage: "",
    txtformula: "",
    txtceilingactform: "",
    ddlcultitype: "",
    txtcultilocation: "",
    txtcultiarea: "",
    ddlcultiunit: "",
    txtproploc: "",
    txtpropdetails: "",
    txtpropuse: "",
    CPH_radiobtnpayee: "",
    radiobtnwealthtax: "",
    ddlmothersal: "",
    txtmothername: "",
    txtmothername_LL: "",
    ddlspousesal: "",
    txtSpouseName: "",
    txtspousename_LL:"" ,
    ddlfam_dist: "",
    ddlfam_taluka: "",
    ddlfam_Vill: "",
    txtfam_pincode: "",
    txtbenefreason: "",
    ctl00$CPH$Affd: "",
  });
  const [NonCreamyLayerincomeSource, setNoncreamyIncomeSource] = useState([]);
  const handleIncomeChange = (e) => {
    const find = NonCreamyLayerincomeSource.find(
      (data) => data.source === e.target.name
    );
    console.log(e.target.tabIndex);
    if (e.target.tabIndex === 0) {
      NonCreamyLayerincomeSource[NonCreamyLayerincomeSource.indexOf(find)][
        "discription"
      ] = e.target.value;
    } else {
      NonCreamyLayerincomeSource[NonCreamyLayerincomeSource.indexOf(find)][
        e.target.tabIndex
      ] = e.target.value;
    }
    console.log(NonCreamyLayerincomeSource);
  };

  useEffect(() => {
    setNoncreamyIncomeSource([
      {
        source: "Agriculture & Related Assets",
        2021: 0,
        2122: 0,
        2223: 0,
      },
      {
        source: "Business & other sources",
        2021: 0,
        2122: 0,
        2223: 0,
      },
      {
        source: "Salary/Pension/Other Resource",
        2021: 0,
        2122: 0,
        2223: 0,
      },
    ]);
  }, []);

  const [occupation_income, setoccupation_income] = useState([]);
  const handleOccupationChange = (e) => {
    const find = occupation_income.find(
      (data) => data.sourceName === e.target.name
    );
    console.log(e.target.tabIndex);
    if (e.target.tabIndex === 0) {
      occupation_income[occupation_income.indexOf(find)]["source"] =
        e.target.value;
    } else {
      occupation_income[occupation_income.indexOf(find)][e.target.tabIndex] =
        e.target.value;
    }
    console.log(occupation_income);
  };
  // console.log({ occupation_income });

  useEffect(() => {
    setoccupation_income([
      {
        person: "Father",
        type: 0,
        organizationName: 0,
        designation: 0,
        department: 0,
        salaryRange: 0,
        annualIncome: 0,
        dateOfJoining: "",
        dateOfRetirement: "",
        typeOfBusiness: 0,
        totalAnnualIncome: 0,
      },
      {
        person: "Mother",
        type: 0,
        organizationName: 0,
        designation: 0,
        department: 0,
        salaryRange: 0,
        annualIncome: 0,
        dateOfJoining: "",
        dateOfRetirement: "",
        typeOfBusiness: 0,
        totalAnnualIncome: 0,
      },
      {
        person: "Spouse",
        type: 0,
        organizationName: 0,
        designation: 0,
        department: 0,
        salaryRange: 0,
        annualIncome: 0,
        dateOfJoining: "",
        dateOfRetirement: "",
        typeOfBusiness: 0,
        totalAnnualIncome: 0,
      },
    ]);
  }, []);

  const temp = (e) => {
    const find = occupation_income.find(
      (data) => data.person === e.target.name
    );
    if (e.target.tabIndex === 0) {
      occupation_income[occupation_income.indexOf(find)]["type"] =
        e.target.value;
    } else if (e.target.tabIndex === 1) {
      occupation_income[occupation_income.indexOf(find)]["organizationName"] =
        e.target.value;
    } else if (e.target.tabIndex === 2) {
      occupation_income[occupation_income.indexOf(find)]["designation"] =
        e.target.value;
    } else if (e.target.tabIndex === 3) {
      occupation_income[occupation_income.indexOf(find)]["department"] =
        e.target.value;
    } else if (e.target.tabIndex === 4) {
      occupation_income[occupation_income.indexOf(find)]["salaryRange"] =
        parseInt(e.target.value);
    } else if (e.target.tabIndex === 5) {
      occupation_income[occupation_income.indexOf(find)]["annualIncome"] =
        parseInt(e.target.value);
    } else if (e.target.tabIndex === 6) {
      occupation_income[occupation_income.indexOf(find)]["dateOfJoining"] =
        e.target.value;
    } else if (e.target.tabIndex === 7) {
      occupation_income[occupation_income.indexOf(find)]["dateOfRetirement"] =
        e.target.value;
    } else if (e.target.tabIndex === 8) {
      occupation_income[occupation_income.indexOf(find)]["typeOfBusiness"] =
        e.target.value;
    } else if (e.target.tabIndex === 9) {
      occupation_income[occupation_income.indexOf(find)]["totalAnnualIncome"] =
        parseInt(e.target.value);
    }
  };
  const [Caste_Certificate1, SetCastcertificate] = useState(false);
  const [MigrantAddressDetails, SetMigrantAddressDetails] = useState(false);
  const [talukas, setTalukas] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(325,name,value)
    SetData({ ...Data, [name]: value });
  };
  const setTalukasData=(e)=>{
    console.log(340,e)
    if(e){
      const taluka=districtData.filter((item=>item.name===e))
      console.log(597,taluka[0].tahasil)
      setTalukas(taluka[0].tahasil)
    }else{
      console.log("Flop")
    }
    }

  console.log(330,Data)
  const postLDJData = (e) => {
    e.preventDefault();
    
    console.log(330,Data)
    if (agree) {
      
      if (balance > GetFormPrice) {
        const obj = {
          application_type: "Non_Cremylayer certificate",
          status: "IN-PROGRESS",
          createdBy: ID,
          createdByName,
          Data,
          NonCreamyLayerincomeSource,
          occupation_income,
        };
        console.log(342,obj)

        const mainDataPromise = new Promise((resolve, reject) => {
          // console.log(77, Data);
          axios
            .post(`https://mhebackend.payagain.in/api/Non_Criminal/create`, obj)
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
            uploadincomeCertficate3year(res.data.data._id);
            uploadcastCertificate(res.data.data._id);

            uploadtaxRecipt(res.data.data._id);
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
  };

  const CreaditAgent = () => {
    const obj = {
      agentId: getAgent[0]._id,
      agentName: getAgent[0].name,
      creaditAmount: getAgent[0].agent_formPrice.agent_nonCriminal,
      isWithdrowl: false,
      isrequest: false,
      creaditFor: "Non Criminal",
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

  const debitFormBalance = () => {
    const obj = {
      user: userData?.user._id,
      mode: "offline",
      amount: GetFormPrice,
      isExpence: true,
      expenceFor: "Non Criminal",
    };
    axios
      .post("https://mhebackend.payagain.in/api/recharge/create", obj)
      .then((res) => {
        const response = res.data;
        dispatch(incNumber());
        toast.success("form Submitted");
      })
      .catch((err) => console.log(34, err));
  };

  const uploadreshaCard = (id) => {
    const formData = new FormData();
    formData.append("reshanCard", docs.reshanCard);
    axios
      .put(`https://mhebackend.payagain.in/api/NonCriminal_reshaCard/${id}`, formData)
      .then((res) => console.log("reshanCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadadharCard = (id) => {
    const formData = new FormData();
    formData.append("adharCard", docs.adharCard);
    axios
      .put(`https://mhebackend.payagain.in/api/NonCriminal_adharCard/${id}`, formData)
      .then((res) => console.log("adharCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadlightBill = (id) => {
    const formData = new FormData();
    formData.append("lightBill", docs.lightBill);
    axios
      .put(`https://mhebackend.payagain.in/api/NonCriminal_lightBill/${id}`, formData)
      .then((res) => console.log("lightbill", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadschoolLeaveCertificate = (id) => {
    const formData = new FormData();
    formData.append("schoolLeaveCertificate", docs.SchoolLeaveCertificate);
    axios
      .put(
        `https://mhebackend.payagain.in/api/NonCriminal_schoolLeaveCertificate/${id}`,
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
      .put(`https://mhebackend.payagain.in/api/NonCriminal_photo/${id}`, formData)
      .then((res) => console.log("photo", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadincomeCertficate3year = (id) => {
    const formData = new FormData();
    formData.append("incomeCertficate3year", docs.incomeCertificate3year);
    axios
      .put(
        `https://mhebackend.payagain.in/api/NonCriminal_incomeCertficate3year/${id}`,
        formData
      )
      .then((res) => console.log("taxBillOr15yerOldLightbill", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadcastCertificate = (id) => {
    const formData = new FormData();
    formData.append("castCertificate", docs.castCertificate);
    axios
      .put(`https://mhebackend.payagain.in/api/NonCriminal_castProof/${id}`, formData)
      .then((res) => console.log("castCertificate", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadtaxRecipt = (id) => {
    const formData = new FormData();
    formData.append("taxRecipt", docs.taxRecipt);
    axios
      .put(`https://mhebackend.payagain.in/api/NonCriminal_taxrecipt/${id}`, formData)
      .then((res) => console.log("selfDeclearation", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id != undefined) {
      axios.get(`https://mhebackend.payagain.in/api/Non_Criminal/${id}`).then((res) => {
        const data = res.data[0];
        SetData(data.Data);
        setNoncreamyIncomeSource(data.NonCreamyLayerincomeSource);
        setoccupation_income(data.occupation_income);
      });
    }
  }, [id]);

  const editHandler = (e) => {
    const obj = {
      application_type: "Non_Cremylayer certificate",
      status: "IN-PROGRESS",
      createdBy: ID,
      createdByName,
      Data,
      NonCreamyLayerincomeSource,
      occupation_income,
    };
    const mainDataPromise = new Promise((resolve, reject) => {
      axios
        .put(`https://mhebackend.payagain.in/api/Non_Criminal/${id}`, obj)
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
        uploadincomeCertficate3year(res.data.data._id);
        uploadcastCertificate(res.data.data._id);

        uploadtaxRecipt(res.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ChangeDate = (Bdata, bdataString) => {
    SetData({ ...Data, benificiary_DOB: bdataString });
  };
  const handalStartDate = (MSdata, msdataString) => {
    SetData({ ...Data, Issueddate: msdataString });
  };

  const handalFatherDate = (MEdata, medataString) => {
    SetData({ ...MEdata, FatherDate: medataString });
  };
  const handalretirementDate = (REdata, ReMdataString) => {
    SetData({ ...REdata, retirementDate: ReMdataString });
  };
  const handalMotherDate = (Mdata, MdataString) => {
    SetData({ ...Mdata, MotherDate: MdataString });
  };
  const handalretirementMDate = (RMdata, retirementdataString) => {
    SetData({ ...RMdata, retirementMDate: retirementdataString });
  };
  const handalSpouseDate = (SPdata, SpousedataString) => {
    SetData({ ...SPdata, SpouseDate: SpousedataString });
  };

  

  const translateName = () => {
    let istrue =false
    axios
      .post("https://mhebackend.payagain.in/translate", { text: Data.fullName_English })
      .then((res) => {
        setnameMarathi(res.data.output);
        console.log(611,res.data.output)
        SetData({...Data,fullName_Marathi:res.data.output})
        // istrue=true
      })
      .catch((err) => console.log(err));
      if (istrue) {
        console.log(222,"ok")
        
        // SetData({...Data,fullName_Marathi:nameMarathi})
      }else{
        console.log(222,"error")
      }
    };

  const translateFName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", {
        text: Data.fatherName_english,
      })
      .then((res) => {
        console.log(res.data.output);
        setfnameMarathi(res.data.output);
        SetData({...Data,fatherName_marathi:res.data.output})

      })
      .catch((err) => console.log(err));
  };

  const translateMName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", { text: Data.txtmothername })
      .then((res) => {
        console.log(res.data.output);
        setmnameMarathi(res.data.output);
        SetData({...Data,txtmothername_LL:res.data.output})
        
      })
      .catch((err) => console.log(err));
    };
    
    const translateSName = () => {
      axios
      .post("https://mhebackend.payagain.in/translate", { text: Data.txtSpouseName })
      .then((res) => {
        setsnameMarathi(res.data.output);
        SetData({...Data,txtspousename_LL:res.data.output})
      })
      .catch((err) => console.log(err));
  };

  const clickHandler = () => {
    translateName();
  };

  const clickHandler1 = () => {
    translateFName();
  };

  const clickHandler2 = () => {
    translateMName();
  };

  const clickHandler3 = () => {
    translateSName();
  };

  return (
    <Fragment>
      <Breadcrumb title={"NonCreamyLayer Certificate : "} parent={"license"} />
      <Container fluid={true}>
        <h3>
          Form Price :{GetFormPrice?GetFormPrice:"0"}
        </h3>
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
                            <span id="CPH_Panelappdetails">
                              Applicant Details :
                            </span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-2">
                              <span id="CPH_Label85"></span>
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
                                    <span id="statusfname">Salutation</span>
                                    <span class="star">*</span>
                                    <select
                                      name="statusfname"
                                      class="form-control"
                                      value={Data.statusfname}
                                      onChange={handleChange}
                                      onkeypress="return IsAlphabet(event);"
                                    >
                                      <option value="---Select---">
                                        ---Select---
                                      </option>
                                      <option value="Advocate">
                                        Advocate
                                      </option>
                                      <option value="Kumar">
                                        Kumar
                                      </option>
                                      <option value="Kumari">
                                        Kumari
                                      </option>
                                      <option value="Mr.">
                                        Mr.
                                      </option>
                                      <option value="Mrs">
                                        Mrs
                                      </option>
                                      <option value="Ms">
                                        Ms
                                      </option>
                                      <option value="Shri">
                                        Shri
                                      </option>
                                      <option value="Shrimati">
                                        Shrimati
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <span id="CPH_Label26">
                                      Full Name (English)
                                    </span>
                                    <span class="star">*</span>

                                    <input
                                      name="fullName_English"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_FullName"
                                      tabindex="7"
                                      class="form-control"
                                      value={Data.fullName_English}
                                      onChange={(e) => {
                                        SetData({
                                          ...Data,
                                          fullName_English: e.target.value,
                                        });
                                        // translateName();
                                      }}
                                      onBlur={clickHandler}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <span id="CPH_Label52">
                                      Full Name (Marathi)
                                    </span>
                                    <span class="star">*</span>
                                    <input
                                      name="fullName_Marathi"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_FullName_LL"
                                      tabindex="8"
                                      class="form-control"
                                      value={nameMarathi}
                                      // onChange={(e) => {
                                      //   SetData({
                                      //     ...Data,
                                      //     fullName_Marathi: nameMarathi,
                                      //   });
                                      // }}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <span id="CPH_lblAppSal0">Salutation</span>
                                    <span class="star"></span>
                                    <select
                                      name="statusfname"
                                      id="CPH_ddlfathersal"
                                      tabindex="9"
                                      class="form-control"
                                      onChange={handleChange}
                                      onkeypress="return IsAlphabet(event);"
                                    >
                                      <option value="Mr.">
                                        Mr.
                                      </option>
                                      <option value="E5397BCD-87FC-4BBB-8BDB-8AB6E6DE5BBA">
                                        Shri
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <span id="CPH_Label111">
                                      Father's Name (English)
                                    </span>
                                    <span class="star">*</span>
                                    <input
                                      name="fatherName_english"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_fatherfullname"
                                      tabindex="10"
                                      class="form-control"
                                      value={Data.fatherName_english}
                                      onChange={(e) => {
                                        SetData({
                                          ...Data,
                                          fatherName_english: e.target.value,
                                        });
                                      
                                      }}
                                      onBlur={clickHandler1}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <span id="CPH_Label112">
                                      Father's Name (Marathi)
                                    </span>
                                    <span class="star">*</span>
                                    <input
                                      name="fatherName_marathi"
                                      type="text"
                                      maxlength="90"
                                      id="CPH_fatherfullname_mr"
                                      tabindex="11"
                                      class="form-control"
                                      value={fnameMarathi}
                                      // onChange={(e) => {
                                      //   SetData({
                                      //     ...Data,
                                      //     fullName_Marathi: e.target.value,
                                      //   });
                                       
                                      // }}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="row"></div>
                            </div>
                          </div>
                          <div class="separator"></div>
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <span>Date of Birth</span>
                                <br />
                               
                                <DatePicker
                                  name="BirthDate"
                                  type="text"
                                  maxlength="10"
                                  tabindex="12"
                                  class="form-control"
                                  onChange={ChangeDate}
                                  onkeypress="return IsAlphabet(event);"
                                  format="YYYY-MM-DD"
                                />
                                <br />

                                <span
                                  id="CPH_RegularExpressionValidator33"
                                  class="lbl_Validator"
                                >
                                  Invalid date format.
                                </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_lblcaste03appage">Age</span>
                                <span class="star">*</span>
                                <input
                                  name="age"
                                  type="text"
                                  maxlength="3"
                                  id="CPH_txtappage"
                                  tabindex="13"
                                  class="form-control"
                                  value={Data.age}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label54">Gender</span>
                                <span class="star">*</span>
                                <select
                                  name="Gender"
                                  id="CPH_ddlappgender"
                                  tabindex="14"
                                  class="form-control"
                                  value={Data.Gender}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value="---Select---">
                                    ---Select---
                                  </option>
                                  <option value="Female">F</option>
                                  <option value="Male">M</option>
                                  <option value="other">T</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <div class="form-group">
                                  <span id="CPH_Label3">Mobile No</span>
                                  <span class="star">*</span>
                                  <input
                                    name="phoneNUm"
                                    type="text"
                                    maxlength="10"
                                    id="CPH_Mobile"
                                    tabindex="15"
                                    class="form-control"
                                    value={Data.phoneNUm}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                  <span
                                    id="CPH_RegularExpressionValidator6"
                                    class="lbl_Validator"
                                  >
                                    Mobile no should be valid and must be of 10
                                    digits
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label2">Email</span>
                                <input
                                  name="email"
                                  type="text"
                                  maxlength="40"
                                  id="CPH_Email"
                                  tabindex="16"
                                  class="form-control"
                                  value={Data.email}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                <span
                                  id="CPH_revInvalidEmail"
                                  class="lbl_Validator"
                                >
                                  Enter valid Email Id
                                </span>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label1">UID No.</span>
                                <input
                                  name="UDI_NO"
                                  type="text"
                                  maxlength="12"
                                  id="CPH_txtApplicantUID"
                                  tabindex="20"
                                  class="form-control"
                                  value={Data.UDI_NO}
                                  onChange={handleChange}
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
                            <span id="CPH_Label88">Applicant Address</span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label55">Address </span>
                                <span class="star">*</span>
                                <input
                                  name="Applicant_address"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_AddrCare"
                                  tabindex="17"
                                  class="form-control"
                                  value={Data.Applicant_address}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label56"> Street</span>
                                <input
                                  name="Applicant_street"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_AddrStreet"
                                  tabindex="18"
                                  class="form-control"
                                  value={Data.Applicant_street}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label57">Locality</span>
                                <input
                                  name="Applicant_Locality"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_AddrLocality"
                                  tabindex="19"
                                  class="form-control"
                                  value={Data.Applicant_Locality}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label5">Building</span>
                                <input
                                  name="Applicant_Building"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_Building"
                                  tabindex="20"
                                  class="form-control"
                                  value={Data.Applicant_Building}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label4"> Landmark</span>
                                <input
                                  name="Applicant_landmark"
                                  type="text"
                                  maxlength="60"
                                  id="CPH_Landmark"
                                  tabindex="21"
                                  class="form-control"
                                  value={Data.Applicant_landmark}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label59">District</span>
                                <span class=" star">*</span>
                                <select
                                  name="Applicant_district"
                                  id="CPH_District"
                                  tabindex="22"
                                  class="form-control"
                                  value={Data.Applicant_district}
                                  onChange={(e)=>{
                                    SetData({...Data,Applicant_district:e.target.value})
                                    setTalukasData(e.target.value);
                                    console.log(1131,e.target.value);
                                  }}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                   {districtData.map((item, i) => {
                                    return (
                                      <option value={item.name}>{item.name}</option>
                                    );
                                  })}
                                     
                                </select>
                                <input
                                  type="hidden"
                                  name="ctl00$CPH$CascadingDistrict_ClientState"
                                  id="CPH_CascadingDistrict_ClientState"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label6">Taluka</span>
                                <span class="star">*</span>
                                <select
                                  name="Applicant_taluka"
                                  id="CPH_SubTaluka"
                                  tabindex="23"
                                  class="form-control"
                                  value={Data.Applicant_taluka}
                                  onChange={(e)=>{SetData({...Data,Applicant_taluka:e.target.value})
                                console.log(1161,e.target.value);
                                }}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  {talukas.map((item, i) => {
                                    return (
                                      
                                      <option value={item}>{item}</option>
                                    );
                                  })}
                                  <option value=""></option>
                                </select>
                                <input
                                  type="hidden"
                                  name="ctl00$CPH$CascadingSubDistrict_ClientState"
                                  id="CPH_CascadingSubDistrict_ClientState"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label58">Village</span>
                                <span class="star">*</span>
                                {/* <select
                                  name="Applicant_village"
                                  id="CPH_Village"
                                  tabindex="24"
                                  class="form-control"
                                  value={Data.Applicant_village}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value=""></option>
                                </select> */}
                                 <input
                                  name="Applicant_village"
                                  type="text"
                                  maxlength="6"
                                  id="CPH_Pincode"
                                  tabindex="25"
                                  class="form-control"
                                  value={Data.Applicant_village}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                <input
                                  type="hidden"
                                  name="ctl00$CPH$VillageCascading_ClientState"
                                  id="CPH_VillageCascading_ClientState"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label60">Pincode</span>
                                <span class="star">*</span>
                                <input
                                  name="Applicant_pincode"
                                  type="text"
                                  maxlength="6"
                                  id="CPH_Pincode"
                                  tabindex="25"
                                  class="form-control"
                                  value={Data.Applicant_pincode}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label27">Current Occupation</span>
                                <span class="star">*</span>
                                <select
                                  name="Applicant_CurrentOccupation"
                                  id="CPH_ddlcurrentoccupation"
                                  tabindex="26"
                                  class="form-control"
                                  value={Data.Applicant_CurrentOccupation}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  {work_type.map((item, i) => (
                                    <option value={item} key={i}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
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
                            <span id="CPH_Panelbenefdetails">
                              Relation of Beneficiary with Applicant:
                            </span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_lblapprelation">
                                  Relation of Beneficiary with Applicant
                                </span>
                                <span class="star">*</span>
                                <select
                                  name="relationOfBanificiaryWithApplicant"
                                  id="CPH_ddlrelation"
                                  tabindex="27"
                                  class="form-control"
                                  value={
                                    Data.relationOfBanificiaryWithApplicant
                                  }
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value="---Select---">
                                    ---Select---
                                  </option>
                                  <option value="79A8FFE8-1188-4423-9500-0235087530DF">
                                    Grand Son
                                  </option>
                                  <option value="5CA78258-4F69-4871-80B8-1140CA8BF3F8">
                                    Grand Daughter
                                  </option>
                                  <option value="2CDA412C-F30F-4C63-8A60-6EFD57CECEA4">
                                    Nephew
                                  </option>
                                  <option value="01C42BF6-42AF-489D-B087-7C3A9203B3B6">
                                    Husband
                                  </option>
                                  <option value="A8763BD2-2FA1-4A3D-BDF5-88B3880737F8">
                                    Sister
                                  </option>
                                  <option value="DA17C2E1-9C1A-4D7B-A166-944E04B3B4DB">
                                    Son
                                  </option>
                                  <option value="0DB4695B-37E7-4C02-A1AA-AE1A837751DD">
                                    Brother
                                  </option>
                                  <option value="5AEB3403-9CB4-4FCA-BE58-AF604222B6B8">
                                    Self
                                  </option>
                                  <option value="31E131DB-6CF8-4B5C-A96D-C3A6459B75B7">
                                    Niece
                                  </option>
                                  <option value="A2DB24FD-3560-4138-9F34-DE7647A42EAE">
                                    Daughter
                                  </option>
                                  <option value="AE6F370F-26C2-4B7E-B1AE-E698D3191AC3">
                                    Wife
                                  </option>
                                </select>
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
                            <span id="CPH_Label28">
                              Beneficiary Caste/ Category Details{" "}
                            </span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_lblappcaste">Caste</span>
                                <span class="star">*</span>
                                <select
                                  name="benificiary_Cast"
                                  id="CPH_ddlappcaste"
                                  tabindex="50"
                                  class="form-control"
                                  value={Data.benificiary_Cast}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value="---Select---">
                                    ---Select---
                                  </option>
                                  <option value="F3C3F1FE-8E64-419D-91EF-5DA214D3F602">
                                    Aagale(169)
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_lblsubcaste">Category</span>
                                <span class="star">*</span>
                                {/* <input
                                  name="benificiary_Catagary"
                                  type="text"
                                  readonly="readonly"
                                  id="CPH_txtcategory"
                                  // tabindex="50"
                                  class="form-control"
                                  value={Data.benificiary_Catagary}
                                  onChange={handleChange}
                                  // onkeypress="return IsAlphabet(event);"
                                /> */}
                                 <input
                                  name="benificiary_Catagary"
                                  type="text"
                                  maxlength="6"
                                  id="CPH_Pincode"
                                  tabindex="25"
                                  class="form-control"
                                  value={Data.benificiary_Catagary}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                              
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <span id="CPH_Label37">Validity Duration </span>
                                <span class="star">*</span>
                                <select
                                  name="brnificiary_Validity_Duration"
                                  id="CPH_ddlIncome"
                                  tabindex="50"
                                  class="form-control"
                                  value={Data.brnificiary_Validity_Duration}
                                  onChange={
                                    (e) =>{
                                      SetData({...Data,brnificiary_Validity_Duration:e.target.value})
                                    }
                                  }
                                  onkeypress="return IsAlphabet(event);"
                                >
                                  <option value="---Select---">
                                    ---Select---
                                  </option>
                                  <option value="1">1 Year</option>
                                  <option value="3">2 Years</option>
                                  <option value="2">3 Years</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </div>

                  <div id="CPH_divST" class="form-bg" role="form">
                    <div class="box-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <span id="CPH_lblST">
                                  If migrated from one district to another
                                  district? (Yes/No)
                                </span>
                                <span class="star">*</span>
                                <table
                                  name="migration_MH_From_Another_State"
                                  value={Data.Migrant_Address_Details}
                                  onChange={(e) => {
                                    SetData({
                                      ...Data,
                                      Migrant_Address_Details: e.target.value,
                                    });
                                    if (e.target.value === "Yes") {
                                      SetMigrantAddressDetails(true);
                                    } else {
                                      SetMigrantAddressDetails(false);
                                      SetData({
                                        ...Data,

                                        Migrant_Distict: "",
                                        Migrant_Taluka: "",
                                        Migrant_village: "",
                                        isAppliedForCastCertificate: "",
                                      });
                                    }
                                  }}
                                >
                                  <tr>
                                    <td>
                                      <input
                                        id="CPH_rdMigDist_0"
                                        type="radio"
                                        name="ctl00$CPH$rdMigDist"
                                        value="No"
                                        tabindex="51"
                                      />
                                      No<label for="CPH_rdMigDist_0"></label>
                                    </td>
                                    <td>
                                      <input
                                        id="CPH_rdMigDist_1"
                                        type="radio"
                                        name="ctl00$CPH$rdMigDist"
                                        value="Yes"
                                        checked="checked"
                                        tabindex="51"
                                      />
                                      <label for="CPH_rdMigDist_1">Yes</label>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="CPH_migrantDistDetails" class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="CPH_Label94">
                              Migrant Address Details{" "}
                            </span>
                          </h3>
                        </div>
                        {MigrantAddressDetails && (
                          <div class="box-body">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="row">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <span id="CPH_Label46">District</span>
                                      <span class="star">*</span>
                                      <select
                                        name="Migrant_Distict"
                                        id="CPH_ddlmigdist"
                                        tabindex="63"
                                        class="form-control"
                                        value={Data.Migrant_Distict}
                                        onChange={(e)=>{handleChange();
                                          setTalukasData(e.target.value)
                                        }}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                         {districtData.map((item, i) => {
                                    return (
                                      // <Select.Option value={item.name} key={i}>
                                      //   {item.name}
                                      // </Select.Option>
                                      <option value={item.name}>{item.name}</option>
                                    );
                                  })}
                                      </select>
                                      <input
                                        type="hidden"
                                        name="ctl00$CPH$CascadingDropDown10_ClientState"
                                        id="CPH_CascadingDropDown10_ClientState"
                                      />
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <span id="CPH_Label108">Taluka</span>
                                      <span class="star">*</span>
                                      <select
                                        name="Migrant_Taluka"
                                        id="CPH_ddlmigtaluka"
                                        tabindex="64"
                                        class="form-control"
                                        value={Data.Migrant_Taluka}
                                        onChange={(e)=>{
                                          SetData({...Data,Migrant_Taluka:e.target.value})
                                        }}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        

                                        {talukas.map((item, i) => {
                                          return (
                                         
                                            <option value={item}>{item}</option>
                                          );
                                        })}
                                        
                                      </select>
                                      <input
                                        type="hidden"
                                        name="ctl00$CPH$CascadingDropDown11_ClientState"
                                        id="CPH_CascadingDropDown11_ClientState"
                                      />
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <span id="CPH_Label47">Village</span>
                                      <span class="star">*</span>
                                      {/* <select
                                        name="Migrant_village"
                                        id="CPH_ddlmigvillage"
                                        tabindex="65"
                                        class="form-control"
                                        value={Data.Migrant_village}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        <option value=""></option>
                                      </select> */}
                                       <input
                                  name="Migrant_village"
                                  type="text"
                                  maxlength="6"
                                  id="CPH_Pincode"
                                  tabindex="25"
                                  class="form-control"
                                  value={Data.Migrant_village}
                                  onChange={handleChange}
                                  onkeypress="return IsAlphabet(event);"
                                />
                                      <input
                                        type="hidden"
                                        name="ctl00$CPH$CascadingDropDown12_ClientState"
                                        id="CPH_CascadingDropDown12_ClientState"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div id="CPH_divIsFirstGiven" class="form-bg" role="form">
                    <div class="box-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <span id="CPH_Label92">
                                  Have you applied before for Caste Certificate
                                  (including other District) (Yes/No)
                                </span>
                                <span class="star">*</span>
                                        <Form.Item name="isAppliedForCastCertificate">
                                  <Radio.Group
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        Caste_Certificate: e.target.value,
                                      });
                                      if (e.target.value === "yes") {
                                        SetCastcertificate(true);
                                      } else {
                                        SetCastcertificate(false);
                                        SetData({
                                          ...Data,
                                          FirtGiven: "",
                                        });
                                      }
                                    }}
                                  >
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {Caste_Certificate1 && (
                    <div id="CPH_WasCertiGiven" class="form-bg" role="form">
                      <div class="box-body">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <span id="CPH_Label93">
                                    Is Certificate Given? (Yes/No)
                                  </span>
                                  <span class="star">*</span>
                    

                                  <Form.Item name="is_Certificate_Given">
                                    <Radio.Group
                                      onChange={(e) => {
                                        SetData({
                                          ...Data,
                                          FirtGiven: e.target.value,
                                        });
                                       
                                      }}
                                    >
                                      <Radio value="yes">Yes</Radio>
                                      <Radio value="No">No</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div id="CPH_fieldset7">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-bg" role="form">
                          <div class="box-header box-header-bg">
                            <h3 class="box-title">
                              <span id="CPH_Label83">
                                Previous Caste certificate’s details (if
                                applicable)
                              </span>
                            </h3>
                            <span id="CPH_ncldtls" class="star">
                              *
                            </span>
                          </div>
                          <div class="box-body">
                            <div class="row">
                              <div class="col-md-4">
                                <div class="form-group">
                                  Certificate Number
                                  <input
                                    name="previos_CastCerNum"
                                    type="text"
                                    id="CPH_txtcertino"
                                    tabindex="53"
                                    class="form-control"
                                    value={Data.previos_CastCerNum}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  Place of Issue
                                  <input
                                    name="previos_CastCerPlaceIssue"
                                    type="text"
                                    id="CPH_txtissueplace"
                                    tabindex="54"
                                    class="form-control"
                                    value={Data.previos_CastCerPlaceIssue}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  Issued date
                                  <br />
                                
                                  <DatePicker
                                    name="previos_CastCerIssuedDate"
                                    type="text"
                                    maxlength="10"
                                    id="CPH_caste03apptxtDOB"
                                    tabindex="12"
                                    class="form-control"
                                    onChange={handalStartDate}
                                    onkeypress="return IsAlphabet(event);"
                                    format="YYYY-MM-DD"
                                  />
                                  <br />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-bg" role="form">
                        <div class="box-header box-header-bg">
                          <h3 class="box-title">
                            <span id="CPH_Label36">Income Details :</span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-12 table-responsive">
                              <table
                                id="CPH_Table1"
                                cellpadding="0"
                                cellspacing="0"
                                class="table-striped form-table"
                              >
                                <tr>
                                  <th>
                                    <span id="CPH_lblseno">Sr.No </span>
                                  </th>
                                  <th>
                                    <span id="CPH_lblincmesources">
                                      Income Source :
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
                                </tr>
                                
                                {NonCreamyLayer_income_input.map((item, i) => (
                                  <tr key={i}>
                                    <td>
                                      <span id="CPH_lbl1">{i + 1}</span>
                                    </td>
                                    <td>
                                      <span id="CPH_lblfarming">
                                        {item.source}
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
                                    {/* <td>
                                          <input
                                             name={item.source}

                                            type="text"
                                            maxlength="50"
                                            id="CPH_txtbriefdetails"
                                            tabindex={item.t4}
                                            class="lbl_value form-control"
                                            onChange={(e)=>handleIncomeChange(e)}
      
                                          />
                                        </td> */}
                                  </tr>
                                ))}
                                <tr>
                                  <td></td>
                                  <td>
                                    <span id="CPH_Label86">*</span>
                                    <span id="CPH_Total">Total</span>
                                  </td>
                                  <td id="CPH_td111">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        name="txtTotal1"
                                        type="text"
                                        maxlength="9"
                                        id="CPH_txtTotal1"
                                        // disabled="disabled"
                                        tabindex="77"
                                        class="aspNetDisabled lbl_value rupees form-control form-control"
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
                                        name="txtTotal2"
                                        type="text"
                                        maxlength="9"
                                        id="CPH_txtTotal2"
                                        disabled="disabled"
                                        tabindex="78"
                                        class="aspNetDisabled lbl_value rupees form-control form-control"
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
                                        name="txtTotal3"
                                        type="text"
                                        maxlength="9"
                                        id="CPH_txtTotal3"
                                        disabled="disabled"
                                        tabindex="79"
                                        class="aspNetDisabled lbl_value rupees form-control form-control"
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </table>
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
                            <span id="CPH_Label39">
                              Occupation and Income Details of Applicant’s
                              Family
                            </span>
                          </h3>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-12 table-responsive">
                              <table
                                id="CPH_Table2"
                                cellpadding="0"
                                cellspacing="0"
                                class="table-striped form-table"
                              >
                                <tr>
                                  <th></th>
                                  <th id="CPH_Th1">
                                    <span id="CPH_Label24">Father</span>
                                  </th>
                                  <th id="CPH_Th2">
                                    <span id="CPH_Label29">Mother</span>
                                  </th>
                                  <th>
                                    <span id="CPH_Label33">Spouse</span>
                                  </th>
                                </tr>
                                {occupation_income_input.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      <span id="CPH_lbl1">
                                        {index + 1} &nbsp;&nbsp;&nbsp;&nbsp;
                                      </span>
                                      <span id="CPH_lblfarming">
                                        {item.source_Name1}
                                      </span>
                                    </td>
                                    {/* <td>
																		<span id="CPH_lblfarming">{item.source_Name1}</span>
																		
																	</td> */}
                                    <td id="CPH_td11">
                                      <div class="icon-addon">
                                        <span>
                                          <i class="fa fa-inr"></i>
                                        </span>
                                        <input
                                          name={"Father"}
                                          type={item.inputType}
                                          maxlength="9"
                                          id="txtfrstscale"
                                          tabindex={item.tabIndex}
                                          class="lbl_value rupees form-control form-control"
                                          onChange={(e) => {
                                            temp(e);
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td id="CPH_td21">
                                      <div class="icon-addon">
                                        <span>
                                          <i class="fa fa-inr"></i>
                                        </span>
                                        <input
                                          name={"Mother"}
                                          type={item.inputType}
                                          maxlength="9"
                                          id="txtfrstscale"
                                          tabindex={item.tabIndex}
                                          class="lbl_value rupees form-control form-control"
                                          onChange={(e) => {
                                            temp(e);
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="icon-addon">
                                        <span>
                                          <i class="fa fa-inr"></i>
                                        </span>
                                        <input
                                          name={"Spouse"}
                                          type={item.inputType}
                                          maxlength="9"
                                          id="txtfrstscale"
                                          tabindex={item.tabIndex}
                                          class="lbl_value rupees form-control form-control"
                                          onChange={(e) => {
                                            temp(e);
                                          }}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                ))}

                                {/* 
		{
                                    occupation_income_input.map((item,i)=>(

                                        <tr key={i}>
                                        <td>
                                          <span id="CPH_lbl1">{i+1}</span>
                                        </td>
                                        <td>
                                          <span id="CPH_lblfarming">{item.source_Name1}</span>
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
                                            //   onChange={(e)=>handleOccupationChange(e)}
											onChange={(e)=>{

											}}

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
                                              onChange={(e)=>handleOccupationChange(e)}
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
                                              onChange={(e)=>handleOccupationChange(e)}
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
                                              tabindex={item.t4}
                                              class="lbl_value rupees form-control"
                                              onChange={(e)=>handleOccupationChange(e)}
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
                                              tabindex={item.source}
                                              class="lbl_value rupees form-control"
                                              onChange={(e)=>handleOccupationChange(e)}
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
                                              onChange={(e)=>handleOccupationChange(e)}
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
                                              onChange={(e)=>handleOccupationChange(e)}
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
                                              onChange={(e)=>handleOccupationChange(e)}
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
                                              onChange={(e)=>handleOccupationChange(e)}
                                              onkeypress="return IsAlphabet(event);"
                                            />
                                          </div>
                                        </td>
										                                      </tr>

                                    ))
                                } */}

                                {/* <tr>
																	<td>
																		<span id="CPH_Label43">Income from Immovable property</span>
																	</td>
																</tr> */}
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label44">
                                      Owner of property
                                    </span>
                                  </td>
                                  <td id="CPH_td14">
                                    <div class="icon-addon">
                                      <select
                                        name="propowner"
                                        id="CPH_ddlpropowner"
                                        tabindex="110"
                                        class="form-control"
                                        value={Data.propowner}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        <option value="---Select---">
                                          ---Select---
                                        </option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Spouse">Spouse</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label48">Location</span>
                                  </td>
                                  <td id="CPH_td20">
                                    <div class="icon-addon">
                                      <input
                                        name="txtLocation"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtLocation"
                                        tabindex="111"
                                        class="form-control"
                                        value={Data.txtLocation}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label51">Area</span>
                                  </td>
                                  <td id="CPH_td31">
                                    <div class="icon-addon">
                                      <input
                                        name="txtarea"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtarea"
                                        tabindex="112"
                                        class="form-control"
                                        value={Data.txtarea}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                  <td id="CPH_td32">
                                    <div class="icon-addon">
                                      <select
                                        name="ddlareaunits"
                                        id="CPH_ddlareaunits"
                                        tabindex="113"
                                        class=" form-control"
                                        value={Data.ddlareaunits}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        <option value="---Select---">
                                          ---Select---
                                        </option>
                                        <option value="431D1495-1FEC-4BAE-9AA2-883A4D4B3074">
                                          Acres
                                        </option>
                                        <option value="C9755DE1-312B-4A7C-8D8C-832D67F6CFE3">
                                          Square Mtrs
                                        </option>
                                        <option value="0518A0E9-9DCA-4CC8-88A4-5878B8DDEECC">
                                          Yards
                                        </option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label53">
                                      Type of agricultural land
                                    </span>
                                  </td>
                                  <td id="CPH_td15" colspan="3" align="left">
                                    <div class="icon-addon">
                                      <span
                                        id="CPH_chckagriland"
                                        class="non-cre"
                                      >
                                        <input
                                          id="CPH_chckagriland_0"
                                          type="checkbox"
                                          name="ctl00$CPH$chckagriland$0"
                                          tabindex="114"
                                          value="Irrigated"
                                        />
                                        <label for="CPH_chckagriland_0">
                                          Irrigated
                                        </label>
                                        <input
                                          id="CPH_chckagriland_1"
                                          type="checkbox"
                                          name="ctl00$CPH$chckagriland$1"
                                          tabindex="114"
                                          value="Dry crop"
                                        />
                                        <label for="CPH_chckagriland_1">
                                          Dry crop
                                        </label>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label61">
                                      Area of irrigated land
                                    </span>
                                  </td>
                                  <td id="CPH_td33">
                                    <div class="icon-addon">
                                      <input
                                        name="txtirriarea"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtirriarea"
                                        tabindex="115"
                                        class=" form-control"
                                        value={Data.txtirriarea}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                  <td id="CPH_td35">
                                    <div class="icon-addon">
                                      <select
                                        name="ddlunits"
                                        id="CPH_ddlunits"
                                        tabindex="116"
                                        class=" form-control"
                                        value={Data.ddlunits}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        <option value="---Select---">
                                          ---Select---
                                        </option>
                                        <option value="431D1495-1FEC-4BAE-9AA2-883A4D4B3074">
                                          Acres
                                        </option>
                                        <option value="C9755DE1-312B-4A7C-8D8C-832D67F6CFE3">
                                          Square Mtrs
                                        </option>
                                        <option value="0518A0E9-9DCA-4CC8-88A4-5878B8DDEECC">
                                          Yards
                                        </option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label62">
                                      a) Percentage of irrigated land as per
                                      constitutional ceiling under the state
                                      land ceiling act formula
                                    </span>
                                  </td>
                                  <td id="CPH_td30">
                                    <div class="icon-addon">
                                      <input
                                        name="txtpercentage"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtpercentage"
                                        tabindex="117"
                                        class=" form-control"
                                        value={Data.txtpercentage}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label66">
                                      b) If you own both irrigated and dry land,
                                      percentage of irrigated land as per
                                      constitutional ceiling under the state
                                      land ceiling act formula
                                    </span>
                                  </td>
                                  <td id="CPH_td36">
                                    <div class="icon-addon">
                                      <input
                                        name="txtformula"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtformula"
                                        tabindex="118"
                                        class="form-control"
                                        value={Data.txtformula}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label69">
                                      As per a) total irrigated land as a
                                      percentage as calculated by the land
                                      ceiling act formula
                                    </span>
                                  </td>
                                  <td id="CPH_td37">
                                    <div class="icon-addon">
                                      <input
                                        name="txtceilingactform"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtceilingactform"
                                        tabindex="119"
                                        class="form-control"
                                        value={Data.txtceilingactform}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label70">
                                      Cultivation details
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label71">
                                      Type of cultivation
                                    </span>
                                  </td>
                                  <td id="CPH_td38">
                                    <div class="icon-addon">
                                      <select
                                        name="ddlcultitype"
                                        id="CPH_ddlcultitype"
                                        tabindex="120"
                                        class="form-control"
                                        value={Data.ddlcultitype}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        <option value="---Select---">
                                          ---Select---
                                        </option>
                                        <option value="Crop">Crop</option>
                                        <option value="Fruits">Fruits</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label72">Location</span>
                                  </td>
                                  <td id="CPH_td39">
                                    <div class="icon-addon">
                                      <input
                                        name="txtcultilocation"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtcultilocation"
                                        tabindex="121"
                                        class=" form-control"
                                        value={Data.txtcultilocation}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label73">
                                      Area of irrigated land
                                    </span>
                                  </td>
                                  <td id="CPH_td40">
                                    <div class="icon-addon">
                                      <input
                                        name="txtcultiarea"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtcultiarea"
                                        tabindex="122"
                                        class="form-control"
                                        value={Data.txtcultiarea}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                  <td id="CPH_td41">
                                    <div class="icon-addon">
                                      <select
                                        name="ddlcultiunit"
                                        id="CPH_ddlcultiunit"
                                        tabindex="123"
                                        class="form-control"
                                        value={Data.ddlcultiunit}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        <option value="---Select---">
                                          ---Select---
                                        </option>
                                        <option value="431D1495-1FEC-4BAE-9AA2-883A4D4B3074">
                                          Acres
                                        </option>
                                        <option value="C9755DE1-312B-4A7C-8D8C-832D67F6CFE3">
                                          Square Mtrs
                                        </option>
                                        <option value="0518A0E9-9DCA-4CC8-88A4-5878B8DDEECC">
                                          Yards
                                        </option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label74">
                                      Location of property
                                    </span>
                                  </td>
                                  <td id="CPH_td42">
                                    <div class="icon-addon">
                                      <input
                                        name="txtproploc"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtproploc"
                                        tabindex="124"
                                        class="form-control"
                                        value={Data.txtproploc}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label77">
                                      Details of property
                                    </span>
                                  </td>
                                  <td id="CPH_td43">
                                    <div class="icon-addon">
                                      <input
                                        name="txtpropdetails"
                                        type="text"
                                        maxlength="60"
                                        id="CPH_txtpropdetails"
                                        tabindex="125"
                                        class="form-control"
                                        value={Data.txtpropdetails}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label80">
                                      Current use of property
                                    </span>
                                  </td>
                                  <td id="CPH_td44">
                                    <div class="icon-addon">
                                      <input
                                        name="txtpropuse"
                                        type="text"
                                        id="CPH_txtpropuse"
                                        class="form-control"
                                        value={Data.txtpropuse}
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label81">
                                      Are you an income tax payee (Attach
                                      assessment if yes)
                                    </span>
                                  </td>
                                  <td id="CPH_td45">
                                    <div class="icon-addon">
                                      <span
                                        id="CPH_radiobtnpayee"
                                        class="non-cre"
                                        onChange={handleChange}
                                        onkeypress="return IsAlphabet(event);"
                                      >
                                        <input
                                          id="CPH_radiobtnpayee_0"
                                          type="radio"
                                          name="radiobtnpayee"
                                          value="Yes"
                                          tabindex="127"
                                        />
                                        <label for="CPH_radiobtnpayee_0">
                                          Yes
                                        </label>
                                        <input
                                          id="CPH_radiobtnpayee_1"
                                          type="radio"
                                          name="radiobtnpayee"
                                          value="No"
                                          tabindex="127"
                                        />
                                        <label for="CPH_radiobtnpayee_1">
                                          No
                                        </label>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top" class="style5">
                                    <span id="CPH_Label82">
                                      Have you paid wealth tax(Attach details)
                                    </span>
                                  </td>
                                  <td id="CPH_td46">
                                    <div class="icon-addon">
                                      <span
                                        id="CPH_radiobtnwealthtax"
                                        class="non-cre"
                                      >
                                        <input
                                          id="CPH_radiobtnwealthtax_0"
                                          type="radio"
                                          name="radiobtnwealthtax"
                                          value="Y"
                                          tabindex="128"
                                          onChange={handleChange}
                                          onkeypress="return IsAlphabet(event);"
                                        />
                                        <label for="CPH_radiobtnwealthtax_0">
                                          Yes
                                        </label>
                                        <input
                                          id="CPH_radiobtnwealthtax_1"
                                          type="radio"
                                          name="radiobtnwealthtax"
                                          value="N"
                                          tabindex="128"
                                        />
                                        <label for="CPH_radiobtnwealthtax_1">
                                          No
                                        </label>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div class="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div id="CPH_Fieldset8">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-bg" role="form">
                          <div class="box-header box-header-bg">
                            <h3 class="box-title">
                              <span id="CPH_Label91">
                                Other Family Details :
                              </span>
                            </h3>
                          </div>
                          <div class="box-body">
                            <div class="row">
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label100">Salutation</span>
                                  <select
                                    name="ddlmothersal"
                                    id="CPH_ddlmothersal"
                                    tabindex="129"
                                    class="form-control"
                                    value={Data.ddlmothersal}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    <option value="---Select---">
                                      ---Select---
                                    </option>
                                    <option value="Advocate">
                                      Advocate
                                    </option>
                                    <option value="Kumar">
                                      Kumar
                                    </option>
                                    <option value="Kumari">
                                      Kumari
                                    </option>
                                    <option value="Mr.">
                                      Mr.
                                    </option>
                                    <option value="Mrs">
                                      Mrs
                                    </option>
                                    <option value="Ms">
                                      Ms
                                    </option>
                                    <option value="Shri">
                                      Shri
                                    </option>
                                    <option value="Shrimati">
                                      Shrimati
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label101">
                                    Mother Name (English)
                                  </span>
                                  <input
                                    name="txtmothername"
                                    type="text"
                                    maxlength="90"
                                    id="CPH_txtmothername"
                                    tabindex="130"
                                    class="form-control"
                                    value={Data.txtmothername}
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        txtmothername: e.target.value,
                                      });
                                    }}
                                    onBlur={clickHandler2}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label102">
                                    Mother Name (Marathi)
                                  </span>
                                  <input
                                    name="txtmothername_LL"
                                    type="text"
                                    maxlength="90"
                                    id="CPH_txtmothername_LL"
                                    tabindex="131"
                                    class="form-control"
                                    value={mnameMarathi}
                                    // onChange={(e) => {
                                    //   setmnameMarathi(e.target.value);
                                    // }}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label103">Salutation</span>
                                  <select
                                    name="ddlspousesal"
                                    id="CPH_ddlspousesal"
                                    tabindex="132"
                                    class="form-control"
                                    value={Data.ddlspousesal}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    <option value="---Select---">
                                      ---Select---
                                    </option>
                                    <option value="Advocate">
                                      Advocate
                                    </option>
                                    <option value="Kumar">
                                      Kumar
                                    </option>
                                    <option value="Kumari">
                                      Kumari
                                    </option>
                                    <option value="Mr.">
                                      Mr.
                                    </option>
                                    <option value="Mrs">
                                      Mrs
                                    </option>
                                    <option value="Ms">
                                      Ms
                                    </option>
                                    <option value="Shri">
                                      Shri
                                    </option>
                                    <option value="Shrimati">
                                      Shrimati
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label104">
                                    Spouse Name (English)
                                  </span>
                                  <input
                                    name="]txtSpouseName"
                                    type="text"
                                    maxlength="90"
                                    id="CPH_txtSpouseName"
                                    tabindex="133"
                                    class="form-control"
                                    value={Data.txtSpouseName}
                                    onChange={(e) => {
                                      SetData({
                                        ...Data,
                                        txtSpouseName: e.target.value,
                                      });
                                    }}
                                    onBlur={clickHandler3}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label105">
                                    Spouse Name (Marathi)
                                  </span>
                                  <input
                                    name="txtspousename_LL"
                                    type="text"
                                    maxlength="90"
                                    id="CPH_txtspousename_LL"
                                    tabindex="134"
                                    class="form-control"
                                    value={snameMarathi}
                                    // onChange={(e) => {
                                    //   setsnameMarathi(e.target.value);
                                    // }}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label106">District</span>
                                  <select
                                    name="ddlfam_dist"
                                    id="CPH_ddlfam_dist"
                                    tabindex="135"
                                    class="form-control"
                                    value={Data.ddlfam_dist}
                                    onChange={(e)=>{SetData({...Data,ddlfam_dist:e.target.value})
                                    setTalukasData(e.target.value);
                                  }}
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    {
                                      console.log(2855,districtData)
                                    }
                                     {districtData.map((item, i) => {
                                    return (
                                     
                                      <option value={item.name}>{item.name}</option>
                                    );
                                  })}
                                  </select>
                                  <input
                                    type="hidden"
                                    name="ctl00$CPH$CascadingDropDown4_ClientState"
                                    id="CPH_CascadingDropDown4_ClientState"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label109">Taluka</span>
                                  <select
                                    name="ddlfam_taluka"
                                    id="CPH_ddlfam_taluka"
                                    tabindex="136"
                                    class=" form-control"
                                    value={Data.ddlfam_taluka}
                                    onChange={(e)=>{SetData({...Data,ddlfam_taluka:e.target.value})
                                  }}
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    {
                                      talukas.map((item,i)=>{
                                        return(<>
                                        <option value={item}>{item}</option>
                                        </>)
                                      })
                                    }
                                  </select>
                                  <input
                                    type="hidden"
                                    name="ctl00$CPH$CascadingDropDown5_ClientState"
                                    id="CPH_CascadingDropDown5_ClientState"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label107">Village</span>
                                  <select
                                    name="ddlfam_Vill"
                                    id="CPH_ddlfam_Vill"
                                    tabindex="137"
                                    class="form-control"
                                    value={Data.ddlfam_Vill}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  >
                                    <option value=""></option>
                                  </select>
                                  <input
                                    type="hidden"
                                    name="ctl00$CPH$CascadingDropDown6_ClientState"
                                    id="CPH_CascadingDropDown6_ClientState"
                                  />
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label110">Pincode</span>
                                  <input
                                    name="txtfam_pincode"
                                    type="text"
                                    maxlength="6"
                                    id="CPH_txtfam_pincode"
                                    tabindex="138"
                                    class="form-control"
                                    value={Data.txtfam_pincode}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  />
                                  <span
                                    id="CPH_RangeValidator4"
                                    class="lbl_Validator"
                                  >
                                    Pin code must start with 4 and should be of
                                    6 digits only
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="CPH_Fieldset2">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-bg" role="form">
                          <div class="box-header box-header-bg">
                            <h3 class="box-title">
                              <span id="CPH_panelothers">Other Details :</span>
                            </h3>
                          </div>
                          <div class="box-body">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <span id="CPH_lblbenefreason">Reason</span>
                                  <span class="star">*</span>
                                  <textarea
                                    name="txtbenefreason"
                                    rows="2"
                                    cols="20"
                                    id="CPH_txtbenefreason"
                                    tabindex="139"
                                    class="form-control"
                                    value={Data.txtbenefreason}
                                    onChange={handleChange}
                                    onkeypress="return IsAlphabet(event);"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <span id="CPH_Label11">
                                    Do you need the Affidavit?
                                  </span>
                                  <span class="star">*</span>
                                  <table id="CPH_Affd" class="CheckBox">
                                    <tr>
                                      <td>
                                        <input
                                          id="CPH_Affd_0"
                                          type="radio"
                                          name="ctl00$CPH$Affd"
                                          value="Yes"
                                          checked="checked"
                                          tabindex="140"
                                          onChange={handleChange}
                                          onkeypress="return IsAlphabet(event);"
                                        />
                                        <label for="CPH_Affd_0">Yes</label>
                                      </td>
                                      <td>
                                        <input
                                          id="CPH_Affd_1"
                                          type="radio"
                                          name="ctl00$CPH$Affd"
                                          value="No"
                                          tabindex="140"
                                        />
                                        <label for="CPH_Affd_1">No</label>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
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
                  {/* reshaCard: "",
    adharCard: "",//
    lightBill: "",//
    SchoolLeaveCertificate: "",//
    photo: "",//
    incomeCertificate3year: "",//
    castCertificate: "",//
    taxRecipt: "", */}

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
                          adharCard: e.target.files[0],
                        });
                        console.log(992,e.target.files[0]);
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
                        console.log(992,e.target.files[0]);
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
                          SchoolLeaveCertificate: e.target.files[0],
                        });
                        console.log(992,e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Income certificate (Size - Maximum 500 Kb) [Only
                      (jpg,jpeg)]
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDocs({
                          ...docs,
                          incomeCertificate3year: e.target.files[0],
                        });
                        console.log(992,e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      cast certificate (Size - Maximum 500 Kb) [Only (jpg,jpeg)]
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDocs({
                          ...docs,
                          castCertificate: e.target.files[0],
                        });
                        console.log(992,e.target.files[0]);
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
                  {/* </div> */}
                  <div className="row"></div>
                  <div id="CPH_Fieldset1">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-bg" role="form">
                          <div class="box-header box-header-bg">
                            <h3 class="box-title">
                              <span id="CPH_panelaggreement">
                                Agreement Details :
                              </span>
                              <legend> &nbsp;</legend>
                            </h3>
                          </div>
                          <div class="box-body">
                            <div class="row">
                              <div class="col-md-12">
                                <p
                                  id="CPH_lblbenefagreement"
                                  class="agreementArea"
                                >
                                  I solemly affirm that the above mentioned
                                  information submitted by me is true and
                                  correct to my knowledge and belief.I hereby
                                  agree to be liable for legal consequences for
                                  any information found incorrect or untrue at a
                                  later date.
                                </p>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  Agreement Accepted<span class="star">*</span>
                                  <span class="CheckBox lbl_value">
                                    <input
                                      id="CPH_chkaccept"
                                      type="checkbox"
                                      name="chkaccept"
                                      tabindex="141"
                                      onChange={() => setAgree(true)}
                                      onkeypress="return IsAlphabet(event);"
                                    />
                                    <label for="CPH_chkaccept">I accept</label>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 text-center">
                    {id == undefined ? (
                      <input
                        type="submit"
                        name="ctl00$CPH$btnsubmit"
                        value="Proceed"
                        onClick={(e) => postLDJData(e)}
                        id="CPH_btnsubmit"
                        tabindex="141"
                        class="btn btn-success"
                      />
                    ) : (
                      <input
                        type="submit"
                        name="ctl00$CPH$btnsubmit"
                        value="Update"
                        onClick={(e) => editHandler(e)}
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default NonCreamyLayer;
