package in.co.serv.core.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "ree_ratings")
@Data
public class ReeRatings {

    @EmbeddedId
    private RatingId id;

    @Column(name = "rating", nullable = false)
    private Float rating = 0.0f;

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
    public static class RatingId implements java.io.Serializable {
        private Long resourceId;
        private Long userId;
    }
}
