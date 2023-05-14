import "./Login.css";
import { useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { FiLock, FiUnlock } from 'react-icons/fi';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from 'react-bootstrap/Modal';
import Alert from "react-bootstrap/Alert";
import { debounce } from "../../Helpers/Utils";
import skull from '../../images/skull.png';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ADD_USER } from "../../Api/Mutations";
import { LOGIN } from "../../Api/Quieries";

interface AddUserInput {
    username: string;
    email: string;
    password: string;
}

interface Login {
    username: string;
    password: string;
}

function Login() {
    const navigate = useNavigate(); //navigate var
    // const [cookies, setCookie] = useCookies(['index', 'month', 'today', 'user', 'group']);
    const [lock, setLock] = useState(false); //controls lock view
    const [show, setShow] = useState(false); //show or close create account modal
    const [showAlert, setShowAlert] = useState(false); //toggles the login failure pop up
    const [showSuccess, setShowSuccess] = useState(false); //toggles the account created pop up
    const [disableButton, setDisableButton] = useState(false); //disables create account to prevent multiple PUT's
    const [errors, setErrors] = useState<any>([]); //holds error strings
    const [form, setForm] = useState<any>([]); //contains create account form entries in seperate objects
    const handleShow = () => setShow(true); //shows create account modal
    const toggleLock = () => setLock(!lock); //toggles the lock view
    const checkIdentityDebounced = debounce(500, checkIdentity);
    const [addUser, { data: addUserData, error: addUserError }] = useMutation(ADD_USER, {
        onCompleted: (addUserData) => {
            console.log(addUserData);
            setShowSuccess(true);
            setDisableButton(true);
        },
    });
    const [user, { loading: loginLoading, error: loginError, data: loginData }] = useLazyQuery(LOGIN, {
        onError: (loginError) => { setShowAlert(true); console.log(loginError)},
        onCompleted: (loginData) => {
                toggleLock();
                localStorage.setItem('token', loginData.user.token);
                setTimeout(() => { navigate("/") }, 3000);
        }
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/')
        }
    }, []);

    //closes create account modal
    function handleClose() {
        setShow(false)
        setForm([])
        setErrors([])
        setShowSuccess(false)
        setDisableButton(false)
    };

    //create an object that holds all form entries
    function setField(field: any, value: any) {
        setErrors([])
        setForm({ ...form, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: null });
    }

    //identifys form erros
    function findFormErrors() {
        let { email, username, password, confirm } = form;
        let strongPassword = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
        let newErrors = { ...errors };
        if (!email || email === "") newErrors.email = "This is a required field.";
        else if (!email.includes("@")) newErrors.email = "Please provide a valid E-mail address.";
        else if (email.length > 80) newErrors.email = "We do not support E-mails this long.";
        if (!username || username === "") newErrors.username = "This is a required field.";
        if (!password || password === "") newErrors.password = "This is a required field.";
        else if (!password.match(strongPassword)) newErrors.password = "Must be at least 8 characters, contain at least one uppercase, one lowercase, one digit, and one special character.";
        if (!confirm || confirm === "") newErrors.confirm = "This is a required field.";
        else if (confirm !== password) newErrors.confirm = "Please ensure your password and password confirmation match"
        return newErrors;
    }

    //function called when logging in
    function tryLogin(event: any) {
        event.preventDefault();
        event.stopPropagation();
        let usernameForm = event.target[0].value;
        let passwordForm = event.target[1].value;
        const input: Login = {
            username: usernameForm,
            password: passwordForm,
        };
        user({ variables: input })
    }

    function checkIdentity(email: any, username: any) {
        console.log(email, username)
        // api.doesThisExist(email, username)
        //     .then((existingIdentity) => {
        //         if (existingIdentity.email || existingIdentity.username) {
        //             setErrors({
        //                 ...errors,
        //                 email: existingIdentity.email ? 'That email address is already registered with us.' : errors.email,
        //                 username: existingIdentity.username ? 'That username already exists in our database, please choose another username.' : errors.username,
        //             });
        //             return;
        //         }
        //     });
    }

    //function called when attempting to create an account
    async function createAccount(event: any) {
        event.preventDefault();
        event.stopPropagation();
        const newErrors = findFormErrors();
        console.log(newErrors)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const input: AddUserInput = {
                username: form.username,
                email: form.email,
                password: form.password,
            };
            addUser({ variables: input })
        }
    }

    return (
        <div className='wrapper'>
            {/* title */}
            <h1>Death Walk</h1>
            {/* the lock */}
            {!lock ? <img src={skull} alt='' /> :
                <img src={skull} className="unlock" alt='' />
            }
            {/* login form */}
            <div className='loginForm'>
                <Form className="login" onSubmit={tryLogin}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridInitialUser">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridInitialPass">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                    </Row>
                    {/*toggles the login button and the alert pop up when login failure*/}
                    {showAlert ?
                        <div>
                            <div className="noLogin">
                                <h4>We could not find an account matching that username and password.</h4>
                                <p>Please try again, or create an account by pressing the "Create Account" button below.</p>
                                <button type="button" className="delete" onClick={() => setShowAlert(false)}>Got it!</button>
                            </div>
                        </div>
                        :
                        <button>
                            Login
                        </button>
                    }
                </Form>
                <p>or</p>
                {/* button to create an account */}
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
                                <Form.Control
                                    isInvalid={!!errors.email}
                                    value={form.email}
                                    type="emailish"
                                    onChange={(e) => {
                                        setField("email", e.target.value)
                                        checkIdentityDebounced(e.target.value, '')
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    isInvalid={!!errors.username}
                                    type="username"
                                    value={form.username}
                                    onChange={(e) => {
                                        setField("username", e.target.value)
                                        checkIdentityDebounced('', e.target.value)
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
            </div>
        </div>
    )
}

export default Login;
