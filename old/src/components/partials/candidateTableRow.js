import CandidateTableLinkItem from './candidateTableLinkItem'
import CandidateTableItem from './candidateTableItem'
import axios from "axios";
import { UserContext } from "../../context/userContext";
import language from "../../properties/language";
import React, { useContext } from 'react';


const CandidateTableItemRow = ({ text, textOne, textTwo, data, candidateDeleted, button }) => {
    const context = useContext(UserContext);

    const confirmDelete = (email) => {
        // console.log(data)

        const callback = () => candidateDeleted(data)

        axios
            .post('/deleteCandidate', { deleteCandidateByEmail: email })
            .then(callback, callback);
    }

    return (
        <tr id="candidate" >
            <CandidateTableLinkItem textOne={textOne} textTwo={textTwo} pathname={'/Profile'} data={data} />
            <CandidateTableItem text={text} />
            <button onClick={() => confirmDelete(data)}>{language.deleteHolder[context.language]}</button>
        </tr >
    );
}


export default CandidateTableItemRow;