import "./fab.css";

export default function Fab() {
    function actionToggle() {
        const action = document.querySelector('.action');
        action.classList.toggle('active')
      }
    return (  
    <div className="action" onClick={actionToggle}>
        <span>+</span>
        <ul>
            <small className="heading">Lets Connect On</small>
            <a href="https://www.facebook.com/profile.php?id=100063900212377" className="links">
              <li className="fB"><i className="fab fa-facebook-f"></i> <small className="name">Facebook Page</small></li>
            </a>
            <a href="https://mobile.twitter.com/_wesay"className="links">
              <li className="tW"><i className="fab fa-twitter"></i> <small className="name">Twitter Handle</small></li>
            </a>
            <a href="https://www.instagram.com/invites/contact/?i=1uzrymujeksnm&utm_content=2sf1ad0"className="links">
              <li className="iG"><i className="fab fa-instagram"></i> <small className="name">Instagram Handle</small></li>
            </a>
            <a href="https://pin.it/2gsuonm"className="links">
              <li className="pI"><i className="fab fa-pinterest-p"></i> <small className="name">Pinterest Handle</small></li>
            </a>
        </ul>
    </div>
  );
}
