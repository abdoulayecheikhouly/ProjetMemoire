# 🚀 Guide de démarrage rapide - API Medical Management

## ⚡ Démarrage en 3 étapes

### 1. **Démarrer le serveur**
```bash
php artisan serve
```
**✅ Serveur disponible sur :** `http://127.0.0.1:8000`

### 2. **Tester l'API rapidement**
```bash
# Windows
scripts\test-api.bat

# Ou manuellement
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@example.com","password":"Password123"}'
```

### 3. **Importer dans Postman**
1. Ouvrir Postman
2. **Import** → `postman/API_Medical_Management.postman_collection.json`
3. **Import** → `postman/API_Medical_Management.postman_environment.json`
4. Sélectionner l'environnement "API Medical Management"

## 🔐 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| 👑 **Admin** | `admin@example.com` | `Password123` |
| 👨‍⚕️ **Doctor** | `doctor@example.com` | `Password123` |
| 👥 **Patient** | `patient@example.com` | `Password123` |

## 🧪 Tests recommandés

### **Workflow de test complet :**

1. **🔐 Authentication**
   ```
   Login User (admin@example.com) → Token sauvegardé automatiquement
   ```

2. **👑 Admin Tests**
   ```
   List All Users → Create User → Update User → Delete User
   ```

3. **📅 Appointments**
   ```
   Create Appointment (Patient) → Update Appointment (Doctor)
   ```

4. **🧪 Security Tests**
   ```
   Test Rate Limiting → Test Unauthorized Access → Test Role Authorization
   ```

## 📊 Endpoints disponibles

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/v1/register` | Inscription | Public |
| `POST` | `/api/v1/login` | Connexion | Public |
| `GET` | `/api/v1/user` | Profil utilisateur | Authentifié |
| `POST` | `/api/v1/logout` | Déconnexion | Authentifié |
| `GET` | `/api/v1/users` | Liste utilisateurs | Admin |
| `POST` | `/api/v1/users` | Créer utilisateur | Admin |
| `GET` | `/api/v1/users/{id}` | Utilisateur par ID | Admin |
| `PUT` | `/api/v1/users/{id}` | Modifier utilisateur | Admin |
| `DELETE` | `/api/v1/users/{id}` | Supprimer utilisateur | Admin |
| `GET` | `/api/v1/doctors` | Liste médecins | Authentifié |
| `POST` | `/api/v1/doctors` | Créer médecin | Admin |
| `GET` | `/api/v1/patients` | Liste patients | Authentifié |
| `POST` | `/api/v1/patients` | Créer patient | Admin |
| `GET` | `/api/v1/appointments` | Liste rendez-vous | Patient/Doctor/Admin |
| `POST` | `/api/v1/appointments` | Créer rendez-vous | Patient |
| `PUT` | `/api/v1/appointments/{id}` | Modifier rendez-vous | Doctor/Admin |
| `GET` | `/api/v1/prescriptions` | Liste prescriptions | Doctor/Admin |
| `POST` | `/api/v1/prescriptions` | Créer prescription | Doctor/Admin |

## 🔧 Configuration

### **Variables d'environnement Postman :**
- `base_url` : `http://127.0.0.1:8000`
- `auth_token` : Sauvegardé automatiquement lors du login
- `user_id` : ID de l'utilisateur connecté
- `user_role` : Rôle de l'utilisateur connecté

### **Sécurité :**
- ✅ **Rate Limiting** : 5 req/min pour auth, 60 req/min pour API
- ✅ **Tokens** : Expiration 24h
- ✅ **Headers de sécurité** : XSS, CSRF, Clickjacking protection
- ✅ **Validation** : Mots de passe robustes (8+ chars, maj, min, chiffre)
- ✅ **Logging** : Traçabilité complète des accès

## 🐛 Dépannage

### **Erreur 404 - Route not found**
```bash
php artisan route:clear
php artisan config:clear
```

### **Erreur 500 - Internal Server Error**
```bash
# Vérifier les logs
Get-Content storage/logs/laravel.log -Tail 20

# Vérifier la base de données
php artisan migrate:status
```

### **Erreur 401 - Unauthorized**
- Vérifier que le token est présent dans l'environnement Postman
- Tester la connexion avec `Login User`

### **Erreur 403 - Forbidden**
- Vérifier le rôle de l'utilisateur
- Utiliser un compte avec les bonnes permissions

## 📈 Monitoring

### **Logs disponibles :**
- **API Logs** : `storage/logs/api.log`
- **Laravel Logs** : `storage/logs/laravel.log`

### **Tests de performance :**
- Temps de réponse < 5 secondes
- Headers de sécurité vérifiés automatiquement

## 🎯 Prochaines étapes

1. **Tests complets** avec la collection Postman
2. **Intégration frontend** avec les endpoints REST
3. **Déploiement** en production
4. **Monitoring** et alertes

---

**🎉 Votre API REST est prête pour la production !**





