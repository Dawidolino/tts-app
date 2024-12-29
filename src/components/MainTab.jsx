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
    <div>
      <h1>Text to Speech</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        {Object.keys(languages).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageSelect(lang)}
            style={{
              margin: "0 10px",
              padding: "10px",
              background: selectedLanguage === lang ? "#ddd" : "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {languages[lang].icon || languages[lang].name}
          </button>
        ))}
      </div>

      {selectedLanguage && (
        <div style={{ marginBottom: "20px" }}>
          <h2>{languages[selectedLanguage].name}</h2>
          {languages[selectedLanguage].voices.map((voice) => (
            <button
              key={voice.name}
              onClick={() => handleVoiceSelect(voice)}
              style={{
                margin: "5px",
                padding: "10px",
                background: selectedVoice?.name === voice.name ? "#ddd" : "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
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
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={handleSynthesize}>Convert to Speech</button>
        </>
      )}

      {audioUrl && (
        <div style={{ marginTop: "20px" }}>
          <audio key={audioUrl} controls>
            <source src={audioUrl} type="audio/mp3" />
          </audio>
          <br />
          <a href={audioUrl} download="synthesized-speech.mp3">
            <button>Download Audio</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default MainTab;
