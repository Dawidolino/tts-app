import React from "react";

const MainTab = ({
  text,
  setText,
  selectedLanguage,
  setSelectedLanguage,
  selectedVoice,
  setSelectedVoice,
  audioUrl,
  setAudioUrl,
  languages,
  handleSynthesize,
}) => {
  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setSelectedVoice(null);
    setAudioUrl(null);
  };

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
    setAudioUrl(null);
  };

  return (
    <div className="text-to-speech-app">
  <h1>Text to Speech</h1>
  <div className="language-buttons">
    {Object.keys(languages).map((lang) => (
      <button
        key={lang}
        onClick={() => handleLanguageSelect(lang)}
        className={selectedLanguage === lang ? "active" : ""}
      >
        {languages[lang].icon || languages[lang].name}
      </button>
    ))}
  </div>

  {selectedLanguage && (
    <div className="voice-buttons">
      {languages[selectedLanguage].voices.map((voice) => (
        <button
          key={voice.name}
          onClick={() => handleVoiceSelect(voice)}
          className={selectedVoice?.name === voice.name ? "active" : ""}
        >
          {voice.name}
        </button>
      ))}
    </div>
  )}

  {selectedVoice && (
    <>
      <textarea
        className="main-tab-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
        rows="4"
      />
      <button className="main-tab-button" onClick={handleSynthesize}>
        Convert to Speech
      </button>
    </>
  )}

  {audioUrl && (
    <div className="audio-preview">
      <audio key={audioUrl} controls>
        <source src={audioUrl} type="audio/mp3" />
      </audio>
      <a href={audioUrl} download="synthesized-speech.mp3">
        <button className="main-tab-button">Download Audio</button>
      </a>
    </div>
  )}
</div>

  );
};

export default MainTab;
