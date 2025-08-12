package in.co.serv.core.repository;

import in.co.serv.core.entity.ReeBookmarks;
import in.co.serv.core.entity.ReeBookmarks.BookmarkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReeBookmarksRepo extends JpaRepository<ReeBookmarks, BookmarkId> {
    boolean existsById(BookmarkId id);
    void deleteById(BookmarkId id);

}
