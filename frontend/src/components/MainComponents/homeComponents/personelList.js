import React, {useState } from 'react'
import Delete from './personelListModals/Delete'
import Update from './personelListModals/Update'
import { Listed } from "./personelListModals/Listed"
const PersonelList = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showGonderModal, setShowGonderModal] = useState(false)
    const [modalData, setModalData] = useState([])


 
    return (
        <div>

            <Listed />

            <Delete show={showDeleteModal} onHide={() => { setShowDeleteModal(!showDeleteModal) }} result={modalData} />
            <Update show={showUpdateModal} onHide={() => { setShowUpdateModal(!showUpdateModal) }} result={modalData} />
            {/* <Gonder show={showGonderModal} onHide={() => { setShowGonderModal(!showGonderModal) }}/> */}

        </div>
    )
}
export default PersonelList