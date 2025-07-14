import axios from 'axios';

type TransObj = {
  index: number;
  start: number;
  dur: number;
  end: number;
  text: string;
};

// Helper function to extract video ID from URL or accept ID directly
function extractVideoId(input: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = input.match(regex);
  return match ? match[1] : input.length === 11 ? input : null;
}

async function getTranscript(
  input: string,
  lang: string = 'en'
): Promise<Array<TransObj>> {
  const videoId = extractVideoId(input);
  if (!videoId) {
    console.error('Invalid YouTube URL or video ID:', input);
    return [];
  }

  console.log('Fetching transcript for videoId:', videoId);

  const options = {
    method: 'GET',
    url: `https://subtitles-for-youtube2.p.rapidapi.com/subtitles/${videoId}`,
    params: {
      type: 'None',
      translated: 'None',
    },
    headers: {
      'x-rapidapi-key': '99919ff464msh99b9a47695de3cap1af760jsn282fcfd2e0f1',
      'x-rapidapi-host': 'subtitles-for-youtube2.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('Unexpected response format:', data);
      return [];
    }

    return data.map((item) => ({
      index: item.index,
      start: item.start,
      dur: item.dur,
      end: item.end,
      text: item.text,
    }));
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return [];
  }
}

export default getTranscript;
