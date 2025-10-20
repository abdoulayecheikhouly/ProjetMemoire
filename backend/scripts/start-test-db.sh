#!/bin/bash

# Script pour démarrer PostgreSQL de test

echo "🚀 Démarrage de PostgreSQL de test..."

# Démarrer PostgreSQL de test
echo "📊 Démarrage de PostgreSQL de test..."
docker-compose -f docker-compose.test.yml up -d postgres-test

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente que PostgreSQL soit prêt..."
sleep 10

echo "✅ PostgreSQL de test démarré!"
echo ""
echo "📋 Service disponible:"
echo "  - PostgreSQL Test: localhost:5434"
echo "  - Base de données: test_db"
echo "  - Utilisateur: test_user"
echo "  - Mot de passe: test_password"
echo ""
echo "🔧 Pour exécuter les tests:"
echo "  php artisan test"
echo ""
echo "🛑 Pour arrêter le service:"
echo "  docker-compose -f docker-compose.test.yml down"
