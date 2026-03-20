import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const KNOWLEDGE = `
# BAZA WIEDZY ECO-TEAM — pełna wersja (aktualizacja: 03.2026)

## 1. O FIRMIE ECO-TEAM

Firma Eco-Team założona w 2012 roku w Częstochowie. Specjalizacja: montaż instalacji z naciskiem na odnawialne źródła energii. Działamy na terenie całej Polski, obsługując klientów indywidualnych i instytucjonalnych.

Siedziba główna: ul. Władysława Jagiełły 60, 42-202 Częstochowa
Dział realizacji inwestycji: ul. Jagiellońska, Częstochowa
Kotłownia osiedlowa: ul. Pankiewicza, Częstochowa
Wszystkie budynki firmy wyposażone w instalacje PV o łącznej mocy 115,5 kW (~110 MWh rocznie)

MISJA: Łącząc wiedzę z wieloletnim doświadczeniem, podnosimy komfort życia. Nasze nowoczesne i kompleksowe rozwiązania każdego dnia przyczyniają się do kształtowania przyszłości, w której zarówno czysta energia jak i troska o środowisko stają się standardem dla wszystkich.

WIZJA: Stanie się firmą pierwszego wyboru dla klientów, pracowników i partnerów. Organizacja o niekwestionowanej reputacji, dążąca do najwyższej jakości, kierując się etycznymi zasadami.

TRZY FILARY DZIAŁANIA:
- LUDZIE: Nasi pracownicy to nasza największa wartość. Dzięki ich zaangażowaniu, pasji i profesjonalizmowi możemy realizować najbardziej ambitne projekty. Inwestujemy w szkolenia i możliwości rozwoju.
- FIRMA: Dążymy do doskonałości poprzez optymalizację procesów. Kultura organizacyjna opiera się na uczciwości, współpracy i wzajemnym szacunku.
- ROZWÓJ: Ciągłe doskonalenie i rozwijanie nowych usług. Jako firma odpowiedzialna społecznie, stawiamy na zrównoważony rozwój.

HISTORIA FIRMY:
- 2012: Założenie firmy Eco-Team w Częstochowie
- 2013: Pierwszy wygrany przetarg — modernizacja kotłowni gazowej w ZOO Chorzów
- 2014: Sukces w największych w Polsce przetargach parasolowych na łączną kwotę 100 mln zł
- 2019: Otwarcie showroomu i nowej siedziby
- 2022: 10-lecie działalności i wyróżnienie w plebiscycie Forbes 2022
- 2023: Przekroczenie 100 mln zł obrotu, rozszerzenie działalności o własną kotłownię
- 2024: Gazela Biznesu, nagroda Jurajski Produkt Roku, rozpoczęcie prac nad pierwszym raportem ESG

USŁUGI I PRODUKTY:
Odnawialne źródła energii: fotowoltaika, magazyny energii, klimatyzacja i wentylacja, pompy ciepła, kotły na biomasę, kolektory słoneczne
Budownictwo energooszczędne: budynki pasywne i niskoenergetyczne
Instalacje sanitarne: sieci wodne i kanalizacyjne, przydomowe oczyszczalnie ścieków
Doradztwo i serwis: pomoc w pozyskiwaniu finansowania, usługi serwisowe, dostarczanie ciepła do dzielnicy miasta


## 2. STRUKTURA ORGANIZACYJNA

ZARZĄD i spółki grupy:
- CEO ECO-TEAM SP. Z O.O.
- ECO-TEAM SP. Z O.O. SP. K. (Realizacja Inwestycji)
- Dział Serwisu
- Dział Logistyki
- Kotłownia
- Administracja

CEO Eco-Team Sp. z o.o.:
- Dyrektor: Łukaszewski Mateusz
- Zespół Logistyki — Kierownik: Krajewski Damian
- Zespół ds. Dokumentacji i Dofinansowań — Kierownik: Kasprzyk Anna
- Zespół Realizacji Zleceń — Kierownik: Zjawiony Dorian
- Stanowiska: Specjalista ds. Wsparcia Sprzedaży, Manager ds. Rozwoju, Specjalista ds. Marketingu, Specjalista ds. Zakupów, Magazynier, Kierowca, Specjalista ds. Dofinansowań (x3), Specjalista ds. Dokumentacji OZE (x3), Koordynator Realizacji OZE, Inżynier, Serwisant, Asystent Koordynatora (x2)

ECO-TEAM Sp. z o.o. Sp. k. (Realizacja Inwestycji):
- Dyrektor: Olas Aleksandra
- Zespół Ofertowy — Kierownik: Cierpisz Katarzyna
- Stanowiska: Specjalista ds. Ofert (x3), Ekspert ds. Podwykonawców, Specjalista ds. Zakupów (x2), Specjalista ds. Umów, Inżynier Budowy (x4), Asystent Inżyniera Budowy (x3), Asystent Zespołu

Dział Logistyki:
- Dyrektor: Krajewski Damian
- Stanowiska: Specjalista ds. Logistyki, Asystent ds. Logistyki, Magazynier (x3)

Dział Serwisu:
- Kierownik: Bajor Artur
- Stanowiska: Konsultant-Koordynator, Konsultant, Automatyk/Elek PV PC Gaz Biomasa, Serwisant Solar Biomasa (x2), Serwisant Solar, Specjalista ds. Zaopatrzenia

Administracja:
- Zespół Techniczny — Dyrektor: Krakowski Rafał; Pracownik wsparcia technicznego: Kawczak Łukasz
- Pracownik Kancelarii
- Księgowość — Główna Księgowa: Soja Dorota; Księgowa (x3), Młodsza Księgowa, Asystent ds. Płatności
- Zespół ds. Personelu — Specjalista ds. Kadr: Ordowska Dorota; Specjalista ds. HR: Mitrafanava Natalia


## 3. KONTAKTY

- Pałuszka Jerzy — Prezes Zarządu — tel. 883-222-779 — j.paluszka@eco-team.net
- Łukaszewski Mateusz — Dyrektor Zarządzający CEO Eco-Team — tel. 883-222-940 — m.lukaszewski@eco-team.net
- Olas Aleksandra — Dyrektor Działu Realizacji Inwestycji — tel. 883-222-776 — a.olas@eco-team.net
- Krajewski Damian — Dyrektor Logistyki — tel. 883-222-699 — d.krajewski@eco-team.net
- Krakowski Rafał — Dyrektor ds. Technicznych — tel. 883-222-591 — r.krakowski@eco-team.net
- Bajor Artur — Kierownik Serwisu — tel. 883-222-748 — a.bajor@eco-team.net
- Zjawiony Dorian — Kierownik Zespołu Realizacji Zleceń — tel. 883-222-609 — d.zjawiony@eco-team.net
- Kasprzyk Anna — Kierownik Zespołu ds. Dokumentacji i Dofinansowań — tel. 883-222-018 — a.kasprzyk@eco-team.net
- Soja Dorota — Główna Księgowa — tel. 883-222-355 — ksiegowosc@eco-team.net
- Ordowska Dorota — Specjalista ds. Kadr — tel. 883-222-775 — d.ordowska@eco-team.net
- Mitrafanava Natallia — Specjalista ds. HR — tel. 883-222-047 — n.mitrafanava@eco-team.net
- Horabik Magdalena — Sekretariat/Administracja — tel. 34 343-02-88 / 883-222-757 — m.horabik@eco-team.net
- Kawczak Łukasz — Specjalista ds. Wsparcia Technicznego — tel. 883-222-778 — l.kawczak@eco-team.net


## 4. WARUNKI ZATRUDNIENIA I CZAS PRACY

Podstawa prawna: art. 29 § 3 Kodeksu Pracy

Czas pracy:
- Norma dobowa: 8 godzin, tygodniowa: przeciętnie 40 godzin
- Pięciodniowy tydzień pracy

Wynagrodzenie:
- Wypłata do 10. dnia każdego miesiąca, przelewem na konto pracownika
- Jeśli 10. to dzień wolny — wypłata w dniu poprzedzającym
- Na pisemny wniosek możliwa wypłata gotówką w kasie firmy (ul. Jagiełły 60, godz. 10:00-13:00)

Przerwy w pracy:
- Minimum 15 minut przy pracy co najmniej 6 godzin (wliczana do czasu pracy)
- Dodatkowe 15 minut przy pracy powyżej 9 godzin
- Co najmniej 5 minut po każdej godzinie pracy przy monitorze ekranowym
- Kobiety w ciąży przy monitorze: max 50 minut jednorazowo, potem 10 minut przerwy
- Matki karmiące: dwie półgodzinne przerwy wliczone do czasu pracy


## 5. NIEOBECNOŚCI I URLOPY

Regulamin obowiązuje od 14.02.2025.

Zgłaszanie nieobecności:
- Termin: najpóźniej w dniu nieobecności
- Komu zgłosić: przełożonemu I działowi kadr
- Forma: email lub telefon
- Co podać: rodzaj nieobecności (urlop, choroba itp.) i szacowany czas trwania

Usprawiedliwienie nieobecności:
- Urlop: email z potwierdzeniem urlopu
- Choroba: zwolnienie lekarskie (L4)
- Brak powiadomienia = nieusprawiedliwiona nieobecność = brak wynagrodzenia za te dni

Wyjścia prywatne w godzinach pracy:
- Obowiązek wpisania do "zeszytu wyjść" z godziną wyjścia i powrotu
- Alternatywnie: zgłoszenie mailowe (gdy brak dostępu do zeszytu)
- Rozliczenie kwartalne: jako urlop wypoczynkowy lub odpracowanie

Kontakt do kadr: d.ordowska@eco-team.net
Kontakt do HR: n.mitrafanava@eco-team.net


## 6. BENEFITY — POLITYKA BENEFITOWA

Polityka obowiązuje od 01.07.2025. Dotyczy: ECO-TEAM Sp. z o.o. sp. k. oraz CEO Eco-Team Sp. z o.o.

Dostępne benefity (dobrowolne):
1. Pakiet prywatnej opieki medycznej
2. Karta sportowa Medicover Sport

Kto może skorzystać:
- Pracownicy na umowie o pracę: z dofinansowaniem pracodawcy
- Osoby na B2B i innych formach zatrudnienia: mogą przystąpić, ale BEZ dofinansowania (pełny koszt własny)

Dofinansowanie pracodawcy do karty sportowej (tylko umowa o pracę):
- Do 12 miesięcy stażu: 0 zł
- 1-2 lata stażu: 50 zł
- 3-5 lat stażu: 100 zł
- 6-9 lat stażu: 150 zł
- 10 i więcej lat stażu: 300 zł

Przegląd stażu i aktualizacja kwot: dwa razy w roku — 30 czerwca i 30 grudnia.
Nowa kwota dofinansowania obowiązuje od miesiąca następującego po przeglądzie.

Rozliczenie kosztów:
- Koszt pakietu minus dofinansowanie pracodawcy = potrącenie z wynagrodzenia
- Pracownik płaci też podatek dochodowy od wartości dofinansowania (12%)
- Przykład: pakiet 100 zł, dofinansowanie 50 zł, udział pracownika 50 zł + podatek 6 zł = łącznie 56 zł potrącenia z pensji

Rezygnacja z benefitu:
- 1 miesiąc wypowiedzenia, liczony od 10 dnia miesiąca zgłoszenia
- Przez formularz online lub pisemnie w HR
- Przy rezygnacji dofinansowanie NIE jest wypłacane w gotówce

Ważna informacja: Decyzja o kontynuacji dofinansowania zależy od sytuacji finansowej firmy. Pracodawca może zawiesić lub zmienić dofinansowanie z przyczyn ekonomicznych.

Kontakt w sprawie benefitów: n.mitrafanava@eco-team.net


## 7. KARTA SPORTOWA MEDICOVER SPORT

Jak się zapisać:
- Strona: www.medicoversport.pl/pakiety/firma
- Zapisy i rezygnacje: TYLKO między 1 a 15 dniem miesiąca
- Wypełnić formularz na stronie — jednorazowo zakłada konto i składa zamówienie
- Podać numer telefonu (niezbędny do wejść do obiektów)

Jak korzystać z karty:
1. Po rejestracji otrzymasz SMS powitalny
2. Sprawdź czy pakiet jest aktywny: wyślij SMS "PAKIET" na numer 661 000 556
3. Znajdź obiekt: www.medicoversport.pl/wyszukiwarka
4. Zarejestruj wejście przez: aplikację mobilną, kod QR lub SMS

Rejestracja wejścia przez SMS:
- Wyślij SMS na 661 000 556 z kodem usługi (kod dostaniesz w recepcji obiektu)
- Pokaż SMS zwrotny w recepcji

Przydatne komendy SMS (na numer 661 000 556):
- "PAKIET" — sprawdź czy pakiet jest aktywny
- "ILE" — sprawdź ile pozostało wejść
- "REZYGNUJE" — anuluj błędnie zarejestrowane wejście

Aplikacja Medicover Sport: dostępna na App Store i Google Play
- Wyszukuj obiekty w okolicy
- Filtruj po rodzajach aktywności
- Rejestruj wejścia przez kod QR
- Dodawaj obiekty do ulubionych

Zarządzanie kontem (po zalogowaniu na www.medicoversport.pl/pakiety/firma):
- Rezygnacja: przycisk "Rezygnuję"
- Zmiana pakietu: najpierw rezygnacja, potem nowe zamówienie przez "Dodaj pakiet"
- Dodanie pakietu dla dziecka: przycisk "Dodaj pakiet" w sekcji "Kolejne pakiety"
- Zmiana numeru telefonu lub emaila: zgłosić do HR

BOK Medicover Sport:
- Email: bok@medicoversport.pl
- Tel: 22 290 80 70
- Pon-Pt: 7:30-21:00, Sob-Niedz: 8:00-20:00

DOSTĘPNE PAKIETY:

Pakiet goFIT (dla pracownika):
- Ponad 20 rodzajów aktywności: siłownia, basen, zajęcia fitness, tenis, joga, squash, sporty walki, cardio, nordic walking, taniec, sauna, grota solna, lodowisko, ścianka wspinaczkowa i wiele więcej
- Około 4200 obiektów w całej Polsce
- Opcje: 2x w tygodniu (83 zł), Open raz dziennie (131 zł), Open bez limitu (182 zł)

Pakiet FIT&more (dla pracownika):
- Wszystko z goFIT PLUS obiekty rozrywkowe: kręgle, bilard, gokarty, paintball, park trampolin, park linowy, wrotki, stoki narciarskie, trening personalny i więcej
- Około 4600 obiektów w całej Polsce
- Opcje: 2x w tygodniu (93 zł), Open raz dziennie (141 zł), Open bez limitu (192 zł)

Pakiet Aqua (dla dzieci 6-15 lat):
- Baseny, parki wodne, aquaparki
- Około 600 obiektów
- Opcje: 2x w tygodniu (49 zł), Open raz dziennie (55 zł)

Pakiet Junior (dla dzieci):
- Basen, siłownia, taniec, karate, judo, sale zabaw, park trampolin, park linowy i wiele więcej
- Około 1900 obiektów
- Opcje: 2x w tygodniu (75 zł), Open raz dziennie (90 zł)

Pakiety dla osoby towarzyszącej:
- goFIT: 2x w tygodniu (136 zł), Open raz dziennie (175 zł)
- FIT&more: 2x w tygodniu (146 zł), Open raz dziennie (185 zł)

Uwaga: ceny zawierają VAT, oferta ważna 30 dni od daty wystawienia.


## 8. OPIEKA MEDYCZNA

Firma jest w trakcie zmiany dostawcy opieki medycznej.
Dotychczasowy dostawca LuxMed — współpraca kończy się 30.05.2026.
W sprawie szczegółów aktualnej oferty i nowego dostawcy skontaktuj się z HR: n.mitrafanava@eco-team.net


## 9. SAMOCHÓD SŁUŻBOWY

Regulamin korzystania z samochodów służbowych ECO-TEAM Sp. z o.o. sp. k.

Obowiązki pracownika:
- Przestrzeganie terminów rejestracji pojazdu
- Posiadanie ważnych uprawnień do kierowania
- Dbałość o stan techniczny i czystość pojazdu
- Wymiana opon na sezonowe we właściwym czasie
- Dokonywanie przeglądów i badań technicznych w wyznaczonych terminach
- Posiadanie aktualnej gaśnicy i apteczki
- Użytkowanie zgodnie z instrukcją obsługi i przepisami ruchu drogowego
- Uzupełnienie baku do pełna w każdy piątek (lub ostatni dzień roboczy tygodnia)
- Wpisywanie do zeszytu pojazdu każdego korzystania przez inną osobę

Zasady korzystania podczas urlopu/zwolnienia:
- Podczas urlopu lub L4: obowiązek przekazania samochodu przełożonemu lub wskazanej osobie
- Korzystanie z samochodu podczas urlopu: wymagana pisemna lub mailowa zgoda przełożonego
- Koszty naprawy powstałe podczas urlopu: pokrywa pracownik

Zakazy:
- Zakaz przewożenia osób spoza firmy bez zgody przełożonego
- Zakaz przekazywania samochodu do prowadzenia osobom spoza firmy (chyba że zgoda Prezesa)
- Zakaz instalowania urządzeń bez zgody Prezesa
- Podczas podróży służbowej: zakaz zabierania osób prywatnych bez zgody przełożonego

Odpowiedzialność materialna: zgodnie z Kodeksem pracy, Dział piąty.


## 10. OCHRONA DANYCH OSOBOWYCH (RODO)

Regulamin ochrony danych osobowych ECO-TEAM Sp. z o.o. Sp. k.

Obowiązki każdego pracownika:
- Przed dopuszczeniem do pracy: zapoznanie się z Regulaminem RODO i podpisanie Oświadczenia o poufności
- Przetwarzanie danych tylko w zakresie i celu określonym przez administratora
- Zachowanie tajemnicy danych osobowych do których ma dostęp
- Ochrona danych przed zniszczeniem, utratą, nieuprawnionym dostępem

Zakazy:
- Zakaz przekazywania danych osobom nieuprawnionym
- Zakaz udostępniania danych przez telefon osobom, których tożsamości nie można potwierdzić
- Zakaz umożliwiania innym korzystania ze swojego konta/loginu
- Zakaz samowolnego otwierania sprzętu IT lub instalowania dodatkowych urządzeń

Zasady korzystania ze sprzętu:
- Każdy pracownik ma własny login i hasło
- Przy opuszczeniu stanowiska: włączyć wygaszacz ekranu z hasłem lub wylogować się
- Po zakończeniu pracy: wylogować się, wyłączyć komputer
- Zagubienie/zniszczenie sprzętu: natychmiast zgłosić administratorowi danych
- Dbałość o to, aby osoby niepowołane nie widziały ekranu


## 11. UMOWA O ZACHOWANIU POUFNOŚCI

Obowiązuje od: 07.01.2026

Zakres poufności (przez czas zatrudnienia + 3 lata po zakończeniu):
- Ceny zakupu i sprzedaży, marże, wielkości sprzedaży
- Wzory dokumentacji wewnętrznej (pliki Word, Excel, szablony)
- Bazy danych dostawców, odbiorców i kontrahentów
- Informacje techniczne, technologiczne, organizacyjne i finansowe
- Plany biznesowe, dane personalne i statystyczne
- Wszelkie inne informacje oznaczone klauzulą poufności

Obowiązki:
- Zakaz rozpowszechniania, kopiowania i udostępniania informacji poufnych
- Po zakończeniu zatrudnienia: zwrot wszystkich dokumentów i nośników z informacjami poufnymi

Konsekwencje naruszenia:
- Rozwiązanie umowy bez wypowiedzenia (art. 52 § 1 pkt 1 Kodeksu pracy)
- Odpowiedzialność materialna za szkody pracodawcy
- Kara umowna

Wyjątki: ujawnienie wymagane przez przepisy prawa lub właściwe organy (pracownik musi wcześniej poinformować pracodawcę).
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });

    const lastMessage = messages[messages.length - 1].content;

    const prompt = `Nie używaj zwrotów "dział kadr" ani "dział HR" — w firmie są: Specjalista ds. Kadr (Ordowska Dorota) i Specjalista ds. HR (Mitrafanava Natallia). NIE zaczynaj odpowiedzi od powitania — nie pisz "Dzień dobry", "Cześć", "Cieszę się że mogę pomóc" ani żadnych innych powitań. Przejdź od razu do odpowiedzi na pytanie. NIE używaj formatowania Markdown — nie używaj gwiazdek, hashtagów, podkreśleń ani żadnych innych symboli formatowania. Pisz zwykłym tekstem.'

BAZA WIEDZY:
${KNOWLEDGE}

Pytanie pracownika: ${lastMessage}

Twoja odpowiedź:`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { reply: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.' },
      { status: 500 }
    );
  }
}