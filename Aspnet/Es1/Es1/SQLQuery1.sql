﻿--SELECT Sale.Citta , COUNT(*) FROM Sale WHERE Sale.Posti>60 GROUP BY Sale.Citta
--SELECT Film.Regista, COUNT(*) FROM  Film WHERE Film.AnnoProduzione>1990 GROUP BY Film.Regista
--SELECT Film.Regista, Sum(Proiezioni.Incasso) FROM Film, Proiezioni WHERE Film.CodFilm = Proiezioni.CodFilm GROUP BY Film.Regista
--SELECT Film.Titolo, COUNT(*) From Film, Proiezioni, Sale WHERE Sale.Citta like 'Pisa' AND   Film.Regista like 'S.Spielberg' AND Film.CodFilm = Proiezioni.CodFilm AND Sale.CodSala = Proiezioni.CodSala GROUP BY Film.CodFilm, Film.Titolo
--SELECT f.Regista, a.Nome, Count(*) AS NumFilm FROM Film f, Attori a, Recita r WHERE r.CodAttore = f.CodFilm AND r.CodAttore like a.CodAttore GROUP BY f.Regista, a.CodAttore, A.Nome
--SELECT f.Regista, f.Titolo FROM Film f, Recita r WHERE r.CodFilm=f.CodFilm GROUP BY F.CodFilm, F.Regista, f.Titolo HAVING count(*)<6
--SELECT Film.CodFilm, Film.Titolo, SUM(Proiezioni.Incasso) as Incassi FROM Film, Proiezioni WHERE Film.AnnoProduzione > 2000 AND Film.CodFilm = Proiezioni.CodFilm GROUP BY Film.CodFilm, Film.Titolo, Proiezioni.Incasso
--SELECT Film.Titolo, COUNT(*) AS NUMERO FROM Attori, Film, Recita WHERE Film.CodFilm=Recita.CodFilm aND  Recita.CodAttore = Attori.CodAttore  GROUP BY Film.CodFilm, Film.Titolo HAVING MAX( Attori.AnnoNascita) <1970
--SELECT Film.Titolo, SUM(Proiezioni.Incasso) FROM Film, Proiezioni WHERE Film.CodFilm=Proiezioni.CodFilm and Film.Genere = 'Fantascienza' GROUP BY Film.CodFilm, Film.Titolo, Proiezioni.Incasso 
--SELECT Film.Titolo, SUM(Proiezioni.Incasso) FROM Film, Proiezioni WHERE Film.CodFilm=Proiezioni.CodFilm AND Proiezioni.DataProiezione> CAST('2001-01-01' AS DATE) and Film.Genere = 'Fantascienza' GROUP BY Film.CodFilm, Film.Titolo, Proiezioni.Incasso 
--SELECT Film.Titolo, SUM(Proiezioni.Incasso) FROM Film, Proiezioni WHERE Film.CodFilm=Proiezioni.CodFilm and Film.Genere = 'Fantascienza' GROUP BY Film.CodFilm, Film.Titolo, Proiezioni.Incasso HAVING MIN( Proiezioni.DataProiezione) >CAST('2001-01-01' AS DATE)
--SELECT Sale.Nome, SUM(Proiezioni.Incasso) FROM Sale, Proiezioni WHERE Proiezioni.CodSala = Sale.CodSala AND Proiezioni.DataProiezione > CAST( '2005-01-01' AS DATE) and  Proiezioni.DataProiezione < CAST( '2011-01-31' AS DATE)  AND Sale.Citta like 'Pisa' GROUP BY Sale.CodSala, Sale.Nome HAVING SUM(Proiezioni.Incasso)>20000
SELECT Film.Titolo FROM Film WHERE NOT EXISTS (SELECT * FROM Proiezioni, Sale WHERE Sale.Citta like 'Pisa' AND Sale.CodSala = Proiezioni.CodSala AND Proiezioni.CodFilm = Film.CodFilm)