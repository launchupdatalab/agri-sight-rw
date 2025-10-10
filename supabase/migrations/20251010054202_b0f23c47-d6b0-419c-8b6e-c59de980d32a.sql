-- Create table for commodities
CREATE TABLE IF NOT EXISTS public.commodities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for market prices
CREATE TABLE IF NOT EXISTS public.market_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  commodity_id UUID NOT NULL REFERENCES public.commodities(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  change_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  volume TEXT NOT NULL,
  active_markets INTEGER NOT NULL DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for price history
CREATE TABLE IF NOT EXISTS public.price_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  commodity_id UUID NOT NULL REFERENCES public.commodities(id) ON DELETE CASCADE,
  week_label TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.commodities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (market data is public)
CREATE POLICY "Anyone can view commodities" 
ON public.commodities 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view market prices" 
ON public.market_prices 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view price history" 
ON public.price_history 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_market_prices_commodity_id ON public.market_prices(commodity_id);
CREATE INDEX idx_market_prices_recorded_at ON public.market_prices(recorded_at DESC);
CREATE INDEX idx_price_history_commodity_id ON public.price_history(commodity_id);
CREATE INDEX idx_price_history_recorded_at ON public.price_history(recorded_at DESC);

-- Insert initial commodity data
INSERT INTO public.commodities (name, category, unit) VALUES
  ('Maize', 'Grains', 'kg'),
  ('Beans', 'Legumes', 'kg'),
  ('Rice', 'Grains', 'kg'),
  ('Cassava', 'Tubers', 'kg'),
  ('Potatoes', 'Tubers', 'kg'),
  ('Vegetables', 'Vegetables', 'kg')
ON CONFLICT (name) DO NOTHING;