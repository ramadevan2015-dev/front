# Frontend helper: install deps and start dev server
# Usage:
#   1) Open PowerShell
#   2) cd C:\Users\Student\Desktop\ABHISHEK\frontend
#   3) Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
#   4) .\setup-and-start-frontend.ps1

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Starting frontend dev server..." -ForegroundColor Cyan
npm start
