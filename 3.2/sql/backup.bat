@echo off

set "USER=root"
set "PASSWORD=1111"
set "DATABASE=bookstore"
set "DATE=%date:/=-%_%time::=-%"


set "DATE=%DATE::=%"

set "BACKUP_DIR=D:\backupSQL"

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

mysqldump -u %USER% -p%PASSWORD% %DATABASE% > "%BACKUP_DIR%\%DATABASE%-%DATE%.sql"