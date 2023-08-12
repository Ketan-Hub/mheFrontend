import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const VendorOrders = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const orderData = useSelector((state) => state.allOrders.Orders);
  const [startDate, setstartDate] = useState(new Date());
  const [order, setOrder] = useState(orderData);
  const [selectedValue, setSelectedValue] = useState([]);
 
  const handleStartDate = (date) => {
    setstartDate(date);
    const filter = orderData.filter(
      (item) =>
        new Date(item.createdAt).getDate() === new Date(date).getDate() &&
        new Date(item.createdAt).getMonth() === new Date(date).getMonth() &&
        new Date(item.createdAt).getFullYear() === new Date(date).getFullYear()
    );
    setOrder(filter);
  };
  useEffect(() => {
    setOrder(orderData);
  }, [orderData]);
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
  const totalPrice = (orderItems) => {
    var subTotal = 0;
    orderItems?.forEach((data) => {
      if (data.salePrice) {
        subTotal += data.salePrice * data.quantity;
      } else {
        subTotal += data.price * data.quantity;
      }
    });
    return subTotal;
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
      name: "Order Id",
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
      name: "Approval",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => <>{row.isApproved ? "Yes" : "No"}</>,
    },
    {
      name: "Ordered Quantity",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.orderItems.length,
    },
    {
      name: "Order Date",
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
      selector: (row) => "₹ " + totalPrice(row.orderItems),
    },
    {
      name: "Order Status",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.orderStatus,
    },
    {
      name: "Action",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => (
        <>
          <EyeOutlined
            style={{ fontSize: "25px", color: "green" }}
            onClick={() => {
              navigate(`/vendor/vendor-order-details/${row._id}`);
            }}
          />
        </>
      ),
    },
  ];
  const setTodaysOrder = (e) => {
    e.preventDefault();
    const today = new Date();
    const filter = orderData.filter(
      (item) =>
        new Date(item.createdAt).getDate() === today.getDate() &&
        new Date(item.createdAt).getMonth() === today.getMonth() &&
        new Date(item.createdAt).getFullYear() === today.getFullYear()
    );
    setOrder(filter);
  };
  const catList = [];

  const ExportOrder = [];
  if (order.length > 0) {
    order.forEach((item, index) => {
      // ExportOrder.push(...item.orderItems)
      if (item?.orderItems) {
        item?.orderItems.forEach((data) => {
          ExportOrder.push({
            "Order Id": item._id,
            "Product Name": data.name,
            SKU: data.sku,
            Price: data.salePrice,
            Quantity: data.quantity,
            "Family Code": data.familyCode,
            Category: data.mainCat,
          });
          const findCat = catList.find((itm) => itm === data.mainCat);
          if (!findCat) {
            catList.push(data.mainCat);
          }
        });
      }
    });
  }

  const output = {};
  order.forEach((orderData) => {
    orderData.orderItems.forEach((product) => {
      if (!output[product.mainCat]) {
        output[product.mainCat] = [];
      }
      output[product.mainCat].push({
        "Order Id": orderData._id,
        "Product Name": product.name,
        SKU: product.sku,
        Price: product.salePrice,
        Quantity: product.quantity,
        "Family Code": product.familyCode,
        Category: product.mainCat,
      });
    });
  });
  const output2 = {};
  order.forEach((orderData) => {
    orderData.orderItems.forEach((product) => {
      if (!output2[orderData._id]) {
        output2[orderData._id] = [];
      }
      output2[orderData._id].push({
        "Order Id": orderData._id,
        "Product Name": product.name,
        SKU: product.sku,
        Price: product.salePrice,
        Quantity: product.quantity,
        "Family Code": product.familyCode,
        Category: product.mainCat,
      });
    });
  });
  const ExportOrderExcelCat = () => {
    const fileType = "xlsx";
    const sheets = {};
    const catList = [];
    Object.keys(output).forEach((item) => {
      const ws = XLSX.utils.json_to_sheet(output[item]);
      sheets[item] = ws;
      catList.push(item);
    });
    const wb = { Sheets: sheets, SheetNames: catList };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    console.log("catSheet", data);

    FileSaver.saveAs(data, "FreedyGo Category Wise Orders" + ".xlsx");
  };
  const ExportOrderExcelOId = () => {
    const fileType = "xlsx";
    const sheets = {};
    const orderList = [];
    Object.keys(output2).forEach((item, index) => {
      const ws = XLSX.utils.json_to_sheet(output2[item]);
      sheets[item] = ws;
      orderList.push(`OrderId ${index}`);
    });
    const wb = { Sheets: sheets, SheetNames: orderList };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    console.log("orderSheet", data);

    FileSaver.saveAs(data, "FreedyGo" + ".xlsx");
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const find = selectedValue.find((val) => val === value);
    if (find) {
      const filter = selectedValue.filter((itm) => itm != value);
      setSelectedValue(filter);
    } else {
      setSelectedValue([...selectedValue, value]);
    }
  };
  const DownloadFile = (e) => {
    e.preventDefault();
    if (selectedValue.find((item) => item === "Category")) {
      ExportOrderExcelCat();
    }
    if (selectedValue.find((item) => item === "OrderId")) {
      ExportOrderExcelOId();
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Orders" parent="Sales" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody className="order-datatable">
                <Row>
                  <Col sm="3">
                    <CardHeader>
                      <h5>Manage Order</h5>
                    </CardHeader>
                  </Col>
                  <Col sm="9">
                    <CardHeader>
                      <Row>
                        <Col sm="4" style={{ zIndex: "100" }}>
                          <button
                            className="custom-btn btn-16 mb-3"
                            onClick={() => {
                              setOrder(orderData);
                            }}
                          >
                            {" "}
                            See All Orders
                          </button>{" "}
                          <br />
                          <button
                            className="custom-btn btn-16 mb-3"
                            onClick={(e) => setTodaysOrder(e)}
                          >
                            {" "}
                            Today's Orders
                          </button>
                        </Col>
                        <Col sm="4" style={{ zIndex: "100" }}>
                          <Label className="mb-3">
                            <span style={{ color: "red" }}>*</span> Filter By
                            Date
                          </Label>
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDate}
                          />
                        </Col>
                        <Col sm="4">
                          {/* <CSVLink data={ExportOrder}>Download me</CSVLink> */}
                          <h6>Export Order Report To Excel</h6>
                          <FormGroup>
                            <Input
                              type="checkbox"
                              value="Category"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            <Label style={{ marginLeft: "7px" }}>
                              Category Wise
                            </Label>
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="checkbox"
                              value="OrderId"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            <Label style={{ marginLeft: "7px" }}>
                              Order Wise
                            </Label>
                          </FormGroup>

                          <Button
                            onClick={(e) => {
                              DownloadFile(e);
                            }}
                          >
                            Download
                          </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                  </Col>
                </Row>
              </CardBody>
           
              <CardBody className="order-datatable">
                <DataTable
                  columns={Ordercolumns}
                  data={order}
                  pagination
                  highlightOnHover
                  fixedHeader
                  fixedHeaderScrollHeight="550px"
                  customStyles={customStyles}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default VendorOrders;
