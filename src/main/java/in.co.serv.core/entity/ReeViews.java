package in.co.serv.core.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "ree_views")
@Data
public class ReeViews {

    @EmbeddedId
    private ViewId id;

    @Column(name = "view_count", nullable = false)
    private Long viewCount = 0L;

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
    public static class ViewId implements java.io.Serializable {
        private Long resourceId;
        private Long userId;
    }
}
