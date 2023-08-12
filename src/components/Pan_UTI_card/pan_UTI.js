import React, { Fragment, useEffect, useReducer, useState } from "react";
import Breadcrumb from "../common/breadcrumb";

// import data from "../../../assets/data/digital-sub-category";
// import Datatable from "../../common/datatable";
import Select from "react-select";
import pdf from "../../assets/images/Correction_in_PAN_Card_Form.pdf";
import pdf1 from "../../assets/images/New_PAN_Card_Form_(49A)_(8).pdf";
import pdf2 from "../../assets/images/Sample_PAN_Card_Form.pdf";
import {
  Modal,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import axios from "axios";
// import DataTable from "react-data-table-component";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { incNumber } from "../../Redux/actions";
import { toast } from "react-toastify";

const Pan_UTI = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);

  const pricess = useSelector((state) => state.price.formPrices);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const [userFormDetails, setuserFormDetails] = useState([]);

  const [selectedRtoPricewe, setSelectedRtoPrice] = useState();
  console.log(57, selectedRtoPricewe);
  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/formPrice`)
      .then((res) => {
        const response = res.data;
        console.log(42,response)
        if (response.userID!==userData.user._id) {
          const userFormDetails = response.filter((item) => item.userID === "ALL");
          setuserFormDetails(userFormDetails);
          console.log("ok");
        }else{
          const userFormDetails = response.filter((item) => item.userID === userData.user._id );
          setuserFormDetails(userFormDetails);
          console.log("price");
        }
      })
      .catch((err) => console.log(40, err));
  }, []);
  const reducer = useSelector((state) => state.changeNumber);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));

    if (userData) {
      axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
        console.log(88, res.data);

        const allData = res.data.filter(
          (ele) => ele.user === userData.user._id
        );
        let amount = 0;
        let expence = 0;
        if (allData.length > 0) {
          allData.forEach((item) => {
            if (item.isExpence === "true") {
              expence += item.amount;
            } else {
              amount += item.amount;
            }
          });
        }
        setBalance(amount - expence);
      });
    }
  }, [reducer]);

  console.log(37, userFormDetails);
  const [initialAmount, setInitialAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [newPan, setNewPan] = useState(0);

  const convertAmount = (initialAmount) => {
    const converted = initialAmount * userFormDetails[0]?.panCard;
    console.log("converted", converted);
    return converted;
  };

  // useEffect(() => {
  //   convertAmount();
  // }, [initialAmount]);

  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const fileURL = URL.createObjectURL(uploadedFile);
    setDownloadLink(fileURL);
  };
  function generateRandomTransactionId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let transactionId = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      transactionId += characters[randomIndex];
    }
  
    return transactionId;
  }
  const transactionId = generateRandomTransactionId();
  const TotalCoupanAmount = convertAmount(newPan);
  const savePanData = (type, e) => {
    e.preventDefault();
    if (balance > TotalCoupanAmount) {
      const obj = {
        retaierId: userData.user._id,
        retailerName: userData.user.name,
        panType: type,
        couponType: "coupons with pan",
        NO_coupons: newPan,
        isAccept: false,
        totalAmount: TotalCoupanAmount,
        transactionID:transactionId
      };
      axios
        .post(`https://mhebackend.payagain.in/api/panUti/create`, obj)
        .then((res) => {
          const response = res;
          dispatch(incNumber());
          debitFormBalance();
          toast.success("Request Send SuccessFully....");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(128,obj);
    } else {
      toast.error("please Recharge");
    }
  };

  const debitFormBalance = () => {
    const obj = {
      user: userData?.user._id,
      mode: "offline",
      amount: TotalCoupanAmount,
      isExpence: true,
      expenceFor: "Pan Coupans",
    };
    axios
      .post("https://mhebackend.payagain.in/api/recharge/create", obj)
      .then((res) => {
        const response = res.data;
        dispatch(incNumber());
        toast.success("form Submitted");
      })
      .catch((err) => console.log(34, err));
  };

  return (
    <Fragment>
      <Breadcrumb title="PAN Cards" parent="PAN UTI" />
      <Container fluid="true">
        <h3>Coupans Price : {TotalCoupanAmount} </h3>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5> </h5>
              </CardHeader>
              <CardBody>
                <div id="layoutSidenav_content">
                  <main>
                    <div class="container-fluid px-4 mt-4">
                      <div class="formlayout">
                        <div class="m-4">
                          <ul class="nav nav-tabs" id="myTab">
                            <li class="nav-item">
                              <a
                                href="#newpan"
                                class="nav-link active"
                                data-bs-toggle="tab"
                              >
                                NEW PAN
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                href="#company_pan"
                                class="nav-link"
                                data-bs-toggle="tab"
                              >
                                COMPANY PAN
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                href="#minorpan"
                                class="nav-link"
                                data-bs-toggle="tab"
                              >
                                MINOR PAN
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                href="#marriagepan"
                                class="nav-link"
                                data-bs-toggle="tab"
                              >
                                MARRIAGE PAN
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                href="#correctionpan"
                                class="nav-link"
                                data-bs-toggle="tab"
                              >
                                CORRECTION PAN
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                href="https://www.trackpan.utiitsl.com/PANONLINE/trackApp"
                                target="_blank"
                                class="nav-link"
                              >
                                TRACK PAN
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="box-centerside">
                          <div class="tab-content">
                            <div class="tab-pane fade show active" id="newpan">
                              <div id="tab1">
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingOne"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseOne"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>Document Info</b>
                                    </button>
                                    <br />
                                  </h2>

                                  <div
                                    id="flush-collapseOne"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <ul>
                                        <li>
                                          <b>Address Proof:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li>
                                            Aadhaar Card issued by the UIDAI{" "}
                                            <span class="text-danger">
                                              <b>(Compulsory)</b>
                                            </span>
                                          </li>
                                        </ul>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingtwo"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsetwo"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>UTI E-Coupons</b>
                                    </button>
                                    <br />
                                  </h2>

                                  <div
                                    id="flush-collapsetwo"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingtwo"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <form method="POST">
                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Coupon Type</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel1"
                                              onChange={(e) => {}}
                                            >
                                              <option selected>
                                                Select Coupon Type
                                              </option>
                                              <option>Coupons with Pan</option>
                                            </select>
                                          </div>
                                          <div class="col-md-6">
                                            <label>
                                              <b>No. of Coupons</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel2"
                                              id="sel2"
                                              type="number"
                                              onChange={(e) =>
                                                setNewPan(e.target.value)
                                              }
                                            >
                                              <option selected>
                                                Select No. of Coupons
                                              </option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                            </select>
                                          </div>
                                        </div>
                                        <br />

                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Total Amount</b>{" "}
                                            </label>
                                            <label htmlFor="">
                                              {convertAmount(newPan)}
                                            </label>
                                          </div>
                                          <div class="col-md-12">
                                            <button
                                              class="btn btn-primary"
                                              onClick={(e) =>
                                                savePanData("new pan", e)
                                              }
                                            >
                                              Submit
                                            </button>
                                            &nbsp;&nbsp;
                                            <input
                                              type="reset"
                                              name="submit"
                                              class="btn btn-primary"
                                              value="Reset"
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <br />

                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingThree"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseThree"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseThree"
                                    >
                                      <b>PAN Entry</b>
                                    </button>
                                  </h2>
                                  <br />

                                  <div
                                    id="flush-collapseThree"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <a href="https://www.psaonline.utiitsl.com/psaonline/showLogin">
                                        <b>Continue to UTI PAN Entry</b>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- here new pan --> */}
                              </div>
                            </div>

                            <div class="tab-pane fade" id="company_pan">
                              <div id="tab2">
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingcompanyOne"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsecompanyOne"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>Document Info</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapsecompanyOne"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingcompanyOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <ul>
                                        <b>
                                          {" "}
                                          <li>List Of Documents:</li>
                                        </b>
                                        <ul>
                                          {" "}
                                          <li>Firm Registration Certificate</li>
                                          <li>
                                            Certificate should mention the
                                            company profile such as
                                            Partnership-Trust etc.(Noterized or
                                            registered)
                                          </li>
                                          <li>Passport</li>
                                          <li>
                                            Association of partner's/Persons
                                          </li>
                                        </ul>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingcompanytwo"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsecompanytwo"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>UTI E-Coupons</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapsecompanytwo"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingcompanytwo"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <form method="POST">
                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Coupon Type</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel11"
                                            >
                                              <option selected>
                                                Select Coupon Type
                                              </option>
                                              <option>Coupons with Pan</option>
                                            </select>
                                          </div>
                                          <div class="col-md-6">
                                            <label>
                                              <b>No. of Coupons</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel22"
                                              id="sel22"
                                              type="number"
                                              value={initialAmount}
                                              onChange={(e) =>
                                                setInitialAmount(
                                                  Number(e.target.value)
                                                )
                                              }
                                            >
                                              <option selected>
                                                Select No. of Coupons
                                              </option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                            </select>
                                          </div>
                                        </div>
                                        <br />

                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Total Amount</b>{" "}
                                            </label>
                                            <label htmlFor="">
                                              {convertAmount(newPan)}
                                            </label>
                                          </div>
                                          <div class="col-md-12">
                                            <button
                                              class="btn btn-primary"
                                              onClick={(e) =>
                                                savePanData("company pan", e)
                                              }
                                            >
                                              Submit
                                            </button>
                                            &nbsp;&nbsp;
                                            <input
                                              type="reset"
                                              name="submit"
                                              class="btn btn-primary"
                                              value="Reset"
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingcompanyThree"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsecompanyThree"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseThree"
                                    >
                                      <b>PAN Entry</b>
                                    </button>
                                  </h2>
                                  <br />

                                  <div
                                    id="flush-collapsecompanyThree"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingcompanyThree"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <a href="https://www.psaonline.utiitsl.com/psaonline/showLogin">
                                        <b>Continue to UTI PAN Entry</b>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- here company pan --> */}
                              </div>
                            </div>
                            <div class="tab-pane fade" id="minorpan">
                              <div id="tab3">
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingminorOne"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseminorOne"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>Document Info</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapseminorOne"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingminorOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <ul>
                                        <b>
                                          {" "}
                                          <li>List Of Documents:</li>
                                        </b>
                                        <ul>
                                          {" "}
                                          <li>
                                            Application form must be signed by
                                            any one of parent(Father or Mother).
                                          </li>
                                          <li>
                                            Valid Birth Certificate of Minor
                                            applicant.
                                          </li>
                                          <li>
                                            Applicant's School Leaving
                                            Certificate.
                                          </li>
                                          <li>Parent's ID & Address Proof.</li>
                                          <li>
                                            In MINOR PAN CARD 14th number Column
                                            is mandatory to fill up.
                                          </li>
                                        </ul>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingminortwo"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseminortwo"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>UTI E-Coupons</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapseminortwo"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingminortwo"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <form method="POST">
                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Coupon Type</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel111"
                                            >
                                              <option selected>
                                                Select Coupon Type
                                              </option>
                                              <option>Coupons with Pan</option>
                                            </select>
                                          </div>
                                          <div class="col-md-6">
                                            <label>
                                              <b>No. of Coupons</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel222"
                                              id="sel222"
                                              type="number"
                                              value={initialAmount}
                                              onChange={(e) =>
                                                setInitialAmount(
                                                  parseInt(e.target.value)
                                                )
                                              }
                                            >
                                              <option selected>
                                                Select No. of Coupons
                                              </option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                            </select>
                                          </div>
                                        </div>
                                        <br />

                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Total Amount</b>{" "}
                                            </label>
                                            <label htmlFor="">
                                              {convertAmount(newPan)}
                                            </label>
                                          </div>
                                          <div class="col-md-12">
                                            <button
                                              class="btn btn-primary"
                                              onClick={(e) =>
                                                savePanData("minor pan", e)
                                              }
                                            >
                                              Submit
                                            </button>
                                            &nbsp;&nbsp;
                                            <input
                                              type="reset"
                                              name="submit"
                                              class="btn btn-primary"
                                              value="Reset"
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingminorThree"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseminorThree"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseThree"
                                    >
                                      <b>PAN Entry</b>
                                    </button>
                                  </h2>
                                  <br />
                                  <div
                                    id="flush-collapseminorThree"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingminorThree"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <a href="https://www.psaonline.utiitsl.com/psaonline/showLogin">
                                        <b>Continue to UTI PAN Entry</b>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- here minor pan --> */}
                              </div>
                            </div>
                            <div class="tab-pane fade" id="marriagepan">
                              <div id="tab2">
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingmarriageOne"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsemarriageOne"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>Document Info</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapsemarriageOne"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingmarriageOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <ul>
                                        <li>
                                          <b>Old PAN Card:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li>
                                            Old PAN Card Copy Or PAN Card Number
                                            mentioned on application
                                          </li>
                                        </ul>
                                      </ul>

                                      <ul>
                                        <li>
                                          <b>Address Proof:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li>
                                            Aadhaar Card issued by the UIDAI
                                          </li>
                                          <li>Elector's photo identity card</li>
                                          <li>Driving licence</li>
                                          <li>Passport</li>
                                          <li>BSNL Latest Landline Bill</li>
                                          <li>Nationalize Bank Passbook</li>
                                          <li>Water Bill</li>
                                          <li>Gas Bill</li>
                                          <li>
                                            Depository A/c nationalized bank
                                            statement(stamped by bank)
                                          </li>
                                        </ul>
                                      </ul>

                                      <ul>
                                        <li>
                                          <b>Proof of identity:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li> Aadhar Card</li>
                                          <li>Election Card</li>
                                          <li>Passport</li>
                                          <li>Driving License</li>
                                        </ul>
                                      </ul>

                                      <ul>
                                        <li>
                                          <b>Birth Proof:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li>
                                            Aadhar Card (Full Birth Date
                                            required)
                                          </li>
                                          <li>
                                            Election Card (Full Birth Date
                                            required)
                                          </li>
                                          <li>
                                            Birth Certificate Issued by
                                            Corporation/Grampanchayat
                                          </li>
                                          <li>Passport</li>
                                          <li>Driving License</li>
                                        </ul>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingmarriagetwo"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsemarriagetwo"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>UTI E-Coupons</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapsemarriagetwo"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingmarriagetwo"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <form method="POST">
                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Coupon Type</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel1111"
                                            >
                                              <option selected>
                                                Select Coupon Type
                                              </option>
                                              <option>Coupons with Pan</option>
                                            </select>
                                          </div>
                                          <div class="col-md-6">
                                            <label>
                                              <b>No. of Coupons</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel2222"
                                              id="sel2222"
                                              type="number"
                                              value={initialAmount}
                                              onChange={(e) =>
                                                setInitialAmount(
                                                  parseInt(e.target.value)
                                                )
                                              }
                                            >
                                              <option selected>
                                                Select No. of Coupons
                                              </option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                            </select>
                                          </div>
                                        </div>
                                        <br />

                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Total Amount</b>{" "}
                                            </label>
                                            <label htmlFor="">
                                              {convertAmount(newPan)}
                                            </label>
                                          </div>
                                          <div class="col-md-12">
                                            <button
                                              class="btn btn-primary"
                                              onClick={(e) =>
                                                savePanData("marriage pan", e)
                                              }
                                            >
                                              Submit
                                            </button>
                                            &nbsp;&nbsp;
                                            <input
                                              type="reset"
                                              name="submit"
                                              class="btn btn-primary"
                                              value="Reset"
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingmarriageThree"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsemarriageThree"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseThree"
                                    >
                                      <b>PAN Entry</b>
                                    </button>
                                  </h2>
                                  <br />
                                  <div
                                    id="flush-collapsemarriageThree"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingmarriageThree"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <a href="https://www.psaonline.utiitsl.com/psaonline/showLogin">
                                        <b>Continue to UTI PAN Entry</b>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- here marriage pan --> */}
                              </div>
                            </div>
                            <div class="tab-pane fade" id="correctionpan">
                              <div id="tab2">
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingcorrectionOne"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsecorrectionOne"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>Document Info</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapsecorrectionOne"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingcorrectionOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <ul>
                                        <li>
                                          <b>Old PAN Card:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li>
                                            Old PAN Card Copy Or PAN Card Number
                                            mentioned on application
                                          </li>
                                        </ul>
                                      </ul>

                                      <ul>
                                        <li>
                                          <b>Address Proof:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li>
                                            Aadhaar Card issued by the UIDAI
                                          </li>
                                          <li>Elector's photo identity card</li>
                                          <li>Driving licence</li>
                                          <li>Passport</li>
                                          <li>BSNL Latest Landline Bill</li>
                                          <li>Nationalize Bank Passbook</li>
                                          <li>Water Bill</li>
                                          <li>Gas Bill</li>
                                          <li>
                                            Depository A/c nationalized bank
                                            statement(stamped by bank)
                                          </li>
                                        </ul>
                                      </ul>

                                      <ul>
                                        <li>
                                          <b>Proof of identity:</b>{" "}
                                        </li>
                                        <ul>
                                          {" "}
                                          <li> Aadhar Card</li>
                                          <li>Election Card</li>
                                          <li>Passport</li>
                                          <li>Driving License</li>
                                        </ul>
                                      </ul>

                                      <ul>
                                        <li>
                                          <b> Birth Proof:</b>
                                        </li>
                                        <ul>
                                          {" "}
                                          <li>
                                            Aadhar Card (Full Birth Date
                                            required)
                                          </li>
                                          <li>
                                            Election Card (Full Birth Date
                                            required)
                                          </li>
                                          <li>
                                            Birth Certificate Issued by
                                            Corporation/Grampanchayat
                                          </li>
                                          <li>Passport</li>
                                          <li>Driving License</li>
                                        </ul>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingcorrectiontwo"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsecorrectiontwo"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      <b>UTI E-Coupons</b>
                                    </button>
                                    <br />
                                  </h2>
                                  <div
                                    id="flush-collapsecorrectiontwo"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingcorrectiontwo"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <form method="POST">
                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Coupon Type</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel11111"
                                            >
                                              <option selected>
                                                Select Coupon Type
                                              </option>
                                              <option>Coupons with Pan</option>
                                            </select>
                                          </div>
                                          <div class="col-md-6">
                                            <label>
                                              <b>No. of Coupons</b>{" "}
                                              <span class="text-danger">*</span>
                                            </label>
                                            <select
                                              class="form-select"
                                              name="sel22222"
                                              id="sel22222"
                                              type="number"
                                              value={initialAmount}
                                              onChange={(e) =>
                                                setInitialAmount(
                                                  parseInt(e.target.value)
                                                )
                                              }
                                            >
                                              <option selected>
                                                Select No. of Coupons
                                              </option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                            </select>
                                          </div>
                                        </div>
                                        <br />

                                        <div class="row g-3">
                                          <div class="col-md-6">
                                            <label>
                                              <b>Total Amount</b>{" "}
                                            </label>
                                            <label htmlFor="">
                                              {convertAmount(newPan)}
                                            </label>
                                          </div>
                                          <div class="col-md-12">
                                            <button
                                              class="btn btn-primary"
                                              onClick={(e) =>
                                                savePanData("correction pan", e)
                                              }
                                            >
                                              Submit
                                            </button>
                                            &nbsp;&nbsp;
                                            <input
                                              type="reset"
                                              name="submit"
                                              class="btn btn-primary"
                                              value="Reset"
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="accordion-item">
                                  <h2
                                    class="accordion-header"
                                    id="flush-headingcorrectionThree"
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapsecorrectionThree"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseThree"
                                    >
                                      <b>PAN Entry</b>
                                    </button>
                                  </h2>
                                  <br />
                                  <div
                                    id="flush-collapsecorrectionThree"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingcorrectionThree"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <a href="https://www.psaonline.utiitsl.com/psaonline/showLogin">
                                        <b>Continue to UTI PAN Entry</b>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- here correction pan --> */}
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6">
                              <div style={{ padding: "inherit;" }}>
                                <p>
                                  <br />
                                  Need Help?
                                  <br />
                                  <b>Call Us On!!</b> <br />
                                  <b>
                                    <span class="fa fa-phone-square"></span>{" "}
                                    +91-7507173568
                                    <br />
                                  </b>
                                  <b>
                                    <span class="fa fa-envelope"></span>{" "}
                                    shivkalyan.pan@gmail.com
                                    <br />
                                  </b>
                                  (Mon To Friday 10am To 6pm | Sat - 10am to
                                  2pm) Lunch Time 1.30 to 2.20pm
                                  <p />
                                </p>
                              </div>
                              <div class="col-md-6">
                                <div style={{ padding: "inherit;" }}>
                                  <br />
                                  <h5 style={{ color: "red;" }} />
                                  <span
                                    class="fa fa-exclamation-triangle "
                                    style={{ color: "red;" }}
                                  >
                                    Aadhar Card is compulsory for PAN CARD!!
                                  </span>

                                  <b>Forms :</b>
                                  <ul>
                                    <li>
                                      <u>
                                        <a href={downloadLink} download={pdf}>
                                          Correction in PAN Card Form
                                        </a>
                                      </u>
                                      <br />
                                    </li>
                                    <li>
                                      <u>
                                        <a href="" src={pdf1}>
                                          New PAN Card Form (49A)
                                        </a>
                                      </u>
                                      <br />
                                    </li>
                                    <li>
                                      <u>
                                        <a href="upload_frms.php?file={pdf2}">
                                          Sample PAN Card Form
                                        </a>
                                      </u>
                                    </li>
                                  </ul>
                                </div>

                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Pan_UTI;
