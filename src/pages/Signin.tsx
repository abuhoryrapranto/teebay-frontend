import { useState, useContext } from "react"
import axios from "axios"
import Card from "../components/Card"
import TextBox from "../components/TextBox"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import Alert from "../components/Alert"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'

type FormData = {
    email: string,
    password: string
    
}

export default function Signin() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [backendErrors, setBackendErrors] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('')

    const { login } =  useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async (data : FormData) => {
        axios.post('http://127.0.0.1:8000/api/v1/auth/login', data)
            .then(res => {
                if(res.status === 200) {
                    const token = res.data.data.token;
                    if(token) {
                        login(token);
                        navigate('/products');
                    }
                    
                }
            })
            .catch(err => {
                if(err.response.data.errors) {

                    setBackendErrors(err.response.data.errors);

                } else {
                    setError(true);
                    setAlertMessage(err.response.data.message)
                }
            })
    }

    const validation = {

        email: {
            required: "Email is required",
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
            },
        },

        password: {
            required: "Password is required"
        }

    };

  return (

    <div className="flex items-center h-screen">
        <div className="mx-auto">
        <p className="text-2xl font-medium mb-4">SIGN IN</p>

        <Card>
            {
                error && <Alert type="error" message={alertMessage} />
                
            }
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextBox type="text" name="email" register={register} registerOption={validation.email} error={errors.email} backendError={backendErrors?.email} width="w-80" marginBottom="mb-8" placeholder="Email" />
            <TextBox type="password" name="password" register={register} registerOption={validation.password} error={errors.password} backendError={backendErrors?.password} width="w-80" placeholder="Password" />
            <div>
                <br />
            <Button name="LOGIN" type="submit" marginTop="mt-[30px]" />
            </div>
        </form>
            <div className="mt-[20px]">
                <p>Dont have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </Card>
        </div>
    </div>
  )
}
