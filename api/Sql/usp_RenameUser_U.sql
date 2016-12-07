use Sheepshead;
go
if (object_id('Scores.usp_RenameUser_U') is not null)
	drop procedure Scores.usp_RenameUser_U;
go
create procedure Scores.usp_RenameUser_U
(
	@oldName varchar(30),
	@newName varchar(30)
)
as
set nocount on;

/*
begin tran;
exec Sheepshead.Scores.usp_RenameUser_U 'Jacob Buysse', 'Zeus Almighty';
rollback;
*/

update	Sheepshead.Scores.Users
set	Name = @newName
where	Name = @oldName;
go
