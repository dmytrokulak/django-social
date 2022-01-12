import { Fragment, useState } from 'react'
import cookie from 'react-cookies'
import { config } from '../Config'

const FriendsPane = ({ user }) => {
    const [friends, setFriends] = useState(user.friends)
    const [requests, setRequests] = useState(user.requests)
    const [showError, setShowError] = useState(false)

    const acceptRequest = async user_id => {
        if (window.confirm("Accept friend request?")) {
            const rsponse = await fetch(`${config.HOST}/api/me/friend/${user_id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': cookie.load("csrftoken")
                }
            })
            if (rsponse.ok) {
                const friend = requests.filter(r => r.user_id === user_id)[0]
                setRequests(requests.filter(r => r.user_id !== user_id))
                setFriends([friend, ...friends])
                setShowError(false)
            }
            else {
                setShowError(true)
            }
        }
    }

    return (
        <Fragment>
            <div className="row mt-4">
                <h4>Friends</h4>
            </div>
            {
                friends.length ?
                    <div>
                        {friends.map(friend =>
                            <div className="mx-1" key={friend.username} >
                                <a href={`${config.HOST}/users/${friend.username}`}>
                                    <img
                                        src={`${config.HOST}/${friend.profile_picture_path}`}
                                        style={{ width: "5rem" }} alt={`${friend.full_name}`} />
                                </a>
                                <div style={{ width: "5rem" }}>{friend.full_name}</div>
                            </div>
                        )}
                    </div> :
                    <div className="row">No friends :(</div>
            }
            <div className="row mt-4">
                <h4>Friend requests</h4>
            </div>
            {
                requests.length ?
                    <div>
                        {requests.map(request =>
                            <div className="mx-1" key={request.username} >
                                <a href={`${config.HOST}/users/${request.username}`}>
                                    <img
                                        src={`${config.HOST}/${request.profile_picture_path}`}
                                        style={{ width: "5rem" }} alt={`${request.full_name}`} />
                                </a>
                                <div style={{ width: "5rem" }}>{request.full_name}</div>
                                <button className="btn btn-primary" onClick={() => acceptRequest(request.user_id)}>
                                    Accept
                                </button>
                            </div>
                        )}
                    </div> :
                    <div className="row">No new friend requests</div>
            }
            {
                showError &&
                <div className="text-danger">Error accepting friend request</div>
            }
        </Fragment >
    )
}

export default FriendsPane
