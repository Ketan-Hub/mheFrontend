import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { useNavigate } from "react-router-dom";

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
import Table_retailer from './Table_retailer';
import Table_form11 from './Table_form11';

const Retailer_console = () => {
  const navigate = useNavigate();
  const [allData, SetAllData] = useState([]);
  const [Form11Data , setForm11Data ] = useState([])


    const [ application_type ,setapplication_type ]=useState(null)
    const [ status , setStatus] =useState(null)
  const [ searchData , setsearch  ]=useState('')
  
  const [items, setItems] = useState();
  const ID=items?.user?._id;
  
  const [ FilteredData , setFilteredData ] =useState(Form11Data) 

  console.log(41,Form11Data)
  
  useEffect(() => {
    const userRespons = JSON.parse(localStorage.getItem('userResponse'));
    if (userRespons) {
      setItems(userRespons);
    }
  }, []);
  
   useEffect(()=>{
     axios.get('https://mhebackend.payagain.in/api/getAll/Form11' )
     .then(async(res)=>{
       const data=await res.data
       // setData(data)  
       const filtered=data.filter((item) => {
         if(item.createdBy==ID)
         {
           return item
          }
        })
        axios.get('https://mhebackend.payagain.in/api/getAll' )
      .then(async(res)=>{
        const data=await res.data
        // setData(data)  
        const filtered4=data.filter((item) => {
          if(item.createdBy===ID)
          {
            return item
          }
        })
        SetAllData([...filtered,...filtered4])
        setForm11Data([...filtered,...filtered4])
        setFilteredData([...filtered,...filtered4]);

      })
      .catch((err)=>console.log(err))
       
      })
      .catch((err)=>console.log(err))
         
    },[ID])


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
        setFilteredData(filtered);
      }else{
        setForm11Data(allData)
        setFilteredData(allData)
      }
    };

    useEffect(()=>{
      handler();
    },[application_type,status])

    const searchByName = (e) => {
      setsearch(e.target.value);
      const value = e.target.value;
  
      if (value.length > 0) {
        const searchdata = Form11Data.filter((item, index) => {

          const Name=item.firstName+' '+item.lastName
          
          if ( Name!= undefined && Name.length > 0) {
            const name = item.firstName;
            if (Name.toLowerCase().includes(value.toLowerCase())) {
              return item;
            }
          }
        });
        setFilteredData(searchdata);
      } else {
        setFilteredData(Form11Data);
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
                  <h3 class="box-title">
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

                         <Select.Option value="learning">
                            Learning DL
                          </Select.Option>
                          <Select.Option value="permanant">
                            Permanent DL
                          </Select.Option>
                          <Select.Option value="renew">
                            Renew DL
                          </Select.Option>
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
                          <Select.Option value="EWS">
                            EWS certificate
                          </Select.Option>
                          <Select.Option value="Income certificate">
                            Income certificate
                          </Select.Option>
                          <Select.Option value="Non_Cremylayer certificate">
                            Non-cremylayer certificate
                          </Select.Option>
                          <Select.Option value="Age_Nationality">
                            Age-Nationality certificate
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
                          onChange={(e) => setStatus(e)}                        
                        >
                          <Select.Option value="IN-PROGRESS">
                            IN-PROGRESS
                          </Select.Option>
                          <Select.Option value="SUBMITTED">
                           SUBMITTED
                          </Select.Option>
                          <Select.Option value="PENDING">
                           PENDING
                          </Select.Option>
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
                <div
                  class="box-header box-header-bg"
                  style={{ background: "Lemon" }}
                >
                  <h3 class="box-title ">
                    <span
                      style={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center ",
                      }}
                    >
                      Applicant Overview{" "}
                    </span>
                  </h3>
                </div>
                <Container fluid={true}>
                  <Row>
                    <Col sm="">
                      <Card>
                        <CardBody>
                        {FilteredData.length>0 && 
                           <h6>Search : <span><input type="text " value={searchData} onChange={searchByName}
                           style={{border:"1px solid black" , borderRadius:"3px"}}/></span></h6>
                        }

                        <div className="row mb-3">
                              {" "}
                                                        
                               {
 
                              FilteredData.length>0 ?

                                <Table_form11 FilteredData={FilteredData}/>
                              :
                              <><div>No Data Found</div></> }                  
                              
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

export default Retailer_console;