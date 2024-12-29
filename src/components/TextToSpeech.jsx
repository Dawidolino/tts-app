//idea: interface for user to choose lang, voice and do tts
//TODO: new icons and design

import React, {useState} from "react";
import MainTab from "./MainTab";
import SavedTab from "./SavedTab";
import { synthesizeSpeech } from "../Api";
import {FaFlagUsa} from 'react-icons/fa';  
import "../styles/TextToSpeech.css";

const TextToSpeech = () => {
    const [activeTab, setActiveTab] = useState("main"); 
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
    
          return (
            <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
              <nav style={{ marginBottom: "20px" }}>
                <button onClick={() => setActiveTab("main")} style={{ margin: "0 10px" }}>
                  Main
                </button>
                <button onClick={() => setActiveTab("saved")} style={{ margin: "0 10px" }}>
                  Saved Audios
                </button>
              </nav>
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