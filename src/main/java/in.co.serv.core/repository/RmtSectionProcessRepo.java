package in.co.serv.core.repository;

import in.co.serv.core.entity.RmtSectionProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RmtSectionProcessRepo extends JpaRepository<RmtSectionProcess, Long> {
    List<RmtSectionProcess> findBySectionId(Long sectionId);
}
