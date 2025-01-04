import React, { useState } from "react";
import MainTab from "./MainTab";
import SavedTab from "./SavedTab";
import { synthesizeSpeech } from "../Api";
import Flag from "react-world-flags";
import "../styles/TextToSpeech.css";


const TextToSpeech = () => {
  const [activeTab, setActiveTab] = useState("main");
  const [text, setText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioList, setAudioList] = useState([]);

  const languages = {
    en: {
      name: 'English',
      icon: <Flag code="USA" alt="American Flag" style={{ width: "35px", height: "auto" }} />,
      voices: [
        { name: 'en-US-Wavenet-A', language: 'en-US', displayName: "US Male Voice 1" },
        { name: 'en-US-Wavenet-D', language: 'en-US', displayName: "US Male Voice 2" },
      ],
    },
    pl: {
      name: <Flag code="PL" alt="Polish Flag" style={{ width: "35px", height: "auto" }} />,
      voices: [
        { name: 'pl-PL-Wavenet-A', language: 'pl-PL', displayName: "Polish Female Voice" },
        { name: 'pl-PL-Wavenet-B', language: 'pl-PL', displayName: 'Polish Male Voice' },
      ],
    },
  };

  const handleSynthesize = async () => {
    if (!text || !selectedVoice) {
      alert('Please enter text and select a voice.');
      return;
    }
    try {
      const url = await synthesizeSpeech(text, selectedVoice);
      setAudioUrl(url);

      // Auto save audio to list
      const newAudio = { url, text, voice: selectedVoice.name };
      setAudioList([...audioList, newAudio]);
    } catch (error) {
      alert('Error generating audio. Check console for details.');
    }
  };

  return (
    <div className="text-to-speech-app">
      <h1>Text to Speech</h1>

      {/* Navbar */}
      <div className="navbar">
        <button
          onClick={() => setActiveTab("main")}
          className={activeTab === "main" ? "active" : ""}
        >
          Main
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={activeTab === "saved" ? "active" : ""}
        >
          Saved Audios
        </button>
      </div>

      {/* Main Tab */}
      {activeTab === "main" && (
        <MainTab
          text={text}
          setText={setText}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedVoice={selectedVoice}
          setSelectedVoice={setSelectedVoice}
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
          languages={languages}
          handleSynthesize={handleSynthesize}
        />
      )}

      {/* Saved Tab */}
      {activeTab === "saved" && (
        <SavedTab
          audioList={audioList}
          setText={setText}
          setSelectedVoice={setSelectedVoice}
          setAudioUrl={setAudioUrl}
          setActiveTab={setActiveTab}
          setSelectedLanguage={setSelectedLanguage}
          languages={languages}
        />
      )}
    </div>
  );
};

export default TextToSpeech;
