import {FiUser} from 'react-icons/fi'
import {BsSearch} from 'react-icons/bs'
import {GoFlame} from 'react-icons/go'
import {BsGraphUp} from 'react-icons/bs'
import {BiAddToQueue} from 'react-icons/bi'
import {useHistory} from "react-router-dom"

const Banner=({filterQuery,setFilterQuery,username}) =>{
const history = useHistory()

return(
      <div className="Banner">
				<div style={{width:"70%"}}>
				<h2 style={{justifySelf:"center"}}>Admin Dashboard</h2>
				</div>
				<div style={{alignItems:"center",height:"100%",marginLeft:"auto",marginRight:"20px",display:"flex"}}>
			<BiAddToQueue  className="Banner__icon" size={"40px"}
			onClick={()=>{ history.push("/admin/new") }}/> 
					<div style={{height:"100%"}}className="dropdown">
					<BsSearch className="Banner__icon dropbtn" size={"30px"} />
					<div className="dropdown-content">
		<input style={{height:"25px",margin:"5px",color:"black"}}
		placeholder={"Filter"}
			value={filterQuery}
			onChange={(event)=>{setFilterQuery(event.target.value)}}/>

					</div>
			</div>

					<GoFlame  className="Banner__icon" size={"30px"}/>
					<BsGraphUp className="Banner__icon" size={"30px"}/>
					<FiUser className="Banner__icon" size={"30px"} />
						<h2 style={{marginLeft:"20px"}}>
								{username}
						</h2>
				</div>
      </div>
			)
		}

export default Banner