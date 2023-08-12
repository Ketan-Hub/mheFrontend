import React, { Fragment, useState } from "react";
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
  AlignRight,
} from "react-feather";
import ReactPlayer from "react-player";
import { useRef } from "react";
import CountUp from "react-countup";
import { Chart } from "react-google-charts";
import salary from "../assets/images/salary.png";
import Maharashtra from "../assets/images/maharashtra.png";
import { Bar, Line, Pie } from "react-chartjs-2";
import Note from "../assets/images/notebook.gif";
import Form from "../assets/images/document.gif";
import Earning from "../assets/images/money-bag.gif";
import Income from "../assets/images/income.gif";
import Complete from "../assets/images/infography.gif";
import Pending from "../assets/images/infography.gif";
import member from "../assets/images/society.gif";
import chart from "../assets/images/line-chart.gif";
// import l1 from "../assets/images/"
import {
  lineOptions,
  buyOption,
  employeeData,
  employeeOptions,
} from "../constants/chartData";
import kit from "../assets/images/member.png";
import Info from "../assets/images/information.gif";
import money from "../assets/images/manoy.gif";

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
import Whatsapp from "../assets/images/whatsapp1.png";
// image impoer
import user2 from "../assets/images/dashboard/user2.jpg";
import user1 from "../assets/images/dashboard/user1.jpg";
import man from "../assets/images/dashboard/man.png";
import user from "../assets/images/dashboard/user.png";
import designer from "../assets/images/dashboard/designer.jpg";
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
// import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { useEffect } from "react";
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

const Dashboard = () => {
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
      filter.forEach((element) => {
        total += element.totalPrice;
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
      filter.forEach((element) => {
        total += element.totalPrice;
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
      //   {
      //     data: [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8],
      //     borderColor: "#a5a5a5",
      //     backgroundColor: "#a5a5a5",
      //     borderWidth: 2,
      //     barPercentage: 0.7,
      //     categoryPercentage: 0.4,
      //   },
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

  // ----------------------------chart --------------------------------
  const data = {
    textAlign: "center",
    labels: [
      ["LearningDL", 11],
	["ParmenanrDL", 2],
	["ReneDL", 2],
	["VoterCard", 2],
	["UdhamAdhar", 7],
	["FoodLineces", 1],
	["CompGST", 18],
	["IndGST", 11],
	["E_Gazette", 2],
  ["Passport", 18],
  ["ShopAct",20]
	["Income", 2],
	["AgeDomiclie", 2],
	["EWS", 7],
	["NonCreamly", 1],

    ],

    datasets: [
      {
        label: "Data",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
        backgroundColor: [
          "rgb(120,52,144)",
          "rgb(68,48,140)",
          "rgb(60,91,166)",
          "rgb(19,144,201)",
          "rgb(95,171,68)",
          "rgb(201,214,52)",
          "rgb(235,228,56)",
          "rgb(241,183,23)",
          "rgb(241,150,29)",
          "rgb(233,81,35)",
          "rgb(205,85,126)",
          "rgb(232,142,152)",
          "rgb(221,162,153)",
          "rgb(240,208,198)",
        ],
        borderColor: [
          "rgb(120,52,144)",
          "rgb(68,48,140)",
          "rgb(60,91,166)",
          "rgb(19,144,201)",
          "rgb(95,171,68)",
          "rgb(201,214,52)",
          "rgb(235,228,56)",
          "rgb(241,183,23)",
          "rgb(241,150,29)",
          "rgb(233,81,35)",
          "rgb(205,85,126)",
          "rgb(232,142,152)",
          "rgb(221,162,153)",
          "rgb(240,208,198)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgb(234,237,247)", // Set the color for the y-axis labels
        },
        grid: {
          color: "rgba(126,127,132,0.3)", // Set the color for the y-axis grid lines
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          // color: 'rgb(234,237,247)', // Set the color for the y-axis labels
        },
        grid: {
          color: "rgba(126,127,132,0.1)", // Set the color for the y-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };
  // 	const VIDEO_PATH = 'https://youtu.be/0BIaDVnYp2A';
  // const playerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [closePopup, setclosePopup] = useState(false);
  useEffect(() => {
    const hasShownPopup = localStorage.getItem("hasShownPopup");
    if (!hasShownPopup) {
      setShowPopup(true);
      localStorage.setItem("hasShownPopup", true);
    }
  }, []);
  const PIdata = [
    ["Task", "Hours per Day"],
    ["LearningDL", 11],
    ["ParmenanrDL", 2],
    ["ReneDL", 2],
    ["VoterCard", 2],
    ["UdhamAdhar", 7],
    ["FoodLineces", 1],
    ["CompGST", 18],
    ["IndGST", 11],
    ["E_Gazette", 2],
    ["Passport", 18],
	["Income", 18],
	["AgeDomiclie", 25],
	["EWS", 10],
	["NonCreamly", 36],

   
  
  
    ];
     const PIoptions = {
    title: "My Forms Records",
  
    is3D: true,
    };
  return (
    <Fragment>
      {/* {showPopup && (
        <div className="popup" id="myModal" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
            <div
              class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered "
              id="myModel"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <div class="container-fluid px-4 mt-4">
                    <div class="formlayout">
                      <div class="form-heading">
                        <label
                          class="form-control form-control-lg"
                          style={{ marginBottom: "41px" }}
                        >
                          Notice
                        </label>
                      </div>
                    </div>
                  </div> */}
                  {/* <span class="text-danger"><h3>Notice </h3></span> */}
                  {/* <button onClick={closePopup} style={{ marginBottom: "18px" }}>
                    X
                  </button> */}
                  {/* Close
      </button>     */}
                {/* <div class="modal-body">
                  <p>
                    <strong>महत्वाची</strong> <strong>सूचना</strong>
                  </p>
                  <p>
                    आपणास<strong> </strong>कळविण्यात<strong> </strong>येते
                    <strong> </strong>की<strong>, </strong>दाखल्यांच्या
                    <strong> </strong>सेवांची<strong> </strong>मागणी
                    <strong> </strong>विचारात<strong> </strong>घेता
                    <strong> </strong>त्यावर<strong> </strong>पाठपुरावा
                    <strong> </strong>करून
                    <strong>
                      , इन्कम सर्टिफिकेट ,डोमासाईल सर्टिफिकेट, E.W.S
                      सर्टिफिकेट,नॉन क्रिमिलेअर&nbsp;&nbsp;
                    </strong>
                    या<strong>&nbsp;</strong>चार 4<strong>&nbsp;</strong>
                    सर्व्हिसेस<strong> </strong>आपल्या<strong> </strong>पोर्टल
                    <strong> </strong>वर<strong> </strong>सुरू<strong> </strong>
                    करण्यात<strong> </strong>आल्या<strong> </strong>आहे
                    <strong>. </strong>शाखा<strong> </strong>धारकांनी
                    <strong> </strong>सर्व्हिस<strong> </strong>Activate
                    <strong> </strong>करण्यासाठी<strong> </strong>9373499415
                    <strong> </strong>या<strong> </strong>नंबर<strong> </strong>
                    वर<strong> </strong>संपर्क<strong> </strong>करा
                    <strong>..</strong>
                  </p>{" "}
                </div>
    //                 */}
    {/* //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )} */}
      <Breadcrumb title="ADMIN" parent="ADMIN" />

      <div id="datatable"></div>
      <Container fluid={true}>
        <Row>
          <Col
            xl="3 xl-50"
            md="6"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/notice`)}
            style={{ cursor: "pointer" }}
          >
            {/* <img src={Maharashtra} className="lo1" alt=""/> */}

            <Card className=" o-hidden widget-cards">
              <CardBody
                className="one"
                style={{ borderRadius: "none", }}
              >
                <Media className="static-top-widget row">
                  <div class=""></div>
                  <div className="icons-widgets col-4 rounded-8">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={Note} alt="" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="">
                      <b style={{ color: "black" }}>Notice Board</b>
                    </span>
                    <h3 className="mb-0"></h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody
                className="two "
                style={{ borderRadius: "none",  }}
              >
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={Info} alt="" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <a href="https://wa.me/917507173568">
                      <span className="">
                        <b style={{ color: "black" }}>Need Help</b>
                      </span>
                    </a>
                    <h3 className="mb-0"></h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col
            xl="3 xl-50"
            md="6"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/Trainning`)}
            style={{ cursor: "pointer" }}
          >
            <Card className="o-hidden widget-cards">
              <CardBody
                className="three"
                style={{ borderRadius: "none",  }}
              >
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={Form} alt="" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="">
                      <b style={{ color: "black" }}>Trainning_Video</b>
                    </span>
                    <h3 className="mb-0"></h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody
                className="four"
                style={{ borderRadius: "none",  }}
              >
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={Earning} alt="" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="">
                      <b style={{ color: "black" }}>Total Work</b>
                    </span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={120} />
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>

          <Col xl="3 xl-50" md="6">
            {/* <img src={Maharashtra} className="lo1" alt=""/> */}

            <Card className=" o-hidden widget-cards">
              <CardBody
                className="five"
                style={{ borderRadius: "none", }}
              >
                <Media className="static-top-widget row">
                  <div class=""></div>
                  <div className="icons-widgets col-4 rounded-8">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={Income} alt="" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="">
                      <b style={{ color: "black" }}>Total Income</b>
                    </span>
                    <h3 className="mb-0">
                      ₹ <CountUp className="counter" end={100} />
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody className="six" style={{}}>
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={Complete} alt="" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="">
                      <b style={{ color: "black" }}>Complete Form</b>
                    </span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={100} />
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="o-hidden widget-cards">
              <CardBody
                className="seven"
                style={{ borderRadius: "none"}}
              >
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={chart} alt="" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="">
                      <b style={{ color: "black" }}>Pending Form </b>
                    </span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={10} />
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody
                className="eng"
                style={{ borderRadius: "none" }}
              >
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <img className="App-logo" src={chart} alt="" />
                    </div>
                  </div>
                  <Media
                    body
                    className="col-8"
                    onClick={() =>
                      navigate(`${process.env.PUBLIC_URL}/memberkit`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <span className="">
                      <b style={{ color: "black" }}>Member-kit</b>
                    </span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={100} />
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>

          

          <div class="row mt-2 px-14 ">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body" style={{}}>
                  <div class="row">
                    <div class="col-md-6 col-sm-6 deskShow">
                      <p class="text-center">
                        <strong
                          style={{
                            color: "black",
                            fontSize: "19px",
                            fontFamily: "-moz-initial",
                          }}
                        >
                          {" "}
                          <b>Application Statistics</b>
                        </strong>
                      </p>

                      {/* <img src={Pie} className="pie" alt="" style={{ width: "100%", height: "90%", marginBottom: "10px" }} /> */}

                      <div
                        className="chart_container"
                        style={{
                          width: "100%",
                          height: "87%",
                          borderRadius: "9px",
                          padding: "10px",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "black",
                        }}
                      >
                        {/* <Bar data={data} options={options} />; */}
                        <Line data={data} />;
                      </div>
                    </div>
                    <br />

                    <div class="col-md-6 col-sm-6" style={{display:'flex',justifyContent:'center',textAlign:"right"}}>


											
<Chart  style={{
    display: "flex",
    justifyContent: "center",
    textAlign: "right",
  }}
chartType="PieChart"
data={PIdata}
options={PIoptions}
width={"100%"}
height={"400px"}
/>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

// javascript:void(0)

export default Dashboard;