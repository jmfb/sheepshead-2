use Sheepshead;
go
if (object_id('Scores.usp_LifetimeScores_S') is not null)
	drop procedure Scores.usp_LifetimeScores_S;
go
create procedure Scores.usp_LifetimeScores_S
as
set nocount on;

/*
exec Sheepshead.Scores.usp_LifetimeScores_S;
*/

select	Users.Name,
	Scores.Score
from	(	select	Players.UserId,
			Score = sum(Players.Score)
		from	Sheepshead.Scores.Games as Games
			inner join Sheepshead.Scores.Players as Players
			on	Players.GameId = Games.Id
		group by Players.UserId
	) as Scores
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Scores.UserId
order by Scores.Score desc,
	Users.Name asc;
go
