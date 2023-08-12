import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { incNumber } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Table_admin=({FilteredData}) =>{
const dispatch =useDispatch()
const navigate =useNavigate()

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
  const customStyles = {
    rows: {
      style: {
       border:"1px solid black"
        // Add any other CSS properties you want to apply to the rows
      },
    },
    headRow: {
      style: {
        // Add any styles for the header row
        border:"1px solid black",
        backgroundColor:"gray",
        color:"white"
      },
    },
    headCells: {
      style: {
        // Add any styles for the header cells
        border:"1px solid black"
      },
    },
    cells: {
      style: {
        // Add any styles for the regular cells
        border:"1px solid black"
      },
    }, 
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
      selector: (row) =>{if(row.application_type=="EWS")
      {
        return <><button type="button " style={{ backgroundColor:"transparent",border:"none",
          fontWeight: row?.isNew ? "bold" : "",
          textDecoration:"underline #64fa37 30% ",}}
        onClick={()=>{ewsview(row._id);dispatch(incNumber())}}>EWS certificate</button></>
      }
      else if(row.application_type=="Age_Nationality"){
        return <><button type="button " 
        onClick={()=>{ageNationalityview(row._id);dispatch(incNumber())}}
        style={{ backgroundColor:"transparent",border:"none",
          fontWeight: row?.isNew ? "bold" : "",
          textDecoration:"underline #64fa37 30% ",}}
       >Age certificate</button></>

      }
      else if(row.application_type=="Non_Cremylayer certificate"){
        return <><button type="button " 
        onClick={()=>{Non_Cremylayerview(row._id);dispatch(incNumber())}}
        style={{ backgroundColor:"transparent",border:"none",
          fontWeight: row?.isNew ? "bold" : "",
          textDecoration:"underline #64fa37 30% ",}}
       > Non_Cremylayer certificate</button></>

      }
      else if(row.application_type=="Income certificate"){
        return <><button type="button "
        onClick={()=>{incomeview(row._id);dispatch(incNumber())}}
         style={{ backgroundColor:"transparent",border:"none",
          fontWeight: row?.isNew ? "bold" : "",
          textDecoration:"underline #64fa37 30% ",}}
       > Income certificate</button></>

      }
      else{
        return row.application_type
      }
    }
      
    },
    // {
    //   name: "Application-Type",
    //   selector: (row) =>row.application_type
    //   ,
    // },
    {
      name: "Created By ",
      selector: (row) => row.createdByName,
    },
    {
      name: "Applicant",
      // selector: (row) => row.Data.fullName_English,
    },
    {
      name: "Status ",
      selector: (row) => row.status,
    },

    {
      name: "Created On ",
      selector: (row) => row.createdAt,
    },
    {
      name: "Updated Date ",
      selector: (row) => row.updatedAt,
    }  

  ];

  return (
    <div>
      <DataTable columns={columns} data={FilteredData} pagination={true}
      customStyles={customStyles}/>
    </div>
  );
}

export default Table_admin;
