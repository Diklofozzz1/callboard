import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {
    InputGroup,
    Input,
    InputPicker
} from "rsuite";

import './SearchLineStyle.css'

import SearchIcon from '@rsuite/icons/Search'

export default function SearchLine(){

    const navigate = useNavigate()

    const data=[{
        "label": "Eugenia",
        "value": "Eugenia",
        },
        {
            "label": "Eugenia",
            "value": "Eugenia",
        },
        {
            "label": "Eugenia",
            "value": "Eugenia",
        },
        {
            "label": "Eugenia",
            "value": "Eugenia",
        },
    ]

    return(
        <div className={'root'}>
            <InputGroup>
                <div className={'input-style'}>
                    <InputPicker placeholder="Категория" data={data}/>
                </div>
                <Input />
                <InputGroup.Button onClick={()=>{navigate('/search')}}>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
        </div>
    )
}