use Sheepshead;
go
if (object_id('Scores.usp_RoleIdByAccount_S') is not null)
	drop procedure Scores.usp_RoleIdByAccount_S;
go
create procedure Scores.usp_RoleIdByAccount_S
(
	@account varchar(100)
)
as
set nocount on;

/*
exec Sheepshead.Scores.usp_RoleIdByAccount_S 'jacobb';
*/

select	Users.RoleId
from	Sheepshead.Scores.Accounts as Accounts
	inner join Sheepshead.Scores.Users as Users
	on	Users.Id = Accounts.UserId
where	Accounts.Account = @account;
go
