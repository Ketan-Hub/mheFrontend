import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Settings } from "react-feather";
import { Button, Col, Input, Label, Row, Table } from "reactstrap";
import {useNavigate} from 'react-router-dom'

const TabsetProfile = ({profileData}) => {

	const navigate=useNavigate()
	return (
		<div>
			<Tabs>
				<TabList className="nav nav-tabs tab-coupon">
					<Tab className="nav-link">
						<User className="me-2" />
						Profile
					</Tab>
				
				</TabList>

				<TabPanel>
					<div className="tab-pane fade show active">
						<h5 className="f-w-600 f-16">Profile</h5>
						<div className="table-responsive profile-table">
							<Table className="table-responsive">
								<tbody>
								<tr>
									

                                        <td>Name:</td>
										<td>{profileData[0].name}</td>
											
								
									</tr>
								
									<tr>
										<td>Email:</td>
										<td>{profileData[0].email}</td>
									</tr>
									
									<tr>
										<td>Mobile Number:</td>
										<td>{profileData[0].mobileNumber}</td>
									</tr>
									<tr>
										<td>District</td>
										<td>{profileData[0].district}</td>
									</tr>
									<tr>
										<td>Tehsil</td>
										<td>{profileData[0].tehsil}</td>
									</tr>
									
									<tr>
										<td>Address</td>
										<td>{profileData[0].address1}</td>
									</tr>
									<tr>
										<td>Tehsil Services</td>
										<td>{profileData[0].tehsilServices}</td>
									</tr>
									<tr>
										<td></td>
										<td></td>
										<td></td>
										{/* <td><Button> Update</Button></td> */}
										<td><Button onClick={()=>navigate('/dashboard')} >Back</Button></td>

									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					{/* <div className="tab-pane fade"> */}
					<div className="account-setting">
						<h5 className="f-w-600 f-16">Notifications</h5>
						<Row>
							<Col>
								<Label className="d-block form-label">
									<Input
										className="checkbox_animated"
										id="chk-ani"
										type="checkbox"
										defaultChecked
									/>
									Allow Desktop Notifications
								</Label>
								<Label className="d-block form-label">
									<Input
										className="checkbox_animated"
										id="chk-ani1"
										type="checkbox"
									/>
									Enable Notifications
								</Label>
								<Label className="d-block form-label">
									<Input
										className="checkbox_animated"
										id="chk-ani2"
										type="checkbox"
									/>
									Get notification for my own activity
								</Label>
								<Label className="d-block mb-0">
									<Input
										className="checkbox_animated"
										id="chk-ani3"
										type="checkbox"
										defaultChecked
									/>
									DND
								</Label>
							</Col>
						</Row>
					</div>
					<div className="account-setting deactivate-account">
						<h5 className="f-w-600 f-16">Deactivate Account</h5>
						<Row>
							<Col>
								<Label className="d-block form-label">
									<Input
										className="radio_animated"
										id="edo-ani"
										type="radio"
										name="rdo-ani"
										defaultChecked
									/>
									I have a privacy concern
								</Label>
								<Label className="d-block form-label">
									<Input
										className="radio_animated"
										id="edo-ani1"
										type="radio"
										name="rdo-ani"
									/>
									This is temporary
								</Label>
								<Label className="d-block mb-0">
									<Input
										className="radio_animated"
										id="edo-ani2"
										type="radio"
										name="rdo-ani"
										defaultChecked
									/>
									Other
								</Label>
							</Col>
						</Row>
						<Button type="button" color="primary">
							Deactivate Account
						</Button>
					</div>
					<div className="account-setting deactivate-account">
						<h5 className="f-w-600 f-16">Delete Account</h5>
						<Row>
							<Col>
								<Label className="d-block form-label">
									<Input
										className="radio_animated"
										id="edo-ani3"
										type="radio"
										name="rdo-ani1"
										defaultChecked
									/>
									No longer usable
								</Label>
								<Label className="d-block form-label">
									<Input
										className="radio_animated"
										id="edo-ani4"
										type="radio"
										name="rdo-ani1"
									/>
									Want to switch on other account
								</Label>
								<Label className="d-block mb-0">
									<Input
										className="radio_animated"
										id="edo-ani5"
										type="radio"
										name="rdo-ani1"
										defaultChecked
									/>
									Other
								</Label>
							</Col>
						</Row>
						<Button type="button" color="primary">
							Delete Account
						</Button>
					</div>
					{/* </div> */}
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default TabsetProfile;
