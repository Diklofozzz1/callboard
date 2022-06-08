import React, {useState} from "react";
import {
    Modal,
    Button,
    Form,
    Schema,
    InputGroup,
} from 'rsuite';

import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import { ReactComponent as Logo } from '../../misc/img/logo.svg';

import './RegModalStyle.css'

const {StringType} = Schema.Types

const mask = /^(\+7|7|8)?[\s ]?\(?[489][0-9]{2}\)?[\s ]?[0-9]{3}[\s ]?[0-9]{2}[\s ]?[0-9]{2}$/;

const model = Schema.Model({
    firstName: StringType().minLength(3, 'Необходимо минимум 3 символа')
        .isRequired('Обязательное поле'),
    last_name: StringType().minLength(3, 'Необходимо минимум 3 символа')
        .isRequired('Обязательное поле'),
    phone_number: StringType().isRequired('Это необходимое поле!')
        .minLength(9, 'Необходимо минимум 9 символов')
        .maxLength(12, 'Не более 15 символов').pattern(mask, 'не корректно введен номер телефона! Маска 8 999 999 99 99'),
    email: StringType()
        .isEmail('Пожалуйста, введите почту правльно!.')
        .isRequired('Это необходимое поле!'),
    password: StringType().isRequired('Это необходимое поле!')
        .minLength(8, 'Необходимо минимум 8 символов'),
    verifiedPassword: StringType()
        .addRule((value, data)=>{
            return value === data.password;
        }, 'Пароли не совпадают')
})


function TextField(props) {
    const { name, label, accepter, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.Control placeholder={label} errorPlacement={'bottomEnd'} name={name} accepter={accepter} {...rest} />
        </Form.Group>
    );
}

function CustomTextField(props) {
    const { name, label, accepter, ...rest} = props;
    const [visible, setVisible] = React.useState(false);

    const handleChange = () => {
        setVisible(!visible);
    };

    return (
        <Form.Group controlId={`${name}-3`} >
            <InputGroup style={{width: "100%"}}>
                <Form.Control placeholder={label} errorPlacement={'bottomEnd'} name={name} type={visible ? 'text' : 'password'} accepter={accepter} {...rest} />
                <InputGroup.Addon onClick={handleChange}>
                    {visible ? <CheckIcon /> : <CloseIcon />}
                </InputGroup.Addon>
            </InputGroup>
        </Form.Group>
    );
}

export default function RegModal(props){
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        verifiedPassword: ''
    });

    const regAvailable = Object.keys(formError).length !== 0
        || formValue.first_name.length === 0
        || formValue.last_name.length === 0
        || formValue.phone_number.length === 0
        || formValue.email.length === 0
        || formValue.password.length === 0
        || formValue.verifiedPassword.length === 0


    return(
        <Modal className={'modal-root'} open={props.open} onClose={props.onClose} overflow={false} backdrop={"static"}>
            <Modal.Header className={'header-style'}>
                <Logo style={{width: "4em"}}/>
                <Modal.Title><b>Добро пожаловайть!</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form model={model} fluid onChange={setFormValue} formValue={formValue} onCheck={setFormError}>
                    <TextField name="first_name" label="Ваше имя" fieldError={formError} autoComplete="off"/>
                    <TextField name="last_name" label="Ваша фамилия" fieldError={formError} autoComplete="off"/>
                    <TextField name="phone_number" label="Ваш телефон" fieldError={formError} autoComplete="off"/>
                    <TextField name="email" label="Ваша электронная почта" fieldError={formError}/>
                    <CustomTextField name="password" label="Пароль" fieldError={formError} autoComplete="off"/>
                    <CustomTextField name="verifiedPassword" label="Повторите пароль" fieldError={formError} autoComplete="off"/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className={'header-style'}>
                    <Button onClick={props.onClose} appearance="primary" disabled={regAvailable}>
                        Зарегестрировать
                    </Button>
                    <Button onClick={props.onClose} appearance="subtle">
                        Отмена
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}