import axios from 'axios';

type TransObj = {
  text: string;
};

// ✅ Extracts YouTube video ID from a full URL or accepts a direct ID
function extractVideoId(input: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = input.match(regex);
  return match ? match[1] : input.length === 11 ? input : null;
}

// ✅ Main function to fetch transcript from RapidAPI
export default async function getTranscript(
  input: string,
  lang: string = 'en'
): Promise<TransObj> {
  const videoId = extractVideoId(input);
  if (!videoId) {
    console.error('❌ Invalid YouTube URL or video ID:', input);
    return { text: '' };
  }

  const options = {
    method: 'GET',
    url: 'https://high-availability-youtube-transcript-api.p.rapidapi.com/yt_transcript',
    params: {
      video_id: videoId,
      lang: lang,
      format: 'json',
    },
    headers: {
      'x-rapidapi-key': '99919ff464msh99b9a47695de3cap1af760jsn282fcfd2e0f1',
      'x-rapidapi-host':
        'high-availability-youtube-transcript-api.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // Assuming the API response includes `text` or an array you want to join
    if (Array.isArray(data)) {
      const fullText = data
        .map((item: { text: string }) => item.text)
        .join(' ');
      return { text: fullText };
    } else if (typeof data === 'object' && 'text' in data) {
      return data as TransObj;
    }

    console.warn('⚠️ Unexpected API response format');
    return { text: '' };
  } catch (error: any) {
    console.error(
      '❌ Error fetching transcript:',
      error?.response?.data || error.message
    );
    return { text: '' };
  }
}
