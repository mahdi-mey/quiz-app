export default function NextButton ({dispatch, answer}){
    if(answer === null){
        console.log('inside early return');
        return null
    }

    return (
        <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion'})}>
            Next
        </button>
    )
}