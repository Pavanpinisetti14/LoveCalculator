import React, { useState } from 'react';
import '../styles/App.css';
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';

function LoveCalculator() {
    const [boyName, setBoyName] = useState('');
    const [girlName, setGirlName] = useState('');
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        calculateResult();
        const calculatedResult = calculateResult();
        setResult(calculatedResult);

        const expression = `${boyName} ❤️ ${girlName}`;

        saveCalculation(expression,calculatedResult);
    };

    const saveCalculation = async (expression, result) => {
        try {
            await axios.post('https://lovecalculator-mwnf.onrender.com/api/save', {
            expression,
            result
            });
            console.log('Saved LoveCalc to DB');
        } catch (error) {
            console.error('LoveCalc Save failed', error);
        }
     };

    const calculateResult=()=>{

        let combined = (boyName + girlName).toLowerCase();

        const word = ['l','o','v','e','s'];
        const freq = {l:0, o:0, v:0, e:0, s:0};
        for(let char of combined){
            if(word.includes(char)){
                freq[char]++
            }
        }

        // console.log("Frequency of LOVES letter : ",freq);

        const combinedword = word.map(i => freq[i]).join('');
        var letters = combinedword;
        
        // console.log("Letters : ",letters);

        while(letters.length !== 2){
            var combo = "";
            for( var i=1;i<letters.length;i++){
                const val1 = parseInt(letters.charAt(i-1));
                const val2 = parseInt(letters.charAt(i));

                const sumvalue = val1 + val2;
                
                combo += String(sumvalue);
                
            }
            // console.log("-> ",combo);
            letters = combo;
        }

        return `Love % : ${letters}%`;
        
    }


    return (
        <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-center items-center text-white">
        <div className="bg-pink-200 w-[400px] h-[500px] rounded-[70px] text-purple-500 ">
            <button className='ml-8 pt-10 text-3xl' onClick={()=>navigate(-1)}><FaArrowLeft size={20} /></button>
            <div className="text-top text-3xl font-semibold text-center ">Love Calculator</div>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center align-center'>

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
                {result && <div className='text-center'> ❤️ Percentage is {result}</div> }
            </div>
        </div>
        </div>
    );
}

export default LoveCalculator;
