import react from "react";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { Form } from "antd";
import scanner1 from "../../assets/images/scanner.jpg";

const Recharge_details = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Breadcrumb title={"Portal Wallet Recharge"} parent={"Recharge"} />
      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <Form name="basic" autoComplete="off" layout={"vertical"}>
                    <div id="layoutSidenav_content">
                      <main>
                        <div class="container-fluid px-4 mt-4">
                          <div class="formlayout">
                            <div class="form-heading">
                              <label
                                class="form-control form-control-lg"
                                style={{
                                  "background-color": " rgb(56 145 36)",
                                  color: "black",
                                }}
                              >
                                <span style={{ fontSize: "1rem" }}>
                                  Recharge
                                </span>
                              </label>
                            </div>
                            <div>
                              <div>
                                <center>
                                  <p style={{ fontSize: "1rem",fontWeight:"bold" }}>
                                    रिचार्ज झाल्याची खात्री करण्यासाठी पैसे
                                    ट्रान्सफर केल्यावर 9373499415 या नंबरवर call
                                    करा व स्क्रीन शॉट पाठवा.{" "}
                                  </p>
                                </center>
                              </div>
                              <table>
                                <thead></thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <br />
                                      <p style={{ fontSize: "1rem" }}>
                                        पोर्टल रिचार्ज करण्यासाठी या बँक
                                        खात्यामध्ये पैसे जमा करावे
                                      </p>

                                      <p style={{ fontSize: "1rem" }}>
                                        Account No : 474805000103
                                        <br />
                                        IFSC Code : ICIC0004748
                                        <br />
                                        Bank Name :- ICICI BANK
                                        <p />
                                        <td />
                                        <div
                                          style={{
                                            marginTop: "-143px",
                                            padding: "10px 10px",
                                          }}
                                        >
                                          <td>
                                            <div
                                              class="rounded  border border-warning  text-white text-center "
                                              style={{
                                                height: "70px",
                                                width: " 200px",
                                                backgroundColor: "#ffbc58",
                                              }}
                                            >
                                              <h6 class="mt-3">
                                                <i class="fab fa-google-pay text-white "></i>{" "}
                                                <b>Google Pay / गुगल पे</b>
                                              </h6>
                                              <p>
                                                <span class="fa fa-phone-square "></span>{" "}
                                               <b> 8855857273</b>
                                              </p>
                                            </div>
                                          </td>
                                          <td>
                                            <div
                                              class="rounded  border border-danger text-center "
                                              style={{
                                                height: "70px",
                                                width: "200px",
                                                backgroundColor: "#00ffff",
                                              }}
                                            >
                                              <h6 class="mt-3">
                                                {" "}
                                               <b>Phone Pay / फोन पे</b> 
                                              </h6>
                                              <p>
                                                <span class="fa fa-phone-square "></span>{" "}
                                                8855857273
                                              </p>
                                            </div>
                                          </td>
                                          <td>
                                            <img
                                              src={scanner1}
                                              style={{
                                                height: "500px",
                                                marginLeft: "226px",
                                              }}
                                            />
                                          </td>
                                        </div>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <footer class="py-4 bg-light mt-auto">
                                <div class="container-fluid px-4">
                                  <div class="d-flex align-items-center justify-content-between small">
                                    <div class="text-muted">
                                      Copyright &copy; 2021 World Blazings
                                      Solutions. All Right Reserved
                                    </div>
                                  </div>
                                </div>
                              </footer>
                            </div>
                          </div>
                        </div>
                      </main>
                    </div>
                  </Form>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
          
    </>
  );
};

export default Recharge_details;
