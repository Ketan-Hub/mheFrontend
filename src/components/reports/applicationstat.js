import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import changeNumber from "../../Redux/reducers/reducers";
import { incNumber } from "../../Redux/actions";

const ApplicaSta = () => {
  // const dispatch = useDispatch()
  const dispatch = useDispatch()
  const { id } = useParams();
  const users = useSelector((state) => state.userData.user);
  const pricess = useSelector((state) => state.price.formPrices);
  const navigate = useNavigate();
  // const pricess = useSelector((state) => state.price.formPrices);

  const [user, userId] = useState();

  const getResonseprice = pricess?.filter((ele) => ele.userID == user?.toString());
  const[eGazette_NT, seteGazette_NT]= useState();
  const[eGazette, seteGazette]= useState();
  const[eGazette_OpenOBC, seteGazette_OpenOBC]= useState();
  const[eGazette_SBC, seteGazette_SBC]= useState();
  const[eGazette_SC, seteGazette_SC]= useState();
  const[eGazette_ST, seteGazette_ST]= useState();
  const[eGazette_VJ, seteGazette_VJ]= useState();
  const[foodLicense1year, setfoodLicense1year]= useState();
  const[foodLicense2year, setfoodLicense2year]= useState();
  const[foodLicense3year, setfoodLicense3year]= useState();
  const[individualGST, setindividualGST]= useState();
  const[learningDl_LMV, setlearningDl_LMV]= useState();
  const[learningDl_LMV_TR, setlearningDl_LMV_TR]= useState();
  const[learningDl_MCWG, setlearningDl_MCWG]= useState();
  const[learningDl_MCWG_LMV, setlearningDl_MCWG_LMV]= useState();
  const[learningDl_MCWG_LMVTR, setlearningDl_MCWG_LMVTR]= useState();
  const[learningDl_MCWOG, setlearningDl_MCWOG]= useState();
  const[learningDl_MCWOG_LMV, setlearningDl_MCWOG_LMV]= useState();
  const[learningDl_MCWOG_LMVTR, setlearningDl_MCWOG_LMVTR]= useState();
  const[companyGST, setcompanyGST]= useState();

  const[learningDl_MCWOG_MCWG_LMV, setlearningDl_MCWOG_MCWG_LMV]= useState();
  const[learningDl_MCWOG_MCWG_LMV_TR, setlearningDl_MCWOG_MCWG_LMV_TR]= useState();
  const[panCard, setpanCard]= useState();
  const[passport_Normal, setpassport_Normal]= useState();
  const[passport_Tatkal, setpassport_Tatkal]= useState();
  const[permanent_LMV, setpermanent_LMV]= useState();
  const[permanent_LMV_TR, setpermanent_LMV_TR]= useState();
  const[permanent_MCWG, setpermanent_MCWG]= useState();
  const[permanent_MCWG_LMV, setpermanent_MCWG_LMV]= useState();
  const[permanent_MCWOG_MCWG_LMV_TR, setpermanent_MCWOG_MCWG_LMV_TR]= useState();
  const[renew_LMV, setrenew_LMV]= useState();
  const[renew_MCWG_LMV, setrenew_MCWG_LMV]= useState();
  const[renew_MCWG_LMVTR, setrenew_MCWG_LMVTR]= useState();
  const[renew_MCWOG, setrenew_MCWOG]= useState();
  const[renew_MCWOG_MCWG_LMV_TR, setrenew_MCWOG_MCWG_LMV_TR]= useState();
  const[rentAgreement, setrentAgreement]= useState();
  const[shopActNew, setshopActNew]= useState();
  const[udhamAbhar, setudhamAbhar]= useState();
  const[voterCard, setvoterCard]= useState();
  // const[shopActReNew, setshopActReNew]= useState();
  
  
// useEffect(()=>{
//   setCompanyGST(getResonseprice[0]?.companyGST)
//   seteGazette_NT(getResonseprice[0]?.eGazette_NT)
//   seteGazette(getResonseprice[0]?.eGazette)
//   seteGazette_OpenOBC(getResonseprice[0]?.eGazette_OpenOBC)
//   seteGazette_SBC(getResonseprice[0]?.eGazette_SBC)
//   seteGazette_SC(getResonseprice[0]?.eGazette_SC)
//   seteGazette_ST(getResonseprice[0]?.eGazette_ST)
//   seteGazette_VJ(getResonseprice[0]?.eGazette_VJ)
//   setfoodLicense1year(getResonseprice[0]?.foodLicense1year)
//   setfoodLicense2year(getResonseprice[0]?.foodLicense2year)
//   setfoodLicense3year(getResonseprice[0]?.foodLicense3year)
//   setlearningDl_LMV(getResonseprice[0]?.learningDl_LMV)
//   setlearningDl_LMV_TR(getResonseprice[0]?.learningDl_LMV_TR)
//   setlearningDl_MCWG(getResonseprice[0]?.learningDl_MCWG)
//   setlearningDl_MCWG_LMV(getResonseprice[0]?.learningDl_MCWG_LMV)
//   setlearningDl_MCWG_LMVTR(getResonseprice[0]?.learningDl_MCWG_LMVTR)
//   setlearningDl_MCWOG(getResonseprice[0]?.learningDl_MCWOG)
//   setlearningDl_MCWOG_LMV(getResonseprice[0]?.learningDl_MCWOG_LMV)
//   setlearningDl_MCWOG_LMVTR(getResonseprice[0]?.learningDl_MCWOG_LMVTR)
//   setlearningDl_MCWOG_MCWG_LMV(getResonseprice[0]?.learningDl_MCWOG_MCWG_LMV)
//   setlearningDl_MCWOG_MCWG_LMV_TR(getResonseprice[0]?.learningDl_MCWOG_MCWG_LMV_TR)
//   setpanCard(getResonseprice[0]?.panCard)
//   setpassport_Normal(getResonseprice[0]?.passport_Normal)
//   setpassport_Tatkal(getResonseprice[0]?.passport_Tatkal)
//   setpermanent_LMV(getResonseprice[0]?.permanent_LMV)
//   setpermanent_LMV_TR(getResonseprice[0]?.permanent_LMV_TR)
//   setpermanent_MCWG(getResonseprice[0]?.permanent_MCWG)
//   setpermanent_MCWG_LMV(getResonseprice[0]?.permanent_MCWG_LMV)
//   setpermanent_MCWOG_MCWG_LMV_TR(getResonseprice[0]?.permanent_MCWOG_MCWG_LMV_TR)
//   setrenew_LMV(getResonseprice[0]?.renew_LMV)
//   setrenew_MCWG_LMVTR(getResonseprice[0]?.renew_MCWG_LMVTR)
//   setrenew_MCWOG(getResonseprice[0]?.renew_MCWOG)
//   setrenew_MCWOG_MCWG_LMV_TR(getResonseprice[0]?.renew_MCWOG_MCWG_LMV_TR)
//   setrentAgreement(getResonseprice[0]?.rentAgreement)
//   setshopActNew(getResonseprice[0]?.shopActNew)
//   setudhamAbhar(getResonseprice[0]?.udhamAbhar)
//   setvoterCard(getResonseprice[0]?.voterCard)
//   // shopActReNew(getResonseprice[0]?.shopActReNew)

// },[getResonseprice])





  console.log('====================================================');
  console.log('userID', user)
  console.log(233333, "getResonseprice", getResonseprice)
  console.log(233333, "pricess", pricess);
  console.log("companyGST:",companyGST)

  console.log('====================================================');



  // const [id , setId]=useState();
  const [Data, SetData] = useState({
    user: "",
    mode: "offline",
    amount: "",
    isExpence: false,
  });
  const [rechargeData, setRechargeData] = useState([])

  console.log(455, 'users', users);

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
    console.log(234, 'id', id)
    axios
      .get(`https://mhebackend.payagain.in/api/formPrice/${userId}`)
      .then((res) => {
        const response = res.data;
        console.log(response)
        setRechargeData(response);
        dispatch(incNumber());
        toast.success("Successfully..");

      })
      .catch((err) => console.log(34, err));
  };

  // const data = {
  //   "shopActNew": 34,
  //   "shopActReNew": 75,
  //   // ... (rest of the data)
  //   "panCard": 129,
  //   "voterCard": 50,
  // ];

  // const data = {
  //   "shopActNew": 75,
  //   "shopActReNew": 75,
  //   // ... (rest of the data)
  //   "panCard": 129,
  //   "voterCard": 50,
  // };
  // const columns = [
  //   {
  //     name: "Sr NO",
  //     style: {
  //       textAlign: "center",
  //       fontWaight: "700"
  //     },
  //     selector: (row, index) => index + 1,
  //   },
  //   {
  //     name: "EWS ",
  //     style: {
  //       textAlign: "center",
  //       fontWaight: "700"
  //     },
  //     selector: (row) => row?.EWS,
  //   },

  //   {
  //     name: "shopActNew",
  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.shopActNew,
  //   },

  //   {
  //     selector: (row) => row?.shopActNew
  //   },

  //   {
  //     name: "shopActReNew",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.shopActReNew
  //   },

  //   {
  //     name: "udhamAbhar",
  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.udhamAbhar
  //   },
  //   {
  //     name: "companyGST", styl

  //       :
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.companyGST
  //   },
  //   {
  //     name: "rentAgreement",
  //     style: {
  //       textAlign: "center",
  //     },

  //     selector: (row) => row?.rentAgreement
  //   },
  //   {
  //     name: "individualGST",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.individualGST
  //   },
  //   {
  //     name: "foodLicense1year",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.foodLicense1year
  //   },
  //   {
  //     name: "foodLicense2year",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.foodLicense2year,
  //   },
  //   {
  //     name: "foodLicense3year",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.foodLicense3year
  //   },
  //   {
  //     name: "eGazette_OpenOBC",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.eGazette_OpenOBC
  //   },
  //   {
  //     name: "eGazette_SC", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.eGazette_SC
  //   },

  //   {
  //     name: "eGazette_ST", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.eGazette_ST
  //   },
  //   {
  //     name: "eGazette_VJ", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.eGazette_VJ
  //   },
  //   {
  //     name: "eGazette_NT", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.eGazette_NT
  //   },
  //   {
  //     name: "passport_Normal",

  //     style:
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.passport_Normal
  //   },
  //   {
  //     name: "passport_Tatkal",

  //     style:
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.passport_Tatkal
  //   },
  //   {
  //     name: "learningDl_MCWOG",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWOG
  //   },
  //   {
  //     name: "learningDl_MCWG",

  //     style:
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWG
  //   },
  //   {
  //     name: "learningDl_LMV",

  //     tyle:
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_LMV
  //   },
  //   {
  //     name: "learningDl_LMV_T",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_LMV_T
  //   },
  //   {
  //     name: "learningDl_MCWOG",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWOG
  //   },
  //   {
  //     name: "learningDl_MCWO",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWO
  //   },
  //   {
  //     name: "learningDl_MCWG_",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWG_
  //   },
  //   {
  //     name: "learningDl_MCWO",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWO
  //   },
  //   {
  //     name: "learningDl_MCWG_",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWG_
  //   },
  //   {
  //     name: "learningDl_MCWO",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWO
  //   },
  //   {
  //     name: "learningDl_MCWO",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.learningDl_MCWO
  //   },
  //   {
  //     name: "permanent_MCWOG",

  //     style:
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWOG
  //   },
  //   {
  //     name: "permanent_MCWG",

  //     style:
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWG
  //   },
  //   {
  //     name: "permanent_LMV",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_LMV
  //   },
  //   {
  //     name: "permanent_LMV_T",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_LMV_T
  //   },
  //   {
  //     name: "permanent_MCWOG",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWOG
  //   },
  //   {
  //     name: "permanent_MCWOG_",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWOG_
  //   },
  //   {
  //     name: "permanent_MCWG_",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWG_
  //   },
  //   {
  //     name: "permanent_MCWOG",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWOG
  //   },
  //   {
  //     name: "permanent_MCWG_",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWG_
  //   },
  //   {
  //     name: "permanent_MCWOG_",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.permanent_MCWOG_
  //   },

  //   {
  //     name: "renew_MCWOG",
  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWOG
  //   },

  //   {
  //     name: "renew_MCWG", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWG
  //   },
  //   {
  //     name: "renew_LMV", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_LMV
  //   },
  //   {
  //     name: "renew_LMV_TR", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_LMV_TR
  //   },
  //   {
  //     name: "renew_MCWOG_MCWG",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWOG_MCWG
  //   },
  //   {
  //     name: "renew_MCWOG_LM",
  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWOG_LM
  //   },
  //   {
  //     name: "renew_MCWG_LMV",

  //     style:
  //     {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWG_LMV
  //   },
  //   {
  //     name: "renew_MCWOG_MCW",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWOG_MCW
  //   },
  //   {
  //     name: "renew_MCWG_LMVT",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWG_LMVT
  //   },
  //   {
  //     name: "renew_MCWOG_LM",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWOG_LM
  //   },
  //   {
  //     name: "renew_MCWOG_MC",

  //     style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.renew_MCWOG_MC
  //   },
  //   {
  //     name: "panCard", style

  //       : {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.panCard
  //   },
  //   {
  //     name: "voterCard", style: {
  //       textAlign: "center",
  //     },
  //     selector: (row) => row?.svoterCardh
  //   }
  // ];

  

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
                              console.log(400, 'item', item);
                              return (

                                <option
                                  value={item?._id}

                                >
                                  {item.name}
                                </option>

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
                    <h5 class="display-6"><b>Application Charges</b> </h5>
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
                      <input defaultValue={getResonseprice[0]?.companyGST}  onChange={(e)=> setcompanyGST(e.target.value)} style={{"marginLeft":"700px"}}  /><br/><br/>
                      <label>eGazette</label>
                      <input defaultValue={getResonseprice[0]?.eGazette_NT}  onChange={(e)=> seteGazette_NT(e.target.value)}style={{"marginLeft":"730px"}}/><br/><br/>
                      <label>eGazette OpenOBC</label>
                      <input defaultValue={getResonseprice[0]?.eGazette_OpenOBC}  onChange={(e)=> seteGazette_OpenOBC(e.target.value)}style={{"marginLeft":"658px"}}/><br/><br/>
                      <label>eGazette SBC</label>
                      <input defaultValue={getResonseprice[0]?.eGazette_SBC}  onChange={(e)=> seteGazette_SBC(e.target.value)}style={{"marginLeft":"696px"}}/><br/><br/>
                      <label>eGazette SC</label>
                      <input defaultValue={getResonseprice[0]?.eGazette_SC}  onChange={(e)=> seteGazette_SC(e.target.value)}style={{"marginLeft":"704px"}}/><br/><br/>
                      <label>eGazette ST</label>
                      <input defaultValue={getResonseprice[0]?.eGazette_ST}  onChange={(e)=> seteGazette_ST(e.target.value)}style={{"marginLeft":"706px"}}/><br/><br/>
                      <label>eGazette VJ</label>
                      <input defaultValue={getResonseprice[0]?.eGazette_VJ}  onChange={(e)=> seteGazette_VJ(e.target.value)}style={{"marginLeft":"707px"}}/><br/><br/>
                      <label>foodLicense1year</label>
                      <input defaultValue={getResonseprice[0]?.foodLicense1year}  onChange={(e)=> setfoodLicense1year(e.target.value)}style={{"marginLeft":"670px"}}/><br/><br/>
                      <label>foodLicense2year</label>
                      <input defaultValue={getResonseprice[0]?.foodLicense2year}  onChange={(e)=> setfoodLicense2year(e.target.value)}style={{"marginLeft":"670px"}}/><br/><br/>
                      <label>foodLicense3year</label>
                      <input defaultValue={getResonseprice[0]?.foodLicense3year}  onChange={(e)=> setfoodLicense3year(e.target.value)}style={{"marginLeft":"670px"}}/><br/><br/>
                      <label>individualGST</label>
                      <input defaultValue={getResonseprice[0]?.individualGST}  onChange={(e)=> setindividualGST(e.target.value)}style={{"marginLeft":"695px"}}/><br/><br/>
                      <label>Learning DL - Light Motor Vehicle (LMV)</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_LMV}  onChange={(e)=> setlearningDl_LMV(e.target.value)}style={{"marginLeft":"787px"}}/><br/><br/>
                      <label>Learning DL - Light Motor Vehicle Transport (LMV-TR)</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_LMV_TR}  onChange={(e)=> setlearningDl_LMV_TR(e.target.value)}style={{"marginLeft":"788px"}}/><br/><br/>
                      <label>Learning DL - Light Motor Vehicle (LMV)</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWG}  onChange={(e)=> setlearningDl_MCWG(e.target.value)}style={{"marginLeft":"788px"}}/><br/><br/>
                      <label>Learning DL - MCWOG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWG_LMV}  onChange={(e)=> setlearningDl_MCWG_LMV(e.target.value)}style={{"marginLeft":"585px"}}/><br/><br/>
                      <label>Learning DL - MCWG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWG_LMVTR}  onChange={(e)=> setlearningDl_MCWG_LMVTR(e.target.value)}style={{"marginLeft":"787px"}}/><br/><br/>
                      <label>Learning DL - MCWG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWOG}  onChange={(e)=> setlearningDl_MCWOG(e.target.value)}style={{"marginLeft":"790px"}}/><br/><br/>
                      <label>Learning DL - MCWOG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWOG_LMV}  onChange={(e)=> setlearningDl_MCWOG_LMV(e.target.value)}style={{"marginLeft":"790px"}}/><br/><br/>
                      <label>Learning DL - MCWG + LMV-TR</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWOG_LMVTR}  onChange={(e)=> setlearningDl_MCWOG_LMVTR(e.target.value)}style={{"marginLeft":"791px"}}/><br/><br/>
                      
                      <label>Learning DL - MCWOG + MCWG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWOG_MCWG_LMV}  onChange={(e)=> setlearningDl_MCWOG_MCWG_LMV(e.target.value)}style={{"marginLeft":"793px"}}/><br/><br/>
                      <label>Learning DL - MCWOG + MCWG + LMV-TR</label>
                      <input defaultValue={getResonseprice[0]?.learningDl_MCWOG_MCWG_LMV_TR}  onChange={(e)=> setlearningDl_MCWOG_MCWG_LMV_TR(e.target.value)}style={{"marginLeft":"794px"}}/><br/><br/>
                      <label>panCard</label>
                      <input defaultValue={getResonseprice[0]?.panCard}  onChange={(e)=> setpanCard(e.target.value)}style={{"marginLeft":"738px"}}/><br/><br/>
                      <label>Passport - Normal</label>
                      <input defaultValue={getResonseprice[0]?.passport_Normal}  onChange={(e)=> setpassport_Normal(e.target.value)}style={{"marginLeft":"676px"}}/><br/><br/>
                      <label>Passport - Tatkal</label>
                      <input defaultValue={getResonseprice[0]?.passport_Tatkal}  onChange={(e)=> setpassport_Tatkal(e.target.value)}style={{"marginLeft":"687px"}}/><br/><br/>
                      <label>Permanent DL - Light Motor Vehicle (LMV)</label>
                      <input defaultValue={getResonseprice[0]?.permanent_LMV}  onChange={(e)=> setpermanent_LMV(e.target.value)}style={{"marginLeft":"802px"}}/><br/><br/>
                      <label>Permanent DL - Light Motor Vehicle Transport (LMV-TR)</label>
                      <input defaultValue={getResonseprice[0]?.permanent_LMV_TR}  onChange={(e)=> setpermanent_LMV_TR(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>Permanent DL - MCWOG + MCWG</label>
                      <input defaultValue={getResonseprice[0]?.permanent_MCWG}  onChange={(e)=> setpermanent_MCWG(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                     
                      <label>Permanent DL - MCWOG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.permanent_MCWG_LMV}  onChange={(e)=> setpermanent_MCWG_LMV(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label> Permanent DL - MCWOG + MCWG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.permanent_MCWOG_MCWG_LMV_TR}  onChange={(e)=> setpermanent_MCWOG_MCWG_LMV_TR(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>Renew DL - Light Motor Vehicle (LMV)</label>
                      <input defaultValue={getResonseprice[0]?.renew_LMV}  onChange={(e)=> setrenew_LMV(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>Renew DL - MCWG + LMV</label>
                      <input defaultValue={getResonseprice[0]?.renew_MCWG_LMV}  onChange={(e)=> setrenew_MCWG_LMV(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>Renew DL - Light Motor Vehicle Transport (LMV-TR)</label>
                      <input defaultValue={getResonseprice[0]?.renew_MCWG_LMVTR}  onChange={(e)=> setrenew_MCWG_LMVTR(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>Renew DL - Motor cycle without Gear (Non Transport) (MCWOG)</label>
                      <input defaultValue={getResonseprice[0]?.renew_MCWOG}  onChange={(e)=> setrenew_MCWOG(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>Renew DL - MCWOG + MCWG + LMV-TR</label>
                      <input defaultValue={getResonseprice[0]?.renew_MCWOG_MCWG_LMV_TR}  onChange={(e)=> setrenew_MCWOG_MCWG_LMV_TR(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>rentAgreement</label>
                      <input defaultValue={getResonseprice[0]?.rentAgreement}  onChange={(e)=> setrentAgreement(e.target.value)}style={{"marginLeft":"801px"}}/><br/><br/>
                      <label>shopActNew</label>
                      <input defaultValue={getResonseprice[0]?.shopActNew}  onChange={(e)=> setshopActNew(e.target.value)}style={{"marginLeft":"721px"}}/><br/><br/>
                      {/* <label>shopActReNew</label>
                      <input value={shopActReNew}  onChange={(e)=> setshopActReNew(e.target.value)}style={{"marginLeft":"700px"}}/><br/> */}
                      <label>udhamAbhar</label>
                      <input defaultValue={getResonseprice[0]?.udhamAbhar}  onChange={(e)=> setudhamAbhar(e.target.value)}style={{"marginLeft":"721px"}}/><br/><br/>
                      <label>voterCard</label>
                      <input defaultValue={getResonseprice[0]?.voterCard}  onChange={(e)=> setvoterCard(e.target.value)}style={{"marginLeft":"740px"}}/><br/><br/>

                      {/* <DataTable
                        columns={columns}
                        data={getResonseprice}
                        pagination={getResonseprice.length > 10 ? true : false}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                      /> */}
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