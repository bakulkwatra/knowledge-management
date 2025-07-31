package in.co.serv.core.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "re_resources_category")
@Data
public class ReResourceCategory {

    @EmbeddedId
    private ResourceCategoryId id;

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
    @JoinColumn(name = "resource_id")
    private ReResources resource;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private RmCategories category;

    @Embeddable
    @Data
    public static class ResourceCategoryId implements java.io.Serializable {
        private Long resourceId;
        private Long categoryId;
    }
}

