using System.Collections.Generic;

namespace SheepsheadApi.Models
{
	public class GamesModel
	{
		public IEnumerable<GameModel> Games { get; set; }
		public bool MoreGames { get; set; } 
	}
}
