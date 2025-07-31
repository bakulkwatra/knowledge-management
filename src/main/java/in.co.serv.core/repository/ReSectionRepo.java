package in.co.serv.core.repository;

import in.co.serv.core.entity.ReSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReSectionRepo extends JpaRepository<ReSection, Long> {

    List<ReSection> findByChapterId(Long chapterId);
}
