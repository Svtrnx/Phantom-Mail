"use client"
import { useState, useEffect } from "react";
import {Form, Input, Button, Code, Spinner} from "@nextui-org/react";
import { getDomain } from "../../services/mailApi/MailApiService";
import { signUp } from "../../services/auth/AuthService";
import { showToast  } from "../../components/ToastContext";
import { useNavigate } from 'react-router-dom';
import { MailLogo } from "../../components/utils";
import { delay } from "../../components/utils";
import './styles.css';

const SignUp = () => {
	
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [domain, setDomain] = useState("");
	const [loading, setLoading] = useState(true);
	const [requestProcessing, setRequestProcessing] = useState(false);

	const errors: Array<string> = [];

	const navigate = useNavigate();

	useEffect(() => {
		const fetchDomain = async () => {
			try {
				const response = await getDomain();
				if (response && response.status == 'success') {
					setDomain(response.message.domain);
					setLoading(false);
				}
			}
			catch (error: any) {
				console.log(error.response.data);
			}
		};

		fetchDomain();

	},[])

	if (password.length < 4) {
		errors.push("Password must be 4 characters or more.");
	}
	if ((password.match(/[A-Z]/g) || []).length < 1) {
		errors.push("Password must include at least 1 upper case letter");
	}
	if ((password.match(/[^a-z]/gi) || []).length < 1) {
		errors.push("Password must include at least 1 symbol.");
	}

	async function onSubmit (e: any) {
		setRequestProcessing(true);
		e.preventDefault();
	
		const data = Object.fromEntries(new FormData(e.currentTarget));
	
		const response = await signUp(typeof data.email === 'string' ? data.email + "@" + domain : "", typeof data.password === 'string' ? data.password : "");
		if (response.status == 'success') {
			showToast('Success!', "Successfully authenticated!", 'success')
			await delay(1500);
			window.location.reload();

		}
		else {
			if (typeof(response.message) == 'object') {
				response.message = response.message[0].msg
			}
			showToast('Error!', `${response.message}!`, 'danger')
		}
		setRequestProcessing(false);

	};


	return (
		<>
		{loading ? 
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Spinner color="secondary" label="Loading..." labelColor="secondary" />
		</div>	
		:
			<div style={{placeItems: 'center'}}>
				<div style={{display: 'grid', justifyItems: 'center'}}>
					<h2 className="flex">{<MailLogo/>}<h2 className="pt-2">Phantom Mail</h2></h2>
					<h3>Sign Up</h3>
					<Code className="mb-5" color="secondary">{email}@{domain}</Code>
				</div>
				<Form className="w-full max-w-xs" style={{marginInline: 'auto'}} validationBehavior="native" onSubmit={onSubmit}>
					<Input
						isRequired
						errorMessage="Please enter a valid email"
						label="Email"
						labelPlacement="outside"
						name="email"
						placeholder="Enter your email"
						// type="email"
						variant="bordered"
						value={email}
						onChange={(e) => setEmail(e.target.value.toLowerCase())}

					/>
					<Input
						errorMessage={() => (
							<ul>
							{errors.map((error, i) => (
								<li key={i}>{error}</li>
							))}
							</ul>
						)}
						isRequired
						isInvalid={errors.length > 0}
						label="Password"
						labelPlacement="outside"
						name="password"
						placeholder="Enter your password"
						value={password}
						variant="bordered"
						onValueChange={setPassword}
						/>
					<Button isLoading={requestProcessing} style={{width: "100%"}} type="submit" variant="ghost">
						Submit
					</Button>
				</Form>
				<div style={{marginInline: 'auto', width: '100px'}}>
					<Button isDisabled={requestProcessing} onPress={() => {navigate('/signin');}} style={{width: "100%", height: 30, marginTop: 15}} variant="ghost">
						Sign In
					</Button>
				</div>
				{/* <div className="sigup_redirect">
					<h2><a href={""}>Sign In</a></h2>
				</div> */}
			</div>
		} 
		</>
	)
}

export default SignUp;