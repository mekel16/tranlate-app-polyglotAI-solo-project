import OpenAI from "openai";

const ALLOWED_LANGUAGES = {
  japan: "Japanese",
  french: "French",
  spain: "Spanish"
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    let reqBody;
    try {
      reqBody = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }


    const { text, target } = reqBody;
    if (
      typeof text !== "string" ||
      !text.trim() ||
      typeof target !== "string" ||
      !(target in ALLOWED_LANGUAGES)
    ) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const prompt = `Translate the following indonesian text to ${ALLOWED_LANGUAGES[target]}:`;

    const messages = [
      { role: "system", content: prompt },
      { role: "user", content: text }
    ];

    const openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      baseURL: 'url gatewai cloudflare'
    });

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 1.0,
        presence_penalty: 0,
        frequency_penalty: 0
      });

      return new Response(JSON.stringify({
        choices: chatCompletion.choices
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: e.message || String(e) }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 500
        }
      );
    }
  }
};
