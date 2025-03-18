# Desktop Portfolio (Work in Progress)

This is a desktop portfolio project built with HTML, CSS, and JavaScript. **Note: This project is still a work in progress.**

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Building the Project](#building-the-project)
  - [Linting](#linting)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contribution](#contribution)
- [Contact](#contact)
- [Project Details](#project-details)
  - [Main Files](#main-files)
  - [Old Portfolio](#old-portfolio)
  - [Public Assets](#public-assets)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Structure

```
.gitignore
.hintrc
index.html
package.json
readme.txt
style.css
vite.config.js
Old_Portfolio/
    .gitignore
    handleForm.js
    index.html
    languageDecision.js
    sectionsHandler.js
    style.css
    assets/
        Bandeira_do_Brasil.svg
        Flag_of_the_United_States.svg
        notes_project.png
    languages/
        english.js
        portuguese.js
public/
    vite.svg
    icons/
        arrow_down_tray.svg
        arrows_pointing_in.svg
        ...
src/
    App.jsx
    main.jsx
    actions/
        ...
    components/
        ...
    data/
    hooks/
    projects/
    reducers/
    scripts/
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/GustavoFaustinoDeAzevedo/GustavoFaustinoDeAzevedo.github.io
    ```
2. Navigate to the project directory:
    ```sh
    cd GustavoFaustinoDeAzevedo.github.io
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Project

To start the development server, run:
```sh
npm run dev
```

### Building the Project

To build the project for production, run:
```sh
npm run build
```

### Linting

To lint the project, run:
```sh
npm run lint
```

## Features

- Responsive design
- Interactive desktop icons
- Window management (minimize, maximize, close)
- Taskbar with start button and clock
- Contact form

## Technologies Used

- HTML
- CSS (with custom properties and media queries)
- JavaScript (React)
- Vite (build tool)
- Google Fonts (Poppins)

## Usage

Once the project is running, you can interact with the desktop icons to open different windows. The taskbar at the bottom allows you to manage open windows and access the start menu. The contact form can be used to send messages (not working for now).

## Screenshots

![Screenshot 1](public/images/screenshot1.png)
![Screenshot 2](public/images/screenshot2.png)

## Contribution

If you would like to contribute to this project, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## Contact

You can reach me at [gustavofaustino18@hotmail.com](mailto:gustavofaustino18@hotmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/gustavo-faustino-de-azevedo/).

## Project Details

### Main Files

- `index.html`: The main HTML file.
- `style.css`: The main CSS file.
- `src/main.jsx`: The main JavaScript entry point.

### Old Portfolio

The `Old_Portfolio` directory contains the previous version of the portfolio with its own assets and scripts.

### Public Assets

The `public` directory contains public assets like icons and images.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Fonts by [Google Fonts](https://fonts.google.com/)