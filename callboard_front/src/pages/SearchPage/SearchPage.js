import React from "react";
import {Header} from "rsuite";
import CustomHeader from "../../components/Header/CustomHeader";
import SearchLine from "../../components/SearchLine/SearchLine";

import Card from "../../components/Card/Card";

import './SearchPage.css'

export default function SearchPage(){

    const descript = "Привет, это какое-то гобъявление, которое никому не упало, но мне нужно описание, поэтому ты описание."

    let data = '25/05/2022 13:44'

    return (
        <div className={'root-page'}>
            <Header>
                <CustomHeader/>
            </Header>
            <div >
                <h3 className={'text-style'}>
                    Поиск по доске объявлений
                </h3>
            </div>
            <div>
                <SearchLine/>
            </div>
            <div>
                <div className={'hr-style'}>
                    <hr/>
                </div>
                <div className={'hr-style'}>
                    <h3>
                        Результаты поиска
                    </h3>
                </div>
                <div><Card cardType={2} label='Видеокарта' price='20000' description={descript} photos={[]} creationData={data} isAuct={true} isActive={false}/></div>
                <div className={'hr-style'}>
                    <hr/>
                </div>
            </div>
        </div>
    );
}