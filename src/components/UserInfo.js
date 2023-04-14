
function UserInfo(props){

    return(
        <>
            <h2>my information</h2>
            <img src={props.image} alt="profilepic" />
            <h2>{props.name}</h2>
            <p>{props.location}</p>

            <button onClick={()=>{props.deleteProfile()}}>delete my profile</button>
            <button onClick={()=>{props.profileUpdate()}}>update my profile</button>

            <button onClick={props.postCreate}>create new post</button>
            <button onClick={props.travelguideCreate}>create new travelguide</button>
        </>
    )

}

export default UserInfo;