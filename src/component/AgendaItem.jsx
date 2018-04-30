import React from 'react'

const AgendaItem = ({
    id,
    title,
    body,
    meeting_time
    }) => {
    return (<div>
        <h1>{title}</h1>
        <div>{body[0]}</div>
        <div>{body[1]}</div>
    </div>)
}
export default AgendaItem