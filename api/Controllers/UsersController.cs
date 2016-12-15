using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SheepsheadApi.Models;

namespace SheepsheadApi.Controllers
{
	public class UsersController : AuthorizedController
	{
		[HttpPost]
		[AuthorizeRole(Roles.Admin)]
		[ResponseType(typeof(void))]
		public virtual HttpResponseMessage UpdateUser([FromBody]UpdateUserModel user)
		{
			if (user == null)
				return Request.CreateResponse(HttpStatusCode.BadRequest, "User was null.");
			if (user.Accounts == null)
				return Request.CreateResponse(HttpStatusCode.BadRequest, "Accounts was null.");
			DataBridge.UpdateUser(user.Name, user.RoleId, user.Accounts);
			return Request.CreateResponse(HttpStatusCode.OK);
		}

		[HttpDelete]
		[AuthorizeRole(Roles.Admin)]
		public virtual void DeleteUser(string name)
		{
			DataBridge.DeleteUser(name);
		}

		[HttpPost]
		[AuthorizeRole(Roles.Admin)]
		public virtual void RenameUser(string oldName, string newName)
		{
			DataBridge.RenameUser(oldName, newName);
		}

		[HttpGet]
		public virtual IEnumerable<UserModel> GetUsers()
		{
			return DataBridge.GetUsers().ToList();
		}

		[HttpGet]
		[AuthorizeRole(Roles.Admin)]
		public virtual IEnumerable<AllUserDataModel> GetAllUserData()
		{
			return DataBridge.GetAllUserdata();
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
