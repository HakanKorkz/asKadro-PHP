import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"
import { GlobalContext } from "../../../../context/GlobalContext";
import { apilink } from "../../../../utils/connectApi";
export default function Works(props) {
    const { companiesData } = useContext(GlobalContext)
    const result = props.result
    const getCompanyName = (res) => {
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < companiesData.length; j++) {
                if (res[i].companyCode === companiesData[i].companyCode) {
                    return companiesData[i].companyName
                }

            }

        }

    }
    console.log(result)
    const totalPrice = () => {
        let total = 0
        if (Array.isArray(result)) result.forEach((res) => {
            total += Number(res.price)
        })
        return total
    }
    const [amount, setAmount] = useState("")
 
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="ui two column centered grid">
                    {result.firstName + " " + result.lastName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <div style={{ textAlign: "center", marginBottom: 25 }}>
                    <div>Alacağı ücret :</div>
                    <label style={{ fontSize: 25 }}> {totalPrice()} </label>
                </div>
                <div className="ui grid">
                    <div className="eight wide column">

                        <div>Ödenmişler Listesi :</div> {"   "}
                        {/* <div className="ui list">
                            {Array.isArray(result)}
                        </div> */}
                    </div>

                    <div className="eight wide column">
                        <div>Ödenecekler Listesi :</div>
                        <div className="ui list">

                            {Array.isArray(result) ? (
                                result.map((res, idx) => {
                                    return (
                                        <div key={idx} className="item">
                                            <i className="map marker icon"></i>
                                            <div className="content">
                                                <a className="header"> {res.companyName} </a>
                                                <div className="description">
                                                    <strong>
                                                        <span style={{ fontSize: 21, color: "tomato" }}>{res.price}
                                                        </span> {" / "}
                                                        <span style={{ fontSize: 17, color: "#f58f7d" }}>{res.addPrice}
                                                        </span> {" / "}<i> {res.workDate}{" / "}{res.workTime}</i>
                                                        </strong> 
                                                        
                                                        </div>
                                                        <span> {Number(res.price)+Number(res.addPrice)} ₺ </span>
                                                        <button style={{height:25,paddingBottom:20}} >Öde</button>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            ) : (
                                <div style={{ fontSize: 21, color: "#fc7703" }}> {result} </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* <Container>
                    <Row>
                        <h3>Ödeme Bilgilendirme</h3>
                        <Col>
                            <label htmlFor="getPay" > Alacağı </label>
                            <div> 1250 </div>

                        </Col>
                        <Col>
                            <label htmlFor="getPay" > Verilen </label>
                            <Form.Control
                            id="getPay"
                            />
                           
                        </Col>
                        <Col>
                        <br /> 
                         <Button>Ver</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control />
                        </Col>

                    </Row>
                </Container> */}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}