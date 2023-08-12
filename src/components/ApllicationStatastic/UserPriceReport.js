import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function UserPriceReport() {
  const userRespons = JSON.parse(localStorage.getItem("userResponse"));
  const [AllUserFormData, setAllUserFormData] = useState([]);
  const [compGst, setCompGst] = useState([]);
  const [indiGst, setIndiGst] = useState([]);
  const [e_gazzet, sete_Gazzet] = useState([]);
  const [foodLicence, setfoodLicence] = useState([]);
  const [learning, setLearning] = useState([]);
  const [permanant, setpermanant] = useState([]);
  const [renew, setRenew] = useState([]);
  const [ShopAct, setShopAct] = useState([]);
  console.log(11, AllUserFormData);
  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/getAll/Form11`)
      .then(async (res) => {
        const data = await res.data;
        console.log(19, data);
        const Company_Gst = data.filter(
          (item) =>
            item.application_type == "CompanyGST" &&
            item.createdByName === userRespons.user.name
        );
        setCompGst(Company_Gst);
        const individual_Gst = data.filter(
          (item) =>
            item.application_type == "indGST" && item.createdByName === userRespons.user.name
        );
        setIndiGst(individual_Gst);
        const e_Gazzet = data.filter(
          (item) =>
            item.application_type == "e_gazzet" && item.createdByName === userRespons.user.name
        );
        sete_Gazzet(e_Gazzet);
        const foodLicence = data.filter(
          (item) => item.application_type === "foodLicence" && item.createdByName === userRespons.user.name);
        setfoodLicence(foodLicence);
        const Leanning = data.filter(
          (item) => item.apllication_type == "learning" && item.createdByName === userRespons.user.name);
        setLearning(Leanning);
        const permanant = data.filter((item) => item.apllication_type == "permanant" && item.createdByName === userRespons.user.name);
        setpermanant(permanant);
        const renew = data.filter(
          (item) =>
            item.apllication_type == "renew" && item.createdByName === userRespons.user.name
        );
        setRenew(renew);
        const ShopAct = data.filter(
          (item) =>
            item.apllication_type == "shopAct" && item.createdByName === userRespons.user.name
        );
        setShopAct(ShopAct);
      });
    axios.get(`https://mhebackend.payagain.in/api/recharge`).then(async (res) => {
      const data = await res.data;
      const getData = data.filter((item) => item.user === userRespons.user._id);
      setAllUserFormData(getData);
    });
  }, [userRespons]);

  const GetCompanyGstFormPrice = () => {
    let totalCompanyPrice = 0;
    const getCompanyGstPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "companyGST"
    );
    if (getCompanyGstPrice.length > 0) {
      getCompanyGstPrice.forEach((item) => {
        if (item.isExpence === "true") {
          totalCompanyPrice += item.amount;
        }
      });
    }
    return totalCompanyPrice;
  };
  const GetIndividualGstFormPrice = () => {
    let individualGST = 0;
    const getindividualGSTPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "individualGST"
    );
    if (getindividualGSTPrice.length > 0) {
      getindividualGSTPrice.forEach((item) => {
        if (item.isExpence === "true") {
          individualGST += item.amount;
        }
      });
    }
    return individualGST;
  };
  const GeteghazzettFormPrice = () => {
    let individualGST = 0;
    const getindividualGSTPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "eGazzet"
    );
    if (getindividualGSTPrice.length > 0) {
      getindividualGSTPrice.forEach((item) => {
        if (item.isExpence === "true") {
          individualGST += item.amount;
        }
      });
    }
    return individualGST;
  };
  const GetFoodLicenceFormPrice = () => {
    let individualGST = 0;
    const getindividualGSTPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "foodLicence"
    );
    if (getindividualGSTPrice.length > 0) {
      getindividualGSTPrice.forEach((item) => {
        if (item.isExpence === "true") {
          individualGST += item.amount;
        }
      });
    }
    return individualGST;
  };
  const GetLearningDLFormPrice = () => {
    let individualGST = 0;
    const getindividualGSTPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "LearningDL"
    );
    if (getindividualGSTPrice.length > 0) {
      getindividualGSTPrice.forEach((item) => {
        if (item.isExpence === "true") {
          individualGST += item.amount;
        }
      });
    }
    return individualGST;
  };
  const GetpermanantDLFormPrice = () => {
    let individualGST = 0;
    const getindividualGSTPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "PermanatDl"
    );
    if (getindividualGSTPrice.length > 0) {
      getindividualGSTPrice.forEach((item) => {
        if (item.isExpence === "true") {
          individualGST += item.amount;
        }
      });
    }
    return individualGST;
  };
  const GetRenewDLFormPrice = () => {
    let individualGST = 0;
    const getindividualGSTPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "renewDl"
    );
    if (getindividualGSTPrice.length > 0) {
      getindividualGSTPrice.forEach((item) => {
        if (item.isExpence === "true") {
          individualGST += item.amount;
        }
      });
    }
    return individualGST;
  };
  const GetShopActFormPrice = () => {
    let individualGST = 0;
    const getindividualGSTPrice = AllUserFormData.filter(
      (item) => item.expenceFor === "ShopAct"
    );
    if (getindividualGSTPrice.length > 0) {
      getindividualGSTPrice.forEach((item) => {
        if (item.isExpence === "true") {
          individualGST += item.amount;
        }
      });
    }
    return individualGST;
  };
  const companyPrice = GetCompanyGstFormPrice();
  const Individual = GetIndividualGstFormPrice();
  const Egazzet = GeteghazzettFormPrice();
  const foodLice = GetFoodLicenceFormPrice();
  const learnning = GetLearningDLFormPrice();
  const per = GetpermanantDLFormPrice();
  const renewDL = GetRenewDLFormPrice();
  const ShopAc = GetShopActFormPrice();

  return (
    <>
    <div className="text-center" style={{backgroundColor:"#3bc732"}}>
      <h3>Application Statistics </h3>
    </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col border bg-dark">Sr No</th>
            <th scope="col border bg-dark">Application Type</th>
            <th scope="col border bg-dark">Total Forms</th>
            <th scope="col border bg-dark">Form Creadit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Company GST</td>
            <td>{compGst.length}</td>
            <td>{companyPrice}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>individual GST</td>
            <td>{indiGst.length}</td>
            <td>{Individual}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>e-Gazette</td>
            <td>{e_gazzet.length}</td>
            <td>{Egazzet}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>food Licence</td>
            <td>{foodLicence.length}</td>
            <td>{foodLice}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Learning DL</td>
            <td>{learning.length}</td>
            <td>{learnning}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Permanant DL</td>
            <td>{permanant.length}</td>
            <td>{per}</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Renew DL</td>
            <td>{renew.length}</td>
            <td>{renewDL}</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>Shop Act</td>
            <td>{ShopAct.length}</td>
            <td>{ShopAc}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default UserPriceReport;
