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

function Retailer_egazzet() {
  const [status, setStatus] = useState("");

  let { id } = useParams();
  const [selectedItem, setselectedItem] = useState(null);
  console.log('selectedItem',selectedItem);

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
      .put(`https://mhebackend.payagain.in/api/e_gazzet/${id}`, {isNew:false})
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
                                  <b>service_type :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.service_type}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>type_cast :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.type_cast}{" "}
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
                                  <b>title :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.title}{" "}
                              </div>

                              <div class="col-md-6">
                                <label>
                                  {" "}
                                  <b> Name :</b>
                                </label>
                                <br />
                                {selectedItem.firstName +
                                  " " +
                                  selectedItem.lastName}{" "}
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
                                  <b>adharNumber :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.adharNumber}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>mobileNumber_registered_with_adharCard :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.mobileNumber_registered_with_adharCard}{" "}
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
                                  <b>Old_Dob :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Old_Dob}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>New_Dob :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.New_Dob}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>OldName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.OldName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>NewName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.NewName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>reason :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.reason}{" "}
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
                                  
                                  <a href={selectedItem.photoID}>photoID</a>

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
                                  <a href={selectedItem.Cast_Certificate}>Cast_Certificate</a>

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
                                  
                                  <a href={selectedItem.applicationForm}>applicationForm</a>

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
                                  
                                  <a href={selectedItem.identityProof}>identityProof</a>

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
                                  
                                  <a href={selectedItem.Passport_Size_Photo}>Passport_Size_Photo</a>

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
                                  
                                  <a href={selectedItem.OldName_Proof}>OldName_Proof</a>

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
                                  
                                  <a href={selectedItem.PresentName_Proof}>PresentName_Proof</a>

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

export default Retailer_egazzet;