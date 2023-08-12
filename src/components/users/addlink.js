import React, { Component } from 'react'
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container,Row,Col } from "reactstrap";
export class Addlink extends Component {
  render() {
    return (
      <div>
        <Breadcrumb title=" Add Links" parent=" Add Links" />
<Container fluid={true}>
        <Row>
          <Col sm="">
            <Card>
              <CardBody>
<div id="layoutSidenav_content">
             <main>
                    <div class="container-fluid px-4 mt-4"> 
                    <form id="frm1"  action="addlink_cd.php" method="POST">
                    <div class="formlayout" >
                      {/* <br/>                     
                        <div class="form-heading">
                             <label class="form-control form-control-lg" >
                          Add Links
                             </label>
								</div>
                     <br/> */}
                     <div class="row g-3">
                        <div class="col-md-6">
                            <label ></label>
                            <input type="text" name="manuallink" id="manuallink" value="" 
                             class="form-control" placeholder="enter link" required/>                           
                        </div>
                        <div class="col-md-6">
                            <label ></label>
                            <input type="text" name="lbl" id="lbl" value="" 
                             class="form-control" placeholder="enter link" required/>                           
                        </div>
                        <br/>                
                      <div class="col-md-12">
                      <input type="submit"  name="submit" class="btn btn-primary" value="Submit" />&nbsp;&nbsp;&nbsp;
                         <input type="reset"  name="submit" class="btn btn-primary" value="Reset" />
                        </div>
						</div>
<br/>
                        <table id="datatablesSimple" class="table table-bordered ">
                                    <thead>
                                        <tr>
                                        <th>link</th>
                                        <th>label</th>
                                            <th>Created Date</th>
                                            <th>&nbsp</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
               <td>
        <b> <a href="https://digitalsatbara.mahabhumi.gov.in/dslr" target="_blank">https://digitalsatbara.mahabhumi.gov.in/dslr</a></b>
        </td>  
        <td>Digital 7/12</td>     
        <td>2022-10-05 15:16:15</td> 
        <td>
      <b>  <a href="removelink.php?rl=11" >Delete
    </a></b>
        </td>      
        
      <tr/>
      {/* <td>
        <b> <a href="https://bhulekh.mahabhumi.gov.in/" target="_blank">https://bhulekh.mahabhumi.gov.in/</a></b>
        </td>  
        <td>Online 7/12</td>     
        <td>2022-10-05 15:47:40</td> 
        <td>
      <b>  <a href="removelink.php?rl=12" >Delete
    </a></b>
        </td>       */}
        
      <tr/>
               {/* <td>
        <b> <a href="https://myaadhaar.uidai.gov.in/" target="_blank">https://myaadhaar.uidai.gov.in/</a></b>
        </td>  
        <td>Adhar Services </td>     
        <td>2022-10-05 15:48:56</td> 
        <td>
      <b>  <a href="removelink.php?rl=13" >Delete
    </a></b>
        </td>       */}
        
      <tr/>
               {/* <td>
        <b> <a href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/" target="_blank">https://unifiedportal-mem.epfindia.gov.in/memberinterface/</a></b>
        </td>  
        <td>Pf Provident Fund </td>     
        <td>2022-10-05 15:50:05</td> 
        <td>
      <b>  <a href="removelink.php?rl=14" >Delete
    </a></b>
        </td>       */}
        
      <tr/>
               {/* <td>
        <b> <a href="https://mahabhunakasha.mahabhumi.gov.in/27/index.jsp" target="_blank">https://mahabhunakasha.mahabhumi.gov.in/27/index.jsp</a></b>
        </td>  
        <td>Bhu Naksha </td>     
        <td>2022-10-05 15:52:26</td> 
        <td>
      <b>  <a href="removelink.php?rl=16" >Delete
    </a></b>
        </td>       */}
        
      </tr>
               {/* <td>
        <b> <a href="https://www.redbus.in/" target="_blank">https://www.redbus.in/</a></b>
        </td>  
        <td>Bus Ticket Booking </td>     
        <td>2022-10-05 15:53:27</td> 
        <td>
      <b>  <a href="removelink.php?rl=17">Delete
    </a></b>
        </td>       */}
        
      <tr/>
               <td>
        <b> <a href="https://www.digilocker.gov.in/" target="_blank">https://www.digilocker.gov.in/</a></b>
        </td>  
        <td>Education Services </td>     
        <td>2022-10-05 15:54:19</td> 
        <td>
      <b>  <a href="removelink.php?rl=18" >Delete
    </a></b>
        </td>      
        
      <tr/>
      <td>
        <b> <a href="https://www.irctc.co.in/nget/train-search" target="_blank">https://www.irctc.co.in/nget/train-search</a></b>
        </td>  
        <td>IRCTC Railway Booking</td>     
        <td>2022-10-05 15:56:11</td> 
        <td>
      <b>  <a href="removelink.php?rl=19" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://majhinaukri.in/" target="_blank">https://majhinaukri.in/</a></b>
        </td>  
        <td>Job Bharti</td>     
        <td>2022-10-05 15:57:22</td> 
        <td>
      <b>  <a href="removelink.php?rl=20">Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://efilingigr.maharashtra.gov.in/ereg/" target="_blank">https://efilingigr.maharashtra.gov.in/ereg/</a></b>
        </td>  
        <td>Reg. Rent Agreement </td>     
        <td>2022-10-05 15:58:29</td> 
        <td>
      <b>  <a href="removelink.php?rl=21" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://wss.mahadiscom.in/wss/wss?uiActionName=getViewPayBill" target="_blank">https://wss.mahadiscom.in/wss/wss?uiActionName=getViewPayBill</a></b>
        </td>  
        <td>Mahavitaran </td>     
        <td>2022-10-05 15:59:06</td> 
        <td>
      <b>  <a href="removelink.php?rl=22" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://pcs.mahaonline.gov.in/Forms/Home.aspx" target="_blank">https://pcs.mahaonline.gov.in/Forms/Home.aspx</a></b>
        </td>  
        <td>Police Verification</td>     
        <td>2022-10-05 16:00:08</td> 
        <td>
      <b>  <a href="removelink.php?rl=23" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://register.eshram.gov.in/#/user/self" target="_blank">https://register.eshram.gov.in/#/user/self</a></b>
        </td>  
        <td>e-Shram Card</td>     
        <td>2022-10-05 16:01:20</td> 
        <td>
      <b>  <a href="removelink.php?rl=24" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://exlink.pmkisan.gov.in/aadharekyc.aspx" target="_blank">https://exlink.pmkisan.gov.in/aadharekyc.aspx</a></b>
        </td>  
        <td>Pm Kisan e-Kyc</td>     
        <td>2022-10-05 16:02:10</td> 
        <td>
      <b>  <a href="removelink.php?rl=25">Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://healthid.ndhm.gov.in/register" target="_blank">https://healthid.ndhm.gov.in/register</a></b>
        </td>  
        <td>Helth Card ABHA</td>     
        <td>2022-11-04 18:00:38</td> 
        <td>
      <b>  <a href="removelink.php?rl=27">Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html" target="_blank">https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html</a></b>
        </td>  
        <td>Download e-Pan NSDL</td>     
        <td>2022-11-07 16:12:38</td> 
        <td>
      <b>  <a href="removelink.php?rl=28">Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard" target="_blank">https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard</a></b>
        </td>  
        <td>Download e-Pan UTI</td>     
        <td>2022-11-07 16:18:16</td> 
        <td>
      <b>  <a href="removelink.php?rl=29" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://pmkisan.gov.in/" target="_blank">https://pmkisan.gov.in/</a></b>
        </td>  
        <td>PM KISAN RAGISTRATION</td>     
        <td>2022-11-08 13:53:07</td> 
        <td>
      <b>  <a href="removelink.php?rl=30" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://bartievalidity.maharashtra.gov.in/" target="_blank">https://bartievalidity.maharashtra.gov.in/</a></b>
        </td>  
        <td>Caste Validity Certificate </td>     
        <td>2022-11-24 09:58:18</td> 
        <td>
      <b>  <a href="removelink.php?rl=31" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://student.maharashtra.gov.in/adm_portal/users/login" target="_blank">https://student.maharashtra.gov.in/adm_portal/users/login</a></b>
        </td>  
        <td>RTE Admission</td>     
        <td>2023-03-02 13:39:31</td> 
        <td>
      <b>  <a href="removelink.php?rl=32" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status" target="_blank">https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status</a></b>
        </td>  
        <td>Check Adhar Pan Link </td>     
        <td>2023-03-30 16:04:46</td> 
        <td>
      <b>  <a href="removelink.php?rl=33" >Delete
    </a></b>
        </td>      
        
        <tr/>
               <td>
        <b> <a href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar" target="_blank">https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar</a></b>
        </td>  
        <td>Link Adhar Pan</td>     
        <td>2023-03-30 16:05:19</td> 
        <td>
      <b>  <a href="removelink.php?rl=34" >Delete
    </a></b>
        </td>      
        
        <tr/>
               {/* <td>
        <b> <a href="https://www.makemytrip.com/flights/?gclid=Cj0KCQjwr82iBhCuARIsAO0EAZxDMGBlgubjvJTGU0sX_KeTKvI3jEp3DYVkHezVhO9xuXdArAhCW9EaAhsMEALw_wcB&cmp=SEM|D|DF|G|Generic|Generic-Generic_DT|DF_Generic_Exact|Airfare_Exact|RSA|Regular|643187595774&s_kwcid=AL!1631!3!6431" target="_blank">https://www.makemytrip.com/flights/?gclid=Cj0KCQjwr82iBhCuARIsAO0EAZxDMGBlgubjvJTGU0sX_KeTKvI3jEp3DYVkHezVhO9xuXdArAhCW9EaAhsMEALw_wcB&cmp=SEM|D|DF|G|Generic|Generic-Generic_DT|DF_Generic_Exact|Airfare_Exact|RSA|Regular|643187595774&s_kwcid=AL!1631!3!6431</a></b>
        </td>  
        <td>Flight Booking </td>     
        <td>2023-05-04 16:59:13</td> 
        <td>
      <b>  <a href="removelink.php?rl=35" >Delete
    </a></b>
        </td>       */}
        
      <tr/>




                                        </tbody>
                                        </table>
                                        </div>
                                        </form>
                                        </div>
                                        </main>
                                        </div>
                                   </CardBody>     
                                       
      </Card>
      </Col>
      </Row>
      </Container>
      </div>
  
    )
  }
}

export default Addlink