﻿using System.Web.Http;

namespace SheepsheadApi.Controllers
{
	[AuthorizeAccount]
	public class AuthorizedController : ApiController
	{
		protected string Account => (string)Request.Properties["Account"];
	}
}
