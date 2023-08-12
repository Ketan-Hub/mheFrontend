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
function Retailer_udhamadhar() {
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
      .put(`https://mhebackend.payagain.in/api/udhamAbhar/${id}`, {isNew:false})
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
                                {selectedItem.Title}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Owner_Name :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Owner_Name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>PAN_Card :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.PAN_Card}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Adhar_Card_no :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Adhar_Card_no}{" "}
                              </div>
                           

                              <div class="col-md-6">
                                <label>
                                  {" "}
                                  <b> GST_Number :</b>
                                </label>
                                <br />
                                {selectedItem.GST_Number}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Social_Category :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Social_Category}{" "}
                              </div>
                              
                              <div class="col-md-6">
                                <label>
                                  <b>Gender :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Gender}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Shop_Name :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Shop_Name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Mobile_Number :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Mobile_Number}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>email:</b>{" "}
                                </label>
                                <br />
                                {selectedItem.email}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Number_of_Employee :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Number_of_Employee}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Business_Started_Date :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Business_Started_Date}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Shop_Address :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Shop_Address}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Nature_Of_Business :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Nature_Of_Business}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Investment_Rs :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Investment_Rs}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Bank_Name :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Bank_Name}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Bank_Account_Number :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Bank_Account_Number}{" "}
                              </div>
                              <div class="col-md-6">
                                <label>
                                  <b>Bank_IFSC_Code :</b>{" "}
                                </label>
                                <br />
                                {selectedItem.Bank_IFSC_Code}{" "}
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
                                  
                                  <a href={selectedItem.Aadhar_Upload_Card}>Aadhar_Upload_Card</a>

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
                                  
                                  <a href={selectedItem.Pan_Upload_Card}>Pan_Upload_Card</a>

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
                                  
                                  <a href={selectedItem.Passport}>Passport</a>

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
                                  
                                  <a href={selectedItem.Bank_Upload_Passbook}>Bank_Upload_Passbook</a>

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

export default Retailer_udhamadhar;