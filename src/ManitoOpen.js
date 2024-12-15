import { useEffect } from "react"
import './ManitoOpen.css'
import { Users } from "./ConstantValues"

const ManitoOpen = ({targetName, answers}) => {

    useEffect(() => {
        
    },[])

    return <>
        <div className='contents-container'>
            <div>
                쉿! 당신의 마니또는...
            </div>
            <div className="answer-animation-text">
                {answers[Users.findIndex(_ => _ === targetName)]}
            </div>
        </div>
    </>
}

export default ManitoOpen