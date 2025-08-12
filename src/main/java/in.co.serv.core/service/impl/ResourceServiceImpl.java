package in.co.serv.core.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import in.co.serv.core.dto.ResourceProcessLogDTO;
import in.co.serv.core.dto.SectionProcessLogDTO;
import in.co.serv.core.entity.*;
import in.co.serv.core.repository.*;
import in.co.serv.core.service.ResourceService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;
import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {

    @Autowired
    private ReChaptersRepo reChaptersRepo;

    @Autowired
    private ReSectionRepo sectionRepo;

    @Autowired
    private ReSectionFilesRepo sectionFilesRepo;

    @Autowired
    private ReeResourcesTagsRepo reeResourcesTagsRepo;

    @Autowired
    private RmCategoryGroupRepo rmCategoryGroupRepo;

    @Autowired
    private RmCategoriesRepo rmCategoriesRepo;

    @Autowired
    private ReResourcesRepo reResourcesRepository;

    @Autowired
    private ReeBookmarksRepo reeBookmarksRepository;

    @Autowired
    private ReeCommentsRepo commentsRepo;

    @Autowired
    private ReResourcesRepo resourcesRepo;

    @Autowired
    private ReeLikesRepo likesRepo;

    @Autowired
    private ReePermissionRepo permissionRepository;

    @Autowired
    private ReeRatingsRepo ratingsRepo;

    @Autowired
    private ReeViewsRepo reeViewsRepo;

    @Autowired
    private RmtResourcesProcessRepo processRepo;

    @Autowired
    private RmtSectionProcessRepo processLogRepository;

    @Autowired
    private ZzAuditLogsRepo auditLogsRepo;


    //-------------------------Chapters
    @Override
    public ReChapters createChapter(Long resourceId, ReChapters chapter) {
        chapter.setResourceId(resourceId);
        chapter.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        chapter.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        chapter.setCreatedBy(1L);
        chapter.setUpdatedBy(1L);
        chapter.setProcessStatus("DRAFT");
        chapter.setStatus("ACTIVE");
        return reChaptersRepo.save(chapter);
    }

    @Override
    public List<ReChapters> getChaptersByResourceId(Long resourceId) {
        return reChaptersRepo.findByResourceId(resourceId);
    }

    @Override
    public ReChapters getChapterById(Long chapterId) {
        return reChaptersRepo.findById(chapterId).orElseThrow(() -> new NoSuchElementException("Chapter not found"));
    }

    @Override
    public ReChapters updateChapter(Long chapterId, ReChapters updated) {
        ReChapters existing = getChapterById(chapterId);
        existing.setChapterTitle(updated.getChapterTitle());
        existing.setIsContent(updated.getIsContent());
        existing.setSort(updated.getSort());
        existing.setProcessStatus(updated.getProcessStatus());
        existing.setStatus(updated.getStatus());
        existing.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        existing.setUpdatedBy(1L);
        return reChaptersRepo.save(existing);
    }

    @Override
    public void deleteChapter(Long chapterId) {
        reChaptersRepo.deleteById(chapterId);
    }

    //-----------------------Section

    @Override
    public ReSection createSection(Long chapterId, ReSection section) {
        section.setChapterId(chapterId);
        section.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        section.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        section.setCreatedBy(1L); // Replace with logged-in user ID
        section.setUpdatedBy(1L);
        section.setProcessStatus("DRAFT");
        section.setStatus("ACTIVE");
        if (section.getIsVersion() == null) section.setIsVersion(false);
        if (section.getIsLatest() == null) section.setIsLatest(false);
        return sectionRepo.save(section);
    }

    @Override
    public List<ReSection> getSectionsByChapterId(Long chapterId) {
        return sectionRepo.findByChapterId(chapterId);
    }

    @Override
    public ReSection getSectionById(Long sectionId) {
        return sectionRepo.findById(sectionId).orElseThrow(() -> new NoSuchElementException("Section is not found"));
    }

    @Override
    public ReSection updateSection(Long sectionId, ReSection section) {
        ReSection existing = getSectionById(sectionId);

        existing.setSectionType(section.getSectionType());
        existing.setSectionTitle(section.getSectionTitle());
        existing.setSectionContent(section.getSectionContent());
        existing.setIsVersion(section.getIsVersion());
        existing.setVersionId(section.getVersionId());
        existing.setVersionName(section.getVersionName());
        existing.setVersionNo(section.getVersionNo());
        existing.setVersionSummary(section.getVersionSummary());
        existing.setIsLatest(section.getIsLatest());
        existing.setProcessStatus(section.getProcessStatus());
        existing.setStatus(section.getStatus());
        existing.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        existing.setUpdatedBy(1L);
        return sectionRepo.save(existing);
    }

    @Override
    public void deleteSection(Long sectionId) {
        sectionRepo.deleteById(sectionId);
    }

    //---------------Section Files
    @Value("${file.upload-dir}")
    private String uploadDir;


    public String uploadFile(MultipartFile file, Long sectionId, String resourceType, String description) throws Exception {
        // Save file to local path
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, resourceType, fileName);
        Files.createDirectories(filePath.getParent()); // Ensure folder exists
        Files.copy(file.getInputStream(), filePath);

        // Create entity
        ReSectionFiles sectionFile = new ReSectionFiles();
        sectionFile.setId(1L); // Replace with actual ID generation logic
        sectionFile.setSectionId(sectionId);
        sectionFile.setSort(1L); // Or fetch max(sort)+1 for this section if needed

        sectionFile.setFileName(fileName);
        sectionFile.setFileDescription(description);
        sectionFile.setFileSize(file.getSize());
        sectionFile.setFileType(getFileExtension(fileName));
        sectionFile.setMimeType(file.getContentType());
        sectionFile.setBaseUrl(uploadDir);
        sectionFile.setPathUrl(filePath.toString());

        // Set audit fields (mock userId as 1L for now)
        Timestamp now = new Timestamp(System.currentTimeMillis());
        sectionFile.setCreatedAt(now);
        sectionFile.setCreatedBy(1L);
        sectionFile.setUpdatedAt(now);
        sectionFile.setUpdatedBy(1L);

        sectionFilesRepo.save(sectionFile);

        return "File uploaded successfully!";
    }

    private String getFileExtension(String fileName) {
        return fileName != null && fileName.contains(".")
                ? fileName.substring(fileName.lastIndexOf(".") + 1)
                : "unknown";
    }

    public List<ReSectionFiles> getFilesBySection(Long sectionId) {
        return sectionFilesRepo.findBySectionId(sectionId);
    }

    public void deleteFileById(Long fileId) throws Exception {
        ReSectionFiles file = sectionFilesRepo.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File with ID " + fileId + " not found"));

        // Delete from filesystem
        Path path = Paths.get(file.getPathUrl());
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new IOException("Failed to delete file from filesystem: " + e.getMessage());
        }

        // Delete from DB
        sectionFilesRepo.deleteById(fileId);
    }

    //ReResourceTags
    @Override
    public ReeResourcesTags assignTagToResource(Long resourceId, ReeResourcesTags reeResourcesTags) {
        ReeResourcesTags.ResourceTagId id = new ReeResourcesTags.ResourceTagId();
        id.setResourceId(resourceId);
        id.setTagId(reeResourcesTags.getId().getTagId());
        reeResourcesTags.setId(id);
        ReResources resource = new ReResources();
        resource.setId(resourceId);
        reeResourcesTags.setResource(resource);
        RmTags tag = new RmTags();
        tag.setId(reeResourcesTags.getId().getTagId());
        reeResourcesTags.setTag(tag);

        reeResourcesTags.setCreatedAt(Timestamp.from(Instant.now()));
        reeResourcesTags.setUpdatedAt(Timestamp.from(Instant.now()));
        return reeResourcesTagsRepo.save(reeResourcesTags);
    }

    //RmCategoryGroup

    @Override
    public List<RmCategoryGroup> getCategoryGroupsByResourceType(String resourceType) {
        return rmCategoryGroupRepo.findByResourceType(resourceType);
    }

    @Override
    public RmCategoryGroup createCategoryGroup(RmCategoryGroup categoryGroup) {
        categoryGroup.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        categoryGroup.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return rmCategoryGroupRepo.save(categoryGroup);
    }

    //RmCategories
    @Override
    public List<RmCategories> getCategoriesByGroupAndResource(String resourceType, Long categoryGroupId) {
        return rmCategoriesRepo.findByResourceTypeAndCategoryGroupId(resourceType, categoryGroupId);
    }

    //by bakul
    @Override
    public List<RmCategories> getCategoriesByMultipleGroups(String resourceType, List<Long> categoryGroupIds) {
        if (categoryGroupIds == null || categoryGroupIds.isEmpty()) {
            return Collections.emptyList();
        }
        return rmCategoriesRepo.findByResourceTypeAndGroupIds(resourceType, categoryGroupIds);
    }
    //

    @Override
    public RmCategories createCategory(String resourceType, Long categoryGroupId, RmCategories category) {
        category.setResourceType(resourceType);
        category.setCategoryGroupId(categoryGroupId);
        category.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        category.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return rmCategoriesRepo.save(category);
    }

    @Override
    public RmCategories updateCategory(Long id, RmCategories category) {
        RmCategories existing = rmCategoriesRepo.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        existing.setCategory(category.getCategory());
        existing.setDescription(category.getDescription());
        existing.setUpdatedBy(category.getUpdatedBy());
        existing.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return rmCategoriesRepo.save(existing);
    }


    //ReeBookmarkServiceImpl
    @Override
    public String bookmarkResource(String resourceType, Long resourceId, Long userId) {
        Optional<ReResources> resourceOpt = reResourcesRepository.findByIdAndResourceType(resourceId, resourceType);

        if (resourceOpt.isEmpty()) {
            throw new IllegalArgumentException("Resource not found with ID: " + resourceId + " and type: " + resourceType);
        }

        ReeBookmarks.BookmarkId bookmarkId = new ReeBookmarks.BookmarkId(resourceId, userId);

        if (reeBookmarksRepository.existsById(bookmarkId)) {
            return "Resource already bookmarked.";
        }

        ReeBookmarks bookmark = new ReeBookmarks();
        bookmark.setId(bookmarkId);
        bookmark.setResource(resourceOpt.get());
        Timestamp now = Timestamp.from(Instant.now());
        bookmark.setCreatedAt(now);
        bookmark.setUpdatedAt(now);
        bookmark.setCreatedBy(userId);
        bookmark.setUpdatedBy(userId);

        reeBookmarksRepository.save(bookmark);

        return "Bookmark added successfully.";
    }

    @Override
    public String deleteBookmark(String resourceType, Long resourceId, Long userId) {
        // Optional: check if resource exists with given type (not strictly necessary if id is known valid)
        Optional<ReResources> resourceOpt = reResourcesRepository.findByIdAndResourceType(resourceId, resourceType);
        if (resourceOpt.isEmpty()) {
            throw new IllegalArgumentException("Resource not found with ID: " + resourceId + " and type: " + resourceType);
        }

        ReeBookmarks.BookmarkId bookmarkId = new ReeBookmarks.BookmarkId(resourceId, userId);

        if (!reeBookmarksRepository.existsById(bookmarkId)) {
            return "No bookmark found to delete.";
        }

        reeBookmarksRepository.deleteById(bookmarkId);
        return "Bookmark deleted successfully.";
    }





    //-------------------------------------------------------------------manpreet-------------------------------------------------------------------
    //-------------------------------------------------------------ReeCommentsServiceImpl-----------------------------------------------------------
    @Override
    public ReeComments addComment(String resourceType, Long resourceId, ReeComments comment) {
        ReResources resource = resourcesRepo.findById(resourceId)
                .orElseThrow(() -> new IllegalArgumentException("Resource not found with id: " + resourceId));

        // Optional: Validate resourceType matches
        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch");
        }

        // Set required fields
        comment.setResourceId(resourceId);
        comment.setResource(resource);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        comment.setCreatedAt(now);
        comment.setUpdatedAt(now);

        return commentsRepo.save(comment);
    }

    @Override
    public List<ReeComments> getComments(String resourceType, Long resourceId) {
        ReResources resource = resourcesRepo.findById(resourceId)
                .orElseThrow(() -> new IllegalArgumentException("Resource not found with id: " + resourceId));

        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch");
        }

        return commentsRepo.findByResourceId(resourceId);
    }

    //--------------------------------------------------------------ReeLikesServiceImpl----------------------------------------------------------------
    @Override
    public void likeResource(String resourceType, Long resourceId, Long userId) {
        ReResources resource = resourcesRepo.findById(resourceId)
                .orElseThrow(() -> new IllegalArgumentException("Resource not found with ID: " + resourceId));

        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch");
        }

        ReeLikes.LikeId likeId = new ReeLikes.LikeId();
        likeId.setResourceId(resourceId);
        likeId.setUserId(userId);

        boolean alreadyLiked = likesRepo.existsById(likeId);
        if (alreadyLiked) {
            throw new IllegalArgumentException("User has already liked this resource");
        }

        ReeLikes like = new ReeLikes();
        like.setId(likeId);
        like.setResource(resource);
        like.setCreatedAt(Timestamp.from(Instant.now()));
        like.setUpdatedAt(Timestamp.from(Instant.now()));
        like.setCreatedBy(userId);
        like.setUpdatedBy(userId);

        likesRepo.save(like);
    }

    @Override
    public void unlikeResource(String resourceType, Long resourceId, Long userId) {
        ReResources resource = resourcesRepo.findById(resourceId)
                .orElseThrow(() -> new IllegalArgumentException("Resource not found"));

        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch");
        }

        ReeLikes.LikeId likeId = new ReeLikes.LikeId();
        likeId.setResourceId(resourceId);
        likeId.setUserId(userId);

        Optional<ReeLikes> existingLike = likesRepo.findById(likeId);

        existingLike.ifPresent(likesRepo::delete);
    }

    //-------------------------------------------------------------------ReePermission-------------------------------------------------------------------
    @Override
    public String setPermission(String resourceType, Long resourceId, Long userId, String isAllow, String isDeny) {
        Optional<ReResources> resourceOpt = reResourcesRepository.findByIdAndResourceType(resourceId, resourceType);

        if (resourceOpt.isEmpty()) {
            throw new IllegalArgumentException("Resource not found with ID: " + resourceId + " and type: " + resourceType);
        }

        ReePermission.PermissionId permissionId = new ReePermission.PermissionId();
        permissionId.setResourceId(resourceId);
        permissionId.setUserId(userId);

        ReePermission permission = new ReePermission();
        permission.setId(permissionId);
        permission.setIsAllow(isAllow);
        permission.setIsDeny(isDeny);
        permission.setResource(resourceOpt.get());

        Timestamp now = Timestamp.from(Instant.now());
        permission.setCreatedAt(now);
        permission.setUpdatedAt(now);
        permission.setCreatedBy(userId);
        permission.setUpdatedBy(userId);

        permissionRepository.save(permission);

        return "Permission set successfully.";
    }


    @Override
    public ReePermission getPermission(String resourceType, Long resourceId, Long userId) {
        Optional<ReResources> resourceOpt = reResourcesRepository.findByIdAndResourceType(resourceId, resourceType);
        if (resourceOpt.isEmpty()) {
            throw new IllegalArgumentException("Resource not found with ID: " + resourceId + " and type: " + resourceType);
        }

        ReePermission.PermissionId permissionId = new ReePermission.PermissionId();
        permissionId.setResourceId(resourceId);
        permissionId.setUserId(userId);

        return permissionRepository.findById(permissionId)
                .orElseThrow(() -> new IllegalArgumentException("Permission not found for this resource and user."));
    }

    //------------------------------------------------------------ReeRatingsServiceImpl-------------------------------------------------------------
    @Override
    public ReeRatings submitRating(String resourceType, Long resourceId, Long userId, Float rating) {
        ReResources resource = resourcesRepo.findById(resourceId)
                .orElseThrow(() -> new IllegalArgumentException("Resource not found"));

        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch");
        }

        ReeRatings.RatingId ratingId = new ReeRatings.RatingId();
        ratingId.setResourceId(resourceId);
        ratingId.setUserId(userId);

        ReeRatings reeRating = new ReeRatings();
        reeRating.setId(ratingId);
        reeRating.setResource(resource);
        reeRating.setRating(rating);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        reeRating.setCreatedAt(now);
        reeRating.setUpdatedAt(now);
        reeRating.setCreatedBy(userId);
        reeRating.setUpdatedBy(userId);

        return ratingsRepo.save(reeRating);
    }

    @Override
    public List<ReeRatings> getAllRatings(String resourceType, Long resourceId) {
        ReResources resource = resourcesRepo.findById(resourceId)
                .orElseThrow(() -> new IllegalArgumentException("Resource not found"));

        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch");
        }

        return ratingsRepo.findByIdResourceId(resourceId);
    }

    //---------------------------------------------------------------------ReeViews------------------------------------------------------------------
    @Override
    public void recordView(String resourceType, Long resourceId, Long userId) {
        ReeViews.ViewId viewId = new ReeViews.ViewId();
        viewId.setResourceId(resourceId);
        viewId.setUserId(userId);

        Optional<ReeViews> existingViewOpt = reeViewsRepo.findById(viewId);
        Timestamp now = Timestamp.from(Instant.now());

        if (existingViewOpt.isPresent()) {
            // Update existing view count
            ReeViews existingView = existingViewOpt.get();
            existingView.setViewCount(existingView.getViewCount() + 1);
            existingView.setUpdatedAt(now);
            existingView.setUpdatedBy(userId);
            reeViewsRepo.save(existingView);
        } else {
            // Create new view entry
            ReResources resource = reResourcesRepository.findById(resourceId)
                    .orElseThrow(() -> new RuntimeException("Resource not found"));

            ReeViews newView = new ReeViews();
            newView.setId(viewId);
            newView.setResource(resource);
            newView.setViewCount(1L);
            newView.setCreatedAt(now);
            newView.setCreatedBy(userId);
            newView.setUpdatedAt(now);
            newView.setUpdatedBy(userId);

            reeViewsRepo.save(newView);
        }
    }

    //----------------------------------------------------------RmtResourcesProcessServiceImpl-----------------------------------------------------------------
    @Override
    public void logProcess(String resourceType, Long resourceId, ResourceProcessLogDTO dto) {
        Optional<ReResources> optionalResource = reResourcesRepository.findById(resourceId);

        if (optionalResource.isEmpty()) {
            throw new IllegalArgumentException("Resource not found with ID: " + resourceId);
        }

        ReResources resource = optionalResource.get();

        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch. Expected: "
                    + resource.getResourceType() + ", Provided: " + resourceType);
        }

        RmtResourcesProcess processLog = new RmtResourcesProcess();
        processLog.setId(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE); // Safe long-based UUID
        processLog.setResource(resource);
        processLog.setProcessStatusFrom(dto.getProcessStatusFrom());
        processLog.setProcessStatusTo(dto.getProcessStatusTo());
        processLog.setComments(dto.getComments());
        processLog.setReviewBy(dto.getReviewBy());

        Timestamp now = Timestamp.from(Instant.now());
        processLog.setCreatedAt(now);
        processLog.setUpdatedAt(now);
        processLog.setCreatedBy(dto.getCreatedBy());
        processLog.setUpdatedBy(dto.getUpdatedBy());

        processRepo.save(processLog);
    }

    @Override
    public List<RmtResourcesProcess> getProcessLogs(String resourceType, Long resourceId) {
        Optional<ReResources> optionalResource = reResourcesRepository.findById(resourceId);

        if (optionalResource.isEmpty()) {
            throw new IllegalArgumentException("Resource not found with ID: " + resourceId);
        }

        ReResources resource = optionalResource.get();
        if (!resource.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Resource type mismatch.");
        }

        return processRepo.findByResourceIdOrderByCreatedAtDesc(resourceId);
    }

    //------------------------------------------------------------RmtSectionProcessServiceImpl------------------------------------------------------------

    @Override
    @Transactional
    public void logSectionProcess(String resourceType, Long sectionId, SectionProcessLogDTO dto) {
        if (!"article".equalsIgnoreCase(resourceType)) {
            throw new IllegalArgumentException("Unsupported resource type: " + resourceType);
        }

        RmtSectionProcess processLog = new RmtSectionProcess();

        processLog.setId(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE); // Random unique ID
        processLog.setSectionId(sectionId);
        processLog.setProcessStatusFrom(dto.getProcessStatusFrom());
        processLog.setProcessStatusTo(dto.getProcessStatusTo());
        processLog.setReviewBy(dto.getReviewBy());
        processLog.setComments(dto.getComments());
        processLog.setCreatedBy(dto.getCreatedBy());
        processLog.setUpdatedBy(dto.getUpdatedBy());

        Timestamp now = Timestamp.from(Instant.now());
        processLog.setCreatedAt(now);
        processLog.setUpdatedAt(now);

        processLogRepository.save(processLog);
    }

    @Override
    public List<RmtSectionProcess> getSectionProcessLogs(Long sectionId) {
        return processLogRepository.findBySectionId(sectionId);
    }

    @Override
    public List<ZzAuditLogs> getAuditLogsByResource(String resourceType, int year, Long resourceId) {
        // Define start and end of year
        LocalDateTime startDate = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0);
        LocalDateTime endDate = startDate.plusYears(1).minusSeconds(1);

        Timestamp start = Timestamp.valueOf(startDate);
        Timestamp end = Timestamp.valueOf(endDate);

        return auditLogsRepo.findByResource_ResourceTypeAndResource_IdAndCreatedAtBetween(
                resourceType, resourceId, start, end);
    }

    @Override
    public List<ZzAuditLogs> getAuditLogsByUser(String resourceType, int year, Long userId) {
        return auditLogsRepo.findByResourceTypeAndUserIdAndYear(resourceType, userId, year);
    }

    @Override
    public void exportAuditLogsToPdf(String resourceType, Long resourceId, HttpServletResponse response) throws IOException {
        List<ZzAuditLogs> logs = auditLogsRepo.findByResource_ResourceTypeAndResource_IdAndCreatedAtBetween(
                resourceType,
                resourceId,
                Timestamp.valueOf("2000-01-01 00:00:00"),
                new Timestamp(System.currentTimeMillis())
        );

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=audit_logs_" + resourceId + ".pdf");

        try {
            Document document = new Document();
            PdfWriter.getInstance(document, response.getOutputStream());

            document.open();
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLACK);
            Paragraph title = new Paragraph("Audit Logs for Resource: " + resourceId, titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);

            // Header Row
            table.addCell("ID");
            table.addCell("Action");
            table.addCell("Method");
            table.addCell("Created At");
            table.addCell("Status");

            for (ZzAuditLogs log : logs) {
                table.addCell(String.valueOf(log.getId()));
                table.addCell(log.getAction() != null ? log.getAction() : "-");
                table.addCell(log.getMethod() != null ? log.getMethod() : "-");
                table.addCell(log.getCreatedAt().toString());
                table.addCell(log.getActionStatus() != null ? log.getActionStatus() : "-");
            }

            document.add(table);
            document.close();
        } catch (DocumentException e) {
            throw new IOException("Error while generating PDF", e);
        }
    }

    @Override
    public void exportAuditLogsToHtml(String resourceType, Long resourceId, HttpServletResponse response) throws IOException {
        List<ZzAuditLogs> logs = auditLogsRepo.findByResource_ResourceTypeAndResource_IdAndCreatedAtBetween(
                resourceType,
                resourceId,
                Timestamp.valueOf("2000-01-01 00:00:00"),
                new Timestamp(System.currentTimeMillis())
        );

        response.setContentType("text/html");
        response.setHeader("Content-Disposition", "attachment; filename=audit_logs_" + resourceId + ".html");

        PrintWriter writer = response.getWriter();
        writer.println("<html><head><title>Audit Logs</title></head><body>");
        writer.println("<h2>Audit Logs for Resource: " + resourceId + "</h2>");
        writer.println("<table border='1' cellpadding='5' cellspacing='0'>");
        writer.println("<tr><th>ID</th><th>Action</th><th>Method</th><th>Created At</th><th>Status</th></tr>");

        for (ZzAuditLogs log : logs) {
            writer.println("<tr>");
            writer.println("<td>" + log.getId() + "</td>");
            writer.println("<td>" + (log.getAction() != null ? log.getAction() : "-") + "</td>");
            writer.println("<td>" + (log.getMethod() != null ? log.getMethod() : "-") + "</td>");
            writer.println("<td>" + log.getCreatedAt() + "</td>");
            writer.println("<td>" + (log.getActionStatus() != null ? log.getActionStatus() : "-") + "</td>");
            writer.println("</tr>");
        }

        writer.println("</table></body></html>");
        writer.flush();
    }

    //////////////////////////amulya//////////////////////////////

    @Autowired
    private ReResourcesRepo reResourcesRepo;

//    @Autowired
//    private RmCategoriesRepo rmCategoriesRepo;

    @Autowired
    private ReResourceCategoryRepo reResourceCategoryRepo;
    @Autowired
    private RmTagsRepo rmTagsRepo;

//    @Autowired
//    private ReeResourcesTagsRepo reeResourcesTagsRepo;

    @Autowired
    private ObjectMapper objectMapper;


    public ReResources createResource(ReResources resource, String resourceType) {
        // Validate resource type
        if (!isValidResourceType(resourceType)) {
            throw new IllegalArgumentException("Invalid resource type. Must be 'blog', 'article', or 'manual'");
        }
        // Set default values
        resource.setResourceType(resourceType);
        resource.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        resource.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        resource.setStatus("ACTIVE");
        resource.setProcessStatus("DRAFT");
        resource.setIsVersion(false);
        resource.setIsLatest(false);
        resource.setRatings(0.0f);
        resource.setLikes(0L);

        return reResourcesRepo.save(resource);
    }

    private boolean isValidResourceType(String resourceType) {
        return resourceType != null &&
                (resourceType.equals("blog") ||
                        resourceType.equals("article") ||
                        resourceType.equals("manual"));
    }


    //  >>>>>>>>>>>>>>
    @Override
    public ReResources updateResource(ReResources dto, String resourceType, Long resourceId) {
        ReResources existing = reResourcesRepo.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + resourceId));

        if (!existing.getResourceType().equals(resourceType)) {
            throw new RuntimeException("Resource type mismatch for id: " + resourceId);
        }

        // Update fields only if not null
        if (dto.getResourceTitle() != null) existing.setResourceTitle(dto.getResourceTitle());
        if (dto.getSummary() != null) existing.setSummary(dto.getSummary());
        if (dto.getOwners() != null) existing.setOwners(dto.getOwners());
        if (dto.getMetadata() != null) existing.setMetadata(dto.getMetadata());
        if (dto.getProcessMetadata() != null) existing.setProcessMetadata(dto.getProcessMetadata());
        if (dto.getSlug() != null) existing.setSlug(dto.getSlug());
        if (dto.getVersionId() != null) existing.setVersionId(dto.getVersionId());
        if (dto.getVersionName() != null) existing.setVersionName(dto.getVersionName());
        if (dto.getVersionNo() != null) existing.setVersionNo(dto.getVersionNo());
        if (dto.getVersionSummary() != null) existing.setVersionSummary(dto.getVersionSummary());
        if (dto.getIsVersion() != null) existing.setIsVersion(dto.getIsVersion());
        if (dto.getIsLatest() != null) existing.setIsLatest(dto.getIsLatest());

        // Set common update fields
        existing.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        existing.setUpdatedBy(dto.getUpdatedBy());

        return reResourcesRepo.save(existing);
    }
    //>>>>>>>

    @Override
    public ReResources getResourceByIdAndType(String resourceType, Long resourceId) {
        return reResourcesRepo.findByIdAndResourceType(resourceId, resourceType)
                .orElseThrow(() -> new RuntimeException("Resource not found with ID " + resourceId + " and type " + resourceType));
    }

    //>>>>>>
    @Override
    public void deleteResource(Long id) {
        if (!reResourcesRepo.existsById(id)) {
            throw new RuntimeException("Resource with ID " + id + " does not exist");
        }
        reResourcesRepo.deleteById(id);
    }

    //>>>
    @Override
    public List<ReResources> getResourcesByType(String resourceType) {
        return reResourcesRepo.findByResourceType(resourceType);
    }

    //>>>
    @Override
    public List<ReResources> searchResources(String resourceType, String status, String version, Long categoryId) {
        return reResourcesRepo.searchResources(resourceType, status, version, categoryId);
    }

    @Override
    public ReResources cloneResource(String resourceType, Long resourceId) {
        ReResources original = reResourcesRepo.findByIdAndResourceType(resourceId, resourceType)
                .orElseThrow(() -> new RuntimeException("Original resource not found"));

        Long newId = reResourcesRepo.getMaxResourceId() + 1;
        ReResources clone = new ReResources();
        clone.setId(newId);
        // Set resource type
        clone.setResourceType(resourceType);

        // Copy fields
        clone.setResourceTitle(original.getResourceTitle());
        clone.setSummary(original.getSummary());
        clone.setOwners(original.getOwners());
        clone.setMetadata(original.getMetadata());
        clone.setProcessMetadata(original.getProcessMetadata());

        // Reset fields
        clone.setRatings(0.0f);
        clone.setLikes(0L);
        clone.setIsVersion(true);
        clone.setIsLatest(true);
        clone.setProcessStatus("DRAFT");
        clone.setStatus("ACTIVE");

        clone.setVersionId(String.valueOf(original.getId()));

        Float originalVersionNo = original.getVersionNo() != null ? original.getVersionNo() : 1.0f;
        clone.setVersionNo(originalVersionNo + 1.0f);

        String versionName = original.getVersionName() != null ? original.getVersionName() : "v1";
        clone.setVersionName(versionName + ".1");

        clone.setVersionSummary("Cloned from ID: " + resourceId);

        // Slug – Ensure uniqueness by appending timestamp
        String originalSlug = original.getSlug() != null ? original.getSlug() : "resource";
        clone.setSlug(originalSlug + "-v" + System.currentTimeMillis());

        // Audit info
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        clone.setCreatedAt(now);
        clone.setUpdatedAt(now);
        clone.setCreatedBy(original.getCreatedBy());
        clone.setUpdatedBy(original.getUpdatedBy());

        return reResourcesRepo.save(clone);
    }


    @Override
    public List<ReResources> getAllVersions(String resourceType, Long resourceId) {
        return reResourcesRepo.findByResourceTypeAndVersionId(resourceType, String.valueOf(resourceId));
    }

    @Override
    public ReResources getLatestVersion(String resourceType, Long resourceId) {
        return reResourcesRepo.findByResourceTypeAndVersionIdAndIsLatestTrue(resourceType, String.valueOf(resourceId));
    }

    @Override
    public ReResources updateResourceStatus(String resourceType, Long resourceId, String newStatus) {
        ReResources resource = reResourcesRepo.findByIdAndResourceType(resourceId, resourceType)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        resource.setStatus(newStatus.toUpperCase());
        resource.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return reResourcesRepo.save(resource);
    }

    @Override
    public ReResources updateResourceProcessStatus(String resourceType, Long resourceId, String newProcessStatus) {
        ReResources resource = reResourcesRepo.findByIdAndResourceType(resourceId, resourceType)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        resource.setProcessStatus(newProcessStatus.toUpperCase());
        resource.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return reResourcesRepo.save(resource);
    }

    @Override
    public List<RmCategories> getCategoriesByResourceType(String resourceType) {
        return rmCategoriesRepo.findCategoriesByResourceType(resourceType);
    }

    //>>>>>>>>>>>>>>>>>>>>>>
    @Override
    public void assignCategory(Long resourceId, ReResourceCategory reResourceCategory) {
        Long categoryId = reResourceCategory.getId().getCategoryId(); // ✅ Extract from composite ID

        ReResources resource = reResourcesRepo.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        RmCategories category = rmCategoriesRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        ReResourceCategory.ResourceCategoryId compositeId = new ReResourceCategory.ResourceCategoryId();
        compositeId.setResourceId(resourceId);
        compositeId.setCategoryId(categoryId);

        ReResourceCategory mapping = new ReResourceCategory();
        mapping.setId(compositeId);
        mapping.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        mapping.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        mapping.setCreatedBy(1L);
        mapping.setUpdatedBy(1L);
        mapping.setResource(resource);
        mapping.setCategory(category);

        reResourceCategoryRepo.save(mapping);
    }

    //Doubt
    @Override
    public List<ReResourceCategory> getCategoriesByResourceId(Long resourceId) {
        return reResourceCategoryRepo.findByIdResourceId(resourceId);
    }

    @Override
    public List<RmTags> getTagsByResourceType(String resourceType) {
        return rmTagsRepo.findByResourceType(resourceType);
    }

    @Override
    public void createTag(RmTags tag) {
        tag.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        tag.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        tag.setCreatedBy(1L);
        tag.setUpdatedBy(1L);

        rmTagsRepo.save(tag);
    }

    @Override
    public void updateTag(Long tagId, String resourceType, RmTags updatedTag) {
        RmTags existingTag = rmTagsRepo.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        if (!existingTag.getResourceType().equalsIgnoreCase(resourceType)) {
            throw new RuntimeException("Resource type mismatch");
        }

        existingTag.setTagName(updatedTag.getTagName());
        existingTag.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        existingTag.setUpdatedBy(1L); // hardcoded or from session context

        rmTagsRepo.save(existingTag);
    }

    @Override
    public List<ReeResourcesTags> getTagsForResource(Long resourceId) {
        return reeResourcesTagsRepo.findTagsByResourceId(resourceId);
    }


}
