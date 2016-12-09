using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using SheepsheadApi.Models;

namespace SheepsheadApi
{
	public static class DataBridge
	{
		private static string ConnectionString =>
			WebConfigurationManager.ConnectionStrings["Sheepshead"].ConnectionString;

		private static SqlConnection CreateConnection()
		{
			var connection = new SqlConnection(ConnectionString);
			connection.Open();
			return connection;
		}

		private static SqlCommand CreateCommand(this SqlConnection connection, string storedProcedureName) =>
			new SqlCommand($"Sheepshead.Scores.{storedProcedureName}", connection)
			{
				CommandType = CommandType.StoredProcedure
			};

		public static void UpdateUser(string name, int roleId, IEnumerable<string> accounts)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_User_M"))
			using (var accountTable = new DataTable())
			{
				accountTable.Columns.Add("Account", typeof(string));
				foreach (var account in accounts)
					accountTable.Rows.Add(account);
				command.Parameters.AddWithValue("@name", name);
				command.Parameters.AddWithValue("@roleId", roleId);
				command.Parameters.Add(new SqlParameter("@accounts", SqlDbType.Structured)
				{
					TypeName = "Scores.udt_Accounts",
					Value = accountTable
				});
				command.ExecuteNonQuery();
			}
		}

		public static void RenameUser(string oldName, string newName)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_RenameUser_U"))
			{
				command.Parameters.AddWithValue("@oldName", oldName);
				command.Parameters.AddWithValue("@newName", newName);
				command.ExecuteNonQuery();
			}
		}

		public static void DeleteUser(string name)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_User_D"))
			{
				command.Parameters.AddWithValue("@name", name);
				command.ExecuteNonQuery();
			}
		}

		public static IEnumerable<UserModel> GetUsers()
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Users_S"))
			using (var reader = command.ExecuteReader())
			{
				var nameOrdinal = reader.GetOrdinal("Name");
				var roleIdOrdinal = reader.GetOrdinal("RoleId");
				while (reader.Read())
					yield return new UserModel
					{
						Name = (string)reader[nameOrdinal],
						RoleId = (int)reader[roleIdOrdinal]
					};
			}
		}

		public static IEnumerable<AllUserDataModel> GetAllUserdata()
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_AllUserData_S"))
			using (var reader = command.ExecuteReader())
			{
				var idOrdinal = reader.GetOrdinal("Id");
				var nameOrdinal = reader.GetOrdinal("Name");
				var roleIdOrdinal = reader.GetOrdinal("RoleId");
				var totalGameCountOrdinal = reader.GetOrdinal("TotalGameCount");
				var lifetimeScoreOrdinal = reader.GetOrdinal("LifetimeScore");
				var lastGameWhenOrdinal = reader.GetOrdinal("LastGameWhen");

				var users = new List<AllUserDataModel>();
				var accountsById = new Dictionary<int, List<string>>();
				while (reader.Read())
				{
					var accounts = new List<string>();
					accountsById[(int)reader[idOrdinal]] = accounts;
					var lastGameWhen = reader[lastGameWhenOrdinal];
					users.Add(new AllUserDataModel
					{
						Name = (string)reader[nameOrdinal],
						RoleId = (int)reader[roleIdOrdinal],
						TotalGameCount = (int)reader[totalGameCountOrdinal],
						LifetimeScore = (int)reader[lifetimeScoreOrdinal],
						LastGameWhen = lastGameWhen is DBNull ? null : $"{(DateTime)lastGameWhen:yyyy-MM-dd}",
						Accounts = accounts
					});
				}

				if (!reader.NextResult())
					throw new InvalidOperationException("Missing result.");

				var userIdOrdinal = reader.GetOrdinal("UserId");
				var accountOrdinal = reader.GetOrdinal("Account");
				while (reader.Read())
					accountsById[(int)reader[userIdOrdinal]].Add((string)reader[accountOrdinal]);

				return users;
			}
		}

		public static int? GetRoleIdByAccount(string account)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_RoleIdByAccount_S"))
			{
				command.Parameters.AddWithValue("@account", account);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						return null;
					return (int)reader["RoleId"];
				}
			}
		}

		public static object GetPeriodScores(string account, string month, int year)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_PeriodScores_S"))
			{
				command.Parameters.AddWithValue("@account", account);
				command.Parameters.AddWithValue("@month", month);
				command.Parameters.AddWithValue("@year", year);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					var name = (string)reader["Name"];
					var monthScore = (int)reader["MonthScore"];
					var monthRank = (int)reader["MonthRank"];
					var yearScore = (int)reader["YearScore"];
					var yearRank = (int)reader["YearRank"];
					return new
					{
						User = name,
						MonthScore = new
						{
							Period = new { Month = month, Year = year },
							Score = monthScore,
							Rank = monthRank
						},
						YearScore = new
						{
							Period = year,
							Score = yearScore,
							Rank = yearRank
						}
					};
				}
			}
		}

		public static IEnumerable<ScoreModel> GetMonthScores(string month, int year)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_MonthScores_S"))
			{
				command.Parameters.AddWithValue("@month", month);
				command.Parameters.AddWithValue("@year", year);
				using (var reader = command.ExecuteReader())
				{
					var nameOrdinal = reader.GetOrdinal("Name");
					var scoreOrdinal = reader.GetOrdinal("Score");
					while (reader.Read())
						yield return new ScoreModel
						{
							User = (string)reader[nameOrdinal],
							Score = (int)reader[scoreOrdinal]
						};
				}
			}
		}

		public static IEnumerable<ScoreModel> GetYearScores(int year)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_YearScores_S"))
			{
				command.Parameters.AddWithValue("@year", year);
				using (var reader = command.ExecuteReader())
				{
					var nameOrdinal = reader.GetOrdinal("Name");
					var scoreOrdinal = reader.GetOrdinal("Score");
					while (reader.Read())
						yield return new ScoreModel
						{
							User = (string)reader[nameOrdinal],
							Score = (int)reader[scoreOrdinal]
						};
				}
			}
		}

		public static int UpdateGame(GameModel game)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Game_M"))
			using (var scores = new DataTable())
			{
				scores.Columns.Add("Name", typeof(string));
				scores.Columns.Add("Score", typeof(int));
				foreach (var score in game.Scores)
					scores.Rows.Add(score.User, score.Score);
				command.Parameters.AddWithValue("@id", game.Id);
				command.Parameters.AddWithValue("@when", game.When);
				command.Parameters.Add(new SqlParameter("@scores", SqlDbType.Structured)
				{
					TypeName = "Scores.udt_Scores",
					Value = scores
				});
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					return (int)reader["Id"];
				}
			}
		}

		public static GameModel GetGame(int id)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Game_S"))
			{
				command.Parameters.AddWithValue("@id", id);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					var when = (DateTime)reader["When"];
					var scores = new List<ScoreModel>();
					var game = new GameModel
					{
						Id = id,
						When = $"{when:yyyy-MM-dd}",
						Scores = scores
					};

					if (!reader.NextResult())
						throw new InvalidOperationException("Missing next result.");
					var nameOrdinal = reader.GetOrdinal("Name");
					var scoreOrdinal = reader.GetOrdinal("Score");
					while (reader.Read())
						scores.Add(new ScoreModel
						{
							User = (string)reader[nameOrdinal],
							Score = (int)reader[scoreOrdinal]
						});

					return game;
				}
			}
		}

		public static void DeleteGame(int id)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Game_D"))
			{
				command.Parameters.AddWithValue("@id", id);
				command.ExecuteNonQuery();
			}
		}

		public static List<GameModel> GetGames(int skip, int take)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Games_S"))
			{
				command.Parameters.AddWithValue("@skip", skip);
				command.Parameters.AddWithValue("@take", take);
				using (var reader = command.ExecuteReader())
				{
					var games = new List<GameModel>();
					var scoresByGame = new Dictionary<int, List<ScoreModel>>();
					var idOrdinal = reader.GetOrdinal("Id");
					var whenOrdinal = reader.GetOrdinal("When");
					while (reader.Read())
					{
						var id = (int)reader[idOrdinal];
						var when = (DateTime)reader[whenOrdinal];
						var scores = new List<ScoreModel>();
						scoresByGame[id] = scores;
						games.Add(new GameModel
						{
							Id = id,
							When = $"{when:yyyy-MM-dd}",
							Scores = scores
						});
					}

					if (!reader.NextResult())
						throw new InvalidOperationException("Missing result.");

					var gameIdOrdinal = reader.GetOrdinal("GameId");
					var nameOrdinal = reader.GetOrdinal("Name");
					var scoreOrdinal = reader.GetOrdinal("Score");
					while (reader.Read())
						scoresByGame[(int)reader[gameIdOrdinal]].Add(new ScoreModel
						{
							User = (string)reader[nameOrdinal],
							Score = (int)reader[scoreOrdinal]
						});

					return games;
				}
			}
		}
	}
}
