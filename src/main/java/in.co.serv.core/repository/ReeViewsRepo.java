package in.co.serv.core.repository;

import in.co.serv.core.entity.ReeViews;
import in.co.serv.core.entity.ReeViews.ViewId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReeViewsRepo extends JpaRepository<ReeViews, ViewId> {
}
