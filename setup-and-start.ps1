<#
PowerShell helper: prompts for your MongoDB Atlas password (hidden), URL-encodes it,
writes a `backend/.env` with the Atlas URI and PORT, then starts the backend (npm run dev).

Usage (run from a PowerShell prompt):
  1. Open PowerShell
  2. cd C:\Users\Student\Desktop\ABHISHEK\backend
  3. Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
  4. .\setup-and-start.ps1

Security notes:
- The script asks for your password interactively and never prints it.
- It writes the encoded password into `.env` on disk so the app can connect — do not commit `.env`.
#>

try {
    Write-Host "This script will ask for your MongoDB Atlas password, encode it, write .env, and start the backend." -ForegroundColor Cyan

    # Read password securely
    $securePwd = Read-Host -AsSecureString "Enter your MongoDB Atlas password (input hidden)"

    # Convert SecureString to plain text for encoding, then zero the plain text memory
    $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePwd)
    $plainPwd = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)

    # URL-encode password
    $encoded = [uri]::EscapeDataString($plainPwd)

    # Configuration values - update these only if your username/cluster/db differ
    $username = 'abhishek224905_db_user'
    $clusterHost = 'cluster0.rujhw6p.mongodb.net'
    $dbname = 'task-manager'

  # Use $() to safely interpolate variables that are adjacent to symbols like '@' or ':'
  $mongoUri = "mongodb+srv://$($username):$($encoded)@$($clusterHost)/$($dbname)?retryWrites=true&w=majority"

    $envContent = "MONGO_URI=$mongoUri`nPORT=5000"

    # Write .env in the backend folder (this script runs from backend folder by recommended usage)
    $envPath = Join-Path -Path (Get-Location) -ChildPath '.env'
    Set-Content -Path $envPath -Value $envContent -Force
    Write-Host "Wrote .env to $envPath" -ForegroundColor Green

    # Start the backend
    Write-Host "Starting backend (npm run dev). If npm is not found, ensure Node is installed and on PATH." -ForegroundColor Cyan
    # Use the current process so logs appear in your console
    npm run dev

} catch {
    Write-Error "An error occurred: $_"
}
