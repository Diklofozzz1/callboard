import React, {useEffect, useState} from "react";
import {
    createSearchParams,
    useNavigate
} from 'react-router-dom';
import {
    InputGroup,
    AutoComplete,
    InputPicker
} from "rsuite";

import './SearchLineStyle.css'

import SearchIcon from '@rsuite/icons/Search'
import {Search} from "../../api/announcement.api";

export default function SearchLine() {
    const [input, setInput] = useState('')
    const [searchData, setSearchData] = useState([])
    let [params, setParams] = useState({})

    const navigate = useNavigate()

    const redirectHandle = () => {
        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`,
        })
    }

    useEffect(() => {
        if (input.length % 3 === 0) {
            Search({search: input, count: 1}).then(res => {
                    setSearchData(res.data.data.map(data => (
                            {
                                label: data.title,
                                valueKey: data.id,
                                value: data.title
                            })
                        )
                    )
                }
            ).catch((err) => {
                if (err.response.status === 404) {
                    //-----------rfr
                }
            })
        }
    }, [input])

    const data = [{
        "label": "a",
        "value": "a",
    },
        {
            "label": "b",
            "value": "b",
        },
        {
            "label": "c",
            "value": "c",
        },
        {
            "label": "d",
            "value": "d",
        },
    ]

    return (
        <div className={'root'}>
            <InputGroup>
                <div className={'input-style'}>
                    <InputPicker placeholder="Категория" data={data} onSelect={(value, item) => {
                        setParams({...params, category: item.value})
                    }}/>
                </div>
                <AutoComplete data={searchData} onChange={setInput} onSelect={(value, item) => {
                    setParams({...params, search: item.label})
                }}/>
                <InputGroup.Button onClick={redirectHandle}>
                    <SearchIcon/>
                </InputGroup.Button>
            </InputGroup>
        </div>
    )
}