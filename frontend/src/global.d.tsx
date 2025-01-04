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
	
}

export {};
  