import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdUploadFile } from "react-icons/md";
import { Button, Form, Input, Radio, Select, DatePicker, Upload } from "antd";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { useState } from "react";
import { fatherOccupation } from "../../constants/data";
import { relationOfBanificiary_Applicant } from "../../constants/data";
import { useDispatch, useSelector } from "react-redux";
import { incNumber } from "../../Redux/actions";
import { toast } from "react-toastify";
import {
  districtData,
  ApllicantBenificiaryOtherState,
} from "../../constants/data";
import swal from "sweetalert";

function EWS() {
  const [agree, setAgree] = useState(false);
  const [talukas, setTalukas] = useState([]);
  const [nameLoading, setNameLoading] = useState(false);
  const [fNameLoading, setFnameLoading] = useState(false);
  const [nameMarathi, setnameMarathi] = useState("");
  const [fnameMarathi, setfnameMarathi] = useState("");
  const [lnameMarathi, setlnameMarathi] = useState("");
  const [benificiaryLoading, setbenificiaryLoading] = useState(false);
  const [benificiarymarathi, setbenificiarymarathi] = useState("");

  const [benificiaryfatherLoading, setbenificiaryfatherLoading] =
    useState(false);
  const [benificiaryfathermarathi, setbenificiaryfathermarathi] = useState("");
  const [items, setItems] = useState();
  const [district, setDistrict] = useState("");
  const dispatch = useDispatch();
  const ID = items?.user?._id;
  const createdByName = items?.user?.name;
  const { id } = useParams();

  useEffect(() => {
    const userRespons = JSON.parse(localStorage.getItem("userResponse"));
    if (userRespons) {
      setItems(userRespons);
    }
  }, []);
  useEffect(() => {
    districtData.filter((dist) => {
      if (dist.name.toLowerCase() == district.toLowerCase()) {
        setTalukas(dist.tahasil);
      }
    });
  }, [district]);
  const users = useSelector((state) => state.userData.user);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const reducer = useSelector((state) => state.changeNumber);
  const [balance, setBalance] = useState(0);
  const [Formerror, setFormerror] = useState({});
  const [isSubmit, SetIsSubmit] = useState(false);

  const [user, setUser] = useState([]);
  const [getAgent, setgetAgent] = useState([]);
  const [GetFormPrice, setGetFormPrice] = useState(); 
  const getData = () => {
    axios
      .get(`https://mhebackend.payagain.in/api/user/getAll`)
      .then((res) => {
        const response = res.data;
        setUser(response);
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
          setGetFormPrice(getFormPrice?.retaile_formPrice?.retailer_EWS);
        }
        // console.log(37,response)
      })
      .catch((err) => console.log(40, err));
  };
  useEffect(() => {
    setTimeout(getData(), 1000);
  }, []);
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
    reshaCard: "",
    adharCard: "",
    lightBill: "",
    schoolLeaveCertificate: "",
    photo: "",
    incomeCertficate3yearOrForm16: "",
    castProof: "",
    selfDeclearation: "",
  });

  const translateName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", {
        text: Data.fullName_English,
      })
      .then((res) => {
        console.log(res.data.output);
        setnameMarathi(res.data.output);
        setNameLoading(false);
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
        setFnameLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const translateLName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", {
        text: land_info.land_holderName_english,
      })
      .then((res) => {
        console.log(res.data.output);
        setlnameMarathi(res.data.output);
      })
      .catch((err) => console.log(err));
  };

  const translatebenificiaryName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", {
        text: benificiary_info.Benificiary_Name_English,
      })
      .then((res) => {
        setbenificiarymarathi(res.data.output);
        setbenificiaryLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const translatebenificiaryFatherName = () => {
    axios
      .post("https://mhebackend.payagain.in/translate", {
        text: benificiaryFather_info.benificiaryFather_fullName_english,
      })
      .then((res) => {
        console.log(res.data.output);
        setbenificiaryfathermarathi(res.data.output);
        setbenificiaryfatherLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const [form] = Form.useForm();
  const [Data, SetData] = useState({
    statusfname: "",
    fullName_English: "",
    fullName_Marathi: nameMarathi,
    fatherName_english: "",
    fatherName_marathi: fnameMarathi,
    BirthDate: "",
    age: "",
    Gender: "",
    Bussness: "",
    phoneNUm: "",
    email: "",
    AdharNo: "",
    Applicant_address: "",
    Applicant_street: "",
    Applicant_Building: "",
    Applicant_locality: "",
    Applicant_landmark: "",
    Applicant_district: "",
    Applicant_taluka: "",
    Applicant_village: "",
    Applicant_pincode: "",
    Income_salary: "",
    Income_business: "",
    Income_agriculture: "",
    Income_investment: "",
    Income_others: "",
    total: "",
  });

  // console.log(214,Data)

  const totalfun = () => {
    let total = 0;
    console.log(142, Data.Income_salary);
    if (Data.Income_salary > 0) {
      total += Data.Income_salary;
    }
    if (Data.Income_business > 0) {
      total += Data.Income_business;
    }
    if (Data.Income_agriculture > 0) {
      total += Data.Income_agriculture;
    }
    if (Data.Income_investment > 0) {
      total += Data.Income_investment;
    }
    if (Data.Income_others > 0) {
      total += Data.Income_others;
    }
    // console.log('161',total)
    SetData({ ...Data, total });
  };

  // const [Formerror, setFormerror] = useState({});
  // const [isSubmit, SetIsSubmit] = useState(false);
  useEffect(() => {
    console.log(Formerror);
    if (Object.keys(Formerror).length == 0 && isSubmit) {
      console.log(Data);
    }
  }, [Formerror]);
  const validate = (values) => {
    const error = {};
    if (!values.fullName_English) {
      error.fullName_English = " fullName_English is required";
    }
    // if (!values.nameMarathi) {
    //   error.nameMarathi = " nameMarathi is required";
    // }

    if (!values.fatherName_english) {
      error.fatherName_english = "fatherName_english is required";
    }
    // if (!values.fnameMarathi) {
    //   error.fnameMarathi = " fnameMarathi is required";
    // }
    if (!values.age) {
      error.age = " age is required";
    }
    if (!values.Gender) {
      error.Gender = " Gender is required";
    }

    if (!values.Bussness) {
      error.Bussness = "  Bussness is required";
    }
    if (!values.relation) {
      error.relation = " relation is required";
    }
    if (!values.phoneNUm) {
      error.phoneNUm = "  phoneNUm is required";
    }
    if (!values.Applicant_address) {
      error.Applicant_address = "  Applicant_address is required";
    }
    if (!values.Applicant_landmark) {
      error.Applicant_landmark = "  Applicant_landmark  is required";
    }
    if (!values.Applicant_village) {
      error.Applicant_village = " Applicant_village is required";
    }
    if (!values.relation) {
      error.relation = "relation is required";
    }

    if (!values.Applicant_pincode) {
      error.Applicant_pincode = "Applicant_pincode is required";
    }
    // if (!values.Benificiary_Name_English) {
    //   error.Benificiary_Name_English = "Benificiary_Name_English is required";
    // }

    // if (!values.benificiarymarathi) {
    //   error.benificiarymarathi = "benificiarymarathi is required";
    // }
    // if (!values.Benificiary_age) {
    //   error.Benificiary_age = "Benificiary_age is required";
    // }
    // if (!values.Benificiary_gender) {
    //   error.Benificiary_gender = "Benificiary_gender is required";
    // }
    // if (!values.Benificiary_relation) {
    //   error.Benificiary_relation = "Benificiary_relation is required";
    // }
    // if (!values.Benificiary_mobNumber) {
    //   error.Benificiary_mobNumber = "Benificiary_mobNumber is required";
    // }
    // if (!values.permanant_Address) {
    //   error.permanant_Address = "permanant_Address is required";
    // }
    // if (!values.permanant_landmark) {
    //   error.permanant_landmark = "permanant_landmark is required";
    // }
    // if (!values.permanant_village) {
    //   error.permanant_village = "permanant_village is required";
    // }
    // if (!values.permanant_pincode) {
    //   error.permanant_pincode = "permanant_pincode is required";
    // }
    // if (!values.migration_state) {
    //   error.migration_state = "migration_state is required";
    // }
    if (!values.benificiary_cast) {
      error.benificiary_cast = "benificiary_cast is required";
    }
    // if (!values.benificiaryFather_mobileNO) {
    //   error.benificiaryFather_mobileNO = "benificiaryFather_mobileNO is required";
    // }
    // if (!values.benificiaryFather_age) {
    //   error.benificiaryFather_age = "benificiaryFather_age is required";
    // }
    // if (!values.benificiaryfathermarathi) {
    //   error.benificiaryfathermarathi = "benificiaryfathermarathi is required";
    // }
    // if (!values.benificiaryFather_fullName_english) {
    //   error.benificiaryFather_fullName_english = "benificiaryFather_fullName_english is required";
    // }
    // if (!values.benificiaryFather_Address) {
    //   error.benificiaryFather_Address = "benificiaryFather_Address is required";
    // }
    // if (!values.benificiaryFather_Landmark) {
    //   error.benificiaryFather_Landmark = "benificiaryFather_Landmark is required";
    // }
    // if (!values.benificiaryFather_PinCode) {
    //   error.benificiaryFather_PinCode = "benificiaryFather_PinCode is required";
    // }
    // if (!values.benificiaryFather_Village) {
    //   error.benificiaryFather_Village = "benificiaryFather_Village is required";
    // }
    // if (!values.benificiaryFather_Taluka) {
    //   error.benificiaryFather_Taluka = "benificiaryFather_Taluka is required";
    // }
    // if (!values.benificiaryFather_cast) {
    //   error.benificiaryFather_cast = "benificiaryFather_cast is required";
    // }
    // if (!values.lnameMarathi) {
    //   error.lnameMarathi = "lnameMarathi is required";
    // }
    // if (!values.land_holderName_english) {
    //   error.land_holderName_english = "land_holderName_english is required";
    // }
    // if (!values.land_holder_taluka) {
    //   error.land_holder_taluka = "land_holder_taluka is required";
    // }
    // if (!values.land_holder_village) {
    //   error.land_holder_village = "land_holder_village is required";
    // }
    // if (!values.land_holder_pincode) {
    //   error.land_holder_pincode = "land_holder_pincode is required";
    // }
    // if (!values.land_holder_groupNO) {
    //   error.land_holder_groupNO = "land_holder_groupNO is required";
    // }
    // if (!values.land_holder_area) {
    //   error.land_holder_area = "land_holder_area is required";
    // }
    console.log("error object", error);
    return error;
  };

  const [benificiary_info, setbenificiary_info] = useState({
    relationOfBanificiaryWithApplicant: "",
    benificiary_salution: "",
    Benificiary_Name_English: "",
    Benificiary_Name_marathi: benificiarymarathi,
    Benificiary_Dob: "",
    Benificiary_age: "",
    Benificiary_gender: "",
    Benificiary_relation: "",
    Benificiary_mobNumber: "",
    Benificiary_Email: "",
    Benificiary_AdharNo: "",
    benificiary_occupation: "",
    Benificiary_Address: "",
    Benificiary_street: "",
    Benificiary_building: "",
    Benificiary_locality: "",
    Benificiary_landmark: "",
    Benificiary_District: "",
    Benificiary_taluka: "",
    Benificiary_village: "",
    Benificiary_pincode: "",
    benificiary_cast: "",
  });

  const [permanant_address, setpermanant_address] = useState({
    permanant_Address: "",
    permanant_street: "",
    permanant_Bulding: "",
    permanant_locality: "",
    permanant_landmark: "",
    permanant_district: "",
    permanant_taluka: "",
    permanant_village: "",
    permanant_pincode: "",
  });

  const [benificiaryFather_info, setbenificiaryFather_info] = useState({
    benificiaryFather_salution: "",
    benificiaryFather_fullName_english: "",
    benificiaryFather_fullName_marathi: benificiaryfathermarathi,
    benificiaryFather_DOB: "",
    benificiaryFather_age: "",
    benificiaryFather_occupation: "",
    benificiaryFather_mobileNO: "",
    benificiaryFather_email: "",
    benificiaryFather_UID: "",
    benificiaryFather_Address: "",
    benificiaryFather_street: "",
    benificiaryFather_building: "",
    benificiaryFather_Locality: "",
    benificiaryFather_Landmark: "",
    benificiaryFather_District: "",
    benificiaryFather_Taluka: "",
    benificiaryFather_Village: "",
    benificiaryFather_PinCode: "",
    benificiaryFather_cast: "",
  });

  const [migration, setMigration] = useState({
    migration_state: "",
    migration_district: "",
    migration_taluka: "",
    migration_village: "",
    migration_fromDate: "",
    migration_endDate: "",
    migration_year: "",
  });

  const [land_info, setland_info] = useState({
    land_salutation: "",
    land_holderName_english: "",
    land_holderName_marathi: lnameMarathi,
    land_holder_relation: "",
    land_holder_district: "",
    land_holder_taluka: "",
    land_holder_village: "",
    land_holder_pincode: "",
    land_holder_groupNO: "",
    land_holder_area: "",
    land_Area_unit: "",
    is_land_outside_village: "",
  });
  const [migrationView, setMigrationView] = useState(false);

  const [parmanatDetails, SetPermanatDetails] = useState(false);

  const handleDateChange = (date, dateString) => {
    SetData({ ...Data, BirthDate: dateString });
  };
  const handleDateChange_benificiary = (date, dateString) => {
    SetData({ ...Data, Benificiary_Dob: dateString });
  };

  const handleDateChange_benificiaryFatherDOB = (date, dateString) => {
    setbenificiaryFather_info({
      ...benificiaryFather_info,
      benificiaryFather_DOB: dateString,
    });
  };
  const handleDateChange_migration_fromDate = (date, dateString) => {
    setMigration({
      ...migration,
      migration_fromDate: dateString,
    });
  };
  const handleDateChange_migration_endDate = (date, dateString) => {
    setMigration({
      ...migration,
      migration_endDate: dateString,
    });
  };

  const EWSFormSubmit = (e) => {
    if (agree) {
      if (balance > GetFormPrice) {
        const obj = {
          application_type: "EWS",
          status: "IN-PROGRESS",
          createdBy: ID,
          createdByName,
          Data,
          benificiary_info,
          benificiary_father_details: benificiaryFather_info,
          permanant_address,
          migration,
          land_info,
        };

        const mainDataPromise = new Promise((resolve, reject) => {
          // console.log(77, Data);
          axios
            .post(`https://mhebackend.payagain.in/api/Ews/create`, obj)
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
            uploadincomeCertficate3yearOrForm16(res.data.data._id);
            uploadcastProof(res.data.data._id);
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
  };



//   try {
//     e.preventDefault();
//     const errors = validate(Data);

//     if (Object.keys(errors).length === 0) {
//       SetIsSubmit(true);
//       const cleanedData = JSON.parse(JSON.stringify(Data));
//       const obj = {
//         Data:cleanedData,
//         application_type: "EWS",
//         status: "IN-PROGRESS",
//         createdBy: ID,
//         createdByName,
//         benificiary_info,
//         benificiary_father_details: benificiaryFather_info,
//         permanant_address,
//         migration,
//         land_info,
//       };

//       console.log(513, obj);

//       if (agree) {
//         if (balance > GetFormPrice) {
//           const res = await axios.post('https://mhebackend.payagain.in/api/Ews/create', obj);

//           console.log(124, res.data);

//           await uploadreshaCard(res.data.data._id);
//           await uploadadharCard(res.data.data._id);
//           await uploadlightBill(res.data.data._id);
//           await uploadschoolLeaveCertificate(res.data.data._id);
//           await uploadphoto(res.data.data._id);
//           await uploadincomeCertficate3yearOrForm16(res.data.data._id);
//           await uploadcastProof(res.data.data._id);
//           await uploadselfDeclearation(res.data.data._id);
//           debitFormBalance();
//           CreaditAgent();

//           return {
//             status: true,
//             message: "Data Posted Successfully",
//             data: res.data.data,
//           };
//         } else {
//           throw new Error("Insufficient balance. Please recharge.");
//         }
//       } else {
//         throw new Error("Please agree to the terms.");
//       }
//     } else {
//       setFormerror(errors);
//       throw new Error("Required form fields are not filled.");
//     }
//   } catch (err) {
//     console.error(err.message);
//     // Handle or display the error as needed
//     return {
//       status: false,
//       message: err.message,
//     };
//   }
// };

  const CreaditAgent = () => {
    const obj = {
      agentId: getAgent[0]._id,
      agentName: getAgent[0].name,
      creaditAmount: getAgent[0].agent_formPrice.agent_EWS,
      isWithdrowl: false,
      isrequest: false,
      creaditFor: "EWS",
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

    expenceFor: "EWS",
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
    formData.append("reshaCard", docs.reshaCard);
    axios
      .put(`https://mhebackend.payagain.in/api/EWS_reshaCard/${id}`, formData)
      .then((res) => console.log("reshaCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadadharCard = (id) => {
    const formData = new FormData();
    formData.append("adharCard", docs.adharCard);
    axios
      .put(`https://mhebackend.payagain.in/api/EWS_adharCard/${id}`, formData)
      .then((res) => console.log("adharCard", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadlightBill = (id) => {
    const formData = new FormData();
    formData.append("lightBill", docs.lightBill);
    axios
      .put(`https://mhebackend.payagain.in/api/EWS_lightBill/${id}`, formData)
      .then((res) => console.log("lightBill", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadschoolLeaveCertificate = (id) => {
    const formData = new FormData();
    formData.append("schoolLeaveCertificate", docs.schoolLeaveCertificate);
    axios
      .put(
        `https://mhebackend.payagain.in/api/EWS_schoolLeaveCertificate/${id}`,
        formData
      )
      .then((res) => console.log("photo", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadphoto = (id) => {
    const formData = new FormData();
    formData.append("photo", docs.photo);
    axios
      .put(`https://mhebackend.payagain.in/api/EWS_photo/${id}`, formData)
      .then((res) => console.log("form16", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadincomeCertficate3yearOrForm16 = (id) => {
    const formData = new FormData();
    formData.append(
      "incomeCertficate3yearOrForm16",
      docs.incomeCertficate3yearOrForm16
    );
    axios
      .put(
        `https://mhebackend.payagain.in/api/EWS_incomeCertficate3yearOrForm16/${id}`,
        formData
      )
      .then((res) => console.log("incomeCertficate3yearOrForm16", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadcastProof = (id) => {
    const formData = new FormData();
    formData.append("castProof", docs.castProof);
    axios
      .put(`https://mhebackend.payagain.in/api/EWS_castProof/${id}`, formData)
      .then((res) => console.log("incomeCertficate3yearOrForm16", res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadselfDeclearation = (id) => {
    const formData = new FormData();
    formData.append("selfDeclearation", docs.selfDeclearation);
    axios
      .put(
        `https://mhebackend.payagain.in/api/EWS_selfDeclearation/${id}`,
        formData
      )
      .then((res) => console.log("selfDeclearation", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const clickHandler = () => {
    setNameLoading(true);
    translateName();
  };
  const clickHandler2 = () => {
    setFnameLoading(true);
    translateFName();
  };
  const clickHandler3 = () => {
    setbenificiaryLoading(true);
    translatebenificiaryName();
  };

  const clickHandler4 = () => {
    setbenificiaryfatherLoading(true);
    translatebenificiaryFatherName();
  };

  const clickHandler5 = () => {
    translateLName();
  };

  useEffect(() => {
    if (id != undefined) {
      axios.get(`https://mhebackend.payagain.in/api/Ews/${id}`).then((res) => {
        const data = res.data[0];
        // console.log('datas',data.benificiary_father_details.benificiaryFather_fullName_english)
        SetData(data.Data);
        setbenificiary_info(data.benificiary_info);
        setbenificiaryFather_info(data.benificiary_father_details);
        setpermanant_address(data.permanant_address);
        setMigration(data.migration);
        setland_info(data.land_info);
      });
    }
  }, [id]);


  const AdharCard = (id) => {
    const formData = new FormData();
    formData.append("addressProof", Data.addressProof);
    // console.log(135,formData);
    axios
      .put(`http://localhost:3000/api/adharUpload/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const SchoolLeavingcer = (id) => {
    // console.log(143,id)
    const formData = new FormData();
    formData.append("SchoolLeavingcer", Data.SchoolLeavingcer);
    axios
      .put(`http://localhost:3000/api/SchoolLeavingcer/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const LightBill = (id) => {
    const formData = new FormData();
    formData.append("LightBill", Data.LightBill);
    axios
      .put(`http://localhost:3000/api/LightBill/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const retioncard = (id) => {
    const formData = new FormData();
    formData.append("retioncard", Data.retioncard);
    axios
      .put(`http://localhost:3000/api/retioncard/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const photos = (id) => {
    // console.log(143,id)
    const formData = new FormData();
    formData.append("photos", Data.photos);
    axios
      .put(`http://localhost:3000/api/photos/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const IncomeCerctl = (id) => {
    console.log(143, id);
    const formData = new FormData();
    formData.append("IncomeCerctl", Data.IncomeCerctl);
    axios
      .put(`http://localhost:3000/api/IncomeCerctl/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const CastIdentify = (id) => {
    console.log(143, id);
    const formData = new FormData();
    formData.append("CastIdentify", Data.CastIdentify);
    axios
      .put(`http://localhost:3000/api/CastIdentify/${id}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (e) => {
    const obj = {
      application_type: "EWS",
      status: "IN-PROGRESS",
      createdBy: ID,
      createdByName,
      Data,
      benificiary_info,
      benificiary_father_details: benificiaryFather_info,
      permanant_address,
      migration,
      land_info,
    };

    if (agree) {
      const mainDataPromise = new Promise((resolve, reject) => {
        // console.log(77, Data);
        axios
          .put(`https://mhebackend.payagain.in/api/Ews/${id}`, obj)
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
          uploadincomeCertficate3yearOrForm16(res.data.data._id);
          uploadcastProof(res.data.data._id);
          uploadselfDeclearation(res.data.data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
    <Breadcrumb
      title={"Economically Weaker Section Certificate :"}
      parent={"Certificate"}
    />
 <h3>
        Form Price :{GetFormPrice?GetFormPrice:"0"}
      </h3>
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
                        // value={Data.statusfname}
                        // onChange={(e) => {
                        //   SetData({ ...Data, statusfname:e });
                        // }}

                        value={Data.statusfname}
                        onChange={(e) => {
                          SetData({ ...Data, statusfname: e });
                        }}
                      >
                        <Select.Option value="Kumar">Kumar</Select.Option>
                        <Select.Option value="Advocate">
                          Advocate
                        </Select.Option>
                        <Select.Option value="Shri">Mr.</Select.Option>
                        <Select.Option value="Kumari">Kumari</Select.Option>
                        <Select.Option value="Ms">Ms</Select.Option>
                        <Select.Option value="Shrimati">
                          Shrimati
                        </Select.Option>
                        <Select.Option value="Mrs">Mrs</Select.Option>
                      </Select>
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
                          setNameLoading(true);
                        }}
                        onBlur={clickHandler}
                      />
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
                        onChange={(e) => {
                          setnameMarathi(e.target.value);
                        }}
                      />
                      {nameLoading && <div class="loader"></div>}
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
                        value={Data.rto}
                        onChange={(e) => {
                          SetData({ ...Data, rto: e });
                        }}
                      >
                        <Select.Option value="Mr">Mr.</Select.Option>
                        <Select.Option value="Shri">Shri</Select.Option>
                      </Select>
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
                          setFnameLoading(true);
                        }}
                        onBlur={clickHandler2}
                      />
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
                      {fNameLoading && <div class="loader"></div>}
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
                      </Select>
                      <Select.Option value="Other">Other</Select.Option>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> Occupation
                    </label>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your middle Name!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="--Select--"
                        value={Data.Bussness}
                        onChange={(e) => {
                          SetData({ ...Data, Bussness: e });
                        }}
                      >
                        <Select.Option value="Ahmednagar">
                          Doctor
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>Relation
                    </label>

                    <Form.Item>
                      <Select
                        placeholder="Vehicle Type"
                        value={Data.relation}
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
                          message: "Please input your Last Name!",
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
                          message: "Please input your Last Name!",
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
                        value={Data.AdharNo}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            AdharNo: e.target.value,
                          });
                        }}
                        nn
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
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input
                        value={Data.Applicant_address}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            Applicant_address: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input
                        value={Data.Applicant_street}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            Applicant_street: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your middle Name!",
                        },
                      ]}
                    >
                      <Input
                        value={Data.Applicant_Building}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            Applicant_Building: e.target.value,
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
                        value={Data.Applicant_locality}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            Applicant_locality: e.target.value,
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
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input
                        value={Data.Applicant_landmark}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            Applicant_landmark: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your middle Name!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="--Select District--"
                        value={Data.Applicant_district}
                        onChange={(e) => {
                          SetData({ ...Data, Applicant_district: e });
                        }}
                      >
                        <Select.Option value="Ahmednagar">
                          Ahmednagar
                        </Select.Option>
                        <Select.Option value="Akola">Akola</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> Taluka
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        value={Data.Applicant_taluka}
                        onChange={(e) => {
                          SetData({ ...Data, Applicant_taluka: e });
                        }}
                      >
                        <Select.Option value="barshi"></Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> Village
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        value={Data.Applicant_village}
                        onChange={(e) => {
                          SetData({ ...Data, Applicant_village: e });
                        }}
                      >
                        <Select.Option value="mahagaon"></Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>Relation
                    </label>

                    <Form.Item>
                      <Select
                        placeholder="Vehicle Type"
                        value={Data.relation}
                        onChange={(e) => {
                          SetData({ ...Data, relation: e });
                        }}
                      >
                        <Select.Option value="Father"></Select.Option>
                        <Select.Option value="Mother"></Select.Option>
                        <Select.Option value="Husband"></Select.Option>
                        <Select.Option value="Gaurdian"></Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Pincode <span className="red">*</span>
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
                        value={Data.Applicant_pincode}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            Applicant_pincode: e.target.value,
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
                  <span id="CPH_Panelappdetails">Beneficiary Details:</span>
                </h3>
              </div>
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div className="row">
                  {" "}
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Relation of Applicant with Beneficiary
                      <span className="red"></span>
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="--select--"
                        value={
                          benificiary_info.relationOfBanificiaryWithApplicant
                        }
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            relationOfBanificiaryWithApplicant: e,
                          });
                        }}
                      >
                        {relationOfBanificiary_Applicant.map((item, i) => (
                          <Select.Option value={item} key={i}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Beneficiary Salutation<span className="red"></span>
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="--select--"
                        value={benificiary_info.benificiary_salution}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            benificiary_salution: e,
                          });
                        }}
                      >
                        <Select.Option value="Kumar">Kumar</Select.Option>
                        <Select.Option value="Advocate">
                          Advocate
                        </Select.Option>
                        <Select.Option value="Shri">Mr.</Select.Option>
                        <Select.Option value="Kumari">Kumari</Select.Option>
                        <Select.Option value="Ms">Ms</Select.Option>
                        <Select.Option value="Shrimati">
                          Shrimati
                        </Select.Option>
                        <Select.Option value="Mrs">Mrs</Select.Option>
                      </Select>
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
                        value={benificiary_info.Benificiary_Name_English}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            Benificiary_Name_English: e.target.value,
                          });
                          setbenificiaryLoading(true);
                        }}
                        onBlur={clickHandler3}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Beneficiary Name (Marathi){" "}
                      <span className="red">*</span>
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
                        value={benificiarymarathi}
                        onChange={(e) => {
                          setbenificiarymarathi(e.target.value);
                        }}
                      />
                      {benificiaryLoading && <div class="loader"></div>}
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>Date Of Birth
                    </label>

                    <Form.Item>
                      <DatePicker
                        // name="Benificiary_Dob"
                        // value={Data.Benificiary_Dob}
                        onChange={handleDateChange_benificiary}
                        format="YYYY-MM-DD"
                      />
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
                        value={benificiary_info.Benificiary_age}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            Benificiary_age: e.target.value,
                          });
                        }}
                      />
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
                        value={benificiary_info.Benificiary_gender}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            Benificiary_gender: e,
                          });
                        }}
                      >
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>Relation
                    </label>

                    <Form.Item>
                      <Select
                        value={benificiary_info.Benificiary_relation}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            Benificiary_relation: e,
                          });
                        }}

                        //   value={Relation}
                      >
                        <Select.Option value="Father"></Select.Option>
                        <Select.Option value="Mother"></Select.Option>
                        <Select.Option value="Husband"></Select.Option>
                        <Select.Option value="Gaurdian"></Select.Option>
                      </Select>
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
                          message: "Please input your Last Name!",
                        },
                      ]}
                    >
                      <Input
                        value={benificiary_info.Benificiary_mobNumber}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            Benificiary_mobNumber: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your Last Name!",
                        },
                      ]}
                    >
                      <Input
                        value={benificiary_info.Benificiary_Email}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            Benificiary_Email: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
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
                        value={benificiary_info.Benificiary_AdharNo}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            Benificiary_AdharNo: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Occupation<span className="red"></span>
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="--select--"
                        value={benificiary_info.benificiary_occupation}
                        onChange={(e) => {
                          setbenificiary_info({
                            ...benificiary_info,
                            benificiary_occupation: e,
                          });
                        }}
                      >
                        {fatherOccupation.map((item, i) => (
                          <Select.Option value={item} key={i}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
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
                  <span id="CPH_Panelappdetails">Permanent Address:</span>
                </h3>
              </div>
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>Permanent Address Same as
                      Present Address?
                    </label>
                    <Form.Item>
                      <Radio.Group>
                        <Radio
                          value="yes"
                          onClick={() => SetPermanatDetails(false)}
                        >
                          Yes
                        </Radio>
                        <Radio
                          value="No"
                          onClick={() => SetPermanatDetails(true)}
                        >
                          No
                        </Radio>
                      </Radio.Group>
                    </Form.Item>{" "}
                  </div>
                  {parmanatDetails && (
                    <>
                      <Container fluid={true}>
                        <Row>
                          <Col sm="">
                            <Card>
                              <CardBody>
                                <div class="box-header box-header-bg">
                                  <h3 class="box-title">
                                    <span id="CPH_Panelappdetails">
                                      Residence Details :
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
                                        Address<span className="red">*</span>
                                      </label>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please input your First Name!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          value={
                                            permanant_address.permanant_Address
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_Address:
                                                e.target.value,
                                            });
                                          }}
                                        />
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
                                              "Please input your First Name!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          value={
                                            permanant_address.permanant_street
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_street:
                                                e.target.value,
                                            });
                                          }}
                                        />
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
                                              "Please input your middle Name!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          value={
                                            permanant_address.permanant_Bulding
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_Bulding:
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
                                          value={
                                            permanant_address.permanant_locality
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_locality:
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
                                              "Please input your First Name!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          value={
                                            permanant_address.permanant_landmark
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_landmark:
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
                                              "Please input your middle Name!",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="--Select District--"
                                          value={
                                            permanant_address.permanant_district
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_district: e,
                                            });
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
                                            Mumbai Suburban
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
                                        <Input
                                          value={
                                            permanant_address.permanant_taluka
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_taluka:
                                                e.target.value,
                                            });
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="" className="mb-3">
                                        {" "}
                                        Village<span className="red">*</span>
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
                                        <Input
                                          value={
                                            permanant_address.permanant_village
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_village:
                                                e.target.value,
                                            });
                                          }}
                                        />
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
                                              "Please input your Last Name!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          value={
                                            permanant_address.permanant_pincode
                                          }
                                          onChange={(e) => {
                                            setpermanant_address({
                                              ...permanant_address,
                                              permanant_pincode:
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
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>Has beneficiary migrated
                      from a different state? (Yes/No) *
                    </label>
                    <form>
                      <Form.Item>
                        <Radio.Group>
                          <Radio
                            value="yes"
                            onClick={() => setMigrationView(true)}
                          >
                            Yes
                          </Radio>
                          <Radio
                            value="No"
                            onClick={() => setMigrationView(false)}
                          >
                            No
                          </Radio>
                        </Radio.Group>
                      </Form.Item>{" "}
                    </form>
                  </div>
                  {migrationView && (
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
                                        State<span className="red">*</span>
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
                                        <Input
                                          value={migration.migration_state}
                                          onChange={(e) => {
                                            setMigration({
                                              ...migration,
                                              migration_state: e.target.value,
                                            });
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="" className="mb-3">
                                        {" "}
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
                                        <Input
                                          value={migration.migration_district}
                                          onChange={(e) => {
                                            setMigration({
                                              ...migration,
                                              migration_district:
                                                e.target.value,
                                            });
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="" className="mb-3">
                                        {" "}
                                        Taluka
                                      </label>

                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please input your Taluka",
                                          },
                                        ]}
                                      >
                                        <Input
                                          value={migration.migration_taluka}
                                          onChange={(e) => {
                                            setMigration({
                                              ...migration,
                                              migration_taluka:
                                                e.target.value,
                                            });
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="" className="mb-3">
                                        {" "}
                                        Village{" "}
                                      </label>

                                      <Form.Item>
                                        <Input
                                          value={migration.migration_village}
                                          onChange={(e) => {
                                            setMigration({
                                              ...migration,
                                              migration_village:
                                                e.target.value,
                                            });
                                          }}
                                        />
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
                                          onChange={
                                            handleDateChange_migration_fromDate
                                          }
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
                                          onChange={
                                            handleDateChange_migration_endDate
                                          }
                                          format="YYYY-MM-DD"
                                        />
                                      </Form.Item>{" "}
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="" className="mb-3">
                                        {" "}
                                        year{" "}
                                      </label>

                                      <Form.Item>
                                        <Input
                                          value={migration.migration_year}
                                          onChange={(e) => {
                                            setMigration({
                                              ...migration,
                                              migration_year: e.target.value,
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
                    Beneficiary Caste/Category Details :
                  </span>
                </h3>
              </div>
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Caste <span className="red">*</span>
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
                        value={Data.benificiary_cast}
                        onChange={(e) => {
                          SetData({
                            ...Data,
                            benificiary_cast: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>

                    <span className="red">
                      अर्ज भरताना दिलेल्या रकान्यामध्ये जातीचे शब्दलेखन अचूक
                      करावे, एकदा अर्ज स्वीकारल्यानंतर त्यात कोणताही बदल करता
                      येणार नाही.
                    </span>
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
                  <span id="CPH_Panelappdetails">
                    Beneficiary Father Details :
                  </span>
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
                        value={
                          benificiaryFather_info.benificiaryFather_salution
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_salution: e,
                          });
                        }}
                      >
                        <Select.Option value="Kumar">Kumar</Select.Option>
                        <Select.Option value="Advocate">
                          Advocate
                        </Select.Option>
                        <Select.Option value="Shri">Mr.</Select.Option>
                        <Select.Option value="Kumari">Kumari</Select.Option>
                        <Select.Option value="Ms">Ms</Select.Option>
                        <Select.Option value="Shrimati">
                          Shrimati
                        </Select.Option>
                        <Select.Option value="Mrs">Mrs</Select.Option>
                      </Select>
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
                        value={
                          benificiaryFather_info.benificiaryFather_fullName_english
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_fullName_english:
                              e.target.value,
                          });
                          setbenificiaryfatherLoading(true);
                        }}
                        onBlur={clickHandler4}
                      />
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
                        value={benificiaryfathermarathi}
                        onChange={(e) => {
                          // SetData({
                          //   ...Data,
                          //   fatherName_marathi: e.target.value,
                          // });
                          setbenificiaryfathermarathi(e.target.value);
                        }}
                      />
                      {benificiaryfatherLoading && <div class="loader"></div>}
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span>Date Of Birth
                    </label>

                    <Form.Item>
                      <DatePicker
                        onChange={handleDateChange_benificiaryFatherDOB}
                        format="YYYY-MM-DD"
                      />
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
                        value={benificiaryFather_info.benificiaryFather_age}
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_age: e.target.value,
                          });
                        }}
                      />
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
                      Mobile No <span className="red">*</span>
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
                        value={
                          benificiaryFather_info.benificiaryFather_mobileNO
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_mobileNO: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your Last Name!",
                        },
                      ]}
                    >
                      <Input
                        value={benificiaryFather_info.benificiaryFather_email}
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_email: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
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
                        value={benificiaryFather_info.benificiaryFather_UID}
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_UID: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Occupation<span className="red"></span>
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="--select--"
                        value={
                          benificiaryFather_info.benificiaryFather_occupation
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_occupation: e,
                          });
                        }}
                      >
                        {fatherOccupation.map((item, i) => (
                          <Select.Option value={item} key={i}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
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
                  <span id="CPH_Panelappdetails">
                    Beneficiary Father Address Details :
                  </span>
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
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input
                        value={
                          benificiaryFather_info.benificiaryFather_Address
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_Address: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input
                        value={
                          benificiaryFather_info.benificiaryFather_street
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_street: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your middle Name!",
                        },
                      ]}
                    >
                      <Input
                        value={
                          benificiaryFather_info.benificiaryFather_building
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_building: e.target.value,
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
                        value={
                          benificiaryFather_info.benificiaryFather_Locality
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_Locality: e.target.value,
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
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input
                        value={
                          benificiaryFather_info.benificiaryFather_Landmark
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_Landmark: e.target.value,
                          });
                        }}
                      />
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
                          message: "Please input your middle Name!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="--Select District--"
                        value={
                          benificiaryFather_info.benificiaryFather_District
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_District: e,
                          });
                        }}
                      >
                        <Select.Option value="Ahmednagar">
                          Ahmednagar
                        </Select.Option>
                        <Select.Option value="Akola">Akola</Select.Option>
                        <Select.Option value="Amravati">
                          Amravati{" "}
                        </Select.Option>
                        <Select.Option value="Aurangabad">
                          Aurangabad
                        </Select.Option>
                        <Select.Option value="Bhandara">
                          Bhandara
                        </Select.Option>
                        <Select.Option value="Bid">Bid</Select.Option>
                        <Select.Option value="Buldhana">
                          Buldhana
                        </Select.Option>
                        <Select.Option value="Chandrapur">
                          Chandrapur
                        </Select.Option>
                        <Select.Option value="Dhule">Dhule</Select.Option>
                        <Select.Option value="Gadchiroli">
                          Gadchiroli
                        </Select.Option>
                        <Select.Option value="Gondhiya">
                          Gondhiya
                        </Select.Option>
                        <Select.Option value="Hingoli">Hingoli</Select.Option>
                        <Select.Option value="Jalgaon">Jalgaon</Select.Option>
                        <Select.Option value="Jalna">Jalna</Select.Option>

                        <Select.Option value="Parbhani">
                          Parbhani
                        </Select.Option>
                        <Select.Option value="Pune">Pune</Select.Option>
                        <Select.Option value="Raigarh">Raigarh</Select.Option>
                        <Select.Option value="Ratnagiri">
                          Ratnagiri
                        </Select.Option>
                        <Select.Option value="Sangli">Sangli</Select.Option>
                        <Select.Option value="Satara">Satara</Select.Option>
                        <Select.Option value="Sindhudurg">
                          Sindhudurg
                        </Select.Option>
                        <Select.Option value="Solapur">Solapur</Select.Option>
                        <Select.Option value="Thane">Thane</Select.Option>
                        <Select.Option value="Wardha">Wardha</Select.Option>
                        <Select.Option value="Washim">Washim</Select.Option>
                        <Select.Option value="Yavatmal">
                          Yavatmal
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> Taluka
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        value={
                          benificiaryFather_info.benificiaryFather_Taluka
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_Taluka: e,
                          });
                        }}
                      >
                        <Select.Option value="barshi">barshi</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> village
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        value={
                          benificiaryFather_info.benificiaryFather_Village
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_Village: e,
                          });
                        }}
                      >
                        <Select.Option value="uplai"></Select.Option>
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
                          message: "Please input your Last Name!",
                        },
                      ]}
                    >
                      <Input
                        value={
                          benificiaryFather_info.benificiaryFather_PinCode
                        }
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_PinCode: e.target.value,
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
    <Container fluid={true}>
      <Row>
        <Col sm="">
          <Card>
            <CardBody>
              <div class="box-header box-header-bg">
                <h3 class="box-title">
                  <span id="CPH_Panelappdetails">
                    Beneficiary Caste/Category Details :
                  </span>
                </h3>
              </div>
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Caste <span className="red">*</span>
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
                        value={benificiaryFather_info.benificiaryFather_cast}
                        onChange={(e) => {
                          setbenificiaryFather_info({
                            ...benificiaryFather_info,
                            benificiaryFather_cast: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>

                    <span className="red">
                      अर्ज भरताना दिलेल्या रकान्यामध्ये जातीचे शब्दलेखन अचूक
                      करावे, एकदा अर्ज स्वीकारल्यानंतर त्यात कोणताही बदल करता
                      येणार नाही.
                    </span>
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
                  <span id="CPH_Panelappdetails">Land Details :</span>
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
                        value={land_info.land_salutation}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_salutation: e,
                          });
                        }}
                      >
                        <Select.Option value="Kumar">Kumar</Select.Option>
                        <Select.Option value="Advocate">
                          Advocate
                        </Select.Option>
                        <Select.Option value="Shri">Mr.</Select.Option>
                        <Select.Option value="Kumari">Kumari</Select.Option>
                        <Select.Option value="Ms">Ms</Select.Option>
                        <Select.Option value="Shrimati">
                          Shrimati
                        </Select.Option>
                        <Select.Option value="Mrs">Mrs</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Land Holder Name (English){" "}
                      <span className="red">*</span>
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
                        value={land_info.land_holderName_english}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holderName_english: e.target.value,
                          });
                        }}
                        onBlur={clickHandler5}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Land Holder Name (Marathi){" "}
                      <span className="red">*</span>
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
                        value={lnameMarathi}
                        onChange={(e) => {
                          setlnameMarathi(e.target.value);
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
                      <span className="red"></span> Relation
                    </label>

                    <Form.Item>
                      <select
                        placeholder="--select--"
                        value={land_info.land_holder_relation}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holder_relation: e.target.value,
                          });
                        }}
                      >
                        {relationOfBanificiary_Applicant.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      District <span className="red">*</span>
                    </label>

                    <Form.Item>
                      <Select
                        placeholder="--Select District--"
                        value={land_info.land_holder_district}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holder_district: e,
                          });
                        }}
                      >
                        <Select.Option value="Ahmednagar">
                          Ahmednagar
                        </Select.Option>
                        <Select.Option value="Akola">Akola</Select.Option>
                        <Select.Option value="Amravati">
                          Amravati{" "}
                        </Select.Option>
                        <Select.Option value="Aurangabad">
                          Aurangabad
                        </Select.Option>

                        <Select.Option value="Hingoli">Hingoli</Select.Option>
                        <Select.Option value="Jalgaon">Jalgaon</Select.Option>
                        <Select.Option value="Jalna">Jalna</Select.Option>
                        <Select.Option value="Kolhapur">
                          Kolhapur
                        </Select.Option>
                        <Select.Option value="Latur">Latur</Select.Option>
                        <Select.Option value="Mumbai">Mumbai</Select.Option>
                        <Select.Option value="Mumbai Suburban">
                          Mumbai Suburban
                        </Select.Option>
                        <Select.Option value="Nagpur">Nagpur</Select.Option>
                        <Select.Option value="Nanded">Nanded</Select.Option>
                        <Select.Option value="Nandurbar">
                          Nandurbar
                        </Select.Option>
                        <Select.Option value="Nashik">Nashik</Select.Option>
                        <Select.Option value="Osmanabad">
                          Osmanabad
                        </Select.Option>
                        <Select.Option value="Parbhani">
                          Parbhani
                        </Select.Option>
                        <Select.Option value="Pune">Pune</Select.Option>
                        <Select.Option value="Raigarh">Raigarh</Select.Option>
                        <Select.Option value="Ratnagiri">
                          Ratnagiri
                        </Select.Option>
                        <Select.Option value="Sangli">Sangli</Select.Option>
                        <Select.Option value="Satara">Satara</Select.Option>
                        <Select.Option value="Sindhudurg">
                          Sindhudurg
                        </Select.Option>
                        <Select.Option value="Solapur">Solapur</Select.Option>
                        <Select.Option value="Thane">Thane</Select.Option>
                        <Select.Option value="Wardha">Wardha</Select.Option>
                        <Select.Option value="Washim">Washim</Select.Option>
                        <Select.Option value="Yavatmal">
                          Yavatmal
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> Taluka
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        value={land_info.land_holder_taluka}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holder_taluka: e,
                          });
                        }}
                      >
                        <Select.Option value="barshi"></Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> village
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="Select State"
                        value={land_info.land_holder_village}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holder_village: e,
                          });
                        }}
                      >
                        <Select.Option value="barshi"></Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Pin Code<span className="red">*</span>
                    </label>

                    <Form.Item>
                      <Input
                        value={land_info.land_holder_pincode}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holder_pincode: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Group No.<span className="red">*</span>
                    </label>

                    <Form.Item>
                      <Input
                        value={land_info.land_holder_groupNO}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holder_groupNO: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Area<span className="red">*</span>
                    </label>

                    <Form.Item>
                      <Input
                        value={land_info.land_holder_area}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_holder_area: e.target.value,
                          });
                        }}
                      />
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
                    </label>
                    <Form.Item>
                      <Select
                        placeholder="--select--"
                        value={land_info.land_Area_unit}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            land_Area_unit: e,
                          });
                        }}
                      >
                        <Select.Option value="Acres">Acres</Select.Option>
                        <Select.Option value="Yards">Yards</Select.Option>
                        <Select.Option value="Other">
                          Square Mtrs
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      Is your land owned outside the village?(Y/N)
                      <span className="red">*</span>
                    </label>
                    <Form.Item>
                      <Radio.Group
                        value={land_info.is_land_outside_village}
                        onChange={(e) => {
                          setland_info({
                            ...land_info,
                            is_land_outside_village: e.target.value,
                          });
                        }}
                      >
                        <Radio value="yes">हो </Radio>
                        <Radio value="No">नाही</Radio>
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
    <Container fluid={true}>
      <Row>
        <Col sm="">
          <Card>
            <CardBody>
              {/* <div class="box-header box-header-bg">
                                              <h3 class="box-title">
                                                  <span id="CPH_Panelappdetails">Applicant Address :</span></h3>
                                          </div> */}
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-bg" role="form">
                      <div class="box-header box-header-bg">
                        <h3 class="box-title">
                          <span id="CPH_Label36">
                            Family income details through various sources:
                          </span>
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
                              <tbody>
                                <tr>
                                  <th>
                                    <span id="CPH_lblseno">Sr.No </span>
                                  </th>
                                  <th>
                                    <span id="CPH_lblincmesources">
                                      Income Source :
                                    </span>
                                  </th>
                                </tr>
                                <tr>
                                  <td>1.</td>
                                  <td>
                                    <span id="CPH_Agriculture">
                                      Income from Salary / Wages
                                    </span>
                                  </td>
                                  <td id="CPH_td11">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        class="lbl_value rupees form-control form-control"
                                        name="Income_salary"
                                        value={Data.Income_salary}
                                        onChange={(e) => {
                                          SetData({
                                            ...Data,
                                            Income_salary: parseInt(
                                              e.target.value
                                            ),
                                          });
                                        }}
                                        onBlur={() => {
                                          totalfun();
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>2.</td>
                                  <td>
                                    <span id="CPH_Business">
                                      Income from Business Enterprises
                                    </span>
                                  </td>
                                  <td id="CPH_td12">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        class="lbl_value rupees form-control form-control"
                                        value={Data.Income_business}
                                        onChange={(e) => {
                                          SetData({
                                            ...Data,
                                            Income_business: parseInt(
                                              e.target.value
                                            ),
                                          });
                                        }}
                                        onBlur={() => {
                                          totalfun();
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span id="CPH_lbl3">3.</span>
                                  </td>
                                  <td>
                                    <span id="CPH_Others">
                                      Income from Agriculture
                                    </span>
                                  </td>
                                  <td id="CPH_td13">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        class="lbl_value rupees form-control form-control"
                                        value={Data.Income_agriculture}
                                        onChange={(e) => {
                                          SetData({
                                            ...Data,
                                            Income_agriculture: parseInt(
                                              e.target.value
                                            ),
                                          });
                                        }}
                                        onBlur={() => {
                                          totalfun();
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span id="CPH_lbl3">4.</span>
                                  </td>
                                  <td>
                                    <span id="CPH_Others">
                                      Income from Investment
                                    </span>
                                  </td>
                                  <td id="CPH_td13">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        //   name="ctl00$CPH$txtother1"
                                        //   type="text"
                                        //   maxlength="9"
                                        //   id="CPH_txtother1"
                                        //   tabindex="74"
                                        class="lbl_value rupees form-control form-control"
                                        //   onchange="OneYearIncome();"
                                        //   onkeypress="return isNumberKey(event)"
                                        value={Data.Income_investment}
                                        onChange={(e) => {
                                          SetData({
                                            ...Data,
                                            Income_investment: parseInt(
                                              e.target.value
                                            ),
                                          });
                                        }}
                                        onBlur={() => {
                                          totalfun();
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span id="CPH_lbl3">5.</span>
                                  </td>
                                  <td>
                                    <span id="CPH_Others">
                                      Income from Others
                                    </span>
                                  </td>
                                  <td id="CPH_td13">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        class="lbl_value rupees form-control form-control"
                                        value={Data.Income_others}
                                        onChange={(e) => {
                                          SetData({
                                            ...Data,
                                            Income_others: parseInt(
                                              e.target.value
                                            ),
                                          });
                                        }}
                                        onBlur={() => {
                                          totalfun();
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span id="CPH_lblseno">Total Income</span>
                                  </th>
                                  <td id="CPH_td13">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        class="lbl_value rupees form-control form-control"
                                        value={Data?.total}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span id="CPH_lblseno">
                                      Total Income (In Words)
                                    </span>
                                  </th>
                                  <td id="CPH_td13">
                                    <div class="icon-addon">
                                      <span>
                                        <i class="fa fa-inr"></i>
                                      </span>
                                      <input
                                        name="ctl00$CPH$txtother1"
                                        type="text"
                                        maxlength="9"
                                        id="CPH_txtother1"
                                        tabindex="74"
                                        class="lbl_value rupees form-control form-control"
                                        onchange="OneYearIncome();"
                                        onkeypress="return isNumberKey(event)"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                  {/* <span id="CPH_Label86" style="color:Red;">*</span> */}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div class="clearfix"></div>
                    </div>
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
              {/* reshaCard: "",
  adharCard: "",
  lightBill: "",
  schoolLeaveCertificate: "",
  photo: "",
  incomeCertficate3yearOrForm16: "",
  castProof: "",
  selfDeclearation: "", */}

              <div className="col-md-12">
                <label htmlFor="" className="mb-3">
                  {" "}
                  <span className="red">*</span>Address proof (Size - Maximum
                  1 MB) [Only (jpg,jpeg,pdf)]
                </label>

                <input type="file" name="" id=""  onChange={(e) => {
                          setDocs({
                            ...docs,
                            adharCard: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}/>
              </div>

              <div className="col-md-12">
                <label htmlFor="" className="mb-3">
                  {" "}
                  <span className="red">*</span>शाळा सोर्ल्याचा दाखला(Maximum
                  500Kb)PDF
                </label>

                <input type="file" name="" id=""  onChange={(e) => {
                          setDocs({
                            ...docs,
                            schoolLeaveCertificate: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}/>
              </div>

              <div className="col-md-12">
                <label htmlFor="" className="mb-3">
                  {" "}
                  लाईट बिल (Maximum 500Kb)PDF
                </label>

                <input type="file" name="" id=""  onChange={(e) => {
                          setDocs({
                            ...docs,
                            lightBill: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}/>
              </div>

              <div className="col-md-12">
                <label htmlFor="" className="mb-3">
                  {" "}
                  रेशनकार्ड(Maximum 500Kb)PDF
                </label>
                <input type="file" name="" id=""  onChange={(e) => {
                          setDocs({
                            ...docs,
                            reshaCard: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="" className="mb-3">
                  {" "}
                  १९६७ पवी र्ात परावा (Maximum 500Kb)PDF
                </label>
                <input type="file" name="" id=""  onChange={(e) => {
                          setDocs({
                            ...docs,
                            castProof: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="" className="mb-3">
                  {" "}
                  <span className="red">*</span>फोटो (अर्डदार , लाभार्थी )
                  (5Kb to 20Kb)JPG/JEPG
                </label>

                <input type="file" name="" id=""  onChange={(e) => {
                          setDocs({
                            ...docs,
                            photo: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="" className="mb-3">
                  {" "}
                  <span className="red">*</span>३ वषउत्पन्न दाखला/ फॉम १६
                  (Maximum 500Kb)PDF
                </label>

                <input type="file" name="" id=""  onChange={(e) => {
                          setDocs({
                            ...docs,
                            castProof: e.target.files[0],
                          });
                          // console.log(992,e);
                        }}/>
              </div>

              <div className="row">
       
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
                  <span id="CPH_Panelappdetails">कराराचा तपशील:</span>
                </h3>
              </div>
              <Form name="basic" autoComplete="off" layout={"vertical"}>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="" className="mb-3">
                      {" "}
                      <span className="red">*</span> मी घोषित करतो/ करते की
                      वरील सर्व माहिती माझ्या व्यक्तीगत माहिती व समजुतीनुसार
                      खरी आहे. सदर माहिती खोटी आढळून आल्यास, भारतीय दंड संहिता
                      १९६० कलम १९९ व २०० व अन्य/ संबंधित कायदयानुसार माझ्यावर
                      खटला भरला जाईल व त्यानुसार मी शिक्षेस पात्र राहीन याची
                      मला पूर्ण जाणीव आहे.
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
                        <Radio value="yes">मला मंजूर</Radio>
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
      {/* <div className="col-md-1">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={(e) => {
              EWSFormSubmit(e);
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </div> */}

      <div class="col-md-12 text-center">
        {id == undefined ? (
          <input
            type="submit"
            name="ctl00$CPH$btnsubmit"
            value="Proceed"
            onClick={(e) => {
              EWSFormSubmit(e);
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
    </div>
  </>
  );
}

export default EWS;
