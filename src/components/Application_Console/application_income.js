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

function Application_income() {

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
    .put(`https://mhebackend.payagain.in/api/income_Certificate/${id}`, {isNew:false})
    .then((res) => {
      dispatch(incNumber());
    })
    .catch((err) => console.log(err));

  }, []);

  console.log("40",selectedItem)

  const [Acknowledgment, setAcknowledgment] = useState({
    Acknowledgment: "",
  });
  const [finalDocs, setfinalDocs] = useState({
    finalDocs: "",
  });


  const obj={

    ...selectedItem,
    status:status
}



  const FormSubmit=(e)=>{

    e.preventDefault()

    if (selectedItem.status === "IN-PROGRESS"||selectedItem.status==="IN-Progress") {
  
      const formData = new FormData();

      formData.append("acknowledgmentDocument", Acknowledgment.Acknowledgment);
      axios
        .put(
          `https://mhebackend.payagain.in/api/incomeCertificate_acknowledgmentDocument/${id}`,
          formData
        )
        .then((res) => console.log("acknowledgmentDocument", res.data))
        .catch((err) => {
          console.log(err);
        });
      axios
        .put(
          `https://mhebackend.payagain.in/api/income_Certificate/${id}`,
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
      .put(`https://mhebackend.payagain.in/api/incomeCertificate_finalDocument/${id}`, formData)
      .then((res) => console.log("finalDocument", res.data))
      .catch((err) => {
          console.log(err);
        });
        axios
          .put(
            `https://mhebackend.payagain.in/api/income_Certificate/${id}`,
            obj
          )
          .then((res) => console.log("finalDocument", res.data))
          .catch((err) => {
            console.log(err);
          });
    };

   
    if(selectedItem.application_type==="EWS")
    {
        axios.put(`https://mhebackend.payagain.in/api/Ews/${id}`, obj)
        .then((res)=>{

            alert('updated successfully');
        })
        .catch((err)=>console.log(err))
    }
    else if(selectedItem.application_type==="Income certificate")
    {
        axios.put(`https://mhebackend.payagain.in/api/income_Certificate/${id}`, obj)
        .then((res)=>{

            alert('updated successfully');
        })
        .catch((err)=>console.log(err))
    }
    else if(selectedItem.application_type==="Age_Nationality")
    {
        axios.put(`https://mhebackend.payagain.in/api/Age_Nashnality/${id}`, obj)
        .then((res)=>{

            alert('updated successfully');
        })
        .catch((err)=>console.log(err))
    }
    else if(selectedItem.application_type==="Non_Cremylayer certificate")
    {
        axios.put(`https://mhebackend.payagain.in/api/Non_Criminal/${id}`, obj)
        .then((res)=>{

            alert('updated successfully');
        })
        .catch((err)=>console.log(err))
    }
  }

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
                                  {selectedItem.Data["address"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_street</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["streetName"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_Building</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Building"]}{" "}
                                </div>
                                {/* <div class="col-md-6">
                                  <label>
                                    <b> Applicant_locality</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["Applicant_locality"]}{" "}
                                </div> */}
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_landmark</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["landmark"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_district</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["district"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_taluka</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["taluka"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_village</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["village"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Applicant_pincode</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["pincode"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> relation Of Applicant</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["relationOfApplicant"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> status Of Applicant</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["statusOfApplicant"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>Name Of Applicant</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["NameOfApplicant"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Reason Of Apllication</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["ReasonOfApllication"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Reason Of income </b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["ReasonOfincome_get"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Income Name</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["IncomeDOcsName"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>fullName Marathi</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["fullName_Marathi"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> fatherName marathi</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["fatherName_marathi"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>income Year</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["incoCerYear"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>work type</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["work_type"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Pan No</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["PanNo"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>depart</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["depart"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> Income Name</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.Data["IncomeDOcsName"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> relation</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.family["relation"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> name</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.family["name"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>age</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.family["age"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>occupation</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.family["occupation"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>income</b>{" "}
                                  </label>
                                  <br />
                                  {selectedItem.family["income"]}{" "}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> account Holder Name</b>{" "}
                                  </label>
                                  <br />
                                  {/* {selectedItem.IncomeData["accountHolder_Name"]}{" "} */}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>total farm</b>{" "}
                                  </label>
                                  <br />
                                  {/* {selectedItem.IncomeData["totalfarm"]}{" "} */}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b> farming details</b>{" "}
                                  </label>
                                  <br />
                                  {/* {selectedItem.IncomeData["farmingdetails"]}{" "} */}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>accountHolder DIstrict</b>{" "}
                                  </label>
                                  <br />
                                  {/* {selectedItem.IncomeData["accountHolder_DIstrict"]}{" "} */}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>accountHolder Taluka</b>{" "}
                                  </label>
                                  <br />
                                  {/* {selectedItem.IncomeData["accountHolder_Taluka"]}{" "} */}
                                </div>
                                <div class="col-md-6">
                                  <label>
                                    <b>accountHolder village</b>{" "}
                                  </label>
                                  <br />
                                  {/* {selectedItem.IncomeData["accountHolder_village"]}{" "} */}
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
                                  <a href={selectedItem.consentform}>consentform</a>
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
                                  <a href={selectedItem.form16}>form16</a>
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
                                  <a href={selectedItem.selfDeclearation}>selfDeclearation</a>
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




                                {
                                  selectedItem.status=="IN-PROGRESS" ?


                  
                              <div class="row g-3" id="dvtext">
                                <div class="col-md-6">
                                  <label>
                                    {" "}
                                    <b>
                                      {" "}
                                      Status:<span class="text-danger">*</span>
                                    </b>{" "}
                                  </label>
                                  <br />
                                  <select
                                    name="state"
                                    class="form-select"
                                    required
                                    id="state"
                                    onChange={(e)=>setStatus(e.target.value)}
                                  >
                                    <option value=""  selected>
                                      Select State
                                    </option>
                                    <option Value="SUBMITTED">SUBMITTED</option>
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
                                {
                                  status==="SUBMITTED" && 
                                  <div class="col-md-6">
                                  <label>
                                    <b>Acknowledgment Document </b>{" "}
                                  </label>
                                  <input
                                    type="file"
                                    onChange={(e) => {
                                      setAcknowledgment({
                                        ...Acknowledgment,
                                        Acknowledgment: e.target.files[0],
                                      });
                                      
                                    }
                                  
                                  }
                                    
                                  />
                                </div>
                                }
                              
                              </div>
                                :
                                

                                selectedItem.status=="SUBMITTED" ?

                                <div class="row g-3" id="dvtext">
                                <div class="col-md-6">
                                  <label>
                                    {" "}
                                    <b>
                                      {" "}
                                      Status:<span class="text-danger">*</span>
                                    </b>{" "}
                                  </label>
                                  <br />
                                  <select
                                    name="state"
                                    class="form-select"
                                    required
                                    id="state"
                                    onChange={(e)=>setStatus(e.target.value)}
                                  >
                                    <option value=""  selected>
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
                                {
                                  status==="COMPLETE" && 
                                  <div class="col-md-6">
                                  <label>
                                    <b>Final Document </b>{" "}
                                  </label>
                                  <input

type="file"
onChange={(e) => {
  setfinalDocs({
    ...finalDocs,
      finalDocs: e.target.files[0],
    
  });
                  }    }              />
                                </div>
                               
                                }
                              
                              
                              </div>
                                 :
                                 <>
                                 </>
                                
                                }
                              <div class="row g-3 " id="dvtext">
                                <div class="col-md-12">
                                  <button  type="submit"
                                    name="submit"
                                    id="btnsubmit"
                                    class="btn btn-primary"
                                    value="Submit"
                                    onClick={(e) => {
                                        FormSubmit(e);
                                      }} >Submit</button>


                               <button  type="submit"
                                    name="submit"
                                    id="btnsubmit"
                                    class="btn btn-primary "
                                    value="Submit" style={{marginLeft:"10px"}}>
                                        Reset
                                      </button>
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

export default Application_income;