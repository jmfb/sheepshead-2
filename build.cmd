@echo off
set sqlPassword=%~1
set ftpPassword=%~2

call npm install
call npm run build
robocopy .\web .\deploy\wwwroot /MIR

nuget restore SheepsheadApi.sln
"c:\program files (x86)\msbuild\14.0\bin\msbuild" ^
	SheepsheadApi.sln ^
	/p:Configuration=Release ^
	/p:Platform="Any CPU" ^
	/p:RunCodeAnalysis=false
robocopy .\api .\deploy\api ^
	Global.asax Web.config *.dll *.pdb ^
	/MIR ^
	/XD Controllers Models obj Properties

powershell ^
	-File Deploy.ps1 ^
	-sqlPassword "%sqlPassword%" ^
	-ftpPassword "%ftpPassword%"
