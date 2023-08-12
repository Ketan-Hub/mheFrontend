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

function Retailer_passport() {
  const [status, setStatus] = useState("");

  let { id } = useParams();
  const [selectedItem, setselectedItem] = useState(null);
  console.log(selectedItem);

  const dispatch = useDispatch()


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
      .put(`https://mhebackend.payagain.in/api/passport/${id}`, {isNew:false})
      .then((res) => {
        dispatch(incNumber())
      })
      .catch((err) => console.log(err));

  }, []);

  console.log("40", selectedItem);

 

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
                                  <b>Title :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.title}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Type-Passport :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.typePassport}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>First-Name :</b>{" "}
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
                                  <b>mobileNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mobileNumber}{" "}
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
                                  <b>gender :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.gender}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Dob :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Dob}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>pob :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.pob}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>maritalStatus:</b>{" "}
                                </label>
                                <br />
                                {selectedItem.maritalStatus}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>father_firstName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.father_firstName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>father_middleName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.father_middleName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>father_lastName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.father_lastName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>mother_firstName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mother_firstName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>mother_middleName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mother_middleName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>mother_lastName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mother_lastName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>spouse_firstName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.spouse_firstName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>spouse_middleName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.spouse_middleName}{" "}
                              </div>
                             
                              <div class="col-md-6">
                                <label>
                                  <b>spouse_lastName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.spouse_lastName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>presentAddress :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.presentAddress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanantAdress_as_presentAdress :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanantAdress_as_presentAdress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    permanantAdress: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanantAdress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    preferred_policeStation: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.preferred_policeStation}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    isYourParents_governmentServant: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.isYourParents_governmentServant}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    educationQualification: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.educationQualification}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    employmentType: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.employmentType}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    appliedPassport: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.appliedPassport}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    EmergencyContact_FirstName: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.EmergencyContact_FirstName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    EmergencyContact_middleName: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.EmergencyContact_middleName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    EmergencyContact_lastName: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.EmergencyContact_lastName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    EmergencyContact_mobileNO: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.EmergencyContact_mobileNO}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>    EmergencyAddress: "", :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.EmergencyAddress}{" "}
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
                                  
                                  <a href={selectedItem.zipAllDocuments}>zipAllDocuments</a>

                                </button>
                                <br />
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
                            <br />

                       
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

export default Retailer_passport;