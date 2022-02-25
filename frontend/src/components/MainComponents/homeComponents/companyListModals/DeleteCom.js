import { useContext, useEffect, useState } from "react";
import { Modal, Button ,Row} from "react-bootstrap";
import { GlobalContext } from "../../../../context/GlobalContext";


export default function DeleteCom(props) {
    const { companyDeleteData } = useContext(GlobalContext)
    const [data, setData] = useState("")
    useEffect(() => {
       setData(props.result.companyCode)
    }, [props.show])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Header closeButton style={{backgroundColor:"tomato"}}>
                <Modal.Title id="contained-modal-title-vcenter" style={{textAlign:"center"}}>
                    Güncelle
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{fontSize:24,textAlign:"center",marginTop:25}}>Silinecek Şirket : {props.result.companyName}</h4>
                <p style={{fontSize:17,textAlign:"center",marginTop:25,marginBottom:25}}><i>
                    {`Seçtiğiniz ${props.result.companyName} adlı şirket silinecektir. Onaylıyor musunuz ?`}
                    </i>
                </p>
                <Row  md={{ span: 4, offset: 5 }}>
                <Button onClick={() => { companyDeleteData(data) }}>
                    Şirketi Kaldır.
                </Button>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}