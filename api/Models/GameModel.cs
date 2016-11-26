using System.Collections.Generic;

namespace SheepsheadApi.Models
{
	public class GameModel
	{
		public int Id { get; set; }
		public string When { get; set; }
		public IEnumerable<ScoreModel> Scores { get; set; }
	}
}
