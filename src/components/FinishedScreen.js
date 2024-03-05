import { useQuizContext } from "../contextes/QuizContext";

export default function FinishedScreen() {

    const { points, maxPossiblePoints, highscore, dispatch} = useQuizContext()

    const percentage = (points / maxPossiblePoints) * 100

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <>
            <p className="result">
                <span>{emoji} </span>You Scored <strong>{points}</strong> out of {maxPossiblePoints}
            </p>
            <p className="highscore">
                Highscore: {highscore} points
            </p>
            <button className="btn btn-ui resetBtn" onClick={() => dispatch({type: 'restart'})}>Restart Quiz</button>
        </>
    )
}