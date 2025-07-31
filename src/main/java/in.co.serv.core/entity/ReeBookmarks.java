package in.co.serv.core.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "ree_bookmarks")
@Data
public class ReeBookmarks {

    @EmbeddedId
    private BookmarkId id;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Long updatedBy;

    @ManyToOne
    @MapsId("resourceId")
    @JoinColumn(name = "resource_id", referencedColumnName = "id")
    private ReResources resource;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookmarkId implements java.io.Serializable {
        @Column(name = "resource_id")
        private Long resourceId;

        @Column(name = "user_id")
        private Long userId;
    }
}
