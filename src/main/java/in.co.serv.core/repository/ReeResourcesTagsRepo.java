package in.co.serv.core.repository;

import in.co.serv.core.entity.ReeResourcesTags;
import in.co.serv.core.entity.ReeResourcesTags.ResourceTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReeResourcesTagsRepo extends JpaRepository<ReeResourcesTags, ResourceTagId>{
    List<ReeResourcesTags> findTagsByResourceId(Long resourceId);

}
