﻿--SELECT Sale.Citta , COUNT(*) FROM Sale WHERE Sale.Posti>60 GROUP BY Sale.Citta
--SELECT Film.Regista, COUNT(*) FROM  Film WHERE Film.AnnoProduzione>1990 GROUP BY Film.Regista
--SELECT Film.Regista, Sum(Proiezioni.Incasso) FROM Film, Proiezioni WHERE Film.CodFilm = Proiezioni.CodFilm GROUP BY Film.Regista
--SELECT Film.Titolo, COUNT(*) From Film, Proiezioni, Sale WHERE Sale.Citta like 'Pisa' AND   Film.Regista like 'S.Spielberg' AND Film.CodFilm = Proiezioni.CodFilm AND Sale.CodSala = Proiezioni.CodSala GROUP BY Film.CodFilm, Film.Titolo
--SELECT f.Regista, a.Nome, Count(*) AS NumFilm FROM Film f, Attori a, Recita r WHERE r.CodAttore = f.CodFilm AND r.CodAttore like a.CodAttore GROUP BY f.Regista, a.CodAttore, A.Nome