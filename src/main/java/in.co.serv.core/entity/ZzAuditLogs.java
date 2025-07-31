package in.co.serv.core.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "zz_audit_logs_")
@Data
public class ZzAuditLogs {

        @Id
        @Column(name = "id")
        private Long id;

        @Column(name = "resource_id", nullable = false)
        private Long resourceId;

        @ManyToOne
        @JoinColumn(name ="resource_id",referencedColumnName = "id",  insertable = false, updatable = false)
        private ReResources resource;

        @Column(name = "resource_type", nullable = false, length = 30)
        private String resourceType;

        @Column(name = "action", length = 255)
        private String action;

        @Column(name = "method", length = 30)
        private String method;

        @Column(name = "api_endpoint", columnDefinition = "TEXT")
        private String apiEndpoint;

        @Column(name = "resource_level", length = 100)
        private String resourceLevel;

        @Column(name = "audit_data", columnDefinition = "TEXT")
        private String auditData;

        @Column(name = "req_payload", columnDefinition = "TEXT")
        private String reqPayload;

        @Column(name = "req_response", columnDefinition = "TEXT")
        private String reqResponse;

        @Column(name = "action_status", length = 100)
        private String actionStatus;

        @Column(name = "user_id")
        private Long userId;

        @Column(name = "user_details", columnDefinition = "TEXT")
        private String userDetails;

        @Column(name = "ip_address", length = 50)
        private String ipAddress;

        @Column(name = "user_agent", length = 100)
        private String userAgent;

        @Column(name = "created_at", nullable = false)
        private Timestamp createdAt;

        @Column(name = "created_by", nullable = false)
        private Long createdBy;

        @Column(name = "updated_at", nullable = false)
        private Timestamp updatedAt ;

        @Column(name = "updated_by", nullable = false)
        private Long updatedBy;
}
