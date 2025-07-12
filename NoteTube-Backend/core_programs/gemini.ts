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
  const trans: Array<TransObj> = await getTranscript(videoId);

  const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  let subprompt = '';
  trans.forEach((element) => {
    subprompt += element.text + ' ';
  });
  const prompt = subprompt + `\n${mesg}`;

  const result = await model.generateContent(prompt);
  const output = await result.response.text();
  console.log(output);
  return output;
};

export default getGeminiRes;
