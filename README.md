# Web Élite — site portfolio

Site vitrine pour ton propre studio, présentant Brasier et Mèche comme réalisations. Même principe que les précédents : un seul dossier, formulaire de contact déjà connecté.

## Ce que contient ce dossier

```
package.json
app/
  layout.js
  globals.css
  page.js            ← tout le contenu + le formulaire de contact
```

## Avant de mettre en ligne : récupère ta clé Web3Forms

Tu peux réutiliser la même clé que pour Brasier et Mèche si tu veux recevoir tous les messages au même endroit — sinon crée-en une nouvelle sur [web3forms.com](https://web3forms.com).

Ouvre `app/page.js`, remplace `COLLE_TA_CLE_ICI` (tout en haut) par ta clé, entre guillemets.

## Étapes pour le mettre en ligne (identiques aux précédents)

1. [github.com](https://github.com) → connecte-toi
2. **+** → **New repository** → nomme-le par exemple `web-elite` → **Create repository** (ne coche rien)
3. **uploading an existing file**
4. Ouvre ce dossier sur ton ordinateur, sélectionne tout son contenu (Ctrl+A / Cmd+A), glisse-le dans la zone GitHub — y compris le dossier `app` tel quel
5. **Commit changes**
6. [vercel.com](https://vercel.com) → **Continue with GitHub**
7. **Add New** → **Project** → `web-elite` → **Import** → **Deploy**

## Rappel utile

Avant de toucher à GitHub, désactive la traduction automatique de ton navigateur (icône dans la barre d'adresse → "Afficher la page d'origine"), sinon le contenu des fichiers peut être abîmé pendant l'envoi — comme ça t'est arrivé sur Brasier et Mèche.

Si le build échoue sur Vercel, copie-colle le log complet et vérifie en particulier que `layout.js` et `globals.css` n'ont pas leur contenu inversé.
