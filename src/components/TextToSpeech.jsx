//interface for user to choose lang, voice and do tts
//TODO: new icons and design

import React, {useState} from "react";
import { synthesizeSpeech } from "../Api";
import {FaFlagUsa} from 'react-icons/fa';  // zobaczymy tu xd

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null)
    const [audioList, setAudioList] = useState([])

    const languages = {
        en: {
            name: 'English',
            icon: <FaFlagUsa />,
            voices: [
                { name: 'en-US-Wavenet-A', language: 'en-US' },
                { name: 'en-US-Wavenet-D', language: 'en-US' },
              ],
        },
        pl: {
            name: 'Polish',
            // icon: <FaFlagPoland />,
            voices: [
              { name: 'pl-PL-Wavenet-A', language: 'pl-PL' },
              { name: 'pl-PL-Wavenet-B', language: 'pl-PL' },
            ],
          },
    }
    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        setSelectedVoice(null); // reset voice 
        setAudioUrl(null); // reset prev audio
      };
      const handleVoiceSelect = async (voice) => {
        setSelectedVoice(voice);
        setAudioUrl(null); // reset prev audio
      };
    
      const handleSynthesize = async () => {
        if (!text || !selectedVoice) {
          alert('Please enter text and select a voice.');
          return;
        }
        try {
          const url = await synthesizeSpeech(text, selectedVoice);
          setAudioUrl(url);
            
          //auto save audio to list
          const newAudio = {url, text, voice:selectedVoice.name};
          setAudioList([...audioList, newAudio]);

        } catch (error) {
          alert('Error generating audio. Check console for details.');
        }
       };

        const handlePlayAudio = (audioUrl) => {
            const audio = new Audio(audioUrl);
            audio.play();
        };

        const handleSelectSavedAudio = (audio) => {
            setText(audio.text);  //set the text from selected audio
            setSelectedVoice({ name: audio.voice }); 
            setAudioUrl(audio.url); // play the audio
          };
    

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}>
        <h1>Text to Speech</h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {Object.keys(languages).map((lang) => (
            <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                style={{
                margin: '0 10px',
                padding: '10px',
                background: selectedLanguage === lang ? '#ddd' : '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
                }}
            >
                {languages[lang].icon}
            </button>
            ))}
        </div>

        {selectedLanguage && (
            <div style={{ marginBottom: '20px' }}>
            <h2>{languages[selectedLanguage].name}</h2>
            {languages[selectedLanguage].voices.map((voice) => (
                <button
                key={voice.name}
                onClick={() => handleVoiceSelect(voice)}
                style={{
                    margin: '5px',
                    padding: '10px',
                    background: selectedVoice === voice ? '#ddd' : '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                >
                {voice.name}
                </button>
            ))}
            </div>
        )}

        {selectedVoice && (
            <>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here"
                rows="4"
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={handleSynthesize}>Convert to Speech</button>
            </>
        )}

            {audioUrl && (
            <div style={{ marginTop: '20px' }}>
            <audio key={audioUrl} controls>
                <source src={audioUrl} type="audio/mp3" />
            </audio>
            <br />
            <a href={audioUrl} download="synthesized-speech.mp3">
                <button>Download Audio</button>
            </a>          
            </div>
        )}

        <h2>Saved Audios:</h2>
        {audioList.length > 0 ? (
            <ul>
            {audioList.map((audio, index) => (
                <li key={index}>
                <button onClick={() => handlePlayAudio(audio.url)}>
                    Play: {audio.voice} - {audio.text}
                </button>
                <br />
                <button onClick={() => handleSelectSavedAudio(audio)}>
                    Load Text & Voice
                </button>
                </li>
            ))}
            </ul>
        ) : (
            <p>No saved audios yet.</p>
        )}
        </div>
    );
    };

    export default TextToSpeech;