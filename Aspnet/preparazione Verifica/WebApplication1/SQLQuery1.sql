SELECT IDArticolo, Descrizione, Articoli.IDFornitore, Email FROM Articoli, Fornitori
WHERE Articoli.IDCategoria = 1 AND (Giacenza<ScortaMinima) AND Articoli.IDFornitore = Fornitori.IDFornitore