// global.d.ts
declare global {
	interface LoadingProps {
		loading: boolean;
	}

	interface AuthProps {
		setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	}

	interface UserData {
		email: string;
		password: string;
	}

	interface UserDataHome {
		email: string;
		password: string;
		lottieFile: string;
	}

	type Message = {
		from: { name: string, address: string };
		intro: string;
		subject: string;
		seen: boolean;
		id: string;
	};

	type MessageProps =  {
		date: string;
		name: string;
		address: string;
		to: string;
	}

	interface ModalMessageProps {
		isOpen: boolean;
		onClose: () => void;
		onOpenChange: () => void;
		html: string[];
		createdAt: string;
		name: string;
		address: string;
		to: string;
	}
}

export {};
  