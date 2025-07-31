package in.co.serv.core.repository;

import in.co.serv.core.entity.ReeLikes;
import in.co.serv.core.entity.ReeLikes.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReeLikesRepo extends JpaRepository<ReeLikes, LikeId> {

}
