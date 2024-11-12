import { useNavigate } from "react-router-dom";
import TextButton from "./buttons/TextButton";
import OutlinedButton from "./buttons/OutlinedButton";
import Button from "./buttons/Button";
import Logo from "./Logo";


function Navbar() {

    const navigate = useNavigate()

    return (
        <div className="flex px-4 md:px-8 justify-between w-full h-20">

            <Logo />

            <div className="flex items-center h-full">
                <ul className="flex items-center h-full w-max gap-3">
                    <li>
                        <TextButton onClick={() => navigate("/")}>Home</TextButton>
                    </li>
                    <li>
                        <TextButton onClick={() => navigate("/experiences")}>Experiences</TextButton>
                    </li>
                </ul>
            </div>

            <div className="flex gap-2 items-center justify-end">
                <Button onClick={() => {}}>
                    &nbsp;&nbsp;Sign up&nbsp;&nbsp;
                </Button>
                <OutlinedButton onClick={() => {}}>
                    &nbsp;&nbsp;Log in&nbsp;&nbsp;
                </OutlinedButton>
            </div>

        </div>
    )
}


export default Navbar;
