import {useState,useEffect} from 'react'
function Quiz(){
    const [ questions, setQuestions ] = useState([])
    const [ results, setResults ] = useState([])
    const [ token, setToken ] = useState('')
    const [ number, setNumber ] = useState(0)
    const shuffleAnswers = (answers) =>{
        for (let i = answers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers
    }
    const startQuiz = async() =>{
        setResults([])
        setNumber(0)
        const response = await fetch(`https://opentdb.com/api.php?amount=10&encode=base64&token=${token}`).then(res=>res.json())
        setQuestions(response.results)
    }
    const sendAnswer = (e) =>{
        setResults([...results,{difficulty : questions[number].difficulty, question : questions[number].question, user_answer : e.target.value, correct_answer : questions[number].correct_answer}])
        setNumber(number+1)
    }
    useEffect(()=>{
        return async()=>{
        const response = await fetch('https://opentdb.com/api_token.php?command=request').then(res=>res.json())
        setToken(response.token)
        }
    },[])
    if(questions.length===0){
        return <button onClick={startQuiz}>Start</button>
    }
    if(number===10){
        return(
            <>
            {
            results.sort((a,b)=>{
                const obj = {
                    hard:1,
                    medium:2,
                    easy:3
                }
                return obj[atob(a.difficulty)]-obj[atob(b.difficulty)]
            }).map((result, index)=>{
                const bgcClassName = result.user_answer===atob(result.correct_answer)?'correct':'incorrect'
                return <div key={index} className={`result ${bgcClassName}`}>
                            <div>
                                {atob(result.question)}
                            </div>
                            <div>
                                Difficulty: {atob(result.difficulty)}
                            </div>
                            <div>
                                Your answer: {result.user_answer}
                            </div>
                            <div>
                                Correct anser: {atob(result.correct_answer)}
                            </div>
                        </div>
            })
            }
            <button onClick={startQuiz}>New quiz</button>
            </>
        )
    }
    return (
        <div className='quiz'>
            <p className='number'>{number+1}/10</p>
            <p className='difficulty'>{atob(questions[number].difficulty)}</p>
            <p className='question'>{atob(questions[number].question)}</p>
            {
                shuffleAnswers([questions[number].correct_answer,...questions[number].incorrect_answers]).map((answer,index)=>(
                <div className = 'answer'>
                    <input key={index} value={atob(answer)} onClick={(e)=>sendAnswer(e)} id={index} name='answer' type='radio'/>
                    <label htmlFor={index}>{atob(answer)}</label>
                </div>
                ))
            }
        </div>
    )
}
export default Quiz