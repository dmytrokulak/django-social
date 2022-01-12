import { Fragment } from 'react'
import { config } from '../Config'

const FriendsPane = ({ friends }) => {
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
        </Fragment>
    )
}

export default FriendsPane
