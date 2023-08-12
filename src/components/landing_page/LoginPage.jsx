import React from 'react'
import Mesk_logo2 from './image/Mesk_logo2.png';
import './Landing.css'
const LoginPage = () => {
    return (
        <>
            {/* <div className='main-head'>
                <div className="pageBody">
                    <div className="join row">
                        <div className="left col-lg-4">
                            <img className="login_logo" src={Mesk_logo2} alt="" />
                        </div>
                        <div className="right col-lg-8">
                            <h4 className='headingg mb-4'>Login In to Maharashtra e-Seva Kentra</h4>
                            <div class="mb-3">
                                <label for=" exampleFormControlInput1" class="text form-label">Username</label>
                                <input type="email" class="user border-bottom form-control" id="exampleFormControlInput1" placeholder="Username" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="text form-label">Password</label>
                                <input type="email" class="user form-control border-bottom" id="exampleFormControlInput1" placeholder="Password" />
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Show Password
                                </label>
                            </div>
                            <button type="button" class="login_btn btn btn-success btn-lg mt-3 mb-2 ">Login</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className=" backBody">
                <div className="middleCard">
                    <div className="all-data row">
                        <div className="left col-lg-4">
                            <img className="login_logo" src={Mesk_logo2} alt="" />
                        </div>
                        <div className="right col-lg-8">
                            <h4 className='headingg mb-4'>Login In to Maharashtra e-Seva Kentra</h4>
                            <div class=" mb-3">
                                <label for=" exampleFormControlInput1" class="text form-label">Username</label>
                                <input type="email" class="user border-bottom form-control" id="exampleFormControlInput1" placeholder="Username" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="text form-label">Password</label>
                                <input type="email" class="user form-control border-bottom" id="exampleFormControlInput1" placeholder="Password" />
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="text form-check-label" for="flexCheckChecked">
                                    Show Password
                                </label>
                            </div>
                            <button type="button" class="login_btn btn btn-success btn-lg mt-3 mb-2 ">Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
