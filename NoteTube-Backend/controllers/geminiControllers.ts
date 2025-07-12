import getGeminiRes from '../core_programs/gemini';
const geminiController = async (req: any, res: any) => {
  try {
    const { youtubeURL, message } = req.body;

    // Validate the inputs (youtubeURL and message are required)
    if (!youtubeURL || !message) {
      return res
        .status(400)
        .json({ error: 'youtubeURL and message are required' });
    }

    // Process the data (This can be your logic to summarize the YouTube video or handle the message)
    const responseMessage: string = await getGeminiRes(youtubeURL, message);

    // Respond with the processed result
    res.status(200).json({ response: responseMessage });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default geminiController;
