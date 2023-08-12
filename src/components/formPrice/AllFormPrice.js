import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Listuser = () => {
  return (
    <Fragment>
      <Breadcrumb title="Create User Passport" parent="Create User Passport" />
      <Container fluid={true}>
        <Card>
          <CardBody>
            <div id="layoutSidenav_content">
              <main>
                <div class="container-fluid px-4 mt-4">
                  <div class="formlayout">
                    <div class="form-heading">
                      <label
                        class="form-control form-control-lg"
                        style={{
                          "background-color": "#337ab7",
                          color: "white",
                        }}
                      >
                        Forms&nbsp;Credit
                      </label>
                    </div>
                    <form
                      class="form-horizontal"
                      action="formcredit_for_user.php"
                      method="POST"
                    >
                      <div class="row g-3">
                        <div class="col-md-6">
                          <br />
                          <input
                            type="text"
                            name="agent"
                            id="agent"
                            value=""
                            data-toggle="modal"
                            data-target="#myModal"
                            class="form-control"
                            placeholder="Click to select User"
                            required
                          />
                          <br />

                          <input
                            type="hidden"
                            name="arefid"
                            id="arefid"
                            class="form-control"
                            value=""
                          />
                        </div>

                        <div class="col-md-6">
                          <br />
                          <button
                            type="submit"
                            class="btn btn-primary"
                            style={{
                              "background-color": "#337ab7",
                              color: "white",
                            }}
                          >
                            {" "}
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="container">
                  <div class="col-sm-10 offset-sm-1 text-center">
                    <h5 class="display-6">
                      <b>Application Charges</b>{" "}
                    </h5>
                  </div>

                  <table class="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th>Application Type</th>
                        <th>Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Shop-Act - Shop-Act New</td>
                        <td>75</td>
                      </tr>
                      <tr>
                        <td>Shop-Act - Shop-Act Renew</td> <td>75</td>
                      </tr>
                      <tr>
                        <td>Udyog-Aadhar - Udyog-Aadhar</td> <td>70</td>
                      </tr>
                      <tr>
                        <td>Company GST - Company GST</td>
                        <td>775</td>
                      </tr>
                      <tr>
                        <td>Rent Agreement - Rent Agreement</td>
                        <td>765</td>
                      </tr>
                      <tr>
                        <td>Individual GST - Individual GST</td> <td>485</td>
                      </tr>
                      <tr>
                        <td>Food License - Food License (1 Year)</td>
                        <td>399</td>
                      </tr>
                      <tr>
                        <td>Food License - Food License (3 Year)</td>
                        <td>699</td>
                      </tr>
                      <tr>
                        <td>Food License - Food License (5 Year)</td>
                        <td>899</td>
                      </tr>
                      <tr>
                        <td>e-Gazette - OPEN/OBC</td>
                        <td>725</td>
                      </tr>
                      <tr>
                        <td>e-Gazette - SC</td> <td>725</td>
                      </tr>
                      <tr>
                        <td>e-Gazette - SBC</td>
                        <td>725</td>
                      </tr>
                      <tr>
                        <td>e-Gazette - ST</td>
                        <td>725</td>
                      </tr>
                      <tr>
                        <td>e-Gazette - VJ</td>
                        <td>725</td>
                      </tr>
                      <tr>
                        <td>e-Gazette - NT</td>
                        <td>725</td>
                      </tr>
                      <tr>
                        <td>Passport - Normal</td>
                        <td>1799</td>
                      </tr>
                      <tr>
                        <td>Passport - Tatkal</td>
                        <td>4580</td>
                      </tr>
                      <tr>
                        <td>
                          Learning DL - Motor cycle without Gear (Non Transport)
                          (MCWOG)
                        </td>
                        <td>420</td>
                      </tr>
                      <tr>
                        <td>
                          Learning DL - Motor Cycle with Gear(Non Transport)
                          (MCWG)
                        </td>
                        <td>420</td>
                      </tr>
                      <tr>
                        <td>Learning DL - Light Motor Vehicle (LMV)</td>
                        <td>475</td>
                      </tr>
                      <tr>
                        <td>
                          Learning DL - Light Motor Vehicle Transport (LMV-TR)
                        </td>
                        <td>499</td>
                      </tr>
                      <tr>
                        <td>Learning DL - MCWOG + MCWG</td>
                        <td>420</td>
                      </tr>
                      <tr>
                        <td>Learning DL - MCWOG + LMV</td>
                        <td>525</td>
                      </tr>
                      <tr>
                        <td>Learning DL - MCWG + LMV</td>
                        <td>525</td>
                      </tr>
                      <tr>
                        <td>Learning DL - MCWOG + MCWG + LMV</td>
                        <td>525</td>
                      </tr>
                      <tr>
                        <td>Learning DL - MCWG + LMV-TR</td>
                        <td>525</td>
                      </tr>
                      <tr>
                        <td>Learning DL - MCWOG + LMV-TR</td>
                        <td>525</td>
                      </tr>
                      <tr>
                        <td>Learning DL - MCWOG + MCWG + LMV-TR</td>
                        <td>525</td>
                      </tr>
                      <tr>
                        <td>
                          Permanent DL - Motor cycle without Gear (Non
                          Transport) (MCWOG)
                        </td>
                        <td>1225</td>
                      </tr>
                      <tr>
                        <td>
                          Permanent DL - Motor Cycle with Gear(Non Transport)
                          (MCWG)
                        </td>
                        <td>1299</td>
                      </tr>
                      <tr>
                        <td>Permanent DL - Light Motor Vehicle (LMV)</td>
                        <td>1325</td>
                      </tr>
                      <tr>
                        <td>
                          Permanent DL - Light Motor Vehicle Transport (LMV-TR)
                        </td>
                        <td>1375</td>
                      </tr>
                      <tr>
                        <td>Permanent DL - MCWOG + MCWG</td>
                        <td>1225</td>
                      </tr>
                      <tr>
                        <td>Permanent DL - MCWOG + LMV</td>
                        <td>1225</td>
                      </tr>
                      <tr>
                        <td>Permanent DL - MCWG + LMV</td>
                        <td> 1299</td>
                      </tr>
                      <tr>
                        <td> Permanent DL - MCWOG + MCWG + LMV</td>
                        <td> 1299</td>
                      </tr>{" "}
                      <tr>
                        <td>Permanent DL - MCWG + LMV-TR</td>
                        <td> 1299</td>
                      </tr>{" "}
                      <tr>
                        <td>Permanent DL - MCWOG + LMV-TR</td>
                        <td>1299</td>
                      </tr>{" "}
                      <tr>
                        <td> Permanent DL - MCWOG + MCWG + LMV-TR</td>
                        <td>1399</td>
                      </tr>{" "}
                      <tr>
                        <td>
                          Renew DL - Motor cycle without Gear (Non Transport)
                          (MCWOG)
                        </td>
                        <td>625</td>
                      </tr>{" "}
                      <tr>
                        <td>
                          Renew DL - Motor Cycle with Gear(Non Transport) (MCWG)
                        </td>
                        <td>625</td>
                      </tr>{" "}
                      <tr>
                        <td>Renew DL - Light Motor Vehicle (LMV)</td>
                        <td>625</td>
                      </tr>{" "}
                      <tr>
                        <td>
                          Renew DL - Light Motor Vehicle Transport (LMV-TR)
                        </td>
                        <td>975</td>
                      </tr>{" "}
                      <tr>
                        <td>Renew DL - MCWOG + MCWG</td>
                        <td> 625</td>
                      </tr>{" "}
                      <tr>
                        <td>Renew DL - MCWOG + LMV</td>
                        <td> 875</td>
                      </tr>{" "}
                      <tr>
                        <td>Renew DL - MCWG + LMV</td>
                        <td> 875</td>
                      </tr>{" "}
                      <tr>
                        <td> Renew DL - MCWOG + MCWG + LMV</td>
                        <td>420</td>
                      </tr>{" "}
                      <tr>
                        <td> Renew DL - MCWG + LMV-TR</td>
                        <td>975</td>
                      </tr>{" "}
                      <tr>
                        <td> Renew DL - MCWOG + LMV-TR</td>
                        <td> 975</td>
                      </tr>{" "}
                      <tr>
                        <td>Renew DL - MCWOG + MCWG + LMV-TR</td>
                        <td> 975</td>
                      </tr>
                      <tr>
                        <td> PAN Card - New PAN Card</td>
                        <td> 129</td>
                      </tr>
                      <tr>
                        <td>Voter Card - Voter Card</td>
                        <td> 50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Listuser;
