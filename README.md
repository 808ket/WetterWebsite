# WetterWebsite
Eine Website für Wettervorhersagen

zur Installation:
Es wird eine Datenbank benötigt, da alle geladenen Wetterdaten geloggt werden sollen.
Hierfür bitte die weatherdata.sql ausführen. 
Um gleich zu Beginn Testdaten für die Historie zu haben, kann die
InsertIntoTestdata.sql ausgeführt werden.

Hinweis: Wird für die Datenbank ein Passwort verwendet, muss dieses in public/js/database.js vorkonfiguriert werden. 

Zur Historie gelangt man über localhost:3000/historie.
Für einen bestimmten Eintrag kann localhost:3000/historie/:id genutzt werden.