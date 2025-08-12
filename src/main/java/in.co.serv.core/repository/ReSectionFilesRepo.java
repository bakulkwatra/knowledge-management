package in.co.serv.core.repository;

import in.co.serv.core.entity.ReSectionFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReSectionFilesRepo extends JpaRepository<ReSectionFiles, Long> {

    List<ReSectionFiles> findBySectionId(Long sectionId);

}
