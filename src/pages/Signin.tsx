import Card from "../components/Card"
import TextBox from "../components/TextBox"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";

export default function Signin() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data : any) => console.log(data);

    const registerOptionEmail = {
        required: "Email is required",
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter a valid email',
        },
    };

    const registerOptionPassword = {
        required: "Password is required"
    };

  return (

    <div>
        <p className="text-2xl font-medium mb-4">SIGN IN</p>

        <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextBox type="text" name="email" register={register} registerOption={registerOptionEmail} error={errors.email} placeholder="Email" />
            <TextBox type="text" name="password" register={register} registerOption={registerOptionPassword} error={errors.password} placeholder="Password" />
            <Button name="LOGIN" marginTop="mt-[30px]" />
        </form>
            <div className="mt-[20px]">
                <p>Dont have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </Card>
    </div>
  )
}
