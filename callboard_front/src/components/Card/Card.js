import React, {useState} from "react";
import {
    Panel,
    Carousel,
    Button,
    FlexboxGrid, Modal
} from 'rsuite';

import TimeRoundIcon from '@rsuite/icons/TimeRound';

import './CardStyle.css'
import useAuth from "../../useAuthHook/useAuth";
import LogModal from "../LoginModal/LogModal";

export default function Card(props) {
    const [logModal, openLogModal] = useState(false)
    const {user} = useAuth()

    const ChartIcon = ({color, size}) => (
        <TimeRoundIcon style={{color, marginLeft: 5, marginTop: 5, fontSize: size}}/>
    );

    return (
        <div style={props.cardType === 2 ? {display: 'flex', justifyContent: 'center'} : {}}>
            {props.cardType === 1 ? (
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
                                    {props.isAuct === true ? (
                                        <div>
                                            {props.isActive === true ? (
                                                <div className={'auct-status'}>
                                                    <h6>Аукцион активен</h6>
                                                    <div className={'status-icon'}>
                                                        <ChartIcon size="1.3em" color="#5ea83e" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={'auct-status'}>
                                                    <h6>Аукцион не активен</h6>
                                                    <div className={'status-icon'}>
                                                        <ChartIcon size="1.3em" color="#93aeba" />
                                                    </div>
                                                </div>
                                            ) }
                                        </div>
                                    ) : (
                                        <h6>Объявление</h6>
                                        )
                                    }
                                <div>
                                    <Button onClick={() => {console.log('Здарова чертила')}} appearance="ghost"><h6>Подробнее</h6></Button>
                                </div>
                            </div>
                        </Panel>
                    </Panel>
                </div>
            ) : (
                <Panel key={props.id} shaded bodyFill bordered className={'card2'}>
                    <LogModal
                        open={logModal}
                        onClose={()=>{openLogModal(false)}}
                    />
                    <FlexboxGrid className={'flex-position'}>
                        <Carousel
                            shape={'bar'}
                            className={'carousel-size'}
                            autoplay={false}
                        >
                            {props.photos.length !== 0 ? props.photos.map((photo) => (
                                        <img className={'non-drag-img'} src={photo.photo_url} key={photo.id}/>
                                    )
                                )
                                : (<img className={'non-drag-img'} src="https://via.placeholder.com/240x240"/>)}
                        </Carousel>
                        <div className={'space-between-blocks'}>
                            <div className={'info-root'}>
                                <h4>{props.label}</h4>
                                <h4>{props.price} ₽</h4>
                                <div >
                                    {props.isAuct === true ? (
                                        <div>
                                            {props.isActive === true ? (
                                                <div className={'auct-status'}>
                                                    <h6>Аукцион активен</h6>
                                                    <div className={'status-icon'}>
                                                        <ChartIcon size="1.3em" color="#5ea83e" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={'auct-status'}>
                                                    <h6>Аукцион не активен</h6>
                                                    <div className={'status-icon'}>
                                                        <ChartIcon size="1.3em" color="#93aeba" />
                                                    </div>
                                                </div>
                                            ) }
                                        </div>
                                    ) : (
                                        <h6>Объявление</h6>
                                    )
                                    }
                                </div >
                                <h6 className={'description2'}>
                                    {props.description}
                                </h6>
                            </div>

                            <div className={'button-date-group'}>
                                <div className={'date-position'}>
                                    <h6>
                                        {props.creationData}
                                    </h6>
                                </div>
                                <div >
                                    <Button onClick={() => {console.log('Здарова чертила')}} appearance="ghost"><h6>Подробнее</h6></Button>
                                </div>
                            </div>
                        </div>

                        <div className={'author-root'}>
                            {user !== undefined ? (<h6>hi</h6>) : (
                                <div className={'log-link'}>
                                    <h6 className={'log-text-style'}>Чтобы увидеть, кто разместил объявление</h6>
                                    <Button appearance="link" onClick={()=>{openLogModal(true)}}><b>Войдите в систему!</b></Button>
                                </div>
                            )}
                        </div>
                    </FlexboxGrid>
                </Panel>
            )}
        </div>
    )
}