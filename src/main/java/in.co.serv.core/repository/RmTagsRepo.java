package in.co.serv.core.repository;

import in.co.serv.core.entity.RmTags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RmTagsRepo extends JpaRepository<RmTags, Long> {
    List<RmTags> findByResourceType(String resourceType);

}
