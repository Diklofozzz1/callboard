import React, {useState} from "react";
import {
    Panel,
    Carousel,
    Button
} from 'rsuite';

import TimeRoundIcon from '@rsuite/icons/TimeRound';

import './CardStyle.css'

export default function Card(props) {

    const ChartIcon = ({color, size}) => (
        <TimeRoundIcon style={{color, marginLeft: 5, marginTop: 5, fontSize: size}}/>
    );

    return (
        <div key={props.id}  className={'card-cursor'}>
            <Panel shaded bordered bodyFill className={'card-style non-touchable'}>
                <Carousel
                    shape={'bar'}
                    className="custom-slider"
                    autoplay={false}
                >
                    {props.photos.length !== 0 ? props.photos.map((photo) => (
                                <img className={'non-drag-img'} src={photo.photo_url} key={photo.id}/>
                            )
                        )
                        : (<img className={'non-drag-img'} src="https://via.placeholder.com/240x240"/>)}
                </Carousel>
                <Panel>
                    <div className={'description'}>
                        <h4>{props.label}</h4>
                        <h4>{props.price} ₽</h4>
                    </div>
                    <div className={'description'}>
                        <div className={'auct-status'}>
                            <h6>Аукцион активен</h6>
                            <ChartIcon size="1.3em" color="#5ea83e"/>
                        </div>
                        <div>
                            <Button onClick={() => {console.log('Здарова чертила')}} appearance="ghost"><h6>Подробнее</h6></Button>
                        </div>
                    </div>
                </Panel>
            </Panel>
        </div>
    )
}