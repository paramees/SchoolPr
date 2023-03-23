set "USER=root"
set "PASSWORD=1111"

mysql -u %USER% -p%PASSWORD% < D:\GIT\SchoolPr\3.2\sql\delete-comand.sql > D:\GIT\SchoolPr\3.2\sql\deletelist.txt

for /f %%i in (deletelist.txt) do (
    call echo %%i.jpg
    del D:\GIT\SchoolPr\3.2\public\book\book-page_files\img\%%i.jpg
)