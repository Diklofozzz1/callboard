import React, {useState} from "react";
import {
    Modal,
    Button,
    Form,
    Schema,
    InputGroup,
    Message,
    useToaster
} from 'rsuite';

import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import './LogModalStyle.css'

import {Login} from "../../api/auth/auth.services";
import RegModal from "../../components/RegModal/RegModal";
import { ReactComponent as Logo } from '../../misc/img/logo.svg';
import useAuth from "../../useAuthHook/useAuth";

const {StringType} = Schema.Types

const model = Schema.Model({
    email: StringType()
        .isEmail('Пожалуйста, введите почту правльно!')
        .isRequired('Это необходимое поле!'),
    password: StringType().isRequired('Это необходимое поле!')
        .minLength(8, 'Необходимо минимум 8 символов')
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

export default function LogModal(props){
    const [regModal, openRegModal] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formError, setFormError] = useState({})
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    const logInAvailable = Object.keys(formError).length !== 0
        || formValue.email.length === 0
        || formValue.password.length === 0


    const messageHandler = (message, type) => (
        <Message showIcon type={type} closable={true} duration={3000}>
            {message}
        </Message>
    )

    const toaster = useToaster()

    const token = localStorage.getItem('token')
    const checkAuth = () => {
        if (token !== null){
            toaster.push(messageHandler('Вы уже вошли в систему!', 'warning'))
            return
        }
        props.onClose(true)
        toaster.remove()
        openRegModal(true)
    }

    const {login} = useAuth()

    const loginHandler = async () => {
        setUploading(true)
        login(formValue).then(res=>{
            if(res){
                toaster.push(messageHandler('Вы вошли в систему!', 'success'))
                setUploading(false)
                props.onClose(true)
            }

        }).catch((err) => {
            if(err === 404){
                toaster.push(messageHandler('Мы не смогли найти такого пользователя!', 'warning'))
                setUploading(false)
                return
            }
            if(err === 401){
                toaster.push(messageHandler('Вы ввели не верные данные!', 'warning'))
                setUploading(false)
                return
            }
            toaster.push(messageHandler('Мы не можем установить соединение с сервером!', 'error'))
            setUploading(false)
        })
    }

    return(
        <div>
            <RegModal
                open={regModal}
                onClose={()=>{openRegModal(false)}}
            />
            <Modal className={'modal-root'} open={props.open} onClose={()=>{props.onClose(); toaster.remove()}} overflow={false} backdrop={"static"}>
                <Modal.Header className={'header-style'}>
                    <Logo style={{width: "4em"}}/>
                    <Modal.Title><b>Добро пожаловать!</b></Modal.Title>
                    <Modal.Title><b>Вход</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form model={model} fluid onChange={setFormValue} formValue={formValue} onCheck={setFormError}>
                        <TextField name="email" label="Ваша электронная почта" />
                        <CustomTextField name="password" label="Пароль"  autoComplete="off"/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className={'header-style'}>
                        <Button onClick={loginHandler} appearance="primary" disabled={logInAvailable} loading={uploading}>
                            Войти
                        </Button>
                        <Button onClick={()=>{props.onClose(); toaster.remove()}} appearance="subtle">
                            Отмена
                        </Button>
                    </div>
                    <hr/>
                    <div className={'reg-link'}>
                        <Modal.Title className={'header-style'}><b>Еще не зарегестрированы?</b></Modal.Title>
                        <Button appearance="link" onClick={checkAuth}><b>Тогда присоединяйтесь!</b></Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}