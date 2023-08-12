import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { incNumber } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Select } from "antd";

function AgentRequests() {
  const dispatch = useDispatch();
  const [Data, setData] = useState();
  const [reqAccept, setreqAccept] = useState();
  const [AcceptedData, setAcceptData] = useState();
  const [AllData, setAllData] = useState();
  let i = 0;
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const reducer = useSelector((state) => state.changeNumber);

  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/withdrowWallet`)
      .then((res) => {
        const response = res.data.reverse();
        if (userData.user.role === "agent") {
          const singleAgent = response.filter(
            (item) => item.agentId === userData.user._id
          );
          setData(singleAgent);
        } else {
          setData(response);
          setAllData(response);
        }

        // console.log(12, response);
        // const FilterData = response.filter(
        //   (item) => item.isAcceted === "false"
        // );
      })
      .catch((err) => console.log(32, err));
  }, [reducer]);
  // if (userData.user.role=="agent") {
  //   const GetDatabyUser=AllData.filter((item=>item.agentId===userData.user._id))
  //   console.log(21,GetDatabyUser)
  //   setData(GetDatabyUser)

  // }
  const AcceptRequest = (id) => {
    const getOBj = Data.filter((item) => item._id === id);
    console.log(29, getOBj);

    const obj = {
      agentId: getOBj[0].agentId,
      agentName: getOBj[0].agentName,
      creaditAmount: getOBj[0].withdrowReqAmount,
      isWithdrowl: true,
      isrequest: false,
      creaditFor: "Accepted",
      creaditBy: "Admin",
    };
    axios
      .post(`https://mhebackend.payagain.in/api/wallet/create`, obj)
      .then((res) => {
        const response = res;
        dispatch(incNumber());
        toast.success("Request Accepted Succesfully.....");
      })
      .catch((err) => {
        console.log(err);
      });

    const obj1 = {
      ...getOBj,
      isAcceted: "true",
      status: "Accepted",
    };
    axios
      .put(`https://mhebackend.payagain.in//api/withdrowWalletlet/${id}`, obj1)
      .then((res) => {
        const response = res;
        dispatch(incNumber());
        // toast.success("Request Accepted Succesfully.....");
        i++;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "New",
      selector: (row, i) => i + 1,
    },

    {
      name: "Send Request By ",
      selector: (row) => row.agentName,
    },
    {
      name: "Request Amount",
      selector: (row) => row.withdrowReqAmount,
    },
    {
      name: "note ",
      selector: (row) => row.note,
    },
    {
      name: "status ",
      selector: (row) => row.status,
    },
    {
      name: "Date ",
      selector: (row) => Date(row.createdAt),
    },

    {

      name: "Accept Request  ",
      selector: (row) => (
        <>
          {row.status === "Accepted" || userData.user.role=="agent"  ? (
            ""
          ) : (
            <>
              <button
                className="btn btn-outline-dark"
                onClick={(e) => AcceptRequest(row._id)}
              >
                Accept{" "}
              </button>
            </>
          )}
        </>
      ),
    },
  ];

  const SetStatus = (e) => {

  console.log(1333339999,e)
    // switch (e) {
    //   case "ALL":
    //     setData(AllData);

    //     break;
    //   case "PENDING":
      
    //     const pendding = Data.filter((item) => item.isAcceted === "false");
    //     setData(pendding);

    //     break;
    //   case "ACCEPTED":
    //     const FilterData = Data.filter((item) => item.isAcceted === "true");
    //     setData(FilterData);

    //     break;

    //   default:
    //     break;
    // }

    if (e=="All") {
      setData(AllData);
    }else if (e=="PENDING") {
      const pendding = Data.filter((item) => item.isAcceted === "false");
          setData(pendding);
    } else if (e==="ACCEPTED") {
      console.log("ok")
      const FilterData = Data.filter((item) => item.isAcceted === "true");
        setData(FilterData);
        
    }
    return (<> <DataTable columns={columns} data={Data} pagination={true} /> </>)
  };

  return (
    <>
      {userData.user.role === "admin" ? (
        <>
          <div className="col-md-4">
            <label htmlFor="" className="mb-3">
              {" "}
              Application Status
              <span className="red">*</span>
            </label>
            <Form.Item>
              <Select
                placeholder="--Select Application Stauts--"
                onChange={(e) => SetStatus(e)}
              >
                <Select.Option value="ALL">ALL</Select.Option>
                <Select.Option value="PENDING">PENDING</Select.Option>
                <Select.Option value="ACCEPTED">ACCEPTED</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </>
      ) : (
        <>
          {/* <div className="col-md-4">
            <label htmlFor="" className="mb-3">
              {" "}
              Application Status
              <span className="red">*</span>
            </label>
            <Form.Item>
              <Select
                placeholder="--Select Application Stauts--"
                onChange={(e) => SetStatus(e)}
              >
           
                <Select.Option value="PENDING">PENDING</Select.Option>
                <Select.Option value="ACCEPTED">ACCEPTED</Select.Option>
              </Select>
            </Form.Item>
          </div> */}

          
        </>
      )}
      
    <DataTable columns={columns} data={Data} pagination={true} />
      
    </>
  );
}

export default AgentRequests;
