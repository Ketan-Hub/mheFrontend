import React, { Fragment ,useEffect,useState} from "react";
import { Link } from "react-router-dom";
//images import
import man from "../../../assets/images/dashboard/man.png";
import {MdPersonOutline} from 'react-icons/md'
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
    const navigate = useNavigate()
	const logOut = ()=>{

        localStorage.clear();
        navigate('/')
    }


	return (
		<Fragment>
			<li className="onhover-dropdown">
				<div className="media align-items-center">
					{/* <img
						className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
						src={MdPersonOutline}
						alt="header-user"
					/> */}
					<MdPersonOutline className="align-self-center pull-right img-50
					 rounded-circle blur-up lazyloaded "  style={{height:"50px" , marginBottom:"10px"}}/>
					<div className="dotted-animation">
						<span className="animate-circle bg-warning"></span>
						<span className="main-circle bg-warning"></span>
					</div>
				</div>
				<ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
					<li>
						<Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
							<i data-feather="user"></i>Edit Profile
						</Link>
					</li>
					<li onClick={logOut} style={{color:"black"}}>
					
							<i data-feather="log-out" ></i>Logout
					
					</li>
				</ul>
			</li>
		</Fragment>
	);
};

export default UserMenu;
