import { NavbarComponent } from "../../components/Navbar";


const Privacy: React.FC<UserData> = ({email, password}) => {

	return (
		<>
			<NavbarComponent email={email} password={password} />
		</>
	)
}

export default Privacy;