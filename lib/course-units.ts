import type { Lesson, Word } from './course';
export const unitTitles=['Foundations','Reading and grammar','Everyday communication','Sounds and script','Present-tense actions','Nouns and number','Sentence building','Reading practice'];
type Entry=[string,string,string,string];
function lesson(title:string,intro:string,concept:string,entries:Entry[],check:[string,string[],number,string]):Lesson{
 const words:Word[]=entries.map(([sa,roman,english,tip])=>({sa,roman,english,tip}));
 return {title,heading:title,intro,concept,words,questions:[
 {prompt:`What does ${words[0].sa} (${words[0].roman}) mean in this lesson?`,options:words.map(w=>w.english),answer:0,explain:`${words[0].roman} means ${words[0].english.toLowerCase()} in this example.`},
 {prompt:`Choose the Sanskrit for: ${words[1].english}`,options:[words[2].roman,words[0].roman,words[1].roman],answer:2,explain:`${words[1].sa} — ${words[1].roman} — ${words[1].english}.`},
 {prompt:check[0],options:check[1],answer:check[2],explain:check[3]}]};
}
export const furtherLessons:Lesson[]=[
 lesson('Dental and retroflex sounds','Compare tongue placement before learning more words. These are different consonants, not interchangeable spellings.','Dental t touches near the upper teeth; retroflex ṭ uses a tongue tip turned back. The dot below a Roman letter marks retroflexion here.',[
 ['त','ta','Dental ta','Touch the tongue tip near the upper teeth.'],['ट','ṭa','Retroflex ṭa','Turn the tongue tip slightly back.'],['द','da','Dental da','Use the dental position, with voicing.']],
 ['What does the dot in ṭ mark?',['A silent consonant','Retroflex articulation','A long vowel'],1,'Ṭ is retroflex; plain t is dental.']),
 lesson('Aspirated consonants','Compare a stop with and without an extra release of breath.','In IAST, kh, th and ph each represent an aspirated consonant. Sanskrit th is not the English sound in thin.',[
 ['क','ka','Unaspirated ka','Release k without a strong breath.'],['ख','kha','Aspirated kha','Add a small puff of air to the k release.'],['थ','tha','Aspirated dental tha','Use a dental t with extra breath, not English th.']],
 ['How should Sanskrit th be read?',['As a dental t with aspiration','As English th in thin','As two syllables'],0,'Th is an aspirated dental stop.']),
 lesson('More vowel marks','Recognise long ī and the u pair after a consonant.','Vowel marks modify the inherent a. Keep short u and long ū distinct in both reading and duration.',[
 ['की','kī','The syllable kī','The ी mark gives long ī.'],['कु','ku','The syllable ku','The ु mark below gives short u.'],['कू','kū','The syllable kū','The ू mark gives long ū.']],
 ['Which syllable contains a long u?',['ku','ka','kū'],2,'Kū contains long ū; ku contains short u.']),
 lesson('Virāma and clear endings','Notice the small mark that removes a consonant’s default vowel.','Virāma, ्, suppresses the inherent a. Thus म is ma and म् is m. It also participates in writing consonant clusters.',[
 ['म्','m','The consonant m without a','Close your lips; do not add a vowel.'],['त्','t','The dental consonant t without a','End at the consonant release.'],['म','ma','The syllable ma','The unmarked consonant includes short a.']],
 ['What does virāma do?',['Adds long ā','Removes the inherent a','Makes the letter plural'],1,'Virāma blocks the default vowel of a consonant.']),
 lesson('Going somewhere','Learn three singular present-tense forms of go.','Gacchāmi, gacchasi and gacchati distinguish I, you and a third-person subject. The cc sequence is doubled; do not skip one c.',[
 ['गच्छामि','gacchāmi','I go','Hold ā in the first-person form.'],['गच्छसि','gacchasi','You go (singular)','Use the si ending for one person addressed.'],['गच्छति','gacchati','He, she or it goes','The ti ending marks third-person singular.']],
 ['Choose the form that agrees with aham.',['gacchasi','gacchati','gacchāmi'],2,'Aham takes the first-person form gacchāmi.']),
 lesson('Writing in the present','Learn how to describe the act of writing.','Likhāmi means I write; likhasi means you write; likhati means he, she or it writes. Kh is aspirated.',[
 ['लिखामि','likhāmi','I write','Give kh a light breath and ā its length.'],['लिखसि','likhasi','You write (singular)','Keep the a short before si.'],['लिखति','likhati','He, she or it writes','Recognise the third-person ti.']],
 ['Which ending belongs to you in this pattern?',['-si','-mi','-ti'],0,'Likhasi is second-person singular.']),
 lesson('Cooking in the present','Recognise another verb that follows a familiar pattern.','Pacāmi, pacasi and pacati describe cooking. Sanskrit c is a palatal stop, commonly approximated by the initial sound of English church.',[
 ['पचामि','pacāmi','I cook','Keep c distinct from k and hold ā.'],['पचसि','pacasi','You cook (singular)','Compare the short a with long ā in pacāmi.'],['पचति','pacati','He, she or it cooks','The ending tells you the person.']],
 ['What can the present tense express here?',['Only an action completed long ago','Cooking or being in the act of cooking','Only a command'],1,'Context allows pacati to mean cooks or is cooking.']),
 lesson('We and they read','Move from one reader to a plural group.','Paṭhāmaḥ means we read; paṭhatha means you all read; paṭhanti means they read. Sanskrit has separate dual forms for two readers.',[
 ['पठामः','paṭhāmaḥ','We read (plural)','Hold ā; notice final visarga ḥ.'],['पठथ','paṭhatha','You all read (plural)','The tha ending belongs to second-person plural here.'],['पठन्ति','paṭhanti','They read','Keep the nt cluster together.']],
 ['Which form means they read?',['paṭhāmaḥ','paṭhanti','paṭhatha'],1,'The third-person plural is paṭhanti.']),
 lesson('One, two and many fruits','Use a familiar neuter noun to recognise number.','In the subject and object forms studied here, phalam is singular, phale is dual and phalāni is plural. These patterns do not apply to every noun.',[
 ['फलम्','phalam','One fruit','Use aspirated ph, not English f.'],['फले','phale','Two fruits','Keep e steady.'],['फलानि','phalāni','Fruits (plural)','Notice the long ā and ni ending.']],
 ['What number does phale express here?',['Exactly two','Exactly one','A plural group of three or more'],0,'Phale is the dual subject or object form.']),
 lesson('A masculine noun pattern','Compare singular, dual and plural subjects with the word elephant.','Gajaḥ, gajau and gajāḥ are nominative forms, often used for the subject. Their endings differ from those of neuter phalam.',[
 ['गजः','gajaḥ','One elephant (subject)','Finish with a light visarga in isolation.'],['गजौ','gajau','Two elephants (subject)','Au is a diphthong.'],['गजाः','gajāḥ','Elephants (plural subject)','Hold ā and keep the final visarga.']],
 ['Which form is a plural subject?',['gajaḥ','gajau','gajāḥ'],2,'Gajāḥ is nominative plural.']),
 lesson('The object of an action','Compare a subject form with the form used for an object.','For masculine gaja, gajaḥ is nominative singular and gajam is accusative singular. In many simple active sentences, these mark subject and direct object.',[
 ['गजः','gajaḥ','An elephant as subject','Recognise the final ḥ.'],['गजम्','gajam','An elephant as object','End with m.'],['फलम्','phalam','A fruit as subject or object','Neuter singular subject and object forms match.']],
 ['Which form is the singular object form of gaja?',['gajam','gajaḥ','gajāḥ'],0,'Gajam is accusative singular.']),
 lesson('Whose book?','Use a noun ending to express a simple possession relationship.','The genitive singular of the masculine a-stem bāla is bālasya, of the boy. The ending -sya expresses the relationship in this pattern.',[
 ['बालः','bālaḥ','The boy (subject form)','Hold the first ā.'],['बालस्य','bālasya','Of the boy','Keep s and y together.'],['बालस्य पुस्तकम्','bālasya pustakam','The boy’s book','Recognise the possessor before the book.']],
 ['Which form expresses of the boy?',['bālaḥ','bālasya','pustakam'],1,'Bālasya is genitive singular.']),
 lesson('Locations with noun endings','Use a noun form to express a location rather than just here or there.','Vanam names a forest in the neuter singular subject or object form. Vane is locative singular and can mean in the forest.',[
 ['वनम्','vanam','Forest (subject or object form)','Both a vowels are short.'],['वने','vane','In the forest','The locative ending here is e.'],['गृहे','gṛhe','In the house','Ṛ is a vocalic r; it is not ordinary English ri.']],
 ['Which case commonly marks location?',['Accusative','Genitive','Locative'],2,'The locative can express where an action occurs.']),
 lesson('And, or, but','Link ideas with short uninflected words.','Ca means and, vā means or and tu means but or however. Ca normally follows a word it connects rather than occupying the English position of and.',[
 ['च','ca','And','Use a palatal c.'],['वा','vā','Or','Hold the long ā.'],['तु','tu','But or however','Keep u short.']],
 ['Which connector normally follows a connected word?',['ca','English-style and before the second word','A verb ending'],0,'Ca is postpositive; pay attention to Sanskrit placement.']),
 lesson('With a friend','Use the instrumental case with saha.','Mitram is friend (neuter); mitreṇa is an instrumental form. Mitreṇa saha means with a friend. The r in the stem triggers retroflex ṇ in this form.',[
 ['मित्रम्','mitram','Friend','Keep tr together.'],['मित्रेण','mitreṇa','With or by a friend (instrumental)','Notice e and retroflex ṇ.'],['मित्रेण सह','mitreṇa saha','With a friend','Saha accompanies the instrumental here.']],
 ['Which case appears with saha in this example?',['Locative','Instrumental','Nominative'],1,'Mitreṇa is instrumental singular.']),
 lesson('Subject, object and verb','Identify the parts of a simple sentence.','Ahaṃ is the subject, pustakaṃ is the object and paṭhāmi is the verb. Sanskrit word order is flexible, but endings and context still matter.',[
 ['अहम्','aham','I (subject)','This is the speaker.'],['पुस्तकम्','pustakam','Book (object form here)','The neuter form is also used as a subject elsewhere.'],['अहं पुस्तकं पठामि।','ahaṃ pustakaṃ paṭhāmi.','I read a book.','The final m is written as anusvāra before the following consonant here.']],
 ['What tells you I read rather than you read?',['Only the position of book','The colour of the text','Ahaṃ and the ending of paṭhāmi'],2,'The subject and verb agree in person and number.']),
 lesson('A daily study routine','Read familiar verbs with a time expression.','Pratidinaṃ means every day in these sentences. The present tense can describe a regular habit as well as an action happening now.',[
 ['अहं प्रतिदिनं पठामि।','ahaṃ pratidinaṃ paṭhāmi.','I read every day.','Find the time expression between subject and verb.'],['अहं प्रतिदिनं लिखामि।','ahaṃ pratidinaṃ likhāmi.','I write every day.','Recognise likhāmi from the writing lesson.'],['अहं न लिखामि।','ahaṃ na likhāmi.','I do not write.','Na negates the writing action.']],
 ['Which word expresses the daily habit?',['na','pratidinam','aham'],1,'Pratidinam means every day; its final m becomes ṃ in these connected examples.']),
 lesson('Ask about an action','Use time and location question words with a familiar verb.','Kadā asks when and kutra asks where. Paṭhasi is the form used when asking one person about reading.',[
 ['कदा पठसि?','kadā paṭhasi?','When do you read?','Hold final ā in kadā.'],['कुत्र पठसि?','kutra paṭhasi?','Where do you read?','Keep tr and ṭh distinct.'],['किं पठसि?','kiṃ paṭhasi?','What do you read?','Kim is the neuter object question form here.']],
 ['Which question asks for a location?',['kadā paṭhasi','kutra paṭhasi','kiṃ paṭhasi'],1,'Kutra asks where.']),
 lesson('Answer with a place','Read a short answer about where an action happens.','Atra and tatra give general locations; gṛhe gives a noun in the locative. All three can describe where reading happens.',[
 ['अत्र पठामि।','atra paṭhāmi.','I read here.','The verb already identifies I.'],['तत्र पठामि।','tatra paṭhāmi.','I read there.','Compare atra and tatra.'],['गृहे पठामि।','gṛhe paṭhāmi.','I read at home.','Gṛhe means in the house or at home in this context.']],
 ['Why can these sentences omit aham?',['Sanskrit never uses pronouns','The verb ending already identifies the first person','The sentence is past tense'],1,'A clear context and paṭhāmi can identify the subject without an explicit pronoun.']),
 lesson('Course review: a short dialogue','Combine a question, an answer and a negative statement.','Follow the exchange: ask where one person reads, answer in the first person, then negate the action. These short lines consolidate the course rather than introduce a new tense.',[
 ['कुत्र पठसि?','kutra paṭhasi?','Where do you read?','Identify question word and second-person ending.'],['अत्र पठामि।','atra paṭhāmi.','I read here.','Switch from si to āmi in the reply.'],['अहं न पठामि।','ahaṃ na paṭhāmi.','I do not read.','Use na without changing the present-tense ending.']],
 ['Which answer fits kutra paṭhasi?', ['atra paṭhāmi','kadā','tvam'],0,'Atra paṭhāmi answers the location question with I read here.'])
];
