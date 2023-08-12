import React, { useState } from 'react'
import Mesk01 from './image/Mesk01.jpg';
import Mesk02 from './image/Mesk02.jpg'
import Mesk03 from './image/Mesk03.jpg'
import Mesk04 from './image/Mesk04.jpg'
import imgg from './image/imgg.jpg'
import imgg2 from './image/imgg2.jpg'
import Profile from './image/Profile.jpeg';
import pic1 from './image/pic1.jpeg';
import pic2 from './image/pic2.jpeg';
import pic3 from './image/pic3.jpeg';
import pic4 from './image/pic4.jpeg';
import pic5 from './image/pic5.jpeg';
import pic6 from './image/pic6.jpeg';
// import './Landing.css'
const Home = () => {

    return (
        <>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                        <img src={Mesk01} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                        <img src={Mesk02} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={Mesk03} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={Mesk04} class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>


            <div className='About'>
                <div className=' row text-center'>
                    <h3 className='heading1'>WELCOME TO MAHARASHTRA E-SEVA KENDRA</h3>
                    <div className='mx-1 row'>
                        <h2 className=''>आजच सुरू करा महाराष्ट्र ई-सेवा केंद्र आणि बना हमखास आत्मनिर्भर..!</h2>
                    </div>
                </div>


                <div class="pic-slider ">
                    <div class="allslider row">
                    <div className="col-lg-4">
                            <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src={pic5} class=" d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src={pic3} class=" d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src={pic3} class=" d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div id="carouselExampleControlsNoTouching1" class="carousel slide" data-bs-touch="false">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src={pic5} class=" d-block w-100" alt="..." />

                                    </div>
                                    <div class="carousel-item">
                                        <img src={pic3} class=" d-block w-100" alt="..." />

                                    </div>
                                    <div class="carousel-item">
                                        <img src={pic3} class=" d-block w-100" alt="..." />

                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching1" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching1" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div id="carouselExampleControlsNoTouching2" class="carousel slide" data-bs-touch="false">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src={pic5} class=" d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src={pic3} class=" d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src={pic3} class=" d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching2" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching2" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner-sec carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                            <img src={imgg} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={imgg2} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>


                <div className='paragraph2' style={{lineHeight:"2.7"}}>
                    <p>महाराष्ट्र इन्फॉर्मेटिक्स प्राइवेट लिमिटेड हा उपक्रम प्रामाणिकपणे,लोकांच्या विश्वासास पात्र राहून पैसे कमविण्याचा एक चांगला पर्याय आहे. या व्यवसायातून समाजातील सर्वच स्तरातील अनेक समाजबांधवांशी संबंध येतो आणि त्यातून तुम्ही समाजाशी देखील जोडले जाता. तुमची स्वतःची एक ओळख निर्माण होते. आणि सहजपणे तुम्ही तुमच्या वेळेनुसार व्यवसाय करू शकता व सोईनुसार वाढवू शकता. महाराष्ट्र इन्फॉर्मेटिक्स प्राइवेट लिमिटेड या उपक्रमातून तुम्ही लोकांना योग्य व कमी काळात चांगली सेवा दिली तर लोक तुमच्याकडे मोठ्या विश्वासाने पाहतात आणि तुमच्या व्यवसायास मोठे स्वरूप प्राप्त होते व तुम्हीच तुमच्या व्यवसायाचे मालक होता.त्याचे फायदेही खूप आहेत.

                        मग वाट कसली बघताय सुरु करा महाराष्ट्र इन्फोटेक. च्या साथीने स्व:ताचा व्यवसाय आणि कमवा महिना लाख रुपये आणि द्या इतरांना रोजगार.</p>
                </div>

                <div class="picture row">
                    <div class="cards-pic col-lg-4">
                        <div className="neww_card">
                            <img className='pics' src={pic1} alt="" />
                        </div>
                    </div>
                    <div class=" cards-pic col-lg-4">
                        <div className="neww_card">
                            <img className='pics' src={pic2} alt="" />
                        </div>
                    </div>
                    <div class=" cards-pic col-lg-4">
                        <div className="neww_card">
                            <img className='pics' src={pic3} alt="" />
                        </div>
                    </div>
                </div>
                <div class="picture row">
                    <div class=" cards-pic col-lg-4">
                        <div className="neww_card">
                            <img className='pics-odd' src={pic4} alt="" />
                        </div>
                    </div>
                    <div class=" cards-pic col-lg-4">
                        <div className="neww_card">
                            <img className='pics' src={pic5} alt="" />
                        </div>
                    </div>
                    <div class=" cards-pic col-lg-4">
                        <div className="neww_card">
                            <img className='pics' src={pic6} alt="" />
                        </div>
                    </div>
                    <hr className='hrline mt-3' />
                </div>



                <div className="row container-fluid">
                    <div className="col-lg-8 paragraph" style={{fontSize:'17px'}}>
                        <h5 className='para'>महाराष्ट्र ई-सेवा केंद्र हा उपक्रम प्रामाणिकपणे,लोकांच्या विश्वासास पात्र राहून पैसे कमविण्याचा एक चांगला पर्याय आहे. या व्यवसायातून समाजातील सर्वच स्तरातील अनेक समाजबांधवांशी संबंध येतो आणि त्यातून तुम्ही समाजाशी देखील जोडले जाता. तुमची स्वतःची एक ओळख निर्माण होते. आणि सहजपणे तुम्ही तुमच्या वेळेनुसार व्यवसाय करू शकता व सोईनुसार वाढवू शकता. महाराष्ट्र ई-सेवा केंद्र या उपक्रमातून तुम्ही लोकांना योग्य व कमी काळात चांगली सेवा दिली तर लोक तुमच्याकडे मोठ्या विश्वासाने पाहतात आणि तुमच्या व्यवसायास मोठे स्वरूप प्राप्त होते व तुम्हीच तुमच्या व्यवसायाचे मालक होता.त्याचे फायदेही खूप आहेत. जसे की आर्थिक स्वातंत्र्य.म्हणजे तुम्ही तुमच्या वेळेनुसार आर्थिक सोर्स निर्माण करू शकता.या व्यवसायात तुम्हाला वैयक्तिक कामाचे स्वातंत्र्य राहते. कामकाजाचे स्वातंत्र्य आणि अनेक फायदे ज्यांनी व्यक्तीचे जीवन अधिक अर्थपूर्ण बनते..</h5>

                    </div>
                    <div className="col-lg-4">
                        <ul className='para-profilee'>
                            <li>
                                <img className='profilee p-3 ' src={Profile} alt="" />
                            </li>
                            <li>
                                <h5 class="profilee-txt ">Gorakh Bangar CEO</h5>
                            </li>
                        </ul>
                        {/* <div className="col-lg-6 text-end col-md-12 " >

                            </div>
                            <div className="col-lg-6">

                            </div> */}
                    </div>
                </div>

            </div>
            {/* </div > */}



            {/* <div className='contact-us'>
                <h1 className='contact text-center' >CONTACT US</h1>
                <hr className='hrline' />
                <form className='' >
                    <label for="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Enter your name.." required />

                    <label for="fname">Phone no.</label>
                    <input type="text" id="fname" name="firstname" placeholder="Phone no.." required />

                    <label for="fname">Address</label>
                    <input type="text" id="fname" name="firstname" placeholder="Address" required />

                    <label for="lname">Email-Id</label>
                    <input type="text" id="lname" name="lastname" placeholder="Enter your E-mail.." required />

                    <label for="exampleFormControlTextarea1" class="form-label" >Message</label>
                    <textarea class="textarea form-control" placeholder='Enter your message..' id="exampleFormControlTextarea1" rows="3"></textarea>

                    <button type="submit" className='submit btn btn-success' >Submit</button>
                </form >
            </div> */}
            <hr className='hrline' />

        </>
    )
}

export default Home
