import { useForm } from "react-hook-form";
import Card from "../components/Card";
import TextBox from "../components/TextBox"
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Signup() {

    const { register, formState: { errors } } = useForm();

  return (

    <div>
        <p className="text-2xl font-medium mb-4">SIGN UP</p>
    
        <Card>
            <div className="grid gap-6 md:grid-cols-2">
                <TextBox type="text" name="first_name" register={register} error={errors.first_name} width="w-80" marginBottom="mb-8" placeholder="First Name" />
                <TextBox type="text" name="last_name" register={register} error={errors.last_name} width="w-80" marginBottom="mb-8" placeholder="Last Name" />
            </div>

            <TextBox type="text" name="address" register={register} error={errors.address}  placeholder="Address" />

            <div className="grid gap-6 md:grid-cols-2 mt-[35px]">
                <TextBox type="text" name="email" register={register} error={errors.email} width="w-80" marginBottom="mb-8" placeholder="Email" />
                <TextBox type="text" name="phone" register={register} error={errors.phone} width="w-80" marginBottom="mb-8" placeholder="Phone Number" />
            </div>

            <TextBox type="password" name="password" register={register} error={errors.password} marginBottom="mb-8" placeholder="Password" />
            <TextBox type="password" name="password_confirmation" register={register} error={errors.password_confirmation}  placeholder="Confirm Password" />

            <Button name="LOGIN" type="submit" marginTop="mt-[30px]" />

            <div className="mt-[20px]">
                <p>Already have an account? <Link to="/">Sign In</Link></p>
            </div>

        </Card>
    </div>
  )
}
