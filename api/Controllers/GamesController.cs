using System.Linq;
using System.Web.Http;
using SheepsheadApi.Models;

namespace SheepsheadApi.Controllers
{
	public class GamesController : ApiController
	{
		[HttpPost]
		public virtual int UpdateGame([FromBody]GameModel game)
		{
			return DataBridge.UpdateGame(game);
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
		public virtual GamesModel GetGames(int skip, int take)
		{
			var games = DataBridge.GetGames(skip, take);
			return new GamesModel
			{
				Games = games,
				MoreGames = games.Count == take
			};
		}
	}
}
