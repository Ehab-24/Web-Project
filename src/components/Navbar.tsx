import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate()

    return (
        <div className="flex px-4 md:px-8 justify-between w-full h-20 bg-gray-300">

            <div className="self-center text-3xl font-bold items-center w-40 flex justify-start">
                LOGO
            </div>

            <div className="flex items-center h-full">
                <ul className="flex items-center h-full w-max">
                    <li>
                        <button onClick={() => navigate("/")}>Home</button>
                    </li>
                    <div className="h-1/3 mx-6 self-center w-[1px] bg-gray-600"></div>
                    <li>
                        <button onClick={() => navigate("/experiences")}>Experiences</button>
                    </li>
                    <div className="h-1/3 mx-6 self-center w-[1px] bg-gray-600"></div>
                    <li>
                        <button onClick={() => navigate("/online")}>Online</button>
                    </li>
                </ul>
            </div>

            <div className="flex items-center justify-end">
                <button>
                    Log in
                </button>
                <div className="h-2/3 mx-6 self-center w-[1px] bg-gray-600"></div>
                <button>
                    Sign up
                </button>
            </div>

        </div>
    )
}


export default Navbar;
