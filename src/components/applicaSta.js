import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// import Breadcrumb from "../common/breadcrumb";
// import data from "../../assets/data/listUser";
// import data from "../assets/data/listUser";
// import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { incNumber } from "../Redux/actions";
import Breadcrumb from "./common/breadcrumb";
// import changeNumber from "../../Redux/reducers/reducers";
// import { incNumber } from "../../Redux/actions";

const ApplicaSta = () => {
  // const dispatch = useDispatch()
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector((state) => state.userData.user);
  const pricess = useSelector((state) => state.price.formPrices);
  const navigate = useNavigate();
  // const pricess = useSelector((state) => state.price.formPrices);

  const [user, userId] = useState();

  const getResonseprice = pricess?.filter(
    (ele) => ele.userID == user?.toString()
  );
  const [eGazette_NT, seteGazette_NT] = useState();
  const [eGazette, seteGazette] = useState();
  const [eGazette_OpenOBC, seteGazette_OpenOBC] = useState();
  const [eGazette_SBC, seteGazette_SBC] = useState();
  const [eGazette_SC, seteGazette_SC] = useState();
  const [eGazette_ST, seteGazette_ST] = useState();
  const [eGazette_VJ, seteGazette_VJ] = useState();
  const [foodLicense1year, setfoodLicense1year] = useState();
  const [foodLicense2year, setfoodLicense2year] = useState();
  const [foodLicense3year, setfoodLicense3year] = useState();
  const [individualGST, setindividualGST] = useState();
  const [learningDl_LMV, setlearningDl_LMV] = useState();
  const [learningDl_LMV_TR, setlearningDl_LMV_TR] = useState();
  const [learningDl_MCWG, setlearningDl_MCWG] = useState();
  const [learningDl_MCWG_LMV, setlearningDl_MCWG_LMV] = useState();
  const [learningDl_MCWG_LMVTR, setlearningDl_MCWG_LMVTR] = useState();
  const [learningDl_MCWOG, setlearningDl_MCWOG] = useState();
  const [learningDl_MCWOG_LMV, setlearningDl_MCWOG_LMV] = useState();
  const [learningDl_MCWOG_LMVTR, setlearningDl_MCWOG_LMVTR] = useState();
  const [companyGST, setcompanyGST] = useState();
  const [learningDl_MCWOG_MCWG_LMV, setlearningDl_MCWOG_MCWG_LMV] = useState();
  const [learningDl_MCWOG_MCWG_LMV_TR, setlearningDl_MCWOG_MCWG_LMV_TR] =useState();
  const [panCard, setpanCard] = useState();
  const [passport_Normal, setpassport_Normal] = useState();
  const [passport_Tatkal, setpassport_Tatkal] = useState();
  const [permanent_LMV, setpermanent_LMV] = useState();
  const [permanent_LMV_TR, setpermanent_LMV_TR] = useState();
  const [permanent_MCWG, setpermanent_MCWG] = useState();
  const [permanent_MCWG_LMV, setpermanent_MCWG_LMV] = useState();
  const [permanent_MCWOG_MCWG_LMV_TR, setpermanent_MCWOG_MCWG_LMV_TR] = useState();
  const [renew_LMV, setrenew_LMV] = useState();
  const [renew_MCWG_LMV, setrenew_MCWG_LMV] = useState();
  const [renew_MCWG_LMVTR, setrenew_MCWG_LMVTR] = useState();
  const [renew_MCWOG, setrenew_MCWOG] = useState();
  const [renew_MCWOG_MCWG_LMV_TR, setrenew_MCWOG_MCWG_LMV_TR] = useState();
  const [rentAgreement, setrentAgreement] = useState();
  const [shopActNew, setshopActNew] = useState();
  const [udhamAbhar, setudhamAbhar] = useState();
  const [voterCard, setvoterCard] = useState();
  // const [id , setId]=useState();
  const [Data, SetData] = useState({
    userName:"",
    user: "",
    mode: "offline",
    amount: "",
    isExpence: false,
  });
  const [rechargeData, setRechargeData] = useState([]);

  console.log(455, "users", users);

  const postRechargeData = (e) => {
    e.preventDefault();
    console.log("companyGST at update", companyGST);
    // const paylaod = {
    //   "companyGST" :companyGST || defaultValue,
    // }
    axios
      .put(`https://mhebackend.payagain.in/api/formPrice/${id}`)
      .then((res) => {
        const response = res.data;
        dispatch(incNumber());
        toast.success("Successfully..");
      })
      .catch((err) => console.log(34, err));
  };

  const postRechargeData1 = (e) => {
    e.preventDefault();
    console.log(78, Data);
    console.log(234, "id", id);
    axios
      .get(`https://mhebackend.payagain.in/api/formPrice/${userId}`)
      .then((res) => {
        const response = res.data;
        console.log(response);
        setRechargeData(response);
        dispatch(incNumber());
        toast.success("Successfully..");
      })
      .catch((err) => console.log(34, err));
  };

  return (
    <Fragment>
      <Breadcrumb title="" parent="applicaSta" />
      <Container fluid={true}>
        <Card>
          <CardBody>
            <div id="layoutSidenav_content">
              <main>
                <div class="container-fluid px-4 mt-4">
                  <div class="formlayout">
                    <form action="changeuserpassword_php.php" method="POST">
                      <div class="row g-3">
                        <div class="col-md-6">
                          <div class="form-heading">
                            <label>User</label>
                          </div>
                          <br />

                          <select
                            class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example"
                            onChange={(e) => userId(e.target.value)}
                          >
                            <option selected>Select User</option>

                            {users?.map((item) => {
                              console.log(400, "item", item);
                              return (
                                <option value={item?._id}>{item.name}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div class="col-md-12">
                        &nbsp;&nbsp;
                        <input
                          type="reset"
                          name="submit"
                          class="btn btn-primary"
                          value="Update"
                          onClick={(e) => {
                            postRechargeData(e);
                          }}
                        />
                        &nbsp;&nbsp;
                      </div>

                      <div class="modal fade" id="myModal" role="dialog" />
                      <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"></div>
                    </form>
                  </div>
                  {/* {console.log(getResonseprice, "getResonseprice")} */}
                  <div class="container">
                    <div class="col-sm-10 offset-sm-1 text-center">
                      <h5 class="display-6">
                        <b>Application Charges</b>{" "}
                      </h5>
                    </div>

                    <table className="table m-b-0">
                      <thead>
                        <tr>
                          <th>Application Type</th>
                          {/* <th style={{"marginRight":"10px"}}>Credit</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <label>companyGST</label>
                        <input
                          defaultValue={getResonseprice[0]?.companyGST}
                          onChange={(e) => setcompanyGST(e.target.value)}
                          style={{ marginLeft: "700px" }}
                        />
                        <br />
                        <br />
                        <label>eGazette</label>
                        <input
                          defaultValue={getResonseprice[0]?.eGazette_NT}
                          onChange={(e) => seteGazette_NT(e.target.value)}
                          style={{ marginLeft: "730px" }}
                        />
                        <br />
                        <br />
                        <label>eGazette OpenOBC</label>
                        <input
                          defaultValue={getResonseprice[0]?.eGazette_OpenOBC}
                          onChange={(e) => seteGazette_OpenOBC(e.target.value)}
                          style={{ marginLeft: "658px" }}
                        />
                        <br />
                        <br />
                        <label>eGazette SBC</label>
                        <input
                          defaultValue={getResonseprice[0]?.eGazette_SBC}
                          onChange={(e) => seteGazette_SBC(e.target.value)}
                          style={{ marginLeft: "696px" }}
                        />
                        <br />
                        <br />
                        <label>eGazette SC</label>
                        <input
                          // className="form form-control"
                          defaultValue={getResonseprice[0]?.eGazette_SC}
                          onChange={(e) => seteGazette_SC(e.target.value)}
                          style={{ marginLeft: "704px" }}
                        />
                        <br />
                        <br />
                        <label>eGazette ST</label>
                        <input
                          defaultValue={getResonseprice[0]?.eGazette_ST}
                          onChange={(e) => seteGazette_ST(e.target.value)}
                          style={{ marginLeft: "706px" }}
                        />
                        <br />
                        <br />
                        <label>eGazette VJ</label>
                        <input
                          defaultValue={getResonseprice[0]?.eGazette_VJ}
                          onChange={(e) => seteGazette_VJ(e.target.value)}
                          style={{ marginLeft: "707px" }}
                        />
                        <br />
                        <br />
                        <label>foodLicense1year</label>
                        <input
                          defaultValue={getResonseprice[0]?.foodLicense1year}
                          onChange={(e) => setfoodLicense1year(e.target.value)}
                          style={{ marginLeft: "670px" }}
                        />
                        <br />
                        <br />
                        <label>foodLicense2year</label>
                        <input
                          defaultValue={getResonseprice[0]?.foodLicense2year}
                          onChange={(e) => setfoodLicense2year(e.target.value)}
                          style={{ marginLeft: "670px" }}
                        />
                        <br />
                        <br />
                        <label>foodLicense3year</label>
                        <input
                          defaultValue={getResonseprice[0]?.foodLicense3year}
                          onChange={(e) => setfoodLicense3year(e.target.value)}
                          style={{ marginLeft: "670px" }}
                        />
                        <br />
                        <br />
                        <label>individualGST</label>
                        <input
                          defaultValue={getResonseprice[0]?.individualGST}
                          onChange={(e) => setindividualGST(e.target.value)}
                          style={{ marginLeft: "695px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - Light Motor Vehicle (LMV)</label>
                        <input
                          defaultValue={getResonseprice[0]?.learningDl_LMV}
                          onChange={(e) => setlearningDl_LMV(e.target.value)}
                          style={{ marginLeft: "787px" }}
                        />
                        <br />
                        <br />
                        <label>
                          Learning DL - Light Motor Vehicle Transport (LMV-TR)
                        </label>
                        <input
                          defaultValue={getResonseprice[0]?.learningDl_LMV_TR}
                          onChange={(e) => setlearningDl_LMV_TR(e.target.value)}
                          style={{ marginLeft: "788px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - Light Motor Vehicle (LMV)</label>
                        <input
                          defaultValue={getResonseprice[0]?.learningDl_MCWG}
                          onChange={(e) => setlearningDl_MCWG(e.target.value)}
                          style={{ marginLeft: "788px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - MCWOG + LMV</label>
                        <input
                          defaultValue={getResonseprice[0]?.learningDl_MCWG_LMV}
                          onChange={(e) =>
                            setlearningDl_MCWG_LMV(e.target.value)
                          }
                          style={{ marginLeft: "585px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - MCWG + LMV</label>
                        <input
                          defaultValue={
                            getResonseprice[0]?.learningDl_MCWG_LMVTR
                          }
                          onChange={(e) =>
                            setlearningDl_MCWG_LMVTR(e.target.value)
                          }
                          style={{ marginLeft: "787px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - MCWG + LMV</label>
                        <input
                          defaultValue={getResonseprice[0]?.learningDl_MCWOG}
                          onChange={(e) => setlearningDl_MCWOG(e.target.value)}
                          style={{ marginLeft: "790px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - MCWOG + LMV</label>
                        <input
                          defaultValue={
                            getResonseprice[0]?.learningDl_MCWOG_LMV
                          }
                          onChange={(e) =>
                            setlearningDl_MCWOG_LMV(e.target.value)
                          }
                          style={{ marginLeft: "790px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - MCWG + LMV-TR</label>
                        <input
                          defaultValue={
                            getResonseprice[0]?.learningDl_MCWOG_LMVTR
                          }
                          onChange={(e) =>
                            setlearningDl_MCWOG_LMVTR(e.target.value)
                          }
                          style={{ marginLeft: "791px" }}
                        />
                        <br />
                        <br />

                        <label>Learning DL - MCWOG + MCWG + LMV</label>
                        <input
                          defaultValue={
                            getResonseprice[0]?.learningDl_MCWOG_MCWG_LMV
                          }
                          onChange={(e) =>
                            setlearningDl_MCWOG_MCWG_LMV(e.target.value)
                          }
                          style={{ marginLeft: "793px" }}
                        />
                        <br />
                        <br />
                        <label>Learning DL - MCWOG + MCWG + LMV-TR</label>
                        <input
                          defaultValue={
                            getResonseprice[0]?.learningDl_MCWOG_MCWG_LMV_TR
                          }
                          onChange={(e) =>
                            setlearningDl_MCWOG_MCWG_LMV_TR(e.target.value)
                          }
                          style={{ marginLeft: "794px" }}
                        />
                        <br />
                        <br />
                        <label>panCard</label>
                        <input
                          defaultValue={getResonseprice[0]?.panCard}
                          onChange={(e) => setpanCard(e.target.value)}
                          style={{ marginLeft: "738px" }}
                        />
                        <br />
                        <br />
                        <label>Passport - Normal</label>
                        <input
                          defaultValue={getResonseprice[0]?.passport_Normal}
                          onChange={(e) => setpassport_Normal(e.target.value)}
                          style={{ marginLeft: "676px" }}
                        />
                        <br />
                        <br />
                        <label>Passport - Tatkal</label>
                        <input
                          defaultValue={getResonseprice[0]?.passport_Tatkal}
                          onChange={(e) => setpassport_Tatkal(e.target.value)}
                          style={{ marginLeft: "687px" }}
                        />
                        <br />
                        <br />
                        <label>Permanent DL - Light Motor Vehicle (LMV)</label>
                        <input
                          defaultValue={getResonseprice[0]?.permanent_LMV}
                          onChange={(e) => setpermanent_LMV(e.target.value)}
                          style={{ marginLeft: "802px" }}
                        />
                        <br />
                        <br />
                        <label>
                          Permanent DL - Light Motor Vehicle Transport (LMV-TR)
                        </label>
                        <input
                          defaultValue={getResonseprice[0]?.permanent_LMV_TR}
                          onChange={(e) => setpermanent_LMV_TR(e.target.value)}
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>Permanent DL - MCWOG + MCWG</label>
                        <input
                          defaultValue={getResonseprice[0]?.permanent_MCWG}
                          onChange={(e) => setpermanent_MCWG(e.target.value)}
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />

                        <label>Permanent DL - MCWOG + LMV</label>
                        <input
                          defaultValue={getResonseprice[0]?.permanent_MCWG_LMV}
                          onChange={(e) =>
                            setpermanent_MCWG_LMV(e.target.value)
                          }
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label> Permanent DL - MCWOG + MCWG + LMV</label>
                        <input
                          defaultValue={
                            getResonseprice[0]?.permanent_MCWOG_MCWG_LMV_TR
                          }
                          onChange={(e) =>
                            setpermanent_MCWOG_MCWG_LMV_TR(e.target.value)
                          }
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>Renew DL - Light Motor Vehicle (LMV)</label>
                        <input
                          defaultValue={getResonseprice[0]?.renew_LMV}
                          onChange={(e) => setrenew_LMV(e.target.value)}
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>Renew DL - MCWG + LMV</label>
                        <input
                          defaultValue={getResonseprice[0]?.renew_MCWG_LMV}
                          onChange={(e) => setrenew_MCWG_LMV(e.target.value)}
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>
                          Renew DL - Light Motor Vehicle Transport (LMV-TR)
                        </label>
                        <input
                          defaultValue={getResonseprice[0]?.renew_MCWG_LMVTR}
                          onChange={(e) => setrenew_MCWG_LMVTR(e.target.value)}
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>
                          Renew DL - Motor cycle without Gear (Non Transport)
                          (MCWOG)
                        </label>
                        <input
                          defaultValue={getResonseprice[0]?.renew_MCWOG}
                          onChange={(e) => setrenew_MCWOG(e.target.value)}
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>Renew DL - MCWOG + MCWG + LMV-TR</label>
                        <input
                          defaultValue={
                            getResonseprice[0]?.renew_MCWOG_MCWG_LMV_TR
                          }
                          onChange={(e) =>
                            setrenew_MCWOG_MCWG_LMV_TR(e.target.value)
                          }
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>rentAgreement</label>
                        <input
                          defaultValue={getResonseprice[0]?.rentAgreement}
                          onChange={(e) => setrentAgreement(e.target.value)}
                          style={{ marginLeft: "801px" }}
                        />
                        <br />
                        <br />
                        <label>shopActNew</label>
                        <input
                          defaultValue={getResonseprice[0]?.shopActNew}
                          onChange={(e) => setshopActNew(e.target.value)}
                          style={{ marginLeft: "721px" }}
                        />
                        <br />
                        <br />
                        {/* <label>shopActReNew</label>
                      <input value={shopActReNew}  onChange={(e)=> setshopActReNew(e.target.value)}style={{"marginLeft":"700px"}}/><br/> */}
                        <label>udhamAbhar</label>
                        <input
                          defaultValue={getResonseprice[0]?.udhamAbhar}
                          onChange={(e) => setudhamAbhar(e.target.value)}
                          style={{ marginLeft: "721px" }}
                        />
                        <br />
                        <br />
                        <label>voterCard</label>
                        <input
                          defaultValue={getResonseprice[0]?.voterCard}
                          onChange={(e) => setvoterCard(e.target.value)}
                          style={{ marginLeft: "740px" }}
                        />
                        <br />
                        <br />
                      </tbody>
                    </table>
                
                  </div>
                </div>
              </main>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ApplicaSta;
