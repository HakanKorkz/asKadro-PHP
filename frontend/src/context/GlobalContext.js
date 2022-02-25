import React, { createContext, useEffect, useState } from "react";
import { apilink } from "../utils/connectApi";
import axios from "axios";
import { useCookies } from "react-cookie";


export const GlobalContext = createContext()

export const GlobalContextProvider = (props) => {
    const [reflesh, setReflesh] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [employeesData, setEmployeesData] = useState([])
    const [companiesData, setCompaniesData] = useState([])
    const [dataResult, setDataResult] = useState([])
    const [compAd, setCompAd] = useState()

    const [cookies] = useCookies(['user'])
    const { Employee, Company, Manager } = cookies
    //employee listeleme function
    const employeeListData = async () => {
        try {
            await axios.post(apilink, "action=employeeList").then(result => {
                setEmployeesData(result.data.result)
                console.log(employeesData)
            })
        } catch (error) {
            console.log(error)
        }
    }
    //company listeleme functions
    const companyListData = async () => {
        try {
            await axios.post(apilink, "action=companyList").then(result => {
                if (!result.data.result.error)
                    setCompaniesData(result.data.result)
                console.log(companiesData)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const reloadPage = () => {
        employeeListData()
        companyListData()
    }
    useEffect(() => {
        if (Employee || Company || Manager) reloadPage()
    }, [Employee, Company, Manager, reflesh])
    return (
        <GlobalContext.Provider
            value={{
                compAd,
                pageNumber,
                setPageNumber,
                employeesData,
                companiesData,
                dataResult,

                activeLogin: () => {
                    employeeListData()
                    companyListData()
                },

                //employe için gerekli fonksiyonlar


                employeeAddData: async (firstName, lastName, phone, date, adress, tc, iban, workType, email, password, hesCode, criminalRecordFile, socialSecurityFile) => {
                    try {
                        const data = new FormData();
                        data.append("firstname", firstName)
                        data.append("lastname", lastName)
                        data.append("phone", phone)
                        data.append("date", date)
                        data.append("address", adress)
                        data.append("tc", tc)
                        data.append("iban", iban)
                        data.append("workType", workType)
                        data.append("email", email)
                        data.append("password", password)
                        data.append("hesCode", hesCode)
                        data.append("criminalRecordFile", criminalRecordFile)
                        data.append("socialSecurityFile", socialSecurityFile)
                        data.append("action", 'employeeAdd')
                        await axios.post(apilink, data, {
                            headers: {
                                "content-type": "multipart/form-data"
                            }
                        }).then(res => {
                            setDataResult(res)
                        })
                        setReflesh(!reflesh)
                    } catch (error) {
                        console.log(error)
                    }
                },
                employeeDeleteData: async (employeeCode) => {
                    try {
                        const employeeDelete = "employeeCode=" + employeeCode + '&action=employeeDeleted'
                        await axios.post(apilink, employeeDelete).then(result => console.log(result))
                        setReflesh(!reflesh)
                    } catch (error) {
                        console.log(error)
                    }
                },
                employeeUpdate: async (firstName, lastName, phone, date, adress, tc, iban, workType, email, password, hesCode, criminalRecordFile, criminalRecordCode, socialSecurityFile, socialSecurityCode, employeeCode) => {
                    try {
                        // const employeeUpdate = 'firstname=' + firstName + '&lastname=' + lastName + '&phone=' + phone + '&date=' + date + '&address=' + adress + '&tc=' + tc + '&iban=' + iban + '&workType=' + workType + '&email=' + email + '&password=' + password + '&criminalRecordFile=' + criminalRecordFile + '&employeeCode=' + employeeCode + '&action=employeeUpdate'
                        // await axios.post(apilink, employeeUpdate).then(result => setDataResult(result.data.result))

                        const data = new FormData()
                        data.append("firstname", firstName)
                        data.append("lastname", lastName)
                        data.append("phone", phone)
                        data.append("date", date)
                        data.append("address", adress)
                        data.append("tc", tc)
                        data.append("iban", iban)
                        data.append("workType", workType)
                        data.append("email", email)
                        data.append("password", password)
                        data.append("hesCode", hesCode)
                        data.append("criminalRecordFile", criminalRecordFile)
                        data.append("criminalRecordCode", criminalRecordCode)
                        data.append("socialSecurityFile", socialSecurityFile)
                        data.append("socialSecurityCode", socialSecurityCode)
                        data.append("employeeCode", employeeCode)
                        data.append("action", 'employeeUpdate')
                        await axios.post(apilink, data, {
                            headers: {
                                "content-type": "multipart/form-data"
                            }
                        }).then(result => {
                            setDataResult(result.data.result)
                            setReflesh(!reflesh)
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                employeeSignin: async (email, password, confirmPassword) => {
                    const employeeSignin = 'email=' + email + '&password=' + password + '&confirmPassword=' + confirmPassword + '&action=employeeSingin'
                    await axios.post(employeeSignin).then(result => {
                        console.log(result)
                    })
                },
                //Compoany için gerekli functionlar
                companyAddData: async (companyName, email, password, phone, humanResourcesName, humanResourcesPhone, givePrice, location, mesai, servis, taxNumber, invoice) => {
                    try {
                        const companies = 'companyName=' + companyName + '&email=' + email + '&password=' + password + '&phone=' + phone + '&humanResourcesName=' + humanResourcesName + '&humanResourcesPhone=' + humanResourcesPhone + '&givePrice=' + givePrice + '&location=' + location + '&mesai=' + mesai + '&servis=' + servis + '&taxNumber=' + taxNumber + '&invoice=' + invoice + '&action=companyAdd'
                        await axios.post(apilink, companies).then(result => {
                            console.log(result.data)
                        })
                        setReflesh(!reflesh)
                    } catch (error) {
                        console.log(error)
                    }
                },
                companyDeleteData: async (companyCode) => {
                    try {
                        const companyDelete = "companyCode=" + companyCode + '&action=companyDeleted'
                        await axios.post(apilink, companyDelete)
                        setReflesh(!reflesh)
                    } catch (error) {
                        console.log(error)
                    }
                },
                companyUpdate: async (companyName, email, password, phone, humanResourcesName, humanResourcesPhone, givePrice, location, mesai, servis, taxNumber, invoice, companyCode) => {
                    try {
                        const companyUpdate = 'companyName=' + companyName + '&email=' + email + '&password=' + password + '&phone=' + phone + '&humanResourcesName=' + humanResourcesName + '&humanResourcesPhone=' + humanResourcesPhone + '&givePrice=' + givePrice + '&location=' + location + '&mesai=' + mesai + '&servis=' + servis + '&taxNumber=' + taxNumber + '&invoice=' + invoice + '&companyCode=' + companyCode + '&action=companyUpdated'

                        axios.post(apilink, companyUpdate)
                        setReflesh(!reflesh)
                    } catch (error) {
                        console.log(error)
                    }
                },
                companyInvoice: async (invoice, companyCode) => {
                    try {
                        const data = new FormData()
                        data.append("invoice", invoice)
                        data.append("companyCode", companyCode)
                        data.append("action", "companyInvoice")
                        await axios.post(apilink, data, {
                            header: {
                                "content-type": "multipart/form-data"
                            }
                        }).then(res => {
                            setDataResult(res.data)
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
            }}

        >
            {props.children}
        </GlobalContext.Provider>
    )
}
