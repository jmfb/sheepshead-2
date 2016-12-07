using System.Collections.Generic;

namespace SheepsheadApi.Models
{
	public class AllUserDataModel
	{
		public string Name { get; set; }
		public int RoleId { get; set; }
		public int TotalGameCount { get; set; }
		public int LifetimeScore { get; set; }
		public string LastGameWhen { get; set; }
		public IEnumerable<string> Accounts { get; set; }
	}
}
