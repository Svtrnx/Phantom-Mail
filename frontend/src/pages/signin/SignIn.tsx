"use client"
import { useState } from "react";
import {Form, Input, Button} from "@nextui-org/react";
import { signIn } from "../../services/auth/AuthService";
import { showToast  } from "../../components/ToastContext";
import { useNavigate } from 'react-router-dom';
import { MailLogo } from "../../components/utils";
import { delay } from "../../components/utils";

const SignIn = () => {

	const navigate = useNavigate();
	const [requestProcessing, setRequestProcessing] = useState(false);

	async function onSubmit(e: any) {
		setRequestProcessing(true);
		e.preventDefault();
	
		const data = Object.fromEntries(new FormData(e.currentTarget));
	
		console.log(data.email)
		const response = await signIn(typeof data.email === 'string' ? data.email : "", typeof data.password === 'string' ? data.password : "");
		console.log('signIn:', response);
		if (response.status == 'success') {
			showToast('Success!', "Successfully signed in", 'success')
			await delay(1500);
			window.location.reload();
		}
		else {
			console.log(response.message)
			if (typeof(response.message) == 'object') {
				response.message = response.message[0].msg
				
			}
			showToast('Error!', `${response.message}!`, 'danger')
		}
		setRequestProcessing(false);

	};


	return (
		<>
		<div style={{justifyItems: 'center'}}>
			<h2 className="flex">{<MailLogo/>}<h2 className="pt-2">Phantom Mail</h2></h2>
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
				<Button isLoading={requestProcessing} className="mt-2" style={{width: "100%"}} type="submit" variant="ghost">
					Submit
				</Button>
			</Form>
			<Button isDisabled={requestProcessing} onPress={() => {navigate('/signup');}} style={{width: "100%", height: 30, marginTop: 15}} variant="ghost">
				Sign Up
			</Button>
		</div>
		</>
	)
}

export default SignIn;