import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import {
  
  setAllForm,
  setFormPrice,
  setRecharge, setUserBalance, setUserExpences, setUsersData,
} from "./actions";
import { toast } from "react-toastify";
import { setVendorProduct } from "./actions";

export default function API() {
  const dispatch = useDispatch();
  
  const reducer = useSelector((state) => state.changeNumber);
  const state = useSelector((state) => state);
  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/recharge`)
      .then((res) => {
        const response = res.data.reverse();
        dispatch(setRecharge(response));
      })
      .catch((err) => console.log(32,err));
    axios
      .get(`https://mhebackend.payagain.in/api/user/getAll`)
      .then((res) => {
        const response = res.data;
        // console.log(37,response)
        dispatch(setUsersData(response));
      })
      .catch((err) => console.log(40,err));
    axios
      .get(`https://mhebackend.payagain.in/api/recharge`)
      .then((res) => {
        const response = res.data;
        console.log(39,response)
        dispatch(setUserBalance(response));
        dispatch(setUserExpences(response));
      })
      .catch((err) => console.log(40,err));
      axios
      .get(`https://mhebackend.payagain.in/api/formPrice`)
      .then((res) => {
        const response = res.data;
        // console.log(39,response)
        dispatch(setFormPrice(response));
       
      })
      .catch((err) => console.log(40,err));
    const userData = JSON.parse(localStorage.getItem("userResponse"));
    axios
      .get("https://mhebackend.payagain.in/api/getAll/Form11")
      .then(async (res) => {
        const data = await res.data;
        dispatch(setAllForm(data))
      })
      .catch((err) => console.log(err));
  }, [reducer]);

  return <></>;
}
