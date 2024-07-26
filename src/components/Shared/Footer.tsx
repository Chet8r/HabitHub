// // src/components/Shared/Footer.js
// import styled from "styled-components";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

// const FooterContainer = styled.footer`
//   width: 100%;
//   background-color: #121212;
//   color: white;
//   padding: 20px 0;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-family: Arial, Helvetica, sans-serif;
//   box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
// `;

// const FooterContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   max-width: 1200px;
//   width: 100%;
//   padding: 0 20px;

//   @media (min-width: 768px) {
//     flex-direction: row;
//     justify-content: space-between;
//   }
// `;

// const FooterSection = styled.div`
//   margin-bottom: 20px;
//   text-align: center;

//   @media (min-width: 768px) {
//     margin-bottom: 0;
//     text-align: left;
//   }
// `;

// const SocialMediaLinks = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 15px;

//   @media (min-width: 768px) {
//     justify-content: flex-start;
//   }
// `;

// const SocialMediaLink = styled.a`
//   color: white;
//   font-size: 1.5rem;
//   transition: color 0.3s;

//   &:hover {
//     color: #1db954; /* Spotify Green */
//   }
// `;

// const FooterText = styled.p`
//   margin: 5px 0;
// `;

// const Footer = () => {
//   return (
//     <FooterContainer>
//       <FooterContent>
//         <FooterSection>
//           <h4>Contact Us</h4>
//           <FooterText>Email: contact@example.com</FooterText>
//           <FooterText>Phone: +123 456 7890</FooterText>
//         </FooterSection>
//         <FooterSection>
//           <h4>Follow Us</h4>
//           <SocialMediaLinks>
//             <SocialMediaLink
//               href="https://www.facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaFacebook />
//             </SocialMediaLink>
//             <SocialMediaLink
//               href="https://www.twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaTwitter />
//             </SocialMediaLink>
//             <SocialMediaLink
//               href="https://www.instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaInstagram />
//             </SocialMediaLink>
//           </SocialMediaLinks>
//         </FooterSection>
//         <FooterSection>
//           <h4>Legal</h4>
//           <FooterText>
//             &copy; 2024 Your Company. All rights reserved.
//           </FooterText>
//           <FooterText>Privacy Policy | Terms of Service</FooterText>
//         </FooterSection>
//       </FooterContent>
//     </FooterContainer>
//   );
// };

// export default Footer;
