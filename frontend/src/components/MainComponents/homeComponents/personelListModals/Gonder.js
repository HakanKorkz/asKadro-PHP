import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Container, Col, Button, Row, Form, FormSelect, FloatingLabel } from "react-bootstrap"
import { GlobalContext } from "../../../../context/GlobalContext";
import { apilink } from "../../../../utils/connectApi";
export default function Gonder(props) {
    const { companiesData } = useContext(GlobalContext)
    const [companyName, setCompanyName] = useState("")
    const [price, setPrice] = useState("")
    const [time, setTime] = useState("")
    const [companyCode, setCompanyCode] = useState("")
    const [date, setDate] = useState("")
    const [addPrice, setAddPrice] = useState("0")
    const [nextWork, setNextWork] = useState("1")
    const [win, setWin] = useState(false)
    const [errorMessage, seteErrorMessage] = useState("")
    const prf = props.result

    async function workAddEmployee() {
        try {
            if (price != "" && date != "" && companyName != "") {
                const employe = 'code=' + prf.code + '&companyCode=' + companyCode + '&price=' + price + '&nextWork=' + nextWork + '&time=' + time + ' & date=' + date + ' & addPrice=' + addPrice + ' & action=workAdd'
                await axios.post(apilink, employe).then(result => {
                    console.log(result.data)
                    if (!result.data.error && result.data.result) {
                        setCompanyName("")
                        setTime("")
                        setPrice("")
                        setDate("")
                        setAddPrice("")
                        setNextWork("")
                        setWin(true)
                    }else{
                        seteErrorMessage("Sistem Hatası")
                    }
                })
            }else{
                seteErrorMessage("Lütfen Kontrol Edin")
            }
        } catch (error) {
            seteErrorMessage(error)
        }

    }
    useEffect(() => {
        if (companiesData.length >= 1)
            for (let i = 0; i < companiesData.length; i++) {
                if (companiesData[i].companyName === companyName) {
                    setCompanyCode(companiesData[i].companyCode)
                }
            }
    }, [companyName, price, time, props.show])

    function handleEvent(event) {
        setCompanyName(event.target.value)
    }
    if (win || errorMessage) {
        setTimeout(() => {
            setWin(false)
            seteErrorMessage(false)
        }, 2500);
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
            <Modal.Header closeButton style={{ backgroundColor: "tomato" }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                    Aşağıdaki kişinin gideceğini yeri belirleyiniz.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container style={{ padding: 7 }}>
                    <div>

                        <label style={{ fontSize: 21, marginBottom: 12, fontFamily: "monospace" }}> {`${prf.firstName}   ${prf.lastName}`} </label>
                    </div>

                    <Col>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Şirket Seç" style={{ marginBottom: 7 }}>
                                    <FormSelect
                                        aria-label="Şirket Seç"
                                        id="company"
                                        type="text"
                                        name="company"
                                        style={{ marginBottom: 12, height: 65 }}
                                        onChange={handleEvent}
                                    // onChange={(text) => setCompanyName(text.target.value)}
                                    >
                                        <option >Şirket Seçiniz.</option>
                                        {

                                            companiesData.map((res, idx) => {
                                                return (
                                                    <option key={idx} > {res.companyName} </option>
                                                )
                                            })
                                        }
                                    </FormSelect>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <Form.Floating style={{ marginBottom: 7 }} >
                                    <Form.Control
                                        id="nextWork"
                                        type="number"
                                        name="nextWork"
                                        onChange={text => setNextWork(text.target.value)}
                                        value={nextWork}
                                        style={{ height: 60 }}
                                    />
                                    <label htmlFor="nextWork" > İşe devam edeceğini gün sayısı </label>
                                </Form.Floating>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Floating style={{ marginBottom: 7 }}>
                                    <Form.Control
                                        id="price"
                                        type="number"
                                        name="price"
                                        onChange={text => setPrice(text.target.value)}
                                        value={price}
                                        style={{ height: 60 }}
                                    />
                                    <label htmlFor="price" > Ücret </label>
                                </Form.Floating>
                                <Form.Floating style={{ marginBottom: 7 }}>
                                    <Form.Control
                                        id="addPrice"
                                        type="number"
                                        name="addPrice"
                                        onChange={text => setAddPrice(text.target.value)}
                                        value={addPrice}
                                        style={{ height: 60 }}
                                    />
                                    <label htmlFor="price" > Ek Ücret </label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating style={{ marginBottom: 7 }}>
                                    <Form.Control
                                        id="Saat"
                                        type="time"
                                        name="price"
                                        onChange={text => setTime(text.target.value)}
                                        value={time}
                                        style={{ height: 60 }}
                                    />
                                    <label htmlFor="price" > Çalışma Başlangıç Saati </label>
                                </Form.Floating>
                                <Form.Floating style={{ marginBottom: 7 }}>
                                    <Form.Control
                                        id="date"
                                        type="date"
                                        name="date"
                                        onChange={text => setDate(text.target.value)}
                                        value={date}
                                        style={{ height: 60 }}
                                    />
                                    <label htmlFor="price" > Giriş Tarihi </label>
                                </Form.Floating>

                            </Col>
                        </Row>
                    </Col>
                    {
                        win ? (<div style={{ textAlign: "center", color: "tomato", fontSize: 21, marginTop: 12, marginBottom: 12 }}>Gönderildi</div>) : null
                    }
                    {
                        errorMessage ? (<div style={{ textAlign: "center", color: "tomato", fontSize: 21, marginTop: 12, marginBottom: 12 }}>{errorMessage}</div>) : null
                    }
                    <Col style={{ justifyContent: "center", display: "flex" }}>

                        <Button style={{ width: 200, height: 45 }} onClick={() => workAddEmployee()} >Gönder</Button>
                    </Col>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}