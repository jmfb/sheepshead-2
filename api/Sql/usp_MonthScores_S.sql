use Sheepshead;
go
if (object_id('Scores.usp_MonthScores_S') is not null)
	drop procedure Scores.usp_MonthScores_S;
go
create procedure Scores.usp_MonthScores_S
(
	@month varchar(10),
	@year int
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_MonthScores_S 'November', 2016;
*/

declare @bom date = convert(date, @month + ' 1, ' + convert(varchar, @year));

select	Users.Name,
	Scores.Score
from	(	select	Players.UserId,
			Score = sum(Players.Score)
		from	Sheepshead.Scores.Games as Games
			inner join Sheepshead.Scores.Players as Players
			on	Players.GameId = Games.Id
		where	Games.[When] >= @bom
		and	Games.[When] < dateadd(month, 1, @bom)
		group by Players.UserId
	) as Scores
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Scores.UserId
order by Scores.Score desc,
	Users.Name asc;
go
