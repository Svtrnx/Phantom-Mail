"use client"
// import { useState } from "react";
import {Form, Input, Button} from "@nextui-org/react";
import { signIn } from "../../services/auth/AuthService";
import { showToast  } from "../../components/ToastContext";

function SignIn() {
	async function onSubmit(e: any) {
		e.preventDefault();
	
		const data = Object.fromEntries(new FormData(e.currentTarget));
	
		console.log(data.email)
		const response = await signIn(typeof data.email === 'string' ? data.email : "", typeof data.password === 'string' ? data.password : "");
		console.log('signIn:', response);
		if (response.status == 'success') {
			showToast('Success!', "Successfully signed in", 'success')
		}
		else {
			console.log(response.message)
			if (typeof(response.message) == 'object') {
				response.message = response.message[0].msg
				
			}
			showToast('Error!', `${response.message}!`, 'danger')
		}

	};


	return (
		<>
		<div style={{placeItems: 'center'}}>
			<h2>Phantom Mail</h2>
			<h3>Sign In</h3>
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
					isRequired
					errorMessage="Please enter a valid password"
					label="Password"
					labelPlacement="outside"
					name="password"
					placeholder="Enter your password"
					variant="bordered"
					/>
				<Button className="mt-2" style={{width: "100%"}} type="submit" variant="bordered">
					Submit
				</Button>
			</Form>
		</div>
		</>
	)
}

export default SignIn;