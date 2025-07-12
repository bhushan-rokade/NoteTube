import { useRef, useState } from 'react';
import './App.css';
import MarkDownViewer from './MarkDownViewer';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useReactToPrint } from 'react-to-print';
export default function Home() {
  const outputDivRef = useRef<HTMLDivElement>(null);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
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
  const osNotes =
    '# 🖥️ Introduction to Operating Systems (OS)\n\n' +
    'An **Operating System (OS)** is system software that manages **hardware resources** and provides **services** for computer programs. It acts as an **interface between users and hardware**.\n\n' +
    '---\n\n' +
    '## 🎯 Main Objectives of an Operating System\n\n' +
    '- **Convenience**: Makes the computer easier to use.\n' +
    '- **Efficiency**: Manages resources to maximize performance.\n' +
    '- **Resource Management**: Allocates CPU, memory, I/O devices.\n' +
    '- **Security & Protection**: Controls access to data and hardware.\n' +
    '- **User Interface**: CLI (Command Line) or GUI (Graphical UI).\n\n' +
    '---\n\n' +
    '## ⚙️ Types of Operating Systems\n\n' +
    '| Type                    | Description                                           |\n' +
    '|-------------------------|-------------------------------------------------------|\n' +
    '| **Batch OS**            | Executes batches of jobs without user interaction.   |\n' +
    '| **Time-Sharing OS**     | Multiple users share system time simultaneously.     |\n' +
    '| **Distributed OS**      | Manages multiple computers as one system.            |\n' +
    '| **Real-Time OS (RTOS)** | Responds instantly to input (used in embedded systems). |\n' +
    '| **Multiprogramming OS** | Runs multiple programs at once for better CPU usage. |\n\n' +
    '---\n\n' +
    '## 🧠 Key Components\n\n' +
    '- **Kernel**: Core part that manages tasks like memory, processes, and devices.\n' +
    '- **Shell**: Interface between user and kernel (CLI or GUI).\n' +
    '- **File System**: Manages data storage and access.\n' +
    '- **Device Drivers**: Allow OS to communicate with hardware.\n\n' +
    '---\n\n' +
    '## 🔄 Important OS Functions\n\n' +
    '- **Process Management**\n' +
    '- **Memory Management**\n' +
    '- **File Management**\n' +
    '- **I/O System Management**\n' +
    '- **Security & Protection**\n' +
    '- **Networking**\n\n' +
    '---\n\n' +
    '## 🧵 Examples of Operating Systems\n\n' +
    '- **Windows**\n' +
    '- **Linux**\n' +
    '- **macOS**\n' +
    '- **Unix**\n' +
    '- **Android**\n' +
    '- **iOS**\n\n' +
    '---\n\n' +
    '> 📌 An OS is essential for making a computer useful — without it, no software can run!\n';

  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const videoId = extractYouTubeVideoId(link);

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
            <textarea placeholder='Enter Description' className='descInput' />
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
          <MarkDownViewer content={osNotes} />
        </div>
      </div>
    </div>
  );
}
