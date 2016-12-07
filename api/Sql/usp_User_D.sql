use Sheepshead;
go
if (object_id('Scores.usp_User_D') is not null)
	drop procedure Scores.usp_User_D;
go
create procedure Scores.usp_User_D
(
	@name varchar(30)
)
as
set nocount on;
begin tran;
set xact_abort on;

/*
begin tran;
exec Sheepshead.Scores.usp_User_D 'Jacob Buysse';
rollback;
*/

delete	from Accounts_Delete
from	Sheepshead.Scores.Users as Users
	inner join Sheepshead.Scores.Accounts as Accounts_Delete
	on	Accounts_Delete.UserId = Users.Id
where	Users.Name = @name;

delete	from Sheepshead.Scores.Users
where	Name = @name;

commit;
go
