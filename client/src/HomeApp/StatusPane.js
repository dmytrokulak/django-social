import { Fragment, useState } from 'react'
import cookie from 'react-cookies'
import { config } from '../Config'

const StatusPane = ({ statuses, addStatus }) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [text, setText] = useState(statuses.length ? statuses[0][0] : '');
    const [showError, setShowError] = useState(false)

    const onEdit = () => {
        setIsEditMode(true)
    }

    const onChange = e => setText(e.target.value);

    const onSave = async () => {
        const response = await fetch(`${config.HOST}/api/me/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookie.load("csrftoken")
            },
            body: JSON.stringify({ status: text }),
        })
        if (response.ok) {
            addStatus(text)
            setIsEditMode(false)
            setShowError(false)
        }
        else {
            setShowError(true)
        }
    }

    const onCancel = () => {
        setText(statuses.length ? statuses[0][0] : '');
        setIsEditMode(false)
        setShowError(false)
    }

    const onKeyPress = e => {
        if (e.charCode === 13) {
            onSave(e)
        }
    }

    return (
        <div>
            {!isEditMode ?
                <Fragment>
                    <span>{text}</span>
                    <button className="btn-basic" title="Edit interests" onClick={onEdit}>
                        <i className="fas fa-edit"></i>
                    </button>
                </Fragment> :
                <Fragment>
                    <textarea className="mr-1" rows="1" cols="40" value={text} onChange={onChange} onKeyPress={onKeyPress}>
                    </textarea>
                    <button className="btn-basic" title="Save interests" onClick={onSave}>
                        <i className="fas fa-lg fa-save"></i>
                    </button>
                    <button className="btn-basic" title="Cancel" onClick={onCancel}>
                        <i className="fas fa-lg fa-times"></i>
                    </button>
                    {
                        showError &&
                        <div className="text-danger">Error updating status</div>
                    }
                </Fragment>}
        </div>
    )
}

export default StatusPane
