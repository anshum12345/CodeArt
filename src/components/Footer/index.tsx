import GitHub from "../GitHub";

import "./index.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <img
          src="https://img.freepik.com/free-vector/programming-concept-it-education-student-writing-software-coding-application-java-script-it-project-digital-technology-development-website-interface-vector-illustration_613284-1712.jpg?t=st=1729531035~exp=1729534635~hmac=16df4e806e5e606de8068822b26552ffb128bab032f0f27a10be67c4ded18a8f&w=740"
          alt="App Logo"
          className="logo"
        />
        <p>CodeArt</p>
      </div>
      {/* <div className="footer-section">
        <a href="/#" target="_blank" rel="noreferrer">
          Pranjal
        </a>
      </div> */}
      <div className="footer-section">
        <a
          href="https://anshumdwivedi.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
         Visitportfolio
        </a>
        <svg
          xmlns="https://img.freepik.com/free-vector/programming-concept-it-education-student-writing-software-coding-application-java-script-it-project-digital-technology-development-website-interface-vector-illustration_613284-1712.jpg?t=st=1729531035~exp=1729534635~hmac=16df4e806e5e606de8068822b26552ffb128bab032f0f27a10be67c4ded18a8f&w=740"
          width="13"
          height="13"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
          />
        </svg>
      </div>
      <GitHub />
    </footer>
  );
}
