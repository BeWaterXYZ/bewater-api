/* 
the api for ai dimsum devs.
*/
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { Application, Router } from "oak";
import { oakCors } from "cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { tify, sify } from '@aqzhyi/chinese-conv'

console.log("Hello from BeWater API!");

// Admin password verification function
// async function verifyAdminPassword(context: any, password: string): Promise<boolean> {
//   const adminPwd = Deno.env.get("ADMIN_PWD");
//   if (!password || password !== adminPwd) {
//     context.response.status = 401;
//     context.response.body = { error: "Unauthorized: Invalid password" };
//     return false;
//   }
//   return true;
// }

const router = new Router();

router
.get("/", async (context) => {
  context.response.body = { result: "Hello, Devs for BeWater!" };
})
.post("/challenge", async (context) => {
  try {
    // attention! this is the right way to call the body of the request!!!do not change it!!!
    const body = await context.request.body().value;
    
    const title = body.title;
    console.log("title", title);
    
    // Check if environment variables are set
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    // there is bug with the supabase service rolekey, it is not working with the service role key, so using anno key here to instead temply
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl) {
      context.response.status = 500;
      context.response.body = { error: "SUPABASE_URL environment variable not set" };
      return;
    }
    
    if (!supabaseKey) {
      context.response.status = 500;
      context.response.body = { error: "SUPABASE_SERVICE_ROLE_KEY environment variable not set" };
      return;
    }
    
    console.log("Supabase URL:", supabaseUrl);
    // console.log("Service key starts with:", supabaseKey.substring(0, 20) + "...");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: resp, error } = await supabase
      .from("challenge")
      .select("*")
      .eq("title", title);

    if (error) {
      console.error("Supabase error:", error);
      context.response.status = 500;
      context.response.body = { 
        error: "Database query failed", 
        details: error.message,
        code: error.code 
      };
      return;
    }

    context.response.body = resp;
  } catch (err) {
    console.error("Request error:", err);
    context.response.status = 500;
    context.response.body = { error: "Internal server error", details: err.message };
  }
})

const app = new Application();

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8000");
await app.listen({ port: 8000 });
