@echo off
REM Script Windows pour démarrer PostgreSQL de test

echo 🚀 Démarrage de PostgreSQL de test...

REM Démarrer PostgreSQL de test
echo 📊 Démarrage de PostgreSQL de test...
docker-compose -f docker-compose.test.yml up -d postgres-test

REM Attendre que PostgreSQL soit prêt
echo ⏳ Attente que PostgreSQL soit prêt...
timeout /t 10 /nobreak > nul

echo ✅ PostgreSQL de test démarré!
echo.
echo 📋 Service disponible:
echo   - PostgreSQL Test: localhost:5434
echo   - Base de données: test_db
echo   - Utilisateur: test_user
echo   - Mot de passe: test_password
echo.
echo 🔧 Pour exécuter les tests:
echo   php artisan test
echo.
echo 🛑 Pour arrêter le service:
echo   docker-compose -f docker-compose.test.yml down

pause
