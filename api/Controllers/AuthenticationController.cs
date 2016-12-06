using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using SheepsheadApi.Models;

namespace SheepsheadApi.Controllers
{
	public class AuthenticationController : ApiController
	{
		[HttpGet]
		public virtual string GetAuthenticationUrl(string redirectUrl)
		{
			return AuthenticationService.GetGoogleAuthenticationUrl(redirectUrl);
		}

		[HttpGet]
		[ResponseType(typeof(string))]
		public virtual async Task<HttpResponseMessage> GetToken(string redirectUrl, string authorizationCode)
		{
			var googleToken = await AuthenticationService.GetGoogleToken(redirectUrl, authorizationCode);
			var userInfo = await AuthenticationService.GetUserInfo(googleToken.TokenType, googleToken.AccessToken);
			if (!DataBridge.IsValidUser(userInfo.Email))
			{
				return Request.CreateResponse(
					HttpStatusCode.Unauthorized,
					$"{userInfo.Email} has not been configured for Sheepshead.\n" +
					"Please contact Jacob Buysse to create your account.");
			}
			var account = new AccountModel
			{
				Account = userInfo.Email
			};
			return Request.CreateResponse(HttpStatusCode.OK, AuthenticationService.CreateAuthorizationToken(account));
		}
	}
}
