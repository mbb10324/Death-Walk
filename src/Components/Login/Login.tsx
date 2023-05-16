import CreateAccount from "../CreateAccount/CreateAccount";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, } from 'react';
import { LOGIN, TOKEN } from "../../Api/Quieries";
import skull from '../../images/skull.png';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Login.css";

interface LoginType {
    username: string;
    password: string;
}

function Login() {
    const navigate = useNavigate(); //navigate var
    const [showAlert, setShowAlert] = useState(false); //toggles the login failure pop up

    const [lock, setLock] = useState(false); //controls lock view
    const toggleLock = () => setLock(!lock); //toggles the lock view

    //check if user is already logged in
    /******************************************************************************/
    const storedToken = localStorage.getItem('token');
    const { data: tokenData } = useQuery(TOKEN, {
        variables: { value: storedToken || '' },  // Use a placeholder value when storedToken is null
        onCompleted: (tokenData) => {
            if (tokenData.token !== null) { navigate('/') }
        }
    });
    console.log(tokenData)

    //called when a user tries to login
    /**********************************************************************************************/
    const [login] = useLazyQuery(LOGIN, {
        onError: (loginError) => { setShowAlert(true); console.log(loginError) },
        onCompleted: (loginData) => {
            toggleLock();
            localStorage.setItem('token', loginData.login.token);
            localStorage.setItem('user', loginData.login.username);
            localStorage.setItem('email', loginData.login.email);
            localStorage.setItem('user_id', loginData.login.id);
            setTimeout(() => { navigate("/") }, 3000);
        }
    })

    function tryLogin(event: any) {
        event.preventDefault();
        event.stopPropagation();
        let usernameForm = event.target[0].value;
        let passwordForm = event.target[1].value;
        const input: LoginType = {
            username: usernameForm,
            password: passwordForm,
        };
        login({ variables: input })
    }

    /**********************************************************************************************/
    return (
        <div className='wrapper'>
            {/* title */}
            <h1>Death Walk</h1>
            {/* the lock */}
            {!lock ? <img src={skull} alt='' /> : <img src={skull} className="unlock" alt='' />}
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
                    {/* toggles the login button and the alert pop up when login failure */}
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
                {/* create account stuff */}
                <CreateAccount setShowAlert={setShowAlert} />
            </div>
        </div>
    )
}

export default Login;
