import React from "react";
import { NavbarComponent } from "../../components/Navbar";

const Home: React.FC<UserData> = ({email, password}) => {

	return (
		<>
		<div>
			<NavbarComponent email={email} password={password}/>
		</div>
		</>
	)
}

export default Home;