import React, {useState} from "react";
import { Panel, Carousel } from 'rsuite';

import TimeRoundIcon from '@rsuite/icons/TimeRound';

import './CardStyle.css'

export default function Card(props){

    const ChartIcon = ({ color, size }) => (
        <TimeRoundIcon style={{ color, marginLeft: 5, marginTop: 5, fontSize: size }} />
    );

    return(
        <div onClick={()=>{console.log('Здарова чертила')}} className={'card-cursor'}>
            <Panel shaded bordered bodyFill className={'card-style non-touchable'} >
                <Carousel
                    shape={'bar'}
                    className="custom-slider"
                    autoplay={false}
                >
                    <img className={'non-drag-img'} src="https://via.placeholder.com/240x240" />
                    <img className={'non-drag-img'} src="https://via.placeholder.com/240x240" />
                    <img className={'non-drag-img'} src="https://via.placeholder.com/240x240" />
                    <img className={'non-drag-img'} src="https://via.placeholder.com/240x240" />
                </Carousel>
                <Panel>
                    <div className={'description'}>
                        <h4>{props.label}</h4>
                        <h4>{props.price} ₽</h4>
                    </div>
                    <div className={'auct-status'}>
                        <h5 >Аукцион активен</h5>
                        <ChartIcon size="1.3em" color="#5ea83e"/>
                    </div>
                </Panel>
            </Panel>
        </div>
    )
}