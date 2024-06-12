using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace serverV2.Model
{
    public enum TaskStates
    {
        Set,
        Process,
        Finished,
        BossChecked
    }

    public class Task
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        [StringLength(100)]
        public string TaskName { get; set; }

        [StringLength(500)]
        public string TaskDescription { get; set; }

        [AllowNull]
        [StringLength(50)]
        public string TaskNumber { get; set; }

        [Required]
        public TaskStates TaskState { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime TaskStart { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime TaskEnd { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime TaskCreatedAt { get; set; }

        [Required]
        public string TaskCreatedBy { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime TaskUpdatedAt { get; set; }

        [Required]
        public string TaskUpdatedBy { get; set; }

        public Boolean TaskIsDeleted { get; set; } = false;

        public Task() { }

        public Task(TaskCreateModel taskCreateModel)
        {
            TaskName = taskCreateModel.TaskName;
            TaskDescription = taskCreateModel.TaskDescription;
            TaskNumber = taskCreateModel.TaskNumber;
            TaskState = TaskStates.Set;
            TaskStart = taskCreateModel.TaskStart;
            TaskEnd = taskCreateModel.TaskEnd;
            TaskCreatedAt = DateTime.Now;
            TaskUpdatedAt = DateTime.Now;
        }

    }
    public class TaskCreateModel()
    {
        [Required]
        [StringLength(100)]
        public string TaskName { get; set; }

        [StringLength(500)]
        public string TaskDescription { get; set; }

        [AllowNull]
        [StringLength(50)]
        public string TaskNumber { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime TaskStart { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime TaskEnd { get; set; }
    }

}
