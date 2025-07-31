package in.co.serv.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "re_section_files")
@Data
public class ReSectionFiles {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "section_id", nullable = false)
    private Long sectionId;

    @ManyToOne
    @JoinColumn(name = "section_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private ReSection section;

    @Column(name = "sort", nullable = false)
    private Long sort;

    @Column(name = "file_name", nullable = false, columnDefinition = "TEXT")
    private String fileName;

    @Column(name = "file_description", columnDefinition = "TEXT")
    private String fileDescription;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "file_type", length = 100)
    private String fileType;

    @Column(name = "mime_type", length = 100)
    private String mimeType;

    @Column(name = "base_url", columnDefinition = "TEXT")
    private String baseUrl;

    @Column(name = "path_url", nullable = false, columnDefinition = "TEXT")
    private String pathUrl;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Long updatedBy;

}
