CREATE USER postgres;
DROP DATABASE [IF EXISTS] stocks-6-sense;
CREATE DATABASE stocks-6-sense;
\c stocks-6-sense
create table Stocks (company varchar,
tickerSymbol varchar,
lastPrice Int,
predictedPrice Int);
create table Users (firstName varchar,
lastName varchar);
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;