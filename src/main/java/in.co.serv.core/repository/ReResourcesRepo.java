package in.co.serv.core.repository;

import in.co.serv.core.entity.ReResources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReResourcesRepo extends JpaRepository<ReResources, Long> {
    Optional<ReResources> findByIdAndResourceType(Long id, String resourceType);

    ////amulya/////
    // Optional<ReResources> findByIdAndResourceType(Long id, String resourceType);
    List<ReResources> findByResourceType(String resourceType);
    @Query("SELECT r FROM ReResources r " +
            "WHERE (:resourceType IS NULL OR r.resourceType = :resourceType) " +
            "AND (:status IS NULL OR r.status = :status) " +
            "AND (:versionName IS NULL OR r.versionName = :versionName)")
    List<ReResources> searchResources(
            @Param("resourceType") String resourceType,
            @Param("status") String status,
            @Param("versionName") String versionName
    );

    @Query("SELECT COALESCE(MAX(r.id), 0) FROM ReResources r")
    Long getMaxResourceId();

    List<ReResources> findByResourceTypeAndVersionId(String resourceType, String versionId);

    ReResources findByResourceTypeAndVersionIdAndIsLatestTrue(String resourceType, String versionId);

    @Query("SELECT r FROM ReResources r " +
            "LEFT JOIN ReResourceCategory rc ON rc.id.resourceId = r.id " +
            "WHERE r.resourceType = :resourceType " +
            "AND (:status IS NULL OR UPPER(r.status) = UPPER(:status)) " +
            "AND (:version IS NULL OR r.versionName = :version) " +
            "AND (:categoryId IS NULL OR rc.id.categoryId = :categoryId)")
    List<ReResources> searchResources(@Param("resourceType") String resourceType,
                                      @Param("status") String status,
                                      @Param("version") String version,
                                      @Param("categoryId") Long categoryId);



}
