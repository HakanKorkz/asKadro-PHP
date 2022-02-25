import React, { useContext } from "react";
import { Modal, Button, ListGroup, Spinner } from "react-bootstrap";
import { GlobalContext } from "../../../context/GlobalContext";


export function DataModal(props) {
  const { dataResult } = useContext(GlobalContext)
  setTimeout(
    props.onHideData,
    props.setDeleteData(true)
    , 4000);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ background: 'grey', display: "flex", justifyContent: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Personel Ekleme Sonucu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Personel Ekleme Sonucu</h4>
        <ListGroup>
          <ListGroup.Item>
            {dataResult != [] ?
              (
                dataResult.data ?
                  (dataResult.data.result === true ?
                    "Başarılı Ekleme"
                    :
                    "Hele Bi Göz Gezdir.")
                  :
                  <Spinner animation="border" variant="warning" />
              ) : <Spinner animation="border" variant="warning" />
            }
          </ListGroup.Item>

        </ListGroup>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHideData}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}