import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { Formik } from 'formik';
import *as Yup from "yup"
import { Form, Row } from "react-bootstrap";
import { Button, Col } from "reactstrap";

const AddCompany = () => {
    const { companyAddData, compAd } = useContext(GlobalContext)
    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("İsimsiz Olmaz"),
        email: Yup.string().email().required("Girmelisin"),
        phone: Yup.string().required("Gir"),
        humanResources: Yup.string(),
        humanResourcesPhone: Yup.string(),
        givePrice: Yup.string().min(1).required("Gireceksin"),
        location: Yup.string().required("Konum Gir"),
        mesai: Yup.string(),
        servis: Yup.boolean(),
        taxNumber: Yup.string(),
        invoice: Yup.string(),
    })
    const companyAdd = (values) => {
        try {
            companyAddData(values.companyName, values.email, values.password, values.phone, values.humanResourcesName, values.humanResourcesPhone, values.givePrice, values.location, values.mesai, values.servis, values.taxNumber, values.invoice)
        } catch (error) {
            console.log(error)
        } finally {
            if ( compAd && compAd.response) {
                values.companyName = ""
                // values.email = ""
                // values.password = ""
                // values.phone = ""
                // values.humanResourcesName = ""
                // values.humanResourcesPhone = ""
                // values.givePrice = ""
                // values.location = ""
                // values.mesai = ""
                // values.servis = false
                // values.taxNumber = ""
                // values.invoice = ""
            }
        }
    }
    return (
        <div>
            <div style={{ textAlign: "center", margin: 10 }}>
                <h1 style={{ fontSize: 34, fontFamily: "fantasy" }}> Şirket Ekle </h1>
            </div>
            <hr style={{ color: "tomato", height: 4 }} />
            <Formik
                initialValues={{ companyName: "", email: "", password: "", phone: "", humanResourcesName: "", humanResourcesPhone: "", givePrice: "", location: "", mesai: "", servis: false, taxNumber: "", invoice: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => { companyAdd(values) }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit} className="col-form-label-lg">
                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="companyName"
                                type="text"
                                placeholder="companyName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="companyName"
                                value={values.companyName}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="companyName">Şirket İsmi</label>
                            {errors.companyName && touched.companyName && errors.companyName}
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }} >
                            <Form.Control
                                id="email"
                                type="text"
                                placeholder="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                value={values.email}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="companyName">Email :</label>
                            {errors.email && touched.email && errors.email}
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }} >
                            <Form.Control
                                id="password"
                                type="text"
                                placeholder="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                value={values.password}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="companyName">password :</label>
                            {errors.password && touched.password && errors.password}
                        </Form.Floating>

                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="phone"
                                type="text"
                                placeholder="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="phone"
                                value={values.phone}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="phone">Telefon :</label>
                            {errors.phone && touched.phone && errors.phone}
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="humanResourcesName"
                                type="text"
                                placeholder="humanResourcesName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="humanResourcesName"
                                value={values.humanResourcesName}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="humanResourcesName">İnsan Kaynakları Kişi İsmi:</label>
                            {errors.humanResourcesName && touched.humanResourcesName && errors.humanResourcesName}
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="humanResourcesPhone"
                                type="text"
                                placeholder="humanResourcesPhone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="humanResourcesPhone"
                                value={values.humanResourcesPhone}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="humanResourcesPhone">İnsan Kaynakları Telefon Numarası :</label>
                            {errors.humanResourcesPhone && touched.humanResourcesPhone && errors.humanResourcesPhone}
                        </Form.Floating>

                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="givePrice"
                                type="text"
                                placeholder="givePrice"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="givePrice"
                                value={values.givePrice}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="givePrice">Verdiği Ücret (Şirketin verdiği!) :</label>
                            {errors.givePrice && touched.givePrice && errors.givePrice}
                        </Form.Floating>

                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="location"
                                type="text"
                                placeholder="location"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="location"
                                value={values.location}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="location">Konumu :</label>
                            {errors.location && touched.location && errors.location}
                        </Form.Floating>


                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="mesai"
                                type="text"
                                placeholder="mesai"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="mesai"
                                value={values.mesai}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="mesai">Mesai :</label>
                            {errors.mesai && touched.mesai && errors.mesai}
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }} >
                            <Form.Control
                                id="taxNumber"
                                type="text"
                                placeholder="taxNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="taxNumber"
                                value={values.taxNumber}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="taxNumber">Vergi Numarası :</label>
                            {errors.taxNumber && touched.taxNumber && errors.taxNumber}
                        </Form.Floating>

                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="invoice"
                                type="text"
                                placeholder="invoice"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="invoice"
                                value={values.invoice}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="invoice">Fatura :</label>
                            {errors.invoice && touched.invoice && errors.invoice}
                        </Form.Floating>

                        <div style={{ marginBottom: 7 }}>
                            <input
                                id="servis"
                                type="checkbox"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="servis"
                                value={values.servis}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="servis">Servis :</label>
                            {errors.servis && touched.servis && errors.servis}
                        </div>
                        {errors.servis && touched.servis && errors.servis} {<br />}
                        <Button type="submit" variant="success" >
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
export default AddCompany