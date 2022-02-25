import { useState, useEffect, useContext } from "react";
import { Modal, Button, Container, Col, Row, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../context/GlobalContext";
// initialValues={{ companyName: "", email: "", phone: "", humanResourcesName: "", humanResourcesPhone: "", givePrice: "", location: "", mesai: "", servis: false, taxNumber: "", invoice: "" }}

export default function (props) {
  const [companyName, setCompanyName] = useState("")
  const [companyMail, setCompanyMail] = useState("")
  const [companyPhone, setCompanyPhone] = useState("")
  const [humanResorurcesName, setHumanResorurcesName] = useState("")
  const [humanResourcesPhone, setHumanResourcesPhone] = useState("")
  const [givePrice, setGivePrice] = useState("")
  const [location, setLocation] = useState("")
  const [mesai, setMesai] = useState("")
  const [servis, setServis] = useState(false)
  const [taxNumber, setTaxNumber] = useState("")
  const [invoice, setInvoice] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")

  const { companyUpdate } = useContext(GlobalContext)
  // (companyName, email, phone, humanResourcesName, humanResourcesPhone, givePrice, location, mesai, servis, taxNumber, invoice, companyCode)
  const forUpdate = () => {
    try {
      companyUpdate(companyName, companyMail, password, companyPhone, humanResorurcesName, humanResourcesPhone, givePrice, location, mesai, servis, taxNumber, invoice, code)

    } catch (error) {
      console.log(error)
    }
  }

  const res = props.result
  useEffect(() => {
    setCompanyName(res.companyName)
    setCompanyMail(res.companyEmail)
    setCompanyPhone(res.companyPhone)
    setHumanResorurcesName(res.companyHumanResourcesName)
    setHumanResourcesPhone(res.companyHumanResourcesPhone)
    setGivePrice(res.companyGivePrice)
    setLocation(res.companyLocation)
    setMesai("0")
    setServis(res.companyService)
    setTaxNumber(res.companyTaxNumber)
    setInvoice(res.companyInvoice)
    setCode(res.companyCode)
  }, [props.show])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Güncelle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Row>
              <Col>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setCompanyName(text.target.value)}
                    id="companyname"
                    type="text"
                    name="companyname"
                    defaultValue={companyName}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="companyname"> Adı : </label>
                </Form.Floating>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setCompanyMail(text.target.value)}
                    id="companyMail"
                    type="text"
                    name="companyMail"
                    defaultValue={companyMail}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="companyMail"> Mail : </label>
                </Form.Floating>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setCompanyPhone(text.target.value)}
                    id="companyPhone"
                    type="text"
                    name="companyPhone"
                    defaultValue={companyPhone}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="companyPhone"> Tel : </label>
                </Form.Floating>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setGivePrice(text.target.value)}
                    id="givePrice"
                    type="text"
                    name="givePrice"
                    defaultValue={givePrice}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="givePrice"> Ücret : </label>
                </Form.Floating>

              </Col>



              <Col>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setHumanResorurcesName(text.target.value)}
                    id="humanResorurcesName"
                    type="text"
                    name="humanResorurcesName"
                    defaultValue={humanResorurcesName}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="humanResorurcesName"> İK Adı : </label>
                </Form.Floating>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setHumanResourcesPhone(text.target.value)}
                    id="humanResourcesPhone"
                    type="number"
                    name="humanResourcesPhone"
                    defaultValue={humanResourcesPhone}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="humanResourcesPhone"> ik Tel : </label>
                </Form.Floating>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setServis(text.target.value)}
                    id="servis"
                    type="text"
                    name="servis"
                    defaultValue={servis}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="servis"> Servis : </label>
                </Form.Floating>
                <Form.Floating className="mb-2" >
                  <Form.Control
                    onChange={(text) => setLocation(text.target.value)}
                    id="location"
                    type="text"
                    name="location"
                    defaultValue={location}
                    style={{ height: 50 }}

                  />
                  <label style={{ fontSize: 16 }} htmlFor="location"> Konum : </label>
                </Form.Floating>


              </Col>
            </Row>

            <Col>
              <Form.Floating className="mb-2" >
                <Form.Control
                  onChange={(text) => setPassword(text.target.value)}
                  id="password"
                  type="text"
                  name="password"
                  style={{ height: 50 }}

                />
                <label style={{ fontSize: 16 }} htmlFor="password"> Şifre : </label>
              </Form.Floating>

              <Form.Floating className="mb-2" >
                <Form.Control
                  onChange={(text) => setTaxNumber(text.target.value)}
                  id="taxNumber"
                  type="text"
                  name="taxNumber"
                  defaultValue={taxNumber}
                  style={{ height: 50 }}

                />
                <label style={{ fontSize: 16 }} htmlFor="taxNumber"> Vergi Numarası : </label>
              </Form.Floating>
              <Form.Floating className="mb-2" >
                <Form.Control
                  onChange={(text) => setMesai(text.target.value)}
                  id="mesai"
                  type="number"
                  name="mesai"
                  defaultValue={mesai}
                  style={{ height: 50 }}

                />
                <label style={{ fontSize: 16 }} htmlFor="mesai"> Mesai Ücreti : </label>
              </Form.Floating>
              <div>
                <input type="checkbox" title="Servis" onChange={(value) => setServis(value.target.value)} /> {'  '}
                <label> Servis </label>
              </div>

            </Col>
          </Row>
          <Row>
            <Button onClick={() => forUpdate()}>Güncelle</Button>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}