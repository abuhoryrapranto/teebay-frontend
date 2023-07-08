import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../components/Card";
import TextBox from "../components/TextBox"
import Button from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

type FormData = {
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string
    
}
export default function Signup() {

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const [backendErrors, setBackendErrors] = useState<any>(null);
    const [success, setSuccess] = useState<boolean>(false);

    //const onSubmit = (data : any) => console.log(data);
    const onSubmit = async (data : FormData) => {
        axios.post('http://127.0.0.1:8000/api/v1/auth/register', data)
            .then(res => {
                if(res.status === 201) {
                    reset();
                    setBackendErrors(null);
                    setSuccess(true);
                }
            })
            .catch(err => {
                if(err.response.data.errors) {
                    setBackendErrors(err.response.data.errors);
                }
            })
            console.log(backendErrors);
    }

    const validation = {
        firstName : {
            required: "First name is required"
        },
        lastName : {
            required: "Last name is required"
        },
        address : {
            required: "Address is required"
        },
        email : {
            required: "Email is required",
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
            },
        },
        phone : {
            required: "Phone is required",
            pattern: {
                value: /^(\+88|88)?01(?:(?!2)[1-9])\d{8}$/,
                message: 'Please enter a valid phone number',
            },
        },
        password : {
            required: "Password is required",
            pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: 'Please enter a password with combination of uppercase, lowercase, number, symbol',
            },
        },
        password_confirmation : {
            required: "Confirm password is required",
            validate: (val: string) => {
                if (watch('password') != val) {
                  return "Your passwords do no match";
                }
              }
        }
    }

  return (

    <div>
        <p className="text-2xl font-medium mb-4">SIGN UP</p>
    
        <Card>
            {
                success && <Alert message="Successfully Signup" />
                
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 md:grid-cols-2">
                    <TextBox type="text" name="first_name" register={register} registerOption={validation.firstName} error={errors.first_name} width="w-80" marginBottom="mb-8" placeholder="First Name" />
                    <TextBox type="text" name="last_name" register={register} error={errors.last_name} registerOption={validation.lastName} width="w-80" marginBottom="mb-8" placeholder="Last Name" />
                </div>

                <TextBox type="text" name="address" register={register} registerOption={validation.address} error={errors.address}  placeholder="Address" />

                <div className="grid gap-6 md:grid-cols-2 mt-[35px]">
                    <TextBox type="text" name="email" register={register} error={errors.email} registerOption={validation.email} backendError={backendErrors?.email} width="w-80" marginBottom="mb-8" placeholder="Email" />
                    <TextBox type="text" name="phone" register={register} error={errors.phone} registerOption={validation.phone} backendError={backendErrors?.phone} width="w-80" marginBottom="mb-8" placeholder="Phone Number" />
                </div>

                <TextBox type="password" name="password" register={register} error={errors.password} registerOption={validation.password} marginBottom="mb-8" placeholder="Password" />
                <TextBox type="password" name="password_confirmation" register={register} error={errors.password_confirmation} registerOption={validation.password_confirmation}  placeholder="Confirm Password" />

                <Button name="LOGIN" type="submit" marginTop="mt-[30px]" />
            </form>

            <div className="mt-[20px]">
                <p>Already have an account? <Link to="/">Sign In</Link></p>
            </div>

        </Card>
    </div>
  )
}
