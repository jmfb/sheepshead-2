using System.Web.Http;
using System.Web.Http.Controllers;

namespace SheepsheadApi
{
	public class AuthorizeAccountAttribute : AuthorizeAttribute
	{
		protected override bool IsAuthorized(HttpActionContext actionContext)
		{
			var account = AuthenticationService.Authorize(actionContext.Request.Headers.Authorization);
			if (account == null)
				return false;
			actionContext.Request.Properties["Account"] = account.Account;
			actionContext.Request.Properties["RoleId"] = account.RoleId;
			return true;
		}
	}
}
