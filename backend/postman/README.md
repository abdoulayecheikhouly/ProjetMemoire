# 🚀 Guide d'utilisation Postman - API Medical Management

## 📋 Prérequis

1. **Postman** installé sur votre machine
2. **Serveur Laravel** démarré sur `http://127.0.0.1:8000`
3. **Base de données** configurée et migrée

## 🔧 Installation

### 1. Importer la collection
1. Ouvrir Postman
2. Cliquer sur **Import**
3. Sélectionner le fichier `API_Medical_Management.postman_collection.json`
4. Cliquer sur **Import**

### 2. Importer l'environnement
1. Dans Postman, aller dans **Environments**
2. Cliquer sur **Import**
3. Sélectionner le fichier `API_Medical_Management.postman_environment.json`
4. Cliquer sur **Import**
5. Sélectionner l'environnement "API Medical Management - Environment"

## 🧪 Tests recommandés

### 1. **Tests d'authentification**
```
1. Register User → Récupère automatiquement le token
2. Login User → Récupère automatiquement le token
3. Get User Profile → Vérifie l'authentification
4. Logout User → Teste la déconnexion
```

### 2. **Tests de sécurité**
```
1. Test Rate Limiting - Register → Teste la limitation (5 req/min)
2. Test Unauthorized Access → Teste l'accès sans token
3. Test Invalid Token → Teste avec token invalide
4. Test Role Authorization → Teste les permissions par rôle
```

### 3. **Tests fonctionnels par rôle**

#### 👑 **Admin**
```
1. Login avec un compte admin
2. List All Users
3. Create User
4. Update User
5. Delete User
```

#### 👨‍⚕️ **Doctor**
```
1. Login avec un compte doctor
2. List Appointments
3. Update Appointment
4. Create Prescription
5. List Prescriptions
```

#### 👥 **Patient**
```
1. Login avec un compte patient
2. List Appointments
3. Create Appointment
4. Get User Profile
```

## 🔐 Gestion des tokens

### Variables automatiques
- `auth_token` : Token de l'utilisateur connecté
- `user_id` : ID de l'utilisateur connecté
- `user_role` : Rôle de l'utilisateur connecté

### Tokens par rôle (optionnel)
- `admin_token` : Token administrateur
- `doctor_token` : Token médecin
- `patient_token` : Token patient

## 📊 Tests de performance

### Headers de sécurité vérifiés
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### Temps de réponse
- Maximum 5000ms par requête

## 🐛 Dépannage

### Erreur 401 - Unauthorized
```json
{
    "message": "Non authentifié. Veuillez vous connecter."
}
```
**Solution** : Vérifier que le token est présent et valide

### Erreur 403 - Forbidden
```json
{
    "message": "Accès refusé : rôle non autorisé."
}
```
**Solution** : Vérifier que l'utilisateur a le bon rôle

### Erreur 429 - Too Many Requests
```json
{
    "message": "Too Many Attempts."
}
```
**Solution** : Attendre 1 minute avant de refaire des requêtes

### Erreur 422 - Validation Error
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "email": ["The email field is required."]
    }
}
```
**Solution** : Vérifier les données envoyées

## 🔄 Workflow de test complet

### 1. **Setup initial**
```
1. Register User (patient)
2. Register User (doctor)
3. Register User (admin)
4. Login avec chaque rôle
```

### 2. **Tests fonctionnels**
```
1. Admin → Créer des utilisateurs
2. Doctor → Créer des prescriptions
3. Patient → Créer des rendez-vous
4. Vérifier les permissions par rôle
```

### 3. **Tests de sécurité**
```
1. Rate limiting
2. Accès non autorisé
3. Tokens invalides
4. Headers de sécurité
```

## 📝 Exemples de données

### Inscription utilisateur
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "Password123",
    "password_confirmation": "Password123",
    "role": "patient"
}
```

### Création de rendez-vous
```json
{
    "user_id": 1,
    "doctor_id": 1,
    "date": "2024-12-25 10:00:00",
    "motif": "Consultation générale",
    "status": "pending"
}
```

### Création de prescription
```json
{
    "user_id": 1,
    "doctor_id": 1,
    "appointment_id": 1,
    "medication": "Paracétamol 500mg",
    "instructions": "Prendre 1 comprimé toutes les 6 heures pendant 5 jours"
}
```

## 🎯 Conseils d'utilisation

1. **Toujours commencer par l'authentification**
2. **Vérifier les variables d'environnement**
3. **Tester les permissions par rôle**
4. **Vérifier les logs API** (`storage/logs/api.log`)
5. **Utiliser les tests automatiques** de Postman

## 📞 Support

En cas de problème :
1. Vérifier que le serveur Laravel est démarré
2. Vérifier la configuration de la base de données
3. Consulter les logs Laravel (`storage/logs/laravel.log`)
4. Consulter les logs API (`storage/logs/api.log`)





