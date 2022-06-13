import React, {useEffect, useState} from "react";
import {
    Header,
} from "rsuite";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import './MainPageStyle.css'
import CustomHeader from "../../components/Header/CustomHeader";
import Card from "../../components/Card/Card";
import SearchLine from "../../components/SearchLine/SearchLine";
import {ActiveAuctions} from "../../api/announcement.api";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

export default function MainPage(){
    const [auctionList, setAuctionList] = useState([])

    useEffect(()=>{
        ActiveAuctions().then(res=>{
            setAuctionList(res.data)
        })
    }, [])

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
                        Активные аукционы
                    </h3>
                </div>
                <div className={'carousel-style'}>
                    <Carousel
                        responsive={responsive}
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        infinite={true}
                        autoPlay={false}
                        autoPlaySpeed={15000}
                        arrows={false}
                    >
                        {auctionList.map(data=>(
                            <div key={`${data.id}_1`}><Card cardType={1} label={data.title} price={data.price} isAuct={data.is_auction} isActive={!data.complated} photos={data.photos} id={data.id}/></div>
                        ))}
                    </Carousel>
                </div>
                <div className={'hr-style'}>
                    <hr/>
                </div>
            </div>
        </div>
    );
}