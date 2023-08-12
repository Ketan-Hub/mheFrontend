import React, { Fragment, useEffect, useState } from "react";
import UserPanel from "./user-panel";
import { Link } from "react-router-dom";
import { MENUITEMS, RETAILERMENUITEM, Agent } from "../../../constants/menu";

// image import
// import logo from "../../../assets/images/dashboard/multikart-logo.png";
import logo from "../../../assets/images/dashboard/Meseva.png";
import axios from "axios";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [mainmenu, setMainMenu] = useState();
  const [isChange, setIsChange] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userResponse"));
  const role = userData?.user?.role;
  const ID=userData?.user?._id;
  const [retailerID ,setretailerID ]=useState('')
  const [agentData ,setAgentData ]=useState([]) 

  console.log('agentData',agentData);
  const [ retailerData , setretailerData ]=useState([])
  const reducer = useSelector((state) => state.changeNumber);
  //for retailer

  useEffect(()=>{
    axios.get('https://mhebackend.payagain.in/api/getAll/Form11' )
    .then(async(res)=>{
      const data=await res.data
     
      const filtered=data.filter((item) => {
        if(item.createdBy==ID)
        {
          return item
         }
       })
       axios.get('https://mhebackend.payagain.in/api/getAll' )
     .then(async(res)=>{
       const data=await res.data
       
       const filtered4=data.filter((item) => {
         if(item.createdBy===ID)
         {
           return item
         }
       })
       setretailerData([...filtered,...filtered4])
      

     })
     .catch((err)=>console.log(err))
      
     })
     .catch((err)=>console.log(err))
        
   },[reducer])

  

  // for agent
  useEffect(()=>{

    axios.get('https://mhebackend.payagain.in/api/user/getAll')
    .then((res)=>{

      const data=res.data
      const filtered=data?.filter((item)=>{

        if(item.agent==ID)
        {
          return item
        }
      })

      setretailerID(filtered[0]?._id)
    })

    axios.get('https://mhebackend.payagain.in/api/getAll')
    .then(async(res)=>{
  
        const data=await res.data
        const filtered=data?.filter((item)=>{
  
          if(item.createdBy==retailerID)
          {
            return item
          }
        })
        console.log(93,filtered)
        setAgentData(filtered);
    })
    .catch((err)=>console.log(err))
  
  },[retailerID])

  useEffect(()=>{
    axios.get('https://mhebackend.payagain.in/api/getAll')
    .then(async(res)=>{
  
        const data=await res.data
        const filtered=data?.filter((item)=>{
  
          if(item.createdBy==retailerID)
          {
            return item
          }
        })
        console.log(93,filtered)
        setAgentData(filtered);
    })
    .catch((err)=>console.log(err))

  },[reducer])

  useEffect(() => {
    if (role === "admin" || role === "Admin" || role === "ADMIN") {
      setMainMenu(MENUITEMS);
    } else if (
      role === "retailer" ||
      role === "Retailer" ||
      role === "RETAILER"
    ) {
      setMainMenu(RETAILERMENUITEM);
    } else if (role === "agent" || role === "Agent" || role === "AGENT") {
      setMainMenu(Agent);
    }
  }, []);

  const allFormData = useSelector(state=>state.allFormData.allDataInitialState)

  useEffect(() => {
    const currentUrl = window.location.pathname;
    mainmenu?.map((items) => {
      mainMenu?.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    return () => {
      if (role === "admin" || role === "Admin" || role === "ADMIN") {
        setMainMenu(MENUITEMS);
      } else if (
        role === "retailer" ||
        role === "Retailer" ||
        role === "RETAILER"
      ) {
        setMainMenu(RETAILERMENUITEM);
      } else if (role === "agent" || role === "Agent" || role === "AGENT") {
        setMainMenu(Agent);
      }
    };
  }, [isChange]);

  const setNavActive = (item) => {
    setIsChange(!isChange);
    mainmenu?.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems !== item) {
            submenuItems.active = false;
          }
          if (submenuItems.children) {
            submenuItems.children.map(
              (childItem) => (childItem.active = false)
            );
            if (submenuItems.children.includes(item)) {
              submenuItems.active = true;
              menuItem.active = true;
            }
          }
          return false;
        });
      }
      return false;
    });
    item.active = !item.active;
    if (role === "admin" || role === "Admin" || role === "ADMIN") {
      setMainMenu(MENUITEMS);
    } else if (
      role === "retailer" ||
      role === "Retailer" ||
      role === "RETAILER"
    ) {
      setMainMenu(RETAILERMENUITEM);
    } else if (role === "agent" || role === "Agent" || role === "AGENT") {
      setMainMenu(Agent);
    }
  };

  const mainMenu = mainmenu?.map((menuItem, i) => (
    <li className={`${menuItem.active ? "active" : ""}`} key={i}>
      {menuItem.sidebartitle ? (
        <div className="sidebar-title">{menuItem.sidebartitle}</div>
      ) : (
        ""
      )}
      {menuItem.type === "sub" ? (
        <a
          className="sidebar-header "
          href=""
          onClick={(event) => {
            event.preventDefault();
            return setNavActive(menuItem);
          }}
        >
          <menuItem.icon />
          <span>{menuItem.title}</span>
          <i className="fa fa-angle-right pull-right"></i>
        </a>
      ) : (
        ""
      )}
      {menuItem.type === "link" ? (
        <Link
          to={`${process.env.PUBLIC_URL}${menuItem.path}`}
          className={`sidebar-header ${menuItem.active ? "active" : ""}`}
          onClick={() => setNavActive(menuItem)}
        >
          <menuItem.icon />
          {
            role=='agent' ? 
          <span  style={{
            position:"relative"
          }}>
            {menuItem.title} {menuItem.title === "Application Console" ? <div className="totalForm">{agentData?.filter(item=>{if(item.isNew)return item})?.length} </div>: ""}
          </span>
          :
          role=='retailer' ?
          <span  style={{
            position:"relative"
          }}>
            {menuItem.title} {menuItem.title === "Application Console" ? <div className="totalForm">{retailerData?.filter(item=>{if(item.isNew)return item})?.length} </div>: ""}
          </span>
          :
          <span  style={{
            position:"relative"
          }}>
            {menuItem.title} {menuItem.title === "Application Console" ? <div className="totalForm">{allFormData?.filter(item=>{if(item.isNew)return item})?.length} </div>: ""}
          </span>

}
          {menuItem.children ? (
            <i className="fa fa-angle-right pull-right"></i>
          ) : (
            ""
          )}
        </Link>
      ) : (
        ""
      )}
      {menuItem.children ? (
        <ul
          className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`}
          style={
            menuItem.active
              ? { opacity: 1, transition: "opacity 500ms ease-in" }
              : {}
          }
        >
          {menuItem.children.map((childrenItem, index) => (
            <li
              key={index}
              className={
                childrenItem.children
                  ? childrenItem.active
                    ? "active"
                    : ""
                  : ""
              }
            >
              {childrenItem.type === "sub" ? (
                <a
                  href="#javaScript"
                  onClick={(event) => {
                    event.preventDefault();
                    return setNavActive(childrenItem);
                  }}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title}{" "}
                  <i className="fa fa-angle-right pull-right"></i>
                </a>
              ) : (
                ""
              )}

              {childrenItem.type === "link" ? (
                <Link
                  to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                  className={childrenItem.active ? "active" : ""}
                  onClick={() => setNavActive(childrenItem)}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title}{" "}
                </Link>
              ) : (
                ""
              )}
              {childrenItem.children ? (
                <ul
                  className={`sidebar-submenu ${
                    childrenItem.active ? "menu-open" : "active"
                  }`}
                >
                  {childrenItem.children.map((childrenSubItem, key) => (
                    <li
                      className={childrenSubItem.active ? "active" : ""}
                      key={key}
                    >
                      {childrenSubItem.type === "link" ? (
                        <Link
                          to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                          className={childrenSubItem.active ? "active" : ""}
                          onClick={() => setNavActive(childrenSubItem)}
                        >
                          <i className="fa fa-circle"></i>
                          {childrenSubItem.title}
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  ));

  return (
    <Fragment>
      <div className="page-sidebar">
        <div className="main-header-left d-none d-lg-block">
          <div className="logo-wrapper">
            <Link>
              <span
                style={{
                  fontSize: "25px",
                  color: "orange",
                  fontWeight: "bolder",
                }}
              >
                <u>महाराष्ट्र ई-सेवा केंद्र</u>
              </span>
            </Link>
          </div>
        </div>
        <div className="sidebar custom-scrollbar">
          <UserPanel />
          <ul className="sidebar-menu">{mainMenu}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;