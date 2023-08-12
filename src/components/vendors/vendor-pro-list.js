import React, { Fragment, useEffect, useReducer, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listVendor";
import Datatable from "../common/datatable";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  ModalHeader,
  Modal,
  Input,
} from "reactstrap";

import axios from "axios";
import { Edit, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { incNumber } from "../../Redux/actions";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

const Vendor_pro_list = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const userId = userData.user._id;
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [file2, setFile2] = useState([]);
  const disableLoading = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  const productExcelField = [
    "Category",
    "Sub Category",
    "SKU",
    "Family Code",
    "HSN Code",
    "Product Name ",
    "Branded/Non Branded",
    "Brand Name",
    "Product Description",
    "Quantity (In Grams/KG/Litre)",
    "Number of Units",
    "MRP",
    "Margin % (From Distributors)",
    "Margin Amount (From Distributors)",
    "Cost Price (Lending Price)",
    "Margin (To Customer)",
    "Base Price",
    "Tax Status ",
    "Is GST Available",
    "GST (%)",
    "GST (Amount)",
    "CGST",
    "SGST",
    "Selling Price",
    "Discount (On MRP)",
    "Image Count",
  ];
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const allProducts = useSelector((state) => state.allProduct.products);
  // const state = useSelector((state) => state);
  // console.log(state);
  useEffect(() => {
    setData(allProducts);
  }, []);
  const [open2, setOpen2] = useState(false);

  const deleteModelOpen = (id) => {
    setDeleteId(id);
    onOpenModal2();
  };
  const [deleteId, setDeleteId] = useState("");
  const onOpenModal2 = () => {
    setOpen2(true);
  };

  const onCloseModal2 = () => {
    setOpen2(false);
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    axios
      .delete(`https://api.goanny.link/api/product/delete/${deleteId}`)
      .then((res) => {
        console.log(res.data);
        setOpen2(false);
        dispatch(incNumber());
      });
  };
  const uploadExcel = (e) => {
    setLoading(true)
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise
      .then((item) => {
        let toProceed2 = false;
        // console.log(Object.keys(item[0]))
        if (item.length > 0) {
          const keys = Object.keys(item[0]);
          let toProceed = false;
          keys.forEach((key, index) => {
            const find = productExcelField.find((p) => p === key);
            if (!find) {
              toProceed = false;
            } else {
              toProceed = true;
            }
          });
          if (toProceed === true) {
            item.forEach((data, index) => {
            //   const find = Object.keys(file2).filter((file) =>{if(file2[file].name.toLowerCase().includes(`${data[productExcelField[2]].toLowerCase()}`)){
            //     return file2[file]
            //   }}
            // );
              let formData = new FormData();
              // if(find.length>0){
              //   Array.from(find).forEach((pic) => {
              //     formData.append("productImages", file2[pic]);
              //   });
              // }
              formData.append("name", data[productExcelField[5]]);
              formData.append("shortDesc", data[productExcelField[8]]);
              formData.append("mainCat", data[productExcelField[0]]);
              formData.append("subCat", data[productExcelField[1]]);
              formData.append("sku", data[productExcelField[2]]);
              formData.append("familyCode", data[productExcelField[3]]);
              formData.append("hsn", data[productExcelField[4]]);
              formData.append("brand", data[productExcelField[7]]);
              formData.append(
                "isBrand",
                data[productExcelField[6]] === "BRANDED" ? true : false
              );
              formData.append("unit", data[productExcelField[9]]);
              formData.append("totalUnit", data[productExcelField[10]]);
              formData.append(
                "marginFromDistributerinPercent",
                data[productExcelField[12]]
              );
              formData.append(
                "marginFromDistributerinAmount",
                data[productExcelField[13]]
              );
              formData.append("mrp", data[productExcelField[11]]);
              formData.append("costPrice", data[productExcelField[14]]);
              formData.append("basePrice", data[productExcelField[16]]);
              formData.append("salePrice", data[productExcelField[23]]);
              formData.append("discountOnMrp", data[productExcelField[24]]);
              formData.append(
                "isGst",
                data[productExcelField[18]] === "YES" ? true : false
              );
              formData.append("gstInPercent", data[productExcelField[19]]);
              formData.append("gstAmount", data[productExcelField[20]]);
              formData.append("cGst", data[productExcelField[21]]);
              formData.append("sGst", data[productExcelField[22]]);
              formData.append("imgCount", data[productExcelField[25]]);
              formData.append("taxStatus", data[productExcelField[17]]);
              formData.append("vendorId", userData.user._id);
              axios
                .post(`https://api.goanny.link/api/product/create`, formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
            });
            toProceed2 = true;
          }
        }
        if(toProceed2===true){
          disableLoading()
        }
        console.log(toProceed2)
      })
      .catch((err) => console.log(err));
    toast.success("Product List Excel Upload Successfully");
    // dispatch(incNumber());


    // setOpen(false);
    // navigate("/vendors/Vendor_pro_list");
    // window.location.reload();

    // window.location.reload();
  };
  return (
    <Fragment>
      <Breadcrumb title="Product List" parent="Vendors" />

      <Container fluid={true}>
        <div style={{ textAlign: "right", margin: "20px" }}>
          <Button
            color="primary"
            type="button"
            onClick={onOpenModal}
            data-toggle="modal"
            data-original-title="test"
            data-target="#exampleModal"
          >
            Bulk Upload
          </Button>
        </div>{" "}
        <Modal isOpen={open} toggle={onCloseModal}>
          {
            loading ?  <ModalBody> <div className="box"> <div class="containerLoader">
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
          </div>
          </div>
          </ModalBody>
:<>
  <ModalHeader toggle={onCloseModal}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Add  Product
            </h5>
          </ModalHeader>
          <ModalBody>
            <form>
              <FormGroup>
                <Label htmlFor="message-text" className="col-form-label">
                  Bulk Product Upload
                </Label>
                <Input
                  className="form-control"
                  id="validationCustom02"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </FormGroup>
              {/* <FormGroup>
                <Label htmlFor="message-text" className="col-form-label">
                  Bulk Image Upload
                </Label>
                <Input
                  className="form-control"
                  id="validationCustom02"
                  multiple="multiple"
                  type="file"
                  onChange={(e) => {
                    setFile2(e.target.files);
                  }}
                />
              </FormGroup> */}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="primary"
              onClick={(e) => uploadExcel(e)}
            >
              Save
            </Button>
            <Button type="button" color="secondary" onClick={onCloseModal}>
              Close
            </Button>
          </ModalFooter>
</>        
          }
        
        </Modal>
        <Row className="products-admin ratio_asos">
          <Modal isOpen={open2} toggle={onCloseModal2}>
            <ModalHeader toggle={onCloseModal2}>
              <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                Delete Product
              </h5>
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label htmlFor="message-text" className="col-form-label">
                    Are you sure to delete This Product?
                  </Label>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="primary"
                onClick={(e) => deleteProduct(e)}
              >
                Delete
              </Button>
              <Button type="button" color="secondary" onClick={onCloseModal2}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          {allProducts &&
            allProducts.map((data, i) => {
              return (
                <Col xl="3" sm="6" key={i}>
                  <Card>
                    <div className="products-admin">
                      <CardBody className="product-box">
                        <div className="img-wrapper">
                          <div className="front">
                            <a href="/#" className="bg-size">
                              <div
                                style={{
                                  backgroundImage: `url(https://jol-events.s3.ap-south-1.amazonaws.com/${data.sku}_1.jpg)`,
                                  height: "14rem",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                }}
                              ></div>
                            </a>
                            <div className="product-hover">
                              <ul>
                                <li>
                                  <EyeOutlined
                                    className="Viewicon"
                                    onClick={() => {
                                      navigate(
                                        `/vendors/vendors-pro-details/${data._id}`
                                      );
                                    }}
                                  />
                                </li>
                                <li>
                                  <DeleteOutlined
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => deleteModelOpen(data._id)}
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="product-detail">
                          <a href="/#">
                            {" "}
                            <h6>{data.name}</h6>
                          </a>
                          <h4 className="mt-2">
                            ₹{data.salePrice}
                            <del>₹{data.price}</del>
                          </h4>
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Vendor_pro_list;
