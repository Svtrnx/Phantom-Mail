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
	};
}

export {};
  