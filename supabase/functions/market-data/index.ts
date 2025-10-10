import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Commodity {
  id: string;
  name: string;
  category: string;
  unit: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Fetching market data...');

    // Get all commodities
    const { data: commodities, error: commoditiesError } = await supabase
      .from('commodities')
      .select('*');

    if (commoditiesError) {
      console.error('Error fetching commodities:', commoditiesError);
      throw commoditiesError;
    }

    console.log(`Found ${commodities?.length} commodities`);

    // Simulate fetching data from external API and update database
    const marketData = await Promise.all(
      (commodities || []).map(async (commodity: Commodity) => {
        // Simulate API data with realistic variations
        const basePrice = getBasePrice(commodity.name);
        const priceVariation = (Math.random() - 0.5) * 20; // -10 to +10
        const currentPrice = basePrice + priceVariation;
        const changePercent = ((Math.random() - 0.5) * 10); // -5% to +5%
        const volume = `${Math.floor(Math.random() * 5000 + 3000)} tons`;
        const activeMarkets = Math.floor(Math.random() * 15 + 8);

        // Insert current price
        const { error: priceError } = await supabase
          .from('market_prices')
          .insert({
            commodity_id: commodity.id,
            price: currentPrice.toFixed(2),
            change_percent: changePercent.toFixed(2),
            volume,
            active_markets: activeMarkets,
          });

        if (priceError) {
          console.error(`Error inserting price for ${commodity.name}:`, priceError);
        }

        // Generate price history (last 6 weeks)
        const weekLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
        const historyData = weekLabels.map((week, index) => {
          const weekPrice = basePrice + (Math.random() - 0.5) * 30;
          return {
            commodity_id: commodity.id,
            week_label: week,
            price: weekPrice.toFixed(2),
            recorded_at: new Date(Date.now() - (6 - index) * 7 * 24 * 60 * 60 * 1000).toISOString(),
          };
        });

        // Delete old history and insert new
        await supabase
          .from('price_history')
          .delete()
          .eq('commodity_id', commodity.id);

        const { error: historyError } = await supabase
          .from('price_history')
          .insert(historyData);

        if (historyError) {
          console.error(`Error inserting history for ${commodity.name}:`, historyError);
        }

        return {
          id: commodity.id,
          name: commodity.name,
          category: commodity.category,
          unit: commodity.unit,
          currentPrice: parseFloat(currentPrice.toFixed(2)),
          change: parseFloat(changePercent.toFixed(2)),
          trend: changePercent > 0 ? 'up' : 'down',
          volume,
          markets: `${activeMarkets} active markets`,
        };
      })
    );

    console.log('Market data updated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        data: marketData,
        timestamp: new Date().toISOString(),
        source: 'Simulated Market Data API',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in market-data function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: 'Failed to fetch market data',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

// Helper function to get base prices for commodities
function getBasePrice(commodityName: string): number {
  const basePrices: Record<string, number> = {
    'Maize': 450,
    'Beans': 720,
    'Rice': 890,
    'Cassava': 300,
    'Potatoes': 380,
    'Vegetables': 520,
  };
  return basePrices[commodityName] || 400;
}
