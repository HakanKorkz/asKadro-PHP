import React, { useContext, useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import { GlobalContext } from '../../context/GlobalContext'

const Test = () => {
    const {test,employeesData}= useContext(GlobalContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="email"
                    placeholder="name@example.com"
                    onChange={(value)=>setEmail(value.target.value)}
                />
                <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>
            <Form.Floating>
                <Form.Control
                    id="floatingPasswordCustom"
                    type="password"
                    placeholder="Password"
                    onChange={(value)=>setPassword(value.target.value)}
                />
                <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
            <Button onClick={()=>{test(email,password)}} > Gönder </Button>
        </div>
    )
}

export default Test
