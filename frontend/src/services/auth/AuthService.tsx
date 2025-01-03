import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/v1';
const API_URL = 'https://api-phantom-mail.vercel.app/api/v1';


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
  
  