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
import Table_agent from './Table_agent';


const Application_Console = () => {

  const [items, setItems] = useState();
  const ID=items?.user?._id;
  const [retailerID ,setretailerID ]=useState('')


  useEffect(() => {
    const userRespons = JSON.parse(localStorage.getItem('userResponse'));
    if (userRespons) {
      setItems(userRespons);
    }
  }, []);

  useEffect(()=>{

    axios.get('https://mhebackend.payagain.in/api/user/getAll')
    .then((res)=>{

      const data=res.data
      const filtered=data.filter((item)=>{

        if(item.agent==ID)
        {
          return item
        }
      })

      setretailerID(filtered[0]?._id)
    })

  },[ID])

  const navigate = useNavigate();
    const [ Data , setData ] = useState([])
    const [ FilteredData , setFilteredData ] = useState(Data);
    const [ application_type, setapplication_type ] =useState('')
    const [ status ,setStatus ] =useState('')
    const [ searchdata , setsearch  ]=useState('')

    console.log('Data',Data)

    useEffect(()=>{
    axios.get('https://mhebackend.payagain.in/api/getAll')
    .then(async(res)=>{

        const data=await res.data
        const filtered=data.filter((item)=>{

          if(item.createdBy==retailerID)
          {
            return item
          }
        })
        setData(filtered);
        setFilteredData(filtered);
    })
    .catch((err)=>console.log(err))
    },[retailerID])

    const handler=()=>{
      const filtered=Data.filter((item)=>{
       if(item.application_type===application_type && item.status===status)
       {
        return item
       }
    })
      setFilteredData(filtered)
    }

    useEffect(()=>{
      handler();
    },[application_type , status])

  const searchByName = (e) => {
    setsearch(e.target.value);
    const value = e.target.value
  
      if(value.length>0 ){
        const searchdata = FilteredData.filter((item,index)=>{
          if( item.createdByName!=undefined && item.createdByName.length>0){
          const name = item.createdByName
          if(name.toLowerCase().includes(value.toLowerCase())){
            return item
          }
        }
        })
        setFilteredData(searchdata)
      }else{
        setFilteredData(FilteredData)
      }
  };


  return (
    <>
      <Breadcrumb title={" Application_Console :"} parent={"Certificate"}
     />

      <Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
                <div class="box-header ">
                  <h3 class="">
                    <span id="CPH_Panelappdetails" style={{fontWeight:"700"}}>Application Type:</span>
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
                         onChange={(e)=>setapplication_type(e)}
                        >
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
                          onChange={(e)=>setStatus(e)}
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
                        
                          <button class="btn btn-primary" type="button">
                            Back
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
                  

                             <h6>Search : <span><input type="text " value={searchdata} onChange={searchByName}
                             style={{border:"1px solid black" , borderRadius:"3px"}}/></span></h6>


                       
                        <div className="row" >
                              {" "}
                              {                              
                                FilteredData.length>0 ? <Table_agent FilteredData={FilteredData}/>
                                :
                                <div> No found Data</div>
                        
                              }
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

export default Application_Console;