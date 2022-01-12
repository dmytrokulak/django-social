
const StatusFeed = ({ statuses }) => {

    return (
        <div className="my-2">
            <h5>Status updates:</h5>
            <div style={statusFeedClass}>
                {
                    statuses.map(status => {
                        const date = new Date(status[1]);
                        return <div key={status[1]}>
                            {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}: ${status[0]}\n`}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

const statusFeedClass = {
    overflowY: "scroll",
    height: "10rem",
    width: "25rem",
    resize: "none",
    border: "1px solid grey",
    padding: "5px"
}

export default StatusFeed
