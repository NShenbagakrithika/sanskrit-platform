import { config } from "@/lib/ai-server";
import { aiHealth } from "@/lib/ai-health";
import { learner, json } from "@/lib/api-context";
import { database } from "@/lib/storage";
export async function GET(){
 let signedIn=false,storage=false,email="";try{const user=await learner();signedIn=true;email=user.email;await database().prepare("SELECT 1 FROM lesson_progress LIMIT 1").first();storage=true;}catch{}
 const configured=signedIn&&Boolean(config().key),health=configured&&storage?await aiHealth():{text:false,audio:false};
 return json({...health,configured,signedIn,email,storage,preview:process.env.NODE_ENV!=="production"});
}
