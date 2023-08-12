import React from "react";
import Breadcrumb from "../common/breadcrumb";
import { Line, Bar } from "react-chartjs-2";
import {
	lineChart,
	chartOptions,
	areaChart,
	areaOptions,
	barOptions,
	barChart,
	sellOption,
	sellData,
	salesOption,
	salesData,
} from "../../constants/chartData";
import ReportTable from "./report-table";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const Enquire = () => {
	return (
		<div>
			<Breadcrumb title="Enquires" parent="Enquires" />
			<Container fluid={true}>
				<Row>
					<Col  md="">
						<Card>
							{/* <CardHeader>
								<h5>Application Statistics</h5>
							</CardHeader> */}
							<CardBody className="sell-graph">
                            <form class="form-horizontal"  action="formcredit_for_user.php" method="POST"/>
                    
                    {/* <div class="row g-3"> */}
                    {/* <div class="col-md-5">
     <input type="text" name="from_date" id="from_date" min="2000-01-01" max="2080-12-31" class="form-control dateFilter" placeholder="From Date" />
   </div>
   <div class="col-md-5">
     <input type="text" name="to_date" id="to_date"  min="2000-01-01" max="2080-12-31" class="form-control dateFilter" placeholder="To Date" />
    
   </div> */}

   {/* <div class="col-md-2"> */}
     {/* <input type="button" name="search" id="btn_search" value="Search" class="btn btn-primary"  /> */}
     {/* <input type="button"  name="submit" class="btn btn-primary" value="Reset" 
                            onClick="window.open('applicationstats.php','_self');" />
                         
   </div>
 </div> */}
 <br/>
 <div class="container-fluid px-4" >                    
                     <div class="card mb-6 mt-6">                         
                         <div class="card-body" id="d_history">
                                     <table id="mytab" class="table table-bordered ">
                                       <thead>
                                     <tr> <th width="300px">Visit</th>
           <th width="300px">Name</th>
           <th width="200">Mobile Number</th>
           <th width="200">Address</th>
           <th width="200">Enquiry</th>
           <th width="200">Created On </th>
          
                                     </tr> </thead>
                                 <tbody>
                                 <tr> 
        <td>Company GST</td>
        <td>2</td>
         <td>1550</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>


       <tr> 
        <td>Individual GST</td>
        <td>10</td>
         <td>4850</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr> 
        <td>e-Gazette</td>
        <td>105</td>
         <td>68875</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
    

      <tr> 
        <td>Learning DL</td>
        <td>131</td>
         <td>62552</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr> 
        <td>Permanent DL</td>
        <td>13</td>
         <td>15318</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr> 
        <td>Renew DL</td>
        <td>21</td>
         <td>15000</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr> 
        <td>Food Licence</td>
        <td>54</td>
         <td>34149</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr> 
        <td>Passport</td>
        <td>15</td>
         <td>26985</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr> 
        <td>Shop-Act</td>
        <td>336</td>
         <td>24154</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      
      <tr> 
        <td>Udyam-Aadhar</td>
        <td>328</td>
         <td>22890</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr> 
        <td>Voter-Card</td>
        <td>156</td>
         <td>7800</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
</tbody>
<tfoot>
            <tr>
                <th>Total:</th>
                <td><b>1171</b></td>
         <td><b>284123</b></td>
        <td><b>0</b></td>
        <td><b>0</b></td>
        <td><b>0</b></td>
            </tr>
        </tfoot>
</table>
                                    </div>
                                    </div>
                                    </div>
                                   
						</CardBody>
					</Card>
				</Col>
                </Row>
			</Container>
		</div>
	);
};

export default Enquire;
