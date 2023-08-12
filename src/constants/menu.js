import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  List,
  BarChart,
  Settings,
  Archive,
  LogIn,
  LogOut,
  MapPin,
  CreditCard,
  Percent,
  Calendar,
  Search,
  Menu
} from "react-feather";
import { BookOutlined } from "@ant-design/icons";
const userData = JSON.parse(localStorage.getItem('userResponse'))
export const MENUITEMS = [
  {
    path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
  },
  {
    path: '/admin_application', title: 'Application Console', icon: Search, type: 'link', badgeType: 'primary', active: false
  },
  // {
  //   title: "G2C Services",
  //   icon: Menu,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     {

  //       title: "Driving Licence",
  //       type: "sub",
  //       children:[
  //         {
  //           path: "/drivingLicence/learningDl",
  //           title: "Learning Dl",
  //           type: "link",
  //         },
  //         {
  //           path: "/drivingLicence/permanantDl",
  //           title: "Permanant Dl",
  //           type: "link",
  //         },
  //         {
  //           path: "/drivingLicence/RenewDl",
  //           title: "Renew Dl",
  //           type: "link",
  //         },
  //       ]
  //     },
  //     {
  //       path: "/egazette/create",
  //       title: "E-Gazette",
  //       type: "link",
  //     },
  
  //     {
  //       path: "/FoodLicence/create",
  //       title: "Food Licence",
  //       type: "link",
  //     },
  //     {
  //       // path: "/products/digital/digital-product-list",
  //       title: "Gst Registration",
  //       type: "sub",
  //       children:[
  //         {
  //           path: "/Company_Gst/create",
  //           title: "Company GST",
  //           type: "link",
  //         },
  //         {
  //           path: "Individual_Gst/create",
  //           title: "Individual GST",
  //           type: "link",
  //         },
          
  //       ]
  //     },
  //     {
  //       path: "/products/digital/digital-product-list",
  //       title: "PAN Card-UTI",
  //       type: "sub",
  //       children:[
  //         {
  //           path: "/products/digital/digital-sub-category",
  //           title: "PAN Card",
  //           type: "link",
  //         },
  //         {
  //           path: "/products/digital/digital-sub-category",
  //           title: "Coupan Request",
  //           type: "link",
  //         },
          
  //       ]
  //     },
  //     {
  //       path: "/PassportForm/create",
  //       title: "Passport",
  //       type: "link",
  //     },
  //     {
  //       path: "/ShopActForm/create",
  //       title: "Shop Act",
  //       type: "link",
  //     },
  //     {
  //       path: "/UdhamAbhar/create",
  //       title: "Udham Adhar",
  //       type: "link",
  //     },
  //     {
  //       path: "/VoterCard/create",
  //       title: "Voter Card",
  //       type: "link",
  //     },



  //     {

  //       title: "Tahasil Services",
  //       type: "sub",
  //       children:[
  //         {
  //           path: "/Income/income",
  //           title: "Income Certificate",
  //           type: "link",
  //         },
  //         {
  //           path: "/Age_Nationality/age_nationality",
  //           title: "Age Domincile Certificate",
  //           type: "link",
  //         },
  //         {
  //           path: "/Non_cremyLayer/non_cremyLayer",
  //           title: "Noncriminal Certificate",
  //           type: "link",
  //         },
  //         {
  //           path: "/EWS/ews",
  //           title: "EWS Certificate",
  //           type: "link",
  //         },
  //       ]
  //     },
     
  //   ],
  // },
  // {
  //   title: "Other Services",
  //   icon: Menu,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "https://digitalsatbara.mahabhumi.gov.in/dslr", title: "DIgital 7/12", type: "link" },
  //     { path: "https://bhulekh.mahabhumi.gov.in/", title: "Online 7/12", type: "link" },
  //     { path: "https://myaadhaar.uidai.gov.in/", title: " Adhar Servises", type: "link" },
  //     { path: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/", title: "PF Provident Fund", type: "link" },
  //     { path: "https://mahabhunakasha.mahabhumi.gov.in/27/index.jsp", title: "Bhu Naksha", type: "link" },
  //     { path: "https://www.redbus.in/", title: "Bus Ticket Booking", type: "link" },
  //     { path: "https://www.digilocker.gov.in/", title: "Education Services", type: "link" },
  //     { path: "https://www.irctc.co.in/nget/train-search", title: "IRCTC Railway Booking", type: "link" },
  //     { path: "https://majhinaukri.in/", title: "JOb Bharti", type: "link" },
  //     { path: "https://efilingigr.maharashtra.gov.in/ereg/", title: "Reg.Rent Agreement", type: "link" },
  //     { path: "https://wss.mahadiscom.in/wss/wss?uiActionName=getViewPayBill", title: "Mahavitaran", type: "link" },
  //     { path: "https://pcs.mahaonline.gov.in/Forms/Home.aspx", title: "Police Verification", type: "link" },
  //     { path: "https://register.eshram.gov.in/#/user/self", title: "e-Shram Card", type: "link" },
  //     { path: "https://exlink.pmkisan.gov.in/aadharekyc.aspx", title: "Pm kisan e-kyc", type: "link" },
  //     { path: "https://healthid.ndhm.gov.in/register", title: "HelthCare ABHA", type: "link" },
  //     { path: "https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html", title: "Download e-Pan NSDL", type: "link" },
  //     { path: "https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard", title: "Download e-Pan UTI", type: "link" },
  //     { path: "https://pmkisan.gov.in/", title: "PM Kisan Registration", type: "link" },
  //     { path: "https://bartievalidity.maharashtra.gov.in/", title: "Cast Validity Sertificate", type: "link" },
  //     { path: "https://student.maharashtra.gov.in/adm_portal/users/login", title: "RTE Admission", type: "link" },
  //     { path: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status", title: "Check Adhar Pan Link", type: "link" },
  //     { path: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar", title: "Link Adhar Pan", type: "link" },
  //     { path: "https://www.makemytrip.com/flights/?gclid=Cj0KCQjwr82iBhCuARIsAO0EAZxDMGBlgubjvJTGU0sX_KeTKvI3jEp3DYVkHezVhO9xuXdArAhCW9EaAhsMEALw_wcB&cmp=SEM|D|DF|G|Generic|Generic-Generic_DT|DF_Generic_Exact|Airfare_Exact|RSA|Regular|643187595774&s_kwcid=AL!1631!3!6431", title: "Flight Booking", type: "link" },
     
  //   ],
  // },



  {
    title: "User Managment",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      { path: "/users/create-user", title: "Create User", type: "link" },
      { path: "/users/list-user", title: "Change User", type: "link" },
      { path: "/users/recharge", title: "Recharge", type: "link" },
      { path: "/allFormPrice", title: "Form Price Update", type: "link" },
      // { path: "/users/user-details", title: "User Details", type: "link" },
      { path: "/users/addlink", title: "Add Links", type: "link" },
      // { path: "/users/create-user", title: "Create User", type: "link" },
    ],
  },
  // {
  //   title: "Report",
  //   icon: Menu,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/Recharge_Histry", title: "Recharge Histry", type: "link" },
  //     { path: "/reports/applicationstat", title: "Application Status", type: "link" },
  //     // { path: "/reports/applicationstat", title: "Application Status", type: "link" },
  //     // { path: "/reports/enquire", title: "Enquires", type: "link" },
    
    
  //   ],
  // },
  {
    title: "Report",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      { path: "/Recharge_Histry", title: "Recharge Histry", type: "link" },
      { path: "/Price/create", title: "Application Status", type: "link" },
      { path: "/PanCoupans", title: "Pan Coupans ", type: "link" },
      // { path: "/reports/enquire", title: "Enquires", type: "link" },
    
    
    ],
  },
 
  {
    title: "Agent Requests",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      { path: "/agentRequest", title: "Form Credit", type: "link" },
  
    
    
    ],
  },
  // {
  //   title: "Setting",
  //   icon: Menu,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/users/list-user", title: "All Requests", type: "link" },
  
    
    
  //   ],
  // },
  {
    title: "Software",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      { path: "https://anydesk.com/en/downloads/windows", title: "Any Desk", type: "link" },
      { path: "https://www.winzip.com/en/", title: "Win-Zip", type: "link" },
      { path: "https://google-input-marathi.software.informer.com/", title: "Marathi Typping", type: "link" },
    ],
  },
  
];
export const RETAILERMENUITEM = [
  {
    path: '/RetailerDashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
  },
  {
    path: '/retailer_console', title: 'Application Console', icon: Search, type: 'link', badgeType: 'primary', active: false
  },
  {
    title: "G2C Services",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      {

        title: "Driving Licence",
        type: "sub",
        children:[
          {
            path: "/drivingLicence/learningDl",
            title: "Learning Dl",
            type: "link",
          },
          {
            path: "/drivingLicence/permanantDl",
            title: "Permanant Dl",
            type: "link",
          },
          {
            path: "/drivingLicence/RenewDl",
            title: "Renew Dl",
            type: "link",
          },
        ]
      },
      {
        path: "/egazette/create",
        title: "E-Gazette",
        type: "link",
      },
  
      {
        path: "/FoodLicence/create",
        title: "Food Licence",
        type: "link",
      },
      {
        // path: "/products/digital/digital-product-list",
        title: "Gst Registration",
        type: "sub",
        children:[
          {
            path: "/Company_Gst/create",
            title: "Company GST",
            type: "link",
          },
          {
            path: "Individual_Gst/create",
            title: "Individual GST",
            type: "link",
          },
          
        ]
      },
      {
        path: "/products/digital/digital-product-list",
        title: "PAN Card-UTI",
        type: "sub",
        children:[
          {
            path: "/products/digital/digital-sub-category",
            title: "PAN Card",
            type: "link",
          },
          {
            path: "/products/digital/digital-sub-category",
            title: "Coupan Request",
            type: "link",
          },
          
        ]
      },
      {
        path: "/PassportForm/create",
        title: "Passport",
        type: "link",
      },
      {
        path: "/ShopActForm/create",
        title: "Shop Act",
        type: "link",
      },
      {
        path: "/UdhamAbhar/create",
        title: "Udham Adhar",
        type: "link",
      },
      {
        path: "/VoterCard/create",
        title: "Voter Card",
        type: "link",
      },


      {

        title: "Tahasil Services",
        type: "sub",
        children:[
          {
            path: "/income",
            title: "Income Certificate",
            type: "link",
          },
          {
            path: "/age_nationality",
            title: "Age Domincile Certificate",
            type: "link",
          },
          {
            path: "non_cremyLayer/",
            title: "Noncriminal Certificate",
            type: "link",
          },
          {
            path: "ews/",
            title: "EWS Certificate",
            type: "link",
          },
        ]
      },
     
    ],
  },
  {
    title: "Other Services",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      { path: "https://digitalsatbara.mahabhumi.gov.in/dslr", title: "DIgital 7/12", type: "link" },
      { path: "https://bhulekh.mahabhumi.gov.in/", title: "Online 7/12", type: "link" },
      { path: "https://myaadhaar.uidai.gov.in/", title: " Adhar Servises", type: "link" },
      { path: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/", title: "PF Provident Fund", type: "link" },
      { path: "https://mahabhunakasha.mahabhumi.gov.in/27/index.jsp", title: "Bhu Naksha", type: "link" },
      { path: "https://www.redbus.in/", title: "Bus Ticket Booking", type: "link" },
      { path: "https://www.digilocker.gov.in/", title: "Education Services", type: "link" },
      { path: "https://www.irctc.co.in/nget/train-search", title: "IRCTC Railway Booking", type: "link" },
      { path: "https://majhinaukri.in/", title: "JOb Bharti", type: "link" },
      { path: "https://efilingigr.maharashtra.gov.in/ereg/", title: "Reg.Rent Agreement", type: "link" },
      { path: "https://wss.mahadiscom.in/wss/wss?uiActionName=getViewPayBill", title: "Mahavitaran", type: "link" },
      { path: "https://pcs.mahaonline.gov.in/Forms/Home.aspx", title: "Police Verification", type: "link" },
      { path: "https://register.eshram.gov.in/#/user/self", title: "e-Shram Card", type: "link" },
      { path: "https://exlink.pmkisan.gov.in/aadharekyc.aspx", title: "Pm kisan e-kyc", type: "link" },
      { path: "https://healthid.ndhm.gov.in/register", title: "HelthCare ABHA", type: "link" },
      { path: "https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html", title: "Download e-Pan NSDL", type: "link" },
      { path: "https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard", title: "Download e-Pan UTI", type: "link" },
      { path: "https://pmkisan.gov.in/", title: "PM Kisan Registration", type: "link" },
      { path: "https://bartievalidity.maharashtra.gov.in/", title: "Cast Validity Sertificate", type: "link" },
      { path: "https://student.maharashtra.gov.in/adm_portal/users/login", title: "RTE Admission", type: "link" },
      { path: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status", title: "Check Adhar Pan Link", type: "link" },
      { path: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar", title: "Link Adhar Pan", type: "link" },
      { path: "https://www.makemytrip.com/flights/?gclid=Cj0KCQjwr82iBhCuARIsAO0EAZxDMGBlgubjvJTGU0sX_KeTKvI3jEp3DYVkHezVhO9xuXdArAhCW9EaAhsMEALw_wcB&cmp=SEM|D|DF|G|Generic|Generic-Generic_DT|DF_Generic_Exact|Airfare_Exact|RSA|Regular|643187595774&s_kwcid=AL!1631!3!6431", title: "Flight Booking", type: "link" },
     
    ],
  },
  {
    title: "Report",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      { path: "/Recharge_Histry", title: "Recharge Histry", type: "link" },
      { path: "/AppStatics", title: "Application Status", type: "link" },
      // { path: "/reports/enquire", title: "Enquires", type: "link" },
    
    
    ],
  },
  {
    title: "Software",
    icon: Menu,
    type: "sub",
    active: false,
    children: [
      { path: "https://anydesk.com/en/downloads/windows", title: "Any Desk", type: "link" },
      { path: "https://www.winzip.com/en/", title: "Win-Zip", type: "link" },
      { path: "https://google-input-marathi.software.informer.com/", title: "Marathi Typping", type: "link" },
    ],
  },
  
];

export const Agent=[

  {
    path: '/AgentDashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
  },
  {
    path: '/agent/application_Console', title: 'Application Console', icon: Search, type: 'link', badgeType: 'primary', active: false
  },
  {
    path: '/agentRequest', title: 'Creadit Reports', icon: Search, type: 'link', badgeType: 'primary', active: false
  }

];

