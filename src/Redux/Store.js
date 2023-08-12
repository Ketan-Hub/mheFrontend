import rootReducer from "./reducers/combine";


import {createStore} from "redux";



const Store = createStore(rootReducer);
 

export default Store;