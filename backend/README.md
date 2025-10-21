# 🏥 API Medical Management - REST

API REST complète pour la gestion médicale avec authentification, autorisation par rôles et sécurité renforcée.

## 🚀 Démarrage rapide

### 1. **Installation**
```bash
composer install
php artisan key:generate
```

### 2. **Base de données**
```bash
# Créer la base SQLite
New-Item -Path "database/database.sqlite" -ItemType File -Force

# Migrations et seeders
php artisan migrate
php artisan db:seed
```

### 3. **Démarrer le serveur**
```bash
php artisan serve
```
**✅ API disponible sur :** `http://127.0.0.1:8000`

### 4. **Tester l'API**
```bash
# Test rapide
scripts\test-api.bat

# Ou avec Postman (recommandé)
# Importez les fichiers dans postman/
```

## 🔐 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| 👑 **Admin** | `admin@example.com` | `Password123` |
| 👨‍⚕️ **Doctor** | `doctor@example.com` | `Password123` |
| 👥 **Patient** | `patient@example.com` | `Password123` |

## 📋 Fonctionnalités

### ✅ **API REST Complète**
- **29 endpoints** RESTful
- **Versioning** API (v1)
- **CRUD complet** pour toutes les ressources
- **Relations** entre entités

### ✅ **Authentification & Autorisation**
- **Laravel Sanctum** pour les tokens
- **Rôles** : Admin, Doctor, Patient
- **Permissions** granulaires par rôle
- **Expiration** des tokens (24h)

### ✅ **Sécurité Renforcée**
- **Rate Limiting** : 5 req/min (auth), 60 req/min (API)
- **Headers de sécurité** : XSS, CSRF, Clickjacking
- **Validation** robuste des données
- **Mots de passe** sécurisés (8+ chars, maj, min, chiffre)
- **Logging** complet des accès

### ✅ **Tests & Documentation**
- **Collection Postman** complète
- **Tests automatisés** (26 tests)
- **Documentation** détaillée
- **Scripts** de test et configuration

## 🏗️ Architecture

### **Modèles**
- `User` - Utilisateurs (Admin, Doctor, Patient)
- `Doctor` - Médecins avec spécialités
- `Appointment` - Rendez-vous médicaux
- `Prescription` - Prescriptions médicales
- `Specialite` - Spécialités médicales

### **Contrôleurs REST**
- `AuthController` - Authentification
- `AdminController` - Gestion utilisateurs
- `DoctorController` - Gestion médecins
- `PatientController` - Gestion patients
- `AppointmentController` - Gestion rendez-vous
- `PrescriptionController` - Gestion prescriptions

### **Middlewares de sécurité**
- `SecurityHeaders` - Headers de sécurité
- `ApiLogging` - Logging des accès
- `RoleMiddleware` - Autorisation par rôles
- `Rate Limiting` - Limitation de taux

## 📊 Endpoints API

### **🔐 Authentication**
```
POST /api/v1/register     - Inscription
POST /api/v1/login        - Connexion
GET  /api/v1/user         - Profil utilisateur
POST /api/v1/logout       - Déconnexion
```

### **👑 Admin (Gestion utilisateurs)**
```
GET    /api/v1/users      - Liste utilisateurs
POST   /api/v1/users      - Créer utilisateur
GET    /api/v1/users/{id} - Utilisateur par ID
PUT    /api/v1/users/{id} - Modifier utilisateur
DELETE /api/v1/users/{id} - Supprimer utilisateur
```

### **👨‍⚕️ Doctor Management**
```
GET    /api/v1/doctors      - Liste médecins
POST   /api/v1/doctors      - Créer médecin
GET    /api/v1/doctors/{id} - Médecin par ID
PUT    /api/v1/doctors/{id} - Modifier médecin
DELETE /api/v1/doctors/{id} - Supprimer médecin
```

### **👥 Patient Management**
```
GET    /api/v1/patients      - Liste patients
POST   /api/v1/patients      - Créer patient
GET    /api/v1/patients/{id} - Patient par ID
PUT    /api/v1/patients/{id} - Modifier patient
DELETE /api/v1/patients/{id} - Supprimer patient
```

### **📅 Appointments**
```
GET    /api/v1/appointments      - Liste rendez-vous
POST   /api/v1/appointments      - Créer rendez-vous (Patient)
GET    /api/v1/appointments/{id} - Rendez-vous par ID
PUT    /api/v1/appointments/{id} - Modifier rendez-vous (Doctor/Admin)
DELETE /api/v1/appointments/{id} - Supprimer rendez-vous (Admin)
```

### **💊 Prescriptions**
```
GET    /api/v1/prescriptions      - Liste prescriptions
POST   /api/v1/prescriptions      - Créer prescription (Doctor/Admin)
GET    /api/v1/prescriptions/{id} - Prescription par ID
PUT    /api/v1/prescriptions/{id} - Modifier prescription (Doctor/Admin)
DELETE /api/v1/prescriptions/{id} - Supprimer prescription (Admin)
```

## 🧪 Tests

### **Collection Postman**
- **26 tests** automatisés
- **Gestion automatique** des tokens
- **Tests de sécurité** intégrés
- **Variables d'environnement** dynamiques

### **Tests de sécurité**
- Rate limiting
- Accès non autorisé
- Tokens invalides
- Autorisation par rôles
- Headers de sécurité

### **Exécution des tests**
```bash
# Tests PHPUnit
php artisan test

# Tests Postman
# Importez la collection et exécutez les tests
```

## 🔧 Configuration

### **Environnement**
```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
SANCTUM_EXPIRATION=1440  # 24 heures
```

### **Rate Limiting**
```php
// Auth routes: 5 requêtes/minute
// API routes: 60 requêtes/minute
```

### **Logging**
```php
// API logs: storage/logs/api.log
// Laravel logs: storage/logs/laravel.log
```

## 📁 Structure du projet

```
backend/
├── app/
│   ├── Http/Controllers/     # Contrôleurs REST
│   ├── Http/Middleware/      # Middlewares de sécurité
│   └── Models/               # Modèles Eloquent
├── database/
│   ├── migrations/           # Migrations de base de données
│   └── seeders/              # Seeders avec données de test
├── postman/                  # Collection Postman complète
├── scripts/                  # Scripts de test et configuration
├── tests/                    # Tests PHPUnit
└── routes/
    └── api.php              # Routes API REST
```

## 🚀 Déploiement

### **Production**
1. Configurer la base de données PostgreSQL/MySQL
2. Définir les variables d'environnement
3. Exécuter les migrations
4. Configurer HTTPS
5. Déployer avec Docker/Laravel Forge

### **Docker (optionnel)**
```bash
# Base de données de test PostgreSQL
docker-compose -f docker-compose.test.yml up -d postgres-test
```

## 📈 Monitoring

### **Logs**
- **Accès API** : `storage/logs/api.log`
- **Erreurs Laravel** : `storage/logs/laravel.log`
- **Performance** : Temps de réponse < 5s

### **Métriques**
- Taux de succès des requêtes
- Temps de réponse moyen
- Erreurs par endpoint
- Utilisation par rôle

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Documentation** : Voir `QUICK_START.md`
- **Tests** : Utiliser la collection Postman
- **Logs** : Vérifier `storage/logs/`
- **Issues** : Ouvrir une issue GitHub

---

**🎉 API REST Medical Management - Prête pour la production !**





