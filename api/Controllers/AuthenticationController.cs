using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SheepsheadApi.Controllers
{
	public class AuthenticationController : ApiController
	{
		[HttpGet]
		public virtual string GetAuthenticationUrl(string redirectUrl)
		{
			return AuthenticationService.GetAuthenticationUrl(redirectUrl);
		}

		[HttpGet]
		public virtual async Task<string> GetToken(string redirectUrl, string authorizationCode)
		{
			var token = await AuthenticationService.GetToken(redirectUrl, authorizationCode);
			var userInfo = await AuthenticationService.GetUserInfo(token.TokenType, token.AccessToken);
			if (!DataBridge.IsValidUser(userInfo.Email))
				throw new InvalidOperationException("Invalid user.");
			return AuthenticationService.CreateToken(userInfo.Email);
		}
	}
}
