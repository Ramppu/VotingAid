import Axios from 'axios';
import { endpoint, url } from '../api';

const FilterCandidateTable = (setStateArray, filter) => {
    console.log('yhde kandin poisto ilamn, että page refresh')
    Axios.post(url + endpoint.filteredCandidates, { data: filter })
        .then(res => {
            console.log(res)
            let q = [];
            for (var i = 0; i < res.data.length; i++) {
                setStateArray(['Candidate' + i], res.data[i])
                q.push(res.data[i].name);
                setStateArray('amount', q);
            }
        })
}

const SetCandidateTable = (setStateArray) => {
    console.log('alustava yhde kandin poisto ilman, että page refresh testausta varten')
    // korjaa tämä, onko mahdollista poistaa ilman, että se päivittää koko sivun uusiksi
    Axios.get(url)
        .then(res => {
            let q = [];
            let s = [];
            for (var i = 0; i < res.data.length; i++) {
                setStateArray(['Candidate' + i], res.data[i])
                q.push(res.data[i].name);
                setStateArray('amount', q);
                s.push(res.data[i].studentAssociation);

            }
            const uniqueAssociations = Array.from(new Set(s));
            setStateArray('Association', uniqueAssociations);
        });
}

export {
    SetCandidateTable,
    FilterCandidateTable,
};