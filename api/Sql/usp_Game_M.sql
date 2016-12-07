use Sheepshead;
go
if (object_id('Scores.usp_Game_M') is not null)
	drop procedure Scores.usp_Game_M;
if (type_id('Scores.udt_Scores') is not null)
	drop type Scores.udt_Scores;
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
