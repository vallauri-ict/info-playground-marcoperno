-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 06, 2021 alle 20:43
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `consegna_spesa`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `negozio`
--

CREATE TABLE `negozio` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `indirizzo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `negozio`
--

INSERT INTO `negozio` (`id`, `nome`, `indirizzo`) VALUES
(1, 'Coop', 'napoli'),
(2, 'Conad', 'Torino'),
(4, 'Mercato', 'Napoli'),
(5, 'LIDL', 'Torino'),
(6, 'Famila', 'Torino'),
(7, 'Crai', 'Torino');

-- --------------------------------------------------------

--
-- Struttura della tabella `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `indirizzo` varchar(50) NOT NULL,
  `tipopersona_id` int(11) NOT NULL,
  `pwd` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `persona`
--

INSERT INTO `persona` (`id`, `nome`, `cognome`, `indirizzo`, `tipopersona_id`, `pwd`, `email`) VALUES
(1, 'sdfsafwesaf', 'adcadasd', 'gerfgsessss', 2, 'password', 'volontarioTest1@test.com'),
(3, 'aaasdad', 'adcadasd', 'gerfgse', 1, NULL, 'clienteTest1@test.com'),
(4, 'aaasdad', 'adcadasd', 'gerfgse', 1, 'password', 'clienteTest2@test.com'),
(11, 'volName', 'volCogn', 'torino', 2, 'password', 'volontarioTest2@test.com'),
(12, 'asdfa', 'sadfasdf', 'afsdaf', 1, NULL, 'clienteTest6@test.com'),
(14, 'asdasdf', 'fdsfs', 'fdssdfs', 2, 'sfds', 'volontarioTest5@test.com'),
(24, 'ervgsegfas', 'erawrw', 'Torino', 3, 'password', 'SegreteriaTest1@test.com'),
(31, 'sdfsafwesaf', 'adcadasd', 'gerfgse', 2, 'password', 'volontarioTest11@test.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `id` int(11) NOT NULL,
  `cliente_persona_id` int(11) NOT NULL,
  `negozio_id` int(11) NOT NULL,
  `data` date NOT NULL,
  `ora` time NOT NULL,
  `volontario_persona_id` int(11) NOT NULL,
  `servita` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `prenotazione`
--

INSERT INTO `prenotazione` (`id`, `cliente_persona_id`, `negozio_id`, `data`, `ora`, `volontario_persona_id`, `servita`) VALUES
(16, 4, 5, '2020-12-19', '20:23:00', 1, 1),
(21, 4, 1, '2021-01-16', '23:04:00', 1, 0),
(30, 4, 2, '2021-01-08', '21:38:00', 1, 0),
(33, 4, 2, '2021-01-01', '20:30:00', 1, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `tipopersona`
--

CREATE TABLE `tipopersona` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `tipopersona`
--

INSERT INTO `tipopersona` (`id`, `tipo`) VALUES
(1, 'cliente'),
(2, 'volontario'),
(3, 'segreteria');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `negozio`
--
ALTER TABLE `negozio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Indici per le tabelle `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `persona_ibfk_1` (`tipopersona_id`);

--
-- Indici per le tabelle `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_persona_id` (`cliente_persona_id`),
  ADD KEY `volontario_persona_id` (`volontario_persona_id`),
  ADD KEY `negozio_id` (`negozio_id`);

--
-- Indici per le tabelle `tipopersona`
--
ALTER TABLE `tipopersona`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `negozio`
--
ALTER TABLE `negozio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT per la tabella `tipopersona`
--
ALTER TABLE `tipopersona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`tipopersona_id`) REFERENCES `tipopersona` (`id`);

--
-- Limiti per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD CONSTRAINT `prenotazione_ibfk_1` FOREIGN KEY (`cliente_persona_id`) REFERENCES `persona` (`id`),
  ADD CONSTRAINT `prenotazione_ibfk_3` FOREIGN KEY (`negozio_id`) REFERENCES `negozio` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
