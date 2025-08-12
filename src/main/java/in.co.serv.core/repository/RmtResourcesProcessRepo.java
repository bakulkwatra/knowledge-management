package in.co.serv.core.repository;

import in.co.serv.core.entity.RmtResourcesProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RmtResourcesProcessRepo extends JpaRepository<RmtResourcesProcess, Long> {

    List<RmtResourcesProcess> findByResourceIdOrderByCreatedAtDesc(Long resourceId);
}
