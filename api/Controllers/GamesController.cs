using System;
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
			//TODO
			return DateTime.Now.Millisecond;
		}

		[HttpGet]
		public virtual GameModel GetGame(int id)
		{
			//TODO
			return new GameModel
			{
				Id = id,
				When = "2016-11-20",
				Scores = new[]
				{
					new ScoreModel { User = "Jacob Buysse", Score = 10 },
					new ScoreModel { User = "Rebecca Vance", Score = -20 },
					new ScoreModel { User = "Jeff Cutler", Score = 7 },
					new ScoreModel { User = "Austin Binish", Score = 3 },
					new ScoreModel { User = "Mark Centgraf", Score = 0 }
				}
			};
		}

		[HttpDelete]
		public virtual void DeleteGame(int id)
		{
			//TODO
		}

		[HttpGet]
		public virtual GamesModel GetGames(int skip, int take)
		{
			//TODO
			return new GamesModel
			{
				Games = Enumerable.Range(skip + 1, take).Select(id => new GameModel
				{
					Id = id,
					When = "2016-11-20",
					Scores = new[]
					{
						new ScoreModel { User = "Jacob Buysse", Score = 10 },
						new ScoreModel { User = "Rebecca Vance", Score = -20 },
						new ScoreModel { User = "Jeff Cutler", Score = 7 },
						new ScoreModel { User = "Austin Binish", Score = 3 },
						new ScoreModel { User = "Mark Centgraf", Score = 0 }
					}
				}).ToList(),
				MoreGames = skip < 20
			};
		}
	}
}
