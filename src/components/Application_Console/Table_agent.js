import React, { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incNumber } from "../../Redux/actions";

const Table_agent=({FilteredData}) =>{
const dispatch =useDispatch()
    const navigate=useNavigate()

    const customStyles = {
      rows: {
        style: {
         border:"1px solid black",

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
        onClick={()=>{navigate(`${process.env.PUBLIC_URL}/userDetails/${row._id}`);dispatch(incNumber())}}>EWS certificate</button></>
      }
      else if(row.application_type=="Age_Nationality"){
        return <><button type="button " 
        onClick={()=>{navigate(`${process.env.PUBLIC_URL}/application_ageNationality/${row._id}`);dispatch(incNumber())}}
        style={{ backgroundColor:"transparent",border:"none",
          fontWeight: row?.isNew ? "bold" : "",
          textDecoration:"underline #64fa37 30% ",}}
       >Age certificate</button></>

      }
      else if(row.application_type=="Non_Cremylayer certificate"){
        return <><button type="button " 
        onClick={()=>{navigate(`${process.env.PUBLIC_URL}/application_noncremylayer/${row._id}`);dispatch(incNumber())}}
        style={{ backgroundColor:"transparent",border:"none",
          fontWeight: row?.isNew ? "bold" : "",
          textDecoration:"underline #64fa37 30% ",}}
       > Non_Cremylayer certificate</button></>

      }
      else if(row.application_type=="Income certificate"){
        return <><button type="button "
        onClick={()=>{navigate(`${process.env.PUBLIC_URL}/application_income/${row._id}`);dispatch(incNumber())}}
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
      selector: (row) =>row.status
    },

    {
      name: "Created On ",
      selector: (row) => row.createdAt,
    },
    {
      name: "Updated Date ",
      selector: (row) => row.updatedAt,
    }
    
    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <>
    //      <button style={{marginRight:"15px"}}><Icon icon="heroicons:eye" /></button> 

    //      <button><Icon icon="heroicons:pencil-square" /></button> 

    //     </>
    //   ),
    // },
  ];

  return (
    <div>
      <DataTable columns={columns} data={FilteredData} pagination={true}
      customStyles={customStyles}/>
    </div>
  );
}

export default Table_agent;
