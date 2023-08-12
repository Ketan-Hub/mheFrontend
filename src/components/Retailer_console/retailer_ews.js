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

function Retailer_ews() {

const [ status , setStatus ] = useState('')

  let { id } = useParams();
const [selectedItem,setselectedItem]=useState(null)
  console.log(selectedItem);

  const dispatch = useDispatch()


  useEffect(() => {
    axios.get("https://mhebackend.payagain.in/api/getAll").then( (res) => {
      const data =  res.data;
      const selectedData = data.find((item) => item._id === id);
      setselectedItem(selectedData);
    })
    .catch((err)=>console.log(err))

    axios
    .put(`https://mhebackend.payagain.in/api/Ews/${id}`, {isNew:false})
    .then((res) => {
      dispatch(incNumber())
    })
    .catch((err) => console.log(err));

  }, []);

  console.log("40",selectedItem)

  

  return (
    <>
    {
        selectedItem!=null ? <Container fluid={true}>
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
                                {" "}
                                <b> Name :</b>
                              </label>
                              <br />
                              {selectedItem.Data["statusfname"] + 
                                 ".  " + 
                                 selectedItem.Data["fullName_English"]}{" "}
                            </div>
                            <div class="col-md-6">
                              <label>
                                <b>Father Name :</b>{" "}
                              </label>
                              <br />
                              {selectedItem.Data["fatherName_english"]}{" "}
                            </div>
                          </div>
                          <br />

                          <div class="row g-3">
                            <div class="col-md-6">
                              <label>
                                {" "}
                                <b> Gender :</b>
                              </label>
                              <br />
                              {selectedItem.Data["Gender"]}
                            </div>

                            <br />
                            <br />
                            <div class="col-md-6">
                              <label>
                                {" "}
                                <b> Age :</b>
                              </label>
                              <br />
                              {selectedItem.Data["age"]}{" "}
                            </div>
                            <div class="row g-3">
                              <div class="col-md-6">
                                <label>
                                  {" "}
                                  <b> BirthDate :</b>
                                </label>
                                <br />
                                {selectedItem.Data["BirthDate"]}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  {" "}
                                  <b> Email :</b>
                                </label>
                                <br />
                                {selectedItem.Data["email"]}{" "}
                              </div>

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
                              <div class="row g-3" id="dvtext">
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
                                <div class="col-md-6">
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
                                </div>
                                
                                 <div class="col-md-12">
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
                                 <div class="col-md-6">
                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                                 
                                >
                                  <a href={selectedItem.adharCard}>adharCard</a>
                                </button>
                                <br />
                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                                 
                                >
                                  <a href={selectedItem.castProof}>castProof</a>
                                </button>
                                <br />
                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                                 
                                >
                                  <a href={selectedItem.lightBill}>lightBill</a>
                                </button>
                                <br />
                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                                 
                                >
                                  <a href={selectedItem.photo}>photo</a>
                                </button>
                                <br />
                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                                 
                                >
                                  <a href={selectedItem.reshaCard}>reshaCard</a>
                                </button>
                                <br />
                                <button
                                  style={{
                                    border: "none",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    
                                  }}
                                 
                                >
                                  <a href={selectedItem.schoolLeaveCertificate}>schoolLeaveCertificate</a>
                                </button>
                                <br />
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
                              
                            </div>
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
      </Container>:<><Card style={{height:"80vh",width:"80vw",display:"flex",alignItem:"center",justifyContent:"center"}}><h3>Loading...</h3></Card></>
    }
      
    </>
  );
}

export default Retailer_ews;
