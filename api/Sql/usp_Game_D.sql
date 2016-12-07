use Sheepshead;
go
if (object_id('Scores.usp_Game_D') is not null)
	drop procedure Scores.usp_Game_D;
go
create procedure Scores.usp_Game_D
(
	@id int
)
as
set nocount on;
set xact_abort on;
begin tran;

/*
begin tran;
exec Sheepshead.Scores.usp_Game_D 1;
rollback;
*/

delete from Sheepshead.Scores.Players where GameId = @id;
delete from Sheepshead.Scores.Games where Id = @id;

commit;
go
