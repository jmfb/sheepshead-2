use Sheepshead;
go
if (object_id('Scores.usp_Game_S') is not null)
	drop procedure Scores.usp_Game_S;
go
create procedure Scores.usp_Game_S
(
	@id int
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_Game_S 1;
*/

select	Games.[When]
from	Sheepshead.Scores.Games as Games
where	Games.Id = @id;

select	Users.Name,
	Players.Score
from	Sheepshead.Scores.Players as Players
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Players.UserId
where	Players.GameId = @id
order by Players.Score desc;
go
