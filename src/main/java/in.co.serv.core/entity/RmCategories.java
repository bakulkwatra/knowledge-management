package in.co.serv.core.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "rm_categories", uniqueConstraints = { @UniqueConstraint(columnNames = {"category", "resource_type"})})
@Data
public class RmCategories {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "resource_type", nullable = false, length = 30)
    private String resourceType;

    @Column(name = "category_group_id", nullable = false)
    private Long categoryGroupId;

    @ManyToOne
    @JoinColumn(name = "category_group_id", referencedColumnName = "id", insertable = false, updatable = false)
    private RmCategoryGroup categoryGroup;

    @Column(name = "category", nullable = false, columnDefinition = "TEXT")
    private String category;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Long updatedBy;

}