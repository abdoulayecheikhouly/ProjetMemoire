# Tests API REST

Ce dossier contient les tests pour l'API REST de l'application Laravel.

## 🗄️ Configuration des bases de données de test

### Option 1: SQLite en mémoire (Recommandé - Rapide)
```bash
# Utilisé par défaut dans phpunit.xml
# Aucune configuration supplémentaire nécessaire
php artisan test
```

### Option 2: PostgreSQL de test avec Docker
```bash
# Démarrer PostgreSQL de test
docker-compose -f docker-compose.test.yml up -d postgres-test

# Attendre que le service soit prêt
sleep 10

# Exécuter les tests
php artisan test
```

## 🚀 Scripts de démarrage rapide

### Windows
```cmd
scripts\start-test-db.bat
```

### Linux/Mac
```bash
chmod +x scripts/start-test-db.sh
./scripts/start-test-db.sh
```

## 📋 Services disponibles

- **PostgreSQL Test**: `localhost:5433`
- **Base de données**: `test_db`
- **Utilisateur**: `test_user`
- **Mot de passe**: `test_password`

## 🧪 Exécution des tests

### Tous les tests
```bash
php artisan test
```

### Tests spécifiques
```bash
# Tests d'authentification
php artisan test --filter=AuthTest

# Tests de gestion des utilisateurs
php artisan test --filter=UserManagementTest

# Tests de rendez-vous
php artisan test --filter=AppointmentTest
```

### Tests avec couverture
```bash
php artisan test --coverage
```

## 📋 Structure des tests

```
tests/
├── Feature/           # Tests d'intégration
│   ├── AuthTest.php           # Tests d'authentification
│   ├── UserManagementTest.php # Tests de gestion des utilisateurs
│   └── AppointmentTest.php    # Tests de rendez-vous
├── Unit/              # Tests unitaires
└── TestCase.php       # Classe de base pour les tests
```

## 🔧 Configuration

### Variables d'environnement de test
Les tests utilisent automatiquement:
- `APP_ENV=testing`
- `DB_CONNECTION=sqlite_testing` (par défaut)
- `CACHE_STORE=array`
- `SESSION_DRIVER=array`
- `MAIL_MAILER=array`

### Changer de base de données de test
Modifiez `phpunit.xml`:
```xml
<!-- Pour PostgreSQL -->
<env name="DB_CONNECTION" value="pgsql_testing"/>
<env name="DB_TEST_HOST" value="127.0.0.1"/>
<env name="DB_TEST_PORT" value="5433"/>
<env name="DB_TEST_DATABASE" value="test_db"/>
<env name="DB_TEST_USERNAME" value="test_user"/>
<env name="DB_TEST_PASSWORD" value="test_password"/>
```

## 🛠️ Helpers de test disponibles

### Création d'utilisateurs
```php
// Utilisateur patient
$patient = $this->createTestUser();

// Médecin
$doctor = $this->createTestDoctor();

// Administrateur
$admin = $this->createTestAdmin();
```

### Authentification
```php
$token = $user->createToken('test-token')->plainTextToken;

$response = $this->withHeaders([
    'Authorization' => 'Bearer ' . $token
])->getJson('/api/v1/users');
```

## 🐛 Dépannage

### Erreur de connexion à la base de données
```bash
# Vérifier que les services Docker sont démarrés
docker ps

# Redémarrer les services
docker-compose -f docker-compose.test.yml restart
```

### Tests qui échouent
```bash
# Exécuter avec plus de détails
php artisan test --verbose

# Nettoyer le cache
php artisan config:clear
php artisan cache:clear
```

### Problèmes de permissions (Linux/Mac)
```bash
chmod +x scripts/start-test-db.sh
```
