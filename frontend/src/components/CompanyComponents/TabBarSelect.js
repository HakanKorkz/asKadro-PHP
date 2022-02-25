import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function TabBarSelect(props) {
    const openPage = (number) => {
        props.setActivePageCompany(number)
    }
    return (
        <div>
            <div>
                <ListGroup as="ul" defaultActiveKey="#link1" horizontal>
                    <ListGroup.Item as="li" href="#link1" action onClick={() => { openPage(1) }}>
                        Personel İste
                    </ListGroup.Item>
                    <ListGroup.Item as="li" href="#link2" action onClick={() => { openPage(2) }}>
                        Puantaj Yaz
                    </ListGroup.Item>
                    <ListGroup.Item as="li" href="#link3" action onClick={() => { openPage(3) }}>
                        Sonuç
                    </ListGroup.Item>
                    <ListGroup.Item as="li" href="#link4" action onClick={() => { openPage(4) }}>
                        İletişim
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}
