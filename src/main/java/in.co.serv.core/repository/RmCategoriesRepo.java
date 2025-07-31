package in.co.serv.core.repository;

import in.co.serv.core.entity.RmCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RmCategoriesRepo extends JpaRepository<RmCategories, Long> {
//by bakul
    @Query("SELECT c FROM RmCategories c WHERE c.resourceType = :resourceType AND c.categoryGroupId IN :groupIds")
    List<RmCategories> findByResourceTypeAndGroupIds(@Param("resourceType") String resourceType,
                                                     @Param("groupIds") List<Long> groupIds);
//
    List<RmCategories> findByResourceTypeAndCategoryGroupId(String resourceType, Long categoryGroupId);


    //amulya//
    List<RmCategories> findCategoriesByResourceType(String resourceType);

}
