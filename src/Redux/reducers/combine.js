import changeNumber from "./reducers";
import { combineReducers } from "redux";
import { UserReducer,rechargeReducer,Userexpences,UserBalance,formsPrices, allFormDatareducer } from "./Index";


const rootReducer = combineReducers({
    changeNumber: changeNumber,
     
    userData: UserReducer,
    recharge : rechargeReducer,
    expence : Userexpences,
    balance : UserBalance,
    price:formsPrices,
    allFormData:allFormDatareducer
  
})


export default rootReducer