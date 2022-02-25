import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { GlobalContext } from "../../../../context/GlobalContext";

export default function SendCom(props) {
  const [invoiceFile, setInvoiceFile] = useState({})
  const { companyInvoice } = useContext(GlobalContext)
  async function handleInputInvoice(event) {
    const selectedFile = event.target.files[0];
    setInvoiceFile(selectedFile)
  }
  const sendInvoice = () => {
    try {
      companyInvoice(companyInvoice, props.result.companyCode)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "tomato", textAlign: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter" >
          Fatura Ekle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ margin: 15,borderWidth:2,borderRadius:29,borderColor:"tomato" }}>
          <label>Fatura Ekle</label> {'  '} <br />
          <input type="file" onChange={handleInputInvoice} style={{ margin: 15 }} /> <br />
          <Button onClick={() => sendInvoice()}> Fatura Ekle </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}