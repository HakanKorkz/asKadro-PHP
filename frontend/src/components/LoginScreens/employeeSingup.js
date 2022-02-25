import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { apilink } from "../../utils/connectApi";
import *as Yup from "yup"

export default function EmployeSignin(props) {
    const [loading, setLoading] = useState(true)
    const singUpEmployee = async (values) => {
        setLoading(false)
        try {
            const employeeData = 'email=' + values.email + '&phone=' + values.phone + '&password=' + values.password + '&firstName=' + values.firstName + '&lastName=' + values.lastName + '&date=' + values.date + '&action=employeeNewAdd'
            await axios.post(apilink, employeeData).then(res=>{
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(true)

        }
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Lütfen İsminizi Giriniz.").min(2).max(60),
        lastName: Yup.string().required("Lütfen Soyadınızı Giriniz.").min(2).max(80),
        phone: Yup.number()
            .typeError("Telefon Numarasına Benzemiyor")
            .positive("Telefon Numarası Eksi İle Başlamaz.")
            .integer("Ondalık Nokta İçeremez.")
            .min(8)
            .required('Telefon Numarası Gereklidir.'),
        email: Yup.string().required("Giriş Yapabilmeniz Gerekli."),
        password: Yup.string().required("Şifre Zorunlu Alan.").min(6).max(30),
        date: Yup.string().required("Yaş Bilgisi Gereklidir.")
    })

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header
                style={{ background: 'grey', display: "flex", justifyContent: "center" }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                    Kayıt Ekranı
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3 style={{ textAlign: "center" }}>Çalışma sistemine kaydolmak için bilgileri doldurunuz.</h3>
                <Formik
                    initialValues={{ firstName: "", lastName: "", phone: "", email: "", password: "", date: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => { singUpEmployee(values) }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        errors,
                        values
                    }) => (
                        <form onSubmit={handleSubmit} style={{ padding: 13 }}>

                            <Form.Floating style={{ marginBottom: 7 }}>
                                <Form.Control
                                    id="firstName"
                                    type="text"
                                    placeholder="Mustafa"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="firstName"
                                    value={values.firstName}

                                />
                                <label style={{ fontSize: 16 }} htmlFor="firstName">İsim</label>
                                <div style={{ color: "red", fontSize: 13 }}> {errors.firstName && touched.firstName && errors.firstName} </div>
                            </Form.Floating>

                            <Form.Floating style={{ marginBottom: 7 }}>
                                <Form.Control
                                    id="lastName"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="lastName"
                                    value={values.lastName}

                                />
                                <label style={{ fontSize: 16 }} htmlFor="lastName">Soyisim</label>
                                <div style={{ color: "red", fontSize: 13 }}>  {errors.lastName && touched.lastName && errors.lastName}</div>
                            </Form.Floating>

                            <Form.Floating style={{ marginBottom: 7 }}>
                                <Form.Control
                                    id="phone"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="phone"
                                    value={values.phone}


                                />
                                <label style={{ fontSize: 16 }} htmlFor="phone">Telefon Numarası</label>
                                <div style={{ color: "red", fontSize: 13 }}>  {errors.phone && touched.phone && errors.phone}</div>
                            </Form.Floating>

                            <Form.Floating style={{ marginBottom: 7 }}>
                                <Form.Control
                                    id="date"
                                    type="date"
                                    placeholder="12.05.1997"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="date"
                                    value={values.date}


                                />
                                <label style={{ fontSize: 16 }} htmlFor="date">Doğum Tarihi</label>
                                <div style={{ color: "red", fontSize: 13 }}>  {errors.date && touched.date && errors.date}</div>
                            </Form.Floating>

                            <Form.Floating style={{ marginBottom: 7 }}>
                                <Form.Control
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                    value={values.email}

                                />
                                <label style={{ fontSize: 16 }} htmlFor="email">Email Adresi</label>
                                <div style={{ color: "red", fontSize: 13 }}>   {errors.email && touched.email && errors.email}</div>
                            </Form.Floating>

                            <Form.Floating style={{ marginBottom: 7 }}>
                                <Form.Control
                                    id="password"
                                    type="text"
                                    placeholder="*********"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="password"
                                    value={values.password}

                                />
                                <label style={{ fontSize: 16 }} htmlFor="password">Şifre ( Kullanıcı kendi hesabına bu şifre
                                    ile girecek lütfen kullanıcı ile paylaş )</label>
                                <div style={{ color: "red", fontSize: 13 }}>  {errors.password && touched.password && errors.password}</div>
                            </Form.Floating>
                            {
                                loading ? (<Button type="submit" variant="warning" > Kayıt Ol </Button>) : (<Spinner animation="grow" />)
                            }

                        </form>

                    )}

                </Formik>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>

            </Modal.Footer>
        </Modal>
    );
}