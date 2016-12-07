create login ScoresApi with password = 'M0ur8rFr!d@y.';
go
create database Sheepshead;
go
use Sheepshead;
go
create schema Scores;
go
create user ScoresApi;
go
grant select, execute on schema::Scores to ScoresApi;
go
