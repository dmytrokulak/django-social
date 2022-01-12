import { useState, useEffect, Fragment } from 'react';
import cookie from 'react-cookies'
import { config } from '../Config'
import StatusFeed from '../_shared/StatusFeed';
import { ACTIVE, PENDING, SENT, NONE } from './FriendStatus';

const UserInfoPane = ({ user, statuses, me, removeMeFromFriends, addMeToFriends }) => {
    const [showError, setShowError] = useState(false)
    const [friendStatus, setFriendStatus] = useState(null)

    const resolveFriendStatus = () => {
        if (user.friends.filter(r => r.user_id === me.user_id).length) {
            setFriendStatus(ACTIVE)
        }
        else if (me.requests.filter(r => r.user_id === user.user_id).length) {
            setFriendStatus(PENDING)
        } else if (user.requests.filter(r => r.user_id === me.user_id).length) {
            setFriendStatus(SENT)
        }
        else {
            setFriendStatus(NONE)
        }
    }

    useEffect(() => {
        if (user && me) {
            resolveFriendStatus()
        }
        // eslint-disable-next-line
    }, [user, me]);

    const sendFriendRequest = async () => {
        if (window.confirm("Add this user as a friend?")) {
            const response = await fetch(`${config.HOST}/api/me/friend/${user.user_id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': cookie.load("csrftoken")
                }
            })

            if (response.ok) {
                setShowError(false)
                setFriendStatus(SENT)
            }
            else {
                setShowError(true)
            }

        }
    }

    const acceptFriendRequest = async () => {
        if (window.confirm("Accept friend request?")) {
            const response = await fetch(`${config.HOST}/api/me/friend/${user.user_id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': cookie.load("csrftoken")
                }
            })

            if (response.ok) {
                setShowError(false)
                setFriendStatus(ACTIVE)
                addMeToFriends()
            }
            else {
                setShowError(true)
            }

        }
    }

    const removeFromFriends = async () => {
        if (window.confirm("Remove from friends?")) {
            const response = await fetch(`${config.HOST}/api/me/friend/${user.user_id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': cookie.load("csrftoken")
                }
            })
            if (response.ok) {
                setShowError(false)
                setFriendStatus(NONE)
                removeMeFromFriends()
            }
            else {
                setShowError(true)
            }
        }
    }

    return (
        <div className="row" >
            <div className="col-sm-4">
                <img src={`${config.HOST}/${user.profile_picture_path}`} alt="profile_picture" width="200" />
                {
                    friendStatus === NONE &&
                    <button className="btn btn-sm btn-primary m-1" onClick={sendFriendRequest}>
                        Add as a friend
                    </button>
                }
                {
                    friendStatus === SENT &&
                    <button className="btn btn-sm btn-success m-1" disabled>
                        Friend request sent
                    </button>
                }
                {
                    friendStatus === PENDING &&
                    <button className="btn btn-sm btn-success m-1" onClick={acceptFriendRequest}>
                        Accept friend request
                    </button>
                }
                {
                    friendStatus === ACTIVE &&
                    <Fragment>
                        <button className="btn btn-sm btn-danger m-1" onClick={removeFromFriends}>
                            Remove from friends
                        </button>
                        <a
                            href={`${config.HOST}/users/${user.username}/chat`}
                            className="btn btn-sm btn-primary">
                            Open chat with {user.full_name}
                        </a>
                    </Fragment>

                }
                {
                    showError && <div className="text-danger">Error occured</div>
                }
            </div>
            <div className="col-sm-4 ml-2">
                <h3>{user.full_name}</h3>
                <span>{statuses.length ? statuses[0][0] : ''}</span>
                <hr />
                <div>
                    <h5>Interests:</h5>
                    <span>{user.interests}</span>
                </div>
                <StatusFeed statuses={statuses} />
            </div>
        </div>
    )
}

export default UserInfoPane
