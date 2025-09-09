#!/bin/bash

# Quick fix script to update all API calls

echo "Updating StatisticPage.jsx..."
sed -i '' 's|import.meta.env.VITE_SERVER_URL+ "/api/|getApiUrl("/|g' client/src/pages/StatisticPage.jsx
sed -i '' 's|import.meta.env.VITE_SERVER_URL+"/api/|getApiUrl("/|g' client/src/pages/StatisticPage.jsx

echo "Updating InvoiceModal.jsx..."
sed -i '' 's|import.meta.env.VITE_SERVER_URL+"/api/|getApiUrl("/|g' client/src/components/invoices/InvoiceModal.jsx

echo "Updating Register.jsx..."
sed -i '' 's|import.meta.env.VITE_SERVER_URL + "/api/|getApiUrl("/|g' client/src/components/auth/Register.jsx

echo "Done!"
