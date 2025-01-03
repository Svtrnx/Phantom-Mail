"use client"
import { useState } from "react";
import {Form, Input, Button} from "@nextui-org/react";
// import { signIn } from "../../services/auth/AuthService";


function SignUp() {
	
	const [password, setPassword] = useState("");


	const errors: Array<string> = [];


	if (password.length < 4) {
		errors.push("Password must be 4 characters or more.");
	}
	if ((password.match(/[A-Z]/g) || []).length < 1) {
		errors.push("Password must include at least 1 upper case letter");
	}
	if ((password.match(/[^a-z]/gi) || []).length < 1) {
		errors.push("Password must include at least 1 symbol.");
	}

	const onSubmit = (e: any) => {
		e.preventDefault();
	
		const data = Object.fromEntries(new FormData(e.currentTarget));
	
		console.log(data.email)
		// try {
		// 	const response = signIn(typeof data.email === 'string' ? data.email : "", typeof data.password === 'string' ? data.password : "");
		// 	console.log('Sign-in successful:', response);
		//   } catch (err: any) {
		// 	console.log('Error during sign-in:', err);
		//   }

	};


	return (
		<>
		<div style={{placeItems: 'center'}}>
			<h2>Phantom Mail</h2>
			<h3>Sign Up</h3>
			<Form className="w-full max-w-xs" style={{marginInline: 'auto'}} validationBehavior="native" onSubmit={onSubmit}>
				<Input
					isRequired
					errorMessage="Please enter a valid email"
					label="Email"
					labelPlacement="outside"
					name="email"
					placeholder="Enter your email"
					type="email"
					variant="bordered"
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
				<Button style={{width: "100%"}} type="submit" variant="bordered">
					Submit
				</Button>
			</Form>
		</div>
		</>
	)
}

export default SignUp;