import React, { useContext } from 'react'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import { GlobalContext } from '../../context/GlobalContext'
import "./listNavStyle.css"

const CompanyListNav = () => {
    const { companiesData } = useContext(GlobalContext)
    // const data =[
    //     from,
    //     to,
    //     cc,
    //     subject,
    //     messageTitle,
    //     message,
    // ]
    return (
        <div>
            <div id="container" >
                <ListGroup horizontal='sm' md="auto" style={{ borderWidth: 0 }}>
                    {
                        companiesData.map((result, index) => {
                            return (
                                <ListGroup.Item key={index} style={{ width: 200, borderWidth: 0 }} >
                                    <Button variant="light" style={{ width: 150 }} >
                                        {result.companyName}
                                    </Button>
                                </ListGroup.Item>
                            )
                        })
                    }

                </ListGroup>
            </div>
        </div>
    )
}

export default CompanyListNav
