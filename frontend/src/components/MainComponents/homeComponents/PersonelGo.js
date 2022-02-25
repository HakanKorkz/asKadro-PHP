import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { ListGroup, Badge, FormControl, InputGroup, Button } from "react-bootstrap";
import { apilink } from "../../../utils/connectApi";
import Gonder from "./personelGoComponents/Gonder";

const GoPersonel = () => {
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState("")
    const [goData, setGoData] = useState([])
    const searchData = async () => {
        const searchh = 'search=' + search + '&action=searchGo'
        await axios.post(apilink, searchh).then(result => {
            setGoData(result.data.result)
            console.log(search)
        })

    }
    useEffect(() => {
        if (search.length >= 2) searchData()
    }, [search])
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Seacrh Personel"
                    aria-label="Seacrh Personel"
                    aria-describedby="basic-addon2"
                    onChange={value => { setSearch(value.target.value) }}
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>

            <ListGroup as="ol" numbered>
                {
                    goData.map((result, index) => {
                        return (

                            <ListGroup.Item
                                key={index}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold"> {result.firstName + " " + result.lastName} </div>
                                    {result.phone}
                                </div>
                                <Badge variant="primary" pill>
                                    {result.date}
                                </Badge>
                                <Button variant="outline-success" onClick={() => setShowModal(!showModal)} >Gönder</Button>
                                <Gonder show={showModal} onHide={() => setShowModal(!showModal)} data={result} />

                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>

        </div>

    )
}
export default GoPersonel