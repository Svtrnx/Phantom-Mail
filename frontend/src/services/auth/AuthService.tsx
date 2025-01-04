import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`;
// const API_URL = 'http://localhost:8000/api/v1';
// const API_URL = 'https://splendid-paulita-kenzo-md-f258b668.koyeb.app/api/v1';


export async function signIn(email: string, password: string) {
	try {
		const response = await axios.post(
			`${API_URL}/auth/signin`,
			{},
			{
				params: {
				email: email,
				password: password,
				},
				headers: {
				'Content-Type': 'application/json',
				},
				withCredentials: true, 
			}
		);
		return { status: 'success', message: response.data };
	} catch (error: any) {
		console.log(error.response.data.detail);
		return {status: 'error', message: error.response.data.detail};
	}
}
  
export async function signUp(email: string, password: string) {
	try {
		const response = await axios.post(
			`${API_URL}/auth/authentication`,
			{},
			{
				params: {
				email: email,
				password: password,
				},
				headers: {
				'Content-Type': 'application/json',
				},
				withCredentials: true, 
			}
		);
		return { status: 'success', message: response.data };
	} catch (error: any) {
		console.log(error.response.data.detail);
		return {status: 'error', message: error.response.data.detail};
	}
}
  

export async function logout() {
	try {
		const response = await axios.delete(
			`${API_URL}/auth/logout`, {
				headers: {
				'Content-Type': 'application/json',
				},
				withCredentials: true, 
			}
		);
		return { status: 'success', message: response.data };
	} catch (error: any) {
		console.log(error.response.data.detail);
		return {status: 'error', message: error.response.data.detail};
	}
}
  
  