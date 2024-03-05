import { useQuizContext } from "../contextes/QuizContext"

export default function Progress() {

    const { index, numQuestions, points, maxPossiblePoints, answer } = useQuizContext()

    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)} />

            <p>
                Question <strong>{index + 1}</strong>  / {numQuestions}
            </p>

            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    )
}