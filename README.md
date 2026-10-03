## Current local platform

The course includes 32 lessons in eight units, 96 quiz questions with explanations, lesson-example listening through browser speech synthesis, a searchable lesson list, a progress overview showing attempts and best scores, flashcard revision, and written recall in Devanagari or IAST. Revision marks are temporary; quiz progress is saved to the local D1 database. The text tutor uses the configured free OpenRouter router. Microphone recording, audio assessment, voice commands and spoken chat have been removed. No publishing is required.

Additional content references: [Devanagari](https://www.learnsanskrit.org/guide/devanagari/vowels-and-consonants/), [present-tense forms](https://www.learnsanskrit.org/guide/verbs-1/the-present-tense/), [personal pronouns](https://www.learnsanskrit.org/guide/nominals-2/asmad-and-yusmad/) and [questions](https://www.learnsanskrit.org/guide/sentences/questions/). Exercises use isolated beginner forms and keep word boundaries visible; they do not teach connected sandhi exhaustively. Content and AI Sanskrit responses have not been teacher-certified.

# Sanskrit Path

Beginner Sanskrit lessons, quizzes, guided or AI tutor conversations, direct-audio pronunciation practice, and spoken tutor replies. This revision is **local preview only**. No source push, hosting change, or deployment was performed.

## Local preview

```sh
npm run db:local
npm run dev
```

Open the URL printed by the development server. Select **Start local learner** to use the loopback-only demo identity supplied by the existing Sites preview adapter. Saved quiz attempts live in the local D1/SQLite database under `.wrangler/state`; they survive refresh and server restart. This demo identity is never enabled in a production build.

## Connect the local AI service

The user elected to configure the key themselves. Fill `OPENAI_API_KEY` in the ignored `.dev.vars` file (already created in this checkout; for a fresh checkout, copy `.env.example` to `.dev.vars`). Do not paste it into chat or commit it. The Cloudflare preview loads this file. Restart the preview if the runtime does not reload after saving. Then select **Check connection**. It verifies key/model access using the provider’s model metadata endpoints before marking text or audio available. Model checks do not guarantee sufficient billing quota or verify Sanskrit quality; send a tutor prompt and a short recording to validate the complete live flow.

Default models: `gpt-4.1-mini` (text) and `gpt-audio-1.5` (audio). Override via `OPENAI_TEXT_MODEL` and `OPENAI_AUDIO_MODEL` in the same file. Credentials remain server-side. Text questions and submitted recordings go to OpenAI. Recordings are not stored in D1 or sent before the learner presses Submit. Voice-command recognition uses the browser’s speech service, which may send audio to the browser vendor.

## Production preparation included

- Signed-in, account-scoped progress and request limits. Scores are computed from server-side lesson answers; best scores and attempt counts are persisted.
- Trusted Sites sign-in headers in production; loopback-only preview sign-in strips forged identity headers. This Worker assumes the Sites authentication gateway. **Do not expose the raw Worker as a public origin without a trusted authentication gateway.**
- Same-origin checks on writes, streamed body limits independent of Content-Length, validated conversation roles, server-chosen practice targets, and PCM WAV format/duration/silence checks.
- Atomic database request counters: 12 requests/minute and 120 requests/day per learner, including saving attempts. This limits abuse but is not an exact spending guarantee.
- AudioWorklet recording, 24 kHz mono PCM encoding, a hard 20-second cap, cleanup after errors/unmount/backgrounding, explicit discard, and no persistent raw recordings.
- Timeouts, cancellation, retries, service errors without credential/provider-body leakage, and separate reference-audio/playback controls.
- Security headers and a production CSP. Inline framework scripts/styles remain permitted; no external browser API service credentials are exposed.

Progress is durable; conversations are session-only. The app never reports fabricated pronunciation scores. Generated reference speech is labeled AI. Sanskrit audio feedback needs validation with a qualified Sanskrit teacher before it can be treated as authoritative assessment.

## Checks

```sh
npm test
python3 tests/storage.test.py
npm run typecheck
npm run build
```

Tests cover cross-origin rejection, missing Origin, streamed oversized bodies, message role/size validation, WAV resampling and truncation, silence/corrupt/unsupported audio rejection, account isolation, best-score retention, schema constraints, and request-cap behavior. Local UI verification confirms quiz scoring and persistence after refresh.

## Future deployment prerequisites

The user explicitly requested no publication. A future deployment requires separate authorization, runtime secret configuration, D1 binding and migration application, production sign-in verification, and live text/audio checks. Logical `DB` is declared in `.openai/hosting.json`; Drizzle schema/migrations are in `db/` and `drizzle/`. Hosted resources have not been created or changed in this revision. `npm run start` is for smoke-testing the built Worker locally; the full sign-in mock exists only in the development server.

## Sources

Sound explanations were adapted and simplified from [Learn Sanskrit Online basic vowels](https://www.learnsanskrit.org/guide/core/basic-vowels/) and [consonants](https://www.learnsanskrit.org/guide/core/consonants/), under CC BY 4.0. Vocabulary, quizzes, and examples were composed for this course. The app links to the [University of British Columbia pronunciation chart](https://ubcsanskrit.ca/lesson1/devan%C4%81gar%C4%AB.html).

The API integration follows [official OpenAI audio documentation](https://developers.openai.com/api/docs/guides/audio-chat-completions) and [model retrieval](https://developers.openai.com/api/reference/resources/models/methods/retrieve).

## Free OpenRouter local preview
Set `AI_PROVIDER=openrouter`, `OPENROUTER_API_KEY` and `OPENROUTER_TEXT_MODEL=openrouter/free` in `.dev.vars`, then restart the local preview. The server blocks other models and audio calls, and constrains provider token prices to zero. It does not fall back to OpenAI. Free-tier quotas and provider availability still apply. Text conversations go to OpenRouter and its selected provider. AI pronunciation assessment and generated audio are unavailable in this mode; local recording/playback and browser voice navigation remain available. A connection check verifies the key, not remaining generation quota.

The Listen button uses browser speech synthesis when AI audio is disconnected. It prefers Sanskrit, then Hindi; Hindi playback is labelled approximate. Devices without either voice receive installation guidance. Browser speech availability and pronunciation depend on the device.

Free audio input is wired to NVIDIA Nemotron Nano Omni with zero-price provider constraints. OpenRouter rejected a live generated-tone test with HTTP 402 requiring at least $0.50 account balance, despite the free model listing. A second free model rejected access with HTTP 403 (agentic harness restriction). The status endpoint checks balance and disables audio when ineligible. No paid fallback is used. Sanskrit pronunciation accuracy remains unvalidated.

Units 4–8 cover sounds and script, present-tense actions, nouns and number, sentence building, and reading practice. Added reference material: https://www.learnsanskrit.org/guide/nominals-1/a-stems/ , https://www.learnsanskrit.org/guide/uninflected-words/ca-va-and-others/ , https://www.learnsanskrit.org/guide/devanagari/vowel-marks/ , https://www.learnsanskrit.org/guide/sentences/the-eight-cases/ .
