using Microsoft.AspNetCore.Mvc;
using Task = TaskMaster.Api.Models.Task;

namespace TaskMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static readonly List<Task> Tasks =
    [
        new Task
        {
            Id = "1",
            Title = "Set up project structure",
            Description = "Create folders and configure TypeScript",
            Status = "done",
            Priority = "high",
            CreatedAt = new DateTime(2025, 12, 1).ToString("o")
        },

        new Task
        {
            Id = "2",
            Title = "Build task manager",
            Description = "Create CRUD operations for tasks",
            Status = "done",
            Priority = "high",
            CreatedAt = new DateTime(2025, 12, 5).ToString("o")
        },

        new Task
        {
            Id = "3",
            Title = "Add authentication",
            Description = "Implement user login and JWT token handling",
            Status = "in-progress",
            Priority = "high",
            CreatedAt = new DateTime(2026, 1, 2).ToString("o"),
            DueDate = new DateTime(2026, 1, 25).ToString("o")
        },

        new Task
        {
            Id = "4",
            Title = "Design database schema",
            Description = "Create Entity Framework models and migrations",
            Status = "in-progress",
            Priority = "high",
            CreatedAt = new DateTime(2026, 1, 3).ToString("o"),
            DueDate = new DateTime(2026, 1, 20).ToString("o")
        },

        new Task
        {
            Id = "5",
            Title = "Implement user profile page",
            Description = "Add page for users to view and edit their profile information",
            Status = "todo",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 5).ToString("o"),
            DueDate = new DateTime(2026, 1, 30).ToString("o")
        },

        new Task
        {
            Id = "6",
            Title = "Set up CI/CD pipeline",
            Description = "Configure GitHub Actions for automated testing and deployment",
            Status = "todo",
            Priority = "high",
            CreatedAt = new DateTime(2026, 1, 6).ToString("o")
        },

        new Task
        {
            Id = "7",
            Title = "Write unit tests for API",
            Description = "Achieve 80% code coverage for all API endpoints",
            Status = "todo",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 7).ToString("o"),
            DueDate = new DateTime(2026, 2, 1).ToString("o")
        },

        new Task
        {
            Id = "8",
            Title = "Add email notifications",
            Description = "Implement email service for task reminders and updates",
            Status = "todo",
            Priority = "low",
            CreatedAt = new DateTime(2026, 1, 8).ToString("o")
        },

        new Task
        {
            Id = "9",
            Title = "Create API documentation",
            Description = "Document all endpoints using Swagger/OpenAPI",
            Status = "in-progress",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 9).ToString("o"),
            DueDate = new DateTime(2026, 1, 22).ToString("o")
        },

        new Task
        {
            Id = "10",
            Title = "Implement search functionality",
            Description = "Add full-text search for tasks with filters",
            Status = "todo",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 10).ToString("o")
        },

        new Task
        {
            Id = "11",
            Title = "Add dark mode support",
            Description = "Implement theme switching between light and dark modes",
            Status = "done",
            Priority = "low",
            CreatedAt = new DateTime(2025, 12, 20).ToString("o")
        },

        new Task
        {
            Id = "12",
            Title = "Optimize database queries",
            Description = "Review and optimize slow queries, add proper indexes",
            Status = "todo",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 11).ToString("o")
        },

        new Task
        {
            Id = "13",
            Title = "Implement file upload feature",
            Description = "Allow users to attach files to tasks",
            Status = "todo",
            Priority = "low",
            CreatedAt = new DateTime(2026, 1, 12).ToString("o")
        },

        new Task
        {
            Id = "14",
            Title = "Add real-time notifications",
            Description = "Implement SignalR for live task updates",
            Status = "todo",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 13).ToString("o"),
            DueDate = new DateTime(2026, 2, 15).ToString("o")
        },

        new Task
        {
            Id = "15",
            Title = "Create mobile responsive design",
            Description = "Ensure all pages work well on mobile devices",
            Status = "in-progress",
            Priority = "high",
            CreatedAt = new DateTime(2026, 1, 14).ToString("o"),
            DueDate = new DateTime(2026, 1, 28).ToString("o")
        },

        new Task
        {
            Id = "16",
            Title = "Implement task categories",
            Description = "Add ability to categorize and tag tasks",
            Status = "todo",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 15).ToString("o")
        },

        new Task
        {
            Id = "17",
            Title = "Add data export feature",
            Description = "Allow users to export tasks to CSV/Excel",
            Status = "todo",
            Priority = "low",
            CreatedAt = new DateTime(2026, 1, 16).ToString("o")
        },

        new Task
        {
            Id = "18",
            Title = "Security audit",
            Description = "Conduct comprehensive security review and fix vulnerabilities",
            Status = "todo",
            Priority = "high",
            CreatedAt = new DateTime(2026, 1, 17).ToString("o"),
            DueDate = new DateTime(2026, 2, 5).ToString("o")
        },

        new Task
        {
            Id = "19",
            Title = "Performance testing",
            Description = "Load test the application and optimize bottlenecks",
            Status = "todo",
            Priority = "medium",
            CreatedAt = new DateTime(2026, 1, 17).ToString("o")
        },

        new Task
        {
            Id = "20",
            Title = "User onboarding tutorial",
            Description = "Create interactive tutorial for new users",
            Status = "todo",
            Priority = "low",
            CreatedAt = new DateTime(2026, 1, 17).ToString("o")
        }
    ];

    [HttpGet]
    public ActionResult<IEnumerable<Task>> GetTasks()
    {
        return Ok(Tasks);
    }

    [HttpGet("{id}")]
    public ActionResult<Task> GetTask(string id)
    {
        var task = Tasks.FirstOrDefault(t => t.Id == id);
        if (task is null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPost]
    public ActionResult<Task> CreateTask(Task task)
    {
        task.Id = Guid.NewGuid().ToString();
        task.CreatedAt = DateTime.UtcNow.ToString("o");
        Tasks.Add(task);
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public ActionResult<Task> UpdateTask(string id, Task updatedTask)
    {
        var task = Tasks.FirstOrDefault(t => t.Id == id);
        if (task is null)
        {
            return NotFound();
        }

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Status = updatedTask.Status;
        task.Priority = updatedTask.Priority;
        task.DueDate = updatedTask.DueDate;

        return Ok(task);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(string id)
    {
        var task = Tasks.FirstOrDefault(t => t.Id == id);
        if (task is null)
        {
            return NotFound();
        }

        Tasks.Remove(task);
        return NoContent();
    }
}
