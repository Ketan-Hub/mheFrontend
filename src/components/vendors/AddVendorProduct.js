import React, { Fragment, useEffect, useState } from "react";
// import Breadcrumb from "../../common/breadcrumb";
import {
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const AddVendorProduct = () => {
  const [catdata, setCatData] = useState([]);
  const [branddata, setBrandData] = useState([]);
  const [data, setData] = useState({
    name: "",
    shortDesc: "",
    main_cat: "",
    quantity: "",
    sku: "",
    sub_category: "",
    saleprice: "",
    unit: "",
    totalUnit: "",
    familycode: "",
    imgCount: "",
    brand: "",
  });
  const venderID = JSON.parse(localStorage.getItem("userResponse"));
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const [price, setPrice] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://api.goanny.link/api/category/getAll`)
      .then((res) => {
        setCatData(res.data.categoryList);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://api.goanny.link/api/brand/getAll`)
      .then((res) => {
        setBrandData(res.data.brand);
      })
      .catch((err) => console.log(err));
  }, []);

  const postProduct = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name); //
    formData.append("shortDesc", data.shortDesc); //
    formData.append("mainCat", data.main_cat); //
    // formData.append("quantity", data.quantity);//
    formData.append("sku", data.sku); //
    formData.append("subCat", data.sub_category); //
    formData.append("price", price); //
    formData.append("salePrice", data.saleprice); //
    formData.append("unit", data.unit); //
    formData.append("totalUnit", data.totalUnit); //
    formData.append("familyCode", data.familycode); //
    formData.append("vendorId", venderID.user._id); //
    formData.append("imgCount", data.imgCount); //
    formData.append("brand", data.brand); //

    axios
      .post(`https://api.goanny.link/api/product/create`, formData)
      .then((res) => {
        // console.log(res.data)
        setOpen(false);
        toast.success("Product created successfully");
        navigate("/vendors/Vendor_pro_list");
      })
      .catch((err) => console.log(err));
  };
  const [rejectedProduct,setRejectedProduct] = useState([]);
  const uploadExcel = (e) => {
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
        // console.log(data)
        if (item.length > 0) {
          item.forEach((data) => {
            if (
              data.ProductName != undefined &&
              data.ShortDescription != undefined &&
              data.MainCategory != undefined &&
              data.sku != undefined &&
              data.SubCategory != undefined &&
              data.Price != undefined &&
              data.SalePrice != undefined &&
              data.Unit != undefined &&
              data.TotalUnit != undefined &&
              data.FamilyCode != undefined &&
              data.ImgCount != undefined &&
              data.Brand != undefined &&
              data.SGST != undefined &&
              data.CGST != undefined &&
              data.GST_Available != undefined
            ) {
              console.log(136,data)
              let formData = new FormData();
            formData.append("name", data.ProductName); //
            formData.append("shortDesc", data.ShortDescription); //
            formData.append("mainCat", data.MainCategory); //
            formData.append("sku", data.sku); //
            formData.append("subCat", data.SubCategory); //
            formData.append("price", data.Price); //
            formData.append("salePrice", data.SalePrice); //
            formData.append("unit", data.Unit); //
            formData.append("totalUnit", data.TotalUnit); //
            formData.append("familyCode", data.FamilyCode); //
            formData.append("vendorId", venderID.user._id); //
            formData.append("imgCount", data.ImgCount); //
            formData.append("brand", data.Brand); //
            formData.append("cGst", data.CGST); //
            formData.append("sGst", data.SGST); //
            formData.append("isGst", data.GST_Available==="True" ? true:false); //
            axios
              .post(`https://api.goanny.link/api/product/create`, formData)
              .then((res) => {
                console.log(res.data)
              })
              .catch((err) => console.log(err));
            }else{
              console.log(data)
            }
            
          });
        }
      })
      .catch((err) => console.log(err));
    toast.success("Product List Excel Upload Successfully");
    navigate("/vendors/Vendor_pro_list");
    setOpen(false);
    window.location.reload();
  };
  // const bulkProduct = (e) => {
  //   e.preventDefault();
  //   let formData = new FormData();
  //   formData.append("file", file);

  //   axios
  //     .post(`https://api.goanny.link/api/bulkUpload`, formData)
  //     .then((res) => {
  //       setOpen(false);
  //       toast.success("Product created successfully");
  //       navigate("/products/digital/digital-product-list");
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <Fragment>
      <Breadcrumb title="Add Products" parent="Digital" />
      <div style={{ textAlign: "right", margin: "10px" }}>
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
      </div>
      <Modal isOpen={open} toggle={onCloseModal}>
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Digital Product
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
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={(e) => uploadExcel(e)}>
            Save
          </Button>
          <Button type="button" color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Container fluid={true}>
        <Row className="product-adding">
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>General</h5>
              </CardHeader>
              <CardBody>
                <div className="digital-add needs-validation">
                  <FormGroup>
                    <Label className="col-form-label pt-0">
                      <span>*</span> Product Name
                    </Label>
                    <Input
                      className="form-control"
                      id="validationCustom01"
                      type="text"
                      required=""
                      value={data.name}
                      onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0">
                      <span>*</span> SKU
                    </Label>
                    <Input
                      className="form-control"
                      id="validationCustom02"
                      type="text"
                      required=""
                      value={data.sku}
                      onChange={(e) => {
                        setData({ ...data, sku: e.target.value });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Main Categories
                    </Label>
                    <select
                      className="form-select"
                      required=""
                      onChange={(e) => {
                        setData({ ...data, main_cat: e.target.value });
                      }}
                    >
                      <option value="">--Select Main Category--</option>

                      {catdata?.map((item) => (
                        <>
                          <option value={item.name}>{item.name}</option>
                        </>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Sub Categories
                    </Label>
                    <select
                      className="form-select"
                      required=""
                      onChange={(e) => {
                        setData({ ...data, sub_category: e.target.value });
                      }}
                    >
                      <option value="">--Select Sub Category--</option>

                      {catdata
                        .filter((item) => item.name == data.main_cat)
                        .map((item) => (
                          <>
                            {item.children.map((subCat) => (
                              <>
                                <option value={subCat.name}>
                                  {subCat.name}
                                </option>
                              </>
                            ))}
                          </>
                        ))}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Product Price
                    </Label>
                    <Input
                      className="form-control"
                      id="validationCustom02"
                      type="text"
                      required=""
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                    {/* <Label className="col-form-label">
                      <span>*</span> Product Stock
                    </Label>
                    <Input
                      className="form-control"
                      id="validationCustom02"
                      type="text"
                      required=""
					  value={stock}
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
                    /> */}
                  </FormGroup>
                  <Label className="col-form-label pt-0"> Image Count</Label>
                  <Input
                    className="form-control"
                    id="validationCustom02"
                    type="text"
                    value={data.imgCount}
                    required=""
                    onChange={(e) => {
                      setData({ ...data, imgCount: e.target.value });
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              {" "}
              <CardBody>
                <FormGroup>
                  <Label className="col-form-label pt-0">
                    <span>*</span> sales Price
                  </Label>
                  <Input
                    className="form-control"
                    id="validationCustom02"
                    type="text"
                    required=""
                    value={data.saleprice}
                    onChange={(e) => {
                      setData({ ...data, saleprice: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label pt-0">
                    <span>*</span>unit (eg, kg)
                  </Label>
                  <Input
                    className="form-control"
                    id="validationCustom01"
                    type="text"
                    required=""
                    value={data.unit}
                    onChange={(e) => {
                      setData({ ...data, unit: e.target.value });
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="col-form-label pt-0">
                    <span>*</span>totalunit (eg, kg)
                  </Label>
                  <Input
                    className="form-control"
                    id="validationCustom01"
                    type="text"
                    required=""
                    value={data.totalUnit}
                    onChange={(e) => {
                      setData({ ...data, totalUnit: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label pt-0">
                    <span>*</span>family code (eg, kg)
                  </Label>
                  <Input
                    className="form-control"
                    id="validationCustom01"
                    type="text"
                    required=""
                    value={data.familycode}
                    onChange={(e) => {
                      setData({ ...data, familycode: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    <span>*</span> Brand
                  </Label>
                  <select
                    className="form-select"
                    required=""
                    onChange={(e) => {
                      setData({ ...data, brand: e.target.value });
                    }}
                  >
                    <option value="">--Select Brand--</option>

                    {branddata?.map((item) => (
                      <>
                        <option value={item.name}>{item.name}</option>
                      </>
                    ))}
                  </select>
                </FormGroup>

                <div className="digital-add needs-validation">
                  <FormGroup className=" mb-0">
                    <Label className="col-form-label">
                      <span>*</span> Product Description
                    </Label>
                    <div className="description-sm">
                      {/* <MDEditor
									value={value}
									onChange={onChange}
								/> */}
                      <textarea
                        placeholder="Add Product Short Description"
                        value={data.shortDesc}
                        onChange={(e) => {
                          setData({ ...data, shortDesc: e.target.value });
                        }}
                      />
                    </div>
                  </FormGroup>
                </div>
                <div className="digital-add needs-validation mt-4">
                  <FormGroup className=" mb-0">
                    <div className="description-sm">
                      <Button
                        type="button"
                        color="secondary"
                        onClick={postProduct}
                        data-toggle="modal"
                        data-original-title="test"
                        data-target="#exampleModal"
                      >
                        Add Product
                      </Button>
                    </div>
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddVendorProduct;
