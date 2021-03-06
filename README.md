# Hands-on lab "Web Real Time Communication par la pratique"
### Devoxx France 2016

## Présentation de la session
Partez à la découverte des principales apis HTML5 vous permettant de mettre en place une salle de cours virtuelle avec vidéo, text chat et du partage d'écran!

Au programme :
 - La découverte des apis MediaStream, RTCPeerConnection, RTCDataChannel
 - Ajout de l'audio et de la vidéo dans votre page et manipulation de vos webcams et micros ( afficher/masquer la video, augmenter/baisser/muter le volume...)
 - Envoi de texte ou de la data via un chat text
 - Partage d'écran
 - Connexions à plusieurs via un serveur de signalisation

Nous commencerons par utiliser les apis natives de vos navigateurs pour comprendre les principes de bases du WebRTC puis nous utiliserons rapidement la librairie open source SimpleWebRTC pour découvrir toutes les possibilités offertes par les fonctionnalités Real Time Communication de HTML 5.

A la fin de cette session vous serez en mesure d'intégrer rapidement audio et vidéo à votre application HTML 5 existante.


### POUR COMMENCER
`git checkout step-init`

### STEP 0 - Vérifier la compatibilité de votre navigateur
Importer le projet maven dans votre éditeur de code préféré.
Lancer le serveur et assurez vous que votre projet est bien accessible sur `localhost:4242`

`git checkout step-0` pour récupérer le code à la fin de cette étape

### STEP 1 - Mode miroir
 Afficher votre webcam dans la page web.
 `git checkout step-1` pour récupérer le code à la fin de cette étape

### STEP 2 - Ajouter des contraintes sur la video et selection des sources
Utiliser MediaTrackConstraints pour définir la taille de la video et le framerate
Utiliser MediaStreamTrack pour parcourir les différentes caméras et micros de disponibles

Pour faire fonctionner sous chrome la dernière version de l'api :
`chrome://flags/#enable-experimental-web-platform-features`

`git checkout step-2` pour récupérer le code à la fin de cette étape

### STEP 3 - Afficher les controles et manipuler la video et le son
Augmenter/baisser le volume, muter le son de la video
Afficher/masquer la video

`git checkout step-3` pour récupérer le code à la fin de cette étape

### STEP 4 - Communication videos locales
Utiliser l'api RTCPeerConnection pour connecter 2 streams locales :
 - Ajouter une seconde video
 - Simuler la connexion et ouvrir la seconde video (remote)

`git checkout step-4` pour récupérer le code à la fin de cette étape

### STEP 5 - Échanger des données
Utiliser les apis RTCDataChannel et RTCPeerConnection pour échanger des messages entre la partie locale et remote.
 - Ajouter de quoi saisir et afficher les messages
 - Brancher ses éléments pour intéragir avec l'api RTCDataChannel

`git checkout step-5` pour récupérer le code à la fin de cette étape

### STEP 6 - Du remote, du vrai !
Maintenant que vous avez toutes les bases nous allons utiliser la bibliothèque simpleWebRTC.
La librairie est dans votre répertoire js et ça documentation est disponible ici :
https://github.com/andyet/SimpleWebRTC

 - Adaptez votre code pour utiliser la librairie.
 - Supprimez tout ce qui n'est plus essentiel (champ de saisie pour le chat sur la partie remote par exemeple)
 - Ouvrez 2 navigateurs (supportant WebRTC of course) et testez ^^

 `git checkout step-6` pour récupérer le code à la fin de cette étape

### FINAL STEP - Partage d'écran
Il ne nous reste plus qu'à partager notre écran et le tour sera joué, nous aurons une chat room audio/video/text complète \o/

- Utilisez la documentation de simpleWebRTC pour partager votre écran
- Clonez le repository suivant : https://github.com/otalk/getScreenMedia  et suivre les instructions de configuration

`git checkout step-6` pour récupérer le code à la fin de cette étape

### Encore un peu ?
Vous pouvez vous amuser à :
- Gérer une room multi-users
- Appliquer des filtres sur les streams videos ou audio
- Faire des captures d'écrans
- Enregistrer les flux audios et/ou videos
- Corriger le code javascript de ce atelier ^^

Merci de votre participation
