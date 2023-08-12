import React, { useState } from "react";
import DataTable from "react-data-table-component";
// import Icon from "@/components/ui/Icon";
import { useNavigate } from "react-router-dom";

const Table_Retailer=({FilteredData}) =>{

    const navigate=useNavigate()
  const columns = [
    {
      name: "New",
      selector: (row ,i) => i+1,
    },
    {
      name: "Application-Type",
      selector: (row) =>row.application_type
      ,
    },
    {
    
      name: "Created By ",
      selector: (row) => row.createdBy,
    },
    {
      name: "Applicant",
      selector: (row) => row.Data.fullName_English,
    },
    {
        // if(row.application_type=='EWS')
        // {
        //     navigate(`../EWS/ews.js/${row._id}`)
        // }
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
      <DataTable columns={columns} data={FilteredData} pagination={true}/>
    </div>
  );
}

export default Table_Retailer;
