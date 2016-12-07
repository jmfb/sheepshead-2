use Sheepshead;
go
if (object_id('Scores.usp_User_I') is not null)
	drop procedure Scores.usp_User_I;
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
