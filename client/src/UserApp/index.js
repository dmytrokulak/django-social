import React, { Fragment, useState, useEffect } from 'react';
import { config } from '../Config'
import UserInfoPane from './UserInfoPane';
import FriendsPane from './FriendsPane';
import MediaPane from './MediaPane';

// Renders readonly, "guest" version of a user page.
// Allows changing friend status (send or accept a friend request, remove from friends)
// and holds a link to a chat with this user.
const UserApp = ({ username }) => {
    const [user, setUser] = useState(null)
    const [me, setMe] = useState(null)
    const [statuses, setStatuses] = useState([])
    const [friends, setFriends] = useState([])

    const loadData = async () => {
        let data = await getUser(username)
        setStatuses(data.statuses.map(obj => { return [obj.status, obj.timestamp] }))
        setFriends(data.friends)
        setUser(data)
        setMe(await getMe())
    }

    useEffect(() => {
        loadData()
        // eslint-disable-next-line
    }, []);

    const removeMeFromFriends = () => {
        setFriends(friends.filter(f => f.user_id !== me.user_id))
    }

    const addMeToFriends = () => {
        setFriends([me, ...friends])
    }

    return (
        <Fragment>
            {user ? (
                <Fragment>
                    <UserInfoPane
                        user={user}
                        statuses={statuses}
                        me={me}
                        removeMeFromFriends={removeMeFromFriends}
                        addMeToFriends={addMeToFriends}
                    />
                    <FriendsPane friends={friends} />
                    <MediaPane user={user} />
                </Fragment>
            ) : <span>Loading...</span>}
        </Fragment>
    )
}

const getUser = async (username) => {
    const response = await fetch(`${config.HOST}/api/users/${username}`)
    return await response.json()
}

const getMe = async () => {
    const response = await fetch(`${config.HOST}/api/me/info`)
    return await response.json()
}


export default UserApp
