package in.co.serv.core.repository;

import in.co.serv.core.entity.ReeRatings;
import in.co.serv.core.entity.ReeRatings.RatingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReeRatingsRepo extends JpaRepository<ReeRatings, RatingId>{
    List<ReeRatings> findByIdResourceId(Long resourceId);
}
