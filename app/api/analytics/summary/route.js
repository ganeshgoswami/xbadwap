export async function GET() {
  // Placeholder analytics response. Replace with real GA data source.
  const today = new Date();
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  const data = {
    totals: {
      views: 128734,
      users: 45781,
      sessions: 78912,
      bounceRate: 42.6,
    },
    sources: [
      { source: "Direct", sessions: 32450 },
      { source: "Google", sessions: 28761 },
      { source: "Bing", sessions: 5210 },
      { source: "Twitter", sessions: 3022 },
      { source: "Facebook", sessions: 1469 },
    ],
    timeseries: days.map((date, i) => ({
      date,
      views: Math.round(15000 + Math.random() * 5000),
      sessions: Math.round(11000 + Math.random() * 3000),
    })),
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
