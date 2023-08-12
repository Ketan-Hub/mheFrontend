import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


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

function Retailer_compGST() {
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
      .put(`https://mhebackend.payagain.in/api/compgst/${id}`, {isNew:false})
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
                                  <b>companyName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.companyName}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>ownerName :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.ownerName}{" "}
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
                                  <b>businessStarted :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.businessStarted}{" "}
                              </div>
                             
                              <div class="col-md-6">
                                <label>
                                  <b>companyAddress :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.companyAddress}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>companyPan :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.companyPan}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>RegCertificate :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.RegCertificate}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>MOA_AOA :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.MOA_AOA}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>authorityLetter :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.authorityLetter}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>natureBusiness :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.natureBusiness}{" "}
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
                                  
                                  <a href={selectedItem.panCard}>panCard</a>

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

export default Retailer_compGST;