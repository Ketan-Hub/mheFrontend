import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
	return (
		<div>
			<footer className="footer">
				<Container fluid={true}>
					<Row>
						<Col md="6" className="footer-copyright">
							<p className="mb-0">
								Copyright © 2019  Maharashtra Informatics Pvt.Ltd , All Right Reserved
							</p>
						</Col>
						
					</Row>
				</Container>
			</footer>
		</div>
	);
};

export default Footer;
