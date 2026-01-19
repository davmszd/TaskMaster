namespace TaskMaster.Api.Models;

public class Task
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "todo"; // "todo" | "in-progress" | "done"
    public string Priority { get; set; } = "medium"; // "low" | "medium" | "high"
    public string CreatedAt { get; set; } = string.Empty;
    public string? DueDate { get; set; }
}
