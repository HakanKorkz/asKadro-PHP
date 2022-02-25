import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Pagination, InputGroup, FormControl } from 'react-bootstrap'
import { GlobalContext } from '../../../../context/GlobalContext'
import Gonder from './Gonder'
import Delete from './Delete'
import Update from './Update'
import axios from 'axios'
import { apilink } from '../../../../utils/connectApi'
import Works from './Works'
import Info from './Info'


export function Listed() {
    const [search, setSearch] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showGonderModal, setShowGonderModal] = useState(false)
    const [showWorksModal, setShowWorksModal] = useState(false)
    const [getInfo, setGetInfo] = useState(false)
    const [modalData, setModalData] = useState([])
    const [activePaginetion, setActivePaginetion] = useState(1)
    const [showingData, setShowingData] = useState([])
    const [searchData, setSearchData] = useState([])

    const getInfoModalData = (result) => {
        setGetInfo(true)
        setModalData(result)

    }
    const getUpdateModalData = (result) => {
        setShowUpdateModal(true)
        setModalData(result)
    }
    const getDeleteModalData = (result) => {
        setShowDeleteModal(true)
        setModalData(result)

    }
    const getGonderModalData = (result) => {
        setShowGonderModal(true)
        setModalData(result)

    }
    const [currentData, setCurrentData] = useState([])

    const getWorksModalData = async (result) => {
        let hata = false
        try {
            const needData = 'employeeCode=' + result.code + "&action=worksList"
            await axios.post(apilink, needData).then(res => {
                const data = res.data.result
                if (Array.isArray(data)) {
                    data.sort((a, b) => {
                        if (a.workDate > b.workDate) return -1
                        if (a.workDate < b.workDate) return 1
                        return 0
                    })
                }
                setCurrentData(data)
            })
        } catch (error) {
            console.log(error)
            alert("Beklenmedik Durum")
            hata = true
        } finally {
            if (!hata) setShowWorksModal(true)

        }

    }


    const showPaginationData = (pageNumber) => {
        if (searchData != [] && searchData.length > 0) {
            setActivePaginetion(pageNumber)
            searchData.sort((a, b) => {
                if (a.firstName < b.firstName) return -1
                if (a.firstName > b.firstName) return 1
                return 0
            })
            const lastData = searchData.slice((pageNumber - 1) * 5, pageNumber * 5)
            setShowingData(lastData)
        }
    }
    useEffect(() => {
        showPaginationData(activePaginetion)
        if (!showDeleteModal && !showGonderModal && !showUpdateModal && !showWorksModal) {
            setModalData([])
        }

    }, [activePaginetion, searchData, searchData.length])
    useEffect(() => {
        const seacrhData = 'search=' + search + '&action=employeeSearch'
        axios.post(apilink, seacrhData).then(res => {
            const sd = res.data.result
            if (sd) {
                setSearchData(sd)
            }
        })
    }, [search, activePaginetion, showDeleteModal])
    const PaginationPage = () => {
        if (searchData != []) {
            let items = [];
            let page = Math.ceil(searchData.length / 5)
            for (let pageNumber = 1; pageNumber <= page; pageNumber++) {
                items.push(
                    <Pagination.Item key={pageNumber} active={pageNumber === activePaginetion} onClick={() => { showPaginationData(pageNumber) }}>
                        {pageNumber}
                    </Pagination.Item>
                );
            }
            return (
                <Pagination style={{ display: "flex", justifyContent: "center" }}>
                    {items}
                </Pagination>
            )
        }
    }
    window.onload = function () {
        showPaginationData(activePaginetion)
    }

    const todayNow = new Date().getFullYear()

    return (
        <div>
            <InputGroup  >
                <FormControl style={{ marginBottom: 25 }}
                    placeholder="Seacrh Personel"
                    aria-label="Seacrh Personel"
                    aria-describedby="basic-addon2"
                    onChange={value => { setSearch(value.target.value) }}
                />
                <Button variant="outline-secondary" id="button-addon2" style={{ marginBottom: 25 }}>
                    Search
                </Button>

            </InputGroup>
            <Table hover responsive>
                <thead >
                    <tr>
                        <th>#</th>
                        <th> <Button variant="light">Ad</Button> </th>
                        <th> <Button variant="light">Soyad</Button> </th>
                        <th> <Button variant="light">Telefon</Button> </th>
                        <th> <Button variant="light">Yaş</Button> </th>
                        <th>Tüm Bilgiler</th>
                        <th>Güncelle</th>
                        <th>Sil</th>
                        <th>Gönder</th>
                        <th>İş Durumu</th>
                    </tr>
                </thead>
                <tbody >
                    {

                        showingData.map((result, index) => {
                            return (
                                <tr key={index} >
                                    <td> {index + 1} </td>
                                    <td style={!result.tc || !result.iban ? { backgroundColor: "tomato", borderWidth: 1, borderColor: "black" } : null} > {result.firstName} </td>
                                    <td> {result.lastName} </td>
                                    <td> {result.phone} </td>
                                    <td> {todayNow - (result.Date[0] + result.Date[1] + result.Date[2] + result.Date[3])} </td>
                                    <td style={{ width: 1 }} > <Button variant='secondary' onClick={() => getInfoModalData(result)}>Bilgiler</Button> </td>
                                    <td style={{ width: 1 }} > <Button variant='success' onClick={() => getUpdateModalData(result)}>Güncelle</Button> </td>
                                    <td style={{ width: 1 }} > <Button variant='danger' onClick={() => getDeleteModalData(result)}>Sil</Button> </td>
                                    <td style={{ width: 1 }} > <Button variant='info' onClick={() => getGonderModalData(result)}>Gönder</Button> </td>
                                    <td style={{ width: 0.1 }} > <Button variant='warning' onClick={() => getWorksModalData(result)}>İşler</Button> </td>

                                </tr>
                            )
                        })
                    }

                </tbody>

            </Table>
            <PaginationPage />

            <Delete show={showDeleteModal} onHide={() => { setShowDeleteModal(false) }} result={modalData} />
            <Update show={showUpdateModal} onHide={() => { setShowUpdateModal(false) }} result={modalData} />
            <Gonder show={showGonderModal} onHide={() => { setShowGonderModal(false) }} result={modalData} />
            <Works show={showWorksModal} onHide={() => { setShowWorksModal(false) }} result={currentData} />
            <Info show={getInfo} onHide={() => { setGetInfo(false) }} result={modalData} />

        </div>
    )
}
