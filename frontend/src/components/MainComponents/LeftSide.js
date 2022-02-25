import React, { useContext } from "react";
import { ListGroup } from 'react-bootstrap'
import { GlobalContext } from "../../context/GlobalContext";

const LeftSide = () => {
    const { setPageNumber } = useContext(GlobalContext)

    return (
        <ListGroup defaultActiveKey="#link1" variant="flush">
            <ListGroup.Item action href="#link1" onClick={() => setPageNumber(1)}>
                Personel Listesi
            </ListGroup.Item>

            <ListGroup.Item action href="#link3" onClick={() => setPageNumber(2)}>
                Personel Ekle
            </ListGroup.Item>
            <ListGroup.Item action href="#link4" onClick={() => setPageNumber(3)}>
                Şirket Ekle
            </ListGroup.Item>
            <ListGroup.Item action href="#link5" onClick={() => setPageNumber(4)}>
                Şirket Listele
            </ListGroup.Item>
        </ListGroup>
    )
}

export default LeftSide;
