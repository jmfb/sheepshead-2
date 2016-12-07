use Sheepshead;
go
if (object_id('Scores.usp_Games_S') is not null)
	drop procedure Scores.usp_Games_S;
go
create procedure Scores.usp_Games_S
(
	@skip int,
	@take int
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_Games_S 0, 10;
*/

declare @games table
(
	RowNumber bigint not null,
	Id int not null,
	[When] date not null,
	primary key clustered (RowNumber)
);

insert into @games (
	RowNumber,
	Id,
	[When]
)
select	top (@take)
	SortedGames.RowNumber,
	SortedGames.Id,
	SortedGames.[When]
from	(	select	RowNumber = row_number() over (order by Games.[When] desc, Games.Id desc),
			Games.Id,
			Games.[When]
		from	Sheepshead.Scores.Games as Games
	) as SortedGames
where	SortedGames.RowNumber > @skip
order by SortedGames.RowNumber asc;

select	Games.Id,
	Games.[When]
from	@games as Games
order by Games.RowNumber asc;

select	GameId = Games.Id,
	Users.Name,
	Players.Score
from	@games as Games
	inner join Sheepshead.Scores.Players as Players
	on	Players.GameId = Games.Id
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Players.UserId
order by Games.Id asc,
	Players.Score desc,
	Users.Name asc;
go
