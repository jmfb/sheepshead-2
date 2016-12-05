using System.Web.Http;
using System.Web.Http.Controllers;

namespace SheepsheadApi
{
	public class AuthorizeAccountAttribute : AuthorizeAttribute
	{
		protected override bool IsAuthorized(HttpActionContext actionContext)
		{
			var header = actionContext.Request.Headers.Authorization;
			if (header.Scheme != "Token")
				return false;
			var account = AuthenticationService.ValidateToken(header.Parameter);
			if (!DataBridge.IsValidUser(account))
				return false;
			actionContext.Request.Properties["Account"] = account;
			return true;
		}
	}
}
