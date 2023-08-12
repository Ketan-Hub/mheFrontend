// import React from 'react'
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incNumber } from "../../Redux/actions";
import swal from "sweetalert";
import { toast } from "react-toastify";
function Notice() {
  const dispatch = useDispatch();

  const editor = useRef(null);
  const reducer = useSelector((state) => state.changeNumber);

  const [content, setContent] = useState("");
  const [noticeFor, setNoticeFor] = useState("");
  const [IsAlart, setIsAlart] = useState();
  const [getNotice, setNotice] = useState();
  console.log(10, IsAlart);
  const [docs, setDocs] = useState({
    image: "",
  });
  const [selectedValue, setSelectedValue] = useState(); // Set the initial value here

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    axios
      .get(`https://mhebackend.payagain.in/api/notice`)
      .then((res) => {
        const response = res.data.reverse();
        setNotice(response);
      })
      .catch((err) => console.log(40, err));
  }, [reducer]);
  const textShow = (e) => {
    e.preventDefault();
    // console.log(16, content);
    const obj = {
      containt: content,
      noticeFor: noticeFor,
      IsNoticeView: true,
      IsAlart: IsAlart,
    };

    const mainDataPromise = new Promise((resolve, reject) => {
      // console.log(77, Data);
      axios
        .post(`https://mhebackend.payagain.in/api/notice/create`, obj)
        .then((res) => {
          const response = res;
          resolve({
            status: true,
            message: "data Posted Successfully",
            data: res.data,
          });
          dispatch(incNumber());
        })
        .catch((err) => {
          console.log(err);
          reject({
            status: false,
            message: "Data Not posted",
          });
        });
    });

    mainDataPromise
      .then((res) => {
        console.log(124, res.data.data._id);
        uploadImage(res.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadImage = (id) => {
    const formData = new FormData();
    formData.append("image", docs.image);
    axios
      .put(`https://mhebackend.payagain.in/api/notice_image/${id}`, formData)
      .then((res) => console.log("image", res.data))
      .catch((err) => {
        console.log(err);
      });
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
    const day = d.getDate() + 1;
    return `${day} ${monthLater[month]} ${year}`;
  };
  const deleteNotice=(id)=>{
console.log(104,id)
axios
      .delete(`https://mhebackend.payagain.in/api/notice/${id}`)
      .then((res) => {console.log("image", res.data)
      swal("Deleted", "Nitice Deleted successfully!", "success");
      dispatch(incNumber());
    
    })
      
      .catch((err) => {
        console.log(err);
      });
  }
  const showNotice=(id)=>{
if(selectedValue){

  axios
    .put(`https://mhebackend.payagain.in/api/notice/${id}`,{IsNoticeView:selectedValue})
    .then((res) => {console.log("image", res.data)
    swal("Updated", "Nitice Deleted successfully!", "success");
    dispatch(incNumber());
  })
    .catch((err) => {
      console.log(err);
    });
}else{
  toast.error("please select option first")
}
  }

  return (
    <div>
      <div className="mt-5">
        <div
          className="mb-5 text-center "
          style={{
            borderRadius: "20px",
            backgroundColor: "#3bc732",
            color: "white",
          }}
        >
          <h3>Notice Board</h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <JoditEditor
              ref={editor}
              value={content}
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div className="col-lg-4 mt-4">
            <h4 htmlFor="Image">Add Image In Notice</h4>
            <input
              // id="Image"
              type="file"
              class="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              onChange={(e) => setDocs({ ...docs, image: e.target.files })}
            />
          </div>
          <div className="col-lg-4 mt-4">
            <h4 htmlFor="Image">Select Notice view for</h4>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={"Retailer"}
                checked={noticeFor == "Retailer"}
                onChange={() => setNoticeFor("Retailer")}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Retailer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={"Agent"}
                checked={noticeFor == "Agent"}
                onChange={() => setNoticeFor("Agent")}
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Agent
              </label>
            </div>
          </div>
          <div className="col-lg-4 mt-4">
            <h4 htmlFor="Image">Select Notice Type</h4>
            <span style={{ color: "red", fontWeight: "600" }}>
              {" "}
              *If It Is Notice select true or If Congartulation of Festival
              select false{" "}
            </span>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="true"
                value={true}
                checked={IsAlart == true}
                onChange={() => setIsAlart(true)}
              />
              <label class="form-check-label" for="true">
                true
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="false"
                value={false}
                checked={IsAlart == false}
                onChange={() => setIsAlart(false)}
              />
              <label class="form-check-label" for="false">
                false
              </label>
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline-dark mt-4"
          onClick={(e) => textShow(e)}
        >
          Create
        </button>
      </div>
      <div className="contaner">
        <div className="row ">
          <div
            className="col-lg-12 text-center"
            style={{
              borderRadius: "20px",
              backgroundColor: "#3bc732",
              color: "white",
              marginTop: "2rem",
            }}
          >
            <h3>Notice Chart</h3>
          </div>
        </div>
      </div>

      <div className="border row">
        {getNotice?.map((item, index) => {
          return (
            <>
              <div className="border  col-lg-8 mt-2">
                <div className="">
                  <div className="row">
                    <div className="  col-lg-6">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.containt }}
                      />
                    </div>
                    <div className="border col-lg-2">
                      created on :{dateSeter(item.createdAt)}
                    </div>
                    <div className=" col-lg-4">
                      Notice For :{item.noticeFor}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" border col-lg-2 mt-2">
                <div className="row">
                  <div className="col-lg-9">


                <select
                  class="form-select mt-1"
                  aria-label="Default select example"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value="Select an option" selected disabled>Select an option</option> {/* Add default option */}
                  <option value="true">popup</option>
                  <option value="false">close</option>
                </select>
                  </div>
                  <div className="col-lg-3">
                  <i class="bi bi-save2 fs-3" style={{cursor:"pointer"}} onClick={(e)=>{showNotice(item._id)}}></i>
                  </div>
                </div>
              </div>
              <div className=" border col-lg-2 mt-2 p-3 text-center" >
                <i class="bi bi-trash3 fs-2 text-danger" style={{cursor:"pointer"}} onClick={()=>deleteNotice(item._id)}></i>
              </div>
              <div className="text-center p-1">
                <hr className="" style={{ color: "red" }} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Notice;
