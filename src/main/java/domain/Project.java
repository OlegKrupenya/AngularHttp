package domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 * Created by Taipan on 15.02.2015.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Project {
    private Long projectId;
    private String projectName;
    private String projectBudget;
    private String projectDescription;

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectBudget() {
        return projectBudget;
    }

    public void setProjectBudget(String projectBudget) {
        this.projectBudget = projectBudget;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }
}
