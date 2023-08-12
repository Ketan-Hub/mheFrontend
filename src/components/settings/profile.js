import React, { Fragment , useEffect,useState} from "react";
import {useParams} from 'react-router-dom'
import designer from "../../assets/images/dashboard/designer.jpg";
import TabsetProfile from "./tabset-profile";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";
import axios from 'axios'
import {FaRupeeSign} from 'react-icons/fa'

const Profile = () => {

	const [ profileData , setprofileData ]=useState(null)
// console.log(profileData[0].name);
const [items, setItems] = useState();
console.log('items',items)
const ID=items?.user?._id;
console.log(ID)

useEffect(() => {

  const userRespons = JSON.parse(localStorage.getItem('userResponse'));
  console.log(22,userRespons)
  if (userRespons) {
	
   setItems(userRespons);
  }
},[]);


useEffect(()=>{
	if(ID!=undefined)
	{

	axios.get(`https://mhebackend.payagain.in/api/user/getone/${ID}`)
	.then((res)=>{
		const data=res.data
		setprofileData(data)
	})}
},[ID])


const[balance , setBalance ]=useState(0)

useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  if (userData) {
	axios.get(`https://mhebackend.payagain.in/api/recharge`).then((res) => {
	  console.log(88, res.data);
	  
	  const allData = res.data.filter((ele) => ele.user === userData.user._id);
	  let amount = 0
	  let expence = 0
	  if(allData.length>0){
		  allData.forEach(item=>{
		   if(item.isExpence){
			expence+= item.amount;
		   }else{
			amount+= item.amount;
		   }
		  })
	  }
	  setBalance(amount-expence)
	});
  }
}, []);


	return (
		<Fragment>
			<Breadcrumb title="Profile" parent="Settings" />
			{
				profileData!=null &&

			
			<Container fluid={true}>
				<Row>
					<Col xl="4">
						<Card>
							<CardBody>
								
								

								
														
								<div className="profile-details text-center">
									<img
										src={designer}
										alt=""
										className="img-fluid img-90 rounded-circle blur-up lazyloaded"
									/>
									<h5 className="f-w-600 f-16 mb-0">{profileData[0].name}</h5>
									<span>{profileData[0].email}</span>
									<div className="social">
										<div className="form-group btn-showcase">
											<Button color="btn social-btn btn-fb d-inline-block">
												{" "}
												<i className="fa fa-facebook"></i>
											</Button>
											<Button color="btn social-btn btn-twitter d-inline-block">
												<i className="fa fa-google"></i>
											</Button>
											<Button color="btn social-btn btn-google d-inline-block me-0">
												<i className="fa fa-twitter"></i>
											</Button>
										</div>
									</div>
								</div>
								<hr />
								<div className="project-status">
									<h5 className="f-w-600 f-16">User </h5>
									<Media>
										<Media body>
											<h6>
												Balance <span className="pull-right">{balance} <FaRupeeSign/></span>
											</h6>
											<div className="progress sm-progress-bar">
												<div
													className="progress-bar bg-primary"
													role="progressbar"
													style={{ width: "90%" }}
													aria-valuenow="25"
													aria-valuemin="0"
													aria-valuemax="100"
												></div>
											</div>
										</Media>
									</Media>
								
									
								</div>

						

							</CardBody>
						</Card>
					</Col>
					<Col xl="8">
						<Card className="profile-card">
							<CardBody>
								<TabsetProfile profileData={profileData}/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
}
		</Fragment>
	);
};

export default Profile;
