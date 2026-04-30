import fetch from "node-fetch";

const API_KEY = process.env.OPENWEATHER_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=San Pedro Sula,HN&appid=${API_KEY}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  return data.main.temp;
}

async function save(temp) {
  await fetch(`${SUPABASE_URL}/rest/v1/temperaturas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify({
      ciudad: "San Pedro Sula",
      temperatura: temp,
      fecha: new Date()
    })
  });
}

export default async function run() {
  const temp = await getWeather();
  await save(temp);
  console.log("Guardado:", temp);
}
