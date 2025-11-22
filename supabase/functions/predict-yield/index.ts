import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cropType, landSize, fertilizer, irrigation, previousYield, season, district } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating prediction for:', { cropType, landSize, season, district });

    const systemPrompt = `You are an expert agricultural AI assistant for Rwanda, specialized in crop yield predictions.

CONTEXT: Rwanda had a strong 2024 farming year with cereal production at 977,000 tonnes. Use of improved seeds was highest in Season A, organic fertilizer remained common, and anti-erosion practices were widely applied.

TASK: Analyze the farmer's data and provide a comprehensive, data-driven yield prediction.

OUTPUT FORMAT (JSON ONLY - no markdown, no code blocks):
{
  "predictedYield": <number in tonnes per hectare>,
  "confidence": <percentage 0-100>,
  "riskLevel": "<low|medium|high>",
  "roi": <percentage return on investment>,
  "yieldIncrease": <percentage compared to previous>,
  "recommendations": [
    "<specific actionable recommendation 1>",
    "<specific actionable recommendation 2>",
    "<specific actionable recommendation 3>"
  ],
  "factors": [
    {"name": "<factor name>", "impact": <0-100>, "status": "<good|fair|poor>"},
    {"name": "<factor name>", "impact": <0-100>, "status": "<good|fair|poor>"}
  ],
  "optimizationTips": [
    "<specific optimization tip 1>",
    "<specific optimization tip 2>"
  ],
  "marketInsight": "<brief market price trend and selling recommendation>",
  "seasonalAdvice": "<seasonal timing and weather considerations>"
}

Base your prediction on:
1. Historical Rwanda agricultural data (2024 success)
2. Season-specific patterns (Season A: Sept-Feb, Season B: Mar-Aug, Season C: irrigation)
3. District-specific conditions
4. Best practices for the specific crop
5. Current market trends

Be realistic but optimistic. Provide actionable insights.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Generate a yield prediction for:
- Crop: ${cropType}
- Land Size: ${landSize} hectares
- Fertilizer: ${fertilizer}
- Irrigation: ${irrigation ? 'Yes' : 'No'}
- Previous Yield: ${previousYield} tonnes/ha
- Season: ${season}
- District: ${district}

Provide a comprehensive JSON prediction following the exact format specified.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI Gateway error:', response.status, error);
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('AI Response:', content);
    
    // Extract JSON from response (handle potential markdown formatting)
    let prediction;
    try {
      // Try to find JSON in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        prediction = JSON.parse(jsonMatch[0]);
      } else {
        prediction = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Content:', content);
      throw new Error('Failed to parse AI prediction');
    }

    return new Response(JSON.stringify({ 
      success: true,
      prediction,
      inputData: { cropType, landSize, fertilizer, irrigation, previousYield, season, district }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
