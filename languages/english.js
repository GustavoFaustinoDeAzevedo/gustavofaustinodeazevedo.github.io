export function english(){
  return `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gustavo de Azevêdo | Portfolio</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <!-- " -->
  <body style="visibility: hidden;">
    <div id="loader" class="center"></div>
    <header>
      <h1>Gustavo de Azevêdo</h1>
      <p>Front-end web developer</p>
    </header>
    <nav>
      <ul>
        <li id="aboutButton" class="active"><a>About</a></li>
        <li id="projectsButton"><a>Projects</a></li>
        <li id="contactButton"><a>Contact</a></li>
      </ul>
    </nav>
    <main>
      <section id="about" class="main-container">
        <h2>About Me</h2>
        <div class="about-container">
          <div class="about-container-inside">
            <p>I'm a recent Computer Engineering graduate with a passion for crafting user-friendly interfaces, HTML, CSS,
              React and dark theme. Equipped with skills in <strong>HTML, CSS, JavaScript, and React.js,</strong> I'm
              eager
              to
              <strong>leverage my
                knowledge</strong> in an entry-level front-end developer role. I believe in <strong>continuous
                learning</strong> and am excited by the
              <strong>prospect of contributing to and learning from a talented team</strong>.
            </p>
          </div>
        </div>
      </section>
      <section id="projects" class="main-container">
        <h2>Projects</h2>
        <div class="project-container">
        </div>
      </section>
      <section id="contact" class="main-container">
        <h2>Contact</h2>
        <div class="form-container-outside">
          <form id="contactForm" action="https://formspree.io/f/mnqelzyz" method="POST" target="placeholder">

            <div class="form-container">
              <div class="form-group">
                <label for="name">Your Name:</label>
                <input type="text" id="name" name="name" placeholder="Your name here" required autocomplete="name">
              </div>
              <div class="form-group">
                <label for="email">Your Email:</label>
                <input type="email" id="email" name="email" placeholder="example@example.com" required autocomplete="email">
              </div>


              <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" placeholder="Your message here" required></textarea>
              </div>
            </div>
            <button type="submit" id="submitBtn" >Send Message</button>
          </form>
        </div>

      </section>
    </main>
    <footer>
      <p>&copy; 2024 Gustavo Faustino de Azevêdo</p>
      <div class="contact-container">
        <address>
          <strong>Phone:</strong>
          +55 (84) 992057810 (Mobile)<br />
          <strong>Email:</strong>
          gustavofaustino18@hotmail.com
        </address>
      </div>
      <div class="social-links-container">
        <a target="_blank" aria-label="Chat on WhatsApp" href="https://wa.me/5584992057810">
          <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
            viewBox="0 0 48 48">
            <path fill="#fff"
              d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z">
            </path>
            <path fill="#fff"
              d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z">
            </path>
            <path fill="#cfd8dc"
              d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z">
            </path>
            <path fill="#40c351"
              d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z">
            </path>
            <path fill="#fff" fill-rule="evenodd"
              d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
              clip-rule="evenodd"></path>
          </svg>
        </a>
        <a target="_blank" aria-label="LinkedIn" href="https://www.linkedin.com/in/gustavo-faustino-de-azevedo">
          <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
            viewBox="0 0 48 48">
            <path fill="#0288D1"
              d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z">
            </path>
            <path fill="#FFF"
              d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z">
            </path>
          </svg>

        </a>
        <a target="_blank" aria-label="GitHub" href="https://github.com/GustavoFaustinoDeAzevedo/">
          <svg class="social-icon github" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
            viewBox="0 0 48 48">
            <path
              d="M44,24c0,8.96-5.88,16.54-14,19.08V38c0-1.71-0.72-3.24-1.86-4.34c5.24-0.95,7.86-4,7.86-9.66c0-2.45-0.5-4.39-1.48-5.9 c0.44-1.71,0.7-4.14-0.52-6.1c-2.36,0-4.01,1.39-4.98,2.53C27.57,14.18,25.9,14,24,14c-1.8,0-3.46,0.2-4.94,0.61 C18.1,13.46,16.42,12,14,12c-1.42,2.28-0.84,4.74-0.3,6.12C12.62,19.63,12,21.57,12,24c0,5.66,2.62,8.71,7.86,9.66 c-0.67,0.65-1.19,1.44-1.51,2.34H16c-1.44,0-2-0.64-2.77-1.68c-0.77-1.04-1.6-1.74-2.59-2.03c-0.53-0.06-0.89,0.37-0.42,0.75 c1.57,1.13,1.68,2.98,2.31,4.19C13.1,38.32,14.28,39,15.61,39H18v4.08C9.88,40.54,4,32.96,4,24C4,12.95,12.95,4,24,4 S44,12.95,44,24z">
            </path>
          </svg>
        </a>
        <a target="_blank" aria-label="Discord" href="https://discord.com/users/gustavofaustino">
          <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
            viewBox="0 0 48 48">
            <radialGradient id="La9SoowKGoEUHOnYdJMSEa_2mIgusGquJFz_gr1" cx="24" cy="10.009" r="32.252"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#8c9eff"></stop>
              <stop offset=".368" stop-color="#889af8"></stop>
              <stop offset=".889" stop-color="#7e8fe6"></stop>
              <stop offset="1" stop-color="#7b8ce1"></stop>
            </radialGradient>
            <path fill="url(#La9SoowKGoEUHOnYdJMSEa_2mIgusGquJFz_gr1)"
              d="M40.107,12.15c-0.065-0.102-0.139-0.182-0.236-0.255c-0.769-0.578-4.671-3.339-9.665-3.875	c-0.01-0.001-0.048-0.003-0.057-0.003c-0.098,0-0.183,0.057-0.224,0.14l-0.269,0.538c0,0-0.001,0-0.001,0	c-0.017,0.033-0.026,0.071-0.026,0.111c0,0.109,0.07,0.202,0.168,0.236c0.006,0.002,0.048,0.011,0.063,0.014	c4.267,1.028,6.863,2.89,9.149,4.945c-4.047-2.066-8.044-4.001-15.009-4.001s-10.961,1.936-15.009,4.001	c2.286-2.055,4.882-3.917,9.149-4.945c0.015-0.004,0.057-0.012,0.063-0.014c0.098-0.034,0.168-0.127,0.168-0.236	c0-0.04-0.009-0.078-0.026-0.111c0,0-0.001,0-0.001,0l-0.269-0.538c-0.041-0.083-0.125-0.14-0.224-0.14	c-0.009,0-0.048,0.002-0.057,0.003c-4.994,0.536-8.896,3.297-9.665,3.875c-0.097,0.073-0.17,0.153-0.236,0.255	c-0.708,1.107-5.049,8.388-5.892,21.632c-0.009,0.142,0.04,0.289,0.135,0.395c4.592,5.144,11.182,5.752,12.588,5.823	c0.167,0.008,0.327-0.065,0.427-0.199l1.282-1.709c0.1-0.134,0.046-0.322-0.111-0.379c-2.705-0.986-5.717-2.7-8.332-5.706	C11.231,34.457,16.12,37,24,37s12.769-2.543,16.009-4.993c-2.616,3.006-5.627,4.719-8.332,5.706	c-0.157,0.057-0.211,0.245-0.111,0.379l1.282,1.709c0.101,0.134,0.26,0.208,0.427,0.199c1.407-0.072,7.996-0.679,12.588-5.823	c0.095-0.106,0.144-0.253,0.135-0.395C45.156,20.538,40.815,13.257,40.107,12.15z">
            </path>
            <ellipse cx="30.5" cy="26" opacity=".05" rx="4.5" ry="5"></ellipse>
            <ellipse cx="30.5" cy="26" opacity=".05" rx="4" ry="4.5"></ellipse>
            <ellipse cx="30.5" cy="26" fill="#fff" rx="3.5" ry="4"></ellipse>
            <ellipse cx="17.5" cy="26" opacity=".05" rx="4.5" ry="5"></ellipse>
            <ellipse cx="17.5" cy="26" opacity=".05" rx="4" ry="4.5"></ellipse>
            <ellipse cx="17.5" cy="26" fill="#fff" rx="3.5" ry="4"></ellipse>
          </svg>
        </a>
        <a target="_blank" aria-label="X (twitter)" href="https://twitter.com/Gustavo87799635">
          <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
            viewBox="0 0 48 48">
            <linearGradient id="U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1" x1="4.338" x2="38.984" y1="-10.056" y2="49.954"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#4b4b4b"></stop>
              <stop offset=".247" stop-color="#3e3e3e"></stop>
              <stop offset=".686" stop-color="#2b2b2b"></stop>
              <stop offset="1" stop-color="#252525"></stop>
            </linearGradient>
            <path fill="url(#U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1)"
              d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28	C42,40.209,40.209,42,38,42z">
            </path>
            <path fill="#fff"
              d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z">
            </path>
            <polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon>
            <polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
          </svg>
        </a>
      </div>
    </footer> 
    <script src="./script.js"></script>
  </body>

  <iframe name="placeholder" style="display: none; visibility: hidden;"></iframe>
  `;
}