@echo off
TITLE Cloey Thrift App - AI Marketplace
cd /d "%~dp0"
color 0E
cls
echo ======================================================================
echo   CLOEY THRIFT APP - AI-Powered Social Marketplace
echo   Directory: %~dp0
echo   Design System & Brief: Loaded
echo ======================================================================
echo.
if exist PROJECT_BRIEF.md (
    echo --- Project Brief ---
    type PROJECT_BRIEF.md
    echo.
)
echo --- Starting AGY Development Session ---
agy
