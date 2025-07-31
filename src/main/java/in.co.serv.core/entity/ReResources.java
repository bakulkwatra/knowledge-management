    package in.co.serv.core.entity;

    import com.vladmihalcea.hibernate.type.json.JsonType;
    import jakarta.persistence.*;
    import lombok.Data;
    import org.hibernate.annotations.Type;

    import java.sql.Timestamp;
    import java.time.LocalDateTime;
    import java.util.List;
    import java.util.Map;

    @Entity
    @Table(name = "re_resources", uniqueConstraints = @UniqueConstraint(columnNames = {"slug", "resource_type"}))
    @Data
    public class ReResources {
        @Id
        @Column(name = "id")
        private Long id;

        @Column(name = "resource_type", nullable = false, length = 30)
        private String resourceType;

        @Column(name = "resource_title", columnDefinition = "TEXT")
        private String resourceTitle;

        @Column(name = "summary", columnDefinition = "TEXT")
        private String summary;

        @Type(JsonType.class)
        @Column(name = "owners", columnDefinition = "json")
        private List<Long> owners;

        @Column(name = "ratings")
        private Float ratings = 0.0f;

        @Column(name = "likes")
        private Long likes = 0L;

        @Column(name = "slug", columnDefinition = "TEXT")
        private String slug;

        @Column(name = "is_version", nullable = false)
        private Boolean isVersion = false;

        @Column(name = "version_id", length = 30)
        private String versionId;

        @Column(name = "version_name", length = 255)
        private String versionName;

        @Column(name = "version_no")
        private Float versionNo;

        @Column(name = "version_summary", columnDefinition = "TEXT")
        private String versionSummary;

        @Column(name = "is_latest", nullable = false)
        private Boolean isLatest = false;

        @Type(JsonType.class)
        @Column(name = "metadata", columnDefinition = "json")
        private Map<String, Object> metadata;

        @Type(JsonType.class)
        @Column(name = "process_metadata", columnDefinition = "json")
        private Map<String, Object> processMetadata;

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

        @Column(name = "deleted_at")
        private Timestamp deletedAt;

        @Column(name = "deleted_by")
        private Long deletedBy;

        // You can add relationships here to other entities
    }
