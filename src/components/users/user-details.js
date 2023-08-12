import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { incNumber } from "../../Redux/actions";

function Userdetails() {
  const { id } = useParams();
  const users = useSelector((state) => state.userData.user);

  const user = users?.filter((data) => data._id === id);
  const [activeUpdate, setactiveUpdate] = useState(false);
  const [activeStatus, setActiveStatus] = useState();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const updateStatus = (e) => {
    e.preventDefault();
    if (activeStatus) {
      axios
        .put(`https://api.goanny.link/api/user/updateById/${user[0]._id}`, {
          isActive: activeStatus,
        })
        .then((res) => {
          dispatch(incNumber());
        })
        .catch((err) => console.log(err));
    }
  };

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
    const day = d.getDate();
    return `${day} ${monthLater[month]} ${year}`;
  };
  const Ordercolumns = [
    {
      name: "#",
      style: {
        textAlign: "center",
      },
      selector: (row, index) => (
        <div
          onClick={() => {
            Navigate(`/orderDetails/${row._id}`);
          }}
        >
          {row._id}
        </div>
      ),
    },
    {
      name: "Name",
      style: {
        textAlign: "center",
      },
      selector: (row) => row.firstName,
    },
    {
      name: "Address",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.address,
    },
    {
      name: "City",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.cityName,
    },
    {
      name: "Mobile Number",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.mobNo,
    },
    {
      name: "Ordered Items",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.orderItems.length,
    },
    {
      name: "Ordered At",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => dateSeter(row.createdAt),
    },
    {
      name: "Total Amount",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => "₹ " + row.totalPrice,
    },
    {
      name: "Status",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.orderStatus,
    },
  ];
  const HotelColumn = [
    {
      name: "#",
      style: {
        textAlign: "center",
      },
      selector: (row, index) => index + 1,
    },
    {
      name: "Hotel Name",
      style: {
        textAlign: "center",
      },
      selector: (row) => row.hotelName,
    },
    {
      name: "Hotel Email",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.hotelEmail,
    },
    {
      name: "Hotel Contact",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.hotelContactNo,
    },
    {
      name: "Hotel Address",
      style: {
        textAlign: "center",
      },
      selector: (row) => row?.hotelAddress,
    },
    {
      name: "City",
      style: {
        textAlign: "center",
      },
      selector: (row) => <>{row?.hotelCity}</>,
    },
    {
      name: "isActive",
      style: {
        textAlign: "center",
      },
      selector: (row) => <>{row.isActive ? "True" : "False"}</>,
    },
  ];
  const state = useSelector((state) => state);
  return (
    <Fragment>
      <Breadcrumb title="Order Details" parent="Sales" />
      {user ? (
        <Container fluid={true}>
          <Row className="product-adding">
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h3 style={{ color: "black" }}>General</h3>
                </CardHeader>
                <CardBody>
                  <p className="boldfont">Name : {user[0].name}</p>
                  <p className="boldfont">Email : {user[0].email}</p>
                  <p className="boldfont">Contact No : {user[0].mobileNo}</p>
                  <p className="boldfont">Role : {user[0].role}</p>
                  <p className="boldfont">
                    Is Active :{" "}
                    {activeUpdate ? (
                      <>
                        <select
                          onChange={(e) => setActiveStatus(e.target.value)}

                          style={{ "padding": "4px", "margin-left": "10px" }}
                        >
                          <option >Select</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </>
                    ) : user[0].isActive ? (
                      "True"
                    ) : (
                      "False"
                    )}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        setactiveUpdate(!activeUpdate);
                        updateStatus(e);
                      }}
                    >
                      Update Status
                    </button>{" "}
                  </p>
                  <p className="boldfont">
                    Last Login : {dateSeter(user[0].lastLogin)}
                  </p>
                </CardBody>
                <CardHeader>
                  <h3 style={{ color: "black" }}>Hotels List</h3>
                </CardHeader>
                <CardBody>
                  {/* <DataTable
                    columns={HotelColumn}
                    data={userHotels}
                    pagination={userHotels.length > 10 ? true : false}
                    highlightOnHover
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                 
                  /> */}
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h3 style={{ color: "black" }}>Orders</h3>
                </CardHeader>
                <CardBody>
                  {/* <DataTable
                    columns={Ordercolumns}
                    data={userOrders}
                    pagination={userOrders.length > 10 ? true : false}
                    highlightOnHover
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
               
                  /> */}
                </CardBody>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        "Loading..."
      )}
    </Fragment>
  );
}

export default Userdetails;
