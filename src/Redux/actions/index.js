import { ActionTypes } from "../constants/actionTypes";
export const incNumber = () => {
  return {
    type: "INCREMENT",
  };
};
export const decNumber = () => {
  return {
    type: "DECREMENT",
  };
};
export const setRecharge = (recharge) => {
  return {
    type: ActionTypes.SET_RECHARGE,
    payload: recharge,
  };
};

export const setUsersData = (users) => {
  return {
    type: ActionTypes.SET_USERS,
    payload: users,
  };
};
export const setUserBalance = (balances) => {
  return {
    type: ActionTypes.SET_USERS_BALANCE,
    payload: balances,
  };
};
export const setUserExpences = (expences) => {
  return {
    type: ActionTypes.SET_USERS_EXPENCE,
    payload: expences,
  };
};
export const setFormPrice = (price) => {
  return {
    type: ActionTypes.FORM_AMOUNT,
    payload: price,
  };
};
export const setAllForm = (formData) => {
  return {
    type: ActionTypes.All_FORM,
    payload: formData,
  };
};

