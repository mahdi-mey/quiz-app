export default function Question({ question, dispatch, answer }) {
    const hasAnswered = answer !== null

    return (
        <div>
            <h4>{question.question}</h4>
            <div className="optopns">
                {question.options.map((option, index) => (
                    <button onClick={() => dispatch({ type: 'newAnswer', payload: index })} 
                            className={`btn btn-option 
                            ${index === answer ? 'answer' : ''}
                            ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : null}`} 
                            key={option} disabled={hasAnswered}>
                    {option}
                    </button>
                ))}
            </div>
        </div>
    )
}