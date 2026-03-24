const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const EMAILS = [
  "a.bajor@eco-team.net",
  "m.cicha@eco-team.net",
  "k.cierpisz@eco-team.net",
  "b.franczak@eco-team.net",
  "m.horabik@eco-team.net",
  "p.janus@eco-team.net",
  "l.kawczak@eco-team.net",
  "k.klama@eco-team.net",
  "k.klimczyk@eco-team.net",
  "d.knapczyk@eco-team.net",
  "e.kolodziejczyk@eco-team.net",
  "m.korzuchowska@eco-team.net",
  "j.koscianski@eco-team.net",
  "michalina.kot@eco-team.net",
  "d.krajewski@eco-team.net",
  "r.krakowski@eco-team.net",
  "o.kulinska@eco-team.net",
  "p.ligocki@eco-team.net",
  "m.maciag@eco-team.net",
  "m.makles@eco-team.net",
  "serwis@eco-team.net",
  "p.maszczyk@eco-team.net",
  "c.nalewajka@eco-team.net",
  "a.olas@eco-team.net",
  "d.ordowska@eco-team.net",
  "j.paluszka@eco-team.net",
  "k.paluszka@eco-team.net",
  "e.pustul@eco-team.net",
  "a.scibiur@eco-team.net",
  "d.stepien@eco-team.net",
  "p.stolarczyk@eco-team.net",
  "e.strebska@eco-team.net",
  "k.wojcik@eco-team.net",
  "a.spiewak@eco-team.net",
  "a.tasarz@eco-team.net",
  "k.trojanowski@eco-team.net",
  "m.wasik@eco-team.net",
  "w.mateusz@eco-team.net",
  "r.wojtasik@eco-team.net",
  "p.wokurka@eco-team.net",
  "h.brzozowski@eco-team.net",
  "d.chrobak@eco-team.net",
  "a.fortuna-zimon@eco-team.net",
  "m.gondro@eco-team.net",
  "b.gora@eco-team.net",
  "a.kasprzyk@eco-team.net",
  "a.libertowska@eco-team.net",
  "p.lopaciuch@eco-team.net",
  "m.lukaszewski@eco-team.net",
  "n.mitrafanava@eco-team.net",
  "d.ociepka@eco-team.net",
  "m.pisula@eco-team.net",
  "n.solinski@eco-team.net",
  "m.tasarz@eco-team.net",
  "s.walek@eco-team.net",
  "j.wlodarczyk@eco-team.net",
  "d.zjawiony@eco-team.net",
];

const START_CODE = "startecoteam2026";

async function setup() {
  console.log("Tworzenie tabeli users...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS eco_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255),
      is_active BOOLEAN DEFAULT true,
      first_login BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("Tabela utworzona! ✅");

  const startHash = await bcrypt.hash(START_CODE, 10);

  console.log("Dodawanie pracowników...");
  let dodano = 0;
  for (const email of EMAILS) {
    await pool.query(
      `INSERT INTO eco_users (email, password_hash, first_login)
       VALUES ($1, $2, true)
       ON CONFLICT (email) DO NOTHING`,
      [email, startHash]
    );
    dodano++;
    console.log(`✅ ${email}`);
  }

  console.log(`\nGotowe! Dodano ${dodano} pracowników.`);
  await pool.end();
}
setup().catch(console.error);