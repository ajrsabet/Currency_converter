# Currency Converter

## Whatcom Community College 
## SD 230 Final project, part 3
## Instructor: Gavin Stuart

## Description
Currency Converter is a web application that allows users to convert currencies based on real-time exchange rates. The application is built using Node.js and Express, and it is hosted live at [Currency Converter](https://currency-converter-d9k7.onrender.com/).

## Features
- **Real-time Currency Conversion**: Convert between multiple currencies using up-to-date exchange rates.
- **Express Server**: The application is powered by an Express server for fast and efficient request handling.
- **Features to be Developed**: User login, other pages including a money exchange API, and other tools

## Technologies Used
- **Node.js**: Backend runtime for building the server.
- **Express.js**: Web framework for handling routes and server-side logic.
- **HTML/CSS**: Frontend structure and styling.
- **EJS**: Templating engine for rendering dynamic pages.
- **dotenv**: For securely managing API keys.

## Installation
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/currency-converter.git
   cd currency-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API key:
   ```env
   API_KEY=your-exchange-rate-api-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage
1. Visit the live site: [Currency Converter](https://currency-converter-d9k7.onrender.com/).
2. Enter the currency you want to convert from and to.
3. Input the amount.
4. Click "Convert" to see the result.

## File Structure
```
/currency-converter
├── /public
│   ├── styles.css
│   └── script.js
├── /views
│   ├── index.ejs
│   ├── other views
│   └── /partials
│       ├── head.ejs
│       ├── header.ejs
│       └── footer.ejs
├── server.js
├── package.json
├── .env
└── README.md
```

## Deployment
The application is deployed on [Render](https://render.com). Changes pushed to the repository are automatically deployed.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- **Render** for hosting the live application.
- **Express** and **Node.js** for powering the backend.
- Open-source community for tools and libraries.

---
Visit the live site: [Currency Converter](https://currency-converter-d9k7.onrender.com/) and start converting currencies today!


