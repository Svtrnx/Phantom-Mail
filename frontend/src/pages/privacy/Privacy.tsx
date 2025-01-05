import { NavbarComponent } from "../../components/Navbar";


const Privacy: React.FC<UserData> = ({email, password}) => {

	return (
		<>
			<NavbarComponent email={email} password={password} />
			<div style={{display: 'grid', justifyContent: 'left', marginTop: 50, marginLeft: '1rem'}}>
				<h3 style={{fontWeight: 800}}>Your Personal Information</h3>
				<h3 style={{marginTop: -10}}>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Sites is at your own risk. You should only access the services within a secure environment.
					We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
					We do not knowingly solicit data from or market to children under 18 years of age. By using the Sites, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Sites. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us
				</h3>
				<h3 style={{fontWeight: 800}}>Third Party Websites</h3>
				<h3 style={{marginTop: -10}}>Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We cannot guarantee the safety and privacy of data you provide to any third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. You should review the policies of such third parties and contact them directly to respond to your questions. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website’s own terms and policies.
				</h3>
				<h3 style={{fontWeight: 800}}>Changes to this Privacy Policy</h3>
				<h3 style={{marginTop: -10}}>We may update this privacy policy from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
				</h3>
				<h3 style={{fontWeight: 800}}>Your Acceptance of These Terms</h3>
				<h3 style={{marginTop: -10}}>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
				</h3>

			</div>
		</>
	)
}

export default Privacy;