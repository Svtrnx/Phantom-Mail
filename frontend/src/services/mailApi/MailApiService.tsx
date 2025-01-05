import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`;


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

export async function getMessage(message_id: string) {
	try {
		const response = await axios.get(
			`${API_URL}/mail/messages/${message_id}`, {
				params: {
					message_id: message_id
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

export async function patchMessage(message_id: string) {
	try {
		const response = await axios.patch(
			`${API_URL}/mail/messages/${message_id}`, 
				{},
				{
				params: {
					message_id: message_id,
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
  
  