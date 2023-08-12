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

function Retailer_permanent() {
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
      .put(`https://mhebackend.payagain.in/api/permanant/${id}`, {isNew:false})
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
                                  <b>state :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.state}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>rto :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.rto}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>vehical_type :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.vehical_type}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>vehical_type :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.vehical_type}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>learningLicenceNo :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.learningLicenceNo}{" "}
                              </div>

                              <div class="col-md-6">
                                <label>
                                  {" "}
                                  <b> Name :</b>
                                </label>
                                <br />
                                {selectedItem.application_first_name +
                                  " " +
                                  selectedItem.application_last_name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>relation :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.relation}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>fullname_asper_record :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.fullname_asper_record}{" "}
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
                                  <b>place of Birth :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.pob}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>country of Birth :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.cob}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>qualification :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.qualification}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>blood_group :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.blood_group}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>mobile_No :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mobile_No}{" "}
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
                                  <b>identification_mark1 :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.identification_mark1}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>identification_mark2 :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.identification_mark2}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>emergency_mobNo :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.emergency_mobNo}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>present_Address_State :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.present_Address_State}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>present_Address_Distict :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.present_Address_Distict}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>present_Address_tehsil :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.present_Address_tehsil}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Present_Address_Village :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Present_Address_Village}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Present_Address_Line_1 :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Present_Address_Line_1}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Present_Address_Line_2 :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Present_Address_Line_2}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>present_Adderess_PinCode :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.present_Adderess_PinCode}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>
                                    present_Address_Same_AS_Premant_Address :
                                  </b>{" "}
                                </label>
                                <br />
                                {
                                  selectedItem.present_Address_Same_AS_Premant_Address
                                }{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_Address_State :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_Address_State}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_Address_Distict :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_Address_Distict}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_Address_tehsil :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_Address_tehsil}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_Address_Village :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_Address_Village}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_Address_Line_1 :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_Address_Line_1}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_Address_Line_2 :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_Address_Line_2}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_Adderess_PinCode :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_Adderess_PinCode}{" "}
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
                                  
                                  <a href={selectedItem.addressProof}>addressProof</a>

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
                                  
                                  <a href={selectedItem.ageProof}>ageProof</a>

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

export default Retailer_permanent;