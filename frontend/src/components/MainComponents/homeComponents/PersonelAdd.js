import React, { useContext, useState, useEffect } from "react";
import { Formik } from 'formik';
import *as Yup from "yup"
import { GlobalContext } from "../../../context/GlobalContext";
import { Form, Button, FloatingLabel, Spinner } from 'react-bootstrap'
import { DataModal } from "./ResultModal"

const AddPersonel = () => {
    const { employeeAddData } = useContext(GlobalContext)
    const [modalDataShow, setModalDataShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [criminalRecordFile, setCriminalRecordFile] = useState({})
    const [socialSecurityFile, setSocialSecurityFile] = useState({})
    const [deleteData, setDeleteData] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Zorunlu Alan").min(1, "Çok Kısa"),
        // lastName: Yup.string().required("Zorunlu Alan").min(1, "Çok Kısa"),
        // phone: Yup.string().required("Zorunlu Alan").min(10, "Çok Kısa").max(11, "Çok Uzun"),
        // date: Yup.date().required("Zorunlu Alan"),
        // adress: Yup.string(),
        // tc: Yup.string().min(11, "Lütfen 11 Rakam Giriniz").max(11, "Lütfen 11 Rakam Giriniz"),
        // iban: Yup.string().min(20, "Kontrol Ediniz").max(35, "Kontrol Ediniz,Fazla girdi"),
        // workType: Yup.string(),
        // email: Yup.string().email("Kontrol Ediniz").required("Girmelisin"),
        // password: Yup.string()
    })

    let cri = true,soci=true
    const succesEvent = async (values) => {
        setIsLoading(true)
        try {
            if (cri || soci) {
                await employeeAddData(values.firstName, values.lastName, values.phone, values.date, values.adress, values.tc, values.iban, values.workType, values.email, values.password, values.hesCode, criminalRecordFile, socialSecurityFile)
                setIsLoading(false)
                setModalDataShow(true)
                setErrorMessage("")
            } else {
                setErrorMessage("Sabıka Kaydı ve ya SGK kontrol et.")
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            if (deleteData) {
                // values.firstName = ""
                // values.lastName = ""
                // values.phone = ""
                // values.date = ""
                // values.adress = ""
                // values.tc = ""
                // values.iban = ""
                // values.workType = ""
                // values.email = ""
                // values.password = ""
                // values.hesCode = ""
                // setErrorMessage("")
            }


        }
    }

    function handleInputChangeCriminal(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile.size > 5000000) {
            cri = false
        }else{
            cri=true
            setCriminalRecordFile(selectedFile)
        }
    }
    function handleInputChangeSgk(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile.size > 5000000) {
            soci=false
        }else{
            soci=true
            setSocialSecurityFile(selectedFile)
        }
    }

    return (
        <div>
            <DataModal
                show={modalDataShow}
                onHideData={() => setModalDataShow(false)}
                setDeleteData={setDeleteData}
            />
            <h1 style={{textAlign:"center",fontFamily:"fantasy"}}> Personel Ekle </h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    phone: "",
                    date: "",
                    adress: "",
                    tc: "",
                    iban: "",
                    workType: "garson",
                    email: '',
                    password: '',
                    hesCode: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    succesEvent(values)
                }}
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
                                placeholder="Mustafa"
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
                                placeholder="(532 xxx xx xx)"
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
                                id="adress"
                                type="text"
                                placeholder="Mustafa öncel mah. göktuğ sok. no 42/1 Bağcılar/İstanbul"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="adress"
                                value={values.adress}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="adress">Adresi</label>
                            <div style={{ color: "red", fontSize: 13 }}>   {errors.adress && touched.adress && errors.adress}</div>
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="tc"
                                type="text"
                                placeholder="983411209346"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="tc"
                                value={values.tc}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="tc">Türkiye Kimlik Numarası</label>
                            <div style={{ color: "red", fontSize: 13 }}>   {errors.tc && touched.tc && errors.tc}</div>
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="iban"
                                type="text"
                                placeholder="TR10004321000803100001243"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="iban"
                                value={values.iban}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="iban">İban Numarası</label>
                            <div style={{ color: "red", fontSize: 13 }}>  {errors.iban && touched.iban && errors.iban}</div>
                        </Form.Floating>
                        <Form.Floating style={{ marginBottom: 7 }}>

                            <FloatingLabel controlId="floatingSelect" label="Çalışan Mevkisi">
                                <Form.Select aria-label="Çalışan Mevkisi"
                                    id="workType"
                                    type="text"
                                    placeholder="Garson"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="workType"
                                    value={values.workType}
                                    defaultValue="garson"
                                    style={{ height: 60 }}

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
                                    <option value="İşçi">İşçi</option>



                                </Form.Select>
                                <div style={{ color: "red", fontSize: 13 }}>   {errors.workType && touched.workType && errors.workType}</div>
                            </FloatingLabel>
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
                        <Form.Floating style={{ marginBottom: 7 }}>
                            <Form.Control
                                id="hesCode"
                                type="text"
                                placeholder="34T2-12-45"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="hesCode"
                                value={values.hesCode}

                            />
                            <label style={{ fontSize: 16 }} htmlFor="hesCode">Hes Kodu</label>
                            <div style={{ color: "red", fontSize: 13 }}>  {errors.hesCode && touched.hesCode && errors.hesCode}</div>
                        </Form.Floating>
                        <Form.Label style={{ marginBottom: 7 }}>Sabıka Kaydı</Form.Label>  {criminalRecordFile.size > 5000000 ? <label style={{ color: "tomato" }}> {"-"} Fazla Boyut</label> : null}
                        <Form.Control
                            id="criminalRecord"
                            type="file"
                            name="criminalRecord"
                            onChange={handleInputChangeCriminal}

                        />
                        <Form.Label style={{ marginBottom: 7 }}>SGK</Form.Label> {socialSecurityFile.size > 5000000 ? <label style={{ color: "tomato" }}>{"-"}Fazla Boyut</label> : null}
                        <Form.Control
                            id="socialSecurityFile"
                            type="file"
                            name="socialSecurityFile"
                            onChange={handleInputChangeSgk}

                        />
                        {
                            errorMessage ? (<div> {errorMessage} </div>) : null
                        }
                        {
                            !isLoading ? (
                                <Button type="submit" variant="success" style={{ width: 200, height: 43, marginTop: 25 }}>
                                    Submit
                                </Button>) : <Spinner style={{ marginTop: 25, display: "flex", justifyContent: "center" }} animation="grow" variant="success" />
                        }

                    </form>
                )}
            </Formik>
        </div>
    )
}
export default AddPersonel