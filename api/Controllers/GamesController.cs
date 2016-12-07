using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SheepsheadApi.Models;

namespace SheepsheadApi.Controllers
{
	public class GamesController : AuthorizedController
	{
		[HttpPost]
		[ResponseType(typeof(int))]
		public virtual HttpResponseMessage UpdateGame([FromBody]GameModel game)
		{
			if (game == null)
				return Request.CreateResponse(HttpStatusCode.BadRequest, "Game was null.");
			if (game.Scores == null)
				return Request.CreateResponse(HttpStatusCode.BadRequest, "Scores was null.");
			if (game.Scores.Count() < 5)
				return Request.CreateResponse(HttpStatusCode.BadRequest, "Scores must contain at least 5 items.");
			var id = DataBridge.UpdateGame(game);
			return Request.CreateResponse(HttpStatusCode.OK, id);
		}

		[HttpGet]
		public virtual GameModel GetGame(int id)
		{
			return DataBridge.GetGame(id);
		}

		[HttpDelete]
		public virtual void DeleteGame(int id)
		{
			DataBridge.DeleteGame(id);
		}

		[HttpGet]
		[ResponseType(typeof(GamesModel))]
		public virtual HttpResponseMessage GetGames(int skip, int take)
		{
			if (skip < 0)
				return Request.CreateResponse(HttpStatusCode.BadRequest, "Skip cannot be negative.");
			if (take < 0)
				return Request.CreateResponse(HttpStatusCode.BadRequest, "Take cannot be negative.");
			var games = DataBridge.GetGames(skip, take);
			var result = new GamesModel
			{
				Games = games,
				MoreGames = games.Count == take
			};
			return Request.CreateResponse(HttpStatusCode.OK, result);
		}
	}
}
