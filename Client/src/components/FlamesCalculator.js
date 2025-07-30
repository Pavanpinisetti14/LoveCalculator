import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

function FlamesCalculator(){

    const [boyName, setBoyName] = useState('');
    const [girlName, setGirlName] = useState('');
    const [result, setResult] = useState("");

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        const value = calculateResult();
        setResult(value);

        const expression = `${boyName} + ${girlName}`;
        saveCalculation(expression,value);
    };

    const saveCalculation = async (expression, result) => {
        try {
            await axios.post('http://localhost:5000/api/save', {
            expression,
            result
            });
            console.log('Saved to DB');
        } catch (error) {
            console.error('Save failed', error);
        }
    };

    const calculateResult = () => {
        const name1 = boyName.toLowerCase().replace(/\s+/g, '');
        const name2 = girlName.toLowerCase().replace(/\s+/g, '');

        let set1 = name1.split('');
        let set2 = name2.split('');

        let dupset1 = name1.split('');
        let dupset2 = name2.split('');

        for(let i=0;i<dupset1.length;i++){
            for(let j =0;j<set2.length;j++){
                if(dupset1[i] === set2[j]){
                    set2.splice(j,1);
                }
            }
        }
        // console.log("set 2 : ",dupset2);
        for(let i=0;i<dupset2.length;i++){
            for(let j =0;j<set1.length;j++){
                if(dupset2[i] === set1[j]){
                    set1.splice(j,1);
                }
            }
        }
        let n = set1.length + set2.length;

        // console.log("Set1 after removal:", set1);
        // console.log("Set2 after removal:", set2);
        // console.log("Ummatched count is : ",n);


        let li = ["F", "L", "A", "M", "E", "S"];
        let i = 0;

        while (li.length !== 1) {
            i = (i + n - 1) % li.length;
            li.splice(i, 1);
        }

        let val = li.pop();

        switch(val){
            case "F": return " Your are Friends";
            case "L": return "Both Are In Lovers";
            case "A": return "It's An Affection";
            case "M": return `u Married ${girlName}`;
            case "E": return " Both Are Enemies";
            case "S": return "Both Are Siblings";
            default: return "No Data Found";
        }
    };




    return(
        <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-center items-center text-white">
            <div className="bg-pink-200 w-[400px] h-[500px] rounded-[70px] text-purple-500 ">
                <button className='ml-8 pt-10 text-3xl' onClick={()=>navigate(-1)}><FaArrowLeft size={20} /></button>
                <div className="text-top text-3xl font-semibold text-center">Flames Calculator</div>
                <br></br>
                <br></br>
                <form onSubmit={handlesubmit} className='flex flex-col justify-center align-center'>

                <div className="input-field">
                        <input
                        type="text"
                        name="boyName"
                        value={boyName}
                        onChange={(e) => setBoyName(e.target.value)}
                        required
                        className="input-boy-field"
                        placeholder="Boy Name"
                        />
                        <label
                        htmlFor="boyName"
                        //   className=""
                        >
                        Boy Name
                        </label>
                    </div>
                    <br></br>
                    <div className="input-field">
                        <input
                        type="text"
                        name="girlName"
                        value={girlName}
                        onChange={(e) => setGirlName(e.target.value)}
                        required
                        className=""
                        placeholder="Girl Name"
                        />
                        <label
                        htmlFor="girlName"
                        className=""
                        >
                        Girl Name
                        </label>
                    </div>
                    <br></br><br></br>
                    <button type="submit"  className=" w-[300px] h-[40px] text-18px] bold border-purple-500 ml-12 rounded-[10px] border-[2px] hover:bg-white text-purple-500 text">
                        Submit
                    </button>
                </form>
                <br></br>
                <br></br>
                <div>
                    {result && <div className='text-center'>Result: {result}</div>}
                </div>
            </div>
        </div>
    );
}
export default FlamesCalculator;