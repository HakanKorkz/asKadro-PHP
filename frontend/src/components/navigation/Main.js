import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CompanyListNav from '../MainComponents/CompanyListNav'
import Home from '../MainComponents/Home'
import LeftSide from '../MainComponents/LeftSide'
import NavBar from "../MainComponents/Navbar"

const Main = () => {
 
  return (
    <div>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col >
            <NavBar />
          </Col>
        </Row>
        <Row>
          <Row xs={10}  style={{marginBottom:10}}> <CompanyListNav /> </Row>
          <Col xs={2} > <LeftSide /> </Col>
          <Col xs={8} > <Home /> </Col>
          <Col xs={1} > Bildirim Alanı </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Main
