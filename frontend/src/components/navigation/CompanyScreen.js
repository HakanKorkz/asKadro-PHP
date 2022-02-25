import React, { useState } from 'react'
import RequestEmployee from '../CompanyComponents/requestEmployee'
import TabBarSelect from '../CompanyComponents/TabBarSelect'
import "../CompanyComponents/bar.css"
import { Container, Row, Col, Button } from 'react-bootstrap'
import EmployeeAdded from '../CompanyComponents/employeeAdded'
import { useCookies } from 'react-cookie'

const CompanyScreen = () => {
    const [activePageCompany, setActivePageCompany] = useState(1)
    const [cookies, setCookie] = useCookies(['user'])

    const logout = () => {
        setCookie("Company", false, { path: "/" })
        window.location.reload()
    }
    return (
        <div>
             <Button onClick={() => logout()}>
                            çık
                        </Button>
            <div className='App'>

                <Container>
                    <Col>
                        <Row>
                            <TabBarSelect setActivePageCompany={setActivePageCompany} />
                        </Row>
                        <Row>
                            {
                                activePageCompany === 1 ? <RequestEmployee /> : null
                            }
                            {
                                activePageCompany === 2 ? <EmployeeAdded /> : null
                            }

                        </Row>

                    </Col>

                </Container>
            </div></div>
    )
}

export default CompanyScreen
