package in.co.serv.core.repository;

import in.co.serv.core.entity.RmCategoryGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RmCategoryGroupRepo extends JpaRepository<RmCategoryGroup, Long> {

    List<RmCategoryGroup> findByResourceType(String resourceType);

}
