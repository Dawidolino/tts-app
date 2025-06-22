import React from "react";

const SavedTab = ({ audioList, setText, setSelectedVoice, setAudioUrl, setActiveTab, setSelectedLanguage, languages }) => {
  const handlePlayAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleSelectSavedAudio = (audio) => {
    setText(audio.text);
    setSelectedVoice({ name: audio.voice });

    // find the language based on the selected voice
    const lang = Object.keys(languages).find(lang =>
      languages[lang].voices.some(v => v.name === audio.voice)
    );
    setSelectedLanguage(lang);

    setAudioUrl(audio.url);
    setActiveTab("main");
  };

  // function to get display name of the voice
  const getVoiceDisplayName = (voiceName) => {
    for (const langKey in languages) {
      const voice = languages[langKey].voices.find(v => v.name === voiceName);
      if (voice) {
        return voice.displayName;  // return the displayName of the voice
      }
    }
    return voiceName; // return the name if not found
  };

  return (
    <div className="saved-tab">
      <h2>Saved Audios</h2>
      {audioList.length > 0 ? (
        <ul>
          {audioList.map((audio, index) => (
            <li key={index}>
              <button onClick={() => handlePlayAudio(audio.url)}>
                Play:  " {audio.text} "  ({getVoiceDisplayName(audio.voice)})
              </button>
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

export default SavedTab;
