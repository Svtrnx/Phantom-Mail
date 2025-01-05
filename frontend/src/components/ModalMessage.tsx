import React from "react";
import { 
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Avatar,
} from "@nextui-org/react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useIsMobile } from "../hooks/useIsMobileHook";
import { MailIcon } from "../assets/MailIcon";

const ModalMessage: React.FC<ModalMessageProps> = ({isOpen, onClose, html, createdAt, name, address, to}) => {

	const isMobile = useIsMobile();

	// const sanitizedHtml = DOMPurify.sanitize(html.join(""));
	
	const createdDate = parseISO(createdAt);
	const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });


	return (
		<Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
				<ModalContent style={{minWidth: '90%'}}>
				{(onClose) => (
					<>
					<ModalHeader className="flex flex-col gap-1">
						<div className="flex items-center font-mono text-sm">
							<div style={{marginLeft: isMobile ? 0 : 15, marginRight: isMobile ? 15 : 0}}>
								<Avatar
									size="sm"
									isBordered
									as="button"
									style={{opacity: 0.8, width: '30px', height: "30px"}}
									className='transition-transform w-1'
									name={name}
								/>
							</div>
							<div style={{marginLeft: isMobile ? 0 : 15}}>
								<h5 style={{marginLeft: 3, fontWeight: '100', fontSize: isMobile ? 13 : 16}}>{name} <span style={{marginLeft: 3}}>{address}</span></h5>
								<h5 style={{display: 'flex', alignItems: 'center', fontWeight: '100', fontSize: isMobile ? 13 : 16}}><span style={{marginRight: 5}}><MailIcon /></span>{to}</h5>
							</div>
							{isMobile ? null :
							<h5 style={{fontWeight: '100', fontSize: isMobile ? 13 : 16, marginInlineStart: 'auto', marginRight: 20}} className="font-mono text-sm">{timeAgo}</h5>}
						</div>
						{isMobile ? <h5 style={{fontWeight: '100', fontSize: isMobile ? 13 : 16}} className="font-mono text-sm">{timeAgo}</h5> : null}
					</ModalHeader>
					<ModalBody>
					<div dangerouslySetInnerHTML={{ __html: html[0] }}
					/>
					</ModalBody>
					<ModalFooter style={{display: 'grid', justifyContent: 'center'}}>
						<Button color="danger" variant="light" onPress={onClose}>
						Close
						</Button>
					</ModalFooter>
					</>
				)}
				</ModalContent>
		</Modal>
	)
}

export default ModalMessage;