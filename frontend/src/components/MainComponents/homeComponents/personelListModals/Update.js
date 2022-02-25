import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Container, Col, Button, Row, Form, FloatingLabel } from "react-bootstrap"
import { GlobalContext } from "../../../../context/GlobalContext";
import { apilink } from "../../../../utils/connectApi";
import { Formik } from 'formik';
import *as Yup from "yup"

export default function Update(props) {
    const { dataResult } = useContext(GlobalContext)
    const [fileData, setFileData] = useState([])
    const [criminalRecordFile, setCriminalRecordFile] = useState({})
    const [socialSecurityFile, setSocialSecurityFile] = useState({})


    const prf = props.result

    const employeeUpdate = async (values) => {
        try {
            getFileCode()
            if (fileData != []) {

                await getFileCode()
                const data = new FormData()
                data.append("firstname", values.firstName)
                data.append("lastname", values.lastName)
                data.append("phone", values.phone)
                data.append("date", values.date)
                data.append("address", values.adress)
                data.append("tc", values.tc)
                data.append("iban", values.iban)
                data.append("workType", values.workType)
                data.append("email", values.email)
                data.append("password", values.password)
                data.append("hesCode", values.hesCode)
                data.append("criminalRecordFile", criminalRecordFile)
                data.append("socialSecurityFile", socialSecurityFile)
                data.append("employeeCode", prf.code)
                data.append("action", 'employeeUpdate')
                if (criminalRecordFile === {}) data.delete("criminalRecordFile", criminalRecordFile)
                if (socialSecurityFile === {}) data.delete("socialSecurityFile", socialSecurityFile)
                await axios.post(apilink, data, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                }).then(res => {
                    console.log(res.data)
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
    const getFileCode = async () => {
        const filesData = 'employeeCode=' + prf.code + "&action=employeeFiles"
        await axios.post(apilink, filesData).then(res => {
            const last = res.data.result
            setFileData(last)
            console.log(fileData)

        })
    }
    // useEffect(() => {
    //     getFileCode()
    // }, [prf.phone])

    async function handleInputChangeCriminal(event) {
        const selectedFile = event.target.files[0];
        setCriminalRecordFile(selectedFile)
    }
    async function handleInputChangeSgk(event) {
        const selectedFile = event.target.files[0];
        setSocialSecurityFile(selectedFile)
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Yaz").min(2, "Biraz uzun olsa iyi olur")
    })
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                    Personel Bilgilerini Güncelle.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Formik
                    // await employeeUpdate(firstName, lastName, phone, date, adress, tc, iban, workType, email, password, hesCode, criminalRecordFile, criminalCode, socialSecurityFile, socialCode, employeeCode)

                    initialValues={{ firstName: prf.firstName, lastName: prf.lastName, phone: prf.phone, date: prf.Date, adress: prf.address, tc: prf.tc, iban: prf.iban, workType: prf.workType, email: prf.Email, password: prf.password, hesCode: prf.hesCode }}
                    onSubmit={(values) => { employeeUpdate(values) }}
                    validationSchema={validationSchema}

                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="col-form-label-lg">
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Floating >
                                            <Form.Control
                                                id="firstName"
                                                type="text"
                                                style={{ height: 50 }}
                                                name="firstName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.firstName}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="firstName">Adı :</label>
                                            {errors.firstName && touched.firstName && errors.firstName}
                                        </Form.Floating>
                                        <Form.Floating >
                                            <Form.Control
                                                id="lastName"
                                                type="text"
                                                style={{ height: 50 }}
                                                name="lastName"
                                                placeholder="lastName"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="phone">Soyadı :</label>
                                            {errors.lastName && touched.lastName && errors.lastName}
                                        </Form.Floating>

                                        <Form.Floating className="mb-2" >
                                            <Form.Control
                                                id="date"
                                                type="date"
                                                style={{ height: 50 }}
                                                name="date"
                                                placeholder="date"
                                                value={values.date}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="date">Doğum Tarihi :</label>
                                            {errors.date && touched.date && errors.date}
                                        </Form.Floating>
                                        <Form.Floating className="mb-2" >
                                            <Form.Control
                                                id="tc"
                                                type="text"
                                                style={{ height: 50 }}
                                                name="tc"
                                                placeholder="tc"
                                                value={values.tc}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="tc">TC :</label>
                                            {errors.tc && touched.tc && errors.tc}
                                        </Form.Floating>
                                    </Col>



                                    <Col>
                                        <Form.Floating className="mb-2" >
                                            <Form.Control
                                                id="phone"
                                                type="text"
                                                style={{ height: 50 }}
                                                name="phone"
                                                placeholder="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="phone">Telefon :</label>
                                            {errors.phone && touched.phone && errors.phone}
                                        </Form.Floating>
                                        <Form.Floating className="mb-2" >
                                            <Form.Control
                                                id="iban"
                                                type="text"
                                                style={{ height: 50 }}
                                                name="iban"
                                                placeholder="iban"
                                                value={values.iban}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="iban">İban :</label>
                                            {errors.iban && touched.iban && errors.iban}
                                        </Form.Floating>
                                        <Form.Floating className="mb-2" >
                                            <Form.Control
                                                id="email"
                                                type="email"
                                                style={{ height: 50 }}
                                                name="email"
                                                placeholder="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="email">Email :</label>
                                            {errors.email && touched.email && errors.email}
                                        </Form.Floating>
                                        <Form.Floating className="mb-2" >
                                            <Form.Control
                                                id="password"
                                                type="text"
                                                style={{ height: 50 }}
                                                name="password"
                                                placeholder="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            <label style={{ fontSize: 16 }} htmlFor="password">Şifre :</label>
                                            {errors.password && touched.password && errors.password}
                                        </Form.Floating>


                                    </Col>
                                    <Form.Floating className="mb-2" >
                                        <Form.Control
                                            id="hesCode"
                                            type="text"
                                            style={{ height: 50 }}
                                            name="hesCode"
                                            placeholder="hesCode"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.hesCode}
                                        />
                                        <label style={{ fontSize: 16 }} htmlFor="hesCode">HES kodu :</label>
                                        {errors.hesCode && touched.hesCode && errors.hesCode}
                                    </Form.Floating>
                                    <Form.Floating className="mb-2" >
                                        <Form.Control
                                            id="adress"
                                            type="text"
                                            style={{ height: 50 }}
                                            name="adress"
                                            placeholder="adress"
                                            value={values.adress}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label style={{ fontSize: 16 }} htmlFor="adress">Adres :</label>
                                        {errors.adress && touched.adress && errors.adress}
                                    </Form.Floating>
                                    <FloatingLabel controlId="floatingSelect" label="Çalışan Mevkisi">
                                        <Form.Select aria-label="Çalışan Mevkisi"
                                            id="workType"
                                            type="text"
                                            placeholder="Garson"
                                            value={values.workType}
                                            style={{ height: 60 }}
                                            name="workType"
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        >
                                            <option value="garson">Garson</option>
                                            <option value="komi">Komi</option>
                                            <option value="temizlikçi">Temizlikçi</option>
                                            <option value="bulaşıkçı">Bulaşıkçı</option>
                                            <option value="depo elemanı">Depo Elemanı</option>
                                            <option value="şef">Şef</option>
                                            <option value="hostes">Hostes</option>
                                            <option value="nedime">Nedime</option>
                                            <option value="anket elemanı">Anket Elemanı</option>
                                            <option value="HK">HK</option>
                                            <option value="İşçi">İşçi</option>




                                        </Form.Select>
                                    </FloatingLabel>
                                    <Form.Label>Sabıka Kaydı</Form.Label>
                                    <Form.Control
                                        id="criminalRecord"
                                        type="file"
                                        name="criminalRecord"
                                        onChange={handleInputChangeCriminal}

                                    />
                                    <Form.Label>SGK</Form.Label>
                                    <Form.Control
                                        id="sgk"
                                        type="file"
                                        name="sgk"
                                        onChange={handleInputChangeSgk}

                                    />

                                </Row>
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <Button type="submit" variant="danger" >Submit</Button>
                                </div>


                            </Container>
                        </form>
                    )}
                </Formik>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}