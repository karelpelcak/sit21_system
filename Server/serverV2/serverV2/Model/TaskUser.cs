using Microsoft.AspNetCore.Identity;

namespace serverV2.Model
{
    public class TaskUser
    {
        public int TaskUserId { get; set; }
        public Task task { get; set; }
        public UserManager<TaskUser> UserManager { get; set; }
    }
}
