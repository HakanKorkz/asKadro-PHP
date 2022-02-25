import React, { useContext, useState } from "react";
import {
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import "./loginPageStyle.css"
import { GlobalContext } from "../../context/GlobalContext"
import { apilink } from "../../utils/connectApi";
import axios from "axios";
import { Button, Row, Offcanvas } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import  EmployeSignin  from "./employeeSingup";

const LoginPage = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { activeLogin } = useContext(GlobalContext)
    const [cookies, setCookie] = useCookies(['user']);
    async function login(email, password) {
        try {
            const emploLogin = 'email=' + email + '&password=' + password + '&action=login'
            await axios.post(apilink, emploLogin).then(result => {
                console.log(result.data.login)
                const log = result.data.login
                activeLogin()
                if (log) {
                    if (log.employee) {
                        setCookie("Employee", true, { path: "/" })
                    }
                    if (log.company) {
                        setCookie("Company", true, { path: "/" })
                    }
                    if (log.manager) {
                        setCookie("Manager", true, { path: "/" })
                    }

                }
            })
        } catch (error) {
            console.log(error)
        }finally{
            window.location.reload()

        }
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showSign, setShowSign] = useState(false)

    const handleShowSign =()=> setShowSign(true)
    const handleCloseSign =()=> setShowSign(false)

    const Informing = () => {

        return (
            <>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header style={{backgroundColor:"tomato"}} closeButton>
                        <Offcanvas.Title>AS KADRO</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <h2 style={{textAlign:"center"}}>Biz Kimiz ?</h2>
                        <p>
                            Biz Otellere, Düğün salonlarına, Depolara, Kınalara vb. insan gücüne ihtiyaç duyan iş
                            alanlarına personel temini yapan insan kaynakları Firmasıyız. {<br />}
                            Çeşitli alanlara yönelik yaptığımız çalışmaları sağlam ve dinamik ekibimizle yönetmekteyiz ve çalıştığımız
                            firmaların istekleri üzerine çalışırız ve en doğru kişiyi yönlendiririz. {<br />}
                        </p>
                        <h2 style={{textAlign:"center"}}>Burası Nedir ?</h2>
                        <p>
                            Bu site bizler için personel yönetimi, çalıştığımız şirketler için puantaj ve talep sistemi, personellerimiz için kişiye özel puantaj alanıdır.
                        </p>
                        <h2 style={{textAlign:"center"}}>Personel Çalışma Alanlarımız ?</h2>
                        <ul>
                            <li>Garson</li>
                            <li>Komi</li>
                            <li>Temizlikçi</li>
                            <li>Bulaşıkçı</li>
                            <li>Depo Elemanı</li>
                            <li>Hostes</li>
                            <li>Nedime</li>
                            <li>Anket Elemanı</li>

                        </ul>
                        <h2 style={{textAlign:"center"}}>Nerelerle Çalışıyoruz ? ve Çalıştık</h2>
                        <p>
                            <ul>
                                <li>Crowne Plaza</li>
                                <li>Beşiktaş</li>
                                <li>Dedeman Hotel</li>
                                <li>Galatasaray</li>
                                <li>Hilton Garden</li>
                                <li>Grand Cevahir</li>
                                <li>Legacy Ottoman</li>
                                <li>Marriot</li>
                                <li>Maslak Hilton Hotel</li>
                                <li>Aktivite Park</li>
                                <li>Radison Tuzla</li>
                                <li>Radison Ataşehir</li>


                            </ul>
                        </p>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }
    return (
        <div className="App">
            <EmployeSignin show={showSign} onHide={()=>setShowSign(false)} />
            <h2>Giriş</h2>
            <Informing />

            <Form className="form">
                <FormGroup>
                    <Label htmlFor="exampleEmail">Email :</Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="example@example.com"
                        value={email}
                        onChange={text => setEmail(text.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="examplePassword">Password :</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        value={password}
                        onChange={text => setPassword(text.target.value)}
                    />
                </FormGroup>



            </Form>
            <Row className="buttonRow">
                <Button variant="success" onClick={() => { login(email, password) }} >Giriş</Button>
                <Button variant="info" onClick={handleShowSign} >Personel Kayıt</Button>
                <Button variant="warning" onClick={handleShow} >Bilgilendirme</Button>

            </Row>
        </div>
    );
}
export default LoginPage