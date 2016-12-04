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
create sequence Scores.UserId as int start with 1 increment by 1;
go
create sequence Scores.GameId as int start with 2000 increment by 1;
go
create table Scores.Users
(
	Id int not null,
	Name varchar(30) not null,
	Account varchar(30) not null,
	constraint PK_Scores_Users_Id primary key clustered (Id)
);
go
create unique index U_Scores_Users_Name on Scores.Users (Name);
create unique index U_Scores_Users_Account on Scores.Users (Account);
go
create table Scores.Games
(
	Id int not null,
	[When] date not null,
	constraint PK_Scores_Games_Id primary key clustered (Id)
);
go
create index NU_Scores_Games_When on Scores.Games ([When]) include (Id);
go
create table Scores.Players
(
	GameId int not null,
	UserId int not null,
	Score int not null,
	constraint PK_Scores_Players primary key clustered (GameId, UserId),
	constraint FK_Scores_Players_GameId foreign key (GameId) references Scores.Games (Id),
	constraint FK_Scores_Players_UserId foreign key (UserId) references Scores.Users (Id)
);
go
create procedure Scores.usp_User_I
(
	@name varchar(30),
	@account varchar(30)
)
as
set nocount on;

/*
begin tran;
exec Sheepshead.Scores.usp_User_I 'Jacob Buysse', 'jacobb';
rollback;
*/

declare @id int = (select Id from Sheepshead.Scores.Users where Name = @name);
if (@id is null)
  begin
	insert into Sheepshead.Scores.Users (
		Id,
		Name,
		Account
	) values (
		next value for Sheepshead.Scores.UserId,
		@name,
		@account
	);
  end;
else
  begin
	update	Sheepshead.Scores.Users
	set	Account = @account
	where	Id = @id
	and	Account <> @account;
  end;
go
create procedure Scores.usp_Users_S
as
set nocount on;

/*
exec Sheepshead.Scores.usp_Users_S;
*/

select	Name
from	Sheepshead.Scores.Users
order by Name;
go
create procedure Scores.usp_IsValidUser_S
(
	@account varchar(30)
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_IsValidUser_S 'jacobb';
*/

select	IsValidUser = convert(bit, case
		when exists(
			select	0
			from	Sheepshead.Scores.Users as Users
			where	Users.Account = @account)
		then	1
		else	0
		end);
go
create procedure Scores.usp_PeriodScores_S
(
	@account varchar(30),
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
	MonthRank = convert(int, isnull(MonthScores.[Rank], 0)),
	YearScore = isnull(YearScores.Score, 0),
	YearRank = convert(int, isnull(YearScores.[Rank], 0))
from	Sheepshead.Scores.Users as Users
	left outer join (
		select	RankedScores.UserId,
			RankedScores.Score,
			[Rank] = rank() over (order by RankedScores.Score desc)
		from	(	select	Players.UserId,
					Score = sum(Players.Score)
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
			[Rank] = rank() over (order by RankedScores.Score desc)
		from	(	select	Players.UserId,
					Score = sum(Players.Score)
				from	Sheepshead.Scores.Games as Games
					inner join Sheepshead.Scores.Players as Players
					on	Players.GameId = Games.Id
				where	Games.[When] >= @boy
				and	Games.[When] < dateadd(year, 1, @boy)
				group by Players.UserId
			) as RankedScores
	) as YearScores
	on	YearScores.UserId = Users.Id
where	Users.Account = @account;
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
create type Scores.udt_Scores as table
(
	Name varchar(30) not null,
	Score int not null
);
go
create procedure Scores.usp_Game_M
(
	@id int,
	@when date,
	@scores Scores.udt_Scores readonly
)
as
set nocount on;
set xact_abort on;
begin tran;

/*
begin tran;
use Sheepshead;
declare @scores Scores.udt_Scores;
insert into @scores (Name, Score) values ('Jacob Buysse', 1), ('Mark Centgraf', -1);
exec Sheepshead.Scores.usp_Game_M 0, '2016-11-20', @scores;
rollback;
*/

if (exists(
	select	0
	from	@scores as Scores
	where	not exists(
			select	0
			from	Sheepshead.Scores.Users as Users
			where	Users.Name = Scores.Name)))
  begin
	raiserror('User does not exist.', 16, 1);
  end;

if (@id = 0)
  begin
	set @id = next value for Sheepshead.Scores.GameId;
  end;

merge	into Sheepshead.Scores.Games as Games_Merge
using	(	select	Id = @id,
		[When] = @when
	) as SourceValues
	on	Games_Merge.Id = SourceValues.Id
when	not matched by target
then	insert (
		Id,
		[When]
	) values (
		SourceValues.Id,
		SourceValues.[When]
	)
when	matched and Games_Merge.[When] <> SourceValues.[When]
then	update set [When] = SourceValues.[When];

with GamePlayers as (
	select	Players.GameId,
		Players.UserId,
		Players.Score
	from	Sheepshead.Scores.Players as Players
	where	Players.GameId = @id
)
merge	into GamePlayers as GamePlayers_Merge
using	(	select	GameId = @id,
			UserId = Users.Id,
			Score = Scores.Score
		from	@scores as Scores
			inner join Sheepshead.Scores.Users as Users
			on	Users.Name = Scores.Name
	) as SourceValues
	on	GamePlayers_Merge.GameId = SourceValues.GameId
	and	GamePlayers_Merge.UserId = SourceValues.UserId
when	not matched by target
then	insert (
		GameId,
		UserId,
		Score
	) values (
		SourceValues.GameId,
		SourceValues.UserId,
		SourceValues.Score
	)
when	not matched by source
then	delete
when	matched and GamePlayers_Merge.Score <> SourceValues.Score
then	update set Score = SourceValues.Score;

select	Id = @id;

commit;
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
order by Games.Id,
	Users.Name;
go
exec Sheepshead.Scores.usp_User_I 'Andrew Bender', 'abender@directs.com';
exec Sheepshead.Scores.usp_User_I 'Anne Sechtig', 'asechtig@directs.com';
exec Sheepshead.Scores.usp_User_I 'Austin Binish', 'abinish@directs.com';
exec Sheepshead.Scores.usp_User_I 'Ben Dixon', 'bdixon@directs.com';
exec Sheepshead.Scores.usp_User_I 'Ben Harbach', 'bharbach@directs.com';
exec Sheepshead.Scores.usp_User_I 'Beth Duerr', 'bduerr@directs.com';
exec Sheepshead.Scores.usp_User_I 'Blake Adams', 'badams@directs.com';
exec Sheepshead.Scores.usp_User_I 'Brian Echtner', 'bechtner@directs.com';
exec Sheepshead.Scores.usp_User_I 'Brian Skibinski', 'bskibinski@directs.com';
exec Sheepshead.Scores.usp_User_I 'Charles Fastner', 'cfastner@directs.com';
exec Sheepshead.Scores.usp_User_I 'Dave Peters', 'dpeters@directs.com';
exec Sheepshead.Scores.usp_User_I 'Denise Barchus', 'dbarchus@directs.com';
exec Sheepshead.Scores.usp_User_I 'Ezra McNichols', 'emcnichols@directs.com';
exec Sheepshead.Scores.usp_User_I 'Greg Matthews', 'gmatthews@directs.com';
exec Sheepshead.Scores.usp_User_I 'Greg Schreiner', 'gschreiner@directs.com';
exec Sheepshead.Scores.usp_User_I 'Greg Smith', 'gsmith@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jacob Buysse', 'jbuysse@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jim Strassburg', 'jstrassburg@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jeff Cutler', 'jcutler@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jenny Bucek', 'jbucek@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jeremy Stangel', 'jstangel@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jim Cincotta', 'jcincotta@directs.com';
exec Sheepshead.Scores.usp_User_I 'John Bartosch', 'jbartosch@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jon Burbey', 'jburbey@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jon Detert', 'jdetert@directs.com';
exec Sheepshead.Scores.usp_User_I 'Jonathan Lampe', 'jlampe@directs.com';
exec Sheepshead.Scores.usp_User_I 'Kim Schmoldt', 'kschmoldt@directs.com';
exec Sheepshead.Scores.usp_User_I 'Kyle Salewski', 'ksalewski@directs.com';
exec Sheepshead.Scores.usp_User_I 'Mark Centgraf', 'mcentgraf@directs.com';
exec Sheepshead.Scores.usp_User_I 'Matt Herman', 'mherman@directs.com';
exec Sheepshead.Scores.usp_User_I 'Mike Belger', 'mbelger@directs.com';
exec Sheepshead.Scores.usp_User_I 'Mike Krautkramer', 'mkrautkramer@directs.com';
exec Sheepshead.Scores.usp_User_I 'Mike Miller', 'mmiller@directs.com';
exec Sheepshead.Scores.usp_User_I 'Mike Sullivan', 'msullivan@directs.com';
exec Sheepshead.Scores.usp_User_I 'Nhat Nguyen', 'nnguyen@directs.com';
exec Sheepshead.Scores.usp_User_I 'Paul Clarke', 'pclarke@directs.com';
exec Sheepshead.Scores.usp_User_I 'Penny Laferriere', 'plaferriere@directs.com';
exec Sheepshead.Scores.usp_User_I 'Rebecca Vance', 'rvance@directs.com';
exec Sheepshead.Scores.usp_User_I 'Rob Berken', 'rberken@directs.com';
exec Sheepshead.Scores.usp_User_I 'Scott Murphy', 'smurphy@directs.com';
exec Sheepshead.Scores.usp_User_I 'Steve McGranahan', 'smcgranahan@directs.com';
exec Sheepshead.Scores.usp_User_I 'Tim Ernst', 'ternst@directs.com';
exec Sheepshead.Scores.usp_User_I 'Tom Kiebzak', 'tkiebzak@directs.com';
exec Sheepshead.Scores.usp_User_I 'Tom Strong', 'tstrong@directs.com';
exec Sheepshead.Scores.usp_User_I 'Tony Roberts', 'troberts@directs.com';
exec Sheepshead.Scores.usp_User_I 'Tracy Mueller', 'tmueller@directs.com';
exec Sheepshead.Scores.usp_User_I 'Viet Vu', 'vvu@directs.com';
exec Sheepshead.Scores.usp_User_I 'Zach Nanfelt', 'znanfelt@directs.com';
go
