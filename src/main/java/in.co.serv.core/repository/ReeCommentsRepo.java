package in.co.serv.core.repository;

import in.co.serv.core.entity.ReeComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReeCommentsRepo extends JpaRepository<ReeComments, Long> {
    List<ReeComments> findByResourceId(Long resourceId);
}
