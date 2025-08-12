package in.co.serv.core.repository;

import in.co.serv.core.entity.ReResourceCategory;
import in.co.serv.core.entity.ReResourceCategory.ResourceCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReResourceCategoryRepo extends JpaRepository<ReResourceCategory, ResourceCategoryId> {
    List<ReResourceCategory> findByIdResourceId(Long resourceId);

}
