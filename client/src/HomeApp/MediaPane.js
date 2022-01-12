import { Fragment, useState } from 'react'
import cookie from 'react-cookies'
import { config } from '../Config'

const MediaPane = ({ user }) => {

    const [photos, setPhotos] = useState(user.media.filter(m => m.media_type === "photo"))
    const [videos, setVideos] = useState(user.media.filter(m => m.media_type === "video"))
    const [imgFile, setImgFile] = useState(null)
    const [videoFile, setVideoFile] = useState(null)

    const uploadMedia = async (mediaType) => {
        let formData = new FormData()
        formData.append('file', mediaType === 'photo' ? imgFile : videoFile)
        const response = await fetch(`${config.HOST}/api/me/media/${mediaType}`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': cookie.load("csrftoken")
            },
            body: formData,
        })
        if (response.ok) {
            if (mediaType === 'photo') {
                setPhotos([await response.json(), ...photos])
            } else if (mediaType === 'video') {
                setVideos([await response.json(), ...videos])
            }
        }
    }

    const deleteMedia = async (id, mediaType) => {
        if (window.confirm("Delete this file?")) {
            const response = await fetch(`${config.HOST}/api/me/media/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': cookie.load("csrftoken")
                }
            })
            if (response.ok) {
                if (mediaType === 'photo') {
                    setPhotos(photos.filter(p => p.id !== id))
                } else if (mediaType === 'video') {
                    setVideos(videos.filter(v => v.id !== id))
                }
            }
        }
    }
    return (
        <Fragment>
            <div className="row mt-4">
                <h4>Photos</h4>
                <input type="file"
                    className="mx-2"
                    accept=".gif,.jpg,.jpeg,.png"
                    style={{ width: "12rem" }}
                    onChange={(e) => setImgFile(e.target.files[0])} />
                <button title="Upload photo" className="btn-basic" onClick={() => uploadMedia('photo')}>
                    <i className="fas fa-lg fa-upload"></i>
                </button>
            </div>
            <div className="row">
                {photos ? photos.map(photo =>
                    <div className="mx-1" key={`${photo.id}`}>
                        <img
                            src={`${config.HOST}/${photo.data_path}`}
                            width={150}
                            alt={`${photo.data_path}`}
                        />
                        <button
                            className="btn-basic"
                            style={{ display: "block" }}
                            onClick={() => deleteMedia(photo.id, 'photo')}>
                            Delete
                        </button>
                    </div>
                ) : <Fragment></Fragment>}
            </div>
            <div className="row my-2">
                <h4>Videos</h4>
                <input
                    type="file"
                    className="mx-2"
                    accept=".mp4,.mov,.wmv,.flv"
                    style={{ width: "12rem" }}
                    onChange={(e) => setVideoFile(e.target.files[0])} />
                <button title="Upload video" className="btn-basic" onClick={() => uploadMedia('video')}>
                    <i className="fas fa-lg fa-upload"></i>
                </button>
            </div>
            <div className="row">
                {videos ? videos.map(video =>
                    <div key={`${video.id}`}>
                        <video
                            className="m-1"
                            controls
                            src={`${config.HOST}/${video.data_path}`}
                            style={{ cursor: "pointer" }}
                            width={300} />
                        <button
                            className="btn-basic"
                            style={{ display: "block" }}
                            onClick={() => deleteMedia(video.id, 'video')}>
                            Delete
                        </button>
                    </div>
                ) : <Fragment></Fragment>}
            </div>
        </Fragment>
    )
}

export default MediaPane
