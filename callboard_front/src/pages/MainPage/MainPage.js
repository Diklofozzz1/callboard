import React, {useState} from "react";
import {Button} from "rsuite";

import 'rsuite/dist/rsuite.min.css';
import './MainPageStyle.css'

export default function MainPage(){
    const [clicked, setClicked] = useState(false)

    const buttonChanger = () => {
        if(clicked){
            setClicked(false)
            return
        }
        setClicked(true)
    }

    return (
        <div className={'style'} onClick={buttonChanger}>
            <Button color="yellow" appearance="" loading={clicked}>
                Hello
            </Button>
        </div>
    );
}