import React, { Fragment, useEffect, useReducer, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listCoupons";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListCoupons = () => {
  const Navigate=useNavigate();

  const [couponList, setCouponList] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const getData = () => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));
    if (userData) {
      axios
        .get("https://api.goanny.link/api/coupon/get")
        .then((res) => {
          if (userData.user.role === "admin") {
            setCouponList(res.data.coupon);
          } else {
            const filter = res.data.coupon.filter(
              (item) => item.createdBy === userData.user._id
            );
            setCouponList(filter);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getData();
  }, [reducerValue]);

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
  const deleteList=(e,id)=>{
    e.preventDefault();
    axios
      .delete(`https://api.goanny.link/api/coupon/delete/${id}`)
      .then((res) => {
        // setShopId(res.data.data._id);
        // console.log(res);
        // useDispatch(incNumber());
        // navigate(`/coupons/list-coupons`);
        forceUpdate();
        toast.success("coupon delete Successfully...");
      })
      .catch((err) => console.log(err));
  }

  const columns = [
    {
      name: "Sr No",
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
      name: "Code",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.code,
    },
    {
      name: "Discount",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.discount,
    },
    {
      name: "Discount Type",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => row.discountType,
    },
    {
      name: "Status",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => (
        <div className={row.status === "active" ? "dotGreen" : "dotRed"}></div>
      ),
    },
    {
      name: "Expire Date",
      style: {
        textAlign: "center",
      },
      // center:true,
      selector: (row) => <>{dateSeter(row.expiresAt)}</>,
    },
    {
      name: "Action",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => (
        <>
          {/* <EyeOutlined
            style={{ fontSize: "25px", color: "green" }}
            onClick={() => {
              navigate(`/hotel/hotel-details/${row._id}`);
            }} */}
          <EditOutlined style={{ fontSize: "25px", color: "green", cursor:"pointer" }} onClick={() => {
              Navigate(`/coupons/update-coupons/${row._id}`);
            }} />
          <DeleteOutlined
            style={{ fontSize: "25px", color: "red" , cursor:"pointer" }}
            className="marginLeftsm"
            onClick={(e)=>{deleteList(e,row._id)}}
          />
        </>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumb title="List Coupons" parent="Coupons" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Category</h5>
              </CardHeader>
              <CardBody>
                <div
                  id="batchDelete"
                  className="category-table order-table coupon-list-delete"
                >
                  <DataTable
                    columns={columns}
                    data={couponList}
                    pagination
                    highlightOnHover
                    fixedHeader
                    fixedHeaderScrollHeight="550px"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ListCoupons;