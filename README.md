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



### STEP 0 - Vérifier la compatibilité de votre navigateur
Importer le projet maven dans votre éditeur de code préféré.
lancer le serveur et assurez vous que votre projet est bien accessible sur `localhost:4242`

`git checkout step-0` pour récupérer le code à la fin de cette étape

### STEP 1 - Mode miroir
 Afficher votre webcam dans la page web.