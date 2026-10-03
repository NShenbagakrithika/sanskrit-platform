# Sanskrit Path

A Sanskrit learning and practice platform for adult beginners, with English explanations, Devanagari and IAST transliteration.

## Features

- Eight units containing 32 lessons and 96 quiz questions.
- Lesson examples with meanings, grammar notes and listening.
- Quiz explanations, best scores and attempt tracking.
- Flashcard revision and written recall exercises.
- Searchable course content and a progress overview.
- A text tutor connected through a free OpenRouter model.

## Demonstration

1. Open the Overview and choose a unit.
2. Read a lesson and switch between its examples.
3. Listen to an example.
4. Complete a quiz and view the saved result.
5. Use Revision for flashcards or written answers.
6. Ask the Tutor a question about the current lesson.

## Technical setup

Requires Node.js 22.13 or later. Install dependencies with `npm ci`, copy `.env.example` to `.dev.vars`, and configure `OPENROUTER_API_KEY` for the text tutor. Run `npm run db:local`, then `npm run dev -- --host 127.0.0.1 --port 5173`. No deployment is needed. Credentials and the learner database are excluded from the submission archive.

## Scope and evaluation

Email/password accounts and quiz results persist in the database on this Mac. Each account has separate lesson progress, best scores and attempts. Passwords are salted and hashed with scrypt; sessions use expiring HttpOnly cookies. Email verification and emailed password resets require an email service and are not included; revision marks are temporary. The tutor requires internet access and available free-model quota. Listening uses installed Sanskrit or Hindi voices; a Hindi reading is an approximation. No microphone recording or pronunciation grading is included. Content and generated Sanskrit answers should be reviewed by a Sanskrit teacher before use as an authoritative course.

## References

Grammar references include Learn Sanskrit Online (CC BY 4.0), particularly its guides to Devanagari, present tense, pronouns, noun endings and cases. A University of British Columbia Sanskrit sound guide is linked in the lessons.

## Verification

`npm run typecheck`, `npm test`, `python3 tests/storage.test.py` and `npm run build`.
