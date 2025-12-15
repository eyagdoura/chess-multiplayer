# ♟️ Chess Multiplayer – Full Stack Technical Test

Prototype fonctionnel d’un jeu d’échecs multijoueurs en temps réel réalisé dans le cadre d’un test technique Full Stack.

---

## 🚀 Stack technique

- **Frontend** : Angular (Standalone Components)
- **Backend** : Spring Boot
- **Temps réel** : WebSockets (STOMP)
- **Base de données** : MySQL
- **Authentification** : simple (username / password)

---

## 🎯 Fonctionnalités

### 🟢 Niveau 1 – Base (obligatoire)
- Création de compte (register)
- Connexion utilisateur (login)
- Affichage des joueurs connectés
- Invitation d’un joueur en ligne
- Acceptation / refus d’invitation

### 🟡 Niveau 2 – Fonctionnel (attendu)
- Création automatique d’une partie après acceptation
- Plateau d’échecs 8×8
- Synchronisation des coups en temps réel via WebSockets
- Historique des coups
- Gestion du tour de jeu

### 🔴 Niveau 3 – Bonus
- Validation simple des déplacements (mouvements impossibles bloqués)
- Historique lisible côté UI
- UX améliorée (sélection, coups possibles)

---

## ▶️ Lancer le projet

### 🔧 Backend – Spring Boot

#### 1️⃣ Créer la base de données MySQL

```sql
CREATE DATABASE chess_db;
