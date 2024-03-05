import { useQuizContext } from "../contextes/QuizContext"

export default function Question() {

    const { questions, dispatch, answer, index } = useQuizContext()

    const hasAnswered = answer !== null

    const question = questions[index]

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