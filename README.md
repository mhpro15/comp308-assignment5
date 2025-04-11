# AI Article Summarizer

This project implements an AI-powered article summarizer using Google's Gemini AI model. It processes articles about environmental topics and generates concise summaries.

## Implementation Details

### Technology Stack

- **Node.js**: Runtime environment
- **LangChain**: Framework for working with language models
- **Google Generative AI (Gemini)**: AI model for text summarization
- **dotenv**: Environment variable management

### Key Components

1. **AI Model Configuration**

   - Utilizes the Gemini 1.5 Flash model
   - Configured with safety settings to prevent harmful content
   - Temperature set to 0.3 for more focused and consistent outputs
   - Maximum output tokens set to 2048 for comprehensive summaries

2. **Prompt Engineering**

   - Custom system prompt defining the AI as an "environment researcher assistant"
   - Structured to request summaries of at least 400 words
   - Human prompt template that accepts article content as input

3. **Article Processing**
   - Reads article content from text files
   - Processes each article through the AI model
   - Exports summaries to separate text files

## Selected Articles

The summarizer processes two articles focused on environmental topics:

1. **Article 1**: "Technology's Environmental Impact"

   - Source: https://www.greenmatch.co.uk/blog/technology-environmental-impact
   - Content: Discusses the environmental cost of technology, including energy consumption, e-waste, and carbon emissions from the tech industry

2. **Article 2**: "Accelerating Climate Action with AI"
   - Source: https://blog.google/outreach-initiatives/sustainability/report-ai-sustainability-google-cop28/
   - Content: Explores how AI can help mitigate global greenhouse gas emissions and Google's approach to sustainable AI development

## Testing and Validation

The solution was tested through the following process:

1. **Environment Setup**

   - Created a Node.js project with necessary dependencies
   - Configured environment variables for API access

2. **Implementation Testing**

   - Verified file reading functionality
   - Tested AI model connectivity and response generation
   - Validated summary export functionality

3. **Output Validation**
   - Reviewed generated summaries for accuracy and completeness
   - Confirmed that summaries meet the minimum length requirement
   - Verified that summaries maintain the key information from source articles

## Usage

To run the summarizer:

1. Ensure you have a valid Google API key in your `.env` file
2. Run the script with Node.js:
   ```
   node summaryAI.js
   ```
3. Check the generated `summary1.txt` and `summary2.txt` files for results

## Future Improvements

Potential enhancements for the summarizer:

- Web scraping to directly fetch articles from URLs
- Support for additional article formats
- Customizable summary length and focus areas
- Integration with a web interface for easier interaction
