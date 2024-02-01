export default function Question({question}){
    console.log(question);
    return(
        <div>
            <h4>{question.question}</h4>
            <div className="optopns">
                {question.options.map(option => (
                    <button className="btn btn-option" key={option}>{option}</button>
                ))} 
            </div>
        </div>
    )
}