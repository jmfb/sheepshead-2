use Sheepshead;
go
if (object_id('Scores.usp_Users_S') is not null)
	drop procedure Scores.usp_Users_S;
go
create procedure Scores.usp_Users_S
as
set nocount on;

/*
exec Sheepshead.Scores.usp_Users_S;
*/

select	Name,
	RoleId
from	Sheepshead.Scores.Users
order by Name;
go
