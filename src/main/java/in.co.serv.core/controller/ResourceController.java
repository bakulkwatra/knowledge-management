package in.co.serv.core.controller;

import in.co.serv.core.dto.ResourceProcessLogDTO;
import in.co.serv.core.dto.SectionProcessLogDTO;
import in.co.serv.core.entity.*;
import in.co.serv.core.repository.ReResourcesRepo;
import in.co.serv.core.service.ResourceService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/km/{resource_type}")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @PostMapping("/{resource_id}/chapter/create")
    public ResponseEntity<ReChapters> createChapter(@PathVariable Long resource_id, @RequestBody ReChapters chapter) {
        ReChapters created = resourceService.createChapter(resource_id, chapter);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{resource_id}/chapters")
    public ResponseEntity<List<ReChapters>> getChaptersByResource(@PathVariable Long resource_id) {
        List<ReChapters> chapters = resourceService.getChaptersByResourceId(resource_id);
        return ResponseEntity.ok(chapters);
    }

    @GetMapping("/chapter/{chapter_id}")
    public ResponseEntity<ReChapters> getChapterById(@PathVariable Long chapter_id) {
        ReChapters chapter = resourceService.getChapterById(chapter_id);
        return ResponseEntity.ok(chapter);
    }

    @PutMapping("/chapter/{chapter_id}/update")
    public ResponseEntity<ReChapters> updateChapter(@PathVariable Long chapter_id, @RequestBody ReChapters chapter) {
        ReChapters updated = resourceService.updateChapter(chapter_id, chapter);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/chapter/{chapter_id}")
    public ResponseEntity<Void> deleteChapter(@PathVariable Long chapter_id) {
        resourceService.deleteChapter(chapter_id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/chapter/{chapter_id}/section/create")
    public ResponseEntity<ReSection> createSection(@PathVariable("chapter_id") Long chapterId,
                                                   @RequestBody ReSection section) {
        ReSection created = resourceService.createSection(chapterId, section);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/chapter/{chapter_id}/sections")
    public ResponseEntity<List<ReSection>> getSections(@PathVariable("chapter_id") Long chapterId) {
        List<ReSection> sections = resourceService.getSectionsByChapterId(chapterId);
        return ResponseEntity.ok(sections);
    }

    @GetMapping("/section/{section_id}")
    public ResponseEntity<ReSection> getSectionById(@PathVariable("section_id") Long sectionId) {
        ReSection section = resourceService.getSectionById(sectionId);
        return ResponseEntity.ok(section);
    }

    @PutMapping("/section/{section_id}/update")
    public ResponseEntity<ReSection> updateSection(@PathVariable("section_id") Long sectionId,
                                                   @RequestBody ReSection section) {
        ReSection updated = resourceService.updateSection(sectionId, section);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/section/{section_id}")
    public ResponseEntity<Void> deleteSection(@PathVariable("section_id") Long sectionId) {
        resourceService.deleteSection(sectionId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/section/{section_id}/file/upload")
    public ResponseEntity<String> uploadFile(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("section_id") Long sectionId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "description", required = false) String description
    ) {
        try {
            String result = resourceService.uploadFile(file, sectionId, resourceType, description);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/section/{section_id}/files")
    public ResponseEntity<List<ReSectionFiles>> getFilesBySection(
            @PathVariable("resource_type") String resourceType,  // even if unused, it must be captured
            @PathVariable("section_id") Long sectionId
    ) {
        List<ReSectionFiles> files = resourceService.getFilesBySection(sectionId);
        if (files.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(files);
    }

    @DeleteMapping("/file/{file_id}")
    public ResponseEntity<String> deleteFile(
            @PathVariable("resource_type") String resourceType, // included for route completeness
            @PathVariable("file_id") Long fileId
    ) {
        try {
            resourceService.deleteFileById(fileId);
            return ResponseEntity.ok("File deleted successfully.");
        } catch (FileNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete file: " + e.getMessage());
        }
    }

    @PostMapping("/{resource_id}/tags")
    public ResponseEntity<ReeResourcesTags> assignTagToResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestBody ReeResourcesTags reeResourcesTags
    ) {
        ReeResourcesTags saved = resourceService.assignTagToResource(resourceId, reeResourcesTags);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/admin/category-groups")
    public ResponseEntity<List<RmCategoryGroup>> getCategoryGroups(@PathVariable("resource_type") String resourceType) {
        List<RmCategoryGroup> groups = resourceService.getCategoryGroupsByResourceType(resourceType);
        return ResponseEntity.ok(groups);
    }

    @PostMapping("/admin/category-group")
    public ResponseEntity<RmCategoryGroup> createCategoryGroup(
            @PathVariable("resource_type") String resourceType,
            @RequestBody RmCategoryGroup categoryGroup) {

        categoryGroup.setResourceType(resourceType);
        return ResponseEntity.ok(resourceService.createCategoryGroup(categoryGroup));
    }

    @GetMapping("/admin/{category_group_id}/categories")
    public ResponseEntity<List<RmCategories>> getCategories(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("category_group_id") Long categoryGroupId) {
        return ResponseEntity.ok(resourceService.getCategoriesByGroupAndResource(resourceType, categoryGroupId));
    }
////////////by Bakul
    @GetMapping("/admin/categories")
    public ResponseEntity<List<RmCategories>> getCategoriesByGroupIds(
            @PathVariable("resource_type") String resourceType,
            @RequestParam("group_ids") List<Long> groupIds) {

        System.out.println("Received groupIds: " + groupIds);

        List<RmCategories> categories = resourceService.getCategoriesByMultipleGroups(resourceType, groupIds);
        return ResponseEntity.ok(categories);
    }
/////////////////////////////
    @PostMapping("/admin/{category_group_id}/category")
    public ResponseEntity<RmCategories> createCategory(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("category_group_id") Long categoryGroupId,
            @RequestBody RmCategories category) {
        return ResponseEntity.ok(resourceService.createCategory(resourceType, categoryGroupId, category));
    }

    @PutMapping("/admin/category/{id}")
    public ResponseEntity<RmCategories> updateCategory(
            @PathVariable Long id,
            @RequestBody RmCategories category) {
        return ResponseEntity.ok(resourceService.updateCategory(id, category));
    }




    //-----------------------------------------------------------------manpreet----------------------------------------------------------------------
    //-----------------------------------------------------------ReeBookmarksController--------------------------------------------------------------


    // Example userId for demonstration (replace with value from SecurityContext in real app)
    private static final Long CURRENT_USER_ID = 1L;
    @PostMapping("/{resource_id}/bookmark")
    public ResponseEntity<String> bookmarkResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {

        try {
            String message = resourceService.bookmarkResource(resourceType, resourceId, CURRENT_USER_ID);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An error occurred while bookmarking.");
        }
    }


    @DeleteMapping("/{resource_id}/bookmark")
    public ResponseEntity<String> deleteBookmark(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {

        try {
            String message = resourceService.deleteBookmark(resourceType, resourceId, CURRENT_USER_ID);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An error occurred while deleting bookmark.");
        }
    }

    //--------------------------------------------------------------ReeCommentsController-------------------------------------------------------------
    @PostMapping("/{resource_id}/comment")
    public ResponseEntity<ReeComments> addComment(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestBody ReeComments comment) {

        ReeComments saved = resourceService.addComment(resourceType, resourceId, comment);
        System.out.println(resourceType+" "+ resourceId+" "+ comment);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{resource_id}/comments")
    public ResponseEntity<List<ReeComments>> getComments(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {

        List<ReeComments> comments = resourceService.getComments(resourceType, resourceId);
        return ResponseEntity.ok(comments);
    }

    //--------------------------------------------------------------ReeResourceController----------------------------------------------------------------
    @PostMapping("/{resource_id}/like")
    public String likeResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestParam("userId") Long userId
    ) {
        resourceService.likeResource(resourceType, resourceId, userId);
        return "Resource liked successfully!";
    }


    @PostMapping("/{resource_id}/unlike")
    public void unlikeResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestParam Long userId) {
        resourceService.unlikeResource(resourceType, resourceId, userId);
    }

    //----------------------------------------------------------------ReePermissionController-----------------------------------------------------------
    @PostMapping("/permissions")
    public ResponseEntity<String> setPermission(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestBody ReePermission requestBody
    ) {
        try {
            String message = resourceService.setPermission(
                    resourceType,
                    resourceId,
                    CURRENT_USER_ID,
                    requestBody.getIsAllow(),
                    requestBody.getIsDeny()
            );
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An error occurred while setting permission.");
        }
    }

//    @Data
//    public static class PermissionRequest {
//        private String isAllow;
//        private String isDeny;
//    }


    @GetMapping("/{resource_id}/permissions")
    public ResponseEntity<?> getPermissions(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId
    ) {
        try {
            ReePermission permission = resourceService.getPermission(resourceType, resourceId, CURRENT_USER_ID);
            return ResponseEntity.ok(permission);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An error occurred while retrieving permissions.");
        }
    }

    //-----------------------------------------------------------------ReeRatings----------------------------------------------------------------------
    @PostMapping("/{resource_id}/rating")
    public ReeRatings submitRating(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestParam("userId") Long userId,
            @RequestParam("rating") Float rating) {

        return resourceService.submitRating(resourceType, resourceId, userId, rating);
    }

    @GetMapping("/{resource_id}/ratings")
    public ResponseEntity<List<ReeRatings>> getAllRatings(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {

        List<ReeRatings> ratings = resourceService.getAllRatings(resourceType, resourceId);
        return ResponseEntity.ok(ratings);
    }

    //----------------------------------------------------------------ReeViews-----------------------------------------------------------------------
    @PostMapping("/{resource_id}/view")
    public String recordView(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestParam("user_id") Long userId
    ) {
        resourceService.recordView(resourceType, resourceId, userId);
        return "View recorded successfully";
    }

    //----------------------------------------------------------RmtResourcesProcessController---------------------------------------------------------
    @PostMapping("/{resourceId}/process-log")
    public ResponseEntity<String> logResourceProcess(
            @PathVariable String resourceType,
            @PathVariable Long resourceId,
            @RequestBody ResourceProcessLogDTO dto
    ) {
        resourceService.logProcess(resourceType, resourceId, dto);
        return ResponseEntity.ok("Process log saved successfully.");
    }

    @GetMapping("/{resource_id}/process-log")
    public List<RmtResourcesProcess> getProcessLogs(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId
    ) {
        return resourceService.getProcessLogs(resourceType, resourceId);
    }

    //---------------------------------------------------RmtSectionProcessController--------------------------------------------------------------
    @PostMapping("/section/{section_id}/process-log")
    public ResponseEntity<String> logSectionProcess(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("section_id") Long sectionId,
            @RequestBody SectionProcessLogDTO dto
    ) {
        resourceService.logSectionProcess(resourceType, sectionId, dto);
        return ResponseEntity.ok("Section process log created successfully.");
    }

    @GetMapping("/section/{sectionId}/process-log")
    public ResponseEntity<List<RmtSectionProcess>> getSectionProcessLogs(
            @PathVariable String resourceType,
            @PathVariable Long sectionId) {

        List<RmtSectionProcess> logs = resourceService.getSectionProcessLogs(sectionId);
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(logs);
    }

    //----------------------------------------------------------ZzAuditLogsController-------------------------------------------------------------

    @GetMapping("/audit/{year}/resource/{resource_id}")
    public ResponseEntity<List<ZzAuditLogs>> getAuditLogsByResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("year") int year,
            @PathVariable("resource_id") Long resourceId) {

        List<ZzAuditLogs> logs = resourceService.getAuditLogsByResource(resourceType, year, resourceId);
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/audit/{year}/user/{user_id}")
    public ResponseEntity<List<ZzAuditLogs>> getAuditLogsByUser(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("year") int year,
            @PathVariable("user_id") Long userId) {

        List<ZzAuditLogs> logs = resourceService.getAuditLogsByUser(resourceType, year, userId);
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/audit/export/{resourceId}")
    public void exportAuditLogs(
            @PathVariable String resourceType,
            @PathVariable Long resourceId,
            HttpServletResponse response) throws IOException {
        resourceService.exportAuditLogsToPdf(resourceType, resourceId, response);
    }

    @GetMapping("/{resourceId}/export/html")
    public void exportAuditLogsToHtml(
            @PathVariable String resourceType,
            @PathVariable Long resourceId,
            HttpServletResponse response) throws IOException {
        resourceService.exportAuditLogsToHtml(resourceType, resourceId, response);
    }

    ////////////Amulya///////////

//    @Autowired
//    private ResourceService resourceService;

    @Autowired
    private ReResourcesRepo reResourcesRepo;


    @PostMapping("/create")
    public ResponseEntity<ReResources> createResource(
            @PathVariable("resource_type") String resourceType,
            @RequestBody ReResources resource) {
        try {
            ReResources createdResource = resourceService.createResource(resource, resourceType);
            return ResponseEntity.ok(createdResource);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{resource_id}/update")
    public ResponseEntity<ReResources> updateResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestBody ReResources dto) {
        ReResources updated = resourceService.updateResource(dto, resourceType, resourceId);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{resource_id}")
    public ResponseEntity<ReResources> getResourceByIdAndType(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {
        ReResources resource = resourceService.getResourceByIdAndType(resourceType, resourceId);
        return ResponseEntity.ok(resource);
    }

    @DeleteMapping("/{resource_id}")
    public ResponseEntity<String> deleteResource(
            @PathVariable("resource_type") String resourceType,  // currently unused
            @PathVariable("resource_id") Long resourceId) {
        resourceService.deleteResource(resourceId);
        return ResponseEntity.ok("Resource with ID " + resourceId + " deleted successfully.");
    }

    @GetMapping("/list")
    public ResponseEntity<List<ReResources>> getResourceListByType(
            @PathVariable("resource_type") String resourceType) {
        List<ReResources> resources = resourceService.getResourcesByType(resourceType);
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/search")
    public List<ReResources> searchResources(
            @PathVariable("resource_type") String resourceType,
            @RequestParam(required = false) String tag, // Future use
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String version) {
        return resourceService.searchResources(resourceType, status, version, categoryId);
    }

    @PostMapping("/{resource_id}/clone")
    public ResponseEntity<ReResources> cloneResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId
    ) {
        ReResources cloned = resourceService.cloneResource(resourceType, resourceId);
        return ResponseEntity.ok(cloned);
    }

    @GetMapping("/{resource_id}/versions")
    public ResponseEntity<List<ReResources>> getAllVersions(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {
        List<ReResources> versions = resourceService.getAllVersions(resourceType, resourceId);
        return ResponseEntity.ok(versions);
    }

    @GetMapping("/{resource_id}/latest")
    public ResponseEntity<ReResources> getLatestVersion(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {
        ReResources latest = resourceService.getLatestVersion(resourceType, resourceId);
        if (latest != null) {
            return ResponseEntity.ok(latest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{resource_id}/status")
    public ResponseEntity<ReResources> updateStatus(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestParam("status") String status) {
        ReResources updated = resourceService.updateResourceStatus(resourceType, resourceId, status);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{resource_id}/process-status")
    public ResponseEntity<ReResources> updateProcessStatus(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestParam("process_status") String processStatus) {
        ReResources updated = resourceService.updateResourceProcessStatus(resourceType, resourceId, processStatus);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<RmCategories>> getCategories(@PathVariable("resource_type") String resourceType) {
        List<RmCategories> categories = resourceService.getCategoriesByResourceType(resourceType);
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/{resource_id}/categories")
    public ResponseEntity<String> assignCategory(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId,
            @RequestBody ReResourceCategory reResourceCategory) {
        resourceService.assignCategory(resourceId, reResourceCategory);
        return ResponseEntity.ok("Category assigned successfully");
    }


    @GetMapping("/{resource_id}/categories")
    public ResponseEntity<List<ReResourceCategory>> getCategoriesByResourceId(
            @PathVariable("resource_id") Long resourceId) {
        List<ReResourceCategory> categories = resourceService.getCategoriesByResourceId(resourceId);
        return ResponseEntity.ok(categories);
    }


    @GetMapping("/admin/tags")
    public ResponseEntity<List<RmTags>> getTagsByResourceType(
            @PathVariable("resource_type") String resourceType) {
        List<RmTags> tags = resourceService.getTagsByResourceType(resourceType);
        return ResponseEntity.ok(tags);
    }


    @PostMapping("/admin/tag")
    public ResponseEntity<String> createTag(
            @PathVariable("resource_type") String resourceType,
            @RequestBody RmTags tag) {
        tag.setResourceType(resourceType);
        resourceService.createTag(tag);
        return ResponseEntity.ok("Tag created successfully");
    }

    @PutMapping("/admin/tag/{id}")
    public ResponseEntity<String> updateTag(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("id") Long tagId,
            @RequestBody RmTags tagDetails) {
        resourceService.updateTag(tagId, resourceType, tagDetails);
        return ResponseEntity.ok("Tag updated successfully");
    }

    @GetMapping("/{resource_id}/tags")
    public ResponseEntity<List<ReeResourcesTags>> getTagsForResource(
            @PathVariable("resource_type") String resourceType,
            @PathVariable("resource_id") Long resourceId) {
        List<ReeResourcesTags> tags = resourceService.getTagsForResource(resourceId);
        return ResponseEntity.ok(tags);
    }

}
