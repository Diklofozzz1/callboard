import React, {useState} from "react";
import {Button} from "rsuite";



import './MainPageStyle.css'
import RegModal from "../../components/RegModal/RegModal";

export default function MainPage(){
    const [regModal, openRegModal] = useState(false)

    return (
        <div className={'style'}>
                <RegModal
                    open={regModal}
                    onClose={()=>{openRegModal(false)}}
                />
            <Button color="yellow" appearance="primary" onClick={()=>{openRegModal(true)}}>
                Reg
            </Button>
        </div>
    );
}