
CURRENT_VERSION=$(humble get-version)
echo "You are about to bump version to: $2"
echo "(current version is: $CURRENT_VERSION)"
enterToContinue

# bump version
(cd services/frontend/server && npm version $2 2>/dev/null)
(cd services/frontend/client && npm version $2 2>/dev/null)

echo ""
echo ""
echo "You bumped version $CURRENT_VERSION to $(humble get-version)"
