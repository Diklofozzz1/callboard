import React, {useState} from "react";
import {Button} from "rsuite";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import './MainPageStyle.css'
import LogModal from "../../components/LoginModal/LogModal";
import Card from "../../components/Card/Card";


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
    const [logModal, openLogModal] = useState(false)

    return (
        <div className={'root-page'}>
            <div className={'style'}>
                <LogModal
                    open={logModal}
                    onClose={()=>{openLogModal(false)}}
                />
                <Button color="yellow" appearance="primary" onClick={()=>{openLogModal(true)}}>
                    log
                </Button>
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
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                    <div><Card label={'Header'} price={'30000'}/></div>
                </Carousel>
            </div>
        </div>
    );
}