use Sheepshead;
go
if (object_id('Scores.usp_Scores_S') is not null)
	drop procedure Scores.usp_Scores_S;
go
create procedure Scores.usp_Scores_S
(
	@account varchar(100),
	@startDate date,
	@endDateExclusive date
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_Scores_S 'jacobb', '2016-01-01', '2017-01-01';
*/

select	Games.Id,
	Games.[When],
	Players.Score
from	Sheepshead.Scores.Accounts as Accounts
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Accounts.UserId
	inner join Sheepshead.Scores.Players as Players
	on	Players.UserId = Users.Id
	inner join Sheepshead.Scores.Games as Games
	on	Games.Id = Players.GameId
where	Accounts.Account = @account
and	Games.[When] >= @startDate
and	Games.[When] < @endDateExclusive
order by Games.[When] asc,
	Games.Id asc;
go
