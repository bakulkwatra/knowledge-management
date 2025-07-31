package in.co.serv.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "re_chapters", uniqueConstraints = {@UniqueConstraint(columnNames = {"chapter_title"})})
@Data
public class ReChapters {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "resource_id", nullable = false)
    private Long resourceId;

    @ManyToOne
    @JoinColumn(name = "resource_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private ReResources resource;


    @Column(name = "chapter_title", columnDefinition = "TEXT")
    private String chapterTitle;

    @Column(name = "is_content", nullable = false)
    private Boolean isContent;

    @Column(name = "sort", nullable = false)
    private Long sort;

    @Column(name = "process_status", nullable = false, length = 30)
    private String processStatus = "DRAFT";

    @Column(name = "status", nullable = false, length = 30)
    private String status = "ACTIVE";

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Long updatedBy;

}