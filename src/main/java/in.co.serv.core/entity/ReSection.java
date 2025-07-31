package in.co.serv.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "re_section", uniqueConstraints = {@UniqueConstraint(columnNames = {"section_title"})})
@Data
public class ReSection {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "chapter_id", nullable = false)
    private Long chapterId;

    @ManyToOne
    @JoinColumn(name = "chapter_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private ReChapters chapter;

    @Column(name = "section_type", nullable = false, length = 30)
    private String sectionType;

    @Column(name = "section_title", columnDefinition = "TEXT")
    private String sectionTitle;

    @Column(name = "section_content", columnDefinition = "TEXT")
    private String sectionContent;

    @Column(name = "is_version", nullable = false)
    private Boolean isVersion = false;

    @Column(name = "version_id")
    private Long versionId;

    @Column(name = "version_name", length = 255)
    private String versionName;

    @Column(name = "version_no")
    private Float versionNo;

    @Column(name = "version_summary", columnDefinition = "TEXT")
    private String versionSummary;

    @Column(name = "is_latest", nullable = false)
    private Boolean isLatest = false;

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