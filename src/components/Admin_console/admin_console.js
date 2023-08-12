import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { useNavigate } from "react-router-dom";
import Table_admin from "./Table_admin";
import MainTable_admin from "./mainTable_admin";
import {MdNotificationsActive} from 'react-icons/md'

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
import { useSelector } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Form, Radio, Select, DatePicker } from "antd";

const Admin_console = () => {
  const navigate = useNavigate();
  const [allData, SetAllData] = useState([]);
  const [Form11Data, setForm11Data] = useState([]);
  const [FilteredData, setfilteredData] = useState(Form11Data);
  const [application_type, setapplication_type] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchdata, setsearch] = useState("");
  const [ TCform_alert , setTCform_alert ]=useState([])

  useEffect(() => {
    axios
      .get("https://mhebackend.payagain.in/api/getAll/Form11")
      .then(async (res) => {
        const data = await res.data;
        SetAllData(data);
        setForm11Data(data);
        setfilteredData(data);
      })
      .catch((err) => console.log(err));


      axios
      .get("https://mhebackend.payagain.in/api/getAll")
      .then(async (res) => {
        const data = await res.data;
         setTCform_alert(data)

        
      })
      .catch((err) => console.log(err));


  }, []);
  const handler = () => {
    if (application_type != null && status != null) {
      const filtered = allData.filter((item) => {
        if (
          item.application_type === application_type &&
          item.status === status
        ) {
          return item;
        }
      });
      setForm11Data(filtered);
      setfilteredData(filtered);
    }else{
      setForm11Data(allData)
      setfilteredData(allData)
    }
  };

  useEffect(() => {
    handler();
  }, [application_type, status]);

  const searchByName = (e) => {
    setsearch(e.target.value);
    const value = e.target.value;

    if (value.length > 0) {
      const searchdata = Form11Data.filter((item, index) => {
        if (item.createdByName != undefined && item.createdByName.length > 0) {
          const name = item.createdByName;
          if (name.toLowerCase().includes(value.toLowerCase())) {
            return item;
          }
        }
      });
      setfilteredData(searchdata);
    } else {
      setfilteredData(Form11Data);
    }
  };



  return (
    <>
      <Breadcrumb title={" Application_Console :"} parent={"Certificate"} />

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header box-header-bg">
                  <h3 class="">
                    <span id="CPH_Panelappdetails">Application Type:</span>
                  </h3>
                </div>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    {" "}
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Certificate Name
                        <span className="red">*</span>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="--Select Application Stauts--"
                          onChange={(e) => setapplication_type(e)}
                        >
                          {/* <Select.Option value="EWS">
                            EWS certificate
                          </Select.Option>
                          <Select.Option value="Income certificate">
                            Income certificate
                          </Select.Option>
                          <Select.Option value="Non_Cremylayer">
                            Non-cremylayer certificate
                          </Select.Option>
                          <Select.Option value="Age_Nationality">
                            Age-Nationality certificate
                          </Select.Option> */}
                          <Select.Option value="learning">
                            Learning DL
                          </Select.Option>
                          <Select.Option value="permanant">
                            Permanent DL
                          </Select.Option>
                          <Select.Option value="renew">Renew DL</Select.Option>
                          <Select.Option value="e_gazzet">
                            e-Gazette
                          </Select.Option>
                          <Select.Option value="foodLicence">
                            Food License
                          </Select.Option>
                          <Select.Option value="CompanyGST">
                            Company GST
                          </Select.Option>
                          <Select.Option value="indGST">
                            Individual GST
                          </Select.Option>
                          <Select.Option value="passport">
                            passport
                          </Select.Option>
                          <Select.Option value="shopAct">
                            Shop-Act
                          </Select.Option>
                          <Select.Option value="voterCard">
                            voter Card
                          </Select.Option>
                          <Select.Option value="udhamAdhar">
                            Udyam-Aadhar
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        Application Status
                        <span className="red">*</span>
                      </label>
                      <Form.Item>
                        <Select
                          placeholder="--Select Application Stauts--"
                          onChange={(e) => {
                            setStatus(e);
                          }}
                        >
                          <Select.Option value="IN-PROGRESS">
                            IN-PROGRESS
                          </Select.Option>
                          <Select.Option value="SUBMITTED">
                            SUBMITTED
                          </Select.Option>
                          <Select.Option value="PENDING">PENDING</Select.Option>
                          <Select.Option value="COMPLETE">
                            COMPLETE
                          </Select.Option>
                          <Select.Option value="REJECTED">
                            REJECTED
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-md-4 mt-2">
                      <Form.Item>
                        <div class="d-grid gap-1 d-md-flex justify-content-md-end mt-4 ">
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={() => navigate("/ts")}
                            style={{position:"relative",width:"220px"}}
                          >
                            Tehsil services
                            <span style={{position:"absolute" ,marginLeft:"5px",marginBottom:"20px"}} >
                              {/* <MdNotificationsActive style={{width:"20px" ,height:"20px" ,marginTop:"5px"}}/> */}
                              <div style={{ textAlign:"center", backgroundColor:"red", width:"35px" , height:"27px" ,borderRadius:"10px"}}>
                              {TCform_alert?.filter(item=>{if(item.isNew)return item})?.length}</div>
                            </span>
                          </button>
                        </div>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <Container fluid={true}>
                  <Row>
                    <Col sm="">
                      <Card>
                        <CardBody>
                          <h6>
                            Search :{" "}
                            <span>
                              <input
                                type="text "
                                value={searchdata}
                                onChange={searchByName}
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "3px",
                                }}
                              />
                            </span>
                          </h6>

                          <div className="row">
                            {" "}
                            {FilteredData.length > 0 ? (
                              <MainTable_admin FilteredData={FilteredData} />
                            ) : (
                              <div style={{marginLeft:"300px" ,marginTop:"50px"}}> No found Data</div>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin_console;
