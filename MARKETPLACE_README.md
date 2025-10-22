# Marketplace Unifikacija - Kompletna Dokumentacija

## 📋 Pregled

Uspješno smo konsolidovali tri odvojene tabele (`BookList`, `StudentEquipment`, i planiran `Courses`) u jednu unificiranu `MarketplaceItem` tabelu sa type discriminator pattern-om.

## 🗄️ Baza podataka (Prisma Schema)

### Model: MarketplaceItem

```prisma
model MarketplaceItem {
  id          Int             @id @default(autoincrement())
  type        ItemType        // BOOK | EQUIPMENT | COURSE
  
  // Osnovni podaci (svi tipovi)
  title       String
  faculty     String?
  condition   String?
  price       Decimal         @db.Decimal(10,2)
  description String?         @db.Text
  
  // Book-specifični podaci
  author      String?
  subject     String?
  
  // Equipment-specifični podaci
  brand       String?
  model       String?
  category    EquipmentCategory?  // LAPTOP | TABLET | KALKULATOR | ...
  
  // Dodatni podaci
  images      String[]
  metadata    Json?
  isSold      Boolean         @default(false)
  isArchived  Boolean         @default(false)
  slug        String?
  
  // Relacije
  sellerId    Int
  seller      User            @relation("MarketplaceSeller", fields: [sellerId], references: [id])
  buyerId     Int?
  buyer       User?           @relation("MarketplaceBuyer", fields: [buyerId], references: [id])
  
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  
  @@index([type])
  @@index([sellerId])
  @@index([buyerId])
}
```

### Enumovi

```prisma
enum ItemType {
  BOOK
  EQUIPMENT
  COURSE
}

enum EquipmentCategory {
  LAPTOP
  TABLET
  KALKULATOR
  LAB_OPREMA
  SKOLSKI_PRIBOR
  TEHNICKA_OPREMA
  OSTALO
}
```

## 🛣️ API Endpoints

### Unified Marketplace API

**Endpoint:** `/api/marketplace`

#### GET - Dohvatanje artikala
```typescript
// Svi artikli
GET /api/marketplace

// Filtrirano po tipu
GET /api/marketplace?type=BOOK
GET /api/marketplace?type=EQUIPMENT
GET /api/marketplace?type=COURSE
```

**Response:**
```json
[
  {
    "id": 1,
    "type": "BOOK",
    "title": "Matematika 1",
    "author": "Petar Petrović",
    "subject": "Matematika",
    "faculty": "Elektrotehnički fakultet",
    "condition": "kao-nova",
    "price": 25.00,
    "isSold": false,
    "seller": {
      "id": 1,
      "ime": "Marko",
      "prezime": "Markovic",
      "email": "marko@example.com"
    }
  }
]
```

#### POST - Dodavanje novog artikla
```typescript
POST /api/marketplace
Content-Type: application/json

// Knjiga
{
  "type": "BOOK",
  "title": "Fizika 2",
  "author": "Ana Anić",
  "subject": "Fizika",
  "faculty": "Prirodno-matematički fakultet",
  "condition": "dobro",
  "price": 30,
  "description": "Udžbenik u odličnom stanju",
  "sellerId": 1
}

// Oprema
{
  "type": "EQUIPMENT",
  "title": "MacBook Pro 16",
  "brand": "Apple",
  "model": "MacBook Pro 16\" 2021",
  "category": "LAPTOP",
  "condition": "kao-nova",
  "price": 2500,
  "description": "M1 Max chip, 32GB RAM",
  "sellerId": 1
}

// Kurs
{
  "type": "COURSE",
  "title": "React od početka do profesionalca",
  "subject": "Web Development",
  "faculty": "Online",
  "condition": null,
  "price": 50,
  "description": "Kompletna React obuka",
  "sellerId": 1
}
```

## 📂 Struktura Fajlova

```
app/
├── api/
│   └── marketplace/
│       └── route.ts          # Unified API endpoint
├── kategorije/
│   └── marketplace/
│       ├── [marketplaceslug]/
│       │   └── page.tsx      # Detaljna stranica artikla (sve tipove)
│       ├── polovnih-udzbenika-i-materijala/
│       │   └── page.tsx      # Lista knjiga (type=BOOK)
│       ├── studentske-opreme/
│       │   └── page.tsx      # Lista opreme (type=EQUIPMENT)
│       ├── kursevi/
│       │   └── page.tsx      # Lista kurseva (type=COURSE)
│       └── dodaj-artiklu/
│           └── page.tsx      # Forma za dodavanje

components/
├── MarketPlaceComponents/
│   ├── FormaArticle.tsx      # Unificirana forma sa type selector
│   └── BooksComponents.tsx   # Univerzalna display komponenta

lib/
└── MarketplaceAPI/
    └── marketplaceApi.ts     # API funkcije (fetch, add)
```

## 🎨 UI Komponente

### FormaArticle.tsx - Unificirana Forma

Forma dinamički prikazuje različita polja u zavisnosti od izabranog tipa:

```typescript
// Radio button selector za tip
[BOOK] [EQUIPMENT] [COURSE]

// Obavezna polja (svi tipovi)
- Naslov
- Stanje (condition)
- Cijena
- Opis (optional)
- Fakultet (optional)

// Book-specifična polja
- Autor
- Predmet

// Equipment-specifična polja
- Brend
- Model
- Kategorija (dropdown: LAPTOP, TABLET, etc.)

// Course-specifična polja
- Predmet (kao subject)
```

### BooksComponents.tsx - Univerzalni Display

Prikazuje sve tipove artikala sa type-specific podacima:

```typescript
// Dinamički gradient boje po tipu
BOOK:      teal-500 to blue-600
EQUIPMENT: purple-500 to pink-600
COURSE:    emerald-500 to cyan-600

// Type-specific prikaz
BOOK: prikazuje author & subject
EQUIPMENT: prikazuje brand, model & category
COURSE: prikazuje subject
```

## 🔧 Library Functions

### `fetchMarketplaceItems(type?: ItemType)`

```typescript
import { ItemType } from "@prisma/client";
import { fetchMarketplaceItems } from "@/lib/MarketplaceAPI/marketplaceApi";

// Svi artikli
const allItems = await fetchMarketplaceItems();

// Samo knjige
const books = await fetchMarketplaceItems(ItemType.BOOK);

// Samo oprema
const equipment = await fetchMarketplaceItems(ItemType.EQUIPMENT);

// Samo kursevi
const courses = await fetchMarketplaceItems(ItemType.COURSE);
```

**Server-side optimizacija:**
- Direktan Prisma pristup na serveru
- HTTP fetch fallback na klijentu

### `addMarketplaceItem(payload)`

```typescript
import { addMarketplaceItem } from "@/lib/MarketplaceAPI/marketplaceApi";

const newItem = await addMarketplaceItem({
  type: ItemType.BOOK,
  title: "Nova knjiga",
  author: "Autor",
  // ... ostala polja
});
```

## 🚀 Stranice i Rute

### 1. Knjige (Books)
**Ruta:** `/kategorije/marketplace/polovnih-udzbenika-i-materijala`
- Hero: Teal/Blue gradient
- Filtrira: `type=BOOK`
- Prikazuje: author, subject, faculty

### 2. Oprema (Equipment)
**Ruta:** `/kategorije/marketplace/studentske-opreme`
- Hero: Purple/Pink gradient
- Filtrira: `type=EQUIPMENT`
- Prikazuje: brand, model, category

### 3. Kursevi (Courses)
**Ruta:** `/kategorije/marketplace/kursevi`
- Hero: Emerald/Cyan gradient
- Filtrira: `type=COURSE`
- Prikazuje: subject, description

### 4. Detalji
**Ruta:** `/kategorije/marketplace/[id]`
- Univerzalna stranica za sve tipove
- Dynamic content baziran na item.type

### 5. Dodaj Artikal
**Ruta:** `/kategorije/marketplace/dodaj-artiklu`
- Jedinstvena forma sa type selector
- Conditional field rendering

## ✅ Završene Izmjene

1. ✅ Prisma schema unifikacija (MarketplaceItem model)
2. ✅ Database migration (npx prisma db push)
3. ✅ Prisma Client regeneracija (npx prisma generate)
4. ✅ API endpoint `/api/marketplace` (GET + POST)
5. ✅ `marketplaceApi.ts` library funkcije
6. ✅ `FormaArticle.tsx` rewrite sa TypeScript tipovima
7. ✅ `BooksComponents.tsx` update za sve tipove
8. ✅ Books listing page (ItemType.BOOK)
9. ✅ Equipment listing page (ItemType.EQUIPMENT)
10. ✅ Courses listing page (ItemType.COURSE)
11. ✅ Detail page update (marketplaceItem query)
12. ✅ TypeScript error fixes (uklonjen sav `as any`)

## 🎯 Prednosti Ovog Pristupa

### Jedna Tabela vs Tri Tabele

**Prije:**
- `BookList` tabela
- `StudentEquipment` tabela
- `Courses` tabela (planirana)
- Tri odvojena API endpointa
- Tri skoro identična interfejsa
- Duplikacija koda

**Sada:**
- Jedna `MarketplaceItem` tabela
- Jedan `/api/marketplace` endpoint
- Type discriminator pattern
- Shared polja + optional type-specific
- DRY princip (Don't Repeat Yourself)

### Skalabilnost
Dodavanje novog tipa (npr. `SERVICE`, `TUTORING`):
1. Dodaj novu vrednost u `ItemType` enum
2. Opciono dodaj specifična polja u schema
3. Update FormaArticle conditional rendering
4. Kreiraj novu listing stranicu
5. Gotovo!

## 🔍 Testiranje

Za testiranje kompletnog sistema:

```bash
# 1. Pokreni dev server
npm run dev

# 2. Testiraj dodavanje
# - Idi na /kategorije/marketplace/dodaj-artiklu
# - Dodaj BOOK sa author/subject
# - Dodaj EQUIPMENT sa brand/model/category
# - Dodaj COURSE sa subject

# 3. Testiraj prikaz
# - /kategorije/marketplace/polovnih-udzbenika-i-materijala (trebaju knjige)
# - /kategorije/marketplace/studentske-opreme (treba oprema)
# - /kategorije/marketplace/kursevi (trebaju kursevi)

# 4. Testiraj detalje
# - Klikni na bilo koji artikal
# - Provjeri da li prikazuje pravilno type-specific polja
```

## 📊 Database Query Primjeri

```typescript
// Sve knjige
const books = await prisma.marketplaceItem.findMany({
  where: { type: ItemType.BOOK }
});

// Laptop oprema
const laptops = await prisma.marketplaceItem.findMany({
  where: {
    type: ItemType.EQUIPMENT,
    category: EquipmentCategory.LAPTOP
  }
});

// Neprodato
const available = await prisma.marketplaceItem.findMany({
  where: { isSold: false }
});

// Prosečna cijena knjiga
const avgBookPrice = await prisma.marketplaceItem.aggregate({
  where: { type: ItemType.BOOK },
  _avg: { price: true }
});
```

## 🎓 Najbolje Prakse

1. **Type Safety:** Koristi `ItemType` enum, nikad string literale
2. **Optional Fields:** Sva type-specific polja su nullable
3. **Validation:** Validiraj obavezna polja po tipu na API nivou
4. **Indexing:** `@@index([type])` za brže queries
5. **Decimal za cijenu:** `Decimal(10,2)` za preciznost

## 📝 Zaključak

Marketplace je sada potpuno unificiran sa:
- ✅ Čistom arhitekturom (jedna tabela, jedan API)
- ✅ Type-safe TypeScript kodom
- ✅ Fleksibilnim UI komponentama
- ✅ Svim tri tipovima (BOOK, EQUIPMENT, COURSE)
- ✅ Server-side optimizacijom
- ✅ Bez TypeScript errora

Sistem je spreman za production i jednostavno se može proširivati! 🚀
