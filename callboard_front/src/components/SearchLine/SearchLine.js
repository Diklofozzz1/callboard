import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {
    InputGroup,
    AutoComplete,
    InputPicker
} from "rsuite";

import './SearchLineStyle.css'

import SearchIcon from '@rsuite/icons/Search'
import {Search} from "../../api/announcement.api";

export default function SearchLine(){
    const [input, setInput] = useState('')
    const [searchData, setSearchData] = useState([])

    useEffect(()=>{
        if(input.length % 3 === 0){
            Search({search: input, count: 1}).then(res=>{
                    setSearchData(res.data.data.map(data=>(
                            {
                                label: data.title,
                                value: data.id
                            })
                        )
                    )
                }
            ).catch((err)=>{
                if(err.response.status === 404){
                    //-----------rfr
                }
            })
        }
    },[input])

    const navigate = useNavigate()

    const data=[{
        "label": "a",
        "value": "Eugenia",
        },
        {
            "label": "b",
            "value": "Eugenia",
        },
        {
            "label": "c",
            "value": "Eugenia",
        },
        {
            "label": "d",
            "value": "Eugenia",
        },
    ]

    return(
        <div className={'root'}>
            <InputGroup>
                <div className={'input-style'}>
                    <InputPicker placeholder="Категория" data={data}/>
                </div>
                <AutoComplete data={searchData} onChange={setInput}/>
                <InputGroup.Button onClick={()=>{navigate('/search')}}>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
        </div>
    )
}