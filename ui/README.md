# AI Article Summarizer UI

A simple React application that provides a user interface for the AI Article Summarizer. This application allows users to input text or upload files for summarization using Google's Gemini AI.

## Features

- Text input for article summarization
- File upload support for .txt files
- Real-time summarization using Google's Gemini AI
- Responsive design for various screen sizes

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add your Google API key:
     ```
     GOOGLE_API_KEY=your_google_api_key_here
     PORT=3001
     ```

## Running the Application

### Development Mode

To run the application in development mode:

```
npm run dev
```

This will start the Vite development server.

### Production Mode

To build and run the application in production mode:

```
npm run start
```

This will build the React application and start the Express server.

## API Endpoints

- `POST /api/summarize`: Summarizes the provided article text
  - Request body: `{ "article": "Your article text here" }`
  - Response: `{ "summary": "Generated summary here" }`

## Technologies Used

- React
- Vite
- Express.js
- Google Generative AI (Gemini)
- LangChain
