use Sheepshead;
go
if (object_id('Scores.usp_AllUserData_S') is not null)
	drop procedure Scores.usp_AllUserData_S;
go
create procedure Scores.usp_AllUserData_S
as
set nocount on;

/*
exec Sheepshead.Scores.usp_AllUserData_S;
*/

select	Users.Id,
	Users.Name,
	Users.RoleId,
	Games.TotalGameCount,
	Games.LifetimeScore,
	Games.LastGameWhen
from	Sheepshead.Scores.Users as Users
	cross apply (
		select	TotalGameCount = count(*),
			LifetimeScore = isnull(sum(Players.Score), 0),
			LastGameWhen = max(Games.[When])
		from	Sheepshead.Scores.Players as Players
			inner join Sheepshead.Scores.Games as Games
			on	Games.Id = Players.GameId
		where	Players.UserId = Users.Id
	) as Games
order by Users.Name asc;

select	UserId,
	Account
from	Sheepshead.Scores.Accounts
order by UserId asc,
	Account asc;
go
