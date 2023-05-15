import { useLazyQuery, useMutation } from "@apollo/client";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { debounce, findFormErrors, isEmpty } from "../../Helpers/Utils";
import { IDENTITIES } from "../../Api/Quieries";
import { ADD_USER } from "../../Api/Mutations";
import { useState } from "react";

interface AddUserInput {
    username: string;
    email: string;
    password: string;
}

type Props = {
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateAccount(props: Props) {
    const { setShowAlert } = props //define props
    const [show, setShow] = useState(false); //show or close create account modal
    const [showSuccess, setShowSuccess] = useState(false); //toggles the account created pop up
    const [disableButton, setDisableButton] = useState(false); //disables create account to prevent multiple PUT's
    const [form, setForm] = useState<any>([]); //holds form input
    const [errors, setErrors] = useState<any>([]); //holds error strings

    //closes and opens the modal
    /**********************************************************************************************/
    function handleShow() { setShow(true); } 
    function handleClose() {
        setShow(false)
        setForm([])
        setErrors([])
        setShowSuccess(false)
        setDisableButton(false)
    };

    //check username and email identites as there typed
    /**********************************************************************************************/
    const [identities] = useLazyQuery(IDENTITIES, {
        onCompleted: (identityData) => {
            if (identityData.identities.email || identityData.identities.username) {
                setErrors({
                    ...errors,
                    email: identityData.identities.email ? 'That email address is already registered with us.' : errors.email,
                    username: identityData.identities.username ? 'That username already exists in our database, please choose another username.' : errors.username,
                });
                return;
            }
        }
    })

    const checkUsernameIdentityDebounced = debounce(500, checkUsernameIdentity);
    const checkEmailIdentityDebounced = debounce(500, checkEmailIdentity);

    function checkUsernameIdentity(username: any) {
        let email = ''
        identities({ variables: { username, email } })
    }

    function checkEmailIdentity(email: any) {
        let username = ''
        identities({ variables: { username, email } })
    }

    //called when a user tries to create an account
    /**********************************************************************************************/
    const [addUser] = useMutation(ADD_USER, {
        onCompleted: (addUserData) => {
            if (addUserData) {
                setShowSuccess(true);
                setDisableButton(true);
            }
        },
    });

    function setField(field: any, value: any) {
        setForm({ ...form, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: null });
    }

    async function createAccount(event: any) {
        event.preventDefault();
        event.stopPropagation();
        const newErrors = findFormErrors(form, errors);
        const noErrors = isEmpty(newErrors)
        if (noErrors) {
            const input: AddUserInput = {
                username: form.username,
                email: form.email,
                password: form.password,
            };
            addUser({ variables: input })
        } else {
            setErrors(newErrors);
        }
    }

    /**********************************************************************************************/
    return (
        <>
            <button className='createAct' onClick={() => { handleShow(); setShowAlert(false) }}>
                Create Account
            </button>
            {/* pop up modal to create an account */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                contentClassName={"createaccountModal"}
            >
                <Form onSubmit={createAccount}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control isInvalid={!!errors.email} value={form.email} type="emailish"
                                onChange={(e) => {
                                    setField("email", e.target.value)
                                    checkEmailIdentityDebounced(e.target.value)
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control isInvalid={!!errors.username} type="username" value={form.username}
                                onChange={(e) => {
                                    setField("username", e.target.value)
                                    checkUsernameIdentityDebounced(e.target.value)
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={form.password} isInvalid={!!errors.password} type="password" onChange={(e) => setField("password", e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control value={form.confirm} isInvalid={!!errors.confirm} type="password" onChange={(e) => setField("confirm", e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirm}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {showSuccess ? <p>Account created, please close this window and login!</p>
                        : ""}
                    <button type="button" className='closeIt' onClick={handleClose}>
                        Close
                    </button>
                    <button disabled={disableButton} className='createIt' type='submit'>
                        Create Account
                    </button>
                </Form>
            </Modal>
        </>
    )
}