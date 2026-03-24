import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  const { email, password, newPassword } = await req.json();

  // Sprawdź czy użytkownik istnieje
  const result = await pool.query(
    "SELECT * FROM eco_users WHERE email = $1 AND is_active = true",
    [email]
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Nie znaleziono użytkownika z tym adresem email." },
      { status: 401 }
    );
  }

  const user = result.rows[0];
  const passwordOk = await bcrypt.compare(password, user.password_hash);

  if (!passwordOk) {
    return NextResponse.json(
      { error: "Nieprawidłowe hasło." },
      { status: 401 }
    );
  }

  // Pierwsze logowanie — wymagana zmiana hasła
  if (user.first_login && !newPassword) {
    return NextResponse.json({ firstLogin: true });
  }

  // Ustaw nowe hasło przy pierwszym logowaniu
  if (user.first_login && newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE eco_users SET password_hash = $1, first_login = false WHERE email = $2",
      [hash, email]
    );
  }

  // Utwórz sesję
  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await pool.query(
    `INSERT INTO eco_sessions (token, email, expires_at)
     VALUES ($1, $2, $3)
     ON CONFLICT DO NOTHING`,
    [sessionToken, email, expires]
  );

  const response = NextResponse.json({ success: true });
  response.cookies.set("eco-session", sessionToken, {
    httpOnly: true,
    secure: true,
    expires,
    path: "/",
  });

  return response;
}