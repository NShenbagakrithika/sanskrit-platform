# Sanskrit Path

A beginner Sanskrit teaching platform with four lessons, twelve explained quiz questions, Devanagari and IAST transliteration, guided topic help, WAV microphone recording and replay, and optional browser voice navigation.

## Current delivery

The AI connection is deliberately deferred at the user's request. Guided mode uses prepared explanations, not generated answers. Personalized audio analysis, AI reference audio, and spoken AI replies require a server-side API connection. No fabricated pronunciation scores are shown.

Progress, chat, and recordings are session-only. Recordings are not uploaded unless the user explicitly presses the send/feedback button after connecting AI. Microphone permission is requested on record. Voice-command recognition uses the browser's speech service when supported and may send audio to the browser provider.

## Run

Use Node 22.13+ and the existing npm lockfile. Run `npm run dev` for preview and `npm run build` for a Cloudflare Worker build.

## Connect AI later

Enable the OpenAI Developers plugin and use its API-key setup skill with the user's approval. Set `OPENAI_API_KEY` as a secret in Sites runtime configuration. Optional `OPENAI_TEXT_MODEL` and `OPENAI_AUDIO_MODEL` override the default models. `.env.example` documents the same variables for local development; copy it to ignored `.env.local` and use a local key only when authorized.

Routes: `/api/status`, `/api/tutor`, `/api/audio`, `/api/speech`. Keys stay server-side. Audio is encoded as mono PCM WAV, with a 20-second recording limit. Audio requests use direct audio input, rather than making phonetic judgments from speech-to-text alone. Service errors remain visible and do not silently switch to simulated answers.

Live model calls have not been tested because no API key is connected. Model access, Sanskrit audio quality, and pronunciation feedback should be validated with a Sanskrit teacher before launch beyond this private pilot. AI-produced reference speech is labeled as AI. The app also links to the University of British Columbia’s pronunciation chart.

## Lesson sources

Sound explanations were adapted and simplified from [Learn Sanskrit Online basic vowels](https://www.learnsanskrit.org/guide/core/basic-vowels/) and [consonants](https://www.learnsanskrit.org/guide/core/consonants/), available under CC BY 4.0. Vocabulary, quizzes, and beginner examples were composed for this course. Phonology reference: https://ubcsanskrit.ca/lesson1/devan%C4%81gar%C4%AB.html.

API integration follows official OpenAI documentation: https://developers.openai.com/api/docs/guides/audio-chat-completions and https://developers.openai.com/api/docs/models/gpt-4.1-mini.

Browser WebMCP (when available) exposes `start_sanskrit_lesson` for navigation only. It does not mark lessons complete.
