@echo off
SET PYTHON_PATH=C:\Users\prach\AppData\Local\Programs\Python\Python312\python.exe
SET BACKEND_DIR=%~dp0backend

echo Starting FinLearn AI Python Backend...
echo -------------------------------------
echo Python: %PYTHON_PATH%
echo Directory: %BACKEND_DIR%
echo Port: 5001
echo -------------------------------------

cd /d "%BACKEND_DIR%"
"%PYTHON_PATH%" unified_backend.py

pause
