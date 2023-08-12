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
import { toast } from "react-toastify";
import changeNumber from "../../Redux/reducers/reducers";
import { incNumber } from "../../Redux/actions";

const Recharge = () => {
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.userData.user);
  const recharge = useSelector((state) => state.recharge.recharge);
  // const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.user);
  const [rechargeData, setRechargeData] = useState([]);
  const [user, setUser] = useState(userData ? userData : []);
  const users = [];
  const [selectedUser, setselectedUser] = useState([]);

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
      .catch((err) => console.log(40, err));
  }, []);
  const navigate = useNavigate();

  const columns = [
    // style: {
    //   textAlign: "center",
    //   border:"1px solid black"
    // },
    {
      name: "Sr No",
      style: {
        textAlign: "center",
       
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
      },
      selector: (row) => row.email,
    },
    {
      name: "district",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => row.district,
    },
    {
      name: "Mobile Number",
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
    {
      name: "Action",
      // center:true,
      style: {
        textAlign: "center",
        cursor:"pointer",
        color:"blue"

      },
      selector: (row) =>(
      
        <><i class="bi bi-check2-circle fs-3" onClick={(e)=>{setselectedUser(row.name);
          console.log(132,row)
            SetData({ ...Data, user: row._id});
            SetData({ ...Data, userName: row.name});

         
        
        }} data-bs-dismiss="modal"></i></>
      ),
    },
  ];

  const [search, setSearch] = useState();
  const [issearch, setISSearch] = useState(false);
  const [query, setQuery] = useState("");

  const searchByName = (e) => {
    setQuery(e.target.value);
    const value = e.target.value;

    if (value.length > 0) {
      const searchData = user.filter((item, index) => {
        if (item.name != undefined && item.name.length > 0) {
          const name = item.name;
          if (name.toLowerCase().includes(value.toLowerCase())) {
            return item;
          }
        }
      });
      setUser(searchData);
    } else {
      setUser(userData);
    }
    // setISSearch(true);
    // setSearch(searchData);
  };
  const [Data, SetData] = useState({
    userName:"",
    user: "",
    mode: "offline",
    amount: "",
    isExpence: false,
  });

  const postRechargeData = (e) => {
    e.preventDefault();
    console.log(77, Data);
    axios
      .post("https://mhebackend.payagain.in/api/recharge/create", Data)
      .then((res) => {
        const response = res.data;
        dispatch(incNumber());
        toast.success("Recharge Done Successfully..");
      })
      .catch((err) => console.log(34, err));
  };
  const rechargeColumn = [
    {
      name: "Sr No",
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
       border:"1px solid black",
       fontWaight:"900",
       // Add any other CSS properties you want to apply to the rows
       fontSize:"22px",
      },
    },
    headRow: {
      style: {
        // Add any styles for the header row
        fontWaight:"900",
        fontSize:"15px",
        border:"1px solid black",
        background:"#f36621",
        color:"white",
        textAlign:"center"
      },
    },
    headCells: {
      style: {
        // Add any styles for the header cells
        fontSize:"12px",
        border:"1px solid black"
      },
    },
    cells: {
      style: {
        fontSize:"12px",
        color:"black",
        // Add any styles for the regular cells
        border:"1px solid black"
      },
    },
    pagination: {
      style: {
        // Add any styles for the pagination section
        border:"1px solid black"
      },
    },
  };
  return (
    <Fragment>
      <Breadcrumb title="Recharge" parent="Create User Passport"  />
      <Container fluid={true}>
        <Card>
          <CardBody>
            <div id="layoutSidenav_content">
              <main>
                <div class="container-fluid px-4 mt-4">
                  <div class="formlayout">
                    <form action="changeuserpassword_php.php" method="POST">
                      <div class="row g-3">
                        <div class="col-md-6">
                          <div class="form-heading" >
                            <label>User</label>
                          </div>
                          <br />
                          <input
                            type="text"
                            class="form-control form-control-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#recharge"
                            placeholder="Click For Select User..."
                            value={selectedUser}
                           
                          >
                            {/* Launch demo modal */}
                          </input>

                          {/* <!-- Modal --> */}
                          <div
                            class="modal body w-100"
                            id="recharge"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog modal-xl">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h1
                                    class="modal-title fs-5 w-100"
                                    id="exampleModalLabel"
                                  >
                                    Select User
                                  </h1>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <label htmlFor="">
                                    <Container fluid={true}>
                                      <div className="row">
                                        <div className="col-lg-6"></div>
                                        <div className="col-lg-6 d-flex">
                                          <label htmlFor="serch1">Search: </label>
                                          <input
                                            type="text"
                                            name=""
                                            id="serch1"
                                            placeholder="Search"
                                            className="form-control form-control-sm"
                                            value={query}
                                            onChange={searchByName}
                                          />
                                        </div>
                                      </div>
                                      <Card>
                                        <CardBody>
                                          <div className="clearfix"></div>
                                          <div className="row ">

                                          <DataTable
                                            columns={columns}
                                            data={users}
                                            pagination
                                            highlightOnHover
                                            fixedHeader
                                            fixedHeaderScrollHeight="600px"
                                           customStyles={customStyles}

                                       
                                          />
                                          </div>

                                        </CardBody>
                                      </Card>
                                    </Container>
                                  </label>
                                </div>
                               
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-heading">
                            <label>Credit </label>
                          </div>
                          <br />
                          <input
                            type="number"
                            id="newpass"
                            value={Data.amount}
                            class="form-control form-control-lg"
                            placeholder=" New Credit"
                            required
                            onChange={(e) => {
                              SetData({ ...Data, amount: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div class="col-md-12">
                        <input
                          type="submit"
                          name="submit"
                          class="btn btn-primary"
                          value="Recharge"
                          onClick={(e) => {
                            postRechargeData(e);
                          }}
                        />
                        &nbsp;&nbsp;
                        <input
                        style={{backgroundColor:"#1877F2",color:"white"}}
                          type="reset"
                          name="submit"
                          class="btn "
                          value="Update"
                        />
                        &nbsp;&nbsp;
                      </div>

                      <div class="modal fade" id="myModal" role="dialog" />
                      <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"></div>
                    </form>
                  </div>
                  <div className="row mt-3">

                  <DataTable
                    columns={rechargeColumn}
                    data={recharge}
                    pagination={recharge.length > 10 ? true : false}
                    highlightOnHover
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    customStyles={customStyles}
                  />
                  </div>
                </div>
              </main>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Recharge;
