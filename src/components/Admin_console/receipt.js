import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./receipt.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Receipt = () => {
  const  {id}  = useParams();
  const [filterData, setFilterData] = useState([]);
  console.log(16, id);

  useEffect(() => {
    axios
      .get("https://mhebackend.payagain.in/api/getAll/Form11")
      .then(async (res) => {
        const data = await res.data;
        console.log(23, data);
        const filter = data.filter((item) => item._id === id);
        console.log("filter", filter);
        setFilterData(filter);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log("filterData", filterData);

  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };
  return (
    <>
      {filterData[0]?.application_type === "indGST" ||
      filterData[0]?.application_type === "CompanyGST" ? (
        <>
          <div className="wrapper">
            <div className="receipt-box">
              <div className="actual-receipt">
                <div className="receipt-organization-logo">
                  <img alt="logo" src={logo} />
                </div>

                <b style={{ color: "orange" }}>
                  {" "}
                  <u>महाराष्ट्र ई-सेवा केंद्र</u>
                  <br />{" "}
                </b>

                <br />

                <h6>Acknowledgement Details</h6>

                <div className="colored-row first">
                  <span>Acknowledgement Details</span>
                </div>
                <div className="data-row">
                  <span className="font-weight">
                    Application for:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {filterData[0]?.application_type}
                  </span>
                  <span></span>
                </div>
                <div className="data-row">
                  <span className="font-weight">Token No:</span>
                  <span>2352141931253501619997</span>
                </div>
                <div className="data-row">
                  <span className="font-weight">Owner Name:</span>
                  <span>{filterData[0]?.ownerName}</span>
                </div>

                <div className="colored-row">
                  <span>Applicant Details</span>
                </div>

                <div className="data-row">
                  <span className="font-weight">Company Name(English):</span>
                  <span>{filterData[0]?.companyName}</span>
                </div>

                <div className="data-row">
                  <span className="font-weight">Bissness Started Date:</span>
                  <span>{filterData[0]?.businessStarted}</span>
                </div>

                <div className="colored-row">
                  <span>Thank You </span>
                  <span />
                </div>
              </div>

              <div className="receipt-actions-div">
                <div className="actions-right">
                  <button
                    className="receipt-modal-download-button"
                    onClick={downloadPDF}
                    disabled={!(loader === false)}
                  >
                    {loader ? <span>Downloading</span> : <span>Download</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="wrapper">
            <div className="receipt-box">
              <div className="actual-receipt">
                <div className="receipt-organization-logo">
                  <img alt="logo" src={logo} />
                </div>

                <b style={{ color: "orange" }}>
                  {" "}
                  <u>महाराष्ट्र ई-सेवा केंद्र</u>
                  <br />{" "}
                </b>

                <br />

                <h6>Acknowledgement Details</h6>

                <div className="colored-row first">
                  <span>Acknowledgement Details</span>
                </div>
                <div className="data-row">
                  <span className="font-weight">
                    Application for:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {filterData[0]?.application_type}
                  </span>
                  <span></span>
                </div>
                <div className="data-row">
                  <span className="font-weight">Token No:</span>
                  <span>2352141931253501619997</span>
                </div>
                <div className="data-row">
                  <span className="font-weight">Applicant's Full Name:</span>
                  <span>
                    {filterData[0]?.firstName + " " + filterData[0]?.lastName}
                  </span>
                </div>

                <div className="colored-row">
                  <span>Applicant Details</span>
                </div>

                <div className="data-row">
                  <span className="font-weight">Full Name(English):</span>
                  <span>
                    {filterData[0]?.firstName + " " + filterData[0]?.lastName}
                  </span>
                </div>

                <div className="data-row">
                  <span className="font-weight">Date Of Birth:</span>
                  <span>{filterData[0]?.Dob}</span>
                </div>
                <div className="data-row">
                  <span className="font-weight">Gender:</span>
                  <span>{filterData[0]?.gender}</span>
                </div>

                <div className="colored-row">
                  <span>Thank You </span>
                  <span />
                </div>
              </div>

              <div className="receipt-actions-div">
                <div className="actions-right">
                  <button
                    className="receipt-modal-download-button"
                    onClick={downloadPDF}
                    disabled={!(loader === false)}
                  >
                    {loader ? <span>Downloading</span> : <span>Download</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Receipt;
