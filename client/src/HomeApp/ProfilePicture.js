import { Fragment, useState } from 'react'
import cookie from 'react-cookies'
import { config } from '../Config'

const ProfilePicture = ({ user }) => {
    const [imgSrc, setImgSrc] = useState(`${config.HOST}/${user.profile_picture_path}`)
    const [isEditMode, setIsEditMode] = useState(false)
    const [imgFile, setFile] = useState(null)
    const [showError, setShowError] = useState(false)

    const previewImage = (e) => {
        const [file] = e.target.files
        if (file) {
            setFile(file)
            setImgSrc(URL.createObjectURL(file))
        }
    }

    const saveImage = async () => {
        if (imgFile) {
            let formData = new FormData()
            formData.append('file', imgFile)
            const response = await fetch(`${config.HOST}/api/me/avatar`, {
                method: 'PATCH',
                headers: {
                    'X-CSRFToken': cookie.load("csrftoken")
                },
                body: formData,
            })
            if (response.ok) {
                setIsEditMode(false)
                setShowError(false)
            }
            else {
                setShowError(true)
            }
        }

    }

    const cancelEdit = () => {
        setImgSrc(`${config.HOST}/${user.profile_picture_path}`)
        setIsEditMode(false)
        setShowError(false)
    }

    return (
        <div className="col-sm-4">
            <img src={imgSrc} alt="profile_picture" width="200" />
            {!isEditMode ?
                <button className="btn-basic"
                    onClick={(e) => { e.preventDefault(); setIsEditMode(true) }}>
                    Change profile picture
                </button>
                : <Fragment>
                    <input
                        type="file"
                        accept=".gif,.jpg,.jpeg,.png"
                        onChange={previewImage}
                    />
                    <button
                        title="Save image"
                        className="btn-basic"
                        onClick={saveImage}>
                        <i className="fas fa-lg fa-save"></i>
                    </button>
                    <button className="btn-basic"
                        title="Cancel"
                        onClick={cancelEdit}>
                        <i className="fas fa-lg fa-times"></i>
                    </button>
                    {
                        showError &&
                        <div className="text-danger">Error saving the picture</div>
                    }
                </Fragment>}
        </div>
    )
}

export default ProfilePicture
