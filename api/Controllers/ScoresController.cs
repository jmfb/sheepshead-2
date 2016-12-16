using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SheepsheadApi.Models;

namespace SheepsheadApi.Controllers
{
	public class ScoresController : AuthorizedController
	{
		[HttpGet]
		public virtual IEnumerable<GameScoreModel> GetScores(string account, DateTime startDate, DateTime endDateExclusive)
		{
			return DataBridge.GetScores(account, startDate, endDateExclusive);
		}

		[HttpGet]
		public virtual object GetPeriodScores(string month, int year)
		{
			return DataBridge.GetPeriodScores(Account, month, year);
		}

		[HttpGet]
		public virtual IEnumerable<ScoreModel> GetLifetimeScores()
		{
			return DataBridge.GetLifetimeScores().ToList();
		}

		[HttpGet]
		public virtual IEnumerable<ScoreModel> GetMonthScores(string month, int year)
		{
			return DataBridge.GetMonthScores(month, year).ToList();
		}

		[HttpGet]
		public virtual IEnumerable<ScoreModel> GetYearScores(int year)
		{
			return DataBridge.GetYearScores(year).ToList();
		}
	}
}
