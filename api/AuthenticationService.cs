﻿using System;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using SheepsheadApi.Models;

namespace SheepsheadApi
{
	public static class AuthenticationService
	{
		private const string clientId = "658047002068-gv2gr1jds2d6renups2ir74abb0r061p.apps.googleusercontent.com";
		private const string clientSecret = "N8ZAIlfOR4fmV1hHqk5JrUVO";
		private const string audience = "SheepsheadClient";
		private const string issuer = "SheepsheadApi";
		private const string signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256";
		private const string digestAlgorithm = "http://www.w3.org/2001/04/xmlenc#sha256";
		private const string accountClaimType = "account";
		private const string roleIdClaimType = "roleId";

		public static string GetGoogleAuthenticationUrl(string redirectUrl)
		{
			var query = HttpUtility.ParseQueryString("");
			query["redirect_uri"] = redirectUrl;
			query["prompt"] = "consent";
			query["response_type"] = "code";
			query["client_id"] = clientId;
			query["scope"] = "https://www.googleapis.com/auth/userinfo.email";
			query["access_type"] = "offline";
			return $"https://accounts.google.com/o/oauth2/v2/auth?{query}";
		}

		public static async Task<TokenModel> GetGoogleToken(string redirectUrl, string authorizationCode)
		{
			using (var handler = new HttpClientHandler())
			using (var client = new HttpClient(handler))
			{
				var query = HttpUtility.ParseQueryString("");
				query["code"] = authorizationCode;
				query["redirect_uri"] = redirectUrl;
				query["client_id"] = clientId;
				query["client_secret"] = clientSecret;
				query["scope"] = "";
				query["grant_type"] = "authorization_code";
				var content = new StringContent(query.ToString(), Encoding.UTF8, "application/x-www-form-urlencoded");
				var response = await client.PostAsync(new Uri("https://www.googleapis.com/oauth2/v4/token"), content);
				if (!response.IsSuccessStatusCode)
					throw new InvalidOperationException(await response.Content.ReadAsStringAsync());
				var json = await response.Content.ReadAsStringAsync();
				return JsonConvert.DeserializeObject<TokenModel>(json);
			}
		}

		public static async Task<UserInfoModel> GetUserInfo(string tokenType, string accessToken)
		{
			using (var handler = new HttpClientHandler())
			using (var client = new HttpClient(handler))
			{
				client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(tokenType, accessToken);
				var response = await client.GetAsync(new Uri("https://www.googleapis.com/oauth2/v2/userinfo"));
				if (!response.IsSuccessStatusCode)
					throw new InvalidOperationException(await response.Content.ReadAsStringAsync());
				var json = await response.Content.ReadAsStringAsync();
				return JsonConvert.DeserializeObject<UserInfoModel>(json);
			}
		}

		private static string Secret => ConfigurationManager.AppSettings["Secret"];
		private static byte[] SecretBytes => Encoding.UTF8.GetBytes(Secret);
		private static SecurityKey Key => new InMemorySymmetricSecurityKey(SecretBytes);

		public static string CreateAuthorizationToken(AccountModel account) => new JwtSecurityTokenHandler()
			.WriteToken(new JwtSecurityToken(
				issuer,
				audience,
				new[]
				{
					new Claim(accountClaimType, account.Account),
					new Claim(roleIdClaimType, account.RoleId.ToString())
				},
				signingCredentials: new SigningCredentials(Key, signatureAlgorithm, digestAlgorithm)));

		private static AccountModel ParseToken(string token)
		{
			try
			{
				SecurityToken securityToken;
				var claimsPrincipal = new JwtSecurityTokenHandler().ValidateToken(
					token,
					new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidIssuer = issuer,
						ValidateAudience = true,
						ValidAudience = audience,
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = Key,
						ValidateLifetime = false
					},
					out securityToken);
				var account = claimsPrincipal.Claims.Single(claim => claim.Type == accountClaimType).Value;
				var roleId = claimsPrincipal.Claims.Single(claim => claim.Type == roleIdClaimType).Value;
				return new AccountModel
				{
					Account = account,
					RoleId = int.Parse(roleId)
				};
			}
			catch (Exception exception)
			{
				throw new SecurityException("Invalid authorization token.", exception);
			}
		}

		public static AccountModel Authorize(AuthenticationHeaderValue authorization)
		{
			if (authorization == null)
				return null;
			if (authorization.Scheme != "Token")
				return null;
			try
			{
				var account = ParseToken(authorization.Parameter);
				var roleId = DataBridge.GetRoleIdByAccount(account.Account);
				if (roleId == null || roleId.Value != account.RoleId)
					return null;
				return account;
			}
			catch (SecurityException)
			{
				return null;
			}
		}
	}
}
