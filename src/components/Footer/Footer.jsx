import { Container } from "react-bootstrap";
// import SocialLinks from "./SocialLinks";
import { BiLogoMagento } from "react-icons/bi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-5 mt-auto">
      <Container>
        <div className="footer-top d-flex justify-content-between align-items-center">
          <div className="footer-logo d-flex align-items-center">
            <BiLogoMagento />
          </div>
          <div className="footer-top-links d-flex align-items-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer">
              About Us
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer">
              Terms of Use
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="footer-center d-flex justify-content-between align-items-center pt-4 pb-2">
          <p className="text-md-left text-center">
            © 2024 jawzow.com. All Rights Reserved.
          </p>
          <div className="social-media-icons d-flex justify-content-between align-items-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaFacebook className="social-media-icon" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaTwitter className="social-media-icon" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaInstagram className="social-media-icon" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaLinkedin className="social-media-icon" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaYoutube className="social-media-icon" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="text-muted">
            47 BAN. Code § 230 Disclaimer: JawZow shall not be treated as the
            publisher or speaker of any information provided by job publishers.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
