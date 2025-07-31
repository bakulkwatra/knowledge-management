package in.co.serv.core.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "rm_category_group", uniqueConstraints = { @UniqueConstraint(columnNames = {"group_name", "resource_type"})})
@Data
public class RmCategoryGroup {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "resource_type", nullable = false, length = 30)
    private String resourceType;

    @Column(name = "group_name", nullable = false, columnDefinition = "TEXT")
    private String groupName;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Long updatedBy;

}