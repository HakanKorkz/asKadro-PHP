import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import PersonelAdd from "./homeComponents/PersonelAdd"
import CompanyAdd from "./homeComponents/CompanyAdd"
import PersonelList from "./homeComponents/personelList";
import CompanyList from "./homeComponents/CompanyList";

const Home = () => {
    const { pageNumber } = useContext(GlobalContext)
    return (
        <div className="body">
            {pageNumber === 1 ? <PersonelList /> : null}
            {pageNumber === 2 ? <PersonelAdd /> : null}
            {pageNumber === 3 ? <CompanyAdd /> : null}
            {pageNumber === 4 ? <CompanyList /> : null}

        </div>
    )
}

export default Home;
