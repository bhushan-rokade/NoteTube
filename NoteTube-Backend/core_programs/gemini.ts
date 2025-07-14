import getTranscript from './youtube-transcript';
const { GoogleGenerativeAI } = require('@google/generative-ai');

type TransObj = {
  text: string;
};

require('dotenv').config();

const getGeminiRes = async (videoId: string, mesg: string) => {
  const trans: TransObj = await getTranscript(videoId);

  const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  let subprompt = trans.text;
  const prompt = subprompt + `\n${mesg}`;

  const result = await model.generateContent(prompt);
  const output = await result.response.text();
  return output;
};

export default getGeminiRes;
