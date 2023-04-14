import { Link } from "react-router-dom"

function UserInfo(props){

    return(
        <>
            <img src={props.curUser.image} alt="profilepic" />
            <h2>{props.curUser.name}</h2>
            <p>{props.curUser.location}</p>
            <p>{props.curUser.posts}</p>
            <p>{props.curUser.travelguides}</p>

            <button onClick={()=>{props.deleteProfile()}}>delete my profile</button>
            <Link to="/user-update">update my profile</Link>
        </>
    )
}

export default UserInfo