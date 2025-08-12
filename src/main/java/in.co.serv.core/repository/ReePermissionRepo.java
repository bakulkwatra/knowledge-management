package in.co.serv.core.repository;


import in.co.serv.core.entity.ReePermission;
import in.co.serv.core.entity.ReePermission.PermissionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReePermissionRepo extends JpaRepository<ReePermission, PermissionId>  {
    Optional<ReePermission> findById(PermissionId id);
}
