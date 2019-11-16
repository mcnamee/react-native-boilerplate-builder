import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => (
  <footer className={'bg-dark pt-4 pt-md-5 pb-3'}>
    <Container>
      <Row>
        <Col>
          <p className="text-center text-secondary">&copy; AwesomeProject. All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
