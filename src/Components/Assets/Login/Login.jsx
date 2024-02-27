import { useRef, useState, useEffect, useContext} from 'react';


// import axios from '../../../api/axios'
import AuthContext from '../../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const LOGIN_URL = '/auth';

const Login = () => {
    
    const { setAuth } = useContext(AuthContext)
    
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [Success, setSuccess] = useState(false);


    // useEffect(() => {
    //     useRef.current.focus()
    // }, []

    useEffect(() => {
        setErrMsg('')

    }, [user, pwd])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9800/login",
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    // / withCredentials: "include",
                credentials:"include",
                    body: JSON.stringify({
                        "useremail": user,
                        "password": pwd,
                    }),
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            console.log(accessToken)
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            
            if (response.status===200) {
                // setSuccess(true);
                const d=await response.json()
                console.log("data",d)
                // alert(d.role)
                if (d.role===1){
                    navigate('/students')

                }
               else if (d.role===2){
                    navigate('/teachers')

                }
                else if (d.role===3){
                    navigate('/principle')

                }
            }
        } catch (err) {
            console.log("failed login")
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
        }
    }
    //    if(!errMsg){
    //      return  <Navigate to="/home" /> 

    //    }
    return (
        <>
            {Success ? (
                <h1>you are logged in </h1>) :
                (
                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">

                        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                            {errMsg && <p ref={errRef} style={{ backgroundColor: "red" }} aria-live="assertive">{errMsg}</p>}
                            <h2 className="text-2xl font-semibold justify-center text-center text-black mb-6">
                                Welcome to the Login Page
                            </h2>


                            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-black dark:text-white border-black focus:border-black"
                                    >

                                    </label>
                                    <div className='text-black '>Email</div>
                                    <input
                                        type="email"
                                        id="email"
                                        className="input-style "
                                        placeholder="email@gmail.com"
                                        
                                        required=""
                                        onChange={(e) => { setUser(e.target.value) }}
                                        value={user}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label

                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-black-900 dark:text-white"

                                    >
                                    </label>
                                    <div className='text-black'>Password</div>
                                    <input
                                        type="password"
                                        id="password"
                                        className="input-style "
                                        placeholder="pqssw@123"
                                        required=""
                                        onChange={(e) => { setPwd(e.target.value) }}
                                        value={pwd}


                                    />

                                </div>
                                <div className="flex items-start mb-5">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            defaultValue=""
                                            className="checkbox-style"
                                            required=""
                                        />
                                    </div>
                                    <label
                                        htmlFor="remember"
                                        className="ms-2 text-sm font-medium text-black-900 dark:textblack-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="button-style bg-cyan-900 rounded-xl p-2"
                                >
                                    Submit
                                </button>
                            </form>

                        </div>
                    </div>
                )}
        </>
    );
};

export default Login;
