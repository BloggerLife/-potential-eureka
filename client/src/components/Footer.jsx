import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <img src={Logo} alt="" />
        <span>
          <a href="https://www.facebook.com/profile.php?id=100063900212377" className="links fb">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://mobile.twitter.com/_wesay"className="links tw">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/invites/contact/?i=1uzrymujeksnm&utm_content=2sf1ad0"className="links ig">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://pin.it/2gsuonm"className="links pi">
            <i class="fab fa-pinterest-p"></i>
          </a>
        </span>
        <span>
          Made with ♥️ at <b>Freelancerlab.net</b>.
        </span>
    </footer>
    </div>
  );
};

export default Footer;
