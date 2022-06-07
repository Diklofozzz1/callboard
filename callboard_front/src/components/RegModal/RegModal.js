import React, {useState} from "react";
import { Modal, Button, Form, Schema} from 'rsuite';
import { ReactComponent as Logo } from '../../misc/img/logo.svg';

import './RegModalStyle.css'

const {StringType} = Schema.Types

const model = Schema.Model({
    firstName: StringType().minLength(3, 'Необходимо минимум 3 символа')
        .isRequired('Обязательное поле'),
    last_name: StringType().minLength(3, 'Необходимо минимум 3 символа')
        .isRequired('Обязательное поле'),
    phone_number: StringType().isRequired('This field is required.')
        .minLength(9, 'Необходимо минимум 9 символов')
        .maxLength(12, 'Не более 12 символов'),
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.')
        .minLength(8, 'Необходимо минимум 8 символов'),
    verifiedPassword: StringType()
        .addRule((value, data)=>{
            return value === data.password;
        }, 'Пароли не совпадают')
})


function TextField(props) {
    const { name, label, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control errorPlacement={'bottomEnd'} name={name} {...rest} />
        </Form.Group>
    );
}

export default function RegModal(props){
    const [formValue, setFormValue] = useState({
        firstName: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        verifiedPassword: ''
    });

    return(
        <Modal className={'modal-root'} open={props.open} onClose={props.onClose} overflow={false} backdrop={"static"}>
            <Modal.Header className={'header-style'}>
                <Logo style={{width: "4em"}}/>
                <Modal.Title><b>Добро пожаловайть!</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form model={model} fluid onChange={setFormValue} formValue={formValue}>
                    <TextField name="firstName" label="Ваше имя" />
                    <TextField name="last_name" label="Ваша фамилия" />
                    <TextField name="phone_number" label="Ваш телефон" />
                    <TextField name="email" label="Ваша электронная почта" />
                    <TextField name="password" label="Пароль" />
                    <TextField name="verifiedPassword" label="Повторите пароль" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onClose} appearance="primary">
                    Зарегестрировать
                </Button>
                <Button onClick={props.onClose} appearance="subtle">
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    )
}