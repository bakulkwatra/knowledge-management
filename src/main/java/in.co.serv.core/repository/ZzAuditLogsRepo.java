package in.co.serv.core.repository;

import in.co.serv.core.entity.ZzAuditLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZzAuditLogsRepo extends JpaRepository<ZzAuditLogs, Long> {

    List<ZzAuditLogs> findByResource_ResourceTypeAndResource_IdAndCreatedAtBetween(
            String resourceType, Long resourceId, java.sql.Timestamp start, java.sql.Timestamp end);

    @Query("SELECT z FROM ZzAuditLogs z WHERE z.resourceType = :resourceType AND z.userId = :userId AND EXTRACT(YEAR FROM z.createdAt) = :year")
    List<ZzAuditLogs> findByResourceTypeAndUserIdAndYear(@Param("resourceType") String resourceType,
                                                         @Param("userId") Long userId,
                                                         @Param("year") int year);

}
