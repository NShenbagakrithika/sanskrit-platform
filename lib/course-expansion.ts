import type { Lesson } from './course';
export const additionalLessons:Lesson[]=[
 {title:'Reading Devanagari',heading:'Read a consonant and its vowel',intro:'Learn how a consonant changes when a vowel mark is added. Start with one familiar letter rather than memorising the whole alphabet.',concept:'क contains the vowel a: ka. The mark ा changes it to kā; ि changes it to ki. The i mark is written before the consonant but pronounced after it.',words:[
 {sa:'क',roman:'ka',english:'The syllable ka',tip:'The consonant letter carries a short a unless another mark changes it.'},
 {sa:'का',roman:'kā',english:'The syllable kā',tip:'The vertical vowel mark adds long ā.'},
 {sa:'कि',roman:'ki',english:'The syllable ki',tip:'Read k first, then i, even though the i mark appears to the left.'}],questions:[
 {prompt:'How is क read on its own?',options:['k','ka','ki'],answer:1,explain:'A Devanagari consonant normally includes an inherent short a.'},
 {prompt:'Which syllable has long ā?',options:['का','कि','क'],answer:0,explain:'The ा mark changes ka to kā.'},
 {prompt:'How do you read कि?',options:['ik','kā','ki'],answer:2,explain:'The short i is pronounced after the consonant, despite its written position.'}]},
 {title:'I, you and we',heading:'Identify who is speaking',intro:'Use personal pronouns to talk about yourself, one other person, or a group.',concept:'Aham means I, tvam means you (one person), and vayam means we (a plural group). Sanskrit also has special dual forms for exactly two people, which we will study later.',words:[
 {sa:'अहम्',roman:'aham',english:'I',tip:'Keep the short a vowels clear.'},
 {sa:'त्वम्',roman:'tvam',english:'You (one person)',tip:'Say t and v together without inserting another vowel.'},
 {sa:'वयम्',roman:'vayam',english:'We (plural)',tip:'Use va · yam. Both a vowels are short.'}],questions:[
 {prompt:'Which pronoun addresses one person?',options:['vayam','tvam','aham'],answer:1,explain:'Tvam is the singular subject pronoun you.'},
 {prompt:'Which word means we in the plural?',options:['vayam','aham','tvam'],answer:0,explain:'Vayam refers to a plural group including the speaker.'},
 {prompt:'Does Sanskrit distinguish exactly two people from a plural group?',options:['Only in English translations','No','Yes, through dual forms'],answer:2,explain:'Sanskrit distinguishes singular, dual and plural number.'}]},
 {title:'Reading and writing',heading:'Match the verb to the person',intro:'Build on paṭhāmi, I read. Compare it with the forms for you and for another person.',concept:'In this present-tense pattern, paṭhāmi means I read, paṭhasi means you read, and paṭhati means he, she or it reads. The ending identifies the person; the pronoun can often be left out.',words:[
 {sa:'पठामि',roman:'paṭhāmi',english:'I read',tip:'Keep the retroflex aspirated ṭh and long ā distinct.'},
 {sa:'पठसि',roman:'paṭhasi',english:'You read (singular)',tip:'Compare the short a in paṭhasi with the long ā in paṭhāmi.'},
 {sa:'पठति',roman:'paṭhati',english:'He, she or it reads',tip:'The final ti identifies the third-person singular in this pattern.'}],questions:[
 {prompt:'Complete: अहं ____ । (I read.)',options:['paṭhati','paṭhasi','paṭhāmi'],answer:2,explain:'Paṭhāmi is first-person singular; it agrees with aham.'},
 {prompt:'Which form means you read?',options:['paṭhasi','paṭhati','paṭhāmi'],answer:0,explain:'Paṭhasi is second-person singular.'},
 {prompt:'What does paṭhati tell you?',options:['The action is past','The subject is third-person singular','Two people are reading'],answer:1,explain:'Paṭhati describes a single third-person subject reading in the present.'}]},
 {title:'Saying no',heading:'Make a simple negative statement',intro:'Use na to turn a statement into a negative. Keep the verb form you have already learned.',concept:'Na is a common negative word: not. In ahaṃ na paṭhāmi, it negates the action of reading. This lesson covers statements, not negative commands.',words:[
 {sa:'न',roman:'na',english:'Not',tip:'Keep the a short; this is not nā.'},
 {sa:'अहं न पठामि।',roman:'ahaṃ na paṭhāmi.',english:'I do not read.',tip:'Pause between words while learning, then join them naturally.'},
 {sa:'त्वं न पठसि।',roman:'tvaṃ na paṭhasi.',english:'You do not read.',tip:'The verb ending si still identifies you.'}],questions:[
 {prompt:'Which word makes these statements negative?',options:['na','asti','mama'],answer:0,explain:'Na means not and negates the statement.'},
 {prompt:'Translate ahaṃ na paṭhāmi.',options:['You read','I do not read','I read'],answer:1,explain:'Ahaṃ means I; na is not; paṭhāmi means I read.'},
 {prompt:'Choose you do not read.',options:['ahaṃ na paṭhāmi','tvaṃ paṭhasi','tvaṃ na paṭhasi'],answer:2,explain:'Tvaṃ is you, and paṭhasi is the corresponding singular verb form.'}]},
 {title:'Asking questions',heading:'Ask what, where and when',intro:'Recognise three common question words. Use them to find out about an object, a place or a time.',concept:'Kim asks what in the neuter form used here, kutra asks where, and kadā asks when. Forms of kim change with gender, number and case; this lesson introduces only the neuter singular.',words:[
 {sa:'किम्',roman:'kim',english:'What (neuter)',tip:'The i is short. Do not confuse kim with kām.'},
 {sa:'कुत्र',roman:'kutra',english:'Where',tip:'Keep tr together: ku · tra.'},
 {sa:'कदा',roman:'kadā',english:'When',tip:'The final ā is long.'}],questions:[
 {prompt:'Which question word asks about a place?',options:['kadā','kutra','kim'],answer:1,explain:'Kutra asks where.'},
 {prompt:'What does kadā ask about?',options:['Time','A person’s name only','Colour'],answer:0,explain:'Kadā means when.'},
 {prompt:'Which word introduces what in the neuter form?',options:['kutra','kadā','kim'],answer:2,explain:'Kim is the neuter form used for what in this lesson.'}]},
 {title:'Time and daily practice',heading:'Talk about today and tomorrow',intro:'Learn short words for time. Use them to plan a small amount of Sanskrit study.',concept:'Adya means today and śvaḥ means tomorrow. These time words do not change to agree with a subject. Pratidinam means every day.',words:[
 {sa:'अद्य',roman:'adya',english:'Today',tip:'Keep d and y together without adding a vowel.'},
 {sa:'श्वः',roman:'śvaḥ',english:'Tomorrow',tip:'Ś is a palatal s sound. The final ḥ is visarga, a light breath-like ending in isolation.'},
 {sa:'प्रतिदिनम्',roman:'pratidinam',english:'Every day',tip:'Practice pra · ti · di · nam with short vowels.'}],questions:[
 {prompt:'Which word means today?',options:['śvaḥ','pratidinam','adya'],answer:2,explain:'Adya means today.'},
 {prompt:'Which expression means every day?',options:['pratidinam','adya','śvaḥ'],answer:0,explain:'Pratidinam expresses a daily action.'},
 {prompt:'What does śvaḥ mean?',options:['Yesterday','Tomorrow','Nowhere'],answer:1,explain:'Śvaḥ means tomorrow; notice the final visarga.'}]},
 {title:'Here and there',heading:'Locate something simply',intro:'Use short location words before learning noun endings for places.',concept:'Atra means here, tatra means there, and sarvatra means everywhere. These are uninflected location words. Compare them with the question word kutra, where.',words:[
 {sa:'अत्र',roman:'atra',english:'Here',tip:'Keep t and r together.'},
 {sa:'तत्र',roman:'tatra',english:'There',tip:'Both a vowels are short.'},
 {sa:'सर्वत्र',roman:'sarvatra',english:'Everywhere',tip:'Practice sar · va · tra without separating the tr cluster.'}],questions:[
 {prompt:'Which word means here?',options:['atra','tatra','kutra'],answer:0,explain:'Atra points to here; tatra points to there.'},
 {prompt:'Choose the meaning of sarvatra.',options:['Tomorrow','Everywhere','You'],answer:1,explain:'Sarvatra means everywhere.'},
 {prompt:'Which word asks where rather than giving a location?',options:['atra','tatra','kutra'],answer:2,explain:'Kutra is a question word. Atra and tatra are answers about location.'}]},
 {title:'Read a short exchange',heading:'Bring the course together',intro:'Read a simple exchange about a book. Identify the question word, the object and the action without translating letter by letter.',concept:'Kim introduces the question about the neuter object. Etat identifies this; pustakam names the book. Ahaṃ paṭhāmi states the action. These examples keep word boundaries visible; connected Sanskrit can change sounds through sandhi.',words:[
 {sa:'किम् एतत्?',roman:'kim etat?',english:'What is this?',tip:'Read the two words separately before joining them.'},
 {sa:'एतत् पुस्तकम् अस्ति।',roman:'etat pustakam asti.',english:'This is a book.',tip:'Recognise this, book and is in order.'},
 {sa:'अहं पठामि।',roman:'ahaṃ paṭhāmi.',english:'I read.',tip:'Compare the question, the object statement and the action statement.'}],questions:[
 {prompt:'What is being asked in kim etat?',options:['Where is it?','When do you read?','What is this?'],answer:2,explain:'Kim means what here, and etat means this.'},
 {prompt:'Which reply identifies a book?',options:['etat pustakam asti','ahaṃ na paṭhāmi','kutra'],answer:0,explain:'Etat pustakam asti means this is a book.'},
 {prompt:'Which statement says that you, the speaker, read?',options:['tvaṃ paṭhasi','ahaṃ paṭhāmi','paṭhati'],answer:1,explain:'Ahaṃ paṭhāmi is first-person singular: I read.'}]}
];
