use Sheepshead;
go
if (object_id('Scores.usp_User_M') is not null)
	drop procedure Scores.usp_User_M;
if (type_id('Scores.udt_Accounts') is not null)
	drop type Scores.udt_Accounts;
go
create type Scores.udt_Accounts as table
(
	Account varchar(100) not null
);
go
create procedure Scores.usp_User_M
(
	@name varchar(30),
	@roleId int,
	@accounts Scores.udt_Accounts readonly
)
as
set nocount on;

/*
begin tran;
use Sheepshead;
declare @accounts Scores.udt_Accounts;
insert into @accounts (Account) values ('jacobb'), ('jmfb');
exec Sheepshead.Scores.usp_User_M 'Jacob Buysse', 2, @accounts;
rollback;
*/

declare @id int = (select Id from Sheepshead.Scores.Users where Name = @name);
if (@id is null)
  begin
	set @id = next value for Sheepshead.Scores.UserId;
  end;

merge	into Sheepshead.Scores.Users as Users_Merge
using	(	select	Id = @id,
			Name = @name,
			RoleId = @roleId
	) as SourceValues
	on	Users_Merge.Id = SourceValues.Id
when	not matched by target
then	insert (
		Id,
		Name,
		RoleId
	) values (
		SourceValues.Id,
		SourceValues.Name,
		SourceValues.RoleId
	)
when	matched and Users_Merge.RoleId <> SourceValues.RoleId
then	update set RoleId = SourceValues.RoleId;

with UserAccounts as (
	select	UserId,
		Account
	from	Sheepshead.Scores.Accounts
	where	UserId = @id
)
merge	into UserAccounts as UserAccounts_Merge
using	(	select	UserId = @id,
			Account
		from	@accounts
	) as SourceValues
	on	UserAccounts_Merge.UserId = SourceValues.UserId
	and	UserAccounts_Merge.Account = SourceValues.Account
when	not matched by target
then	insert (
		UserId,
		Account
	) values (
		SourceValues.UserId,
		SourceValues.Account
	)
when	not matched by source
then	delete;
go
