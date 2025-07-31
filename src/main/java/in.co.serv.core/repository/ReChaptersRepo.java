package in.co.serv.core.repository;

import in.co.serv.core.entity.ReChapters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReChaptersRepo extends JpaRepository<ReChapters,Long> {

    List<ReChapters> findByResourceId(Long resourceId);

}
