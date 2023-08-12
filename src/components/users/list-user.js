import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const List_user = () => {
  const userData = useSelector((state) => state.userData.user);
  const [rechargeData, setRechargeData] = useState([]);
  const [user,setUser] = useState(userData?userData:[])
  const users = [];
  const [AllUserData, setAllUserData] = useState([]);

  if (user?.length > 0) {
    user.forEach((data) => {
      let amount = 0;
      let expence = 0;
      rechargeData.forEach((item) => {
        if (item.user === data._id) {
          if (item.isExpence === "true") {
            expence += item.amount;
          } else {
            amount += item.amount;
          }
        }
      });
      users.push({ ...data, balance: amount - expence });
    });
  }

  useEffect(() => {
    axios.get("https://mhebackend.payagain.in/api/recharge").then((res) => {
      const response = res.data;
      setRechargeData(response);
    });
    axios
    .get(`https://mhebackend.payagain.in/api/user/getAll`)
    .then((res) => {
      const response = res.data;
      setUser(response);
    })
    .catch((err) => console.log(40,err));

  }, []);
  const navigate = useNavigate();
  // const calculateRechargeAmt = (id) => {
  //   axios.get("https://mhebackend.payagain.in/api/recharge").then((res) => {
  //     const response = res.data;
  //     let amount = 0;
  //     let expence = 0;
  //     if (response.length > 0) {
  //       response.forEach((item) => {
  //         if (item.user === id) {
  //           if (item.isExpence === "true") {
  //             expence += item.amount;
  //           } else {
  //             amount += item.amount;
  //           }
  //         }
  //       });
  //     }
  //     console.log(amount - expence);
  //   });
  // };
  const [Data, SetData] = useState({
    modalcontent: "",
  });
  const columns = [
    {
      name: "Sr No",
      style: {
        textAlign: "center",
        Width:"120px"
      },
      selector: (row, index) => index + 1,
    },
    {
      name: " Name",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.name,
    },

    {
      name: "Email Address",
      // center:true,
      style: {
        textAlign: "center",
        Width:"200px"
      },
      selector: (row) => row.email,
    },
    {
      name: "District",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => row.district,
    },
    {
      name: "Mobile No.",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => row.mobileNumber,
    },
    {
      name: "Role",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => row.role,
    },
    {
      name: "Balance",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => row.balance,
    },
  ];
  const customStyles = {
    rows: {
      style: {
       border:"1px solid black",
       fontWaight:"900",
       // Add any other CSS properties you want to apply to the rows
       fontSize:"8px",
      },
    },
    headRow: {
      style: {
        // Add any styles for the header row
        fontWaight:"900",
        fontSize:"9px",
        border:"1px solid black",
        background:"#f36621",
        color:"white",
        textAlign:"center"
      },
    },
    headCells: {
      style: {
        // Add any styles for the header cells
        fontSize:"7px",
        border:"1px solid black"
      },
    },
    cells: {
      style: {
        // fontSize:"9px",
        color:"black",
        fontWaight:"900",
        // Add any styles for the regular cells
        border:"1px solid black",
        fontSize:"10px",
        
      },
    },
    pagination: {
      style: {
        // Add any styles for the pagination section
        border:"1px solid black"
      },
    },
  };
  const [search, setSearch] = useState();
  const [issearch, setISSearch] = useState(false);
  const [query, setQuery] = useState("");

  const searchByName = (e) => {
    setQuery(e.target.value);
    const value = e.target.value
  
      if(value.length>0 ){
        const searchData = user.filter((item,index)=>{
          if( item.name!=undefined && item.name.length>0){
          const name = item.name
          if(name.toLowerCase().includes(value.toLowerCase())){
            return item
          }
        }
        })
        setUser(searchData)
      }else{
        setUser(userData)
      }
    // setISSearch(true);
    // setSearch(searchData);
  };

  return (
    <Fragment>
      <Breadcrumb title="User Details" parent="User Details" />
      <Container fluid={true}>
        <div className="row">
          <div className="col-lg-6">
            <input
              type="text"
              name=""
              id=""
              value={query}
              onChange={searchByName}
            />
          </div>
        </div>
        <Card>
          <CardBody>
            <div className="clearfix"></div>

            <DataTable
              columns={columns}
              data={ users}
              pagination
              highlightOnHover
              fixedHeader
              fixedHeaderScrollHeight="600px"
              customStyles={customStyles}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default List_user;