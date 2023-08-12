import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import MDEditor, { TextAreaCommandOrchestrator } from "@uiw/react-md-editor";
import Textarea from "@uiw/react-md-editor/lib/components/TextArea/Textarea";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TabsetPage = () => {
  const [value, setValue] = useState("");
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const userId = userData.user._id;
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    postedBy: userId,
  });
  const [isdisabled, setisdisabled] = useState(true);
  const [posterImg, setPosterImg] = useState([]);
  const [view, setView] = useState(true);
  const onChange = (e) => {
    setValue(e);
  };
  const postBlog = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", data.title);
    // formdata.append("postedBy", data.postedBy);
    formdata.append("image", posterImg);

    axios
      .post(`https://api.goanny.link/api/carousel/create`, formdata)
      .then((res) => {
        console.log(res.data)
        toast.success("Uploaded successfully");
        setisdisabled(true);
        navigate(`/Poster/list-page`)
      })
      .catch((err) => console.log(err));
  };
  // const postThumbnail = (e)=>{
  // e.preventDefault();
  // console.log(thumbnail)
  // const formdata = new FormData();
  // formdata.append('thumbnail', thumbnail);
  // axios.put(`https://api.goanny.link/api/blog/updateThumbnail/${bId}`,formdata).then(res=>{
  // 	console.log(res.data)
  // 	toast.success("Uploaded successfully");
  // }).catch(err=>console.log(err))

  // }
  return (
    <Fragment>
      <div>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link">General</Tab>
          </TabList>

          <TabPanel>
            <Form className="needs-validation">
              <h4>General</h4>
              <div className="form-group row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Title
                </Label>
                <div className="col-xl-8 col-md-7 p-0">
                  <Input
                    className="form-control"
                    id="validationCustom0"
                    type="text"
                    placeholder="Enter Title"
                    value={data.title}
                    onChange={(e) => {
                      setData({ ...data, title: e.target.value });
                    }}
                  />
                </div>
              </div>
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Poster Image
                </Label>
                <div className="col-xl-6 col-md-4" style={{ display: "flex" }}>
                  <Input
                    className="form-control"
                    id="validationCustom27"
                    type="file"
                    required=""
                    onChange={(e) => {
                      setisdisabled(false);
                      setPosterImg(e.target.files[0]);
                    }}
                  />
                  {/* <Button
                    style={{ margin: "0 6px" }}
                    type="button"
                    onClick={(e) => {
                      postBlog(e);
                    }}
                    disabled={isdisabled}
                  >
                    Upload
                  </Button> */}
                </div>
              </FormGroup>

              <div className="pull-right">
                <Button
                  type="button"
                  color="primary"
                  onClick={(e) => postBlog(e)}
                >
                  Save
                </Button>
              </div>
            </Form>
          </TabPanel>
        </Tabs>
      </div>
    </Fragment>
  );
};

export default TabsetPage;
