import React, {useState} from "react";
import {
    Header,
    Carousel,
    FlexboxGrid, Button
} from "rsuite";
import CustomHeader from "../../components/Header/CustomHeader";

import './AnnouncementPageStyle.css'
import LogModal from "../../components/LoginModal/LogModal";

export default function AnnouncementPage() {
    const [logModal, openLogModal] = useState(false)

    return (
        <div>
            <Header>
                <CustomHeader/>
            </Header>
            <FlexboxGrid className={'root-page'}>
                <LogModal
                    open={logModal}
                    onClose={() => {
                        openLogModal(false)
                    }}
                />
                <div className={'info-group'}>
                    <h3>
                        Заголовок
                    </h3>
                    <Carousel
                        shape={'bar'}
                        className="carousel"
                        autoplay={false}
                    >
                        <img className={'img-style'}
                             src="https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg"/>
                        <img className={'img-style'}
                             src="https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg"/>
                    </Carousel>
                    <h4>
                        {`Цена: ₽`}
                    </h4>
                    <h4>
                        Адрес
                    </h4>
                    <h5>
                        блаблаблаблабла
                    </h5>
                    <h4>
                        Описание:
                    </h4>
                    <h5>
                        блаблаблаблабла
                    </h5>
                </div>
                <div className={'user-group'}>
                    <div className={'user-group'}>
                        <h6 className={'log-text-style'}>Чтобы увидеть, кто разместил объявление</h6>
                        <Button appearance="link" onClick={() => {
                            openLogModal(true)
                        }}><b>Войдите в систему!</b></Button>
                    </div>
                </div>
            </FlexboxGrid>
        </div>
    )
}
