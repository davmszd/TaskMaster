namespace TaskMaster.Api.Models;

public class Task
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public string CreatedAt { get; set; } = string.Empty;
    public string? DueDate { get; set; }
}
