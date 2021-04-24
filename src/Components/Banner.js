import {FiUser} from 'react-icons/fi'

const Banner=({username}) =>
      <div className="Banner">
				<div style={{width:"70%"}}>
				<h3 style={{justifySelf:"center"}}>Admin Dashboard</h3>
				</div>
				<h4 style={{marginLeft:"auto",marginRight:"20px"}}> 
					<FiUser style={{marginRight:"20px"}}/>
						{username}
				</h4>
      </div>

export default Banner