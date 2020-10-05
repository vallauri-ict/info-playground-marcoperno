--15 per ogni museo le opere divise per nazionaolità dell'artista
--SELECT o.NomeM, a.Nazionalita, COUNT(*) FROM Opere o, Artisti a WHERE A.NomeA = o.NomeA GROUP BY o.NomeM, a.Nazionalita
--SELECT m.Citta FROM Musei m WHERE m.Citta ='Londra' AND NOT EXISTS(SELECT * FROM Opere o, Artisti a WHERE m.NomeM = o.NomeM AND o.NomeA = a.NomeA AND a.Nazionalita = 'Italiano' aND a.NomeA != 'Tiziano')
--SELECT o.Titolo, o.NomeA FROM Opere o, Artisti a WHERE  o.NomeA = a.NomeA aND a.Nazionalita = 'Italiano' AND NOT EXISTS (SELECT * FROM Personaggi p, Artisti a WHERE o.Codice = p.Codice )
--12 da fare
--SELECT o.NomeA, COUNT(*) FROM Opere o WHERE o.NomeM='NapoliMuseum' GROUP BY o.NomeA
/*SELECT *
FROM Musei m
WHERE m.Citta = 'Londra'
AND NOT EXISTS(SELECT * From Opere o WHERE m.NomeM = o.NomeM AND o.NomeA <> 'Tiziano')*/
