<p align="center">
  Traductions ➜&nbsp;
  <a href="../README.md"><img src="https://flagcdn.com/256x192/us.png" width="48" alt="United States Flag"></a>
  <a href="TR.md"><img src="https://flagcdn.com/256x192/tr.png" width="48" alt="Turkey Flag"></a>
  <a href="DE.md"><img src="https://flagcdn.com/256x192/de.png" width="48" alt="Germany Flag"></a>
  <a href="ES.md"><img src="https://flagcdn.com/256x192/es.png" width="48" alt="Spain Flag"></a>
  <a href="RU.md"><img src="https://flagcdn.com/256x192/ru.png" width="48" alt="Russia Flag"></a>
  <a href="JA.md"><img src="https://flagcdn.com/256x192/jp.png" width="48" alt="Japan Flag"></a>
  <a href="CN.md"><img src="https://flagcdn.com/256x192/cn.png" width="48" alt="China Flag"></a>
</p>

---

> [!NOTE]
> **Bonjour, après l’introduction de nouvelles mesures, j’ai décidé de développer ce bot, terminé en une seule journée. En raison de ces mesures, il semble pour l’instant impossible de créer un bot entièrement automatisé. ~~Grâce à une faille, il était possible de dessiner depuis 12 comptes en une seconde avec une seule vérification (soit 12 * 62 = <strong>744</strong> pixels/s si les comptes étaient pleins).~~ Après une mise à jour, cette faille a été corrigée ; vous devrez donc obtenir un jeton à nouveau pour chaque envoi de compte. Si vous êtes prêt, j’explique ci‑dessous comment l’utiliser.**

---

<p align="center"><strong>WPlace UltraBOT</strong></p>

<p align="center">
  Avec plusieurs comptes, vous pouvez ajouter les pixels souhaités sur <a href="https://wplace.live" target="_blank">WPlace</a>.
</p>

---

<p align="center"><strong>🚀┃ Installer le bot :</strong></p>

<p align="center">
  Le bot est facile à installer mais difficile à maîtriser. Sans plaisanter, il peut sembler difficile à utiliser au début ; mais après les dernières mesures, il n’existe pas d’autre bot qui fonctionne ainsi, donc l’effort en vaut la peine.
</p>

<br>

### 🔧┃Installation (FR)

- Prérequis :
  - Node.js >= 18.18.0

- Étapes :
  1. Installer les dépendances :
     
     ```bash
     npm install
     ```
  2. Démarrer l’application :
     
     ```bash
     npm start
     ```
  3. Ouvrir `http://localhost:3000` dans votre navigateur.

<details open>
  <summary><h2>📖┃Tutoriel</h2></summary>

---

![Partie 1](https://i.imgur.com/yS9093x.png)

Lorsque vous allez sur `localhost:3000`, vous devriez voir une page comme celle-ci.<br>

---

![Partie 2](https://i.imgur.com/taF0I2T.png)

Ouvrez un nouvel onglet et allez sur `chrome://extensions/`.<br>
Activez le mode développeur.<br>

![](https://i.imgur.com/oe42A42.png)

Cliquez sur « Load unpacked » (Charger l’extension non empaquetée).<br>

![](https://i.imgur.com/jPyzOr3.png)

Sélectionnez le dossier `WPlace-Helper`.<br>

---

![Partie 3](https://i.imgur.com/YVyvw3a.png)

Allez sur la page `wplace.live`.<br>
Appuyez sur `F12`.<br>
Dans la fenêtre qui s’ouvre, sélectionnez l’onglet « Application » en haut (si vous ne le trouvez pas, cliquez sur la zone indiquée en jaune puis sélectionnez-le).<br>
Cliquez sur `cf_clearance` et copiez sa valeur en bas.<br>

---

![Partie 4](https://i.imgur.com/sJvyiC6.png)

Revenez sur le bot.<br>
Cliquez sur « Accounts », puis sur « Settings ». Collez la valeur copiée dans le champ `cf_clearance` et enregistrez.

---

![Partie 5](https://i.imgur.com/vJkPMx8.png)

Allez sur `wplace.live`. Lorsque vous cliquez sur l’extension en haut, elle devrait ressembler à ceci.<br>
Après vous être assuré que la section « pixel token » est activée, essayez de peindre un pixel sur la carte normalement.<br>

![Partie 5 (Erreur)](https://i.imgur.com/uZmJDad.png)

Si vous obtenez l’erreur affichée, vous êtes sur la bonne voie. Cliquez de nouveau sur l’extension, et les informations « World X » et « World Y » pour l’endroit tenté apparaîtront. Copiez-les.<br>

---

![Partie 6](https://i.imgur.com/LniE1E8.png)

Lorsque vous saisissez les coordonnées World X et World Y et cliquez sur « fetch », une carte comme sur l’image devrait apparaître.<br>

---

![Partie 7](https://i.imgur.com/vJkPMx8.png)

Revenez à la page précédente, cliquez sur l’extension et copiez « Account Token ».

---

![Partie 8](https://i.imgur.com/8sjhH1L.png)

![Partie 8](https://i.imgur.com/jPyzOr3.png)

Ensuite, vous serez dirigé vers la section Comptes. Cliquez sur « Add Account ». Sur la page qui s’ouvre :
- Vous pouvez saisir n’importe quel nom de compte.
- Dans le champ « Account Token », collez la valeur copiée à l’étape précédente.
- Enfin, cliquez sur « Add ».

---

![Partie 9](https://i.imgur.com/DJUEywj.png)

Après avoir ajouté autant de comptes que vous le souhaitez, vous pouvez voir en haut à droite le nombre total de pixels et vos pixels disponibles pour tous vos comptes.<br>
L’image que vous téléversez est automatiquement convertie en palettes de couleurs gratuites disponibles sur le site et est téléversée ainsi. Ce système sera encore amélioré à l’avenir.

Une fois que vous avez téléversé une image via « Upload Image » :

- En haut à gauche de l’image, le nombre de pixels requis pour l’image s’affiche.
- En haut à droite de l’image, il y a un bouton de verrouillage. Lorsque vous verrouillez, vous ne pouvez plus déplacer l’image. Cliquer sur « X » supprime l’image.
- Vous pouvez voir toutes vos images téléversées dans la barre de gauche. Si vous ne trouvez pas une image sur la page, cliquez dessus dans la barre pour y être conduit directement.

---

![Partie 10](https://i.imgur.com/Dzt1p3o.png)

Cliquez sur le bouton « Ready ». Dans la fenêtre qui apparaît, cliquez sur « Select Account » pour choisir vos comptes actifs. Lorsque vous avez terminé, cliquez à nouveau sur « Select Account » pour fermer la fenêtre.

---

![Partie 11](https://i.imgur.com/QKJRVL9.png)

En zoomant sur l’image, chaque pixel transparent que vous remplissez sera coloré avec la couleur correspondante de votre image téléversée, et vous ne pourrez placer des pixels qu’à l’intérieur des limites de l’image. Si vous sélectionnez une couleur spécifique, vous pouvez peindre n’importe où, jusqu’à votre capacité maximale de pixels.

---

![Partie 12](https://i.imgur.com/vJkPMx8.png)

Revenez sur la page WPlace et, le jeton précédent ayant expiré, essayez d’envoyer un nouveau pixel et copiez le nouveau « pixel token ».

---

![Partie 13](https://i.imgur.com/wDp07pH.png)

Ensuite, revenez sur notre page, collez la valeur dans le champ « token » et cliquez sur « Start ».

---

![Partie 14](https://i.imgur.com/iQTH5TR.png)

Si tout a été fait correctement, vous devriez recevoir une notification comme celle-ci, et les modifications devraient être appliquées sur la carte. C’est tout ; vous pouvez créer l’image de votre choix en répétant ces étapes.

</details>

<br>

> [!IMPORTANT]
> <p><sub><strong>1.</strong> Dans la section Comptes, si vous cliquez sur « Check Pixel », vous pouvez vérifier manuellement les pixels restants pour ce compte. Normalement, cela se fait automatiquement toutes les 90 secondes.</sub></p>
> <p><sub><strong>2.</strong> Les jetons de compte durent environ 3 à 4 heures. Lors de la vérification automatique, si un jeton a expiré, le compte devient inactif. Vous pouvez le réactiver en saisissant le nouveau jeton dans la section Modifier puis en cliquant sur Check Pixel.</sub></p>
> <p><sub><strong>3.</strong> Lorsque le jeton d’envoi apparaît sur le panneau, vous devez être rapide. Si vous êtes trop lent, le jeton expire et vous recevrez une erreur 403.</sub></p>

<br>

Comme tout le projet a été préparé en une journée, n’oubliez pas de signaler toute lacune ou toute fonctionnalité souhaitée.

---

<p align="center">
  <img src="https://i.imgur.com/msR5dM9.png" alt="Accueil"/>
</p>

---

### 📋┃À faire

- [x] Traductions [TR/USA]
- [ ] Correction des bugs des scripts
- [x] Tutoriels

---

<p align="center">
  <a href="#"><img src="https://komarev.com/ghpvc/?username=xacter&repo=WPlace-UltraBOT&style=for-the-badge&label=Views:&color=gray"/></a>
</p>


