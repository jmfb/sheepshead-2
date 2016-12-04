using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SheepsheadApi.Models;

namespace SheepsheadApi.Controllers
{
	public class UsersController : ApiController
	{
		[HttpPost]
		public virtual void CreateUser(string name, string account)
		{
			DataBridge.CreateUser(name, account);
		}

		[HttpGet]
		public virtual IEnumerable<UserModel> GetUsers()
		{
			return DataBridge.GetUsers().ToList();
		}

		[HttpGet]
		public virtual bool IsValidUser(string account)
		{
			return DataBridge.IsValidUser(account);
		}

		[HttpGet]
		public virtual object GetPeriodScores(string account, string month, int year)
		{
			return DataBridge.GetPeriodScores(account, month, year);
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
