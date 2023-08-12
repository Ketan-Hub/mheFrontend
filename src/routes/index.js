import React,{ Fragment } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Login from "../components/auth/login"
import LayoutRoutes from "./LayoutRoutes"
// import Landing from '../components/landing_page/landing'
import Landing from '../components/landing_page/landing'
import About from "../components/landing_page/About"
import Contact from "../components/landing_page/Contact"

const Routers =() =>{

    return(
        <Fragment>
            <Routes>
                <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Landing />} />
                <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />

					<Route
						exact
						path={`${process.env.PUBLIC_URL}/auth/login`}
						element={<Login />}
					/>
                     <Route
            path={`${process.env.PUBLIC_URL}/About`}
            element={<About />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Contact`}
            element={<Contact />}
          />
                    <Route path={`/*`} element={<LayoutRoutes />} />
            </Routes>
			<ToastContainer/>

        </Fragment>
    )
}

export default Routers