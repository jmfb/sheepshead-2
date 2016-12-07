use Sheepshead;
go
create sequence Scores.UserId as int start with 1 increment by 1;
go
create sequence Scores.GameId as int start with 2000 increment by 1;
go
create table Scores.Users
(
	Id int not null,
	Name varchar(30) not null,
	RoleId int not null,
	constraint PK_Scores_Users_Id primary key clustered (Id)
);
go
create unique index U_Scores_Users_Name on Scores.Users (Name);
go
create table Scores.Accounts
(
	UserId int not null,
	Account varchar(100) not null,
	constraint PK_Scores_Accounts_UserId_Account primary key clustered (UserId, Account),
	constraint FK_Scores_Accounts_UserId foreign key (UserId) references Scores.Users (Id)
);
go
create unique index U_Scores_Accounts_Account on Scores.Accounts (Account);
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
