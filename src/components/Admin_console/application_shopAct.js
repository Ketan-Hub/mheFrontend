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

function Application_shopAct() {
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
      .put(`https://mhebackend.payagain.in/api/shopact/${id}`, {isNew:false})
      .then((res) => {
        dispatch(incNumber())
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("40", selectedItem);

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
          `https://mhebackend.payagain.in/api/shopact_acknowledgmentDocumentl/${id}`,
          formData
        )
        .then((res) => console.log("acknowledgmentDocument", res.data))
        .catch((err) => {
          console.log(err);
        });
      axios
        .put(
          `https://mhebackend.payagain.in/api/shopact/${id}`,
          obj
        )
        .then((res) => console.log("final document", res.data))
        .catch((err) => {
          console.log(err);
        });
        
    } else if (selectedItem.status === "SUBMITTED"){
        const formData = new FormData();

        formData.append("finalDocument", finalDocs.finalDocs);
        axios
      .put(`https://mhebackend.payagain.in/api/shopact_finalDocument/${id}`, formData)
      .then((res) => console.log("finalDocument", res.data))
      .catch((err) => {
          console.log(err);
        });
        axios
          .put(
            `https://mhebackend.payagain.in/api/shopact/${id}`,
            obj
          )
          .then((res) => console.log("final Document", res.data))
          .catch((err) => {
            console.log(err);
          });
    };

  // console.log("updated object",obj);
  if (selectedItem.application_type === "shopAct") {
    axios
      .put(`https://mhebackend.payagain.in/api/shopact/${id}`, obj)
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
                                  <b>selectType :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.selectType}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>title :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.title}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>firstName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.firstName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>middleName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.middleName}{" "}
                              </div>
                           

                              <div class="col-md-6">
                                <label>
                                  {" "}
                                  <b> lastName :</b>
                                </label>
                                <br />
                                {selectedItem.lastName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>mobileNo :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mobileNo}{" "}
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
                                  <b>adharNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.adharNumber}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>mobileNumber_registered_WithAdharCard :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mobileNumber_registered_WithAdharCard}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>gender :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.gender}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>dob:</b>{" "}
                                </label>
                                <br />
                                {selectedItem.dob}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>residenceAddress_same_AadharAddress :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.residenceAddress_same_AadharAddress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>residenceAddress :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.residenceAddress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>no_of_years_staying_in_residenceAddress :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.no_of_years_staying_in_residenceAddress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>shopName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.shopName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>shopAddress_with_Pincode :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.shopAddress_with_Pincode}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>IsShop_Rented :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.IsShop_Rented}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>natureOfBusiness :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.natureOfBusiness}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>dateBusiness_Started :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.dateBusiness_Started}{" "}
                              </div>
                             
                              <div class="col-md-6">
                                <label>
                                  <b>number_of_Employees :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.number_of_Employees}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>number_of_MenEmployees :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.number_of_MenEmployees}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>number_of_WomenEmployees :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.number_of_WomenEmployees}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner1_Name :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner1_Name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner1_mobileNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner1_mobileNumber}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner1_email :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner1_email}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner1_address :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner1_address}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner2_Name :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner2_Name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner2_mobileNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner2_mobileNumber}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner2_email :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner2_email}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner2_address :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner2_address}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner3_Name :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner3_Name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner3_mobileNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner3_mobileNumber}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner3_email :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner3_email}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner3_address :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner3_address}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner4_Name :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner4_Name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner4_mobileNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner4_mobileNumber}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Partner4_email :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Partner4_email}{" "}
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
                                  
                                  <a href={selectedItem.ownerPassport_photo}>ownerPassport_photo</a>

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
                                  
                                  <a href={selectedItem.ownerSignatureAsPer_PAN}>ownerSignatureAsPer_PAN</a>

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
                                  
                                  <a href={selectedItem.adharCard}>adharCard</a>

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
                                  
                                  <a href={selectedItem.shopPhotographFrom_FrontSide_WithBusinessBoard}>shopPhotographFrom_FrontSide_WithBusinessBoard</a>

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
                                  
                                  <a href={selectedItem.selfDeclaration}>selfDeclaration</a>

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
                                  
                                  <a href={selectedItem.ownerPANCard}>ownerPANCard</a>

                                  
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
                                  
                                  <a href={selectedItem.oldShopAct_ForRenewal}>oldShopAct_ForRenewal</a>

                                </button>
                              <br/>
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

export default Application_shopAct;