// import React from 'react'

// function AdminFormprice() {
//   return (
//     <>

//     </>
//   )
// }

// export default AdminFormprice
import React from "react";
import Breadcrumb from ".././components/common/breadcrumb";
import { Line, Bar } from "react-chartjs-2";
// import {
//   lineChart,
//   chartOptions,
//   areaChart,
//   areaOptions,
//   barOptions,
//   barChart,
//   sellOption,
//   sellData,
//   salesOption,
//   salesData,
// } from "../../constants/chartData";
//import ReportTable from "./report-table";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { useState } from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

const AdminFormprice = () => {
  const users = useSelector((state) => state.userData.user);

    const [Data,setData]=useState({
        userID:"",
        shopActNew:"",
        shopActReNew:"",
        udhamAbhar:"",
        companyGST:"",
        rentAgreement:"",
        individualGST:"",
        foodLicense1year:"",
        foodLicense2year:"",
        foodLicense3year:"",
        eGazette_OpenOBC:"",
        eGazette_SC:"",
        eGazette_SBC:"",
        eGazette_ST:"",
        eGazette_VJ:"",
        eGazette_NT:"",
        passport_Normal:"",
        passport_Tatkal:"",
        learningDl_MCWOG:"",
        learningDl_MCWG:"",
        learningDl_LMV:"",
        learningDl_LMV_TR:"",
        learningDl_MCWOG_MCWG:"",
        learningDl_MCWOG_LMV:"",
        learningDl_MCWG_LMV:"",
        learningDl_MCWOG_MCWG_LMV:"",
        learningDl_MCWG_LMVTR:"",
        learningDl_MCWOG_LMVTR:"",
        learningDl_MCWOG_MCWG_LMV_TR:"",
        permanent_MCWOG:"",
        permanent_MCWG:"",
        permanent_LMV:"",
        permanent_LMV_TR:"",
        permanent_MCWOG_MCWG:"",
        permanent_MCWOG_LMV:"",
        permanent_MCWG_LMV:"",
        permanent_MCWOG_MCWG_LMV:"",
        permanent_MCWG_LMVTR:"",
        permanent_MCWOG_LMVTR:"",
        permanent_MCWOG_MCWG_LMV_TR:"",
        renew_MCWOG:"",
        renew_MCWG:"",
        renew_LMV:"",
        renew_LMV_TR:"",
        renew_MCWOG_MCWG:"",
        renew_MCWOG_LMV:"",
        renew_MCWG_LMV:"",
        renew_MCWOG_MCWG_LMV:"",
        renew_MCWG_LMVTR:"",
        renew_MCWOG_LMVTR:"",
        renew_MCWOG_MCWG_LMV_TR:"",
        panCard:"",
        voterCard:"",

    })
  return (
    <div>
      <Breadcrumb
        title="Application Statistics"
        parent="Application Statistics"
      />
      <Container fluid={true}>
        <Row>
          <Col md="">
            <Card>
              {/* <CardHeader>
								<h5>Application Statistics</h5>
							</CardHeader> */}
              <CardBody className="sell-graph">
                <form
                  class="form-horizontal"
                  action="formcredit_for_user.php"
                  method="POST"
                />
                <div className="row">
                    <div className="col-lg-6">

                  <Form.Item>
                        <Select
                          placeholder="Select User NAme"
                          onChange={(e) => {
                            setData({ ...Data, userID: e });
                          }}
                        >
                            {
                                users?.map((item)=>{
                                    return(
                                        <>
                                        
                                        <Select.Option value={item._id}>{item.name}</Select.Option>
                                        </>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </div>


                </div>

             
                <br />
                <div class="container-fluid px-4">
                  <div class="card mb-4 mt-3">
                    <div class="card-body" id="d_history">
                      <table id="mytab" class="table table-bordered ">
                        <thead>
                          <tr>
                            {" "}
                            <th width="300px">Application Type</th>
                            <th width="300px">Price</th>
                            {/* <th width="200">Agent Margin</th> */}
                          </tr>{" "}
                        </thead>
                        <tbody>
                          <tr>
                            <td>e-Gazette</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Learning DL</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Permanent DL</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Renew DL</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Food Licence</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Passport</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Shop-Act</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Udyam-Aadhar</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>

                          <tr>
                            <td>Voter-Card</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>
                          <tr>
                            <td>EWS</td>
                            <td>
                              <input type="text" name="number" />
                            </td>
                          </tr>
                        </tbody>
                        
                      </table>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminFormprice;
