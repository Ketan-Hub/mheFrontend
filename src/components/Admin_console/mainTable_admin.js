import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { MdReceipt } from "react-icons/md";

const MainTable_admin = ({ FilteredData }) => {
  const navigate = useNavigate();
  const dateSeter = (date) => {
    const monthLater = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate() + 1;
    return `${day} ${monthLater[month]} ${year}`;
  };
  const customStyles = {
    rows: {
      style: {
        border: "1px solid black",
        // Add any other CSS properties you want to apply to the rows
      },
    },
    headRow: {
      style: {
        // Add any styles for the header row
        border: "1px solid black",
        backgroundColor: "	skyblue	",
        color: "white",
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
  };

  const receiptFun = (id) => {
    navigate(`${process.env.PUBLIC_URL}/receipt/${id}`);
  };

  const columns = [
    {
      name: "New",
      width: "150px",

      selector: (row, i) => (
        <div
          className="d-flex justify-content-space-between"
          style={{
            fontWeight: row?.isNew ? "bold" : "",
          }}
        >
          {i + 1} {row.isNew ? <div className="new">New</div> : <></>}
        </div>
      ),
    },
    {
      name: "Application-Type",
      selector: (row) => {
        if (row.application_type == "learning") {
          return (
            <div   style={{
              fontWeight: row?.isNew ? "bold" : "",
            }}>
              {" "}
              <button
                type="button "
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                }}
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_learning/${row._id}`
                  )
                }
              >
                Learning DL
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </div>
          );
        } else if (row.application_type == "permanant") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_permanent/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                permanent DL
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "renew") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_renewal/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                {" "}
                Renew DL{" "}
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "e_gazzet") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_eGazzet/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                {" "}
                e_gazette
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "foodLicence") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_foodLicence/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                {" "}
                Food Licence
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "CompanyGST") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_compGST/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                {" "}
                companyGST
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "indGST") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_indiGST/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                individualGST{" "}
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "passport") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_passport/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                passport{" "}
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "shopAct") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_shopAct/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                shopAct{" "}
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "udhamAdhar") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_udhamadhar/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                UdhamAdhar{" "}
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else if (row.application_type == "voterCard") {
          return (
            <>
              <button
                type="button "
                onClick={() =>
                  navigate(
                    `${process.env.PUBLIC_URL}/application_voterCard/${row._id}`
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "underline #64fa37 30% ",
                  fontWeight: row?.isNew ? "bold" : "",
                }}
              >
                voter Card{" "}
              </button>
              <MdReceipt onClick={() => receiptFun(row._id)} />
            </>
          );
        } else {
          return row.application_type;
        }
      },
    },

    {
      name: "Created By ",
      selector: (row) =><div   style={{
        fontWeight: row?.isNew ? "bold" : "",
      }}> {row.createdByName}</div>,
    },
    {
      name: "Applicant",
      selector: (row) =><div   style={{
        fontWeight: row?.isNew ? "bold" : "",
      }}> {
        row.application_first_name + "" + row.application_last_name}</div>,
    },
    {
      name: "Status ",
      selector: (row) =><div   style={{
        fontWeight: row?.isNew ? "bold" : "",
      }}> { row.status}</div>,
    },

    {
      name: "Created On ",
      selector: (row) => <div   style={{
        fontWeight: row?.isNew ? "bold" : "",
      }}> {dateSeter(row.createdAt)}</div>,
    },
    {
      name: "Updated Date ",
      selector: (row) => <div   style={{
        fontWeight: row?.isNew ? "bold" : "",
      }}> {dateSeter(row.updatedAt)}</div>,
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={FilteredData}
        pagination={true}
        customStyles={customStyles}
      />
    </div>
  );
};

export default MainTable_admin;