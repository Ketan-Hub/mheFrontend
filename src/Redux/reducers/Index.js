import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    recharge: []
}

const allDataInitialState = {
    allFormData:[]
}

const user = {
    users: []
}
const FormPrice = {
    formPrices: []
}
const balance=0
   

const expence=0


export const rechargeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_RECHARGE:
            return { ...state, recharge: payload };
        default:
            return state;
    }

}

export const UserReducer = (state = user, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USERS:
            
            return { ...state, user: payload };
        default:
            return state;
    }

}
export const formsPrices = (state = FormPrice, { type, payload }) => {
    switch (type) {
        case ActionTypes.FORM_AMOUNT:
            
            return { ...state, formPrices: payload };
        default:
            return state;
    }

}
export const allFormDatareducer = (state = allDataInitialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.All_FORM:
            
            return { ...state, allDataInitialState: payload };
        default:
            return state;
    }

}

export const Userexpences = (state = expence, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USERS_EXPENCE:
            {
                payload.forEach(element => {
                    if(element.isExpence){
                        state+= element.amount;
                       }
                });
                return state
            }
        default:
            return state;
    }

}
export const UserBalance = (state = balance, { type, payload }) => {
    console.log(67777,payload)
    switch (type) {
        case ActionTypes.SET_USERS_EXPENCE:
            {
                payload.forEach(element => {
                    if(element.isExpence === false){
                        state+= element.amount;
                       }
                });
                console.log(76666,state)
                return state
            }
        default:
            return state;
    }

}
