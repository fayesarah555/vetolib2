# **VetoLib**

Bienvenue sur **VetoLib**, une plateforme qui facilite l'accès aux soins vétérinaires. Ce projet permet aux utilisateurs de se connecter, de consulter les profils des vétérinaires, de prendre des rendez-vous, et bien plus encore.

## **Table des Matières**

- [Installation](#installation)
- [Configuration de l'environnement](#configuration-de-lenvironnement)
- [Utilisation](#utilisation)
- [Fonctionnalités](#fonctionnalités)
- [API](#api)

## **Installation**

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/fayesarah555/vetolib2
   cd vetolib
   ```
2. **Installer les dépendances**

   ```bash
cd back
npm install

   ```
   ```bash
cd front
npm install
   ```

## **Configuration de l'environnement**

1. **Cloner le dépôt**
- Créez un fichier .env dans le dossier backend avec les variables d'environnement nécessaires :

   ```bash
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=mot_de_passe
    DB_NAME=vetolib
   ```
- Assurez-vous que MySQL est installé et configuré sur votre machine. Vous pouvez créer la base de données et les tables nécessaires en utilisant un script SQL ou en important un fichier de dump.
   
## **Utilisation**

1. **Lancer le backend**
   ```bash
  cd backend
  npm run dev 
   ```

Le serveur sera accessible sur http://localhost:3000.

2. **Lancer le frontend**
   ```bash
  cd backend
  npm run dev 
   ```
L'application sera accessible sur http://localhost:5173 (ou un autre port configuré).

## **Fonctionnalités**

- Authentification des utilisateurs : Inscription, connexion et gestion des profils utilisateurs.
 - Consultation des vétérinaires : Voir les détails des vétérinaires, y compris leur spécialisation, adresse de la clinique, etc.
- Prise de rendez-vous : Réservez une consultation en ligne avec des vétérinaires.
- Gestion des avis : Les utilisateurs peuvent laisser des avis sur les services des vétérinaires.

## **API**

Le backend expose plusieurs endpoints pour interagir avec la base de données :

- GET /users/: Récupère tous les utilisateurs.
- GET /users/:id: Récupère un utilisateur par son ID.
- POST /users/: Crée un nouvel utilisateur.
- POST /users/login: Authentification d'un utilisateur.
- GET /users/role/veterinarian: Récupère tous les vétérinaires.

