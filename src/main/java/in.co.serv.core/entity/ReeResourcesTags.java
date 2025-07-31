package in.co.serv.core.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "ree_resources_tags")
@Data
public class ReeResourcesTags {

    @EmbeddedId
    private ResourceTagId id;

    @Column(name = "tag_values", nullable = false, length = 255)
    private String tagValues;

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
    @JsonIgnore
    private ReResources resource;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tag_id", referencedColumnName = "id")
    @JsonIgnore
    private RmTags tag;

    @Embeddable
    @Data
    public static class ResourceTagId implements java.io.Serializable {
        private Long resourceId;
        private Long tagId;

    }
}
