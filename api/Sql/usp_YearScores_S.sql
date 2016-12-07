use Sheepshead;
go
if (object_id('Scores.usp_YearScores_S') is not null)
	drop procedure Scores.usp_YearScores_S;
go
create procedure Scores.usp_YearScores_S
(
	@year int
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_YearScores_S 2016;
*/

declare @boy date = convert(date, convert(varchar, @year) + '-01-01');

select	Users.Name,
	Scores.Score
from	(	select	Players.UserId,
			Score = sum(Players.Score)
		from	Sheepshead.Scores.Games as Games
			inner join Sheepshead.Scores.Players as Players
			on	Players.GameId = Games.Id
		where	Games.[When] >= @boy
		and	Games.[When] < dateadd(year, 1, @boy)
		group by Players.UserId
	) as Scores
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Scores.UserId
order by Scores.Score desc,
	Users.Name asc;
go
