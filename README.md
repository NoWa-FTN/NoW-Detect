# Projet NoW-Detect

## À propos

Ce projet consiste à créer une solution IDS/IPS basée sur Suricata, avec une interface web développée en Python (Flask), HTML, CSS et JavaScript pour visualiser les alertes et le trafic réseau en temps réel.

L’objectif est de fournir un tableau de bord simple et efficace pour surveiller les événements de sécurité réseau, avec support de la pagination, rafraîchissement automatique, et présentation claire des données.

---

## Table des matières

- [Prérequis](#prérequis)  
- [Installation](#installation)  
- [Utilisation](#utilisation)  
- [Architecture](#architecture)  
- [Pagination & Rafraîchissement](#pagination--rafraîchissement)  
- [Contribution](#contribution)  
- [Licence](#licence)  

---

## Prérequis

- Serveur Linux avec Suricata installé et configuré pour générer le fichier `eve.json`.
- Python 3.6+ avec les modules Flask et JSON.
- Accès au réseau ou machine virtuelle où le trafic est capturé en mode promiscuous.
- Navigateur moderne (Chrome, Firefox, Edge…).

---

## Installation

1. Cloner le dépôt :
   ```
   git clone https://github.com/NoWa-FTN/NoW-Detect.git
   cd NoW-Detect
   ```

2. Installer les dépendances Python :
   ```
   pip install flask
   ```

3. Lancer l’application :
   ```
   python3 main.py
   ```

4. Ouvrir dans un navigateur :  
   `http://<ip_serveur>:5000`

---

## Utilisation

- Visualiser les alertes Suricata avec détails (timestamp, IP, type, sévérité...).
- Suivre les flux TCP et HTTP détectés en temps réel.
- Utiliser les contrôles de pagination et définir un intervalle de rafraîchissement automatique.
- Le backend fournit des APIs paginées et optimise la lecture des logs.

---

## Architecture

- Backend Flask : lecture du fichier `eve.json` Suricata, mise en cache, API REST paginée.
- Frontend HTML/CSS/JS : affichage des données avec pagination, rafraîchissement, formatage du timestamp.
- Modularité avec fichiers JS `fetch_data.js` et `refresh_data.js` dans `/static/js`.

---

## Pagination & Rafraîchissement

- Les données sont affichées par pages de 10 entrées.
- Les boutons « Précédent » et « Suivant » permettent de naviguer entre les pages.
- Le rafraîchissement automatique peut être activé avec un intervalle en secondes.
- Le backend renvoie le total des pages dans les entêtes HTTP pour une navigation précise.

---

## Contribution

Les contributions sont les bienvenues.  
Merci de forker le dépôt, créer votre branche, puis faire une Pull Request.  
Avant toute modification, vérifiez les issues ouvertes et communiquez vos idées.

---

## Licence

Ce projet est sous licence MIT.  
Voir le fichier LICENSE pour plus de détails.
