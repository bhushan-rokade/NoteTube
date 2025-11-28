import getTranscript from './youtube-transcript';
const { GoogleGenerativeAI } = require('@google/generative-ai');

type TransObj = {
  index: number;
  start: number;
  dur: number;
  end: number;
  text: string;
};

require('dotenv').config();

const getGeminiRes = async (videoId: string, mesg: string) => {
  // Fetch transcript using your updated RapidAPI-based function
  console.log('Fetching transcript for videoId:', videoId);
  const trans: Array<TransObj> = await getTranscript(videoId);
  console.log('Transcript generated');
  const genAI = new GoogleGenerativeAI(
    process.env.API_KEY || '' // Ensure API_KEY is set in .env file
  ); // use environment variable correctly
  const model = genAI.getGenerativeModel({ model : "gemini-2.5-flash" });

  let subprompt = '';
  trans.forEach((element) => {
    subprompt += element.text + ' ';
  });
  const prompt = subprompt + `\n${mesg}`;

  const result = await model.generateContent(prompt);
  const output = await result.response.text();
  return output;
};

export default getGeminiRes;
