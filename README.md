# Destiny: Summoner

Un jeu de gestion de carrière/vie inspiré de **Destiny Eleven**, transposé à
l'univers de **League of Legends**. Incarne un·e jeune joueur·se, du grind
SoloQ amateur jusqu'aux sommets de la scène esportive, saison après saison.

## Boucle de jeu

- Chaque mois, choisis une action : entraînement (mécanique, game sense,
  synergie), étude de VODs, grind SoloQ, repos, stream, scrims d'équipe ou
  tentative de recrutement.
- Gère tes ressources (énergie, moral, santé) et fais progresser tes
  statistiques.
- Grimpe les échelons : Amateur → Équipe Académie → Ligue Challenger →
  Ligue Pro, via des essais et des saisons simulées (18 matchs, classement,
  promotion/relégation).
- Des événements aléatoires ponctuent la carrière (blessures, clips viraux,
  sponsors, drama d'équipe...).
- Prends ta retraite volontairement ou subis les effets de l'âge, puis
  découvre ton titre de légende final.

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

Le moteur de jeu (état, actions, simulation de saison, événements) vit dans
`src/game/`, entièrement découplé de l'UI (`src/components/`), pour pouvoir
être testé et enrichi indépendamment.
