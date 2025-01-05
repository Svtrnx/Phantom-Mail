import React, {useEffect} from "react";
import { NavbarComponent } from "../../components/Navbar";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useIsMobile } from "../../hooks/useIsMobileHook";
import { getMessages } from "../../services/mailApi/MailApiService";
import { Spinner, Avatar } from "@nextui-org/react";
import { motion } from 'framer-motion';

import { MailIcon } from "../../assets/MailIcon";
import { ArrowsIcon } from "../../assets/ArrowsIcon";
import "./styles.css";


const Home: React.FC<UserDataHome> = ({email, password, lottieFile}) => {
	const isMobile = useIsMobile();
	const [loading, setLoading] = React.useState(true);
	const [isEmpty, setIsEmpty] = React.useState(true);
	const [messages, setMessages] = React.useState<Message[]>([]);

	useEffect(() => {

		async function fetchMessages() {
			const response = await getMessages();
			console.log('getMessages:', response.message.messages[0]);
			if (response.status == 'success') {
				if (response.message.messages.length > 0) {
					setIsEmpty(false);
					console.log(response.message)
					setMessages(response.message.messages);
				}
			}
			setLoading(false);
		}
		fetchMessages()
		const intervalGetTasks = setInterval(fetchMessages, 10000);
        return () => {
            clearInterval(intervalGetTasks);
        };

	}, [])

	return (
		<>
		<div style={{height: 'calc(100% - 104px)'}}>
			<NavbarComponent email={email} password={password}/>
			<div style={{height: '100%'}}>
				<div style={{height: '100%', width: isMobile ? '90%' : '80%', margin: 'auto', marginTop: '20px', overflow: 'auto'}} className="bg-background/25">
					{loading ?
						<div style={{display: 'grid', justifyItems: 'center', height: '100%'}}>
							<Spinner color="secondary" label="Loading..." labelColor="secondary" />
						</div>
					:
					<motion.div
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div style={{display: 'grid', justifyItems: 'center'}}>
							<h2 className="home-head-inbox">Inbox</h2>
							{isEmpty ?
								<div className="home-empty" style={{opacity: '0.75', textAlign: 'center', width: '100%'}}>
									<h2 className="font-mono text-sm" style={{fontSize: isMobile ? '16px' : '', fontWeight: 300}}>Your inbox is empty</h2>
									<div style={{width: isMobile ? '100%' : '70%'}}>
									<DotLottieReact
										src={lottieFile}
										loop
										autoplay
										speed={0.8}
										/>
									</div>
								</div>
							:
							<>
							{messages.map((message, index) => (
								<>
								<div key={index} className="home-message-wrapper">
									<div style={{marginLeft: 15}}>
										<Avatar
											size="sm"
											isBordered
											as="button"
											style={{opacity: 0.8}}
											className={`transition-transform ${message.seen ? '' : 'ring-22'}`}
											name={message.from.name}
										/>
									</div>
									<div style={{marginLeft: isMobile ? 0 : 15}}>
										<h2 style={{marginLeft: 3}}>{message.from.name}</h2>
										<h2 style={{display: 'flex', alignItems: 'center'}}><span style={{marginRight: 5}}><MailIcon /></span>{message.from.address}</h2>
									</div>
									{isMobile ?
										<div></div>
										:
									<div style={{marginInline: 'auto', display: 'grid', marginLeft: 30}}>
										<h2 style={{maxWidth: "300ch"}}>{message.subject}</h2>
										<h2 style={{maxWidth: "300ch"}}>{message.intro}</h2>
									</div>
									}
									<div 
										style={{ marginInlineStart: 'auto', marginRight: 15, display: 'inline-block', cursor: 'pointer'}}
										className="arrows-wrapper"
										>
										<ArrowsIcon />
									</div>
								</div> 
								</>
							))}
							</> 
							}
						</div>
					</motion.div> 
					}
				</div>
			</div>
		</div>
		</>
	)
}

export default Home;