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
function Retailer_voterCard() {
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
      .put(`https://mhebackend.payagain.in/api/votercard/${id}`, {isNew:false})
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
                                  <b>assembly Parliamentary Constituency :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.assembly_Parliamentary_Constituency}{" "}
                              </div>

                              <div class="col-md-6">
                                <label>
                                  {" "}
                                  <b> Name :</b>
                                </label>
                                <br />
                                {selectedItem.name +
                                  " " +
                                  selectedItem.Surname}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>request name electoral roll Constituency :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.request_name_electoral_roll_Constituency}{" "}
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
                                  <b>date of Birth :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.date_of_Birth}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>birth Town Village Office :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.birth_Town_Village_Office}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>birth District :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.birth_District}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>birth State Union Territory :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.birth_State_Union_Territory}{" "}
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
                                  <b>currentAddress_houseNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_houseNumber}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_streetArea_Locality :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_streetArea_Locality}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_townVillage_Office :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_townVillage_Office}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_postOffice :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_postOffice}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_district :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_district}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_stateUnion_Territory :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_stateUnion_Territory}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_pincodeZip_code :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_pincodeZip_code}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_ordinarily_resident_address_since :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_ordinarily_resident_address_since}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>currentAddress_permanentAddress_currentAddress :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.currentAddress_permanentAddress_currentAddress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanent_address :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanent_address}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanentAddress_House_No :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanentAddress_House_No}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanentAddress_streetArea_Locality :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanentAddress_streetArea_Locality}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>
                                  permanentAddress_townVillage_Office :
                                  </b>{" "}
                                </label>
                                <br />
                                {
                                  selectedItem.permanentAddress_townVillage_Office
                                }{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanentAddress_postOffice :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanentAddress_postOffice}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanentAddress_district :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanentAddress_district}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanentAddress_stateUnion_territory :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanentAddress_stateUnion_territory}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanentAddress_pincodeZip_code :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanentAddress_pincodeZip_code}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>permanentAddress_telephoneMobile_Number :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.permanentAddress_telephoneMobile_Number}{" "}
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
                                  <b>EPIC_No :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.EPIC_No}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>disability:</b>{" "}
                                </label>
                                <br />
                                {selectedItem.disability}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>previous_Constituency:</b>{" "}
                                </label>
                                <br />
                                {selectedItem.previous_Constituency}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>previousConstituency_state:</b>{" "}
                                </label>
                                <br />
                                {selectedItem.previousConstituency_state}{" "}
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
                                  addressProof_Doc
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
                                  ageProof_DOc
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
                                  PassportSize_photo
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
                                  age_declaration_form
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

export default Retailer_voterCard;