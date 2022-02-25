import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Col, Row, ListGroup, Form, FloatingLabel, Container, Button, Table } from 'react-bootstrap'
import { GlobalContext } from '../../context/GlobalContext'

const EmployeeScreen = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const { employeesData, companiesData } = useContext(GlobalContext)
    const [work, setWork] = useState("")
    const [companyNa, setCompanyNa] = useState("")
    const [enterTime, setEnterTime] = useState("")
    const [exitTime, setExitTime] = useState("")
    const [workDate, setWorkDate] = useState("")
    const [salary, setSalary] = useState("")
    const [data, setData] = useState([])
    const code = cookies.EmployeeCode
    const logout = () => {
        setCookie("Employee", false, { path: "/" })
        window.location.reload()
    }

    // useEffect(() => {
    //    setData( 
    //     employeesData.find(result => result.code === code)
    //    )
    // }, [data])
    return (
        <Container>
            <Button onClick={() => logout()} > tıklarsan Çıkarsın </Button>
            <Row className="justify-content-md-center">
                <Col  >
                    <FloatingLabel controlId="floatingWorkSelect" label="İş">
                        <Form.Select
                            id="WorkSelect"
                            type="text"
                            placeholder=""
                            defaultValue={work}
                            style={{ height: 60 }}
                            name="WorkSelect"
                            onChange={(text) => setWork(text.target.value)}
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
                    <FloatingLabel controlId="floatingCompanySelect" label="Şirket">
                        <Form.Select
                            id="companySelect"
                            type="text"
                            placeholder=""
                            defaultValue={work}
                            style={{ height: 60 }}
                            name="companySelect"
                            onChange={(text) => setCompanyNa(text.target.value)}
                        >
                            {/* {companiesData.map((result,index)=>{
                                <option key={index} value={result.companyName} > {result.companyName} </option>
                            })} */}
                            <option value="garson">Garson</option>

                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingEnterTime" label="Başlama">
                        <Form.Control
                            type="time"
                            id="enterTime"
                            name="enterTime"
                            style={{ height: 60 }}
                            onChange={(text) => setEnterTime(text.target.value)}

                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingExitTime" label="Bitiş">
                        <Form.Control
                            type="time"
                            id="exitTime"
                            name="exitTime"
                            style={{ height: 60 }}
                            onChange={(text) => setExitTime(text.target.value)}

                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingWorkDate" label="Tarih">
                        <Form.Control
                            type="date"
                            id="WorkDate"
                            name="WorkDate"
                            style={{ height: 60 }}
                            onChange={(text) => setWorkDate(text.target.value)}

                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSalary" label="Ücret">
                        <Form.Control
                            type="number"
                            id="salary"
                            name="salary"
                            style={{ height: 60 }}
                            onChange={(text) => setSalary(text.target.value)}

                        />
                    </FloatingLabel>

                    <div className="d-grid gap-2">
                        <Button variant='success' style={{ width: "auto" }} > Ekle </Button>
                    </div>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <th key={index}>Table heading</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                data.map((result,index)=>{
                                    <tr>
                                        <td> {index} </td>
                                        <td key={index}> {result.companyName} </td>
                                    </tr>
                                })
                            } */}
                            <tr>
                                <td>1</td>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default EmployeeScreen
