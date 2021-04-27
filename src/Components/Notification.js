const Notification = ({message, color}) =>
{
	if (message) { 
		return (
			<div style={{backgroundColor:color}}className="Notification">
				<h2 className="Notification__text">{ message }</h2>
			</div>
		)
	}
	return null
}

export default Notification