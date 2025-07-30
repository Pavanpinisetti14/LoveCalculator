import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    const loveCalculator=()=>{
        navigate('/LoveCalculator')
    }

    const flamesCalculator=()=>{
        navigate('/FlamesCalculator');
    }

    return(
        <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-center items-center text-white">
            <div className="bg-white w-[400px] h-[500px] rounded-[70px] flex flex-col justify-center text-black">
                <div className="bg-pink-200 text-[29px] h-[250px] rounded-tl-[70px] rounded-tr-[70px] text-center flex flex-col items-center justify-center">
                    <div>Love Calculator</div>
                    <br></br>
                    <div>
                        <button className="bg-blue-200 px-[8px]" onClick={loveCalculator}>
                            calculate
                        </button>
                    </div>
                </div>
                <div className="bg-blue-200 text-[29px] h-[250px] rounded-bl-[70px] rounded-br-[70px] text-center flex flex-col items-center justify-center">
                    <div>Flames Calculator</div>
                    <br></br>
                    <div>
                        <button className="bg-pink-200 px-[8px]" onClick={flamesCalculator}>
                            calculate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;