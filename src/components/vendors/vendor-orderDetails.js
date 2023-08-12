import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/sales-transactions";
import Datatable from "../common/datatable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { incNumber } from "../../Redux/actions";
const VendorOrderDEtails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const hotel = useSelector((state) => state.allHotels.hotels);
  const [activeUpdate, setactiveUpdate] = useState(true);
  const [status, setStatus] = useState();
  const orderData = useSelector(state=>state.allOrders.Orders);

  const singleOrder = orderData?.find((data) => data._id === id);
  const hotelDetails = hotel?.find(
    (data) => data.ownerId === singleOrder?.userId
  );
  console.log(singleOrder)
  const updateStatus = (e) => {
    axios
      .put(
        `https://api.goanny.link/api/vendorOrder/updateStatus/${singleOrder?._id}`,
        {
          orderStatus: status,
        }
      )
      .then((res) => {
        dispatch(incNumber());
        setactiveUpdate(true)

      })
      .catch((err) => console.log(err));
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
  var subTotal = 0;
  if (singleOrder) {
    singleOrder?.orderItems?.forEach((data) => {
      if (data.salePrice) {
        subTotal += data.salePrice * data.quantity;
      } else {
        subTotal += data.price * data.quantity;
      }
    });
  }
  const columns = [
    {
      name: "#",
      width: "20px",
      center: true,
      compact: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "Image",
      // center:true,
      selector: (row) => (
        <img
          width={70}
          height={70}
          src={row.productImages[0].img}
          onClick={() =>
            navigate(`/products/digital/digital-pro-details/${row.productId}`)
          }
        />
      ),
    },
    {
      name: "Name",
      // center:true,
      selector: (row) => row?.name + row?.quantity,
    },
    {
      name: "Price",
      // center:true,
      selector: (row) => (
        <>{row?.salePrice ? row?.salePrice : row?.price}</>
      ),
    },
    {
      name: "Quantity",
      // center:true,
      selector: (row) => row?.quantity,
    },
    {
      name: "Total Amount",
      // center:true,
      selector: (row) => (
        <>
          {row?.salePrice
            ? row?.salePrice * row?.quantity
            : row?.price * row?.quantity}
        </>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumb title="Order Details" parent="Sales" />
      {(hotelDetails && singleOrder) && (
        <Container fluid={true}>
          <Row className="product-adding">
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h3 style={{ color: "black" }}>General</h3>
                </CardHeader>
                <CardBody>
                  <p className="boldfont">
                    Order Palced By Name: {singleOrder.name}
                  </p>
                  <p className="boldfont">Order Total Price: ₹{subTotal}</p>
                  <p className="boldfont">
                    Ordered At: {dateSeter(singleOrder.createdAt)}
                  </p>
                  <p className="boldfont">
                    {" "}
                    Ordered Status:
                    <select
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      style={{
                        padding: "4px",
                        "margin-left": "10px",
                        width: "235px"
                      }}
                    >
                      <option value={singleOrder?.orderStatus} selected>Current : {singleOrder?.orderStatus}</option>
                      <option value={"Ordered"}>Ordered</option>
                      <option value={"InProgress"}>InProgress</option>
                      <option value={"Delivered"}>Delivered</option>
                      <option value={"Refund/Replacement"}>
                        Refund/Replacement
                      </option>
                    </select>
                    <button
                      className="btn btn-primary m-5"
                      onClick={(e) => {
                        updateStatus(e);
                      }}
                      disabled={singleOrder?.orderStatus === "Delivered" && true}
                    >
                      Update
                    </button>
                  </p>
                </CardBody>
                <CardHeader>
                  <h3 style={{ color: "black" }}>Address Details</h3>
                </CardHeader>
                <CardBody>
                  <p className="boldfont">
                    Address: {singleOrder.address}
                  </p>
                  <p className="boldfont">
                    City : {singleOrder.cityName} {singleOrder.postalCode}
                  </p>
                  <p className="boldfont">State : {singleOrder.state}</p>
                  <p className="boldfont">
                    Country : {singleOrder.country}
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h3 style={{ color: "black" }}>Other Details</h3>
                </CardHeader>
                <CardBody>
                  <p className="boldfont">Name: {singleOrder.name}</p>
                  <p className="boldfont">
                    Mobile Number: {singleOrder.mobNo}
                  </p>
                  <p className="boldfont">Email: {singleOrder.email}</p>
                </CardBody>
                <CardHeader>
                  <h3 style={{ color: "black" }}>Ordered Items</h3>
                </CardHeader>
                <CardBody>


                  <DataTable
                    columns={columns}
                    data={singleOrder.orderItems}
                    pagination
                    highlightOnHover
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                  // customStyles={customStyles}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ "margin-bottom": "50px" }}
                    onClick={() => {
                      localStorage.setItem(
                        "order",
                        JSON.stringify({
                          ...singleOrder,
                          ...hotelDetails,
                          subTotal: subTotal,
                        })
                      );
                      navigate("/invoice");
                    }}
                  >
                    Invoice
                  </button>
                </CardBody>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default VendorOrderDEtails;
