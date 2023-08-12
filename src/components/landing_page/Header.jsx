import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MahaESeva3 from './image/MahaESeva3.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandPage.css'
// import './Landing.css'
const Navbar = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        enquiryNote: "",
    });
    const [formValue, setFormValue] = useState(data);
    const [errors, setErrors] = useState(false);


    const handleInput = (e) => {
        const newObj = { ...formValue, [e.target.name]: e.target.value }
        setFormValue(newObj);
    }
    const handleEnquiryForm = (e) => {
        e.preventDefault();
        setErrors(Validation(formValue));
        if (data.name !== '' && data.email !== '' && data.phoneNo !== '' && data.enquiryNote !== '') {
            axios
                .post('https://mhebackend.payagain.in/api/contact/create', data)
                .then((response) => {
                    const contact = response.data;
                    alert("Form Submitted");
                })
                .catch((error) => {
                    console.error('', error);
                });
        } else {
            alert("please fill all fields")
        }
    }

    const Validation = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Name field is required ";
            setErrors(true);
        } else if (!formValue.name.replace(/\s/g, "").length <= 0) {
            errors.name = " Empty field are not allowed";
        }
        if (!values.email) {
            errors.email = "Email feild is required";
            setErrors(true);
        } else if (!regex.test(values.email)) {
            errors.email = "Please enter valid email ";
            setErrors(true);
        } else if (!formValue.email.replace(/\s/g, "").length <= 0) {
            errors.name = " Empty field are not allowed"
        }
        if (!values.phoneNo) {
            errors.phoneNo = "Phone number is required ";
            setErrors(true);
        } else if (values.phoneNo.length < 11) {
            errors.phoneNo = "Phone number must be 10 digit  ";
            setErrors(true);
        } else if (!formValue.phoneNo.replace(/\s/g, "").length <= 0) {
            errors.name = "Empty field are not allowed"
        }
        if (!values.enquiryNote) {
            errors.enquiryNote = "Enquiry Note cannot be blank ";
            setErrors(true);
        } else if (!formValue.enquiryNote.replace(/\s/g, "").length <= 0) {
            errors.name = " Empty field are not allowed"
        }

        return errors;
    }
    return (
        <>
            <nav class="navnav bg-body-tertiary">
                <ul className='contact-info'>
                    <li>
                        <p className='info'><i class="bi bi-telephone-fill"></i>&nbsp; 8530676768&nbsp;|&nbsp;9764931818</p>
                    </li>
                    <li>
                        <p className='info'>&nbsp; |&nbsp; <i class="bi bi-envelope-fill"></i>&nbsp; maharashtrainformatics@gmail.com</p>
                    </li>
                    <li>
                        <p className='info'>&nbsp; |&nbsp; Reg No : U63122PN2023OPC221703</p>
                    </li>
                </ul>
            </nav>

            <nav class="navbar navbar-expand-lg bg-body-tertiary navbarCont">
                <div class="container-fluid  nav-sec ">
                    <ul className='logo-btn'>
                        <li>
                            <img className='logo1 mx-4' src={MahaESeva3} alt="" ></img>
                        </li>
                        <li>
                            <button class="mesklogin btn " onClick={(e)=>{navigate("/login")}}> MESK Login <i class="bi bi-box-arrow-in-right"></i></button>
                        </li>
                    </ul>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item1">
                                <Link class="nav-link nav-link1 active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link nav-link1 active" aria-current="page" to='/about'>About</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link nav-link1 active" aria-current="page" to="/">Places</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link nav-link1 active" aria-current="page" to="/contact">Contact Us</Link>
                            </li>
                            <li class="nav-item" >
                                <Link type="button" class="nav-link nav-link1 active" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Enquiry
                                </Link>
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog" onSubmit={Validation}>
                                        <div class="modal-content " >
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Enquiry Form</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class=" mb-1">
                                                    <label for="exampleFormControlInput1" id="firstName" class="form-label">Full Name<span className='text-danger'>*</span></label>
                                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder=" Full Name" onChange={(e) => { setData({ ...data, name: e.target.value }); handleInput(e) }} />
                                                </div>
                                                {errors.name && data.name.length <= 0 ? <p className='text-danger' style={{ fontSize: "14px" }}>{errors.name}</p> : ""}
                                                <div class=" mb-1">
                                                    <label for="exampleFormControlInput1" class="form-label">Email-id<span className='text-danger'>*</span></label>
                                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="E-mail address" onChange={(e) => { setData({ ...data, email: e.target.value }); handleInput(e) }} />
                                                </div>
                                                {errors.email && data.email.length <= 0 ? <p className='text-danger' style={{ fontSize: "14px" }}>{errors.email}</p> : ""}
                                                <div class=" mb-1">
                                                    <label for="exampleFormControlInput1" class="form-label">Phone no.<span className='text-danger'>*</span></label>
                                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Phone no." onChange={(e) => { setData({ ...data, phoneNo: e.target.value }); handleInput(e) }} />
                                                </div>
                                                {errors.phoneNo && data.phoneNo.length <= 0 ? <p className='text-danger' style={{ fontSize: "14px" }}>{errors.phoneNo}</p> : ""}
                                                <div class="mb-1">
                                                    <label for="exampleFormControlTextarea1" class="form-label">Enquiry<span className='text-danger'>*</span></label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setData({ ...data, enquiryNote: e.target.value }); handleInput(e) }}></textarea>
                                                </div>
                                                {errors.enquiryNote && data.enquiryNote.length <= 0 ? <p className='text-danger' style={{ fontSize: "14px" }}>{errors.enquiryNote}</p> : ""}
                                            </div>
                                            <div class="modal-footer ">
                                                <button type="button" class="btn btn-primary " onClick={(handleEnquiryForm)}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
