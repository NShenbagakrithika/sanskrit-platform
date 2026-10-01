import { config } from "@/lib/ai-server";
export async function GET(){const enabled=Boolean(config().key);return Response.json({text:enabled,audio:enabled},{headers:{"Cache-Control":"no-store"}});}
