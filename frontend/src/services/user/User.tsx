import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`;


export async function getMe() {
	try {
		const response = await axios.get(
			`${API_URL}/user/me`, {
				params: {},
				headers: {
				'Content-Type': 'application/json',
				},
				withCredentials: true, 
			}
		);
		return response.data
	} catch (error: any) {
		console.log(error.response?.data?.detail);
		// return { status: 'error', message: error.response?.data?.detail || 'An error occurred' };
	}
}
  
  