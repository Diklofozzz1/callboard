import React, {useState, useEffect} from "react";
import {
    Header,
    InputPicker,
    Loader
} from "rsuite";
import CustomHeader from "../../components/Header/CustomHeader";
import SearchLine from "../../components/SearchLine/SearchLine";

import Card from "../../components/Card/Card";

import './SearchPage.css'
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {Search} from "../../api/announcement.api";


export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [announcementList, setAnnouncementList] = useState([])
    const [uploading, setUploading] = useState(false)

    let today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const navigate = useNavigate()
    const redirectHandle = () => {
        navigate({
            pathname: '/search',
            search: `?${createSearchParams(searchParams)}`,
        })
    }


    useEffect(() => {
        setUploading(true)
        Search({
            search: searchParams.get('search'),
            category: searchParams.get('category') === 'true',
            price: searchParams.get('price'),
            date: searchParams.get('date'),
            type: searchParams.get('type'),
            count: 100,
        }).then(res => {
            setAnnouncementList(res.data.data)
            setUploading(false)
        }).catch((err) => {
            if (err.response.status === 404) {
                console.log('No result')
                setUploading(false)
            }
        })
    }, [searchParams])

    const priceData = [{
        "label": "Сначала дорогие",
        "value": "h",
    },
        {
            "label": "Сначала не дорогие",
            "value": "l",
        },
    ]

    const dateData = [{
        "label": "Сначала новые",
        "value": "h",
    },
        {
            "label": "Сначала старые",
            "value": "l",
        },
    ]

    const typeData = [{
        "label": "Аукцион",
        "value": 'true',
    },
        {
            "label": "Объявление",
            "value": 'false',
        },
    ]

    return (
        <div className={'root-page'}>
            <Header>
                <CustomHeader/>
            </Header>
            <div>
                <div className={'hr-style'}>
                    <hr/>
                </div>
                <div className={'hr-style'}>
                    <h3>
                        Результаты поиска
                    </h3>
                </div>
                <div className={'sort-style'}>
                    <h5 className={'sort-text-style'}>
                        Сортировать по
                    </h5>
                    <InputPicker className={'drop-picker'} placeholder="Цена" data={priceData}
                                 onSelect={(value, item) => {
                                     searchParams.set('price', value);
                                     setSearchParams(searchParams);
                                     setAnnouncementList([]);
                                     redirectHandle()
                                 }}/>
                    <InputPicker className={'drop-picker'} placeholder="Дата" data={dateData}
                                 onSelect={(value, item) => {
                                     searchParams.set('date', value);
                                     setSearchParams(searchParams);
                                     setAnnouncementList([]);
                                     redirectHandle()
                                 }}/>
                    <InputPicker className={'drop-picker'} placeholder="Категория" data={typeData}
                                 onSelect={(value, item) => {
                                     searchParams.set('type', value);
                                     setSearchParams(searchParams);
                                     setAnnouncementList([]);
                                     redirectHandle()
                                 }}/>
                </div>
                {announcementList.length !== 0 ? (
                    <div>
                        {uploading === false ? (<div>{announcementList.map(data => (
                                <Card cardType={2} label={data.title} price={data.price} description={data.description}
                                      photos={data.photos} creationData={data.createdAt} isAuct={data.is_auction}
                                      isActive={!data.complated}/>
                            )
                        )
                        }</div>) : (<Loader size="lg" content="Large" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '10px'
                        }}/>)}
                    </div>
                ) : (
                    <div>
                        {uploading === false ? (
                            <h3 className={'text-style'}
                                style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
                                Нет совпадений
                            </h3>
                        ) : (<Loader size="lg" content="Large"
                                     style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}/>)}
                    </div>
                )}

                <div className={'hr-style'}>
                    <hr/>
                </div>
            </div>
        </div>
    );
}