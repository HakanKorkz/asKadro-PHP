import React, { useContext } from "react";
import "../styles/NavStyle.css"
import { Button, Navbar, Container, Nav, NavDropdown, FormControl, Form } from "react-bootstrap"
import { GlobalContext } from "../../context/GlobalContext";
import { useCookies } from 'react-cookie'
const NavBar = () => {
  const {setPageNumber } = useContext(GlobalContext)
  const [cookies, setCookie] = useCookies(['user'])
  const logout = () => {
    setCookie("Manager", false, { path: "/" })
    window.location.reload()
}
const mainScreen =()=>{
  setPageNumber(1)
  window.location.reload()
}
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" onClick={()=>mainScreen()}>AS KADRO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            <NavDropdown title="Ayarlar" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Profil</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Tema</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5" onClick={() =>{logout()}} >
                Çıkış
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Ara
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}
export default NavBar