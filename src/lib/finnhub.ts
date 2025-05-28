export async function fetchFromFinnhub(endpoint: string, params: Record<string, string>) {
  const url = new URL(`https://finnhub.io/api/v1/${endpoint}`);
  const apiKey = process.env.FINNHUB_API_KEY;

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  url.searchParams.append("token", apiKey!);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch from Finnhub");

  return res.json();
}
