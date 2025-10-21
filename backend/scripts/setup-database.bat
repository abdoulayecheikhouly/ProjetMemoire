@echo off
REM Script pour configurer la base de données

echo 🗄️ Configuration de la base de données...

echo 📊 Exécution des migrations...
php artisan migrate --force

echo 🌱 Exécution des seeders...
php artisan db:seed --force

echo ✅ Base de données configurée avec succès!
echo.
echo 📋 Données créées:
echo   - Utilisateurs de test (admin, doctor, patient)
echo   - Spécialités médicales
echo   - Médecins avec spécialités
echo.
echo 🔧 Pour tester l'API:
echo   1. Importer la collection Postman
echo   2. Utiliser les comptes de test créés
echo.
echo 📝 Comptes de test:
echo   - Admin: admin@example.com / Password123
echo   - Doctor: doctor@example.com / Password123  
echo   - Patient: patient@example.com / Password123

pause





