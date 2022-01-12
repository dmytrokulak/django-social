import { Fragment } from 'react'
import { config } from '../Config'

const MediaPane = ({ user }) => {

    const photos = user.media.filter(m => m.media_type === "photo")
    const videos = user.media.filter(m => m.media_type === "video")

    return (
        <Fragment>
            <div className="row mt-4">
                <h4>Photos</h4>
            </div>
            <div className="row">
                {photos && photos.map(photo =>
                    <div className="mx-1" key={`${photo.id}`}>
                        <img
                            src={`${config.HOST}/${photo.data_path}`}
                            width={150}
                            alt={`${photo.data_path}`}
                        />
                    </div>
                )}
            </div>
            <div className="row my-2">
                <h4>Videos</h4>
            </div>
            <div className="row">
                {videos && videos.map(video =>
                    <div key={`${video.id}`}>
                        <video
                            className="m-1"
                            controls
                            src={`${config.HOST}/${video.data_path}`}
                            style={{ cursor: "pointer" }}
                            width={300} />
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default MediaPane
