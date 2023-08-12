import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import Slider from "react-slick";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
// image import
import two from "../../assets/images/pro3/2.jpg";
import twentySeven from "../../assets/images/pro3/27.jpg";
import one from "../../assets/images/pro3/1.jpg";
import size_chart from "../../assets/images/size-chart.jpg";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
} from "reactstrap";
import { useSelector } from "react-redux";

const Vendor_product_detail = () => {
  const { id } = useParams();
  const [nav, setNav] = useState({
    nav1: null,
    nav2: null,
  });

  useEffect(() => {
    setNav({
      nav1: Slider.slider1,
      nav2: Slider.slider2,
    });
  }, []);

  const allProducts = useSelector((state) => state.allProduct.products);
  const productDetails = allProducts.find((data) => data._id === id);
  console.log(productDetails)
  return (
    <>
      <Fragment>
        <Breadcrumb title="Product Detail" parent="Physical" />
{
	productDetails &&  <Container fluid={true}>
	<Card>
	  <Row className="product-page-main card-body">
		<Col xl="4">
		  <Slider
			asNavFor={nav.nav2}
			ref={(slider) => (Slider.slider1 = slider)}
			className="product-slider"
		  >
			{productDetails?.productImages?.map((item) => {
			  return (
				<>
				  <div className="item">
					<img
					  className="img-fluid"
					  src={item.img}
					  alt=""
					  style={{height:"15rem"}}
					/>
				  </div>
				</>
			  );
			})}
		  </Slider>
		</Col>

		<Col xl="8">
		  <div className="product-page-details product-right mb-0">
			<h2>
			  {productDetails.name} {productDetails.unit}
			</h2>
			<div className="product-price digits mt-2">
			  <h3>
				₹{productDetails.salePrice}{" "}
				<del>₹{productDetails.price}</del>
			  </h3>
			</div>
			<hr />
			<h6 className="product-title">SKU:<span className="span"> {productDetails.sku}</span></h6>
			<h6 className="product-title">
			  Family Code: <span className="span" > {productDetails.familyCode}</span>
			</h6>
			<h6 className="product-title">Product Short Description: </h6>
			<p>{productDetails.shortDesc}</p>
			<h6 className="product-title">
				Main category: <span className="span">{productDetails.mainCat}</span>
			</h6>
			<h6 className="product-title">
				Sub category:<span className="span"> {productDetails.subCat}</span>
			</h6>
		  </div>
		</Col>
	  </Row>
	</Card>
  </Container>
}
       
      </Fragment>
    </>
  );
};

export default Vendor_product_detail;
