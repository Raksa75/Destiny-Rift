# Destiny: Summoner

Un jeu de gestion de carrière/vie inspiré de **Destiny Eleven**, transposé à
l'univers de **League of Legends**.

## Ce qui existe pour l'instant

- **Menu principal** avec bascule de langue (Français/English), et accès à
  Mes Joueurs, la Boutique et la création d'une nouvelle carrière.
- **Mes Joueurs** : historique de toutes les carrières créées (persistées en
  local).
- **Boutique** : écran à venir pour l'équipement cosmétique du joueur.
- **Assistant de création de carrière** :
  1. Pseudo du joueur
  2. Pays d'origine, regroupé par région (Europe/LEC, Corée/LCK, Chine/LPL,
     Amérique du Nord/LCS, LATAM/LLA, Australie/LCO, Asie/PCS)
  3. Rôle (Top, Jungle, Mid, ADC, Support)
  4. Régime alimentaire (impacte les stats de départ)
  5. Parcours avant la pro / talent (impacte les stats et le potentiel)
  6. Révélation des statistiques de départ (Micro, Macro, Teamfight, Lane,
     Mental, Sérieux), de la popularité et du potentiel (0-5 étoiles), puis
     proposition de 5 clubs de la région d'origine (Division 4 à Ligue
     Majeure) dont la qualité dépend du niveau du joueur généré.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
npm run lint      # oxlint
```

- `src/i18n/` : dictionnaires FR/EN et contexte de traduction
- `src/data/` : régions/pays/ligues, régimes, talents, génération des clubs
- `src/lib/storage.ts` : persistance locale des carrières
- `src/components/` : UI (menu, mes joueurs, boutique, assistant de création)
