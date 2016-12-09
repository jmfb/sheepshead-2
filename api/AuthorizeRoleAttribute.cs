using System.Web.Http;
using System.Web.Http.Controllers;

namespace SheepsheadApi
{
	public class AuthorizeRoleAttribute : AuthorizeAttribute
	{
		private readonly int minRoleId;

		public AuthorizeRoleAttribute(int minRoleId)
		{
			this.minRoleId = minRoleId;
		}

		protected override bool IsAuthorized(HttpActionContext actionContext)
		{
			var roleId = (int)actionContext.Request.Properties["RoleId"];
			return roleId >= minRoleId;
		}
	}
}
