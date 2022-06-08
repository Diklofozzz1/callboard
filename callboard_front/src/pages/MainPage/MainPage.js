import React, {useState} from "react";
import {Button} from "rsuite";



import './MainPageStyle.css'
import LogModal from "../../components/LoginModal/LogModal";


export default function MainPage(){
    const [logModal, openLogModal] = useState(false)

    return (
        <div className={'style'}>
                <LogModal
                    open={logModal}
                    onClose={()=>{openLogModal(false)}}
                />
            <Button color="yellow" appearance="primary" onClick={()=>{openLogModal(true)}}>
                log
            </Button>
        </div>
    );
}