import { hover } from "@testing-library/user-event/dist/hover";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdReceipt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incNumber } from "../../Redux/actions";

const Table_form11 = ({ FilteredData }) => {
  const dispatch = useDispatch();
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

  const navigate = useNavigate();

  // for rejected

  const learningform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/drivingLicence/learningDl/${id}`);
  };

  const parmanantform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/drivingLicence/permanantDl/${id}`);
  };

  const renewform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/drivingLicence/RenewDL/${id}`);
  };

  const egazetteform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/egazette/create/${id}`);
  };
  const foodLicenceform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/FoodLicence/create/${id}`);
  };
  const compGSTform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/Company_Gst/create/${id}`);
  };
  const indiGSTform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/Individual_Gst/create/${id}`);
  };

  const passportform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/PassportForm/create/${id}`);
  };

  const shopActform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/ShopActForm/create/${id}`);
  };
  const udhamform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/UdhamAbhar/create/${id}`);
  };

  const voterform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/VoterCard/create/${id}`);
  };

  const ewsform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/ews/${id}`);
  };

  const age_nationalityform = (id) => {
    navigate(`${process.env.PUBLIC_URL}/age_nationality/${id}`);
  };

  const incomeForm = (id) => {
    navigate(`${process.env.PUBLIC_URL}/income/${id}`);
  };

  const non_crymelayeForm = (id) => {
    navigate(`${process.env.PUBLIC_URL}/non_cremyLayer/${id}`);
  };

  // for view form details

  const e_gazetteview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_egazzet/${id}`);
  };

  const learningview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_learning/${id}`);
  };

  const renewview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_renew/${id}`);
  };

  const permanantview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_permanant/${id}`);
  };

  const compGSTview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_compGST/${id}`);
  };

  const indiGSTview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_indiGST/${id}`);
  };

  const passportview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_passport/${id}`);
  };

  const shopActview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_shopAct/${id}`);
  };

  const udhamAdharview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_udhamadhar/${id}`);
  };

  const voterCardview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_voterCard/${id}`);
  };

  const foodLicenceview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_foodLicence/${id}`);
  };

  const ewsview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_ews/${id}`);
  };

  const incomeview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_income/${id}`);
  };

  const Non_Cremylayerview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_Non_Cremylayer/${id}`);
  };

  const ageNationalityview = (id) => {
    navigate(`${process.env.PUBLIC_URL}/retailer_ageNationality/${id}`);
  };
  const receiptFun = (id) => {
    navigate(`${process.env.PUBLIC_URL}/receipt/${id}`);
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
        backgroundColor: "gray",
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
  const columns = [
    {
      name: "New",
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
      style: {
        color: "blue",
      },
      // selector: (row) => row.application_type,

      selector: (row) => {
        if (row.status == "REJECTED") {
          if (row.application_type == "e_gazzet") {
            return (
              <>
                <h6
                  onClick={() => {
                    egazetteform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "learning") {
            return (
              <>
                <h6
                  onClick={() => {
                    learningform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "renew") {
            return (
              <>
                <h6
                  onClick={() => {
                    renewform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "permanant") {
            return (
              <>
                <h6
                  onClick={() => {
                    parmanantform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "CompanyGST") {
            return (
              <>
                <h6
                  onClick={() => {
                    compGSTform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "indGST") {
            return (
              <>
                <h6
                  onClick={() => {
                    indiGSTform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "passport") {
            return (
              <>
                <h6
                  onClick={() => {
                    passportform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "shopAct") {
            return (
              <>
                <h6
                  onClick={() => {
                    shopActform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "udhamAdhar") {
            return (
              <>
                <h6
                  onClick={() => {
                    udhamform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "voterCard") {
            return (
              <>
                <h6
                  onClick={() => {
                    voterform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "foodLicence") {
            return (
              <>
                <h6
                  onClick={() => {
                    foodLicenceform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "ews") {
            return (
              <>
                <h6
                  onClick={() => {
                    ewsform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "Income certificate") {
            return (
              <>
                <h6
                  onClick={() => {
                    incomeForm(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "Non_Cremylayer certificate") {
            return (
              <>
                <h6
                  onClick={() => {
                    non_crymelayeForm(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          } else if (row.application_type == "Age_Nationality") {
            return (
              <>
                <h6
                  onClick={() => {
                    age_nationalityform(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
              </>
            );
          }
        } else {
          if (row.application_type == "e_gazzet") {
            return (
              <>
                <h6
                  onClick={() => {
                    e_gazetteview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "learning") {
            return (
              <>
                <h6
                  onClick={() => {
                    learningview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "permanant") {
            return (
              <>
                <h6
                  onClick={() => {
                    permanantview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "renew") {
            return (
              <>
                <h6
                  onClick={() => {
                    renewview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "CompanyGST") {
            return (
              <>
                <h6
                  onClick={() => {
                    compGSTview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "indGST") {
            return (
              <>
                <h6
                  onClick={() => {
                    indiGSTview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "passport") {
            return (
              <>
                <h6
                  onClick={() => {
                    passportview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "shopAct") {
            return (
              <>
                <h6
                  onClick={() => {
                    shopActview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "udhamAdhar") {
            return (
              <>
                <h6
                  onClick={() => {
                    udhamAdharview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "voterCard") {
            return (
              <>
                <h6
                  onClick={() => {
                    voterCardview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "foodLicence") {
            return (
              <>
                <h6
                  onClick={() => {
                    foodLicenceview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "ews") {
            return (
              <>
                <h6
                  onClick={() => {
                    ewsview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "Income certificate") {
            return (
              <>
                <h6
                  onClick={() => {
                    incomeview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "Non_Cremylayer certificate") {
            return (
              <>
                <h6
                  onClick={() => {
                    Non_Cremylayerview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          } else if (row.application_type == "Age_Nationality") {
            return (
              <>
                <h6
                  onClick={() => {
                    ageNationalityview(row._id);
                    dispatch(incNumber());
                  }}
                >
                  {row.application_type}
                </h6>
                <MdReceipt
                  onClick={() => {
                    receiptFun(row._id);
                    dispatch(incNumber());
                  }}
                />
              </>
            );
          }
        }
      },
    },
    {
      name: "Created By ",
      selector: (row) => row.createdByName,
    },
    {
      name: "Applicant",
      selector: (row) =>
        row.application_first_name + " " + row.application_last_name,
    },
    {
      name: "Status ",
      selector: (row) => row.status,
    },

    {
      name: "Created On ",
      selector: (row) => dateSeter(row.createdAt),
    },
    {
      name: "Updated Date ",
      selector: (row) => dateSeter(row.updatedAt),
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

export default Table_form11;
