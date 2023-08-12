import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { incNumber } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

function PanAccept() {
  const dispatch = useDispatch();
  const [coupons, setcoupans] = useState();
  const reducer = useSelector((state) => state.changeNumber);
  const userData = JSON.parse(localStorage.getItem("userResponse"));

  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/panUti`)
      .then((res) => {
        const response = res.data.reverse();
        if (userData.user.role === "retailer") {
          console.log(19, response);
          const filter = response.filter(
            (item) => item.retailerName === userData.user.name
          );
          setcoupans(filter);
          console.log(21, filter);
        } else {
          const filter = response.filter((item) => item.isAccept === "false");
          setcoupans(filter);
          console.log(221, filter);
        }
      })
      .catch((err) => console.log(32, err));
  }, [reducer]);
  const requestAccept = (id) => {
    const getOBj = coupons.filter((item) => item._id === id);
    const obj = {
      NO_coupons: getOBj[0].NO_coupons,
      couponType: getOBj[0].couponType,

      isAccept: true,

      panType: getOBj[0].panType,

      totalAmount: getOBj[0].totalAmount,
    };
    axios
      .put(`https://mhebackend.payagain.in/api/panUti/${id}`, obj)
      .then((res) => {
        dispatch(incNumber());
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      name: "Sr NO",
      style: {
        textAlign: "center",
        fontWaight: "700",
      },
      selector: (row, index) => index + 1,
    },
    {
      name: "Coupan Type ",
      style: {
        textAlign: "center",
        fontWaight: "700",
      },
      selector: (row) => row?.couponType,
    },
    {
      name: "Retailer Name",
      style: {
        textAlign: "center",
        fontWaight: "700",
      },
      selector: (row) => row?.retailerName,
    },
    {
      name: "No Of Coupon ",
      style: {
        textAlign: "center",
        fontWaight: "700",
      },
      selector: (row) => row?.NO_coupons,
    },
    {
      name: "Pan Type",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.panType,
    },
    {
      name: "Status",
      style: {
        textAlign: "center",
        fontWaight: "800",
      },
      selector: (row) => (row?.isAccept === "false" ? "Pending" : "Accepted"),
    },
    {
      name: "Total Amount",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.totalAmount,
    },
    {
      name: "Transaction ID",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.transactionID,
    },
    {
      name: "Accept Coupans",
      style: {
        textAlign: "center",
      },
      selector: (row) => (
        <>
          <i
            class="bi bi-check2-circle fs-3"
            onClick={(e) => {
              requestAccept(row._id);
            }}
          ></i>
        </>
      ),
    },
  ];
  const updatedColumns =
    userData.user.role === "retailer"
      ? columns.filter((col) => col.name !== "Accept Coupans") // Retailer logged in, keep the column
      : [...columns];
  const customStyles = {
    rows: {
      style: {
        border: "1px solid black",
        fontWaight: "700",
        // Add any other CSS properties you want to apply to the rows
      },
    },
    headRow: {
      style: {
        // Add any styles for the header row
        fontWaight: "900",
        fontSize: "13px",
        border: "1px solid black",
        background: "#f36621",
        color: "white",
        wordWrap: "break-word",
      },
    },
    headCells: {
      style: {
        // Add any styles for the header cells
        border: "1px solid black",
      },
    },
    cells: {
      style: {
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
    <div>
      <div className="container">
        {}
        <div className="row">
          <div className="col-lg-12 mt-3 text-center" style={{backgroundColor:"#3bc732"}}>
            <h3 style={{color:"white",fontWeight:"600" ,marginTop:"1rem"}}>Coupan Requests</h3>
          </div>
          <div className="col-lg-12 mt-5">
            <DataTable
              columns={updatedColumns}
              data={coupons}
              pagination
              highlightOnHover
              fixedHeader
              fixedHeaderScrollHeight="600px"
              customStyles={customStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanAccept;
