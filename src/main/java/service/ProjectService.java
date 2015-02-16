package service;

import domain.Project;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by Taipan on 15.02.2015.
 */
@Path("/hello")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectService {
    @GET
    @Path("/get")
    @Produces("text/plain")
    public Response getMsg(@QueryParam("id") String msg) {

        String output = "Jersey say : " + msg;

        return Response.status(200).entity(output).build();
    }
    @POST
    @Path("/post")
    @Produces("text/plain")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doPost(String text) {

        String output = "Jersey say : " + text;

        return Response.status(200).entity(output).build();
    }

    @GET
    @Path("/project")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectById(@QueryParam("projectId") String projectId) {
        Project project = new Project();
        project.setProjectId(Long.parseLong(projectId));
        project.setProjectName("Test name");
        return Response.status(200).entity(project).build();
    }

    @POST
    @Path("/project/{projectId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveProject(@PathParam("projectId") String projectId, Project project) {
        project.setProjectName("Test name 3");
        return Response.status(200).entity(project).build();
    }

    @PUT
    @Path("/project/{projectId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateProject(@PathParam("projectId") String projectId, Project project) {
        project.setProjectDescription("Updated Description");
        return Response.status(200).entity(project).build();
    }

    @DELETE
    @Path("/project/{projectId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteProject(@PathParam("projectId") String projectId) {
        return Response.status(200).entity(projectId).build();
    }
}