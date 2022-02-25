import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { Card, ListGroup, Row, Col, Button, Modal } from "react-bootstrap"
import DeleteCom from "./companyListModals/DeleteCom";
import UpdateCom from "./companyListModals/UpdateCom";
import SendCom from "./companyListModals/SendCom";

const CompanyList = () => {
    const { companiesData } = useContext(GlobalContext)

    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [sendModalShow, setSendModalShow] = useState(false);
    const [forModal, setForModal] = useState([])

    const ModalUpdate = (result) => {
        setUpdateModalShow(true)
        setDeleteModalShow(false)
        setSendModalShow(false)

        setForModal(result)
    }
    const ModalDelete = (result) => {
        setUpdateModalShow(false)
        setSendModalShow(false)
        setDeleteModalShow(true)
        setForModal(result)
    }
    const ModalSend = (result) => {
        setUpdateModalShow(false)
        setDeleteModalShow(false)
        setSendModalShow(true)
        setForModal(result)
    }

    return (
        <div>
            <UpdateCom show={updateModalShow} onHide={() => setUpdateModalShow(false)} result={forModal} />
            <DeleteCom show={deleteModalShow} onHide={() => setDeleteModalShow(false)} result={forModal} />
            <SendCom show={sendModalShow} onHide={() => setSendModalShow(false)} result={forModal} />
            <Row xs={1} md="auto" className="g-4">
                {companiesData.length > 0 ?
                   ( companiesData.map((result, index) => (
                        <Col key={index} >
                            <Card style={{ width: '23rem', borderRadius: 25, borderWidth: .5 }} >
                                <Card.Body>
                                    <Card.Title style={{
                                        fontSize: 30, display: "flex", justifyContent: "center", marginBottom: 10, backgroundColor: "#F1F8FF", borderRadius: 17, height: 50, textAlign: "center",
                                        alignSelf: "center", alignItems: "center",
                                    }}> {result.companyName} </Card.Title>
                                    <ListGroup variant="flush" >
                                        <ListGroup.Item> <strong>Şirket Email : </strong> <i>{result.companyEmail} </i></ListGroup.Item>
                                        <ListGroup.Item> <strong>Şirket Telefon : </strong> <i>{result.companyPhone} </i></ListGroup.Item>
                                        <ListGroup.Item> <strong>İnsan Kaynakları : </strong> <i>{result.companyHumanResourcesName} </i></ListGroup.Item>
                                        <ListGroup.Item> <strong>İnsan Kaynakları Tel : </strong> <i>{result.companyHumanResourcesPhone} </i></ListGroup.Item>
                                        <ListGroup.Item> <strong>Verdiği Ücret : </strong> <i>{result.companyGivePrice} </i></ListGroup.Item>
                                        <ListGroup.Item> <strong>Konumu : </strong> <i>{result.companyLocation}</i> </ListGroup.Item>
                                        <ListGroup.Item> <strong>Vergi Numarası :</strong> <i> {result.companyTaxNumber}</i> </ListGroup.Item>
                                        <ListGroup.Item> <strong>Servis :</strong><i>{result.companyService === true ? (<div>Servis Var</div>) : (<div>Servis Yok</div>)}</i></ListGroup.Item>
                                        <Row md="auto" style={{ display: "flex", justifyContent: "space-around" }}>
                                            <Button variant="success" onClick={() => ModalUpdate(result)} >Güncelle</Button>
                                            <Button variant="success" onClick={() => ModalDelete(result)} >Sil</Button>
                                            <Button variant="success" onClick={() => ModalSend(result)} >Fatura</Button>

                                        </Row>
                                    </ListGroup>
                                </Card.Body>
                            </Card >
                        </Col >
                    ))): <label>Listelenecek Şirket Yok</label>
                }
            </Row >
        </div >
    )
}
export default CompanyList