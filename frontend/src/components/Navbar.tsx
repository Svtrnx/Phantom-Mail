import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarContent,
	NavbarItem,
	Link,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
} from "@nextui-org/react";
import { useIsMobile } from "../hooks/useIsMobileHook";
import { MailLogo } from "./utils";
import { usePageRoute } from "../hooks/usePageRouteHook";
import { showToast } from "./ToastContext";
import { logout } from "../services/auth/AuthService";
import { delay } from "./utils";

export const NavbarComponent: React.FC<UserData> = ({email, password}) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const isMobile = useIsMobile();
	const route = usePageRoute();

	

	const handleCopy = (data: string) => {
		var copy = email || password
		if (data == 'Password') {
			copy = password
		}
		else {
			copy = email
		}
		navigator.clipboard.writeText(copy).then(() => {
			showToast('Success!', `${data} copied to clipboard`, 'success')
		}).catch(err => {
			showToast('Error!', `Failed to copy ${data}`, 'danger')
			console.log(err);
		});
	};

	async function logoutFunc() {
		const response = await logout();
		console.log('logout:', response);
		if (response.status == 'success') {
			showToast('Success!', "Successfully logged out!", 'success')
			await delay(2000);
			window.location.reload();
		}
		else {
			console.log(response.message)
			if (typeof(response.message) == 'object') {
				response.message = response.message[0].msg
				
			}
			showToast('Error!', `${response.message}!`, 'danger')
		}
		
		
	}

	const menuItems = [
		"Email Service",
		"API",
		"Privacy",
	];

	console.log(password)

  	return (
		<>
		<Navbar className="bg-background/20" isBlurred={true} shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className={isMobile ? "" : "hidden"}
				/>
				<NavbarBrand>
				<MailLogo />
				<p className="font-bold text-inherit">Phantom Mail</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className={isMobile ? "hidden" : "sm:flex gap-4"} justify="center">
				<NavbarItem isActive={route === "home"}>
				<Link color={route === "home" ? "primary" : "foreground"} href="/home">
					Email Service
				</Link>
				</NavbarItem>
				<NavbarItem>
				<Link color="foreground" href="#">
					API
				</Link>
				</NavbarItem>
				<NavbarItem isActive={route === "privacy"}>
				<Link color={route === "privacy" ? "primary" : "foreground"} href="/privacy">
					Privacy
				</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
				<Link href="#">Login</Link>
				</NavbarItem>
				<NavbarItem>
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
					<Avatar
						size="sm"
						isBordered
						as="button"
						style={{width: '30px', height: "30px"}}
						className="w-0 transition-transform"
						name={email}
					/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
					<DropdownItem onPress={() => {handleCopy('Email');}} key="profile" className="h-14 gap-2">
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{email}</p>
					</DropdownItem>
					<DropdownItem onPress={() => {handleCopy('Password');}} key="copy_password" color="primary">Copy Password</DropdownItem>
					<DropdownItem onPress={logoutFunc} key="logout" color="danger">
						Log Out
					</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
				<NavbarMenuItem key={`${item}-${index}`}>
					<Link
					className="w-full"
					color={
						item.toLowerCase() === route.toLowerCase() 
						? "primary" 
						: item === "Email Service" && route === "home" 
						? "primary" 
						: "foreground"
					}
					href={item === "Email Service" ? "/home" : `/${item.toLowerCase()}`}
					size="lg"
					>
					{item}
					</Link>
				</NavbarMenuItem>
				))}
			</NavbarMenu>
    	</Navbar>
		</>
  	)
}
