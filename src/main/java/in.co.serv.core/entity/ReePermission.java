package in.co.serv.core.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.sql.Timestamp;

@Entity
@Table(name = "ree_permission")
@Data
public class ReePermission {

    @EmbeddedId
    private PermissionId id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "is_allow", columnDefinition = "json")
    private String isAllow;

    @Column(name = "is_deny", nullable = false)
    private String isDeny;

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
    public static class PermissionId implements java.io.Serializable {
        private Long resourceId;
        private Long userId;
    }




}
