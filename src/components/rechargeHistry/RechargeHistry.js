import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

function RechargeHistry() {
  const userRespons = JSON.parse(localStorage.getItem("userResponse"));
  const [filter, setFilter] = useState();
  const recharge = useSelector((state) => state.recharge.recharge);
  console.log(15, recharge);
  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/recharge`)
      .then((res) => {
        const response = res.data;
        console.log(17, response);
        if (userRespons.user.role == "admin") {
          const alldata = response.filter((item) => item.isExpence == "false");
          setFilter(alldata);
        } else if (userRespons.user.role == "retailer") {
          const retailerData = response.filter(
            (item) =>
              item.isExpence == "false" && item.user == userRespons.user._id
          );
          setFilter(retailerData);
        }
      })
      .catch((err) => console.log(40, err));
  }, []);

  const rechargeColumn = [
    {
      name: "Sr NO",
      style: {
        textAlign: "center",
        fontWaight: "700",
      },
      selector: (row, index) => index + 1,
    },
    {
      name: "User ",
      style: {
        textAlign: "center",
        fontWaight: "700",
      },
      selector: (row) => row?.userName,
    },
    {
      name: "Mode",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.mode,
    },
    {
      name: "Amount",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.amount,
    },
  ];
  const customStyles = {
    rows: {
      style: {
        border: "1px solid black",
        fontWaight: "900",
        // Add any other CSS properties you want to apply to the rows
        fontSize: "22px",
      },
    },
    headRow: {
      style: {
        // Add any styles for the header row
        fontWaight: "900",
        fontSize: "15px",
        border: "1px solid black",
        background: "#f36621",
        color: "white",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        // Add any styles for the header cells
        fontSize: "18px",
        border: "1px solid black",
      },
    },
    cells: {
      style: {
        fontSize: "18px",
        color: "black",
        // Add any styles for the regular cells
        border: "1px solid black",
      },
    },
    pagination: {
      style: {
        // Add any styles for the pagination section
        border: "1px solid black",
      },
    },
  };

  return (
    <div className="mt-5 text-center" >
      <h2
        className="mt-5"
        style={{ backgroundColor: "#3bc732", marginTop: "25rem",color:"white",borderRedius:"10px" }}
      >
        Recharge History
      </h2>
      <div className="row mt-5 fs-6 ">
        <DataTable
          className="border "
          columns={rechargeColumn}
          data={filter}
          pagination={filter?.length > 10 ? true : false}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default RechargeHistry;
