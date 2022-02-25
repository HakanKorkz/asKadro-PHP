import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Container, Col, Button, Row, Form, FormSelect, FloatingLabel } from "react-bootstrap"
import { GlobalContext } from "../../../../context/GlobalContext";
import { apilink } from "../../../../utils/connectApi";
export default function Info(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(props.result)
    }, [data, props.result])
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
            <Modal.Header closeButton style={{ backgroundColor: "tomato" }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                    Personel Bilgileri
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <div>
                    <h5><strong> Adı : </strong> ------------<i>{data.firstName}</i>   </h5> <br />
                    <h5><strong> Soyadı : </strong>--------<i>{data.lastName}</i>   </h5><br />
                    <h5><strong> Maili : </strong> ----------<i>{data.Email}</i>   </h5><br />
                    <h5><strong> Adresi : </strong> --------<i>{data.address}</i>   </h5><br />
                    <h5><strong> Hes Kodu : </strong> ----<i>{data.hesCode}</i>   </h5><br />
                    <h5><strong> İbanı : </strong>-------- -<i>{data.iban}</i>   </h5><br />
                    <h5><strong> Telefonu : </strong> -----<i>{data.phone}</i>   </h5><br />
                    <h5><strong> TC'si : </strong> ----------<i>{data.tc}</i>   </h5><br />
                    <h5><strong> Çalışma Şekli : </strong> <i>{data.workType}</i>   </h5><br />

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}