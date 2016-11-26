using System.Collections.Generic;
using System.Web.Http;
using SheepsheadApi.Models;

namespace SheepsheadApi.Controllers
{
	public class UsersController : ApiController
	{
		[HttpPost]
		public virtual void CreateUser(string user)
		{
			//TODO
		}

		[HttpGet]
		public virtual IEnumerable<UserModel> GetUsers()
		{
			//TODO
			return new[]
			{
				new UserModel { Name = "Jacob Buysse" },
				new UserModel { Name = "Jeff Cutler" },
				new UserModel { Name = "Rebecca Vance" },
				new UserModel { Name = "Austin Binish" },
				new UserModel { Name = "Mark Centgraf" },
				new UserModel { Name = "Blake Adams" },
				new UserModel { Name = "Jon Detert" },
				new UserModel { Name = "Penny Laferriere" }
			};
		}

		[HttpGet]
		public virtual object GetCurrentPeriodScores()
		{
			//TODO
			return new
			{
				User = "Jacob Buysse",
				MonthScore = new
				{
					Period = new { Month = "November", Year = 2016 },
					Score = 20,
					Rank = 2
				},
				YearScore = new
				{
					Period = 2016,
					Score = 124,
					Rank = 4
				}
			};
		}

		[HttpGet]
		public virtual IEnumerable<ScoreModel> GetMonthScores(string month, int year)
		{
			//TODO
			return new[]
			{
				new ScoreModel { User = "Jacob Buysse", Score = 100 },
				new ScoreModel { User = "Rebecca Vance", Score = 20 },
				new ScoreModel { User = "Jeff Cutler", Score = 10 },
				new ScoreModel { User = "Austin Binish", Score = 0 },
				new ScoreModel { User = "Mark Centgraf", Score = -10 },
				new ScoreModel { User = "Blake Adams", Score = -20 },
				new ScoreModel { User = "Jon Detert", Score = -100 }
			};
		}

		[HttpGet]
		public virtual IEnumerable<ScoreModel> GetYearScores(int year)
		{
			//TODO
			return new[]
			{
				new ScoreModel { User = "Jacob Buysse", Score = 100 },
				new ScoreModel { User = "Greg Smith", Score = 20 },
				new ScoreModel { User = "Rebecca Vance", Score = 20 },
				new ScoreModel { User = "Jeff Cutler", Score = 10 },
				new ScoreModel { User = "Austin Binish", Score = 0 },
				new ScoreModel { User = "Mark Centgraf", Score = -10 },
				new ScoreModel { User = "Blake Adams", Score = -20 },
				new ScoreModel { User = "Jon Detert", Score = -120 }
			};
		}
	}
}
