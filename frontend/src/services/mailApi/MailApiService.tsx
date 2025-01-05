import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`;
// const API_URL = 'http://localhost:8000/api/v1';
// const API_URL = 'https://splendid-paulita-kenzo-md-f258b668.koyeb.app/api/v1';


export async function getDomain() {
	try {
		const response = await axios.get(
			`${API_URL}/mail/domain`, {
				params: {},
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
 

export async function getMessages() {
	try {
		const response = await axios.get(
			`${API_URL}/mail/messages`, {
				params: {},
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
  
  