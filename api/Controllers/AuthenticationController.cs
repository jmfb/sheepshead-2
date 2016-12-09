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
		[ResponseType(typeof(LoginModel))]
		public virtual async Task<HttpResponseMessage> Login(string redirectUrl, string authorizationCode)
		{
			var googleToken = await AuthenticationService.GetGoogleToken(redirectUrl, authorizationCode);
			var userInfo = await AuthenticationService.GetUserInfo(googleToken.TokenType, googleToken.AccessToken);
			var roleId = DataBridge.GetRoleIdByAccount(userInfo.Email);
			if (roleId == null)
			{
				return Request.CreateResponse(
					HttpStatusCode.Unauthorized,
					$"{userInfo.Email} has not been configured for Sheepshead.\n" +
					"Please contact Jacob Buysse to create your account.");
			}
			var account = new AccountModel
			{
				Account = userInfo.Email,
				RoleId = roleId.Value
			};
			var loginModel = new LoginModel
			{
				Token = AuthenticationService.CreateAuthorizationToken(account),
				RoleId = roleId.Value
			};
			return Request.CreateResponse(HttpStatusCode.OK, loginModel);
		}
	}
}
