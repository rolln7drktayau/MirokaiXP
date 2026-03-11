# Livrable Referent - Justification des Choix Techniques

## 1) Analyse des besoins

## Enjeux metier

- Attirer du public et des entreprises sur la Mirokai Experience
- Convertir les visites en reservations Eventbrite
- Proposer une experience narrative mobile immersive pendant la visite
- Permettre a l'equipe interne de faire evoluer les modules sans redevelopper

## Contraintes

- Budget quasi nul (free tiers et open source privilegies)
- Delai court (format competition)
- Priorite mobile (usage sur place)
- Fiabilite operationnelle sans equipe DevOps dediee

## KPI cibles

- Conversion landing -> Eventbrite
- Taux completion parcours experience
- Part B2B/B2C
- Taux no-show (via sequence emails)

## 2) Conception d'architecture

Architecture retenue: **JAMstack pragmatique en monolithe modulaire Next.js + APIs serverless**.

Raisons:

- Time-to-market tres court
- SEO/performances natives (SSR/SSG)
- Une seule base de code front + API
- Deploiement continu simple sur Vercel

## Alternatives comparees

| Option | Avantages | Limites | Decision |
|---|---|---|---|
| Monolithe modulaire Next.js | Rapide, cout bas, maintenance simple | Couplage front/backend | **Retenue** |
| Microservices (Node + API Gateway) | Decouplage fort, scalabilite fine | Complexite ops et cout superieurs | Ecartee (surdimensionnee) |
| Backend separé (Nest/FastAPI) + front Next | Separation stricte des responsabilites | Plus de code, plus de CI/CD | Ecartee pour MVP |
| Full no-code | Vitesse initiale | Limites custom UX/PWA/admin | Ecartee |

## 3) Selection des technologies

| Besoin | Solution retenue | Alternatives | Justification |
|---|---|---|---|
| Front SSR/SSG + API | Next.js 14 | Nuxt, Remix | Ecosysteme mature, App Router, serverless natif |
| Type safety | TypeScript strict | JS pur | Reduction des regressions, meilleur handoff |
| UI rapide | Tailwind | CSS Modules, Styled Components | Vitesse d'iteration et coherence |
| Animations immersives | Framer Motion | GSAP, Motion One | DX React excellente, transitions narratives fluides |
| Validation formulaires | RHF + Zod | Formik + Yup | Performance formulaire + schemas types |
| Tracking | GA4 + GTM + Hotjar | Plausible, Matomo | Outils standards du marche et connus client |
| Emailing | Resend | Brevo, Sendgrid | API simple, bon free tier, templates React |
| DB | Supabase | Firebase, PlanetScale | PostgreSQL, SQL clair, free tier solide |
| Booking | Eventbrite (existant) | Billetweb, Fever, Weezevent | Coherence avec process actuel client |
| Deploiement | Vercel | Netlify, Render | Integration Next optimale, CI/CD simple |

## 4) Pourquoi les choix ne sont pas arbitraires

Chaque choix est relie a une contrainte objective:

- **Budget**: free tiers majoritaires
- **Delai**: stack unifiee pour livrer vite
- **Reprise par un tiers**: typage fort + documentation + structure modulaire
- **Experience utilisateur**: mobile-first, PWA, performances web
- **Conversion business**: UTM stricts Eventbrite + funnel analytics

## 5) Risques et plans de mitigation

| Risque | Impact | Mitigation |
|---|---|---|
| Eventbrite API indisponible | Degradation booking | Fallback URL directe + monitoring |
| Variables env manquantes | Fonctionnalites inactives | Checklist deploy + `.env.example` |
| Contenus media lourds | UX mobile degradee | Compression/streaming + preload metadata |
| Donnees analytics incomplètes | Pilotage biaisé | Events types + fallback serveur |

## 6) Roadmap post-MVP

1. Brancher Eventbrite API temps reel (slots/occupancy)
2. Ajouter tests e2e mobile (Playwright)
3. Ajouter erreurs/monitoring (Sentry)
4. Automatiser seeds et migrations Supabase en CI
5. A/B tests landing (hero, CTA, social proof)

## 7) Conclusion

L'architecture retenue maximise le ratio **impact / effort / cout** pour un contexte competition:

- UX immersive livrable rapidement
- Conversion mesurable de bout en bout
- Admin exploitable sans support technique quotidien
- Base solide pour evolutions futures sans refonte lourde
