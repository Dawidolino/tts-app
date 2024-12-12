import axios from "axios";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const apiUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';

export const synthesizeSpeech = async (text, voice) => {
    try{
        const response = await axios.post(
            apiUrl,
            {
                input: { text: text},
                voice: { languageCode: voice.language, name: voice.name},
                audioConfig: {audioEncoding: 'MP3'},
            },
            {
                headers: {
                    'Content-Type' : 'application/json',
                },
                params: {
                    key: apiKey,
                },
            }
        );
        const audioContent = response.data.audioContent;
        const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], {type: 'audio/mp3'});
        return URL.createObjectURL(audioBlob);
    } catch (error) {
        console.error('Error synthesizing speech:', error)
        throw error;
    }
};