import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetUser from "./tabset-user";
import { Button, Form, Input, Radio, Select, DatePicker, Upload } from "antd";
import axios from "axios";
import { districtData1 } from "../../constants/data";
import { toast } from "react-toastify";
import swal from "sweetalert";


const Create_user = () => {
  const [form] = Form.useForm();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mobileNumber, setmobile_No] = useState();
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");
  const [role, setRole] = useState("");
  const [area, setarea] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [agent, setAgent] = useState("");
  const [showagentFormPrice, setshowagentFormPrice] = useState(false);
  const [tehsilServices, setapleSarkar] = useState();
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [showAgent, setshowAgent] = useState(false);
  const [singleFormDetail, setsingleFormDetail] = useState();
  const [showservices, setshowservices] = useState(false);
  const [AdminPerEWS, setAdminPerEWS] = useState();
  const [AdminPer_NonCriminal, setAdminPer_NonCriminal] = useState();
  const [AdminPer_Income, setAdminPer_Income] = useState();
  const [AdminPer_AgeNashnality, setAdminPer_AgeNashnality] = useState();
  const [allData , setAllData  ]=useState([])

  console.log('allData',allData)

  const [retailerEWS, setretailer_EWS] = useState();
  const [retailer_NonCriminal, setretailer_NonCriminal] = useState();
  const [retailer_Income, setretailer_Income] = useState();
  const [retailer_AgeNashnality, setretailer_AgeNashnality] = useState();



  const [talukas, setTalukas] = useState([]);
  let AgenashnalityFormPrice = 0;
  let IncomeFormPrice = 0;
  let NomCrimonalFormPrice = 0;
  let ewsFormPrice = 0;
  useEffect(() => {
    axios.get("https://mhebackend.payagain.in/api/user/getAll").then((response) => {
      const data = response.data;
      setAllData(data)
      const filter = data.filter(
        (item) => item.tehsil == tehsil && item.role == "agent"
      );
      console.log(58, filter);
      setfilteredData(filter);
    });
  }, [tehsil]);

  useEffect(() => {
    districtData1.filter((dist) => {
      if (dist.name.toLowerCase() == district.toLowerCase()) {
        setTalukas(dist.tahasil);
      }
    });
  }, [district]);

  useEffect(() => {
    if (role == "retailer") {
      setshowAgent(true);
    } else {
      setshowAgent(false);
    }
  }, [role]);

  useEffect(() => {
    if (role == "retailer") {
      setshowservices(true);
    } else {
      setshowservices(false);
    }
  }, [role]);



  const name = firstName + " " + lastName;
  const [agent_formPrice, setagent_formPrice] = useState({
    agent_nonCriminal: "",
    agent_EWS: "",
    agent_income: "",
    agent_ageNasnality: "",
  });

  const AgentFormDetail = (id) => {
    const AgentFormDetails = filteredData.filter((item) => item._id === id);
    setsingleFormDetail(AgentFormDetails);
  };


  const user = (e) => {
    e.preventDefault();

   
  const retPrevCount = allData.filter((item)=>item.role == "retailer");
  const agePrevCount = allData.filter((item)=>item.role== "agent");


let fName=firstName.charAt(0).toUpperCase() ;
let lName=lastName.charAt(0).toUpperCase() ;

let userName;

if(role=="retailer")
{
   userName=`MESK${fName}${lName}${(retPrevCount.length)+1}`
}
else if(role=="agent"){

  userName=`MESKTC${fName}${lName}${(agePrevCount.length)+1}`

}
  console.log('userName',userName)
    

      const obj = {
        name,
        email,
        mobileNumber,
        district,
        tehsil,
        village,
        role,
        agent_formPrice,
        retaile_formPrice,
        area,
        address1,
        address2,
        agent,
        password:userName,
        username:userName
      };

      axios
        .post("https://mhebackend.payagain.in/api/signup", obj)
        .then((res) => {
          // toast.success("User Created Successfully !", {
          //   position: toast.POSITION.TOP_RIGHT,

          // });

          if(role=="retailer")
          {
          swal(userName, ` Retailer Created successfully! ${userName} is your Password`, "success");

          }
          else if(role=="agent")
          {
          swal(userName,  ` Agent Created successfully! ${userName} is your Password`, "success");

          }
          else{
          swal( " Admin Created successfully!", "success");

          }

          setfirstName("");
          setlastName("");
          setemail("");
          setmobile_No();
          setDistrict("");
          setTehsil("");
          setVillage("");
          setRole("");
          setarea("");
          setAddress1("");
          setAddress2("");
          setAgent("");
          setapleSarkar("");
         
        })
        .catch((err) => console.log(err));
   
  };
  const calculateTotalValue = (initialValue, per) => {
    const percentage = per;
    const total = initialValue + (initialValue * percentage) / 100;
    return total;
  };

  if (showagentFormPrice) {
    ewsFormPrice = calculateTotalValue(
      singleFormDetail[0]?.agent_formPrice?.agent_EWS,
      AdminPerEWS
    );
    NomCrimonalFormPrice = calculateTotalValue(
      singleFormDetail[0]?.agent_formPrice?.agent_nonCriminal,
      AdminPer_NonCriminal
    );
    IncomeFormPrice = calculateTotalValue(
      singleFormDetail[0]?.agent_formPrice?.agent_income,
      AdminPer_Income
    );
    AgenashnalityFormPrice = calculateTotalValue(
      singleFormDetail[0]?.agent_formPrice?.agent_ageNasnality,
      AdminPer_AgeNashnality
    );
    console.log(
      174,
      ewsFormPrice,
      NomCrimonalFormPrice,
      IncomeFormPrice,
      AgenashnalityFormPrice
    );
  }
  const retaile_formPrice = {
    retailer_nonCriminal: NomCrimonalFormPrice,
    retailer_EWS: ewsFormPrice,
    retailer_income: IncomeFormPrice,
    retailer_ageNashnality: AgenashnalityFormPrice,
  };

  return (
    <Fragment>
      <Breadcrumb title="Create User" parent="Users" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form name="basic" autoComplete="off" layout={"vertical"}>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>First Name
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setfirstName(e.target.value)} />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Last Name
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setlastName(e.target.value)} />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Email
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setemail(e.target.value)} />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Mobile No.
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setmobile_No(e.target.value)} />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>District
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="District"
                          onChange={(e) => setDistrict(e)}
                        >
                          {districtData1.map((item, i) => (
                            <Select.Option value={item.name} key={i}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Tehsil
                      </label>

                      <Form.Item>
                        <Select
                          placeholder="Tehsil"
                          onChange={(e) => setTehsil(e)}
                        >
                          {talukas.map((item, i) => (
                            <Select.Option value={item} key={i}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Village
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setVillage(e.target.value)} />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span> Role
                      </label>

                      <Form.Item>
                        <Select placeholder="Role" onChange={(e) => setRole(e)}>
                          <Select.Option value="admin">Admin</Select.Option>
                          <Select.Option value="retailer">
                            Retailer
                          </Select.Option>
                          <Select.Option value="agent">
                            {" "}
                            Tehsil Co-Ordinator
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Area
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setarea(e.target.value)} />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Address
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setAddress1(e.target.value)} />
                      </Form.Item>
                    </div>

                    {/* <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>password
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setPassword(e.target.value)} />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>confirm Password
                      </label>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Item> */}
                    {/* </div> */}
                  </div>
                  {showservices && (
                    <div className="col-md-4">
                      <label htmlFor="" className="mb-3">
                        {" "}
                        <span className="red">*</span>Use Tehsil Services
                      </label>

                      <Form.Item>
                        <Radio.Group
                          onChange={(e) => setapleSarkar(e.target.value)}
                        >
                          <Radio value="yes">YES</Radio>
                          <Radio value="no">NO</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  )}
                  {role === "agent" ? (
                    <>
                      <div className="col-md-12 ">
                        <table style={{ marginLeft: "20rem" }}>
                          <tr>
                            <td>EWS Form Price: </td>
                            <td>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please input your Ews Form Price!",
                                  },
                                ]}
                              >
                                <Input
                                  type="number"
                                  onChange={(e) =>
                                    setagent_formPrice({
                                      ...agent_formPrice,
                                      agent_EWS: e.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </td>
                          </tr>
                          <tr>
                            <td>Non Criminal Form Price :</td>
                            <td>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please input your Ews Form Price!",
                                  },
                                ]}
                              >
                                <Input
                                  type="number"
                                  onChange={(e) =>
                                    setagent_formPrice({
                                      ...agent_formPrice,
                                      agent_nonCriminal: e.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </td>
                          </tr>
                          <tr>
                            <td>Age Nashnality Form Price :</td>
                            <td>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please input your Ews Form Price!",
                                  },
                                ]}
                              >
                                <Input
                                  type="number"
                                  onChange={(e) =>
                                    // setPassword(e.target.value)
                                    setagent_formPrice({
                                      ...agent_formPrice,
                                      agent_ageNasnality: e.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </td>
                          </tr>
                          <tr>
                            <td>Income Certificate Form Price :</td>
                            <td>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please input your Ews Form Price!",
                                  },
                                ]}
                              >
                                <Input
                                  type="number"
                                  onChange={(e) =>
                                    // setPassword(e.target.value)
                                    setagent_formPrice({
                                      ...agent_formPrice,
                                      agent_income: e.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {tehsilServices && (
                    <>
                      {showAgent == true && (
                        <div className="col-md-4">
                          <label htmlFor="" className="mb-3">
                            {" "}
                            <span className="red">*</span>Tehsil Co-Ordinator
                          </label>

                          <Form.Item>
                            <Select
                              placeholder="select Agent"
                              onChange={(e) => {
                                setAgent(e);
                                AgentFormDetail(e); 
                                setshowagentFormPrice(true);
                              }}
                            >
                              {filteredData.map((item) => (
                                <Select.Option value={item._id} key={item._id}>
                                  {item.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      )}

                      {showagentFormPrice && (
                        <>
                          <table>
                            <tr>
                              <th>form name</th>
                              <th>form Price</th>
                              <th>Admin persentage</th>
                              <th>Retailer Form Cost</th>
                            </tr>
                            <tr>
                              <td> Ews Form Price : </td>
                              {/* <tr> {singleFormDetail[0]?.agent_formPrice?.agent_EWS} </tr>  */}
                              <td>
                                {
                                  singleFormDetail[0]?.agent_formPrice
                                    ?.agent_EWS
                                }
                              </td>
                              <td>
                                {" "}
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input your Ews Form Price!",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    onChange={(e) => {
                                      setAdminPerEWS(e.target.value);
                                    }}
                                  />
                                </Form.Item>
                              </td>
                              <td>
                                {calculateTotalValue(
                                  singleFormDetail[0]?.agent_formPrice
                                    ?.agent_EWS,
                                  AdminPerEWS
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td> Age Nashnality Form Price : </td>
                              <td>
                                {
                                  singleFormDetail[0]?.agent_formPrice?.agent_ageNasnality
                                }
                              </td>
                              <td>
                                {" "}
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input your Ews Form Price!",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    onChange={(e) =>
                                      setAdminPer_AgeNashnality(e.target.value)
                                    }
                                  />
                                </Form.Item>
                              </td>
                              <td>
                                {calculateTotalValue(
                                  singleFormDetail[0]?.agent_formPrice
                                    ?.agent_ageNasnality,
                                  AdminPer_AgeNashnality
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Non Criminal Certificate Form Price : </td>
                              <td>
                                {
                                  singleFormDetail[0]?.agent_formPrice
                                    ?.agent_nonCriminal
                                }
                              </td>
                              <td>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input your Ews Form Price!",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    onChange={(e) =>
                                      setAdminPer_NonCriminal(e.target.value)
                                    }
                                  />
                                </Form.Item>
                              </td>
                              <td>
                                {" "}
                                {calculateTotalValue(
                                  singleFormDetail[0]?.agent_formPrice
                                    ?.agent_nonCriminal,
                                  AdminPer_NonCriminal
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Income Certificate Form Price : </td>
                              <td>
                                {
                                  singleFormDetail[0]?.agent_formPrice
                                    ?.agent_income
                                }
                              </td>
                              <td>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input your Ews Form Price!",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    onChange={(e) =>
                                      setAdminPer_Income(e.target.value)
                                    }
                                  />
                                </Form.Item>
                              </td>
                              <td>
                                {calculateTotalValue(
                                  singleFormDetail[0]?.agent_formPrice
                                    ?.agent_income,
                                  AdminPer_Income
                                )}
                              </td>
                            </tr>
                          </table>
                        </>
                      )}
                    </>
                  )}

                  <div className="col-md-1 m-auto mt-5">
                    <Form.Item>
                      <Button
                        className="btn-primary"
                        onClick={(e) => {
                          user(e);
                        }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Create_user;