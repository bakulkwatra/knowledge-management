package in.co.serv.core.service;

import in.co.serv.core.dto.ResourceProcessLogDTO;
import in.co.serv.core.dto.SectionProcessLogDTO;
import in.co.serv.core.entity.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface ResourceService {

    //chapters
    ReChapters createChapter(Long resourceId, ReChapters chapter);

    List<ReChapters> getChaptersByResourceId(Long resourceId);

    ReChapters getChapterById(Long chapterId);

    ReChapters updateChapter(Long chapterId, ReChapters chapter);

    void deleteChapter(Long chapterId);

    //Section
    ReSection createSection(Long chapterId, ReSection section);

    List<ReSection> getSectionsByChapterId(Long chapterId);

    ReSection getSectionById(Long sectionId);

    ReSection updateSection(Long sectionId, ReSection section);

    void deleteSection(Long sectionId);

    //SectionFiles
    String uploadFile(MultipartFile file, Long sectionId, String resourceType, String description) throws Exception;

    List<ReSectionFiles> getFilesBySection(Long sectionId);

    void deleteFileById(Long fileId) throws Exception;

    //ReResourceTag
    ReeResourcesTags assignTagToResource(Long resourceId, ReeResourcesTags reeResourcesTags);

    //RmCategoryGroup
    List<RmCategoryGroup> getCategoryGroupsByResourceType(String resourceType);

    RmCategoryGroup createCategoryGroup(RmCategoryGroup categoryGroup);

    //RmCategories
    List<RmCategories> getCategoriesByGroupAndResource(String resourceType, Long categoryGroupId);

    //added by Bakul
    List<RmCategories> getCategoriesByMultipleGroups(String resourceType, List<Long> categoryGroupIds);
    //

    RmCategories createCategory(String resourceType, Long categoryGroupId, RmCategories category);

    RmCategories updateCategory(Long id, RmCategories category);


    //----------------------------------------------------------manpreet-----------------------------------------------------------------------------
    //-------------------------------------------------------ReeBookmarkService----------------------------------------------------------------------
    String bookmarkResource(String resourceType, Long resourceId, Long userId);

    String deleteBookmark(String resourceType, Long resourceId, Long userId);

    //-----------------------------------------------------ReeCommentsService---------------------------------------------------------------------
    ReeComments addComment(String resourceType, Long resourceId, ReeComments comment);

    List<ReeComments> getComments(String resourceType, Long resourceId);

    //-----------------------------------------------------ReeLikesService--------------------------------------------------------------------------
    void likeResource(String resourceType, Long resourceId, Long userId);

    void unlikeResource(String resourceType, Long resourceId, Long userId);

    //------------------------------------------------------ReePermission--------------------------------------------------------------------------
    String setPermission(String resourceType, Long resourceId, Long userId, String isAllow, String isDeny);

    ReePermission getPermission(String resourceType, Long resourceId, Long userId);

    //-----------------------------------------------------ReeRatingsService-----------------------------------------------------------------------
    ReeRatings submitRating(String resourceType, Long resourceId, Long userId, Float rating);

    List<ReeRatings> getAllRatings(String resourceType, Long resourceId);

    //---------------------------------------------------------ReeViews-----------------------------------------------------------------------------
    void recordView(String resourceType, Long resourceId, Long userId);

    //---------------------------------------------------RmtResourcesProcessService----------------------------------------------------------------------
    void logProcess(String resourceType, Long resourceId, ResourceProcessLogDTO dto);

    List<RmtResourcesProcess> getProcessLogs(String resourceType, Long resourceId);

    //---------------------------------------------------RmtSectionProcessService-------------------------------------------------------------------------
    void logSectionProcess(String resourceType, Long sectionId, SectionProcessLogDTO dto);

    List<RmtSectionProcess> getSectionProcessLogs(Long sectionId);

    //-------------------------------------------------------ZzAuditLogsService-------------------------------------------------------------------------
    List<ZzAuditLogs> getAuditLogsByResource(String resourceType, int year, Long resourceId);

    List<ZzAuditLogs> getAuditLogsByUser(String resourceType, int year, Long userId);

    void exportAuditLogsToPdf(String resourceType, Long resourceId, HttpServletResponse response) throws IOException;

    void exportAuditLogsToHtml(String resourceType, Long resourceId, HttpServletResponse response) throws IOException;

    ////////////amulya///////////////


    ReResources createResource(ReResources resource, String resourceType);

    ReResources updateResource(ReResources dto, String resourceType, Long resourceId);

    ReResources getResourceByIdAndType(String resourceType, Long resourceId);

    void deleteResource(Long id);

    List<ReResources> getResourcesByType(String resourceType);

    List<ReResources> searchResources(String resourceType, String status, String version, Long categoryId);

    ReResources cloneResource(String resourceType, Long resourceId);

    List<ReResources> getAllVersions(String resourceType, Long resourceId);

    ReResources getLatestVersion(String resourceType, Long resourceId);

    ReResources updateResourceStatus(String resourceType, Long resourceId, String newStatus);

    ReResources updateResourceProcessStatus(String resourceType, Long resourceId, String newProcessStatus);

    List<RmCategories> getCategoriesByResourceType(String resourceType);

    void assignCategory(Long resourceId, ReResourceCategory reResourceCategory);

    List<ReResourceCategory> getCategoriesByResourceId(Long resourceId);

    List<RmTags> getTagsByResourceType(String resourceType);

    void createTag(RmTags tag);

    void updateTag(Long tagId, String resourceType, RmTags updatedTag);

    List<ReeResourcesTags> getTagsForResource(Long resourceId);


}
