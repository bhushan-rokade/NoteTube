import { useRef, useState } from 'react';
import axios from 'axios';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useReactToPrint } from 'react-to-print';
import FormView from '../components/FormView.tsx';
import TypewriterText from '../components/TypewriterText.tsx';
import utils from '../utils/consts.ts';
export default function Home() {
  const outputDivRef = useRef<HTMLDivElement>(null);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [download, setDownload] = useState(false);
  const componentRef = useRef(null);
  const serverOverloadMessage =
    '#⚠️ Server Overloaded\n\n' +
    'The server is currently experiencing high traffic or technical difficulties.\n\n' +
    'Please try again after some time. We appreciate your patience! 🙏\n\n' +
    '---\n\n' +
    '**What you can do:**\n' +
    '- Wait a few minutes and refresh the page.\n' +
    '- Ensure you have a stable internet connection.\n' +
    '\n' +
    'Thank you for your understanding!';

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'NoteTube-Print',
    pageStyle: `
    @page {
      margin-block: 2rem;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
    }
  `,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const videoId = extractYouTubeVideoId(link);
    const data = {
      youtubeURL: link,
      message: description,
    };
    if (description.trim() === '') {
      alert('Please enter a description for the notes.');
    }
    setLoading(true);
    if (iFrameRef.current && videoId) {
      iFrameRef.current.src = `https://www.youtube.com/embed/${videoId}`;

      if (outputDivRef.current) {
        outputDivRef.current.style.display = 'flex';
      }
      if (iFrameRef.current) {
        iFrameRef.current.style.display = 'block';
      }
    } else {
      alert('Invalid YouTube link');
    }
    await axios
      .post(utils.BASE_URL + utils.getResponse, data)
      .then((res) => {
        if (res.data && res.data.response) {
          setLoading(false);
          setNotes(res.data.response);
        } else {
          alert('No response received from the server');
        }
      })
      .catch(() => {
        setLoading(false);
        setNotes(serverOverloadMessage);
      });
  };

  const handleClose = () => {
    if (outputDivRef.current) {
      outputDivRef.current.style.display = 'none';
    }
    if (iFrameRef.current) {
      iFrameRef.current.style.display = 'none';
    }
  };

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className='Container'>
      <div className='overlay'>
        <div className='headerOverlay'>
          <img src='/notetube-icon.png' className='logoOverlay' alt='logo' />
          <h1 className='logoTextOverlay'>NoteTube</h1>
        </div>
      </div>
      <div className='inputDiv'>
        <div className='header'>
          <img src='/notetube-icon.png' className='logo' alt='logo' />
          <h1 className='logoText'>NoteTube</h1>
        </div>
        <FormView
          link={link}
          setLink={setLink}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
        />

        <iframe
          className='iFrame'
          ref={iFrameRef}
          src=''
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        />
      </div>
      <div className='outputDiv' ref={outputDivRef}>
        <div className='headerDiv'>
          <h1>Notes</h1>
          <div className='actionDiv'>
            <a
              className='closeBtn'
              title='Download Notes'
              style={{ display: download ? 'block' : 'none' }}
              onClick={handlePrint}>
              <i className='bi bi-download'></i>
            </a>
            <a className='closeBtn' title='Close' onClick={handleClose}>
              <i className='bi bi-x-lg'></i>
            </a>
          </div>
        </div>
        <div className='markdownContainer' ref={componentRef}>
          {loading ? (
            <div className='spinnerDiv'>
              <div className='spinner'></div>
              <h1>Hold On tight</h1>
              <h3>It may take a few seconds</h3>
            </div>
          ) : (
            <TypewriterText
              text={notes}
              speed={1}
              onDone={() => setDownload(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
