import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";
import Dashboard from "../components/dashboard";
import Media from "../components/media/media";
import Createmenu from "../components/menus/create-menu";
import Listmenu from "../components/menus/list-menu";
import Createpage from "../components/pages/create-page";
import ListPages from "../components/pages/list-page";
import Profile from "../components/settings/profile";
import Createuser from "../components/users/create-user";
import Listuser from "../components/users/list-user";
import Recharge from "../components/users/recharge";
import Addlink from "../components/users/addlink";
import Userdetails from "../components/users/user-details";
import Logout from "../components/auth/logout";
import ParmanantDl from "../components/drivingLIcence/parmanantDl";
import Egazette from "../components/e_gazette/egazette";
import LearningDL from "../components/drivingLIcence/LearningDL";
import RenewDl from "../components/drivingLIcence/ReneDl";
import FoodLicence from "../components/foodLicence/FoodLicence";
import CompGST from "../components/GstReg/CompGST";
import IndGST from "../components/GstReg/IndGST";
import PassportForm from "../components/Passport/PassportForm";
import ShopActForm from "../components/ShopActForm/ShopActForm";
import UdhamAbhar from "../components/UdhamAdhar/UdhamAbhar";
import VoterCard from "../components/VoterCard/VoterCard";
import EWS from "../components/EWS/ews";
import NonCremyLayer from "../components/Non_cremyLayer/non_cremyLayer";
import Income from "../components/Income/income";
import Application_Console from "../components/Application_Console/application";
import Admin_console from "../components/Admin_console/admin_console";
import Retailer_console from "../components/Retailer_console/retailer_console";
import ALLForm from "../components/formPrice/AllFormPrice";
import ApplicaStact from "../components/applicaSta";
import Recharge_details from "../components/recharge_details/recharge_details";
import Pan_UTI from "../components/Pan_UTI_card/pan_UTI";
import AgeDomicile from "../components/Age_Nationality/age_nationality";
import UserDetails from "../components/Application_Console/userDetails";
import Application_ageNationality from "../components/Application_Console/application_ageNationality";
import Application_noncremylayer from "../components/Application_Console/application_noncremylayer";
import Application_income from "../components/Application_Console/application_income";
import Application_learning from "../components/Admin_console/application_learning";
import Application_renewal from "../components/Admin_console/application_renewal";
import Application_permanent from "../components/Admin_console/application_permanent";
import Application_eGazzet from "../components/Admin_console/application_eGazzet";
import Application_foodLicence from "../components/Admin_console/application_foodLicence";
import Application_compGST from "../components/Admin_console/application_compGST";
import Application_indiGST from "../components/Admin_console/application_indiGST";
import Application_udhamadhar from "../components/Admin_console/application_udhamadhar";
import Application_shopAct from "../components/Admin_console/application_shopAct";
import Application_passport from "../components/Admin_console/application_passport";
import Application_voterCard from "../components/Admin_console/application_voterCard";
import AdminFormprice from "../components/AdminFormprice";
import AgentRequests from "../components/AgentRequests/AgentRequests";
import RetailerDashboard from "../components/Reatoiler_dash";
import AgentDashboard from "../components/agent_dash";
import Retailer_egazzet from "../components/Retailer_console/retailer_egazzet";
import Retailer_learning from "../components/Retailer_console/retailer_learning";
import Retailer_renew from "../components/Retailer_console/retailer_renew";
import Retailer_permanent from "../components/Retailer_console/retailer_permanant";
import Retailer_indiGST from "../components/Retailer_console/retailer_indiGST";
import Retailer_passport from "../components/Retailer_console/retailer_passport";
import Retailer_shopAct from "../components/Retailer_console/retailer_shopAct";
import Retailer_udhamadhar from "../components/Retailer_console/retailer_udhamAdhar";
import Retailer_voterCard from "../components/Retailer_console/retailer_voterCard";
import Retailer_foodLicence from "../components/Retailer_console/retailer_foodLicence";
import Retailer_ews from "../components/Retailer_console/retailer_ews";
import Retailer_income from "../components/Retailer_console/retailer_income";
import Retailer_noncremylayer from "../components/Retailer_console/retailer_noncremyLayer";
import Retailer_ageNationality from "../components/Retailer_console/retailer_ageNationality";
import Receipt from "../components/Admin_console/receipt";
import RechargeHistry from "../components/rechargeHistry/RechargeHistry";
import UserPriceReport from "../components/ApllicationStatastic/UserPriceReport";
import PanAccept from "../components/Pan_UTI_card/PanAccept";
import Console_form4 from "../components/Admin_console/console_form4";
import Notice from "../components/Notice/Notice";
import About from "../components/landing_page/About"
import Contact from "../components/landing_page/Contact"
const LayoutRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/RetailerDashboard`}
            element={<RetailerDashboard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/AgentDashboard`}
            element={<AgentDashboard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`}
            element={<Pan_UTI />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/agent/application_Console`}
            element={<Application_Console />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/admin_application`}
            element={<Admin_console />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/retailer_console`}
            element={<Retailer_console />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/recharge_details`}
            element={<Recharge_details />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/drivingLicence/permanantDl`}
            element={<ParmanantDl />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/drivingLicence/permanantDl/:pid`}
            element={<ParmanantDl />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/drivingLicence/learningDl`}
            element={<LearningDL />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/drivingLicence/learningDl/:lid`}
            element={<LearningDL />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/drivingLicence/RenewDL`}
            element={<RenewDl />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/drivingLicence/RenewDL/:rid`}
            element={<RenewDl />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/egazette/create`}
            element={<Egazette />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/egazette/create/:eid`}
            element={<Egazette />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/FoodLicence/create`}
            element={<FoodLicence />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/FoodLicence/create/:fid`}
            element={<FoodLicence />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Company_Gst/create`}
            element={<CompGST />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Company_Gst/create/:cid`}
            element={<CompGST />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Individual_Gst/create`}
            element={<IndGST />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Individual_Gst/create/:iid`}
            element={<IndGST />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/PassportForm/create`}
            element={<PassportForm />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/PassportForm/create/:passid`}
            element={<PassportForm />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/ShopActForm/create`}
            element={<ShopActForm />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/ShopActForm/create/:shopid`}
            element={<ShopActForm />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/UdhamAbhar/create`}
            element={<UdhamAbhar />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/UdhamAbhar/create/:udhamid`}
            element={<UdhamAbhar />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/VoterCard/create`}
            element={<VoterCard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/VoterCard/create/:vid`}
            element={<VoterCard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Price/create`}
            element={<ApplicaStact />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/logout`}
            element={<Logout />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/users/user-details`}
            element={<Userdetails />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/pages/create-page`}
            element={<Createpage />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/menus/list-menu`}
            element={<Listmenu />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/menus/create-menu`}
            element={<Createmenu />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/users/list-user`}
            element={<Listuser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/recharge`}
            element={<Recharge />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/create-user`}
            element={<Createuser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/addlink`}
            element={<Addlink />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/settings/profile`}
            element={<Profile />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/log-out`}
            element={<Logout />}
          />

          <Route path={`${process.env.PUBLIC_URL}/ews`} element={<EWS />} />
          <Route path={`${process.env.PUBLIC_URL}/ews/:id`} element={<EWS />} />
          <Route
            path={`${process.env.PUBLIC_URL}/non_cremyLayer`}
            element={<NonCremyLayer />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/non_cremyLayer/:id`}
            element={<NonCremyLayer />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/income`}
            element={<Income />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/income/:id`}
            element={<Income />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/age_nationality`}
            element={<AgeDomicile />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/age_nationality/:id`}
            element={<AgeDomicile />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/userDetails/:id`}
            element={<UserDetails />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_ageNationality/:id`}
            element={<Application_ageNationality />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_noncremylayer/:id`}
            element={<Application_noncremylayer />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_income/:id`}
            element={<Application_income />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_learning/:id`}
            element={<Application_learning />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_permanent/:id`}
            element={<Application_permanent />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/application_renewal/:id`}
            element={<Application_renewal />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_eGazzet/:id`}
            element={<Application_eGazzet />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_foodLicence/:id`}
            element={<Application_foodLicence />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_compGST/:id`}
            element={<Application_compGST />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_indiGST/:id`}
            element={<Application_indiGST />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_udhamadhar/:id`}
            element={<Application_udhamadhar />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_shopAct/:id`}
            element={<Application_shopAct />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_passport/:id`}
            element={<Application_passport />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/application_voterCard/:id`}
            element={<Application_voterCard />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/application_voterCard/:id`}
            element={<Application_voterCard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/allFormPrice`}
            element={<AdminFormprice />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/agentRequest`}
            element={<AgentRequests />}
          />

          {/* retailer_console  */}

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_egazzet/:id`}
            element={<Retailer_egazzet />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_learning/:id`}
            element={<Retailer_learning />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/retailer_renew/:id`}
            element={<Retailer_renew />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/retailer_permanant/:id`}
            element={<Retailer_permanent />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_compGST/:id`}
            element={<Retailer_permanent />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/retailer_indiGST/:id`}
            element={<Retailer_indiGST />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_passport/:id`}
            element={<Retailer_passport />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_shopAct/:id`}
            element={<Retailer_shopAct />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_udhamadhar/:id`}
            element={<Retailer_udhamadhar />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_voterCard/:id`}
            element={<Retailer_voterCard />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_foodLicence/:id`}
            element={<Retailer_foodLicence />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_ews/:id`}
            element={<Retailer_ews />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_income/:id`}
            element={<Retailer_income />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/retailer_ageNationality/:id`}
            element={<Retailer_ageNationality />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/receipt/:id`}
            element={<Receipt />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Recharge_Histry`}
            element={<RechargeHistry />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/AppStatics`}
            element={<UserPriceReport />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/PanCoupans`}
            element={<PanAccept />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/ts`}
            element={<Console_form4 />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/notice`}
            element={<Notice />}
          />
          {/* <Route
            path={`${process.env.PUBLIC_URL}/About`}
            element={<About />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Contact`}
            element={<Contact />}
          /> */}
        
        </Route>
      </Routes>
    </Fragment>
  );
};

export default LayoutRoutes;
