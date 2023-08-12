import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listVendor";
import Datatable from "../common/datatable";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { incNumber } from "../../Redux/actions";
// import VenderListAllData from "./Vender-ListAllData";

const List_vendors = () => {
  const vendors = useSelector((state) => state.allVendors.vendors);
  const navigate = useNavigate();
  const [open2, setOpen2] = useState(false);
  const [deleteId,setDeleteId] = useState("")
const dispatch = useDispatch();
  const onOpenModal2 = () => {
    setOpen2(true);
  };

  const onCloseModal2 = () => {
    setOpen2(false);
  };
  const deleteModelOpen = (id) => {
    setDeleteId(id);
    onOpenModal2();
  };
  const deleteDeleveryUnit = (e)=>{
	e.preventDefault();
	axios.delete(`https://api.goanny.link/api/user/delete/${deleteId}`).then(res=>{
		dispatch(incNumber());
		onCloseModal2()
	}).catch(err=>console.log(err))
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
      name: "Mobile Number",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => row.mobileNo,
    },
    {
      name: "IsActive",
      // center:true,
      style: {
        textAlign: "center",
      },
      selector: (row) => <>{row.isActive ? "True" : "False"}</>,
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
            style={{ fontSize: "22px", color: "green" }}
            onClick={() => {
              navigate(`/vendors/vendors-details/${row._id}`);
            }}
          />
          <DeleteOutlined
            style={{ fontSize: "20px", color: "red", marginLeft: "10px" }}
			onClick={()=>{deleteModelOpen(row._id)}}
          />
        </>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumb title="Vendor List" parent="Vendors" />
      <Container fluid={true}>
        <Modal isOpen={open2} toggle={onCloseModal2}>
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Delete Delivery Unit
            </h5>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label htmlFor="message-text" className="col-form-label">
                  Are you sure to delete This Delivery Unit?
                </Label>
              </FormGroup>
            </Form>
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
        <Card>
          <CardHeader>
            <h5>Vendor List</h5>
          </CardHeader>
          <CardBody>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              <DataTable
                columns={columns}
                data={vendors}
                // progressPending={loading}
                pagination
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight="550px"
                //customStyles={customStyles}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default List_vendors;
