import React, { Fragment } from "react";
import Breadcrumb from "./common/breadcrumb";
import {
  Navigation,
  Box,
  MessageSquare,
  Users,
  Briefcase,
  CreditCard,
  ShoppingCart,
  Calendar,
  Archive,
} from "react-feather";
import CountUp from "react-countup";
import { Chart } from "react-google-charts";

import { Bar, Line } from "react-chartjs-2";
import {
  lineOptions,
  buyOption,
  employeeData,
  employeeOptions,
} from "../constants/chartData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale,
} from "chart.js";

// image impoer
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Media,
  Row,
  Table,
} from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CloudFilled } from "@ant-design/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale
);

const VendorDashboard = () => {
  const allVendorOrders = useSelector(
    (state) => state.vendorOrders.vendorOrders
  );
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const userId = userData.user._id;
  // const vendorOrder = allVendorOrders.filter(
  //   (data) => data.vendorId === userId
  // );
  const vendorOrder = useSelector((state) => state.allOrders.Orders);

  const allProducts = useSelector(
    (state) => state.allProduct.products
  );
  const allvendorProducts = useSelector(
    (state) => state.vendorProducts.product
  );
 
  const totalPriceCalculator = (orderItems) => {
    var subTotal = 0;
    orderItems?.forEach((data) => {
      if (data.vendorSalePrice) {
        subTotal += data.vendorSalePrice * data.productQuantity;
      } else {
        subTotal += data.vendorPrice * data.productQuantity;
      }
    });
    return subTotal;
  };
  let totalPrice = 0;
  if (vendorOrder) {
    vendorOrder.forEach((data) => {
      totalPrice += data.totalPrice
    });
  }
  const orders = useSelector((state) => state.allOrders.Orders);
  const navigate = useNavigate();
  const totalRevenue = (data) => {
    var total = 0;
    data.forEach((element) => {
      total += element.totalPrice;
    });
    return total;
  };
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
  const dateSeter2 = (date) => {
    const d = new Date(date);
    const month = d.getMonth();
    return `${monthLater[month]} `;
  };
  const dateSeter3 = (date) => {
    const d = new Date(date);
    const month = d.getMonth();
    return `${monthLater[month - 1]} `;
  };
  const currentMonthSale = (data) => {
    if (data) {
      const today = new Date();

      const filter = data.filter(
        (data) => dateSeter2(data.createdAt) === dateSeter2(today)
      );
      let total = 0;
      filter.forEach((data) => {
        total += data.totalPrice;
      });
      
      return total;
    }
  };
  const lastMonthSale = (data) => {
    if (data) {
      const today = new Date();

      const filter = data.filter(
        (data) => dateSeter2(data.createdAt) === dateSeter3(today)
      );
      let total = 0;
      filter.forEach((data) => {
        total += data.totalPrice;
      });
      return total;
    }
  };

  const currentMonthHotelsActive = (data) => {
    const today = new Date();

    const filter = data.filter((data) => {
      if (data.isActive == true) {
        if (dateSeter2(data.updatedAt) === dateSeter2(today)) {
          return data;
        }
      }
    });
    return filter.length;
  };
  const lastMonthHotelsActive = (data) => {
    const today = new Date();

    const filter = data.filter((data) => {
      if (data.isActive == true) {
        if (dateSeter2(data.updatedAt) === dateSeter3(today)) {
          return data;
        }
      }
    });
    return filter.length;
  };
  const lineData = {
    labels: ["100", "200", "300", "400", "500", "600", "700", "800"],
    datasets: [
      {
        data: [2.5, 3, 3, 0.9, 1.3, 1.8, 3.8, 1.5],
        borderColor: "#ff8084",
        backgroundColor: "#ff8084",
        borderWidth: 2,
        barPercentage: 0.7,
        categoryPercentage: 0.4,
      },
      {
        data: [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8],
        borderColor: "#a5a5a5",
        backgroundColor: "#a5a5a5",
        borderWidth: 2,
        barPercentage: 0.7,
        categoryPercentage: 0.4,
      },
    ],
  };

  const buyData = {
    labels: ["", "10", "20", "30", "40", "50"],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: "#13c9ca",
        data: [20, 5, 80, 10, 100, 15],
        lineTension: 0.4,
      },
      {
        backgroundColor: "transparent",
        borderColor: "#a5a5a5",
        data: [0, 50, 20, 70, 30, 27],
        lineTension: 0.4,
      },
      {
        backgroundColor: "transparent",
        borderColor: "#ff8084",
        data: [0, 30, 40, 10, 86, 40],
        lineTension: 0.4,
      },
    ],
  };

  const doughnutOptions = {
    title: "",
    pieHole: 0.35,
    pieSliceBorderColor: "none",
    colors: ["#ff8084", "#13c9ca", "#a5a5a5"],
    legend: {
      position: "none",
    },
    pieSliceText: "none",
    tooltip: {
      trigger: "none",
    },
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
    enableInteractivity: false,
  };
  const pieOptions = {
    title: "",
    pieHole: 1,
    slices: [
      {
        color: "#ff8084",
      },
      {
        color: "#13c9ca",
      },
      {
        color: "#f0b54d",
      },
    ],
    tooltip: {
      showColorCode: false,
    },
    chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
    legend: "none",
  };
  const LineOptions = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#ff8084"],
    legend: "none",
  };
  const LineOptions1 = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#13c9ca"],
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
  };
  const LineOptions2 = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#f5ce8a"],
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
  };
  const LineOptions3 = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#a5a5a5"],
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
  };
  const dateSeter = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    return `${day} ${monthLater[month]} ${year}`;
  };
  function getPercent(x, y) {
    if (x > y) {
      const z = Math.floor(x - y);
      return (z / x) * 100;
    } else {
      const z = Math.floor(y - x);
      return (z / x) * 100;
    }
  }
  return (
    <Fragment>
      <Breadcrumb title="Dashboard" parent="Dashboard" />
      <Container fluid={true}>
        <Row>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-warning">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Navigation className="font-warning" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Total Earnings</span>
                    <h3 className="mb-0">
                      ₹ <CountUp className="counter" end={totalPrice} />
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody className="bg-secondary ">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Box className="font-secondary" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Total Products</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={allProducts.length} />
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="12 xl-100">
            <Card>
              <CardHeader>
                <h5>Latest Orders</h5>
              </CardHeader>
              <CardBody>
                <div className="user-status table-responsive latest-order-table">
                  <Table
                    borderless
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }} scope="col">
                          Order ID
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Order Total
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Status
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Ordered At
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {vendorOrder?.slice(0, 5).map((data) => {
                        return (
                          <>
                            <tr
                              onClick={() =>
                                navigate(`/vendor/vendor-order-details/${data._id}`)
                              }
                              className="hover"
                            >
                              <td style={{ textAlign: "center" }}>
                                {data._id}
                              </td>
                              <td
                                style={{ textAlign: "center" }}
                                className="digits"
                              >
                                ₹
                                {data.totalPrice.toFixed(
                                  2
                                )}
                              </td>
                              <td
                                style={{ textAlign: "center" }}
                                className="digits"
                              >
                                {data.orderStatus}
                              </td>
                              <td
                                style={{ textAlign: "center" }}
                                className="digits"
                              >
                                {dateSeter(data.createdAt)}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                  <a
                    href="#javaScript"
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/sales/vendor-orders")}
                  >
                    View All Orders
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-50" md="6">
            <Card className=" order-graph sales-carousel">
              <CardBody>
                <Media>
                  <Media body>
                    <span>Sales This Month</span>
                    <h2 className="mb-0">₹{currentMonthSale(vendorOrder)}</h2>
                    {lastMonthSale(vendorOrder) === 0 ? <></>:
                    currentMonthSale(vendorOrder) > lastMonthSale(vendorOrder) ? (
                      <>
                        {" "}
                        <p
                          style={{
                            color: "green",
                          }}
                        >
                          {getPercent(
                            currentMonthSale(vendorOrder),
                            lastMonthSale(vendorOrder)
                          ).toFixed(2)}
                          %{" "}
                          <span>
                            <i className="fa fa-angle-up"></i>
                          </span>
                           Growth
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        <p
                          style={{
                            color: "red",
                          }}
                        >
                          {getPercent(
                            currentMonthSale(orders),
                            lastMonthSale(orders)
                          )}{" "}
                          <span>
                            <i className="fa fa-angle-down"></i>
                          </span>
                          Down
                        </p>
                      </>
                    )}

                    <h5 className="f-w-600 f-16">
                      Gross sales of {dateSeter2(new Date())}
                    </h5>
                    {/* <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p> */}
                  </Media>
                  <div className="bg-primary b-r-8">
                    <div className="small-box">
                      <Briefcase />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </Fragment>
  );
};

// javascript:void(0)

export default VendorDashboard;
