import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import './styles.css';
// import './Application.css';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { incNumber } from "../../Redux/actions";

function Application_indiGST() {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch()
  let { id } = useParams();
  const [selectedItem, setselectedItem] = useState(null);
  console.log(selectedItem);

  useEffect(() => {
    axios
      .get("https://mhebackend.payagain.in/api/getAll/Form11")
      .then((res) => {
        const data = res.data;
        const selectedData = data.find((item) => item._id === id);
        setselectedItem(selectedData);
      })
      .catch((err) => console.log(err));
      axios
      .put(`https://mhebackend.payagain.in/api/indGST/${id}`, {isNew:false})
      .then((res) => {
        dispatch(incNumber())
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("40", selectedItem);
  // console.log(30,"acknowledment",selectedItem.acknowledgmentDocument);


  const [Acknowledgment, setAcknowledgment] = useState({
    Acknowledgment: "",
  });
  const [finalDocs, setfinalDocs] = useState({
    finalDocs: "",
  });
  const obj = {
    ...selectedItem,
    status: status,
    // note:note
  };
  const FormSubmit = (e) => {
    e.preventDefault();

    if (selectedItem.status === "IN-PROGRESS"||selectedItem.status==="IN-Progress") {

      const formData = new FormData();

      formData.append("acknowledgmentDocument", Acknowledgment.Acknowledgment);
      axios
        .put(
          `https://mhebackend.payagain.in/api/indGST_acknowledgmentDocument/${id}`,
          formData
        )
        .then((res) => console.log("acknowledgmentDocument", res.data))
        .catch((err) => {
          console.log(err);
        });
      axios
        .put(
          `https://mhebackend.payagain.in/api/indGST/${id}`,
          obj
        )
        .then((res) => console.log("acknowledgmentDocument", res.data))
        .catch((err) => {
          console.log(err);
        });
        
    } else if (selectedItem.status === "SUBMITTED"){
        const formData = new FormData();

        formData.append("finalDocument", finalDocs.finalDocs);
        axios
      .put(`https://mhebackend.payagain.in/api/indGST_finalDocument/${id}`, formData)
      .then((res) => console.log("finalDocument", res.data))
      .catch((err) => {
          console.log(err);
        });
        axios
          .put(
            `https://mhebackend.payagain.in/api/indGST/${id}`,
            obj
          )
          .then((res) => console.log("acknowledgmentDocument", res.data))
          .catch((err) => {
            console.log(err);
          });
    };

  // console.log("updated object",obj);
  if (selectedItem.application_type === "indGST") {
    axios
      .put(`https://mhebackend.payagain.in/api/indGST/${id}`, obj)
      .then((res) => {
        alert("updated successfully");
      })
      .catch((err) => console.log(err));
  } else if (selectedItem.application_type === "Income certificate") {
    axios
      .put(`https://mhebackend.payagain.in/api/income_Certificate/${id}`, obj)
      .then((res) => {
        alert("updated successfully");
      })
      .catch((err) => console.log(err));
  } else if (selectedItem.application_type === "Age_Nationality") {
    axios
      .put(`https://mhebackend.payagain.in/api/Age_Nashnality/${id}`, obj)
      .then((res) => {
        alert("updated successfully");
      })
      .catch((err) => console.log(err));
  } else if (selectedItem.application_type === "Non_Cremylayer certificate") {
    axios
      .put(`https://mhebackend.payagain.in/api/Non_Criminal/${id}`, obj)
      .then((res) => {
        alert("updated successfully");
      })
      .catch((err) => console.log(err));
  }
}
const   handleDownloadClick = (url) => {
    const imageUrl = url;

    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'image.jpg';
    downloadLink.click();
  };

  return (
    <>
      {selectedItem != null ? (
        <Container fluid={true}>
          <Row>
            <Col sm="">
              <Card>
                <CardBody>
                  {/* <button
                  class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                  id="sidebarToggle"
                  href="#!"
                >
                  <i class="fas fa-bars"></i>
                </button> */}

                  <form class="inline-block form-inline ms-auto ">
                    <div id="layoutSidenav_content">
                      <main>
                        <div class="container-fluid px-4 mt-4">
                          <div class="formlayout">
                            <div class="form-heading">
                              <label class="form-control form-control-lg">
                                {selectedItem.application_type}
                              </label>
                            </div>

                            <br />

                            <div class="row g-3">
                              <div class="col-md-6">
                                <label>
                                  <b>customerName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.customerName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>address :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.address}{" "}
                              </div>
                             
                              <div class="col-md-6">
                                <label>
                                  <b>mobileNO :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mobileNO}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>email :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.email}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>panCard :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.panCard}{" "}
                              </div>
                             
                              <div class="col-md-6">
                                <label>
                                  <b>adharCard :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.adharCard}{" "}
                              </div>
                             
                              <div class="col-md-6">
                                <label>
                                  <b>status History :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.status +
                                  "  " +
                                  selectedItem.createdAt}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Upload required documents: :</b>{" "}
                                </label>
                                <br />
                                <b style={{ color: "red" }}>
                                  अर्ज पुढील कार्यवाहिस पाठवण्या अगोदर सर्व
                                  आवश्यक कागदपत्रे तपासून व स्कॅन करून अपलोड
                                  करावे. जर आवश्यक कागदपत्रे चुकीची किंवा
                                  अस्पष्ट आढळल्यास सदर चा अर्ज फेटाळला जाऊ शकतो.
                                </b>{" "}
                              </div>
                              <div class="col-md-6"></div>
                              <div class="col-md-6">

                              <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                               
                                >
                                  
                                  <a href={selectedItem.adharCard_Docs}>adharCard_Docs</a>

                                </button>
                                <br />
                                <br />

                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                                 
                                >
                                  
                                  <a href={selectedItem.electricityBill}>electricityBill</a>

                                </button>
                                <br />
                                <br />

                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                                
                                >
                                  
                                  <a href={selectedItem.bankPassbook}>bankPassbook</a>

                                </button>
                                <br />
                                <br />

                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                                  
                                >
                                  
                                  <a href={selectedItem.panCard_Docs}>panCard_Docs</a>

                                </button>
                                <br />
                                <br />

                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                              
                                >
                                  
                                  <a href={selectedItem.passportPhoto}>passportPhoto</a>

                                </button>
                                <br/>
                                <br/>

                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                              
                                >
                                  
                                  <a href={selectedItem.shopAct_licence}>shopAct_licence</a>

                                </button>
                                <br />
                                <br />

                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                                 
                                >
                                  
                                  <a href={selectedItem.rentAgreement}>rentAgreement</a>

                                  
                                </button>
                                <br/>
                                <br />
                                <br />

                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                                  
                                >
                                  
                                  <a href={selectedItem.signature}>signature</a>

                                </button>
                                <br/>

                                {
                                  selectedItem.acknowledgmentDocument!=null &&
                                 <>

                                 <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                                  
                                >
                                  
                                  <a href={selectedItem.acknowledgmentDocument}>acknowledgmentDocument</a>

                                </button>
                                <br/>
                                 </>
                               
}


{
                                  selectedItem.finalDocument!=null &&
                                 <>

                                 <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                  }}
                                  
                                >
                                  
                                  <a href={selectedItem.finalDocument}>finalDocument</a>

                                </button>
                                <br/>
                                 </>
                               
}
                                
                              </div>
                            </div>
                            <br />

                            <div class="row g-3">
                              {/* <div class="row g-3">
                         

                              <div class="row g-3" id="dvtext">
                                <div class="col-md-6">
                                  <label>
                                    <b> Adhar NO.</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["AdharNo"]}{" "}
                                </div>
                                   <div class="col-md-6">
                                  <label>
                                    <b> Phone NO.</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["phoneNUm"]}{" "}
                                </div>
                            
                              </div>
                              {/* <div class="row g-3" id="dvtext">
                              <div class="col-md-6">
                                  <label>
                                    <b> Applicant_address</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_address"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_street</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_street"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_Building</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_Building"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_locality</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_locality"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_landmark</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_landmark"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_district</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_district"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_taluka</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_taluka"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_village</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_village"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_pincode</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_pincode"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Income_salary</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Income_salary"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Income_business</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Income_business"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Income_agriculture</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Income_agriculture"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Income_investment</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Income_investment"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Income_others</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Income_others"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> total :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["total"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> relationOfBanificiaryWithApplicant :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["relationOfBanificiaryWithApplicant"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiary_salution :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["benificiary_salution"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_Name_English :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_Name_English"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_Name_marathi :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_Name_marathi"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_Dob :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_Dob"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_age :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_age"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_gender :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_gender"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_relation :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_relation"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_mobNumber :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_mobNumber"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_Email :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_Email"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_AdharNo :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_AdharNo"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiary_occupation :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["benificiary_occupation"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_Address :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_Address"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_street :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_street"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_building :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_building"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_locality :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_locality"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_landmark :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_landmark"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_District :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_District"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_taluka :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_taluka"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_village :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_village"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Benificiary_pincode :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["Benificiary_pincode"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiary_cast :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_info["benificiary_cast"]}{" "}
                                </div>

                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_Address :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_Address"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_street :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_street"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_Bulding :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_Bulding"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_locality :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_locality"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_landmark :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_landmark"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_district :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_district"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_taluka :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_taluka"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_village :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_village"]}{" "}
                                </div>
                                
                                <div class="col-md-6">
                                  <label>
                                    <b> permanant_pincode :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.permanant_address["permanant_pincode"]}{" "}
                                </div>
                                {/* <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_salution :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiaryFather_info["benificiaryFather_salution"]}{" "}
                                </div> */}
                              {/* <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_fullName_english :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_fullName_english"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_fullName_marathi :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_fullName_marathi"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_DOB :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_DOB"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_age :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_age"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_occupation :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_occupation"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_mobileNO :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_mobileNO"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_email :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_email"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_email :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_email"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_UID :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_UID"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_UID :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_UID"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_Address :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_Address"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_street :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_street"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_building :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_building"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_Locality :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_Locality"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_Landmark :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_Landmark"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_District :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_District"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_Taluka :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_Taluka"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_Village :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_Village"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_PinCode :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_PinCode"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> benificiaryFather_cast :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.benificiary_father_details["benificiaryFather_cast"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> migration_state :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.migration["migration_state"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> migration_district :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.migration["migration_district"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> migration_taluka :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.migration["migration_taluka"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> migration_village :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.migration["migration_village"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> migration_fromDate :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.migration["migration_fromDate"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> migration_endDate :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.migration["migration_endDate"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> migration_year :</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.migration["migration_year"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> land_info</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_salutation"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> land_holderName_english</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holderName_english"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> land_holderName_marathi</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holderName_marathi"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> land_holder_relation</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holder_relation"]}{" "}
                                </div>
                                   <div class="col-md-6">
                                  <label>
                                    <b>land_holder_district</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holder_district"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>land_holder_taluka</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holder_taluka"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>land_holder_village</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holder_village"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>land_holder_pincode</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holder_pincode"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>land_holder_groupNO</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holder_groupNO"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>land_holder_area</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_holder_area"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>land_Area_unit</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["land_Area_unit"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>is_land_outside_village</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.land_info["is_land_outside_village"]}{" "}
                                </div> */}
                              {/* <div class="col-md-6">
                                  <label>
                                    <b>village</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["village"]}{" "}
                                </div>
                                    <div class="col-md-6">
                                  <label>
                                    <b>pincode</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["pincode"]}{" "}
                                </div> */}
                              {/* </div> */}

                              {selectedItem.status == "IN-PROGRESS" ||
                              selectedItem.status == "IN-Progress" ? (
                                <div class="row g-3" id="dvtext">
                                  <div class="col-md-6">
                                    <label>
                                      {" "}
                                      <b>
                                        {" "}
                                        Status:
                                        <span class="text-danger">*</span>
                                      </b>{" "}
                                    </label>
                                    <br />
                                    <select
                                      name="state"
                                      class="form-select"
                                      required
                                      id="state"
                                      onChange={(e) =>
                                        setStatus(e.target.value)
                                      }
                                    >
                                      <option value="" selected>
                                        Select State
                                      </option>
                                      <option Value="SUBMITTED">
                                        SUBMITTED
                                      </option>
                                      <option Value="REJECTED">REJECTED</option>
                                    </select>
                                  </div>

                                  <div class="col-md-6">
                                    <label>
                                      <b>
                                        Note:
                                        <span class="text-danger">*</span>
                                      </b>{" "}
                                    </label>{" "}
                                    <br />
                                    <textarea name="note" class="form-control">
                                      {" "}
                                    </textarea>{" "}
                                  </div>
                                  {status === "SUBMITTED" && (
                                    <div class="col-md-6">
                                      <label>
                                        <b>Acknowledgment Document </b>{" "}
                                      </label>
                                      <input
                                        type="file"
                                        name=""
                                        id=""
                                        onChange={(e) => {
                                          setAcknowledgment({
                                            ...Acknowledgment,
                                            Acknowledgment: e.target.files[0],
                                          });
                                          // console.log(992,e);
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ) : selectedItem.status == "SUBMITTED" ? (
                                <div class="row g-3" id="dvtext">
                                  <div class="col-md-6">
                                    <label>
                                      {" "}
                                      <b>
                                        {" "}
                                        Status:
                                        <span class="text-danger">*</span>
                                      </b>{" "}
                                    </label>
                                    <br />
                                    <select
                                      name="state"
                                      class="form-select"
                                      required
                                      id="state"
                                      onChange={(e) =>
                                        setStatus(e.target.value)
                                      }
                                    >
                                      <option value="" selected>
                                        Select State
                                      </option>

                                      <option Value="COMPLETE">COMPLETE</option>
                                    </select>
                                  </div>

                                  <div class="col-md-6">
                                    <label>
                                      <b>
                                        Note:
                                        <span class="text-danger">*</span>
                                      </b>{" "}
                                    </label>{" "}
                                    <br />
                                    <textarea name="note" class="form-control">
                                      {" "}
                                    </textarea>{" "}
                                  </div>
                                  {status === "COMPLETE" && (
                                    <div class="col-md-6">
                                      <label>
                                        <b>Final Document </b>{" "}
                                      </label>
                                      <input
                                        type="file"
                                        name=""
                                        id=""
                                        onChange={(e) => {
                                          setfinalDocs({
                                            ...finalDocs,
                                              finalDocs: e.target.files[0],
                                           
                                          });
                                          // console.log(992,e);
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div class="row g-3 " id="dvtext">
                                <div class="col-md-12">
                                  <button
                                    type="submit"
                                    name="submit"
                                    id="btnsubmit"
                                    class="btn btn-primary"
                                    value="Submit"
                                    onClick={(e) => {
                                      FormSubmit(e);
                                    }}
                                  >
                                    Submit
                                  </button>

                                  <button
                                    type="submit"
                                    name="submit"
                                    id="btnsubmit"
                                    class="btn btn-primary "
                                    value="Submit"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    Reset
                                  </button>
                                </div>
                              </div>
                              {/* </div>  */}
                            </div>
                          </div>
                        </div>
                      </main>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Card
            style={{
              height: "80vh",
              width: "80vw",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <h3>Loading...</h3>
          </Card>
        </>
      )}
    </>
  );
}

export default Application_indiGST;