use Sheepshead;
go
if (object_id('Scores.usp_IsValidUser_S') is not null)
	drop procedure Scores.usp_IsValidUser_S;
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
