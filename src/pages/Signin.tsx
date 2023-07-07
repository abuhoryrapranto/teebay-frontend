import Card from "../components/Card"
import TextBox from "../components/TextBox"
import Button from "../components/Button"
import { Link } from "react-router-dom"

export default function Signin() {
  return (

    <div>
        <p className="text-2xl font-medium mb-4">SIGN IN</p>

        <Card>
            <TextBox type="text" placeholder="Email" />
            <TextBox type="text" placeholder="Password" />
            <Button name="LOGIN" marginTop="mt-[30px]" />

            <div className="mt-[20px]">
                <p>Dont have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </Card>
    </div>
  )
}
