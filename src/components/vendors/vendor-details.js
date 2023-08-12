import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { incNumber } from "../../Redux/actions";
import { EyeOutlined } from "@ant-design/icons";

function VendorDetails() {
  const { id } = useParams();
  const venders = useSelector((state) => state.allVendors.vendors);
  const user = venders?.filter((data) => data._id === id);
  const Navigate = useNavigate();
  const [order, setOrder] = useState();

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
    const day = d.getDate();
    return `${day} ${monthLater[month]} ${year}`;
  };

  const state = useSelector((state) => state);
  const orderData = useSelector((state) => state.allOrders.Orders);
  const filter = orderData.filter((item) => item.vendorId === id);
  const [startDate, setstartDate] = useState(new Date());
  const columns = [
    {
      name: "#",
      style: {
        textAlign: "center",
      },
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      style: {
        textAlign: "center",
      },
      selector: (row) => row.name,
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
    {
      name: "Action",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => (
        <>
          <EyeOutlined
            style={{ fontSize: "25px", color: "green" }}
            onClick={() => {
              Navigate(`/orderDetails/${row._id}`);
            }}
          />
        </>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        "justify-content": "center",
        padding: "18px",
        "background-color": "#f8f8f9",
      },
    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
  };
  // const changeHandler = (e, id) => {
  //   e.preventDefault();
  //   const filter = orderData.filter((item) => item.vendorId === id);
  //   setOrder(filter);
  // };
  const [open2, setOpen2] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const onCloseModal2 = () => {
    setOpen2(false);
  };
  const deleteDeleveryUnit = (e) => {
    e.preventDefault();
    axios
      .delete(`https://api.goanny.link/api/user/delete/${deleteId}`)
      .then((res) => {
        dispatch(incNumber());
        onCloseModal2();
      })
      .catch((err) => console.log(err));
  };
  const onOpenModal2 = () => {
    setOpen2(true);
  };

  const deleteModelOpen = (id) => {
    setDeleteId(id);
    onOpenModal2();
  };
  const [editopen, setEditOpen] = useState(false);
  const openEditModel = (id) => {
    // setEditOpen
  };

  return (
    <>
      <Fragment>
        <Modal isOpen={open2} toggle={onCloseModal2}>
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Delete Delivery Unit
            </h5>
          </ModalHeader>
          <ModalBody>
            <Label htmlFor="message-text" className="col-form-label">
              Are you sure to delete This Delivery Unit?
            </Label>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="primary"
              onClick={(e) => deleteDeleveryUnit(e)}
            >
              Delete
            </Button>
            <Button type="button" color="secondary" onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Breadcrumb title="Order Details" parent="Sales" />
        {user ? (
          <Container fluid={true}>
            <Row className="product-adding">
              <Col xl="12">
                <Card>
                  <div className="row">
                    <div className="col-lg-9">
                      <CardHeader className="d-flex">
                        <h3 style={{ color: "black" }}>General</h3>
                      </CardHeader>
                    </div>
                    <div className="col-lg-1 mt-2">
                      <a
                        // href="#javaScript"
                        className="btn btn-primary mt-3"
                        onClick={()=>{Navigate(`/vendors/update-vendors/${id}`);}}
                      >
                        Edit
                      </a>
                    </div>
                    <div className="col-lg-1 mt-2">
                      <a
                        // href="#javaScript"
                        className="btn btn-primary mt-3"
                        onClick={(e) => deleteModelOpen(id)}
                      >
                        Delete
                      </a>
                    </div>
                  </div>

                  <CardBody>
                    <p className="boldfont">Name : {user[0]?.name}</p>
                    <p className="boldfont">Email : {user[0]?.email}</p>
                    <p className="boldfont">Contact No : {user[0]?.mobileNo}</p>
                    <p className="boldfont">Role : {user[0]?.role}</p>
                    {/* <p className="boldfont">
                    Is Active :{" "}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        setactiveUpdate(!activeUpdate);
                      }}
                    >
                      Update Status
                    </button>{" "}
                  </p> */}
                    <p className="boldfont">
                      Last Login : {dateSeter(user[0]?.lastLogin)}
                    </p>
                    <div className="form-group row">
                      <p className="col-xl-2 col-md-2">
                        <span className="boldfont">Pincode :</span>
                      </p>
                      <div className="col-md-8 boldfont">
                        {user[0]?.serviceablePincode?.map((e) => {
                          return (
                            <div>
                              <span>{e}</span>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardBody>
                  {filter.length > 0 && (
                    <>
                      <CardHeader>
                        {" "}
                        <h3 style={{ color: "black" }}>
                          Total Order's : {filter.length}
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <DataTable
                          columns={columns}
                          data={filter}
                          pagination
                          highlightOnHover
                          fixedHeader
                          fixedHeaderScrollHeight="550px"
                          customStyles={customStyles}
                        />
                      </CardBody>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          "Loading..."
        )}
      </Fragment>
    </>
  );
}

export default VendorDetails;