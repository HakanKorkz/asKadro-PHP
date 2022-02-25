import { useContext } from "react";
import { Modal, Container, Col, Button, Row } from "react-bootstrap"
import { GlobalContext } from "../../../../context/GlobalContext";

export default function Delete(props) {
    const { employeeDeleteData } = useContext(GlobalContext)
    const deleteButton = async () => {
        await employeeDeleteData(props.result.code)
       props.onHide()
    }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{ display: "flex", justifyContent: "center" }}>
                    Silmek İstediğinden Emin Misin ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row >
                        <Col style={{ fontSize: 20 }} >
                            <strong style={{ fontSize: 35, display: "flex", justifyContent: "center", textAlign: "center" }}> {props.result.firstName + " " + props.result.lastName} </strong> {<br />} Kişisini silmek üzeresiniz ve bu işlemi geri alamazsınız devam etmek için SİL'e tıklayın
                        </Col>

                    </Row>

                    <Row style={{ marginTop: 20 }} >
                        <Col xs={1} md={12}>
                            <strong>Telefon Numarası : {props.result.phone}</strong>
                        </Col>
                        <Col xs={6} md={4}>

                        </Col>
                        <Col xs={6} md={4}>

                        </Col>
                    </Row>
                    <Row style={{ marginTop: 50 }} >
                        <Col md={{ span: 4, offset: 5 }}>
                            <Button onClick={deleteButton} >
                                SİL
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}