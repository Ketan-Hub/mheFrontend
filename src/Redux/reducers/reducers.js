const initilize = 0;

const changeNumber = (state = initilize, action) => {
    switch (action.type) {
        case "INCREMENT":
        console.log(4,"ok")

      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default changeNumber;
