use Sheepshead;
go
if (object_id('Scores.usp_PeriodScores_S') is not null)
	drop procedure Scores.usp_PeriodScores_S;
go
create procedure Scores.usp_PeriodScores_S
(
	@account varchar(100),
	@month varchar(10),
	@year int
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_PeriodScores_S 'jacobb', 'November', 2016;
*/

declare @bom date = convert(date, @month + ' 1, ' + convert(varchar, @year));
declare @boy date = dateadd(year, datediff(year, 0, @bom), 0);

select	Users.Name,
	MonthScore = isnull(MonthScores.Score, 0),
	MonthGameCount = isnull(MonthScores.GameCount, 0),
	MonthRank = convert(int, isnull(MonthScores.[Rank], 0)),
	YearScore = isnull(YearScores.Score, 0),
	YearGameCount = isnull(YearScores.GameCount, 0),
	YearRank = convert(int, isnull(YearScores.[Rank], 0)),
	LifetimeScore = isnull(LifetimeScores.Score, 0),
	LifetimeGameCount = isnull(LifetimeScores.GameCount, 0),
	LifetimeRank = convert(int, isnull(LifetimeScores.[Rank], 0))
from	Sheepshead.Scores.Accounts as Accounts
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Accounts.UserId
	left outer join (
		select	RankedScores.UserId,
			RankedScores.Score,
			RankedScores.GameCount,
			[Rank] = rank() over (order by RankedScores.Score desc)
		from	(	select	Players.UserId,
					Score = sum(Players.Score),
					GameCount = count(*)
				from	Sheepshead.Scores.Games as Games
					inner join Sheepshead.Scores.Players as Players
					on	Players.GameId = Games.Id
				where	Games.[When] >= @bom
				and	Games.[When] < dateadd(month, 1, @bom)
				group by Players.UserId
			) as RankedScores
	) as MonthScores
	on	MonthScores.UserId = Users.Id
	left outer join (
		select	RankedScores.UserId,
			RankedScores.Score,
			RankedScores.GameCount,
			[Rank] = rank() over (order by RankedScores.Score desc)
		from	(	select	Players.UserId,
					Score = sum(Players.Score),
					GameCount = count(*)
				from	Sheepshead.Scores.Games as Games
					inner join Sheepshead.Scores.Players as Players
					on	Players.GameId = Games.Id
				where	Games.[When] >= @boy
				and	Games.[When] < dateadd(year, 1, @boy)
				group by Players.UserId
			) as RankedScores
	) as YearScores
	on	YearScores.UserId = Users.Id
	left outer join (
		select	RankedScores.UserId,
			RankedScores.Score,
			RankedScores.GameCount,
			[Rank] = rank() over (order by RankedScores.Score desc)
		from	(	select	Players.UserId,
					Score = sum(Players.Score),
					GameCount = count(*)
				from	Sheepshead.Scores.Games as Games
					inner join Sheepshead.Scores.Players as Players
					on	Players.GameId = Games.Id
				group by Players.UserId
			) as RankedScores
	) as LifetimeScores
	on	LifetimeScores.UserId = Users.Id
where	Accounts.Account = @account;
go
