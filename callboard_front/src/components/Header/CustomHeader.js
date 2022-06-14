import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {
    Button,
    Dropdown
} from "rsuite";

import './HeaderStyle.css'
import LogModal from "../LoginModal/LogModal";
import {ReactComponent as Logo} from '../../misc/img/logo.svg';
import useAuth from "../../useAuthHook/useAuth";

export default function CustomHeader(props) {
    const [logModal, openLogModal] = useState(false)

    const {logout} = useAuth()

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    return (
        <div className={'root-style'}>
            <div className={'logo-style'} onClick={() => {
                navigate('/')
            }}>
                <div className={'logo'}><Logo style={{width: "3em"}}/></div>
                <h3 className={'logo-text'}>SalePlace</h3>
            </div>
            {
                token === null ? (
                    <div className={'style-no-auth'}>
                        <LogModal
                            open={logModal}
                            onClose={() => {
                                openLogModal(false)
                            }}
                        />
                        <Button appearance="primary" onClick={() => {
                            openLogModal(true)
                        }}>
                            Войти в систему!
                        </Button>
                    </div>
                ) : (
                    <div className={'style-auth'}>
                        <Dropdown title="Профиль" placement="bottomEnd">
                            {/*todo ДРУГОЙ МОДАЛ*/}
                            <Dropdown.Item onClick={() => {
                                openLogModal(true)
                            }}>Создать объявление</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                navigate('/alalal')
                            }}>Профиль пользователя</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                logout()
                            }}>Выйти</Dropdown.Item>
                        </Dropdown>
                    </div>
                )
            }
        </div>
    )
}