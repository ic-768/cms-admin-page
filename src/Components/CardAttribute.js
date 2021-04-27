const CardAttribute = ({ activity, attribute, value }) =>
	<div style={{ wordWrap: "break-word", overflowWrap: "anywhere",
		backgroundColor: activity ? "#44475a" : "#777777",
		marginBottom: "10px" }}>
		<h4 style={{
			color: activity
					? "#ffb86c"
					: "#222222"
		}}>{ attribute }</h4>
		<span style={{ overflow: "hidden" }}>{ value }</span>
	</div>

export default CardAttribute
