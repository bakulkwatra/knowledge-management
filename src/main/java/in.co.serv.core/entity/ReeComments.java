package in.co.serv.core.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "ree_comments")
@Data
public class ReeComments {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "resource_id", nullable = false)
    private Long resourceId;

    @ManyToOne
    @JoinColumn(name = "resource_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private ReResources resource;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
    private String comment;

    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "level", nullable = false)
    private Long level = 0L;

    @Column(name = "process_status", nullable = false, length = 30)
    private String processStatus = "PENDING";

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Long updatedBy;

}
