import { Link } from 'react-router-dom'
import Card from '../ui/Card'

export default function Signup(){
    return (
        <div className=''>
          < Card formName="signup" accountAlready={true}/>
        </div>
    )
}