import { useRef, useState } from 'react';
import axios from 'axios';
import utils from './utils/consts';
import './App.css';
import MarkDownViewer from './MarkDownViewer';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useReactToPrint } from 'react-to-print';
export default function Home() {
  const outputDivRef = useRef<HTMLDivElement>(null);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const componentRef = useRef(null);

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
      .post(`${utils.BASE_URL}${utils.getResponse}`, data)
      .then((res) => {
        if (res.data && res.data.response) {
          setLoading(false);
          setNotes(res.data.response);
        } else {
          alert('No response received from the server');
        }
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
      <div className='inputDiv'>
        <div className='header'>
          <img src='/notetube-icon.png' className='logo' alt='logo' />
          <h1 className='logoText'>NoteTube</h1>
        </div>
        <form className='inputForm' onSubmit={handleSubmit}>
          <div className='inputElement'>
            <label>Enter Youtube Link</label>
            <input
              placeholder='Enter Youtube Video Link'
              className='input'
              type='text'
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className='inputElement'>
            <label>Description for Notes</label>
            <textarea
              placeholder='Enter Description'
              className='descInput'
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className='inputElement'>
            <button className='submitBtn' type='submit'>
              Submit
            </button>
          </div>
        </form>

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
            <div className='spinner'></div>
          ) : (
            <MarkDownViewer content={notes} />
          )}
        </div>
      </div>
    </div>
  );
}
