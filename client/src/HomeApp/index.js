import React, { Fragment, useState, useEffect } from 'react';
import { config } from '../Config'
import ProfilePicture from './ProfilePicture';
import StatusPane from './StatusPane';
import InterestsPane from './InterestsPane'
import StatusFeed from '../_shared/StatusFeed';
import FriendsPane from './FriendsPane';
import MediaPane from './MediaPane';

/// A home, profile page for logged in user. 
/// Allows changing profile picture, status, interests,
/// adding and removing media files, accepting user requests
const HomeApp = () => {
    const [user, setUser] = useState(null)
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        const loadData = async () => {
            let data = await getUser()
            setStatuses(data.statuses.map(obj => { return [obj.status, obj.timestamp] }))
            setUser(data)
        }
        loadData()
        // eslint-disable-next-line
    }, []);

    const addStatus = (status) => {
        setStatuses([[status, new Date().toISOString()], ...statuses])
    }

    return (
        <Fragment>
            {user ? (
                <Fragment>
                    <div className="row" >
                        <ProfilePicture user={user}></ProfilePicture>
                        <div className="col-sm-4 ml-2">
                            <h3>{user.full_name}</h3>
                            <StatusPane statuses={statuses} addStatus={addStatus}></StatusPane>
                            <hr />
                            <InterestsPane user={user}></InterestsPane>
                            <StatusFeed statuses={statuses}></StatusFeed>
                        </div>
                    </div>
                    <FriendsPane user={user}></FriendsPane>
                    <MediaPane user={user}></MediaPane>
                </Fragment>
            ) : <span>Loading...</span>}
        </Fragment>
    )
}

const getUser = async () => {
    const response = await fetch(`${config.HOST}/api/me/info`)
    return await response.json()
}

export default HomeApp
