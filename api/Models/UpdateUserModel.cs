using System.Collections.Generic;

namespace SheepsheadApi.Models
{
	public class UpdateUserModel
	{
		public string Name { get; set; }
		public int RoleId { get; set; }
		public IEnumerable<string> Accounts { get; set; }
	}
}
