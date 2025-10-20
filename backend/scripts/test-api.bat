@echo off
REM Script de test rapide pour l'API

echo 🧪 Test rapide de l'API Medical Management
echo.

echo 📋 Test 1: Inscription d'un nouvel utilisateur
echo.
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/v1/register' -Method POST -ContentType 'application/json' -Body '{\"name\":\"Test User\",\"email\":\"test.user@example.com\",\"password\":\"Password123\",\"password_confirmation\":\"Password123\",\"role\":\"patient\"}'; Write-Host '✅ Inscription réussie!' -ForegroundColor Green; Write-Host 'Token:' $response.token -ForegroundColor Cyan } catch { Write-Host '❌ Erreur inscription:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 📋 Test 2: Connexion avec un utilisateur existant
echo.
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/v1/login' -Method POST -ContentType 'application/json' -Body '{\"email\":\"admin@example.com\",\"password\":\"Password123\"}'; Write-Host '✅ Connexion réussie!' -ForegroundColor Green; Write-Host 'Utilisateur:' $response.user.name -ForegroundColor Cyan; Write-Host 'Rôle:' $response.user.role -ForegroundColor Yellow } catch { Write-Host '❌ Erreur connexion:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 📋 Test 3: Test d'accès non autorisé
echo.
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/v1/users' -Method GET -ContentType 'application/json'; Write-Host '❌ Erreur: Accès autorisé sans token!' -ForegroundColor Red } catch { if ($_.Exception.Response.StatusCode -eq 401) { Write-Host '✅ Accès correctement refusé (401)' -ForegroundColor Green } else { Write-Host '❌ Erreur inattendue:' $_.Exception.Message -ForegroundColor Red } }"

echo.
echo 🎯 Tests terminés!
echo.
echo 📝 Pour des tests complets, utilisez la collection Postman:
echo   1. Importez API_Medical_Management.postman_collection.json
echo   2. Importez API_Medical_Management.postman_environment.json
echo   3. Sélectionnez l'environnement "API Medical Management"
echo.
echo 🔧 Comptes de test disponibles:
echo   - Admin: admin@example.com / Password123
echo   - Doctor: doctor@example.com / Password123
echo   - Patient: patient@example.com / Password123

pause




